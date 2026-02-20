import { createPackage } from "@alloy-js/typescript";

/**
 * External package definitions for use with Alloy's automatic import system.
 * These mirror the existing ReferenceableSymbol definitions in
 * external-dependencies.ts but use Alloy's createPackage API.
 *
 * When a component references e.g. `httpRuntimeLib.Client`, Alloy will
 * automatically add `import { Client } from "@typespec/ts-http-runtime"`
 * to the consuming source file.
 */

// ── @typespec/ts-http-runtime (unbranded) ───────────────────────────────

export const httpRuntimeLib = createPackage({
  name: "@typespec/ts-http-runtime",
  version: "0.1.0",
  descriptor: {
    ".": {
      named: [
        "Client",
        "ClientOptions",
        "Pipeline",
        "getClient",
        "RestError",
        "OperationOptions",
        "StreamableMethod",
        "PathUncheckedResponse",
        "AbortSignalLike",
        "createRestError",
        "operationOptionsToRequestParameters",
        "uint8ArrayToString",
        "stringToUint8Array",
        "KeyCredential",
        "isKeyCredential",
        "TokenCredential",
        "ErrorModel"
      ]
    }
  }
});

// ── @azure-rest/core-client (Azure branded) ─────────────────────────────

export const azureCoreClientLib = createPackage({
  name: "@azure-rest/core-client",
  version: "2.3.1",
  descriptor: {
    ".": {
      named: [
        "Client",
        "ClientOptions",
        "getClient",
        "RestError",
        "OperationOptions",
        "StreamableMethod",
        "PathUncheckedResponse",
        "createRestError",
        "operationOptionsToRequestParameters",
        "ErrorModel",
        { name: "ErrorResponse", as: "AzureCoreErrorResponse" }
      ]
    }
  }
});

// ── @azure/core-rest-pipeline ───────────────────────────────────────────

export const azureCorePipelineLib = createPackage({
  name: "@azure/core-rest-pipeline",
  version: "1.14.0",
  descriptor: {
    ".": {
      named: ["Pipeline"]
    }
  }
});

// ── @azure/abort-controller ─────────────────────────────────────────────

export const azureAbortControllerLib = createPackage({
  name: "@azure/abort-controller",
  version: "2.1.2",
  descriptor: {
    ".": {
      named: ["AbortSignalLike"]
    }
  }
});

// ── @azure/core-auth ────────────────────────────────────────────────────

export const azureCoreAuthLib = createPackage({
  name: "@azure/core-auth",
  version: "1.6.0",
  descriptor: {
    ".": {
      named: ["KeyCredential", "isKeyCredential", "TokenCredential"]
    }
  }
});

// ── @azure/core-util ────────────────────────────────────────────────────

export const azureCoreUtilLib = createPackage({
  name: "@azure/core-util",
  version: "1.4.0",
  descriptor: {
    ".": {
      named: ["uint8ArrayToString", "stringToUint8Array"]
    }
  }
});

// ── @azure/core-lro ─────────────────────────────────────────────────────

export const azureCoreLroLib = createPackage({
  name: "@azure/core-lro",
  version: "3.1.0",
  descriptor: {
    ".": {
      named: [
        "PollerLike",
        "OperationState",
        { name: "deserializeState", as: "DeserializeState" },
        "ResourceLocationConfig"
      ]
    }
  }
});

// ── @azure/identity ─────────────────────────────────────────────────────

export const azureIdentityLib = createPackage({
  name: "@azure/identity",
  version: "4.0.0",
  descriptor: {
    ".": {
      named: ["DefaultAzureCredential"]
    }
  }
});
