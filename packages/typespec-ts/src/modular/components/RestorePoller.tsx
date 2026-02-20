import { code, Children, refkey, Refkey } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import {
  SdkClientType,
  SdkServiceOperation
} from "@azure-tools/typespec-client-generator-core";
import {
  NameType,
  normalizeName,
  isAzurePackage
} from "@azure-tools/rlc-common";
import { SdkContext } from "../../utils/interfaces.js";
import { ModularEmitterOptions } from "../interfaces.js";
import { getClassicalClientName } from "../helpers/namingHelpers.js";
import { getModularClientOptions } from "../../utils/clientUtils.js";
import { getMethodHierarchiesMap } from "../../utils/operationUtil.js";
import { isLroOnlyOperation } from "../helpers/operationHelpers.js";
import { buildLroDeserDetailMap } from "../buildOperations.js";
import {
  httpRuntimeLib,
  azureCoreClientLib,
  azureCoreLroLib,
  azureAbortControllerLib
} from "./ExternalPackages.js";
import path from "path";

/** Refkey for the restore poller function */
export function restorePollerRefkey(
  client: SdkClientType<SdkServiceOperation>
): Refkey {
  return refkey(client, "restorePoller");
}

// ── Component ───────────────────────────────────────────────────────────

export interface RestorePollerProps {
  context: SdkContext;
  clientMap: [string[], SdkClientType<SdkServiceOperation>];
  emitterOptions: ModularEmitterOptions;
}

/**
 * Generates the restorePollerHelpers.ts file for clients with LRO operations.
 * Returns null if the client has no LRO operations.
 */
export function RestorePoller(props: RestorePollerProps): Children {
  const { context, clientMap, emitterOptions } = props;
  const [_, client] = clientMap;
  const { subfolder } = getModularClientOptions(clientMap);
  const methodMap = getMethodHierarchiesMap(context, client);
  const hasLro = Array.from(methodMap.values()).some((operations) =>
    operations.some(isLroOnlyOperation)
  );
  if (!hasLro) return null;

  const srcPath = emitterOptions.modularOptions.sourceRoot;
  const filePath = path.join(
    `${srcPath}/${subfolder && subfolder !== "" ? subfolder + "/" : ""}restorePollerHelpers.ts`
  );

  const isAzure = isAzurePackage({ options: context.rlcOptions ?? {} });
  const pathUncheckedRef = isAzure
    ? azureCoreClientLib.PathUncheckedResponse
    : httpRuntimeLib.PathUncheckedResponse;
  const operationOptionsRef = isAzure
    ? azureCoreClientLib.OperationOptions
    : httpRuntimeLib.OperationOptions;
  const abortSignalRef = isAzure
    ? azureAbortControllerLib.AbortSignalLike
    : httpRuntimeLib.AbortSignalLike;
  const pollerLikeRef = azureCoreLroLib.PollerLike;
  const operationStateRef = azureCoreLroLib.OperationState;
  const deserializeStateRef = azureCoreLroLib.deserializeState;
  const resourceLocationConfigRef = azureCoreLroLib.ResourceLocationConfig;

  // Build the deserialize map and import info
  const deserializeDetails = buildLroDeserDetailMap(context, client);
  const deserializeMapEntries: string[] = [];
  const importStatements: string[] = [];

  for (const [key, value] of deserializeDetails.entries()) {
    const namedImports = value
      .map((detail) =>
        detail.renamedDeserName
          ? `${detail.deserName} as ${detail.renamedDeserName}`
          : detail.deserName
      )
      .join(", ");
    importStatements.push(`import { ${namedImports} } from "${key}";`);
    value.forEach((detail) => {
      deserializeMapEntries.push(
        `"${detail.path}": { deserializer: ${detail.renamedDeserName ?? detail.deserName}, expectedStatuses: ${detail.expectedStatusesExpression} }`
      );
    });
  }

  // Build classical client import
  const classicalClientName = getClassicalClientName(client);
  const classicalClientImport = `import { ${classicalClientName} } from "./${normalizeName(classicalClientName, NameType.File)}.js";`;

  // TODO: Once the static helper GetLongRunningPoller is migrated to a JSX
  // component with a refkey, replace this string with a refkey reference.
  // For now we use the function name directly since it's in a static helper
  // that gets copied into the output.
  const getLongRunningPollerName = "getLongRunningPoller";

  return (
    <ts.SourceFile path={filePath}>
      {classicalClientImport}
      {"\n"}
      {importStatements.join("\n")}
      {code`

export interface RestorePollerOptions<
  TResult,
  TResponse extends ${pathUncheckedRef} = ${pathUncheckedRef}
> extends ${operationOptionsRef} {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /**
   * The signal which can be used to abort requests.
   */
  abortSignal?: ${abortSignalRef};
  /** Deserialization function for raw response body */
  processResponseBody?: (result: TResponse) => Promise<TResult>;
}

/**
 * Creates a poller from the serialized state of another poller. This can be
 * useful when you want to create pollers on a different host or a poller
 * needs to be constructed after the original one is not in scope.
 */
export function restorePoller<TResponse extends ${pathUncheckedRef}, TResult>(
  client: ${classicalClientName},
  serializedState: string,
  sourceOperation: (
    ...args: any[]
  ) => ${pollerLikeRef}<${operationStateRef}<TResult>, TResult>,
  options?: RestorePollerOptions<TResult>
): ${pollerLikeRef}<${operationStateRef}<TResult>, TResult> {
  const pollerConfig = ${deserializeStateRef}(serializedState).config;
  const { initialRequestUrl, requestMethod, metadata } = pollerConfig;
  if (!initialRequestUrl || !requestMethod) {
    throw new Error(
      ${"`Invalid serialized state: ${serializedState} for sourceOperation ${sourceOperation?.name}`"}
    );
  }
  const resourceLocationConfig = metadata?.["resourceLocationConfig"] as
    | ${resourceLocationConfigRef}
    | undefined;
  const { deserializer, expectedStatuses = [] } =
    getDeserializationHelper(initialRequestUrl, requestMethod) ?? {};
  const deserializeHelper = options?.processResponseBody ?? deserializer;
  if (!deserializeHelper) {
    throw new Error(
      ${"`Please ensure the operation is in this client! We can't find its deserializeHelper for ${sourceOperation?.name}.`"}
    );
  }
  const apiVersion = getApiVersionFromUrl(initialRequestUrl);
  return ${getLongRunningPollerName}(
    (client as any)["_client"] ?? client,
    deserializeHelper as (result: TResponse) => Promise<TResult>,
    expectedStatuses,
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      resourceLocationConfig,
      restoreFrom: serializedState,
      initialRequestUrl,
      apiVersion,
    }
  );
}

interface DeserializationHelper {
  deserializer: (result: PathUncheckedResponse) => Promise<any>;
  expectedStatuses: string[];
}

const deserializeMap: Record<string, DeserializationHelper> = {
  ${deserializeMapEntries.join(",\n")}
};

function getDeserializationHelper(
  urlStr: string,
  method: string
): DeserializationHelper | undefined {
  const path = new URL(urlStr).pathname;
  const pathParts = path.split("/");

  let matchedLen = -1,
    matchedValue: DeserializationHelper | undefined;

  for (const [key, value] of Object.entries(deserializeMap)) {
    if (!key.startsWith(method)) {
      continue;
    }
    const candidatePath = getPathFromMapKey(key);
    const candidateParts = candidatePath.split("/");

    let found = true;
    for (
      let i = candidateParts.length - 1, j = pathParts.length - 1;
      i >= 1 && j >= 1;
      i--, j--
    ) {
      if (
        candidateParts[i]?.startsWith("{") &&
        candidateParts[i]?.indexOf("}") !== -1
      ) {
        const start = candidateParts[i]!.indexOf("}") + 1,
          end = candidateParts[i]?.length;
        const isMatched = new RegExp(
          ${"`${candidateParts[i]?.slice(start, end)}`"}
        ).test(pathParts[j] || "");

        if (!isMatched) {
          found = false;
          break;
        }
        continue;
      }

      if (candidateParts[i] !== pathParts[j]) {
        found = false;
        break;
      }
    }

    if (found && candidatePath.length > matchedLen) {
      matchedLen = candidatePath.length;
      matchedValue = value;
    }
  }

  return matchedValue;
}

function getPathFromMapKey(mapKey: string): string {
  const pathStart = mapKey.indexOf("/");
  return mapKey.slice(pathStart);
}

function getApiVersionFromUrl(urlStr: string): string | undefined {
  const url = new URL(urlStr);
  return url.searchParams.get("api-version") ?? undefined;
}
`}
    </ts.SourceFile>
  );
}
