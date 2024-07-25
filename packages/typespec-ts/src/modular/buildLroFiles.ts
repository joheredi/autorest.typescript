import path from "path";
import { isLroOnlyOperation } from "./helpers/operationHelpers.js";
import { Client, ModularCodeModel } from "./modularCodeModel.js";
import { resolveReference } from "../framework/reference.js";
import { addDeclaration } from "../framework/declaration.js";
import { buildLroDeserDetailMap } from "./buildOperations.js";
import {
  FunctionDeclarationStructure,
  InterfaceDeclarationStructure,
  StructureKind
} from "ts-morph";
import {
  AzureCoreDependencies,
  LroDependencies
} from "../core/azure-dependencies.js";
import { CoreDependencies } from "../core/dependencies.js";

export enum LroRefKeys {
  RestorePollerOptions = "RestorePollerOptions",
  RestorePollerFunction = "RestorePollerFunction",
  GetLongRunningPollerFunction = "GetLongRunningPollerFunction",
  GetLongRunningPollerOptions = "GetLongRunningPollerOptions"
}
/**
 * Generate `restorePollerHelpers.ts` file
 * @param codeModel - The code model.
 * @param client - The client.
 * @returns
 */
export function buildRestorePollerHelper(
  codeModel: ModularCodeModel,
  client: Client
) {
  const lros = client.operationGroups
    .flatMap((op) => op.operations)
    .filter(isLroOnlyOperation);
  if (lros.length === 0) {
    return;
  }
  const srcPath = codeModel.modularOptions.sourceRoot;
  const subfolder = client.subfolder ?? "";
  const filePath = path.join(
    `${srcPath}/${
      subfolder !== "" ? subfolder + "/" : ""
    }restorePollerHelpers.ts`
  );
  const restorePollerFile = codeModel.project.createSourceFile(
    filePath,
    undefined,
    {
      overwrite: true
    }
  );

  const deserializeMap = getDeserializeMap(client);

  const pathUnckeckedResponseRef = resolveReference(
    AzureCoreDependencies.pathUnckeckedResponse
  );
  const restorePollerOptionsInterface: InterfaceDeclarationStructure = {
    kind: StructureKind.Interface,
    isExported: true,
    name: "RestorePollerOptions",
    typeParameters: [
      {
        name: "TResult"
      },
      {
        name: `TResponse extends ${pathUnckeckedResponseRef} = ${pathUnckeckedResponseRef}`
      }
    ],
    extends: [resolveReference(AzureCoreDependencies.operationOptions)],
    properties: [
      {
        name: "updateIntervalInMs",
        type: "number",
        hasQuestionToken: true,
        docs: ["Delay to wait until next poll, in milliseconds."]
      },
      {
        name: "abortSignal",
        type: resolveReference(AzureCoreDependencies.abortSignalLike),
        hasQuestionToken: true,
        docs: ["The signal which can be used to abort requests."]
      },
      {
        name: "processResponseBody",
        type: "(result: TResponse) => Promise<TResult>",
        hasQuestionToken: true,
        docs: ["Deserialization function for raw response body"]
      }
    ]
  };

  addDeclaration(
    restorePollerFile,
    restorePollerOptionsInterface,
    LroRefKeys.RestorePollerOptions
  );

  const pollerLikeRef = resolveReference(LroDependencies.pollerLike);
  const operationStateRef = resolveReference(LroDependencies.operationState);
  const restorePollerFunction: FunctionDeclarationStructure = {
    kind: StructureKind.Function,
    isExported: true,
    docs: [
      `Creates a poller from the serialized state of another poller. This can be`,
      `useful when you want to create pollers on a different host or a poller`,
      `needs to be constructed after the original one is not in scope.`
    ],
    name: "restorePoller",
    typeParameters: [
      {
        name: "TResult"
      },
      {
        name: `TResponse extends ${pathUnckeckedResponseRef}`
      }
    ],
    parameters: [
      {
        name: "client",
        type: resolveReference(AzureCoreDependencies.clientType)
      },
      {
        name: "serializedState",
        type: "string"
      },
      {
        name: "sourceOperation",
        type: `(...args: any[]) => ${pollerLikeRef}<${operationStateRef}<TResult>, TResult>`
      },
      {
        name: "options",
        type: `${resolveReference(LroRefKeys.RestorePollerOptions)}<TResult>`
      }
    ],
    returnType: `${pollerLikeRef}<${operationStateRef}<TResult>, TResult>`,
    statements: `
        const pollerConfig = ${resolveReference(
          LroDependencies.deserializeState
        )}(serializedState).config;
        const { initialRequestUrl, requestMethod, metadata } = pollerConfig;
        if (!initialRequestUrl || !requestMethod) {
          throw new Error(
            \`Invalid serialized state: \${serializedState} for sourceOperation \${sourceOperation?.name}\`
          );
        }
        const resourceLocationConfig = metadata?.["resourceLocationConfig"] as
          | ${resolveReference(LroDependencies.resourceLocationConfig)}
          | undefined;
        const deserializeHelper =
          options?.processResponseBody ??
          getDeserializationHelper(initialRequestUrl, requestMethod);
        if (!deserializeHelper) {
          throw new Error(
            \`Please ensure the operation is in this client! We can't find its deserializeHelper for \${sourceOperation?.name}.\`
          );
        }
        return ${resolveReference(LroRefKeys.GetLongRunningPollerFunction)}(
          (client as any)["_client"] ?? client,
          deserializeHelper as (result: TResponse) => Promise<TResult>,
          {
            updateIntervalInMs: options?.updateIntervalInMs,
            abortSignal: options?.abortSignal,
            resourceLocationConfig,
            restoreFrom: serializedState,
            initialRequestUrl
          }
        );`
  };

  addDeclaration(
    restorePollerFile,
    restorePollerFunction,
    LroRefKeys.RestorePollerFunction
  );

  const restorePollerNonExportedStatements = `      
      const deserializeMap: Record<string, Function> = {
        ${deserializeMap.join(",\n")}
      };

      function getDeserializationHelper(
        urlStr: string,
        method: string
      ): ((result: unknown) => Promise<unknown>) | undefined {
        const path = new URL(urlStr).pathname;
        const pathParts = path.split("/");
      
        // Traverse list to match the longest candidate
        // matchedLen: the length of candidate path
        // matchedValue: the matched status code array
        let matchedLen = -1,
          matchedValue: ((result: unknown) => Promise<unknown>) | undefined;
      
        // Iterate the responseMap to find a match
        for (const [key, value] of Object.entries(deserializeMap)) {
          // Extracting the path from the map key which is in format
          // GET /path/foo
          if (!key.startsWith(method)) {
            continue;
          }
          const candidatePath = getPathFromMapKey(key);
          // Get each part of the url path
          const candidateParts = candidatePath.split("/");
      
          // track if we have found a match to return the values found.
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
              // If the current part of the candidate is a "template" part
              // Try to use the suffix of pattern to match the path
              // {guid} ==> $
              // {guid}:export ==> :export$
              const isMatched = new RegExp(
                \`\${candidateParts[i]?.slice(start, end)}\`
              ).test(pathParts[j] || "");
      
              if (!isMatched) {
                found = false;
                break;
              }
              continue;
            }
      
            // If the candidate part is not a template and
            // the parts don't match mark the candidate as not found
            // to move on with the next candidate path.
            if (candidateParts[i] !== pathParts[j]) {
              found = false;
              break;
            }
          }
      
          // We finished evaluating the current candidate parts
          // Update the matched value if and only if we found the longer pattern
          if (found && candidatePath.length > matchedLen) {
            matchedLen = candidatePath.length;
            matchedValue = value as (result: unknown) => Promise<unknown>;
          }
        }
      
        return matchedValue;
      }
      
      function getPathFromMapKey(mapKey: string): string {
        const pathStart = mapKey.indexOf("/");
        return mapKey.slice(pathStart);
      }      
    `;
  restorePollerFile.addStatements(restorePollerNonExportedStatements);
}

function getDeserializeMap(client: Client) {
  const deserializeDetails = buildLroDeserDetailMap(client);
  const deserializeMap: string[] = [];
  for (const value of deserializeDetails.values()) {
    value.forEach((detail) => {
      deserializeMap.push(
        `"${detail.path}": ${detail.renamedDeserName ?? detail.deserName}`
      );
    });
  }
  return deserializeMap;
}
/**
 * Generate `api/pollingHelpers.ts` file
 * @param codeModel - The code model.
 * @param client - The client.
 * @param needUnexpectedHelper - Whether need to import unexpected helper.
 * @param isMultiClients - Whether the client is multi-clients.
 * @returns
 */
export function buildGetPollerHelper(
  codeModel: ModularCodeModel,
  client: Client
) {
  const lroOperstions = client.operationGroups
    .flatMap((op) => op.operations)
    .filter(isLroOnlyOperation);
  if (lroOperstions.length === 0) {
    return;
  }

  const filePath = path.join(
    codeModel.modularOptions.sourceRoot,
    client.subfolder ?? "",
    `api/pollingHelpers.ts`
  );

  const sourceFile = codeModel.project.createSourceFile(filePath, undefined, {
    overwrite: true
  });

  const pathUnckeckedResponseRef = resolveReference(
    AzureCoreDependencies.pathUnckeckedResponse
  );

  const pollerLikeRef = resolveReference(LroDependencies.pollerLike);
  const operationStateRef = resolveReference(LroDependencies.operationState);

  const checkResponseStatus = `if (Number.isNaN(response.status)) {
        throw ${resolveReference(CoreDependencies.createRestError)}(
          \`Status code of the response is not a number. Value: \${response.status}\`,
          response
        );
      }`;

  const getLongRunningPollerOptions: InterfaceDeclarationStructure = {
    kind: StructureKind.Interface,
    isExported: true,
    name: "GetLongRunningPollerOptions",
    typeParameters: [
      {
        name: "TResponse"
      }
    ],
    properties: [
      {
        name: "updateIntervalInMs",
        type: "number",
        hasQuestionToken: true,
        docs: ["Delay to wait until next poll, in milliseconds."]
      },
      {
        name: "abortSignal",
        type: resolveReference(AzureCoreDependencies.abortSignalLike),
        hasQuestionToken: true,
        docs: ["The signal which can be used to abort requests."]
      },
      {
        name: "resourceLocationConfig",
        type: resolveReference(LroDependencies.resourceLocationConfig),
        hasQuestionToken: true,
        docs: [
          "The potential location of the result of the LRO if specified by the LRO extension in the swagger."
        ]
      },
      {
        name: "initialRequestUrl",
        type: "string",
        hasQuestionToken: true,
        docs: [
          "The original url of the LRO",
          "Should not be null when restoreFrom is set"
        ]
      },
      {
        name: "restoreFrom",
        type: "string",
        hasQuestionToken: true,
        docs: [
          "A serialized poller which can be used to resume an existing paused Long-Running-Operation."
        ]
      },
      {
        name: "getInitialResponse",
        type: `() => PromiseLike<TResponse>`,
        hasQuestionToken: true,
        docs: ["The function to get the initial response"]
      }
    ]
  };

  addDeclaration(
    sourceFile,
    getLongRunningPollerOptions,
    LroRefKeys.GetLongRunningPollerOptions
  );

  // prettier-ignore
  const gerLroPollerBody = ` 
     const { restoreFrom, getInitialResponse } = options;
     if (!restoreFrom && !getInitialResponse) {
        throw new Error("Either restoreFrom or getInitialResponse must be specified");
     }
     let initialResponse: TResponse | undefined = undefined;
     const pollAbortController = new AbortController();
     const poller: ${resolveReference(LroDependencies.runningOperation)}<TResponse> = {
        sendInitialRequest: async () => {
          if (!getInitialResponse) {
            throw new Error("getInitialResponse is required when initializing a new poller");
          }
          initialResponse = await getInitialResponse();
          return getLroResponse(initialResponse);
        },
        sendPollRequest: async (path: string, pollOptions?: { abortSignal?: ${resolveReference(AzureCoreDependencies.abortSignalLike)}}) => {
          // The poll request would both listen to the user provided abort signal and the poller's own abort signal
          function abortListener(): void {
            pollAbortController.abort();
          }
          const abortSignal = pollAbortController.signal;
          if (options.abortSignal?.aborted) {
            pollAbortController.abort();
          } else if (pollOptions?.abortSignal?.aborted) {
            pollAbortController.abort();
          } else if (!abortSignal.aborted) {
            options.abortSignal?.addEventListener("abort", abortListener, { once: true });
            pollOptions?.abortSignal?.addEventListener("abort", abortListener, { once: true});
          }

          let response;
          try {
            response = await client.pathUnchecked(path).get({ abortSignal });
          } finally {
            options.abortSignal?.removeEventListener("abort", abortListener);
            pollOptions?.abortSignal?.removeEventListener("abort", abortListener);
          }
      
          if (options.initialRequestUrl || initialResponse) {
            response.headers["x-ms-original-url"] = options.initialRequestUrl ?? initialResponse!.request.url;
          }

          return getLroResponse(response as TResponse);
        }
      }; 
    
      return ${resolveReference(LroDependencies.createHttpPoller)}(poller, {
        intervalInMs: options?.updateIntervalInMs,
        resourceLocationConfig: options?.resourceLocationConfig,
        restoreFrom: options?.restoreFrom,
        processResult: (result: unknown) => {
            return processResponseBody(result as TResponse);
        }});`;

  const getLongRunningPollerFunction: FunctionDeclarationStructure = {
    kind: StructureKind.Function,
    isExported: true,
    name: "getLongRunningPoller",
    typeParameters: [
      {
        name: "TResponse extends " + pathUnckeckedResponseRef
      },
      {
        name: "TResult = void"
      }
    ],
    parameters: [
      {
        name: "client",
        type: resolveReference(AzureCoreDependencies.clientType)
      },
      {
        name: "processResponseBody",
        type: `(result: TResponse) => Promise<TResult>`
      },
      {
        name: "options",
        type: "GetLongRunningPollerOptions<TResponse>"
      }
    ],
    returnType: `${pollerLikeRef}<${operationStateRef}<TResult>, TResult>`,
    statements: gerLroPollerBody
  };

  addDeclaration(
    sourceFile,
    getLongRunningPollerFunction,
    LroRefKeys.GetLongRunningPollerFunction
  );

  const nonExportedStatements = `
  /**
   * Converts a Rest Client response to a response that the LRO implementation understands
   * @param response - a rest client http response
   * @param deserializeFn - deserialize function to convert Rest response to modular output
   * @returns - An LRO response that the LRO implementation understands
   */
  function getLroResponse<TResponse extends ${pathUnckeckedResponseRef}>(
    response: TResponse
  ): ${resolveReference(LroDependencies.operationResponse)}<TResponse> {
    ${checkResponseStatus}
    return {
      flatResponse: response,
      rawResponse: {
        ...response,
        statusCode: Number.parseInt(response.status),
        body: response.body
      }
    };
  }  
  `;

  sourceFile.addStatements(nonExportedStatements);
}
