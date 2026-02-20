import { ComputeClient } from "./computeClient.js";
import { _createOrUpdateDeserialize } from "./api/diskAccesses/operations.js";
import { _createOrUpdateDeserialize as _createOrUpdateDeserializeDisks } from "./api/disks/operations.js";
import { _createOrUpdateDeserialize as _createOrUpdateDeserializeVirtualMachines } from "./api/virtualMachines/operations.js";
export interface RestorePollerOptions<
TResult,
TResponse extends <Unresolved Symbol: refkey[o200]> = <Unresolved Symbol: refkey[o200]>
> extends <Unresolved Symbol: refkey[o198]> {
/** Delay to wait until next poll, in milliseconds. */
updateIntervalInMs?: number;
/**
  * The signal which can be used to abort requests.
  */
abortSignal?: <Unresolved Symbol: refkey[o206]>;
/** Deserialization function for raw response body */
processResponseBody?: (result: TResponse) => Promise<TResult>;
}

/**
* Creates a poller from the serialized state of another poller. This can be
* useful when you want to create pollers on a different host or a poller
* needs to be constructed after the original one is not in scope.
*/
export function restorePoller<TResponse extends <Unresolved Symbol: refkey[o200]>, TResult>(
client: ComputeClient,
serializedState: string,
sourceOperation: (
  ...args: any[]
) => <Unresolved Symbol: refkey[o212]><<Unresolved Symbol: refkey[o213]><TResult>, TResult>,
options?: RestorePollerOptions<TResult>
): <Unresolved Symbol: refkey[o212]><<Unresolved Symbol: refkey[o213]><TResult>, TResult> {
const pollerConfig = <Unresolved Symbol: refkey[o214]>(serializedState).config;
const { initialRequestUrl, requestMethod, metadata } = pollerConfig;
if (!initialRequestUrl || !requestMethod) {
  throw new Error(
    `Invalid serialized state: ${serializedState} for sourceOperation ${sourceOperation?.name}`
  );
}
const resourceLocationConfig = metadata?.["resourceLocationConfig"] as
  | <Unresolved Symbol: refkey[o215]>
  | undefined;
const { deserializer, expectedStatuses = [] } =
  getDeserializationHelper(initialRequestUrl, requestMethod) ?? {};
const deserializeHelper = options?.processResponseBody ?? deserializer;
if (!deserializeHelper) {
  throw new Error(
    `Please ensure the operation is in this client! We can't find its deserializeHelper for ${sourceOperation?.name}.`
  );
}
const apiVersion = getApiVersionFromUrl(initialRequestUrl);
return getLongRunningPoller(
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
"PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}": { deserializer: _createOrUpdateDeserialize, expectedStatuses: ["200", "202", "201"] },
"PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/disks/{diskName}": { deserializer: _createOrUpdateDeserializeDisks, expectedStatuses: ["200", "201", "202"] },
"PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}": { deserializer: _createOrUpdateDeserializeVirtualMachines, expectedStatuses: ["200", "201", "202"] }
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
        `${candidateParts[i]?.slice(start, end)}`
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
