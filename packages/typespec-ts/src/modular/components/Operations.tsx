import { Children, code, For, refkey, Refkey } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import {
  getClientOptions,
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
  isBinaryPayload,
  isXmlPayload,
  isMultipartPayload
} from "../../utils/operationUtil.js";
import {
  getModularClientOptions,
  isRLCMultiEndpoint
} from "../../utils/clientUtils.js";
import {
  getOperationSignatureParameters,
  getOptionalParamsName,
  getPathParameters,
  getQueryParameters,
  getParameterMap,
  isContentType,
  isConstant,
  getContentTypeValue,
  buildHeaderParameter,
  getEncodeForType,
  isDefaultValueTypeMatch,
  formatDefaultValue,
  getPropertySerializationPrefix,
  serializeRequestValue,
  getResponseHeaders,
  getExceptionResponseHeaders,
  buildHeaderOnlyResponseType,
  buildHeaderOnlyResponseValue,
  isLroOnlyOperation,
  isLroAndPagingOperation,
  isPagingOnlyOperation,
  getExceptionDetails,
  buildLroReturnType,
  getExpectedStatuses,
  deserializeResponseValue,
  getApiVersionExpression,
  buildCompositeResponseType
} from "../helpers/operationHelpers.js";
import {
  getOperationName,
  generateLocallyUniqueName
} from "../helpers/namingHelpers.js";
import {
  getDocsFromDescription,
  getFixmeForMultilineDocs
} from "../helpers/docsHelpers.js";
import { getTypeExpression } from "../type-expressions/get-type-expression.js";
import {
  httpRuntimeLib,
  azureCoreClientLib,
  azureCoreLroLib
} from "./ExternalPackages.js";
import { operationOptionsRefkey } from "./OperationOptions.js";
import { typeRefkey as modelTypeRefkey } from "./Models.js";
import { serializerRefkey, deserializerRefkey } from "./Serializers.js";
import {
  xmlSerializerRefkey,
  xmlDeserializerRefkey
} from "./XmlSerializers.js";
import { buildModelSerializer } from "../serialization/buildSerializerFunction.js";
import { buildModelDeserializer } from "../serialization/buildDeserializerFunction.js";
import {
  buildXmlModelSerializer,
  buildXmlModelDeserializer,
  hasXmlSerialization
} from "../serialization/buildXmlSerializerFunction.js";
import {
  getNullableValidType,
  isSpreadBodyParameter
} from "../helpers/typeHelpers.js";
import { isAzureCoreErrorType } from "../../utils/modelUtils.js";

// ── Refkey helpers ──────────────────────────────────────────────────────

/** Refkey for a public operation function. */
export function operationRefkey(operation: ServiceOperation): Refkey {
  return refkey(operation, "api");
}

/** Refkey for the response headers deserializer function. */
export function deserializeHeadersRefkey(operation: ServiceOperation): Refkey {
  return refkey(operation, "deserializeHeaders");
}

/** Refkey for the send private function. */
export function sendFunctionRefkey(operation: ServiceOperation): Refkey {
  return refkey(operation, "send");
}

/** Refkey for the exception headers deserializer function. */
export function deserializeExceptionHeadersRefkey(
  operation: ServiceOperation
): Refkey {
  return refkey(operation, "deserializeExceptionHeaders");
}

/** Refkey for the deserialize private function. */
export function deserializeFunctionRefkey(operation: ServiceOperation): Refkey {
  return refkey(operation, "deserialize");
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
}

function OperationGroup(props: OperationGroupProps): Children {
  const { context, prefixes, operation, clientType, client } = props;

  return (
    <>
      <SendFunction
        context={context}
        operation={operation}
        prefixes={prefixes}
        clientType={clientType}
        client={client as SdkClientType<SdkHttpOperation>}
      />
      {"\n"}
      <DeserializeFunction context={context} operation={operation} />
      <DeserializeHeaders context={context} operation={operation} />
      <DeserializeExceptionHeaders context={context} operation={operation} />
      {"\n"}
      <PublicOperation
        context={context}
        operation={operation}
        prefixes={prefixes}
        clientType={clientType}
      />
    </>
  );
}

// ── Public operation components ─────────────────────────────────────────
// These replace the getOperationFunction/OperationFunction/FunctionBody bridge
// with native JSX components using `code` tagged templates and refkeys.

interface PublicOperationProps {
  context: SdkContext;
  operation: ServiceOperation;
  prefixes: string[];
  clientType: string;
}

/** Converts raw parameter list to ts.ParameterDescriptor[] with refkeys for typed params. */
function buildOperationParams(
  rawParams: Array<{
    name: string;
    type?: string;
    initializer?: string;
    hasQuestionToken?: boolean;
  }>,
  operation: ServiceOperation,
  optionalParamName: string
): ts.ParameterDescriptor[] {
  return rawParams.map((p) => {
    if (p.name === optionalParamName) {
      return {
        name: p.name,
        type: operationOptionsRefkey(operation),
        default: p.initializer
      };
    }
    return { name: p.name, type: p.type };
  });
}

/** Builds return type Children with refkeys for named types. */
function getReturnTypeChildren(context: SdkContext, type: SdkType): Children {
  if (
    (type.kind === "model" || type.kind === "enum" || type.kind === "union") &&
    (type as any).name
  ) {
    return modelTypeRefkey(type);
  }
  if (type.kind === "array") {
    return code`${getReturnTypeChildren(context, type.valueType)}[]`;
  }
  if (type.kind === "nullable") {
    return code`${getReturnTypeChildren(context, type.type)} | null`;
  }
  return getTypeExpression(context, type);
}

/** Dispatcher: renders the appropriate public operation component based on operation kind. */
function PublicOperation(props: PublicOperationProps): Children {
  const { operation } = props;
  if (isPagingOnlyOperation(operation)) {
    return <PagingOperation {...props} />;
  } else if (isLroOnlyOperation(operation)) {
    return <LroOperation {...props} />;
  } else if (isLroAndPagingOperation(operation)) {
    return <LroPagingOperation {...props} />;
  }
  return <StandardOperation {...props} />;
}

/** Renders the public operation function for standard (non-LRO, non-paging) operations. */
function StandardOperation(props: PublicOperationProps): Children {
  const { context, operation, prefixes, clientType } = props;
  const rawParams = getOperationSignatureParameters(
    context,
    [prefixes, operation],
    clientType
  );
  const optionalParamName = getOptionalParamsName(rawParams);
  const params = buildOperationParams(rawParams, operation, optionalParamName);
  const { name, fixme = [] } = getOperationName(operation);

  const response = operation.response;
  const responseHeaders = getResponseHeaders(operation.operation.responses);
  const hasHeaderOnlyResponse = !response.type && responseHeaders.length > 0;
  const isResponseHeadersEnabled =
    context.rlcOptions?.includeHeadersInResponse === true;

  // Compute return type
  let returnType: Children = "void";
  if (response.type) {
    if (
      response.type.kind === "model" &&
      responseHeaders.length > 0 &&
      isResponseHeadersEnabled
    ) {
      returnType = buildCompositeResponseType(
        context,
        response.type,
        responseHeaders
      );
    } else {
      returnType = getReturnTypeChildren(context, response.type);
    }
  } else if (hasHeaderOnlyResponse && isResponseHeadersEnabled) {
    returnType = buildHeaderOnlyResponseType(context, responseHeaders);
  }

  const docs = [
    ...getDocsFromDescription(operation.doc),
    ...getFixmeForMultilineDocs(fixme)
  ];
  const docStr = docs.length > 0 ? docs.join("\n") : undefined;

  const paramNames = new Set(rawParams.map((p) => p.name));
  const resultVarName = generateLocallyUniqueName("result", paramNames);
  const parameterList = rawParams.map((p) => p.name).join(", ");

  const sendRef = sendFunctionRefkey(operation);
  const deserializeRef = deserializeFunctionRefkey(operation);
  const isBinaryResponse =
    response?.type?.kind === "bytes" && response.type.encode === "bytes";

  // Build send statement
  let sendStmt: Children;
  if (isBinaryResponse) {
    const streamVarName = generateLocallyUniqueName(
      "streamableMethod",
      paramNames
    );
    sendStmt = code`const ${streamVarName} = ${sendRef}(${parameterList});
const ${resultVarName} = await getBinaryResponse(${streamVarName});`;
  } else {
    sendStmt = code`const ${resultVarName} = await ${sendRef}(${parameterList});`;
  }

  // Build return statement
  let returnStmt: Children;
  if (responseHeaders.length > 0 && isResponseHeadersEnabled) {
    const headersVarName = generateLocallyUniqueName("headers", paramNames);
    const headersRef = deserializeHeadersRefkey(operation);
    if (hasHeaderOnlyResponse) {
      returnStmt = code`const ${headersVarName} = ${headersRef}(${resultVarName});
await ${deserializeRef}(${resultVarName});
return {...${headersVarName} };`;
    } else {
      const payloadVarName = generateLocallyUniqueName("payload", paramNames);
      returnStmt = code`const ${headersVarName} = ${headersRef}(${resultVarName});
const ${payloadVarName} = await ${deserializeRef}(${resultVarName});
return { ...${payloadVarName}, ...${headersVarName} };`;
    }
  } else {
    returnStmt = code`return ${deserializeRef}(${resultVarName});`;
  }

  return (
    <ts.FunctionDeclaration
      export
      async
      name={name}
      parameters={params}
      returnType={returnType}
      doc={docStr}
      refkey={operationRefkey(operation)}
    >
      {sendStmt}
      {"\n"}
      {returnStmt}
    </ts.FunctionDeclaration>
  );
}

/** Renders the public operation function for paging-only operations. */
function PagingOperation(props: PublicOperationProps): Children {
  const { context, operation, prefixes, clientType } = props;
  if (operation.kind !== "paging") return null;

  const rawParams = getOperationSignatureParameters(
    context,
    [prefixes, operation],
    clientType
  );
  const optionalParamName = getOptionalParamsName(rawParams);
  const params = buildOperationParams(rawParams, operation, optionalParamName);
  const { name, fixme = [] } = getOperationName(operation);

  // Element type for PagedAsyncIterableIterator<T>
  const response = operation.response;
  let elementTypeChildren: Children = "void";
  if (response.type && response.type.kind === "array") {
    elementTypeChildren = getReturnTypeChildren(
      context,
      response.type.valueType
    );
  }

  const docs = [
    ...getDocsFromDescription(operation.doc),
    ...getFixmeForMultilineDocs(fixme)
  ];
  const docStr = docs.length > 0 ? docs.join("\n") : undefined;

  // Paging options
  const pagingOptions: string[] = [];
  const itemSegments = operation.response.resultSegments;
  const itemName = itemSegments?.map((p) => p.name).join(".");
  const nextLinkSegments = operation.pagingMetadata.nextLinkSegments;
  const nextLinkName = nextLinkSegments?.map((p) => p.name).join(".");
  const nextLinkMethod = operation.pagingMetadata.nextLinkVerb;
  const apiVersion = getApiVersionExpression(context, operation);

  if (itemName) pagingOptions.push(`itemName: "${itemName}"`);
  if (nextLinkName) pagingOptions.push(`nextLinkName: "${nextLinkName}"`);
  if (nextLinkMethod && nextLinkMethod !== "GET")
    pagingOptions.push(`nextLinkMethod: "${nextLinkMethod}"`);
  if (apiVersion) pagingOptions.push(`apiVersion: ${apiVersion}`);

  const parameterList = rawParams.map((p) => p.name).join(", ");
  const sendRef = sendFunctionRefkey(operation);
  const deserializeRef = deserializeFunctionRefkey(operation);
  const expectedStatuses = getExpectedStatuses(operation);
  const optionsStr =
    pagingOptions.length > 0 ? `,\n      {${pagingOptions.join(", ")}}` : "";

  return (
    <ts.FunctionDeclaration
      export
      name={name}
      parameters={params}
      returnType={code`PagedAsyncIterableIterator<${elementTypeChildren}>`}
      doc={docStr}
      refkey={operationRefkey(operation)}
    >
      {code`return buildPagedAsyncIterator(
      context, 
      () => ${sendRef}(${parameterList}), 
      ${deserializeRef},
      ${expectedStatuses}${optionsStr}
      );`}
    </ts.FunctionDeclaration>
  );
}

/** Renders the public operation function for LRO-only operations. */
function LroOperation(props: PublicOperationProps): Children {
  const { context, operation, prefixes, clientType } = props;
  if (operation.kind !== "lro") return null;

  const rawParams = getOperationSignatureParameters(
    context,
    [prefixes, operation],
    clientType
  );
  const optionalParamName = getOptionalParamsName(rawParams);
  const params = buildOperationParams(rawParams, operation, optionalParamName);
  const { name, fixme = [] } = getOperationName(operation);

  // Final result type for PollerLike<OperationState<T>, T>
  let finalTypeChildren: Children = "void";
  const lroType = operation.lroMetadata?.finalResponse?.result;
  if (lroType) {
    finalTypeChildren = getReturnTypeChildren(context, lroType);
  }

  const docs = [
    ...getDocsFromDescription(operation.doc),
    ...getFixmeForMultilineDocs(fixme)
  ];
  const docStr = docs.length > 0 ? docs.join("\n") : undefined;

  // LRO metadata
  const lroMetadata = operation.lroMetadata;
  const allowedFinalLocation = [
    "azure-async-operation",
    "location",
    "original-uri",
    "operation-location"
  ];
  const resourceLocationConfig =
    lroMetadata?.finalStateVia &&
    allowedFinalLocation.includes(lroMetadata.finalStateVia)
      ? `resourceLocationConfig: "${lroMetadata.finalStateVia}",`
      : "";
  const apiVersion = getApiVersionExpression(context, operation);

  const parameterList = rawParams.map((p) => p.name).join(", ");
  const sendRef = sendFunctionRefkey(operation);
  const deserializeRef = deserializeFunctionRefkey(operation);
  const expectedStatuses = getExpectedStatuses(operation);

  return (
    <ts.FunctionDeclaration
      export
      name={name}
      parameters={params}
      returnType={code`${azureCoreLroLib.PollerLike}<${azureCoreLroLib.OperationState}<${finalTypeChildren}>, ${finalTypeChildren}>`}
      doc={docStr}
      refkey={operationRefkey(operation)}
    >
      {code`

  return getLongRunningPoller(context, ${deserializeRef}, ${expectedStatuses}, {
    updateIntervalInMs: ${optionalParamName}?.updateIntervalInMs,
    abortSignal: ${optionalParamName}?.abortSignal,
    getInitialResponse: () => ${sendRef}(${parameterList}),
    ${resourceLocationConfig}
    ${apiVersion ? `apiVersion: ${apiVersion}` : ""}
  }) as ${azureCoreLroLib.PollerLike}<${azureCoreLroLib.OperationState}<${finalTypeChildren}>, ${finalTypeChildren}>;
  `}
    </ts.FunctionDeclaration>
  );
}

/** Renders the public operation function for combined LRO + paging operations. */
function LroPagingOperation(props: PublicOperationProps): Children {
  const { context, operation, prefixes, clientType } = props;
  if (operation.kind !== "lropaging") return null;

  const rawParams = getOperationSignatureParameters(
    context,
    [prefixes, operation],
    clientType
  );
  const optionalParamName = getOptionalParamsName(rawParams);
  const params = buildOperationParams(rawParams, operation, optionalParamName);
  const { name, fixme = [] } = getOperationName(operation);

  // Element type for PagedAsyncIterableIterator<T>
  let elementTypeChildren: Children = "void";
  if (operation.response.type?.kind === "array") {
    elementTypeChildren = getReturnTypeChildren(
      context,
      operation.response.type.valueType
    );
  }

  const docs = [
    ...getDocsFromDescription(operation.doc),
    ...getFixmeForMultilineDocs(fixme)
  ];
  const docStr = docs.length > 0 ? docs.join("\n") : undefined;

  const apiVersion = getApiVersionExpression(context, operation);

  // Build paging options
  const pagingOptions = [
    operation.response.resultSegments &&
      `itemName: "${operation.response.resultSegments.map((p) => p.name).join(".")}"`,
    operation.pagingMetadata.nextLinkSegments &&
      `nextLinkName: "${operation.pagingMetadata.nextLinkSegments.map((p) => p.name).join(".")}"`,
    operation.pagingMetadata.nextLinkVerb !== "GET" &&
      `nextLinkMethod: "${operation.pagingMetadata.nextLinkVerb}"`,
    apiVersion && `apiVersion: ${apiVersion}`
  ].filter(Boolean);

  // LRO metadata
  const allowedLocations = [
    "azure-async-operation",
    "location",
    "original-uri",
    "operation-location"
  ];
  const resourceLocationConfig =
    operation.lroMetadata?.finalStateVia &&
    allowedLocations.includes(operation.lroMetadata.finalStateVia)
      ? `resourceLocationConfig: "${operation.lroMetadata.finalStateVia}",`
      : "";

  const parameterList = rawParams.map((p) => p.name).join(", ");
  const sendRef = sendFunctionRefkey(operation);
  const deserializeRef = deserializeFunctionRefkey(operation);
  const expectedStatuses = getExpectedStatuses(operation);
  const runtimeLib = getRuntimeLib(context);
  const pagingOptionsStr =
    pagingOptions.length > 0 ? `,\n    {${pagingOptions.join(", ")}}` : "";

  return (
    <ts.FunctionDeclaration
      export
      name={name}
      parameters={params}
      returnType={code`PagedAsyncIterableIterator<${elementTypeChildren}>`}
      doc={docStr}
      refkey={operationRefkey(operation)}
    >
      {code`
  const initialPagingPoller = getLongRunningPoller(context,
    async (result: ${runtimeLib.PathUncheckedResponse}) => result,
    ${expectedStatuses}, {
    updateIntervalInMs: ${optionalParamName}?.updateIntervalInMs,
    abortSignal: ${optionalParamName}?.abortSignal,
    getInitialResponse: () => ${sendRef}(${parameterList}),
    ${resourceLocationConfig}
    ${apiVersion ? `apiVersion: ${apiVersion}` : ""}
  }) as ${azureCoreLroLib.PollerLike}<${azureCoreLroLib.OperationState}<${runtimeLib.PathUncheckedResponse}>, ${runtimeLib.PathUncheckedResponse}>;
  
  return buildPagedAsyncIterator(
    context,
    async () => await initialPagingPoller,
    ${deserializeRef},
    ${expectedStatuses}${pagingOptionsStr}
  );
  `}
    </ts.FunctionDeclaration>
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
        parameters={[
          { name: "result", type: runtimeLib.PathUncheckedResponse }
        ]}
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
        parameters={[
          { name: "result", type: runtimeLib.PathUncheckedResponse }
        ]}
        returnType={returnType}
        refkey={deserializeExceptionHeadersRefkey(operation)}
      >
        {code`return ${bodyExpr};`}
      </ts.FunctionDeclaration>
    </>
  );
}

// ── Deserialize function components ─────────────────────────────────────

interface DeserializeFunctionProps {
  context: SdkContext;
  operation: ServiceOperation;
}

/**
 * Renders the private `_${name}Deserialize` function that deserializes the HTTP response.
 * Handles status code validation, exception handling, LRO sub-path checks, and response body deserialization.
 */
function DeserializeFunction(props: DeserializeFunctionProps): Children {
  const { context, operation } = props;
  const { name } = getOperationName(operation);
  const runtimeLib = getRuntimeLib(context);

  const isLroOnly = isLroOnlyOperation(operation);
  const isLroAndPaging = isLroAndPagingOperation(operation);
  const isPagingOnly = isPagingOnlyOperation(operation);

  const response = operation.response;
  const restResponse = operation.operation.responses[0];
  let returnType: string;

  if (isLroOnly || isLroAndPaging) {
    const lroReturn = buildLroReturnType(context, operation);
    returnType = lroReturn.type;
  } else if (isPagingOnly && restResponse?.type) {
    // For paging operations, use the full response model
    returnType = getTypeExpression(context, restResponse.type);
  } else if (response.type) {
    returnType = getTypeExpression(context, response.type);
  } else {
    returnType = "void";
  }

  return (
    <>
      {"\n"}
      <ts.FunctionDeclaration
        export
        async
        name={`_${name}Deserialize`}
        parameters={[
          { name: "result", type: runtimeLib.PathUncheckedResponse }
        ]}
        returnType={returnType}
        refkey={deserializeFunctionRefkey(operation)}
      >
        <StatusCheck context={context} operation={operation} />
        <LroSubPathCheck context={context} operation={operation} />
        <ResponseBody context={context} operation={operation} />
      </ts.FunctionDeclaration>
    </>
  );
}

interface StatusCheckProps {
  context: SdkContext;
  operation: ServiceOperation;
}

/**
 * Renders the status code check and exception handling logic.
 * Throws an error if the response status is not in the expected statuses.
 */
function StatusCheck(props: StatusCheckProps): Children {
  const { context, operation } = props;
  const expectedStatuses = getExpectedStatuses(operation);

  return (
    <>
      {code`const expectedStatuses = ${expectedStatuses};`}
      {code`
if (!expectedStatuses.includes(result.status)) {
`}
      <ExceptionHandling context={context} operation={operation} />
      {code`
}
`}
    </>
  );
}

interface ExceptionHandlingProps {
  context: SdkContext;
  operation: ServiceOperation;
}

/**
 * Renders the exception handling logic (both customized and default).
 */
function ExceptionHandling(props: ExceptionHandlingProps): Children {
  const { context, operation } = props;
  const runtimeLib = getRuntimeLib(context);
  const exceptionDetails = getExceptionDetails(context, operation);

  const {
    customized,
    defaultDeserializer,
    defaultXmlDeserializer,
    defaultIsXmlOnly
  } = exceptionDetails;

  if (customized.length === 0 && !defaultDeserializer) {
    // No custom exception handling — just throw a generic error
    return code`throw ${runtimeLib.createRestError}(result);`;
  }

  return (
    <>
      <CustomizedExceptions
        context={context}
        operation={operation}
        customized={customized}
        defaultDeserializer={defaultDeserializer}
        defaultXmlDeserializer={defaultXmlDeserializer}
        defaultIsXmlOnly={defaultIsXmlOnly}
      />
    </>
  );
}

interface CustomizedExceptionsProps {
  context: SdkContext;
  operation: ServiceOperation;
  customized: Array<{
    start: number;
    end?: number;
    deserializer: string;
    xmlDeserializer?: string;
    isXmlOnly?: boolean;
  }>;
  defaultDeserializer?: string;
  defaultXmlDeserializer?: string;
  defaultIsXmlOnly?: boolean;
}

/**
 * Renders per-status-code exception handling with deserializer refkeys.
 */
function CustomizedExceptions(props: CustomizedExceptionsProps): Children {
  const {
    context,
    operation,
    customized,
    defaultDeserializer,
    defaultXmlDeserializer,
    defaultIsXmlOnly
  } = props;
  const runtimeLib = getRuntimeLib(context);

  const isResponseHeadersEnabled =
    context.rlcOptions?.includeHeadersInResponse === true;
  const exceptionHeaders = getExceptionResponseHeaders(
    operation.operation.exceptions
  );
  const hasExceptionHeaders =
    isResponseHeadersEnabled && exceptionHeaders.length > 0;
  const { name: opName } = getOperationName(operation);

  // Check if any exception has dual-format XML (requires runtime content-type check)
  const hasAnyDualFormatXml =
    (defaultXmlDeserializer !== undefined && !defaultIsXmlOnly) ||
    customized.some((e) => e.xmlDeserializer !== undefined && !e.isXmlOnly);

  if (customized.length > 0) {
    return (
      <>
        {code`const error = ${runtimeLib.createRestError}(result);`}
        {hasAnyDualFormatXml && (
          <>
            {code`const responseContentType = result.headers?.["content-type"] ?? "";`}
            {code`const isXml = isXmlContentType(responseContentType);`}
          </>
        )}
        {code`const statusCode = Number.parseInt(result.status);`}
        <For each={customized}>
          {(exception, index) => {
            const exceptionObj = exception as {
              start: number;
              end?: number;
              deserializer: string;
              xmlDeserializer?: string;
              isXmlOnly?: boolean;
            };

            // Find the exception type for refkey
            const exceptionResponse = operation.operation.exceptions.find(
              (ex) => {
                if (ex.statusCodes === "*") return false;
                if (typeof ex.statusCodes === "number") {
                  return ex.statusCodes === exceptionObj.start;
                } else {
                  return (
                    ex.statusCodes.start === exceptionObj.start &&
                    ex.statusCodes.end === exceptionObj.end
                  );
                }
              }
            );

            let deserializeExpr;
            if (!exceptionObj.xmlDeserializer) {
              // JSON-only
              if (
                exceptionResponse?.type &&
                exceptionResponse.type.kind === "model"
              ) {
                deserializeExpr = code`${deserializerRefkey(exceptionResponse.type)}(result.body)`;
              } else {
                deserializeExpr = `${exceptionObj.deserializer}(result.body)`;
              }
            } else if (exceptionObj.isXmlOnly) {
              // XML-only
              if (
                exceptionResponse?.type &&
                exceptionResponse.type.kind === "model"
              ) {
                deserializeExpr = code`${xmlDeserializerRefkey(exceptionResponse.type)}(result.body)`;
              } else {
                deserializeExpr = `${exceptionObj.xmlDeserializer}(result.body)`;
              }
            } else {
              // Dual-format (runtime check)
              if (
                exceptionResponse?.type &&
                exceptionResponse.type.kind === "model"
              ) {
                deserializeExpr = code`isXml ? ${xmlDeserializerRefkey(exceptionResponse.type)}(result.body) : ${deserializerRefkey(exceptionResponse.type)}(result.body)`;
              } else {
                deserializeExpr = `isXml ? ${exceptionObj.xmlDeserializer}(result.body) : ${exceptionObj.deserializer}(result.body)`;
              }
            }

            const headerStmt = hasExceptionHeaders
              ? `error.details = {...(error.details as any), ..._${opName}DeserializeExceptionHeaders(result)};`
              : "";

            const elsePrefix = index === 0 ? "" : "else ";

            if (exceptionObj.end) {
              return code`
${elsePrefix}if (statusCode >= ${exceptionObj.start} && statusCode <= ${exceptionObj.end}) {
  error.details = ${deserializeExpr};
  ${headerStmt}
}`;
            } else {
              return code`
${elsePrefix}if (statusCode === ${exceptionObj.start}) {
  error.details = ${deserializeExpr};
  ${headerStmt}
}`;
            }
          }}
        </For>
        <DefaultException
          context={context}
          operation={operation}
          defaultDeserializer={defaultDeserializer}
          defaultXmlDeserializer={defaultXmlDeserializer}
          defaultIsXmlOnly={defaultIsXmlOnly}
          hasCustomized={true}
        />
        {code`throw error;`}
      </>
    );
  }

  // No customized exceptions, only default
  return (
    <DefaultException
      context={context}
      operation={operation}
      defaultDeserializer={defaultDeserializer}
      defaultXmlDeserializer={defaultXmlDeserializer}
      defaultIsXmlOnly={defaultIsXmlOnly}
      hasCustomized={false}
    />
  );
}

interface DefaultExceptionProps {
  context: SdkContext;
  operation: ServiceOperation;
  defaultDeserializer?: string;
  defaultXmlDeserializer?: string;
  defaultIsXmlOnly?: boolean;
  hasCustomized: boolean;
}

/**
 * Renders the default (wildcard) exception handling.
 */
function DefaultException(props: DefaultExceptionProps): Children {
  const {
    context,
    operation,
    defaultDeserializer,
    defaultXmlDeserializer,
    defaultIsXmlOnly,
    hasCustomized
  } = props;
  const runtimeLib = getRuntimeLib(context);

  const isResponseHeadersEnabled =
    context.rlcOptions?.includeHeadersInResponse === true;
  const exceptionHeaders = getExceptionResponseHeaders(
    operation.operation.exceptions
  );
  const hasExceptionHeaders =
    isResponseHeadersEnabled && exceptionHeaders.length > 0;
  const { name: opName } = getOperationName(operation);

  if (!defaultDeserializer) {
    // No default deserializer
    return null;
  }

  // Find the wildcard exception for refkey
  const defaultException = operation.operation.exceptions.find(
    (ex) => ex.statusCodes === "*"
  );

  let deserializeExpr;
  if (!defaultXmlDeserializer) {
    // JSON-only
    if (defaultException?.type && defaultException.type.kind === "model") {
      deserializeExpr = code`${deserializerRefkey(defaultException.type)}(result.body)`;
    } else {
      deserializeExpr = `${defaultDeserializer}(result.body)`;
    }
  } else if (defaultIsXmlOnly) {
    // XML-only
    if (defaultException?.type && defaultException.type.kind === "model") {
      deserializeExpr = code`${xmlDeserializerRefkey(defaultException.type)}(result.body)`;
    } else {
      deserializeExpr = `${defaultXmlDeserializer}(result.body)`;
    }
  } else {
    // Dual-format (runtime check)
    if (defaultException?.type && defaultException.type.kind === "model") {
      deserializeExpr = code`isXml ? ${xmlDeserializerRefkey(defaultException.type)}(result.body) : ${deserializerRefkey(defaultException.type)}(result.body)`;
    } else {
      deserializeExpr = `isXml ? ${defaultXmlDeserializer}(result.body) : ${defaultDeserializer}(result.body)`;
    }
  }

  const headerStmt = hasExceptionHeaders
    ? `error.details = {...(error.details as any), ..._${opName}DeserializeExceptionHeaders(result)};`
    : "";

  if (hasCustomized) {
    // This is an "else" branch after customized exceptions
    return code`
else {
  error.details = ${deserializeExpr};
  ${headerStmt}
}`;
  } else {
    // Standalone default exception handling
    if (!defaultXmlDeserializer || defaultIsXmlOnly) {
      // No runtime content-type check needed
      return (
        <>
          {code`const error = ${runtimeLib.createRestError}(result);`}
          {code`error.details = ${deserializeExpr};`}
          {headerStmt && code`${headerStmt}`}
          {code`throw error;`}
        </>
      );
    } else {
      // Dual-format with runtime check
      return (
        <>
          {code`const error = ${runtimeLib.createRestError}(result);`}
          {code`const responseContentType = result.headers?.["content-type"] ?? "";`}
          {code`error.details = isXmlContentType(responseContentType) ? ${defaultXmlDeserializer}(result.body) : ${defaultDeserializer}(result.body);`}
          {headerStmt && code`${headerStmt}`}
          {code`throw error;`}
        </>
      );
    }
  }
}

interface LroSubPathCheckProps {
  context: SdkContext;
  operation: ServiceOperation;
}

/**
 * Renders the LRO sub-path validation (only for LRO operations).
 */
function LroSubPathCheck(props: LroSubPathCheckProps): Children {
  const { context, operation } = props;
  const runtimeLib = getRuntimeLib(context);

  const isLroOnly = isLroOnlyOperation(operation);
  if (!isLroOnly) return null;

  const lroSubSegments = operation?.lroMetadata?.finalResponse?.resultSegments;
  if (!lroSubSegments || lroSubSegments.length === 0) return null;

  const lroSubPath = lroSubSegments.map((property) => property.name).join(".");
  const deserializedRoot = `result.body.${lroSubPath}`;
  const deserializedRootSafe = deserializedRoot.split(".").join("?.");

  return code`
if (${deserializedRootSafe} === undefined) {
  throw ${runtimeLib.createRestError}(\`Expected a result in the response at position "${deserializedRoot}"\`, result);
}
`;
}

interface ResponseBodyProps {
  context: SdkContext;
  operation: ServiceOperation;
}

/**
 * Renders the return statement with deserializer refkeys.
 * Handles JSON/XML/dual-format/binary/void cases.
 */
function ResponseBody(props: ResponseBodyProps): Children {
  const { context, operation } = props;

  const isLroOnly = isLroOnlyOperation(operation);
  const isLroAndPaging = isLroAndPagingOperation(operation);
  const isPagingOnly = isPagingOnlyOperation(operation);

  const response = operation.response;
  const restResponse = operation.operation.responses[0];

  const deserializedType =
    isLroOnly || isLroAndPaging
      ? operation?.lroMetadata?.finalResponse?.result
      : isPagingOnly && restResponse?.type
        ? restResponse.type
        : response.type;

  const lroSubSegments = isLroOnly
    ? operation?.lroMetadata?.finalResponse?.resultSegments
    : undefined;

  let lroSubPath;
  if (lroSubSegments && lroSubSegments.length > 0) {
    lroSubPath = lroSubSegments.map((property) => property.name).join(".");
  }

  const deserializePrefix = "result.body";
  const deserializedRoot = `${deserializePrefix}${lroSubPath ? "." + lroSubPath : ""}`;

  if (!deserializedType) {
    // Void response
    return code`return;`;
  }

  const contentTypes = operation.operation.responses[0]?.contentTypes ?? [];
  const isXml = isXmlPayload(contentTypes);
  const isDualFormat = hasDualFormatSupport(contentTypes);
  const isMultipart = isMultipartPayload(contentTypes);
  const useXmlDeserialization =
    isXml &&
    deserializedType.kind === "model" &&
    hasXmlSerialization(deserializedType);

  const multipartCastSuffix = isMultipart ? " as any" : "";

  // Dual-format response (XML + JSON)
  if (
    isDualFormat &&
    deserializedType.kind === "model" &&
    hasXmlSerialization(deserializedType)
  ) {
    const xmlDeserializerName = buildXmlModelDeserializer(
      context,
      deserializedType,
      { nameOnly: true, skipDiscriminatedUnionSuffix: false }
    ) as string | undefined;
    const jsonDeserializerName = buildModelDeserializer(
      context,
      deserializedType,
      { nameOnly: true, skipDiscriminatedUnionSuffix: false }
    );

    if (xmlDeserializerName && jsonDeserializerName) {
      return code`
const responseContentType = result.headers?.["content-type"] ?? "";
if (isXmlContentType(responseContentType)) {
  return ${xmlDeserializerRefkey(deserializedType)}(${deserializedRoot});
}
return ${deserializerRefkey(deserializedType)}(${deserializedRoot});
`;
    } else {
      // Fall back to JSON deserializer
      const deserializeFunctionName = buildModelDeserializer(
        context,
        deserializedType,
        { nameOnly: true, skipDiscriminatedUnionSuffix: false }
      );
      if (deserializeFunctionName) {
        return code`return ${deserializerRefkey(deserializedType)}(${deserializedRoot});`;
      }
    }
  } else if (useXmlDeserialization) {
    // XML-only response
    const xmlDeserializerName = buildXmlModelDeserializer(
      context,
      deserializedType,
      { nameOnly: true, skipDiscriminatedUnionSuffix: false }
    ) as string | undefined;

    if (xmlDeserializerName) {
      return code`return ${xmlDeserializerRefkey(deserializedType)}(${deserializedRoot});`;
    } else {
      // Fall back to JSON deserializer if XML deserializer is not available
      const deserializeFunctionName = buildModelDeserializer(
        context,
        deserializedType,
        { nameOnly: true, skipDiscriminatedUnionSuffix: false }
      );
      if (deserializeFunctionName) {
        return code`return ${deserializerRefkey(deserializedType)}(${deserializedRoot});`;
      } else {
        return code`return ${deserializedRoot};`;
      }
    }
  } else {
    // JSON response (default) - also handles multipart responses
    const deserializeFunctionName = buildModelDeserializer(
      context,
      deserializedType,
      { nameOnly: true, skipDiscriminatedUnionSuffix: false }
    );

    if (deserializeFunctionName) {
      return code`return ${deserializerRefkey(deserializedType)}(${deserializedRoot})${multipartCastSuffix};`;
    } else if (isAzureCoreErrorType(context.program, deserializedType.__raw)) {
      return code`return ${deserializedRoot}${multipartCastSuffix};`;
    } else {
      const isBinary = isBinaryPayload(
        context,
        response.type!.__raw!,
        contentTypes
      );
      const encode = isBinary ? "binary" : getEncodeForType(deserializedType);
      const deserializedValue = deserializeResponseValue(
        context,
        deserializedType,
        deserializedRoot,
        true,
        encode
      );
      return code`return ${deserializedValue}${multipartCastSuffix};`;
    }
  }
}

// ── Send function component ─────────────────────────────────────────────

interface SendFunctionProps {
  context: SdkContext;
  operation: ServiceOperation;
  prefixes: string[];
  clientType: string;
  client?: SdkClientType<SdkHttpOperation>;
}

/**
 * Renders the private `_${name}Send` function that builds and sends the HTTP request.
 * Handles URL template expansion, headers, body serialization, and the HTTP call.
 */
function SendFunction(props: SendFunctionProps): Children {
  const { context, operation, prefixes, clientType, client } = props;
  const { name } = getOperationName(operation);
  const runtimeLib = getRuntimeLib(context);

  // Build parameter descriptors with refkeys for typed params
  const rawParams = getOperationSignatureParameters(
    context,
    [prefixes, operation],
    clientType
  );
  const optionalParamName = getOptionalParamsName(rawParams);

  const params: ts.ParameterDescriptor[] = rawParams.map((p) => {
    // Options parameter — use refkey for its type
    if (p.name === optionalParamName) {
      return {
        name: p.name,
        type: operationOptionsRefkey(operation),
        default: p.initializer
      };
    }
    return { name: p.name, type: p.type };
  });

  // URL template expansion
  const urlTemplateParams = [
    ...getPathParameters(operation),
    ...getQueryParameters(context, operation)
  ];
  const hasUrlTemplate = urlTemplateParams.length > 0;

  const operationMethod = operation.operation.verb.toLowerCase();

  return (
    <ts.FunctionDeclaration
      export
      name={`_${name}Send`}
      parameters={params}
      returnType={runtimeLib.StreamableMethod}
      refkey={sendFunctionRefkey(operation)}
    >
      {hasUrlTemplate && (
        <UrlExpansion
          context={context}
          operation={operation}
          client={client}
          params={rawParams}
          urlTemplateParams={urlTemplateParams}
          optionalParamName={optionalParamName}
        />
      )}
      <RequestCall
        operationPath={operation.operation.path}
        verb={operationMethod}
        hasUrlTemplate={hasUrlTemplate}
        pathVarName={hasUrlTemplate ? getPathVarName(rawParams) : undefined}
        optionalParamName={optionalParamName}
        runtimeLib={runtimeLib}
      >
        <ContentTypeParam
          operation={operation}
          optionalParamName={optionalParamName}
        />
        <HeaderParams
          context={context}
          operation={operation}
          optionalParamName={optionalParamName}
        />
        <BodyParam
          context={context}
          operation={operation}
          optionalParamName={optionalParamName}
        />
      </RequestCall>
    </ts.FunctionDeclaration>
  );
}

interface UrlExpansionProps {
  context: SdkContext;
  operation: ServiceOperation;
  client?: SdkClientType<SdkHttpOperation>;
  params: Array<{ name: string; type?: string }>;
  urlTemplateParams: string[];
  optionalParamName: string;
}

/** Renders the URL template expansion statement. */
function UrlExpansion(props: UrlExpansionProps): Children {
  const { operation, client, params, urlTemplateParams, optionalParamName } =
    props;
  const pathVarName = getPathVarName(params);
  const includeRootSlash = client
    ? getClientOptions(client, "includeRootSlash") !== false
    : true;
  const uriTemplate = includeRootSlash
    ? operation.operation.uriTemplate
    : operation.operation.uriTemplate.replace(/^\//, "");

  return code`const ${pathVarName} = expandUrlTemplate("${uriTemplate}", {
    ${urlTemplateParams.join(",\n")}
  }, {
    allowReserved: ${optionalParamName}?.requestOptions?.skipUrlEncoding
  });`;
}

/** Computes a unique local variable name for the URL path. */
function getPathVarName(params: Array<{ name: string }>): string {
  const paramNames = new Set(params.map((p) => p.name));
  return generateLocallyUniqueName("path", paramNames);
}

interface RequestCallProps {
  operationPath: string;
  verb: string;
  hasUrlTemplate: boolean;
  pathVarName?: string;
  optionalParamName: string;
  runtimeLib: ReturnType<typeof getRuntimeLib>;
  children?: Children;
}

/** Renders the final HTTP request call statement. */
function RequestCall(props: RequestCallProps): Children {
  const pathArg = props.hasUrlTemplate
    ? props.pathVarName!
    : `"${props.operationPath}"`;

  return code`return context.path(${pathArg}).${props.verb}({...${props.runtimeLib.operationOptionsToRequestParameters}(${props.optionalParamName}), ${props.children}});`;
}

// ── Header and body parameter components ────────────────────────────────

interface ContentTypeParamProps {
  operation: ServiceOperation;
  optionalParamName: string;
}

/** Renders the contentType property in the request options, if applicable. */
function ContentTypeParam(props: ContentTypeParamProps): Children {
  const params = props.operation.operation.parameters;
  if (!params) return null;

  const contentTypeParameter = params.find(isContentType);
  if (!contentTypeParameter) return null;

  return `${getContentTypeValue(contentTypeParameter, props.optionalParamName)},`;
}

interface HeaderParamsProps {
  context: SdkContext;
  operation: ServiceOperation;
  optionalParamName: string;
}

/** Renders the headers object in the request options, if applicable. */
function HeaderParams(props: HeaderParamsProps): Children {
  const { context, operation, optionalParamName } = props;
  const params = operation.operation.parameters;
  if (!params) return null;

  const operationParameters = params.filter((p) => !isContentType(p));

  const headerEntries: { paramMap: string; param: (typeof params)[0] }[] = [];
  for (const param of operationParameters) {
    if (param.kind === "header") {
      // skip tcgc generated contentType and accept non constant type header parameter
      if (
        param.isGeneratedName &&
        !isConstant(param.type) &&
        (param.name === "contentType" || param.name === "accept")
      ) {
        continue;
      }
      if (
        param.methodParameterSegments &&
        param.methodParameterSegments.length > 0
      ) {
        headerEntries.push({
          paramMap: getParameterMap(context, param, optionalParamName),
          param
        });
      }
    }
  }

  if (headerEntries.length === 0) return null;

  const headerStr = headerEntries
    .map((i) =>
      buildHeaderParameter(
        context.program,
        i.paramMap,
        i.param,
        optionalParamName
      )
    )
    .join(",\n");

  return `\nheaders: {${headerStr}, ...${optionalParamName}.requestOptions?.headers },`;
}

interface BodyParamProps {
  context: SdkContext;
  operation: ServiceOperation;
  optionalParamName: string;
}

/**
 * Renders the body property in the request options.
 * Uses Alloy refkeys for serializer function references so imports are auto-resolved.
 */
function BodyParam(props: BodyParamProps): Children {
  const { context, operation, optionalParamName } = props;
  const bodyParameter = operation.operation.bodyParam;

  if (bodyParameter === undefined) return null;
  if (!bodyParameter || !bodyParameter.type) return null;

  const contentTypes = bodyParameter.contentTypes;
  const isXml = isXmlPayload(contentTypes);
  const isDualFormat = hasDualFormatSupport(contentTypes);
  const bodyType = getNullableValidType(bodyParameter.type);

  const useXmlSerialization =
    isXml && bodyType.kind === "model" && hasXmlSerialization(bodyType);

  // Check if a named serializer function exists
  let hasNamedSerializer = false;
  if (useXmlSerialization) {
    hasNamedSerializer = !!buildXmlModelSerializer(context, bodyType, {
      nameOnly: true,
      skipDiscriminatedUnionSuffix: false
    });
  } else {
    hasNamedSerializer = !!buildModelSerializer(context, bodyType, {
      nameOnly: true,
      skipDiscriminatedUnionSuffix: false
    });
  }

  // Compute body name expression
  const bodyParamName = normalizeName(
    bodyParameter.name,
    NameType.Parameter,
    true
  );
  let bodyNameExpression = bodyParameter.optional
    ? `${optionalParamName}["${bodyParamName}"]`
    : bodyParamName;

  const hasClientDefault =
    bodyParameter.optional &&
    bodyParameter.clientDefaultValue !== undefined &&
    isDefaultValueTypeMatch(bodyParameter, bodyParameter.clientDefaultValue);

  if (hasClientDefault) {
    const formattedDefault = formatDefaultValue(
      bodyParameter.clientDefaultValue
    );
    bodyNameExpression = `(${bodyNameExpression} ?? ${formattedDefault})`;
  }

  const nullOrUndefinedPrefix = hasClientDefault
    ? ""
    : getPropertySerializationPrefix(
        context,
        bodyParameter,
        bodyParameter.optional ? optionalParamName : undefined
      );

  // Dual-format: runtime content type check with both XML and JSON serializers
  if (
    isDualFormat &&
    bodyType.kind === "model" &&
    hasXmlSerialization(bodyType)
  ) {
    const hasXmlSerializer = !!buildXmlModelSerializer(context, bodyType, {
      nameOnly: true,
      skipDiscriminatedUnionSuffix: false
    });
    const hasJsonSerializer = !!buildModelSerializer(context, bodyType, {
      nameOnly: true,
      skipDiscriminatedUnionSuffix: false
    });

    if (hasXmlSerializer && hasJsonSerializer) {
      return code`\nbody: ${nullOrUndefinedPrefix}(isXmlContentType(${optionalParamName}?.contentType ?? "application/json") ? ${xmlSerializerRefkey(bodyType)}(${bodyNameExpression}) : ${serializerRefkey(bodyType)}(${bodyNameExpression})),`;
    }
  }

  // Named serializer (non-spread body)
  if (hasNamedSerializer && !isSpreadBodyParameter(bodyParameter)) {
    const ref = useXmlSerialization
      ? xmlSerializerRefkey(bodyType)
      : serializerRefkey(bodyType);
    return code`\nbody: ${nullOrUndefinedPrefix}${ref}(${bodyNameExpression}),`;
  }

  // Azure Core error type — pass through without serializer
  if (isAzureCoreErrorType(context.program, bodyParameter.type.__raw)) {
    return `\nbody: ${nullOrUndefinedPrefix}${bodyNameExpression},`;
  }

  // Inline serialization fallback (spread models, basic types, etc.)
  const serializedBody = serializeRequestValue(
    context,
    bodyParameter.type,
    bodyNameExpression,
    !bodyParameter.optional,
    isBinaryPayload(context, bodyParameter.__raw!, bodyParameter.contentTypes)
      ? "binary"
      : getEncodeForType(bodyParameter.type),
    undefined,
    true
  );
  return `\nbody: ${serializedBody.startsWith(nullOrUndefinedPrefix) ? "" : nullOrUndefinedPrefix}${serializedBody},`;
}
