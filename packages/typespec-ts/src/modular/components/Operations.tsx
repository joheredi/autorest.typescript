import { For, refkey, Refkey } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import {
  SdkClientType,
  SdkServiceOperation
} from "@azure-tools/typespec-client-generator-core";
import { NameType, normalizeName } from "@azure-tools/rlc-common";
import { SdkContext } from "../../utils/interfaces.js";
import { ModularEmitterOptions } from "../interfaces.js";
import {
  getMethodHierarchiesMap,
  ServiceOperation
} from "../../utils/operationUtil.js";
import {
  getModularClientOptions,
  isRLCMultiEndpoint
} from "../../utils/clientUtils.js";
import {
  getDeserializePrivateFunction,
  getDeserializeHeadersPrivateFunction,
  getDeserializeExceptionHeadersPrivateFunction,
  getOperationFunction,
  getSendPrivateFunction
} from "../helpers/operationHelpers.js";

// ── Refkey helpers ──────────────────────────────────────────────────────

/** Refkey for a public operation function */
export function operationRefkey(operation: ServiceOperation): Refkey {
  return refkey(operation, "api");
}

// ── Root component ──────────────────────────────────────────────────────

export interface OperationsProps {
  context: SdkContext;
  clientMap: [string[], SdkClientType<SdkServiceOperation>];
  emitterOptions: ModularEmitterOptions;
}

/**
 * Generates operation files for each operation group.
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

        return (
          <OperationGroupFile
            context={context}
            filepath={filepath}
            operations={operations}
            prefixes={prefixes}
            prefixKey={prefixKey}
            clientType={clientType}
            rlcClientName={rlcClientName}
            client={client}
          />
        );
      }}
    </For>
  );
}

// ── Operation group file ────────────────────────────────────────────────

interface OperationGroupFileProps {
  context: SdkContext;
  filepath: string;
  operations: ServiceOperation[];
  prefixes: string[];
  prefixKey: string;
  clientType: string;
  rlcClientName: string;
  client: SdkClientType<SdkServiceOperation>;
}

function OperationGroupFile(props: OperationGroupFileProps) {
  const {
    context,
    filepath,
    operations,
    prefixes,
    prefixKey,
    clientType,
    rlcClientName,
    client
  } = props;
  const indexPathPrefix =
    "../".repeat(prefixKey === "" ? 0 : prefixes.length) || "./";

  return (
    <ts.SourceFile path={filepath}>
      {`import { ${rlcClientName} as Client } from "${indexPathPrefix}index.js";`}
      <For each={operations} hardline>
        {(op) => (
          <OperationGroup
            context={context}
            operation={op}
            prefixes={prefixes}
            clientType={clientType}
            client={client}
          />
        )}
      </For>
    </ts.SourceFile>
  );
}

// ── Individual operation ────────────────────────────────────────────────

interface OperationGroupProps {
  context: SdkContext;
  operation: ServiceOperation;
  prefixes: string[];
  clientType: string;
  client: SdkClientType<SdkServiceOperation>;
}

function OperationGroup(props: OperationGroupProps) {
  const { context, operation, prefixes, clientType, client } = props;
  const method: [string[], ServiceOperation] = [prefixes, operation];

  const sendFn = getSendPrivateFunction(context, method, clientType, client);
  const deserializeFn = getDeserializePrivateFunction(context, operation);
  const deserializeHeadersFn = getDeserializeHeadersPrivateFunction(
    context,
    operation
  );
  const deserializeExceptionHeadersFn =
    getDeserializeExceptionHeadersPrivateFunction(context, operation);
  const operationFn = getOperationFunction(context, method, clientType);

  return (
    <>
      <ts.FunctionDeclaration
        name={sendFn.name!}
        async={sendFn.isAsync}
        export={sendFn.isExported}
        returnType={sendFn.returnType as string}
        parameters={fnParamsToDescriptors(sendFn.parameters)}
      >
        {sendFn.statements as string}
      </ts.FunctionDeclaration>
      <ts.FunctionDeclaration
        name={deserializeFn.name!}
        async={deserializeFn.isAsync}
        export={deserializeFn.isExported}
        returnType={deserializeFn.returnType as string}
        parameters={fnParamsToDescriptors(deserializeFn.parameters)}
      >
        {deserializeFn.statements as string}
      </ts.FunctionDeclaration>
      {deserializeHeadersFn ? (
        <ts.FunctionDeclaration
          name={deserializeHeadersFn.name!}
          async={deserializeHeadersFn.isAsync}
          export={deserializeHeadersFn.isExported}
          returnType={deserializeHeadersFn.returnType as string}
          parameters={fnParamsToDescriptors(deserializeHeadersFn.parameters)}
        >
          {deserializeHeadersFn.statements as string}
        </ts.FunctionDeclaration>
      ) : null}
      {deserializeExceptionHeadersFn ? (
        <ts.FunctionDeclaration
          name={deserializeExceptionHeadersFn.name!}
          async={deserializeExceptionHeadersFn.isAsync}
          export={deserializeExceptionHeadersFn.isExported}
          returnType={deserializeExceptionHeadersFn.returnType as string}
          parameters={fnParamsToDescriptors(
            deserializeExceptionHeadersFn.parameters
          )}
        >
          {deserializeExceptionHeadersFn.statements as string}
        </ts.FunctionDeclaration>
      ) : null}
      <ts.FunctionDeclaration
        export
        name={operationFn.name!}
        async={operationFn.isAsync}
        returnType={operationFn.returnType as string}
        refkey={operationRefkey(operation)}
        parameters={fnParamsToDescriptors(operationFn.parameters)}
      >
        {operationFn.statements as string}
      </ts.FunctionDeclaration>
    </>
  );
}

// ── Helpers ─────────────────────────────────────────────────────────────

function fnParamsToDescriptors(
  params?: OptionalKind<ParameterDeclarationStructure>[]
): ts.ParameterDescriptor[] {
  if (!params) return [];
  return params.map((p) => ({
    name: p.name,
    type: p.type as string,
    optional: p.hasQuestionToken,
    refkey: refkey()
  }));
}

// Re-export for type use
import { OptionalKind, ParameterDeclarationStructure } from "ts-morph";
