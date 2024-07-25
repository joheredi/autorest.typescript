export const AzureCoreDependencies = {
  clientType: {
    kind: "dependency",
    key: "core_clientType",
    reference: {
      name: "Client",
      module: "@azure-rest/core-client"
    }
  },
  clientOptionsType: {
    kind: "dependency",
    key: "core_clientOptionsType",
    reference: {
      name: "ClientOptions",
      module: "@azure-rest/core-client"
    }
  },
  restPipeline: {
    kind: "dependency",
    key: "core_restPipeline",
    reference: {
      name: "Pipeline",
      module: "@azure/core-rest-pipeline"
    }
  },
  httpClientFactory: {
    kind: "dependency",
    key: "core_httpClientFactory",
    reference: {
      name: "getClient",
      module: "@azure-rest/core-client"
    }
  },
  restError: {
    kind: "dependency",
    key: "core_restError",
    reference: {
      name: "RestError",
      module: "@azure/core-rest-pipeline"
    }
  },
  operationOptions: {
    kind: "dependency",
    key: "core_operationOptions",
    reference: {
      name: "OperationOptions",
      module: "@azure-rest/core-client"
    }
  },
  pathUnckeckedResponse: {
    kind: "dependency",
    key: "core_pathUnckeckedResponse",
    reference: {
      name: "PathUncheckedResponse",
      module: "@azure-rest/core-client"
    }
  },
  abortSignalLike: {
    kind: "dependency",
    key: "core_abortSignalLike",
    reference: {
      name: "AbortSignalLike",
      module: "@azure/abort-controller"
    }
  },
  createRestError: {
    kind: "dependency",
    key: "core_createRestError",
    reference: {
      name: "createRestError",
      module: "@azure-rest/core-client"
    }
  },
  operationOptionsToRequestParameters: {
    kind: "dependency",
    key: "core_operationOptionsToRequestParameters",
    reference: {
      name: "operationOptionsToRequestParameters",
      module: "@azure-rest/core-client"
    }
  },
  getClient: {
    kind: "dependency",
    key: "core_getClient",
    reference: {
      name: "getClient",
      module: "@azure-rest/core-client"
    }
  },
  uint8ArrayToString: {
    kind: "dependency",
    key: "core_uint8ArrayToString",
    reference: {
      name: "uint8ArrayToString",
      module: "@azure/core-util"
    }
  }
} as const;

export const PagingDependencies = {
  pagedAsyncIterableIterator: {
    kind: "dependency",
    key: "paging_pagedAsyncIterableIterator",
    reference: {
      name: "PagedAsyncIterableIterator",
      module: "@azure/core-paging"
    }
  }
};

export const LroDependencies = {
  pollerLike: {
    kind: "dependency",
    key: "lro_polllerLike",
    reference: {
      name: "PollerLike",
      module: "@azure/core-lro"
    }
  },
  operationState: {
    kind: "dependency",
    key: "lro_operationState",
    reference: {
      name: "OperationState",
      module: "@azure/core-lro"
    }
  },
  deserializeState: {
    kind: "dependency",
    key: "lro_deserializeState",
    reference: {
      name: "deserializeState",
      module: "@azure/core-lro"
    }
  },
  resourceLocationConfig: {
    kind: "dependency",
    key: "lro_resourceLocationConfig",
    reference: {
      name: "ResourceLocationConfig",
      module: "@azure/core-lro"
    }
  },
  runningOperation: {
    kind: "dependency",
    key: "lro_runningOperation",
    reference: {
      name: "RunningOperation",
      module: "@azure/core-lro"
    }
  },
  createHttpPoller: {
    kind: "dependency",
    key: "lro_createHttpPoller",
    reference: {
      name: "createHttpPoller",
      module: "@azure/core-lro"
    }
  },
  operationResponse: {
    kind: "dependency",
    key: "lro_operationResponse",
    reference: {
      name: "OperationResponse",
      module: "@azure/core-lro"
    }
  },
  getLongRunningPoller: {
    kind: "dependency",
    key: "lro_getLongRunningPoller",
    reference: {
      name: "getLongRunningPoller",
      module: "@azure/core-lro"
    }
  }
} as const;
