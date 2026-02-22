import { code, Children, refkey, Refkey } from "@alloy-js/core";
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
import { azureCoreLroLib } from "./ExternalPackages.js";
import path from "path";
import { clientContextRefkey } from "./ClientContext.js";
import { operationRefkey } from "./Operations.js";

// ── Refkey helpers ──────────────────────────────────────────────────────

/** Refkey for a classical _get${name}Operations exported function. */
export function classicalOperationGroupFunctionRefkey(
  client: SdkClientType<SdkServiceOperation>,
  prefixes: string[],
  layer: number
): Refkey {
  const name = getClassicalLayerPrefix(prefixes, NameType.Interface, "", layer);
  return refkey(client, "classicalOpsFunction", name);
}

/** Refkey for a classical ${name}Operations exported interface. */
export function classicalOperationGroupInterfaceRefkey(
  client: SdkClientType<SdkServiceOperation>,
  prefixes: string[],
  layer: number
): Refkey {
  const name = getClassicalLayerPrefix(prefixes, NameType.Interface, "", layer);
  return refkey(client, "classicalOpsInterface", name);
}

// ── Types ───────────────────────────────────────────────────────────────

interface OperationInfo {
  declaration: ReturnType<typeof getOperationFunction>;
  oriName: string | undefined;
  apiFuncName: string;
  isLro?: boolean;
  lroFinalReturnType?: string;
  operation: ServiceOperation;
}

interface FileData {
  filePath: string;
  rlcClientName: string;
  client: SdkClientType<SdkServiceOperation>;
  /** Interfaces to declare, keyed by name */
  interfaces: Map<
    string,
    {
      name: string;
      layer: number;
      doc: string;
      properties: InterfaceProperty[];
      refkey: Refkey;
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
  bodyEntries: Children[];
  hasLroCompat?: boolean;
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
  refkey: Refkey;
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
        client,
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
    files.push(renderOperationGroupFile(fileData, context, client));
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
      properties: [],
      refkey: classicalOperationGroupInterfaceRefkey(
        clientMap[1],
        prefixes,
        layer
      )
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
        entries: [],
        refkey: classicalOperationGroupFunctionRefkey(
          clientMap[1],
          prefixes,
          layer
        )
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
        lroFinalReturnType: declaration.lroFinalReturnType,
        operation
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
            (p.type?.endsWith("operationOptions__") || p.hasQuestionToken
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
          type: `(${paramStr}) => Promise<SimplePollerLike<${azureCoreLroLib.OperationState}<${returnType}>, ${returnType}>>`,
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

    const bodyEntries: Children[] = [];
    for (const info of operationInfos) {
      const d = info.declaration;
      const methodName = getClassicalMethodName(info);
      const classicalParamStr = d.parameters
        ?.filter((p) => p.name !== "context")
        .map(
          (p) =>
            p.name +
            (p.type?.endsWith("operationOptions__") || p.hasQuestionToken
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
        code`${methodName}: (${classicalParamStr}) => ${operationRefkey(info.operation)}(${apiParamStr})`
      );

      // LRO compat body entries
      if (dpgContext.rlcOptions?.compatibilityLro && info.isLro) {
        const beginName = normalizeName(`begin_${methodName}`, NameType.Method);
        const beginAndWaitName = normalizeName(
          `${beginName}_andWait`,
          NameType.Method
        );
        bodyEntries.push(
          code`${beginName}: async (${classicalParamStr}) => {
            const poller = ${operationRefkey(info.operation)}(${apiParamStr});
            await poller.submitted();
            return getSimplePoller(poller);
          }`
        );
        bodyEntries.push(
          code`${beginAndWaitName}: async (${classicalParamStr}) => {
            return await ${operationRefkey(info.operation)}(${apiParamStr});
          }`
        );
      }
    }

    const hasLroCompat = !!(
      dpgContext.rlcOptions?.compatibilityLro &&
      operationInfos.some((info) => info.isLro)
    );
    fileData.leafFunctions.push({
      name: functionName,
      layer,
      rlcClientName: rlcClientName!,
      bodyEntries,
      hasLroCompat
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
        spreadLeaf: functionName,
        refkey: classicalOperationGroupFunctionRefkey(
          clientMap[1],
          prefixes,
          layer
        )
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
  dpgContext: SdkContext,
  client: SdkClientType<SdkServiceOperation>
): Children {
  const { filePath } = fileData;
  const clientCtxRef = clientContextRefkey(client);

  // Compute the layer depth for SimplePoller import path
  const maxLayer = Math.max(
    ...fileData.leafFunctions.map((f) => f.layer),
    ...fileData.operationsFunctions.map((f) => f.layer),
    0
  );

  // Check if LRO compat is needed
  const needsLroCompat =
    dpgContext.rlcOptions?.compatibilityLro &&
    (fileData.leafFunctions.some((f) => f.hasLroCompat) ||
      [...fileData.interfaces.values()].some((i) =>
        i.properties.some((p) => p.type.includes("SimplePollerLike"))
      ));

  // Site 3: SimplePoller import (kept manual — static helper refkeys not auto-importable yet)
  const simplePollerImport = needsLroCompat
    ? `import { SimplePollerLike, getSimplePoller } from "${"../".repeat(maxLayer + 2)}static-helpers/simplePollerHelpers.js";`
    : "";

  // Build leaf functions as code templates using clientContextRefkey (replaces Site 1)
  // and operationRefkey (replaces Site 2) for auto-imports
  const leafFunctionBlocks: Children[] = [];
  for (const leaf of fileData.leafFunctions) {
    const bodyContent: Children[] = [];
    for (let i = 0; i < leaf.bodyEntries.length; i++) {
      if (i > 0) bodyContent.push(",\n    ");
      bodyContent.push(leaf.bodyEntries[i]);
    }
    leafFunctionBlocks.push(
      code`function ${leaf.name}(context: ${clientCtxRef}) {\n  return {\n    ${bodyContent}\n  };\n}`
    );
  }

  return (
    <ts.SourceFile path={filePath}>
      {simplePollerImport}
      {Array.from(fileData.interfaces.values()).map((iface) => {
        const propLines = iface.properties.map((p) => {
          const docStr =
            p.docs && p.docs.length > 0
              ? p.docs.map((d) => `/** ${d} */`).join("\n") + "\n"
              : "";
          return `${docStr}${p.name}: ${p.type};`;
        });
        return (
          <ts.InterfaceDeclaration
            export
            name={iface.name}
            doc={iface.doc}
            refkey={iface.refkey}
          >
            {code`${propLines.join("\n")}`}
          </ts.InterfaceDeclaration>
        );
      })}

      {leafFunctionBlocks}

      {fileData.operationsFunctions.map((opsFn) => {
        const bodyParts: Children[] = [];
        if (opsFn.spreadLeaf) {
          bodyParts.push(`...${opsFn.spreadLeaf}(context)`);
        }
        bodyParts.push(...opsFn.entries);

        const bodyContent: Children[] = [];
        for (let i = 0; i < bodyParts.length; i++) {
          if (i > 0) bodyContent.push(",\n  ");
          bodyContent.push(bodyParts[i]);
        }

        return (
          <ts.FunctionDeclaration
            export
            name={opsFn.name}
            parameters={[{ name: "context", type: clientCtxRef }]}
            returnType={opsFn.returnType}
            refkey={opsFn.refkey}
          >
            {code`return {\n  ${bodyContent}\n};`}
          </ts.FunctionDeclaration>
        );
      })}
    </ts.SourceFile>
  );
}
