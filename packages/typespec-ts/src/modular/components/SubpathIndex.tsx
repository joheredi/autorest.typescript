import { Children } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import {
  SdkClientType,
  SdkServiceOperation
} from "@azure-tools/typespec-client-generator-core";
import { NameType, normalizeName } from "@azure-tools/rlc-common";
import { SdkContext } from "../../utils/interfaces.js";
import { ModularEmitterOptions } from "../interfaces.js";
import {
  getClassicalLayerPrefix,
  getClientName
} from "../helpers/namingHelpers.js";
import { getModularClientOptions } from "../../utils/clientUtils.js";
import { getMethodHierarchiesMap } from "../../utils/operationUtil.js";
import { getOperationOptionsName } from "../helpers/operationHelpers.js";
import {
  getModelNamespaces,
  normalizeModelName,
  getModelsPath
} from "../emitModels.js";
import { emitQueue } from "../../framework/hooks/sdkTypes.js";
import { isExtensibleEnum } from "../type-expressions/get-enum-expression.js";
import { isDiscriminatedUnion } from "../serialization/serializeUtils.js";
import {
  SdkType,
  SdkModelType,
  SdkEnumType,
  SdkUnionType
} from "@azure-tools/typespec-client-generator-core";

// ── Props ───────────────────────────────────────────────────────────────

export interface SubpathIndexProps {
  context: SdkContext;
  emitterOptions: ModularEmitterOptions;
  clientMap: [string[], SdkClientType<SdkServiceOperation>][];
}

// ── Component ───────────────────────────────────────────────────────────

/**
 * Generates barrel index files for models/, api/, and classic/ subpaths.
 * Replaces the old ts-morph–based buildSubpathIndexFile.
 */
export function SubpathIndex(props: SubpathIndexProps): Children {
  const { context, emitterOptions, clientMap } = props;
  const srcPath = emitterOptions.modularOptions.sourceRoot;
  const files: Children[] = [];

  // 1. Model barrels (global, not per-client)
  files.push(...generateModelBarrels(context, srcPath));

  // 2. API and Classic barrels (per-client)
  for (const subClient of clientMap) {
    const isHierarchy = context.rlcOptions?.hierarchyClient === true;
    files.push(
      ...generateApiBarrels(context, subClient, emitterOptions, isHierarchy)
    );
    files.push(...generateClassicBarrels(context, subClient, emitterOptions));
  }

  return <>{files}</>;
}

// ── Model barrels ───────────────────────────────────────────────────────

function generateModelBarrels(
  context: SdkContext,
  srcPath: string
): Children[] {
  // Group types by their barrel path
  const barrelExports = new Map<string, Map<string, string>>();

  for (const type of emitQueue) {
    if (!isGenerableType(type)) continue;
    const namespaces = getModelNamespaces(context, type);
    const modelsFilePath = getModelsPath(srcPath, namespaces);
    const barrelPath = modelsFilePath.replace(/\/models\.ts$/, "/index.ts");
    const moduleSpecifier =
      "./" + modelsFilePath.split("/").pop()!.replace(".ts", ".js");

    if (!barrelExports.has(barrelPath)) {
      barrelExports.set(barrelPath, new Map());
    }
    const fileExports = barrelExports.get(barrelPath)!;

    // Collect export names for this type
    for (const name of getTypeExportNames(context, type)) {
      if (!name.startsWith("_")) {
        fileExports.set(name, moduleSpecifier);
      }
    }
  }

  // Generate barrel files
  const files: Children[] = [];
  for (const [barrelPath, exportsMap] of barrelExports) {
    // Group by module specifier
    const bySpecifier = new Map<string, string[]>();
    for (const [name, specifier] of exportsMap) {
      if (!bySpecifier.has(specifier)) bySpecifier.set(specifier, []);
      bySpecifier.get(specifier)!.push(name);
    }

    const lines: string[] = [];
    for (const [specifier, names] of bySpecifier) {
      if (names.length > 0) {
        lines.push(`export { ${names.join(", ")} } from "${specifier}";`);
      }
    }

    if (lines.length > 0) {
      files.push(
        <ts.SourceFile path={barrelPath}>{lines.join("\n")}</ts.SourceFile>
      );
    }
  }

  return files;
}

function isGenerableType(type: SdkType): boolean {
  return (
    type.kind === "model" ||
    type.kind === "enum" ||
    type.kind === "union" ||
    type.kind === "array" ||
    type.kind === "dict" ||
    type.kind === "nullable"
  );
}

function getTypeExportNames(context: SdkContext, type: SdkType): string[] {
  const names: string[] = [];

  if (type.kind === "model") {
    const modelType = type as SdkModelType;
    const name = normalizeModelName(context, modelType);
    names.push(name);
    if (isDiscriminatedUnion(modelType)) {
      const unionName =
        normalizeModelName(context, modelType, NameType.Interface, true) +
        "Union";
      names.push(unionName);
    }
  } else if (type.kind === "enum") {
    const enumType = type as SdkEnumType;
    const baseName = normalizeModelName(context, enumType);
    if (isExtensibleEnum(context, enumType)) {
      names.push(`Known${baseName}`);
      names.push(baseName);
    } else {
      names.push(baseName);
    }
  } else if (type.kind === "union") {
    const unionType = type as SdkUnionType;
    names.push(normalizeModelName(context, unionType));
  }
  // Skip array/dict type aliases — they are internal helpers

  return names;
}

// ── API barrels ─────────────────────────────────────────────────────────

function generateApiBarrels(
  context: SdkContext,
  clientMap: [string[], SdkClientType<SdkServiceOperation>],
  emitterOptions: ModularEmitterOptions,
  _isHierarchy: boolean
): Children[] {
  const [_, client] = clientMap;
  const { subfolder } = getModularClientOptions(clientMap);
  const srcPath = emitterOptions.modularOptions.sourceRoot;
  const sub = subfolder && subfolder !== "" ? subfolder + "/" : "";
  const apiBase = `${srcPath}/${sub}api`;
  const methodMap = getMethodHierarchiesMap(context, client);
  const files: Children[] = [];

  // Collect exports per directory
  const directoryExports = new Map<
    string,
    { specifier: string; names: string[] }[]
  >();

  // Context file exports (in the top-level api/ directory)
  const clientName = getClientName(client);
  const contextSpecifier = `./${normalizeName(clientName, NameType.File)}Context.js`;
  const rlcClientName =
    getModularClientOptions(clientMap).rlcClientName ?? `${clientName}Context`;
  const classicalClientName = client.name;
  const contextExports = [
    `create${clientName}`,
    rlcClientName,
    `${classicalClientName}OptionalParams`
  ];

  addDirectoryEntry(
    directoryExports,
    apiBase,
    contextSpecifier,
    contextExports
  );

  // Per-group exports
  for (const [prefixKey, operations] of methodMap) {
    const prefixes = prefixKey === "" ? [] : prefixKey.split("/");
    const normalizedDir =
      prefixes.length > 0
        ? prefixes.map((p) => normalizeName(p, NameType.File)).join("/")
        : "";

    const groupDir =
      normalizedDir !== "" ? `${apiBase}/${normalizedDir}` : apiBase;

    // Operation function names
    const opNames = operations.map((op) =>
      normalizeName(op.name, NameType.Method, true)
    );
    if (opNames.length > 0) {
      addDirectoryEntry(directoryExports, groupDir, "./operations.js", opNames);
    }

    // Option interface names
    const optNames = operations.map((op) =>
      getOperationOptionsName([prefixes, op], true)
    );
    if (optNames.length > 0) {
      addDirectoryEntry(directoryExports, groupDir, "./options.js", optNames);
    }
  }

  // Generate index.ts for each directory
  for (const [dir, entries] of directoryExports) {
    const lines: string[] = [];
    for (const entry of entries) {
      lines.push(
        `export { ${entry.names.join(", ")} } from "${entry.specifier}";`
      );
    }
    if (lines.length > 0) {
      files.push(
        <ts.SourceFile path={`${dir}/index.ts`}>
          {lines.join("\n")}
        </ts.SourceFile>
      );
    }
  }

  return files;
}

function addDirectoryEntry(
  map: Map<string, { specifier: string; names: string[] }[]>,
  dir: string,
  specifier: string,
  names: string[]
) {
  if (!map.has(dir)) map.set(dir, []);
  map.get(dir)!.push({ specifier, names });
}

// ── Classic barrels ─────────────────────────────────────────────────────

function generateClassicBarrels(
  context: SdkContext,
  clientMap: [string[], SdkClientType<SdkServiceOperation>],
  emitterOptions: ModularEmitterOptions
): Children[] {
  const [_, client] = clientMap;
  const { subfolder } = getModularClientOptions(clientMap);
  const srcPath = emitterOptions.modularOptions.sourceRoot;
  const sub = subfolder && subfolder !== "" ? subfolder + "/" : "";
  const classicBase = `${srcPath}/${sub}classic`;
  const methodMap = getMethodHierarchiesMap(context, client);

  // Collect all classic operation group entries
  const entries = new Map<string, { specifier: string; name: string }>();

  for (const [prefixKey] of methodMap) {
    if (prefixKey === "") continue;
    const prefixes = prefixKey.split("/");

    // Each layer in the hierarchy gets its own file
    for (let layer = 0; layer < prefixes.length; layer++) {
      const filePrefix = getClassicalLayerPrefix(
        prefixes,
        NameType.File,
        "/",
        layer
      );
      const interfacePrefix = getClassicalLayerPrefix(
        prefixes,
        NameType.Interface,
        "",
        layer
      );
      const specifier = `./${filePrefix}/index.js`;
      const interfaceName = `${interfacePrefix}Operations`;
      const key = `${filePrefix}`;

      if (!entries.has(key)) {
        entries.set(key, { specifier, name: interfaceName });
      }
    }
  }

  if (entries.size === 0) return [];

  const lines: string[] = [];
  for (const [, entry] of entries) {
    lines.push(`export { ${entry.name} } from "${entry.specifier}";`);
  }

  return [
    <ts.SourceFile path={`${classicBase}/index.ts`}>
      {lines.join("\n")}
    </ts.SourceFile>
  ];
}
