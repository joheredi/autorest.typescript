import { For, refkey, Refkey } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import {
  SdkClientType,
  SdkMethodParameter,
  SdkServiceOperation
} from "@azure-tools/typespec-client-generator-core";
import { NameType, normalizeName } from "@azure-tools/rlc-common";
import { SdkContext } from "../../utils/interfaces.js";
import { ModularEmitterOptions } from "../interfaces.js";
import {
  getMethodHierarchiesMap,
  ServiceOperation,
  hasDualFormatSupport
} from "../../utils/operationUtil.js";
import { getModularClientOptions } from "../../utils/clientUtils.js";
import {
  getOperationOptionsName,
  isLroOnlyOperation,
  isLroAndPagingOperation
} from "../helpers/operationHelpers.js";
import { getDocsFromDescription } from "../helpers/docsHelpers.js";
import { getTypeExpression } from "../type-expressions/get-type-expression.js";
import { resolveReference } from "../../framework/reference.js";
import { useDependencies } from "../../framework/hooks/useDependencies.js";

// ── Refkey helpers ──────────────────────────────────────────────────────

export function operationOptionsRefkey(operation: ServiceOperation): Refkey {
  return refkey(operation, "operationOptions");
}

// ── Root component ──────────────────────────────────────────────────────

export interface OperationOptionsProps {
  context: SdkContext;
  clientMap: [string[], SdkClientType<SdkServiceOperation>];
  emitterOptions: ModularEmitterOptions;
}

/**
 * Generates operation options interface files for each operation group.
 * Each operation group gets an `options.ts` file containing the
 * optional parameter interfaces for its operations.
 */
export function OperationOptions(props: OperationOptionsProps) {
  const { context, clientMap, emitterOptions } = props;
  const [_, client] = clientMap;
  const { subfolder } = getModularClientOptions(clientMap);
  const methodMap = getMethodHierarchiesMap(context, client);

  return (
    <For each={Array.from(methodMap.entries())}>
      {([prefixKey, operations]) => {
        const prefixes = prefixKey.split("/");
        const filePath = [
          emitterOptions.modularOptions.sourceRoot,
          subfolder ?? "",
          "api",
          ...prefixes.map((p) => normalizeName(p, NameType.File)),
          "options.ts"
        ]
          .filter(Boolean)
          .join("/");

        return (
          <ts.SourceFile path={filePath}>
            <For each={operations} hardline>
              {(operation) => (
                <OperationOptionsInterface
                  context={context}
                  method={[prefixes, operation]}
                />
              )}
            </For>
          </ts.SourceFile>
        );
      }}
    </For>
  );
}

// ── Operation options interface ─────────────────────────────────────────

interface OperationOptionsInterfaceProps {
  context: SdkContext;
  method: [string[], ServiceOperation];
}

function OperationOptionsInterface(props: OperationOptionsInterfaceProps) {
  const { context, method } = props;
  const dependencies = useDependencies();
  const operation = method[1];

  const optionalParameters = operation.parameters
    .filter(
      (p) =>
        p.onClient === false &&
        !(
          p.isGeneratedName &&
          (p.name === "contentType" || p.name !== "accept")
        )
    )
    .filter((p) => p.optional || p.clientDefaultValue);

  const name = getOperationOptionsName(method, true);
  const operationOptionsReference = resolveReference(
    dependencies.OperationOptions
  );

  // Additional options (LRO, dual-format)
  const additionalOptions: {
    name: string;
    type: string;
    doc: string;
  }[] = [];

  if (isLroOnlyOperation(operation) || isLroAndPagingOperation(operation)) {
    additionalOptions.push({
      name: "updateIntervalInMs",
      type: "number",
      doc: "Delay to wait until next poll, in milliseconds."
    });
  }

  const bodyContentTypes = operation.operation.bodyParam?.contentTypes ?? [];
  if (hasDualFormatSupport(bodyContentTypes)) {
    additionalOptions.push({
      name: "contentType",
      type: "string",
      doc: 'The content type for the request body. Defaults to "application/json". Use "application/xml" for XML serialization.'
    });
  }

  return (
    <ts.InterfaceDeclaration
      export
      name={name}
      doc="Optional parameters."
      extends={operationOptionsReference}
      refkey={operationOptionsRefkey(operation)}
    >
      <For each={additionalOptions} semicolon hardline>
        {(opt) => (
          <ts.InterfaceMember name={opt.name} optional doc={opt.doc}>
            {opt.type}
          </ts.InterfaceMember>
        )}
      </For>
      <For each={optionalParameters} semicolon hardline>
        {(p: SdkMethodParameter) => (
          <ts.InterfaceMember
            name={normalizeName(p.name, NameType.Parameter)}
            optional
            doc={getDocsFromDescription(p.doc)?.join("\n")}
          >
            {getTypeExpression(context, p.type, { isOptional: true })}
          </ts.InterfaceMember>
        )}
      </For>
    </ts.InterfaceDeclaration>
  );
}
