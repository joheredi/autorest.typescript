import { Children, code, For, refkey, Refkey } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import {
  SdkClientType,
  SdkHttpOperation,
  SdkServiceOperation,
  SdkType
} from "@azure-tools/typespec-client-generator-core";
import {
  NameType,
  normalizeName,
  isAzurePackage
} from "@azure-tools/rlc-common";
import { SdkContext } from "../../utils/interfaces.js";
import { ModularEmitterOptions } from "../interfaces.js";
import {
  getMethodHierarchiesMap,
  ServiceOperation,
  hasDualFormatSupport,
  isXmlPayload
} from "../../utils/operationUtil.js";
import {
  getModularClientOptions,
  isRLCMultiEndpoint
} from "../../utils/clientUtils.js";
import {
  getSendPrivateFunction,
  getDeserializePrivateFunction,
  getOperationFunction,
  getOperationOptionsName,
  getResponseHeaders,
  getExceptionResponseHeaders,
  buildHeaderOnlyResponseType,
  buildHeaderOnlyResponseValue,
  isLroOnlyOperation,
  isLroAndPagingOperation,
  isPagingOnlyOperation
} from "../helpers/operationHelpers.js";
import { getOperationName } from "../helpers/namingHelpers.js";
import {
  httpRuntimeLib,
  azureCoreClientLib,
  azureCoreLroLib,
  azureCoreUtilLib
} from "./ExternalPackages.js";
import { operationOptionsRefkey } from "./OperationOptions.js";
import { typeRefkey as modelTypeRefkey } from "./Models.js";
import {
  serializerRefkey,
  deserializerRefkey
} from "./Serializers.js";
import { normalizeModelName } from "../model-utils.js";
import { buildModelSerializer } from "../serialization/buildSerializerFunction.js";
import { buildModelDeserializer } from "../serialization/buildDeserializerFunction.js";

// ── Refkey helpers ──────────────────────────────────────────────────────

/** Refkey for a public operation function. */
export function operationRefkey(operation: ServiceOperation): Refkey {
  return refkey(operation, "api");
}

/** Refkey for the response headers deserializer function. */
export function deserializeHeadersRefkey(operation: ServiceOperation): Refkey {
  return refkey(operation, "deserializeHeaders");
}

/** Refkey for the exception headers deserializer function. */
export function deserializeExceptionHeadersRefkey(
  operation: ServiceOperation
): Refkey {
  return refkey(operation, "deserializeExceptionHeaders");
}

/** Returns the appropriate Alloy external package for runtime imports. */
function getRuntimeLib(context: SdkContext) {
  return isAzurePackage({ options: context.rlcOptions ?? {} })
    ? azureCoreClientLib
    : httpRuntimeLib;
}

// ── Types ───────────────────────────────────────────────────────────────

export interface OperationsProps {
  context: SdkContext;
  clientMap: [string[], SdkClientType<SdkServiceOperation>];
  emitterOptions: ModularEmitterOptions;
}

// ── Import computation ──────────────────────────────────────────────────

interface StaticHelperImport {
  path: string;
  names: string[];
}

function collectStaticHelperImports(
  operations: ServiceOperation[]
): StaticHelperImport[] {
  const staticHelpers = new Map<string, Set<string>>();

  for (const op of operations) {
    const hasUrlTemplate =
      op.operation.parameters.some(
        (p) => p.kind === "path" || p.kind === "query"
      ) || op.operation.uriTemplate !== op.operation.path;

    if (hasUrlTemplate) {
      addStaticHelper(staticHelpers, "urlTemplate.js", "expandUrlTemplate");
    }

    if (isLroOnlyOperation(op) || isLroAndPagingOperation(op)) {
      addStaticHelper(
        staticHelpers,
        "pollingHelpers.js",
        "getLongRunningPoller"
      );
    }

    if (isPagingOnlyOperation(op) || isLroAndPagingOperation(op)) {
      addStaticHelper(
        staticHelpers,
        "pagingHelpers.js",
        "PagedAsyncIterableIterator"
      );
      addStaticHelper(
        staticHelpers,
        "pagingHelpers.js",
        "buildPagedAsyncIterator"
      );
    }

    // Check for binary response
    const response = op.response;
    if (response?.type?.kind === "bytes" && response.type.encode === "bytes") {
      addStaticHelper(
        staticHelpers,
        "serialization/get-binary-response.js",
        "getBinaryResponse"
      );
    }

    // Check for XML dual-format
    const bodyContentTypes = op.operation.bodyParam?.contentTypes ?? [];
    const responseContentTypes = op.operation.responses[0]?.contentTypes ?? [];
    if (
      hasDualFormatSupport(bodyContentTypes) ||
      hasDualFormatSupport(responseContentTypes) ||
      isXmlPayload(bodyContentTypes) ||
      isXmlPayload(responseContentTypes)
    ) {
      addStaticHelper(
        staticHelpers,
        "serialization/xml-helpers.js",
        "isXmlContentType"
      );
    }
  }

  const result: StaticHelperImport[] = [];
  for (const [path, names] of staticHelpers) {
    result.push({ path, names: Array.from(names) });
  }
  return result;
}

function addStaticHelper(
  map: Map<string, Set<string>>,
  path: string,
  name: string
) {
  if (!map.has(path)) map.set(path, new Set());
  map.get(path)!.add(name);
}

/**
 * Builds the type refkey map for replacing hardcoded type strings
 * in generated function structures with Alloy refkeys.
 * Alloy resolves these refkeys against declarations from Models,
 * Serializers, OperationOptions, and ExternalPackages components
 * and generates imports automatically.
 */
function buildTypeRefkeys(
  context: SdkContext,
  operations: ServiceOperation[],
  prefixes: string[]
): Record<string, Refkey> {
  const isAzure = isAzurePackage({ options: context.rlcOptions ?? {} });
  const runtimeLib = isAzure ? azureCoreClientLib : httpRuntimeLib;
  const utilLib = isAzure ? azureCoreUtilLib : httpRuntimeLib;

  const map: Record<string, Refkey> = {
    // Runtime symbols from external npm packages
    StreamableMethod: runtimeLib.StreamableMethod,
    PathUncheckedResponse: runtimeLib.PathUncheckedResponse,
    createRestError: runtimeLib.createRestError,
    operationOptionsToRequestParameters:
      runtimeLib.operationOptionsToRequestParameters,
    uint8ArrayToString: utilLib.uint8ArrayToString,
    stringToUint8Array: utilLib.stringToUint8Array
  };

  // Add LRO refkeys only when needed
  const hasLro = operations.some(
    (op) => isLroOnlyOperation(op) || isLroAndPagingOperation(op)
  );
  if (hasLro) {
    map["PollerLike"] = azureCoreLroLib.PollerLike;
    map["OperationState"] = azureCoreLroLib.OperationState;
  }

  // Add model type, serializer/deserializer, and operation options refkeys
  const visited = new Set<SdkType>();

  function visitType(type: SdkType): void {
    if (visited.has(type)) return;
    visited.add(type);

    if (type.kind === "array") {
      visitType(type.valueType);
      return;
    }
    if (type.kind === "dict") {
      visitType(type.valueType);
      return;
    }
    if (type.kind === "nullable") {
      visitType(type.type);
      return;
    }

    if (
      (type.kind !== "model" &&
        type.kind !== "enum" &&
        type.kind !== "union") ||
      !type.name
    ) {
      return;
    }

    // Model type name → refkey for the type declaration
    const name = normalizeModelName(context, type);
    if (name && !map[name]) {
      map[name] = modelTypeRefkey(type);
    }

    // Serializer function name → refkey for the serializer declaration
    const serName = buildModelSerializer(context, type, {
      nameOnly: true,
      skipDiscriminatedUnionSuffix: false
    });
    if (typeof serName === "string" && !map[serName]) {
      map[serName] = serializerRefkey(type);
    }

    // Deserializer function name → refkey for the deserializer declaration
    const desName = buildModelDeserializer(context, type, {
      nameOnly: true,
      skipDiscriminatedUnionSuffix: false
    });
    if (typeof desName === "string" && !map[desName]) {
      map[desName] = deserializerRefkey(type);
    }

    // Walk model properties to find nested types referenced in serializer calls
    if (type.kind === "model" && type.properties) {
      for (const prop of type.properties) {
        visitType(prop.type);
      }
    }
  }

  for (const op of operations) {
    for (const param of op.parameters) {
      visitType(param.type);
    }
    if (op.operation.bodyParam?.type) {
      visitType(op.operation.bodyParam.type);
    }
    for (const resp of op.operation.responses) {
      if (resp.type) {
        visitType(resp.type);
      }
    }
    if (op.response?.type) {
      visitType(op.response.type);
    }

    // Operation options type name → refkey
    const optName = getOperationOptionsName([prefixes, op], true);
    if (optName && !map[optName]) {
      map[optName] = operationOptionsRefkey(op);
    }
  }

  return map;
}

/**
 * Builds static helper import statements as raw strings.
 * These are internal relative imports that can't use Alloy auto-import yet.
 */
function buildStaticHelperImportBlock(
  imports: StaticHelperImport[],
  prefixes: string[],
  prefixKey: string
): string {
  const lines: string[] = [];
  for (const sh of imports) {
    const depth = prefixKey === "" ? 0 : prefixes.length;
    const relativePrefix = "../".repeat(depth + 1);
    lines.push(
      `import { ${sh.names.join(", ")} } from "${relativePrefix}static-helpers/${sh.path}";`
    );
  }
  return lines.join("\n");
}

// ── Root component ──────────────────────────────────────────────────────

/**
 * Renders operation source files for each operation group.
 * Each operation group gets an `operations.ts` file containing
 * send, deserialize, and public operation functions.
 */
export function Operations(props: OperationsProps) {
  const { context, clientMap, emitterOptions } = props;
  const [_, client] = clientMap;
  const { subfolder, rlcClientName } = getModularClientOptions(clientMap);
  const isMultiEndpoint = isRLCMultiEndpoint(context);
  const clientType = isMultiEndpoint ? `Client.${rlcClientName}` : "Client";
  const methodMap = getMethodHierarchiesMap(context, client);

  return (
    <For each={Array.from(methodMap.entries())}>
      {([prefixKey, operations]) => {
        const prefixes = prefixKey.split("/");
        const operationFileName =
          prefixes.length > 0 && prefixKey !== ""
            ? `${prefixes
                .map((h) => normalizeName(h, NameType.File))
                .join("/")}/operations`
            : "operations";

        const srcPath = emitterOptions.modularOptions.sourceRoot;
        const filepath = `${srcPath}/${
          subfolder && subfolder !== "" ? subfolder + "/" : ""
        }api/${operationFileName}.ts`;

        // Static helper imports (internal relative paths — can't use auto-import yet)
        const staticHelperImports = collectStaticHelperImports(operations);
        const staticHelperBlock = buildStaticHelperImportBlock(
          staticHelperImports,
          prefixes,
          prefixKey
        );

        // Client import (internal module)
        const indexPathPrefix =
          "../".repeat(prefixKey === "" ? 0 : prefixes.length) || "./";
        const clientImport = `import { ${rlcClientName} as Client } from "${indexPathPrefix}index.js";`;

        // Refkey map: maps symbol name strings found in generated function text
        // to Alloy refkeys. Alloy resolves these against declarations from
        // Models, Serializers, OperationOptions, and ExternalPackages.
        const typeRefkeys = buildTypeRefkeys(
          context,
          operations,
          prefixes
        );

        return (
          <ts.SourceFile path={filepath}>
            {clientImport}
            {staticHelperBlock ? `\n${staticHelperBlock}` : ""}
            {"\n\n"}
            <For each={operations} hardline>
              {(operation) => (
                <OperationGroup
                  context={context}
                  prefixes={prefixes}
                  operation={operation}
                  clientType={clientType}
                  client={client}
                  typeRefkeys={typeRefkeys}
                />
              )}
            </For>
          </ts.SourceFile>
        );
      }}
    </For>
  );
}

// ── Operation group (all functions for one operation) ────────────────────

interface OperationGroupProps {
  context: SdkContext;
  prefixes: string[];
  operation: ServiceOperation;
  clientType: string;
  client: SdkClientType<SdkServiceOperation>;
  typeRefkeys: Record<string, Refkey>;
}

function OperationGroup(props: OperationGroupProps): Children {
  const { context, prefixes, operation, clientType, client, typeRefkeys } =
    props;

  const sendFn = getSendPrivateFunction(
    context,
    [prefixes, operation],
    clientType,
    client as SdkClientType<SdkHttpOperation>
  );
  const deserFn = getDeserializePrivateFunction(context, operation);
  const opFn = getOperationFunction(context, [prefixes, operation], clientType);

  return (
    <>
      <OperationFunction
        name={sendFn.name}
        export={sendFn.isExported}
        async={sendFn.isAsync}
        returnType={sendFn.returnType}
        parameters={sendFn.parameters}
        docs={sendFn.docs}
        typeRefkeys={typeRefkeys}
      >
        <FunctionBody typeRefkeys={typeRefkeys}>
          {sendFn.statements}
        </FunctionBody>
      </OperationFunction>
      {"\n"}
      <OperationFunction
        name={deserFn.name}
        export={deserFn.isExported}
        async={deserFn.isAsync}
        returnType={deserFn.returnType}
        parameters={deserFn.parameters}
        docs={deserFn.docs}
        typeRefkeys={typeRefkeys}
      >
        <FunctionBody typeRefkeys={typeRefkeys}>
          {deserFn.statements}
        </FunctionBody>
      </OperationFunction>
      <DeserializeHeaders context={context} operation={operation} />
      <DeserializeExceptionHeaders context={context} operation={operation} />
      {"\n"}
      <OperationFunction
        name={opFn.name}
        export={opFn.isExported}
        async={opFn.isAsync}
        returnType={opFn.returnType}
        parameters={opFn.parameters}
        docs={opFn.docs}
        refkey={operationRefkey(operation)}
        typeRefkeys={typeRefkeys}
      >
        <FunctionBody typeRefkeys={typeRefkeys}>
          {opFn.statements}
        </FunctionBody>
      </OperationFunction>
    </>
  );
}

// ── Native JSX operation components ─────────────────────────────────────
// These replace the old getXxxFunction helpers with declarative Alloy components.
// They use `code` tagged templates with refkeys — no string scanning needed.

interface DeserializeHeadersProps {
  context: SdkContext;
  operation: ServiceOperation;
}

/**
 * Renders the private function that deserializes response headers.
 * Only renders when headers exist and include-headers-in-response is enabled.
 */
function DeserializeHeaders(props: DeserializeHeadersProps): Children {
  const { context, operation } = props;
  const isResponseHeadersEnabled =
    context.rlcOptions?.includeHeadersInResponse === true;
  if (!isResponseHeadersEnabled) return null;

  const responseHeaders = getResponseHeaders(operation.operation.responses);
  if (responseHeaders.length === 0) return null;

  const { name } = getOperationName(operation);
  const runtimeLib = getRuntimeLib(context);
  const returnType = buildHeaderOnlyResponseType(context, responseHeaders);
  const bodyExpr = buildHeaderOnlyResponseValue(context, responseHeaders);

  return (
    <>
      {"\n"}
      <ts.FunctionDeclaration
        export
        name={`_${name}DeserializeHeaders`}
        parameters={[{ name: "result", type: runtimeLib.PathUncheckedResponse }]}
        returnType={returnType}
        refkey={deserializeHeadersRefkey(operation)}
      >
        {code`return ${bodyExpr};`}
      </ts.FunctionDeclaration>
    </>
  );
}

/**
 * Renders the private function that deserializes exception response headers.
 * Only renders when exception headers exist and include-headers-in-response is enabled.
 */
function DeserializeExceptionHeaders(props: DeserializeHeadersProps): Children {
  const { context, operation } = props;
  const isResponseHeadersEnabled =
    context.rlcOptions?.includeHeadersInResponse === true;
  if (!isResponseHeadersEnabled) return null;

  const exceptionHeaders = getExceptionResponseHeaders(
    operation.operation.exceptions
  );
  if (exceptionHeaders.length === 0) return null;

  const { name } = getOperationName(operation);
  const runtimeLib = getRuntimeLib(context);
  const returnType = buildHeaderOnlyResponseType(context, exceptionHeaders);
  const bodyExpr = buildHeaderOnlyResponseValue(context, exceptionHeaders);

  return (
    <>
      {"\n"}
      <ts.FunctionDeclaration
        export
        name={`_${name}DeserializeExceptionHeaders`}
        parameters={[{ name: "result", type: runtimeLib.PathUncheckedResponse }]}
        returnType={returnType}
        refkey={deserializeExceptionHeadersRefkey(operation)}
      >
        {code`return ${bodyExpr};`}
      </ts.FunctionDeclaration>
    </>
  );
}

// ── Bridge components (temporary — for functions not yet converted to JSX) ──

interface OperationFunctionProps {
  name: string;
  export?: boolean;
  async?: boolean;
  returnType?: string;
  parameters: Array<{
    name: string;
    type?: string;
    initializer?: string;
    hasQuestionToken?: boolean;
  }>;
  docs?: string[];
  refkey?: Refkey;
  typeRefkeys: Record<string, Refkey>;
  children?: Children;
}

/**
 * Renders a single operation function declaration.
 * Resolves type strings in parameters and return type against
 * the typeRefkeys map so Alloy can auto-import referenced symbols.
 */
function OperationFunction(props: OperationFunctionProps): Children {
  // Strip Promise<...> wrapper when async — TypeScript adds it automatically
  let rt = props.returnType;
  if (props.async && rt?.startsWith("Promise<") && rt.endsWith(">")) {
    rt = rt.slice("Promise<".length, -1);
  }

  const params = props.parameters.map((p) => ({
    name: p.name,
    type: resolveType(p.type, props.typeRefkeys),
    default: p.initializer,
    optional: p.hasQuestionToken
  }));

  const docs =
    props.docs && props.docs.length > 0 ? props.docs.join("\n") : undefined;

  return (
    <ts.FunctionDeclaration
      export={props.export}
      name={props.name}
      async={props.async}
      returnType={rt ? resolveType(rt, props.typeRefkeys) : undefined}
      parameters={params}
      doc={docs}
      refkey={props.refkey}
    >
      {props.children}
    </ts.FunctionDeclaration>
  );
}

interface FunctionBodyProps {
  typeRefkeys: Record<string, Refkey>;
  children?: Children;
}

/**
 * Resolves symbol references within function body text.
 * Scans the text children for known symbol names and replaces them
 * with Alloy refkeys so auto-imports are generated.
 */
function FunctionBody(props: FunctionBodyProps): Children {
  const text = childrenToText(props.children);
  return resolveReferences(text, props.typeRefkeys);
}

/** Flattens children (string or string[]) into a single text block. */
function childrenToText(children: Children): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) {
    return children.filter((c) => typeof c === "string").join("\n");
  }
  return "";
}

/**
 * Resolves a type string against the refkey map.
 * Exact match returns the refkey directly; otherwise scans for
 * known names within complex type expressions.
 */
function resolveType(
  typeStr: string | undefined,
  typeRefkeys: Record<string, Refkey>
): Children {
  if (!typeStr) return undefined;
  if (typeRefkeys[typeStr]) return typeRefkeys[typeStr];
  return resolveReferences(typeStr, typeRefkeys);
}

/**
 * Scans text for known symbol names from typeRefkeys and replaces
 * them with Alloy refkeys so auto-imports are triggered.
 * Works for both type expressions and function body text.
 */
function resolveReferences(
  text: string,
  typeRefkeys: Record<string, Refkey>
): Children {
  if (!text || Object.keys(typeRefkeys).length === 0) return text;

  // Build regex matching any known symbol name
  const names = Object.keys(typeRefkeys).filter((n) => text.includes(n));
  if (names.length === 0) return text;

  // Sort by length descending so longer names match first
  // (e.g., "BarSerializer" before "Bar")
  names.sort((a, b) => b.length - a.length);

  const pattern = new RegExp(
    `\\b(${names.map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`,
    "g"
  );

  const parts: Children[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const rk = typeRefkeys[match[1]!];
    if (rk != null) {
      parts.push(rk);
    } else {
      parts.push(match[0]);
    }
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <>{parts}</>;
}
