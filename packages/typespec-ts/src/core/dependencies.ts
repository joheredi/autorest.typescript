export const CoreDependencies = {
  clientType: {
    kind: "dependency",
    key: "core_clientType",
    reference: {
      name: "Client",
      module: "@typespec/ts-http-runtime"
    }
  },
  clientOptionsType: {
    kind: "dependency",
    key: "core_clientOptionsType",
    reference: {
      name: "ClientOptions",
      module: "@typespec/ts-http-runtime"
    }
  },
  restPipeline: {
    kind: "dependency",
    key: "core_restPipeline",
    reference: {
      name: "Pipeline",
      module: "@typespec/ts-http-runtime"
    }
  },
  httpClientFactory: {
    kind: "dependency",
    key: "core_httpClientFactory",
    reference: {
      name: "getClient",
      module: "@typespec/ts-http-runtime"
    }
  },
  restError: {
    kind: "dependency",
    key: "core_restError",
    reference: {
      name: "RestError",
      module: "@typespec/ts-http-runtime"
    }
  },
  operationOptions: {
    kind: "dependency",
    key: "core_operationOptions",
    reference: {
      name: "OperationOptions",
      module: "@typespec/ts-http-runtime"
    }
  },
  pathUnckeckedResponse: {
    kind: "dependency",
    key: "core_pathUnckeckedResponse",
    reference: {
      name: "PathUncheckedResponse",
      module: "@typespec/ts-http-runtime"
    }
  },
  abortSignalLike: {
    kind: "dependency",
    key: "core_abortSignalLike",
    reference: {
      name: "AbortSignalLike",
      module: "@typespec/ts-http-runtime"
    }
  },
  abortController: {
    kind: "dependency",
    key: "core_abortController",
    reference: {
      name: "AbortController",
      module: "@typespec/ts-http-runtime"
    }
  },
  createRestError: {
    kind: "dependency",
    key: "core_createRestError",
    reference: {
      name: "createRestError",
      module: "@typespec/ts-http-runtime"
    }
  },
  operationOptionsToRequestParameters: {
    kind: "dependency",
    key: "core_operationOptionsToRequestParameters",
    reference: {
      name: "operationOptionsToRequestParameters",
      module: "@typespec/ts-http-runtime"
    }
  },
  getClient: {
    kind: "dependency",
    key: "core_getClient",
    reference: {
      name: "getClient",
      module: "@typespec/ts-http-runtime"
    }
  },
  uint8ArrayToString: {
    kind: "dependency",
    key: "core_uint8ArrayToString",
    reference: {
      name: "uint8ArrayToString",
      module: "@typespec/ts-http-runtime"
    }
  }
} as const;
