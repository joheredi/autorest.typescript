/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ManagedLabsClient } from "../managedLabsClient";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  LabAccountsListBySubscriptionOptionalParams,
  LabAccountsListBySubscriptionResponse,
  LabAccountsListByResourceGroupOptionalParams,
  LabAccountsListByResourceGroupResponse,
  LabAccountsGetOptionalParams,
  LabAccountsGetResponse,
  LabAccount,
  LabAccountsCreateOrUpdateResponse,
  LabAccountFragment,
  LabAccountsUpdateResponse,
  CreateLabProperties,
  LabAccountsGetRegionalAvailabilityResponse,
  LabAccountsListBySubscriptionNextOptionalParams,
  LabAccountsListBySubscriptionNextResponse,
  LabAccountsListByResourceGroupNextOptionalParams,
  LabAccountsListByResourceGroupNextResponse
} from "../models";

/**
 * Class representing a LabAccounts.
 */
export class LabAccounts {
  private readonly client: ManagedLabsClient;

  /**
   * Initialize a new instance of the class LabAccounts class.
   * @param client Reference to the service client
   */
  constructor(client: ManagedLabsClient) {
    this.client = client;
  }

  /**
   * List lab accounts in a subscription.
   * @param options The options parameters.
   */
  listBySubscription(
    options?: LabAccountsListBySubscriptionOptionalParams
  ): Promise<LabAccountsListBySubscriptionResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      listBySubscriptionOperationSpec
    ) as Promise<LabAccountsListBySubscriptionResponse>;
  }

  /**
   * List lab accounts in a resource group.
   * @param resourceGroupName The name of the resource group.
   * @param options The options parameters.
   */
  listByResourceGroup(
    resourceGroupName: string,
    options?: LabAccountsListByResourceGroupOptionalParams
  ): Promise<LabAccountsListByResourceGroupResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, options: operationOptions },
      listByResourceGroupOperationSpec
    ) as Promise<LabAccountsListByResourceGroupResponse>;
  }

  /**
   * Get lab account
   * @param resourceGroupName The name of the resource group.
   * @param labAccountName The name of the lab Account.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    labAccountName: string,
    options?: LabAccountsGetOptionalParams
  ): Promise<LabAccountsGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, labAccountName, options: operationOptions },
      getOperationSpec
    ) as Promise<LabAccountsGetResponse>;
  }

  /**
   * Create or replace an existing Lab Account.
   * @param resourceGroupName The name of the resource group.
   * @param labAccountName The name of the lab Account.
   * @param labAccount Represents a lab account.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    labAccountName: string,
    labAccount: LabAccount,
    options?: coreHttp.OperationOptions
  ): Promise<LabAccountsCreateOrUpdateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        labAccountName,
        labAccount,
        options: operationOptions
      },
      createOrUpdateOperationSpec
    ) as Promise<LabAccountsCreateOrUpdateResponse>;
  }

  /**
   * Delete lab account. This operation can take a while to complete
   * @param resourceGroupName The name of the resource group.
   * @param labAccountName The name of the lab Account.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    labAccountName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      labAccountName,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        coreHttp.RestResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      deleteOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: deleteOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Modify properties of lab accounts.
   * @param resourceGroupName The name of the resource group.
   * @param labAccountName The name of the lab Account.
   * @param labAccount Represents a lab account.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    labAccountName: string,
    labAccount: LabAccountFragment,
    options?: coreHttp.OperationOptions
  ): Promise<LabAccountsUpdateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        labAccountName,
        labAccount,
        options: operationOptions
      },
      updateOperationSpec
    ) as Promise<LabAccountsUpdateResponse>;
  }

  /**
   * Create a lab in a lab account.
   * @param resourceGroupName The name of the resource group.
   * @param labAccountName The name of the lab Account.
   * @param createLabProperties Properties for creating a managed lab and a default environment setting
   * @param options The options parameters.
   */
  createLab(
    resourceGroupName: string,
    labAccountName: string,
    createLabProperties: CreateLabProperties,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        labAccountName,
        createLabProperties,
        options: operationOptions
      },
      createLabOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get regional availability information for each size category configured under a lab account
   * @param resourceGroupName The name of the resource group.
   * @param labAccountName The name of the lab Account.
   * @param options The options parameters.
   */
  getRegionalAvailability(
    resourceGroupName: string,
    labAccountName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LabAccountsGetRegionalAvailabilityResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, labAccountName, options: operationOptions },
      getRegionalAvailabilityOperationSpec
    ) as Promise<LabAccountsGetRegionalAvailabilityResponse>;
  }

  /**
   * ListBySubscriptionNext
   * @param nextLink The nextLink from the previous successful call to the ListBySubscription method.
   * @param options The options parameters.
   */
  listBySubscriptionNext(
    nextLink: string,
    options?: LabAccountsListBySubscriptionNextOptionalParams
  ): Promise<LabAccountsListBySubscriptionNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { nextLink, options: operationOptions },
      listBySubscriptionNextOperationSpec
    ) as Promise<LabAccountsListBySubscriptionNextResponse>;
  }

  /**
   * ListByResourceGroupNext
   * @param resourceGroupName The name of the resource group.
   * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
   * @param options The options parameters.
   */
  listByResourceGroupNext(
    resourceGroupName: string,
    nextLink: string,
    options?: LabAccountsListByResourceGroupNextOptionalParams
  ): Promise<LabAccountsListByResourceGroupNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, nextLink, options: operationOptions },
      listByResourceGroupNextOperationSpec
    ) as Promise<LabAccountsListByResourceGroupNextResponse>;
  }

  private getOperationOptions<TOptions extends coreHttp.OperationOptions>(
    options: TOptions | undefined,
    finalStateVia?: string
  ): coreHttp.RequestOptionsBase {
    const operationOptions: coreHttp.OperationOptions = options || {};
    operationOptions.requestOptions = {
      ...operationOptions.requestOptions,
      shouldDeserialize: shouldDeserializeLRO(finalStateVia)
    };
    return coreHttp.operationOptionsToRequestOptionsBase(operationOptions);
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listBySubscriptionOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.LabServices/labaccounts",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ResponseWithContinuationLabAccount
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.expand1,
    Parameters.filter,
    Parameters.top,
    Parameters.orderby
  ],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  serializer
};
const listByResourceGroupOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labaccounts",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ResponseWithContinuationLabAccount
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.expand1,
    Parameters.filter,
    Parameters.top,
    Parameters.orderby
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labaccounts/{labAccountName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.LabAccount
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.expand1],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.labAccountName
  ],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labaccounts/{labAccountName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.LabAccount
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.labAccount,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.labAccountName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labaccounts/{labAccountName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.labAccountName
  ],
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labaccounts/{labAccountName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.LabAccount
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.labAccount1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.labAccountName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const createLabOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labaccounts/{labAccountName}/createLab",
  httpMethod: "POST",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.createLabProperties,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.labAccountName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const getRegionalAvailabilityOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labaccounts/{labAccountName}/getRegionalAvailability",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.GetRegionalAvailabilityResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.labAccountName
  ],
  serializer
};
const listBySubscriptionNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ResponseWithContinuationLabAccount
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.expand1,
    Parameters.filter,
    Parameters.top,
    Parameters.orderby
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink1
  ],
  serializer
};
const listByResourceGroupNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ResponseWithContinuationLabAccount
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.expand1,
    Parameters.filter,
    Parameters.top,
    Parameters.orderby
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.nextLink2
  ],
  serializer
};
