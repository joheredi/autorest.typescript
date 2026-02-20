import { code, Children } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import {
  SdkClientType,
  SdkServiceOperation
} from "@azure-tools/typespec-client-generator-core";
import { NameType, normalizeName } from "@azure-tools/rlc-common";
import { SdkContext } from "../../utils/interfaces.js";
import { ModularEmitterOptions } from "../interfaces.js";
import { getClassicalLayerPrefix } from "../helpers/namingHelpers.js";
import { getOperationFunction } from "../helpers/operationHelpers.js";
import { getModularClientOptions } from "../../utils/clientUtils.js";
import {
  getMethodHierarchiesMap,
  ServiceOperation
} from "../../utils/operationUtil.js";
import path from "path";

// ── Types ───────────────────────────────────────────────────────────────

interface OperationInfo {
  declaration: ReturnType<typeof getOperationFunction>;
  oriName: string | undefined;
  apiFuncName: string;
  isLro?: boolean;
  lroFinalReturnType?: string;
}

interface FileData {
  filePath: string;
  rlcClientName: string;
  /** Interfaces to declare, keyed by name */
  interfaces: Map<
    string,
    {
      name: string;
      layer: number;
      doc: string;
      properties: InterfaceProperty[];
    }
  >;
  /** Leaf functions (_getXxx) that return operation implementations */
  leafFunctions: LeafFunction[];
  /** Operations functions (_getXxxOperations) that combine groups */
  operationsFunctions: OperationsFunction[];
}

interface InterfaceProperty {
  name: string;
  type: string;
  docs?: string[];
}

interface LeafFunction {
  name: string;
  layer: number;
  rlcClientName: string;
  bodyEntries: string[];
}

interface OperationsFunction {
  name: string;
  layer: number;
  rlcClientName: string;
  returnType: string;
  /** Entries like `subGroup: _getSubGroupOperations(context)` */
  entries: string[];
  /** If this function also spreads a leaf function */
  spreadLeaf?: string;
}

// ── Component ───────────────────────────────────────────────────────────

export interface ClassicalOperationGroupsProps {
  context: SdkContext;
  clientMap: [string[], SdkClientType<SdkServiceOperation>];
  emitterOptions: ModularEmitterOptions;
}

/**
 * Generates all classical operation group files for a client.
 * Each operation group gets its own file with:
 * - An interface defining the operation signatures
 * - A function returning the operation implementations
 * - An exported function combining sub-groups
 */
export function ClassicalOperationGroups(
  props: ClassicalOperationGroupsProps
): Children {
  const { context, clientMap, emitterOptions } = props;
  const [_hierarchy, client] = clientMap;
  const { subfolder, rlcClientName } = getModularClientOptions(clientMap);
  const srcPath = emitterOptions.modularOptions.sourceRoot;
  const methodMap = getMethodHierarchiesMap(context, client);

  // Pre-compute all file data
  const fileDataMap = new Map<string, FileData>();

  function getOrCreateFileData(fileName: string, filePath: string): FileData {
    if (!fileDataMap.has(fileName)) {
      fileDataMap.set(fileName, {
        filePath,
        rlcClientName: rlcClientName!,
        interfaces: new Map(),
        leafFunctions: [],
        operationsFunctions: []
      });
    }
    return fileDataMap.get(fileName)!;
  }

  // First pass: leaf layers (layer = prefixes.length - 1)
  for (const [prefixKey, operations] of methodMap) {
    const prefixes = prefixKey.split("/");
    if (prefixes.length <= 0 || prefixKey === "") continue;

    const layer = prefixes.length - 1;
    const fileName = `${getClassicalLayerPrefix(
      prefixes,
      NameType.File,
      "/",
      layer
    )}/index`;
    const filePath = path.join(
      `${srcPath}/${subfolder && subfolder !== "" ? subfolder + "/" : ""}classic/${fileName}.ts`
    );
    const fileData = getOrCreateFileData(fileName, filePath);

    processOperationGroup(
      context,
      clientMap,
      fileData,
      prefixes,
      operations,
      layer
    );
  }

  // Second pass: intermediate layers (layer 0..length-2)
  for (const [prefixKey, operations] of methodMap) {
    const prefixes = prefixKey.split("/");
    if (prefixes.length <= 0 || prefixKey === "") continue;

    for (let layer = 0; layer < prefixes.length - 1; layer++) {
      const fileName = `${getClassicalLayerPrefix(
        prefixes,
        NameType.File,
        "/",
        layer
      )}/index`;
      const filePath = path.join(
        `${srcPath}/${subfolder && subfolder !== "" ? subfolder + "/" : ""}classic/${fileName}.ts`
      );
      const fileData = getOrCreateFileData(fileName, filePath);

      processOperationGroup(
        context,
        clientMap,
        fileData,
        prefixes,
        operations,
        layer
      );
    }
  }

  // Render all files
  const files: Children[] = [];
  for (const [, fileData] of fileDataMap) {
    files.push(renderOperationGroupFile(fileData, context));
  }
  return <>{files}</>;
}

// ── Data building ───────────────────────────────────────────────────────

function processOperationGroup(
  dpgContext: SdkContext,
  clientMap: [string[], SdkClientType<SdkServiceOperation>],
  fileData: FileData,
  prefixes: string[],
  operations: ServiceOperation[],
  layer: number
) {
  const { rlcClientName } = getModularClientOptions(clientMap);

  const interfaceNamePrefix = getClassicalLayerPrefix(
    prefixes,
    NameType.Interface,
    "",
    layer
  );
  const interfaceName = `${interfaceNamePrefix}Operations`;

  // Get or create the interface
  if (!fileData.interfaces.has(interfaceName)) {
    fileData.interfaces.set(interfaceName, {
      name: interfaceName,
      layer,
      doc: `Interface representing a ${interfaceNamePrefix} operations.`,
      properties: []
    });
  }
  const iface = fileData.interfaces.get(interfaceName)!;

  if (layer !== prefixes.length - 1) {
    // Intermediate layer: add sub-group property
    const nextLayerInterfaceName = `${getClassicalLayerPrefix(
      prefixes,
      NameType.Interface,
      "",
      layer + 1
    )}Operations`;
    const name = normalizeName(
      (layer === prefixes.length - 1 ? prefixes[layer] : prefixes[layer + 1]) ??
        "",
      NameType.Property
    );

    if (!iface.properties.some((p) => p.name === name)) {
      iface.properties.push({
        name,
        type: nextLayerInterfaceName
      });
    }

    // Build or update operations function
    const operationFunctionName = `_get${getClassicalLayerPrefix(
      prefixes,
      NameType.Interface,
      "",
      layer
    )}Operations`;
    const nextLayerOperationFunctionName = `_get${getClassicalLayerPrefix(
      prefixes,
      NameType.Interface,
      "",
      layer + 1
    )}Operations`;

    let opsFn = fileData.operationsFunctions.find(
      (f) => f.name === operationFunctionName
    );
    if (!opsFn) {
      opsFn = {
        name: operationFunctionName,
        layer,
        rlcClientName: rlcClientName!,
        returnType: interfaceName,
        entries: []
      };
      fileData.operationsFunctions.push(opsFn);
    }

    const entryStr = `${name}: ${nextLayerOperationFunctionName}(context)`;
    if (!opsFn.entries.some((e) => e.includes(`${name}:`))) {
      opsFn.entries.push(entryStr);
    }
  } else {
    // Leaf layer: build operation info and interface properties
    const operationInfos: OperationInfo[] = operations.map((operation) => {
      const declaration = getOperationFunction(
        dpgContext,
        [prefixes, operation],
        rlcClientName!
      );
      return {
        declaration,
        oriName: operation.oriName,
        apiFuncName: declaration.name ?? "FIXME",
        isLro: declaration.isLro,
        lroFinalReturnType: declaration.lroFinalReturnType
      };
    });

    // Add operation signatures to interface
    for (const info of operationInfos) {
      const d = info.declaration;
      const methodName = getClassicalMethodName(info);
      const paramStr = d.parameters
        ?.filter((p) => p.name !== "context")
        .map(
          (p) =>
            p.name +
            (p.type?.toString().endsWith("operationOptions__") ||
            p.hasQuestionToken
              ? "?"
              : "") +
            ": " +
            p.type
        )
        .join(",");

      iface.properties.push({
        name: methodName,
        type: `(${paramStr}) => ${d.returnType}`,
        docs: d.docs as string[]
      });

      // LRO compat interface properties
      if (dpgContext.rlcOptions?.compatibilityLro && info.isLro) {
        const returnType = info.lroFinalReturnType ?? "void";
        const beginName = normalizeName(`begin_${methodName}`, NameType.Method);
        const beginAndWaitName = normalizeName(
          `${beginName}_andWait`,
          NameType.Method
        );

        iface.properties.push({
          name: beginName,
          type: `(${paramStr}) => Promise<SimplePollerLike<OperationState<${returnType}>, ${returnType}>>`,
          docs: [`@deprecated use ${methodName} instead`]
        });
        iface.properties.push({
          name: beginAndWaitName,
          type: `(${paramStr}) => Promise<${returnType}>`,
          docs: [`@deprecated use ${methodName} instead`]
        });
      }
    }

    // Build leaf function
    const functionName = `_get${getClassicalLayerPrefix(
      prefixes,
      NameType.Interface,
      "",
      layer
    )}`;

    const bodyEntries: string[] = [];
    for (const info of operationInfos) {
      const d = info.declaration;
      const methodName = getClassicalMethodName(info);
      const classicalParamStr = d.parameters
        ?.filter((p) => p.name !== "context")
        .map(
          (p) =>
            p.name +
            (p.type?.toString().endsWith("operationOptions__") ||
            p.hasQuestionToken
              ? "?"
              : "") +
            ": " +
            p.type
        )
        .join(",");
      const apiParamStr = [
        "context",
        ...(d.parameters?.map((p) => p.name).filter((p) => p !== "context") ??
          [])
      ].join(",");

      bodyEntries.push(
        `${methodName}: (${classicalParamStr}) => ${info.apiFuncName}(${apiParamStr})`
      );

      // LRO compat body entries
      if (dpgContext.rlcOptions?.compatibilityLro && info.isLro) {
        const beginName = normalizeName(`begin_${methodName}`, NameType.Method);
        const beginAndWaitName = normalizeName(
          `${beginName}_andWait`,
          NameType.Method
        );
        bodyEntries.push(
          `${beginName}: async (${classicalParamStr}) => {
            const poller = ${info.apiFuncName}(${apiParamStr});
            await poller.submitted();
            return getSimplePoller(poller);
          }`
        );
        bodyEntries.push(
          `${beginAndWaitName}: async (${classicalParamStr}) => {
            return await ${info.apiFuncName}(${apiParamStr});
          }`
        );
      }
    }

    fileData.leafFunctions.push({
      name: functionName,
      layer,
      rlcClientName: rlcClientName!,
      bodyEntries
    });

    // Build operations function
    const operationFunctionName = `_get${getClassicalLayerPrefix(
      prefixes,
      NameType.Interface,
      "",
      layer
    )}Operations`;

    let opsFn = fileData.operationsFunctions.find(
      (f) => f.name === operationFunctionName
    );
    if (!opsFn) {
      opsFn = {
        name: operationFunctionName,
        layer,
        rlcClientName: rlcClientName!,
        returnType: interfaceName,
        entries: [],
        spreadLeaf: functionName
      };
      fileData.operationsFunctions.push(opsFn);
    } else if (!opsFn.spreadLeaf) {
      opsFn.spreadLeaf = functionName;
    }
  }
}

function getClassicalMethodName(info: OperationInfo): string {
  return normalizeName(
    info.oriName ??
      info.declaration.propertyName ??
      info.declaration.name ??
      "FIXME",
    NameType.Method
  );
}

// ── Rendering ───────────────────────────────────────────────────────────

function renderOperationGroupFile(
  fileData: FileData,
  dpgContext: SdkContext
): Children {
  const { filePath, rlcClientName } = fileData;

  // Collect all API function names referenced in leaf functions
  const apiImportNames = new Set<string>();
  for (const leaf of fileData.leafFunctions) {
    for (const entry of leaf.bodyEntries) {
      // Extract function names from entries like "methodName: (params) => funcName(args)"
      const match = entry.match(/=>\s*(\w+)\(/);
      if (match && match[1]) {
        apiImportNames.add(match[1]);
      }
    }
  }

  // Compute the layer depth for the client context import
  const maxLayer = Math.max(
    ...fileData.leafFunctions.map((f) => f.layer),
    ...fileData.operationsFunctions.map((f) => f.layer),
    0
  );

  const contextImportPath = `${"../".repeat(maxLayer + 2)}api/${normalizeName(
    rlcClientName,
    NameType.File
  )}.js`;

  // Collect referenced operation function names from other files
  const referencedOpsFunctions = new Set<string>();
  for (const opsFn of fileData.operationsFunctions) {
    for (const entry of opsFn.entries) {
      const match = entry.match(/:\s*(\w+)\(context\)/);
      if (match && match[1]) {
        referencedOpsFunctions.add(match[1]);
      }
    }
  }

  // Collect referenced interface names from sub-groups
  const referencedInterfaces = new Set<string>();
  for (const iface of fileData.interfaces.values()) {
    for (const prop of iface.properties) {
      if (
        prop.type.endsWith("Operations") &&
        !prop.type.includes("=>") &&
        !fileData.interfaces.has(prop.type)
      ) {
        referencedInterfaces.add(prop.type);
      }
    }
  }

  // Check if LRO compat is needed
  const needsLroCompat =
    dpgContext.rlcOptions?.compatibilityLro &&
    (fileData.leafFunctions.some((f) =>
      f.bodyEntries.some((e) => e.includes("getSimplePoller"))
    ) ||
      [...fileData.interfaces.values()].some((i) =>
        i.properties.some((p) => p.type.includes("SimplePollerLike"))
      ));

  // Build import block
  const imports: string[] = [];
  imports.push(`import { ${rlcClientName} } from "${contextImportPath}";`);

  if (apiImportNames.size > 0) {
    imports.push(
      `import { ${[...apiImportNames].join(", ")} } from "${"../".repeat(maxLayer + 2)}api/index.js";`
    );
  }

  if (needsLroCompat) {
    imports.push(
      `import { SimplePollerLike, getSimplePoller } from "${"../".repeat(maxLayer + 2)}static-helpers/simplePollerHelpers.js";`
    );
    imports.push(`import { OperationState } from "@azure/core-lro";`);
  }

  // Build interfaces
  const interfaceBlocks: string[] = [];
  for (const [, iface] of fileData.interfaces) {
    const propLines = iface.properties.map((p) => {
      const docStr =
        p.docs && p.docs.length > 0
          ? p.docs.map((d) => `/** ${d} */`).join("\n") + "\n"
          : "";
      return `${docStr}${p.name}: ${p.type};`;
    });
    interfaceBlocks.push(
      `/** ${iface.doc} */\nexport interface ${iface.name} {\n  ${propLines.join("\n  ")}\n}`
    );
  }

  // Build leaf functions
  const leafFunctionBlocks: string[] = [];
  for (const leaf of fileData.leafFunctions) {
    leafFunctionBlocks.push(
      `function ${leaf.name}(context: ${leaf.rlcClientName}) {\n  return {\n    ${leaf.bodyEntries.join(",\n    ")}\n  };\n}`
    );
  }

  // Build operations functions
  const opsFunctionBlocks: string[] = [];
  for (const opsFn of fileData.operationsFunctions) {
    const bodyParts: string[] = [];
    if (opsFn.spreadLeaf) {
      bodyParts.push(`...${opsFn.spreadLeaf}(context)`);
    }
    bodyParts.push(...opsFn.entries);

    opsFunctionBlocks.push(
      `export function ${opsFn.name}(context: ${opsFn.rlcClientName}): ${opsFn.returnType} {\n  return {\n    ${bodyParts.join(",\n    ")}\n  };\n}`
    );
  }

  return (
    <ts.SourceFile path={filePath}>
      {code`
${imports.join("\n")}

${interfaceBlocks.join("\n\n")}

${leafFunctionBlocks.join("\n\n")}

${opsFunctionBlocks.join("\n\n")}
`}
    </ts.SourceFile>
  );
}
