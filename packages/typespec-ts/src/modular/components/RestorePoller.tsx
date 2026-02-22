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
import {
  ModularEmitterOptions,
  OperationPathAndDeserDetails
} from "../interfaces.js";
import {
  getClassicalClientName,
  getOperationName
} from "../helpers/namingHelpers.js";
import { getModularClientOptions } from "../../utils/clientUtils.js";
import { getMethodHierarchiesMap } from "../../utils/operationUtil.js";
import {
  isLroOnlyOperation,
  getExpectedStatuses
} from "../helpers/operationHelpers.js";
import {
  httpRuntimeLib,
  azureCoreClientLib,
  azureCoreLroLib,
  azureAbortControllerLib
} from "./ExternalPackages.js";
import { getStaticHelperFileInfo } from "./StaticHelperRefkeys.js";
import { deserializeFunctionRefkey } from "./Operations.js";
import path from "path";

/**
 * This function creates a map of operation file path to operation names.
 */
function buildLroDeserDetailMap(
  context: SdkContext,
  client: SdkClientType<SdkServiceOperation>
) {
  const map = new Map<string, OperationPathAndDeserDetails[]>();
  const existingNames = new Set<string>();
  const methodMap = getMethodHierarchiesMap(context, client);
  for (const [prefixKey, operations] of methodMap) {
    const prefixes = prefixKey.split("/");
    const lroOperations = operations.filter((o) => isLroOnlyOperation(o));
    // skip this operation group if it has no LRO operations
    if (lroOperations.length === 0) {
      continue;
    }

    const operationFileName =
      prefixes.length > 0 && prefixKey !== ""
        ? `${prefixes
            .map((hierarchy) => {
              return normalizeName(hierarchy, NameType.File);
            })
            .join("/")}/operations`
        : // When the program has no operation groups defined all operations are put
          // into a nameless operation group. We'll call this operations.
          "operations";
    map.set(
      `./api/${operationFileName}.js`,
      lroOperations.map((o) => {
        const { name } = getOperationName(o);
        const deserName = `_${name}Deserialize`;
        let renamedDeserName = undefined;
        if (existingNames.has(deserName)) {
          const newName = `${name}Deserialize${normalizeName(
            operationFileName.split("/").slice(0, -1).join("_"),
            NameType.Interface
          )}`;
          renamedDeserName = `_${newName}`;
        }
        existingNames.add(deserName);
        return {
          path: `${o.operation.verb.toUpperCase()} ${o.operation.path}`,
          expectedStatusesExpression: getExpectedStatuses(o),
          deserName,
          renamedDeserName,
          operation: o
        };
      })
    );
  }
  return map;
}

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
  const deserializeMapEntries: Children[] = [];

  for (const [_key, value] of deserializeDetails.entries()) {
    value.forEach((detail) => {
      deserializeMapEntries.push(
        code`"${detail.path}": { deserializer: ${deserializeFunctionRefkey(detail.operation)}, expectedStatuses: ${detail.expectedStatusesExpression} }`
      );
    });
  }

  // Build classical client import
  const classicalClientName = getClassicalClientName(client);
  const classicalClientImport = `import { ${classicalClientName} } from "./${normalizeName(classicalClientName, NameType.File)}.js";`;

  // Build import for getLongRunningPoller from the pollingHelpers static helper.
  // Once static helpers are rendered as Alloy <ts.SourceFile> components with
  // refkey-annotated declarations (Phase 9), this manual import can be replaced
  // with pollingHelperRefkey("getLongRunningPoller") in the code template,
  // which will auto-resolve the import.
  const pollingHelperInfo = getStaticHelperFileInfo(
    "Polling",
    "getLongRunningPoller"
  );
  const pollingHelperDir = path.dirname(
    path.join(srcPath, pollingHelperInfo.relativePath)
  );
  const restorePollerDir = path.dirname(filePath);
  let pollingHelperRelative = path.relative(restorePollerDir, pollingHelperDir);
  if (!pollingHelperRelative.startsWith(".")) {
    pollingHelperRelative = "./" + pollingHelperRelative;
  }
  const pollingHelperBasename = path.basename(
    pollingHelperInfo.relativePath,
    path.extname(pollingHelperInfo.relativePath)
  );
  const getLongRunningPollerImport = `import { ${pollingHelperInfo.exportName} } from "${pollingHelperRelative}/${pollingHelperBasename}.js";`;
  const getLongRunningPollerName = pollingHelperInfo.exportName;

  return (
    <ts.SourceFile path={filePath}>
      {classicalClientImport}
      {"\n"}
      {getLongRunningPollerImport}
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
  ${deserializeMapEntries.flatMap((e, i) => (i > 0 ? [",\n", e] : [e]))}
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
