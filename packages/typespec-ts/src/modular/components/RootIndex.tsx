import { Children } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import {
  SdkClientType,
  SdkServiceOperation,
  SdkType,
  SdkModelType,
  SdkEnumType,
  SdkUnionType
} from "@azure-tools/typespec-client-generator-core";
import { NameType, normalizeName } from "@azure-tools/rlc-common";
import { SdkContext } from "../../utils/interfaces.js";
import { ModularEmitterOptions } from "../interfaces.js";
import {
  getClassicalClientName,
  getClassicalLayerPrefix
} from "../helpers/namingHelpers.js";
import { getModularClientOptions } from "../../utils/clientUtils.js";
import { getMethodHierarchiesMap } from "../../utils/operationUtil.js";
import {
  isLroOnlyOperation,
  getOperationOptionsName
} from "../helpers/operationHelpers.js";
import {
  getModelNamespaces,
  normalizeModelName,
  getModelsPath
} from "../emitModels.js";
import { emitQueue } from "../../framework/hooks/sdkTypes.js";
import { isExtensibleEnum } from "../type-expressions/get-enum-expression.js";
import { isDiscriminatedUnion } from "../serialization/serializeUtils.js";

// ── Props ───────────────────────────────────────────────────────────────

export interface RootIndexProps {
  context: SdkContext;
  emitterOptions: ModularEmitterOptions;
  clientMap: [string[], SdkClientType<SdkServiceOperation>][];
}

// ── Component ───────────────────────────────────────────────────────────

/**
 * Generates the root index.ts and sub-client index files.
 * Replaces the old ts-morph–based buildRootIndex and buildSubClientIndexFile.
 */
export function RootIndex(props: RootIndexProps): Children {
  const { context, emitterOptions, clientMap } = props;
  const srcPath = emitterOptions.modularOptions.sourceRoot;

  const importLines: string[] = [];
  const exportLines: string[] = [];
  const exportedNames = new Set<string>();
  const subClientFiles: Children[] = [];
  let modelsExported = false;

  if (clientMap.length === 0) {
    // No clients — only export models
    exportLines.push(
      ...computeModelExportLines(context, srcPath, "", exportedNames)
    );
    return (
      <ts.SourceFile path={`${srcPath}/index.ts`}>
        {exportLines.join("\n")}
      </ts.SourceFile>
    );
  }

  for (const subClient of clientMap) {
    const [_, client] = subClient;
    const { subfolder } = getModularClientOptions(subClient);
    const clientName = getClassicalClientName(client);
    const prefix = subfolder && subfolder !== "" ? subfolder + "/" : "";
    const isTopLevel = true;

    // 1. Client class
    exportLines.push(
      `export { ${clientName} } from "./${prefix}${normalizeName(clientName, NameType.File)}.js";`
    );

    // 2. SimplePollerLike (if LRO + compat)
    if (hasLroCompat(context, subClient)) {
      const specifier = `./${prefix}static-helpers/simplePollerHelpers.js`;
      exportLines.push(`export { SimplePollerLike } from "${specifier}";`);
    }

    // 3. Restore poller helpers (if LRO)
    if (hasLro(context, subClient)) {
      const specifier = `./${prefix}restorePollerHelpers.js`;
      const helpers = ["RestorePollerOptions", "restorePoller"];
      const aliasedHelpers = helpers.map((h) => {
        if (exportedNames.has(h)) {
          return `${h} as ${clientName}${h}`;
        }
        exportedNames.add(h);
        return h;
      });
      exportLines.push(
        `export { ${aliasedHelpers.join(", ")} } from "${specifier}";`
      );
    }

    // 4. Models (exported once)
    if (!modelsExported) {
      exportLines.push(
        ...computeModelExportLines(context, srcPath, clientName, exportedNames)
      );
      modelsExported = true;
    }

    // 5. API exports (interface only — OptionalParams)
    exportLines.push(
      ...computeApiInterfaceExports(
        context,
        subClient,
        emitterOptions,
        clientName,
        isTopLevel,
        exportedNames
      )
    );

    // 6. Classic exports
    exportLines.push(
      ...computeClassicExportLines(
        context,
        subClient,
        emitterOptions,
        clientName,
        isTopLevel,
        exportedNames
      )
    );

    // 7. Sub-client index file (if subfolder)
    if (subfolder && subfolder !== "") {
      subClientFiles.push(
        generateSubClientIndex(context, subClient, emitterOptions)
      );
    }
  }

  // 8. Paging types
  if (hasPaging(context)) {
    const pagingNames = [
      "PageSettings",
      "ContinuablePage",
      "PagedAsyncIterableIterator"
    ];
    const newNames = pagingNames.filter((n) => !exportedNames.has(n));
    if (newNames.length > 0) {
      importLines.push(
        `import { ${newNames.join(", ")} } from "./static-helpers/pagingHelpers.js";`
      );
      exportLines.push(`export { ${newNames.join(", ")} };`);
      newNames.forEach((n) => exportedNames.add(n));
    }
  }

  // 9. Multipart FileContents
  if (hasMultipartFileContents(context)) {
    if (!exportedNames.has("FileContents")) {
      importLines.push(
        `import { FileContents } from "./static-helpers/multipartHelpers.js";`
      );
      exportLines.push(`export { FileContents };`);
      exportedNames.add("FileContents");
    }
  }

  // 10. Azure cloud types (ARM)
  if (context.arm) {
    const cloudNames = ["AzureClouds", "AzureSupportedClouds"];
    const newNames = cloudNames.filter((n) => !exportedNames.has(n));
    if (newNames.length > 0) {
      importLines.push(
        `import { ${newNames.join(", ")} } from "./static-helpers/cloudSettingHelpers.js";`
      );
      exportLines.push(`export { ${newNames.join(", ")} };`);
      newNames.forEach((n) => exportedNames.add(n));
    }
  }

  const content = [...importLines, "", ...exportLines]
    .join("\n")
    .replace(/^\n+/, "");

  return (
    <>
      <ts.SourceFile path={`${srcPath}/index.ts`}>{content}</ts.SourceFile>
      {subClientFiles}
    </>
  );
}

// ── Sub-client index ────────────────────────────────────────────────────

function generateSubClientIndex(
  context: SdkContext,
  clientMap: [string[], SdkClientType<SdkServiceOperation>],
  emitterOptions: ModularEmitterOptions
): Children {
  const [_, client] = clientMap;
  const { subfolder } = getModularClientOptions(clientMap);
  const srcPath = emitterOptions.modularOptions.sourceRoot;
  const clientName = getClassicalClientName(client);
  const exportedNames = new Set<string>();
  const exportLines: string[] = [];

  // Client class (no subfolder prefix since we're inside it)
  exportLines.push(
    `export { ${clientName} } from "./${normalizeName(clientName, NameType.File)}.js";`
  );

  // SimplePollerLike (if LRO + compat)
  if (hasLroCompat(context, clientMap)) {
    exportLines.push(
      `export { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";`
    );
  }

  // Restore poller helpers (if LRO)
  if (hasLro(context, clientMap)) {
    const helpers = ["RestorePollerOptions", "restorePoller"];
    const aliasedHelpers = helpers.map((h) => {
      if (exportedNames.has(h)) {
        return `${h} as ${clientName}${h}`;
      }
      exportedNames.add(h);
      return h;
    });
    exportLines.push(
      `export { ${aliasedHelpers.join(", ")} } from "./restorePollerHelpers.js";`
    );
  }

  // API exports (interface only, recursive)
  exportLines.push(
    ...computeApiInterfaceExports(
      context,
      clientMap,
      emitterOptions,
      clientName,
      false,
      exportedNames
    )
  );

  // Classic exports
  exportLines.push(
    ...computeClassicExportLines(
      context,
      clientMap,
      emitterOptions,
      clientName,
      false,
      exportedNames
    )
  );

  const filePath = `${srcPath}/${subfolder && subfolder !== "" ? subfolder + "/" : ""}index.ts`;

  return (
    <ts.SourceFile path={filePath}>{exportLines.join("\n")}</ts.SourceFile>
  );
}

// ── Model export lines ──────────────────────────────────────────────────

function computeModelExportLines(
  context: SdkContext,
  srcPath: string,
  clientName: string,
  exportedNames: Set<string>
): string[] {
  // Group model types by barrel path
  const barrelExports = new Map<string, string[]>();

  for (const type of emitQueue) {
    if (!isModelLikeType(type)) continue;
    const namespaces = getModelNamespaces(context, type);
    const modelsFilePath = getModelsPath(srcPath, namespaces);
    const barrelPath = modelsFilePath.replace(/\/models\.ts$/, "/index.ts");

    if (!barrelExports.has(barrelPath)) {
      barrelExports.set(barrelPath, []);
    }

    for (const name of getTypeExportNames(context, type)) {
      if (!name.startsWith("_")) {
        barrelExports.get(barrelPath)!.push(name);
      }
    }
  }

  const lines: string[] = [];
  for (const [barrelPath, names] of barrelExports) {
    // Compute module specifier relative to root index
    const specifier =
      "./" + barrelPath.replace(srcPath + "/", "").replace(".ts", ".js");

    const aliasedNames = names
      .filter((n) => {
        // Deduplicate
        if (exportedNames.has(n)) {
          // Don't re-export, will be aliased
          return true;
        }
        return true;
      })
      .map((n) => {
        if (exportedNames.has(n)) {
          return `${n} as ${clientName}${n}`;
        }
        exportedNames.add(n);
        return n;
      });

    if (aliasedNames.length > 0) {
      lines.push(`export { ${aliasedNames.join(", ")} } from "${specifier}";`);
    }
  }

  return lines;
}

function isModelLikeType(type: SdkType): boolean {
  return type.kind === "model" || type.kind === "enum" || type.kind === "union";
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
  return names;
}

// ── API interface exports ───────────────────────────────────────────────

function computeApiInterfaceExports(
  context: SdkContext,
  clientMap: [string[], SdkClientType<SdkServiceOperation>],
  _emitterOptions: ModularEmitterOptions,
  clientName: string,
  isTopLevel: boolean,
  exportedNames: Set<string>
): string[] {
  const [_, client] = clientMap;
  const { subfolder } = getModularClientOptions(clientMap);
  const sub = subfolder && subfolder !== "" ? subfolder + "/" : "";
  const topLevelPrefix = isTopLevel ? sub : "";
  const methodMap = getMethodHierarchiesMap(context, client);
  const lines: string[] = [];

  // Context interface from api/index.ts (ClientOptionalParams)
  const contextOptionalParams = `${getClassicalClientName(client)}OptionalParams`;
  const contextSpecifier = `./${topLevelPrefix}api/index.js`;
  const contextNames = [contextOptionalParams].map((n) =>
    aliasIfDuplicate(n, clientName, exportedNames)
  );
  lines.push(
    `export { ${contextNames.join(", ")} } from "${contextSpecifier}";`
  );

  // Per-group OptionalParams from api/{group}/index.ts
  for (const [prefixKey, operations] of methodMap) {
    const prefixes = prefixKey === "" ? [] : prefixKey.split("/");

    // Root-level operations export from api/index.ts (already handled above for context)
    if (prefixKey === "") {
      const optNames = operations.map((op) =>
        aliasIfDuplicate(
          getOperationOptionsName([prefixes, op], true),
          clientName,
          exportedNames
        )
      );
      if (optNames.length > 0) {
        // Check if we already have an export from api/index.js
        // If so, we need to add to it; otherwise create a new line
        const existingIdx = lines.findIndex((l) =>
          l.includes(`from "${contextSpecifier}"`)
        );
        if (existingIdx >= 0) {
          // Append to existing line
          const existing = lines[existingIdx]!;
          const insertPoint = existing.indexOf(" }");
          lines[existingIdx] =
            existing.slice(0, insertPoint) +
            ", " +
            optNames.join(", ") +
            existing.slice(insertPoint);
        } else {
          lines.push(
            `export { ${optNames.join(", ")} } from "${contextSpecifier}";`
          );
        }
      }
      continue;
    }

    const normalizedDir = prefixes
      .map((p) => normalizeName(p, NameType.File))
      .join("/");
    const specifier = `./${topLevelPrefix}api/${normalizedDir}/index.js`;

    const optNames = operations.map((op) =>
      aliasIfDuplicate(
        getOperationOptionsName([prefixes, op], true),
        clientName,
        exportedNames
      )
    );

    if (optNames.length > 0) {
      lines.push(`export { ${optNames.join(", ")} } from "${specifier}";`);
    }
  }

  return lines;
}

function aliasIfDuplicate(
  name: string,
  clientName: string,
  exportedNames: Set<string>
): string {
  if (exportedNames.has(name)) {
    return `${name} as ${clientName}${name}`;
  }
  exportedNames.add(name);
  return name;
}

// ── Classic export lines ────────────────────────────────────────────────

function computeClassicExportLines(
  context: SdkContext,
  clientMap: [string[], SdkClientType<SdkServiceOperation>],
  _emitterOptions: ModularEmitterOptions,
  clientName: string,
  isTopLevel: boolean,
  exportedNames: Set<string>
): string[] {
  const [_, client] = clientMap;
  const { subfolder } = getModularClientOptions(clientMap);
  const sub = subfolder && subfolder !== "" ? subfolder + "/" : "";
  const topLevelPrefix = isTopLevel ? sub : "";
  const methodMap = getMethodHierarchiesMap(context, client);
  const specifier = `./${topLevelPrefix}classic/index.js`;

  const names: string[] = [];
  const seen = new Set<string>();

  for (const [prefixKey] of methodMap) {
    if (prefixKey === "") continue;
    const prefixes = prefixKey.split("/");

    for (let layer = 0; layer < prefixes.length; layer++) {
      const interfacePrefix = getClassicalLayerPrefix(
        prefixes,
        NameType.Interface,
        "",
        layer
      );
      const interfaceName = `${interfacePrefix}Operations`;

      if (!seen.has(interfaceName)) {
        seen.add(interfaceName);
        names.push(aliasIfDuplicate(interfaceName, clientName, exportedNames));
      }
    }
  }

  if (names.length === 0) return [];
  return [`export { ${names.join(", ")} } from "${specifier}";`];
}

// ── Feature detection helpers ───────────────────────────────────────────

function hasPaging(context: SdkContext): boolean {
  return context.sdkPackage.clients.some((client) => {
    const methodMap = getMethodHierarchiesMap(context, client);
    for (const [, operations] of methodMap) {
      if (
        operations.some((op) => op.kind === "paging" || op.kind === "lropaging")
      ) {
        return true;
      }
    }
    return false;
  });
}

function hasMultipartFileContents(context: SdkContext): boolean {
  return context.sdkPackage.models.some((x) =>
    x.properties.some(
      (y) =>
        y.kind === "property" && y.serializationOptions.multipart?.isFilePart
    )
  );
}

function hasLro(
  context: SdkContext,
  clientMap: [string[], SdkClientType<SdkServiceOperation>]
): boolean {
  const [_, client] = clientMap;
  const methodMap = getMethodHierarchiesMap(context, client);
  return Array.from(methodMap.values()).some((operations) =>
    operations.some(isLroOnlyOperation)
  );
}

function hasLroCompat(
  context: SdkContext,
  clientMap: [string[], SdkClientType<SdkServiceOperation>]
): boolean {
  return (
    hasLro(context, clientMap) && context.rlcOptions?.compatibilityLro === true
  );
}
