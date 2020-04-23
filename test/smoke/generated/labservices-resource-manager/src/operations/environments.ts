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
  EnvironmentsListOptionalParams,
  EnvironmentsListResponse,
  EnvironmentsGetOptionalParams,
  EnvironmentsGetResponse,
  Environment,
  EnvironmentsCreateOrUpdateResponse,
  EnvironmentFragment,
  EnvironmentsUpdateResponse,
  ResetPasswordPayload,
  EnvironmentsListNextOptionalParams,
  EnvironmentsListNextResponse
} from "../models";

/**
 * Class representing a Environments.
 */
export class Environments {
  private readonly client: ManagedLabsClient;

  /**
   * Initialize a new instance of the class Environments class.
   * @param client Reference to the service client
   */
  constructor(client: ManagedLabsClient) {
    this.client = client;
  }

  /**
   * List environments in a given environment setting.
   * @param resourceGroupName The name of the resource group.
   * @param labAccountName The name of the lab Account.
   * @param labName The name of the lab.
   * @param environmentSettingName The name of the environment Setting.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    labAccountName: string,
    labName: string,
    environmentSettingName: string,
    options?: EnvironmentsListOptionalParams
  ): Promise<EnvironmentsListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        labAccountName,
        labName,
        environmentSettingName,
        options: operationOptions
      },
      listOperationSpec
    ) as Promise<EnvironmentsListResponse>;
  }

  /**
   * Get environment
   * @param resourceGroupName The name of the resource group.
   * @param labAccountName The name of the lab Account.
   * @param labName The name of the lab.
   * @param environmentSettingName The name of the environment Setting.
   * @param environmentName The name of the environment.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    labAccountName: string,
    labName: string,
    environmentSettingName: string,
    environmentName: string,
    options?: EnvironmentsGetOptionalParams
  ): Promise<EnvironmentsGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        labAccountName,
        labName,
        environmentSettingName,
        environmentName,
        options: operationOptions
      },
      getOperationSpec
    ) as Promise<EnvironmentsGetResponse>;
  }

  /**
   * Create or replace an existing Environment.
   * @param resourceGroupName The name of the resource group.
   * @param labAccountName The name of the lab Account.
   * @param labName The name of the lab.
   * @param environmentSettingName The name of the environment Setting.
   * @param environmentName The name of the environment.
   * @param environment Represents an environment instance
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    labAccountName: string,
    labName: string,
    environmentSettingName: string,
    environmentName: string,
    environment: Environment,
    options?: coreHttp.OperationOptions
  ): Promise<EnvironmentsCreateOrUpdateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        labAccountName,
        labName,
        environmentSettingName,
        environmentName,
        environment,
        options: operationOptions
      },
      createOrUpdateOperationSpec
    ) as Promise<EnvironmentsCreateOrUpdateResponse>;
  }

  /**
   * Delete environment. This operation can take a while to complete
   * @param resourceGroupName The name of the resource group.
   * @param labAccountName The name of the lab Account.
   * @param labName The name of the lab.
   * @param environmentSettingName The name of the environment Setting.
   * @param environmentName The name of the environment.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    labAccountName: string,
    labName: string,
    environmentSettingName: string,
    environmentName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      labAccountName,
      labName,
      environmentSettingName,
      environmentName,
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
   * Modify properties of environments.
   * @param resourceGroupName The name of the resource group.
   * @param labAccountName The name of the lab Account.
   * @param labName The name of the lab.
   * @param environmentSettingName The name of the environment Setting.
   * @param environmentName The name of the environment.
   * @param environment Represents an environment instance
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    labAccountName: string,
    labName: string,
    environmentSettingName: string,
    environmentName: string,
    environment: EnvironmentFragment,
    options?: coreHttp.OperationOptions
  ): Promise<EnvironmentsUpdateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        labAccountName,
        labName,
        environmentSettingName,
        environmentName,
        environment,
        options: operationOptions
      },
      updateOperationSpec
    ) as Promise<EnvironmentsUpdateResponse>;
  }

  /**
   * Claims the environment and assigns it to the user
   * @param resourceGroupName The name of the resource group.
   * @param labAccountName The name of the lab Account.
   * @param labName The name of the lab.
   * @param environmentSettingName The name of the environment Setting.
   * @param environmentName The name of the environment.
   * @param options The options parameters.
   */
  claim(
    resourceGroupName: string,
    labAccountName: string,
    labName: string,
    environmentSettingName: string,
    environmentName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        labAccountName,
        labName,
        environmentSettingName,
        environmentName,
        options: operationOptions
      },
      claimOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Resets the user password on an environment This operation can take a while to complete
   * @param resetPasswordPayload Represents the payload for resetting passwords.
   * @param resourceGroupName The name of the resource group.
   * @param labAccountName The name of the lab Account.
   * @param labName The name of the lab.
   * @param environmentSettingName The name of the environment Setting.
   * @param environmentName The name of the environment.
   * @param options The options parameters.
   */
  async resetPassword(
    resetPasswordPayload: ResetPasswordPayload,
    resourceGroupName: string,
    labAccountName: string,
    labName: string,
    environmentSettingName: string,
    environmentName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resetPasswordPayload,
      resourceGroupName,
      labAccountName,
      labName,
      environmentSettingName,
      environmentName,
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
      resetPasswordOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: resetPasswordOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Starts an environment by starting all resources inside the environment. This operation can take a
   * while to complete
   * @param resourceGroupName The name of the resource group.
   * @param labAccountName The name of the lab Account.
   * @param labName The name of the lab.
   * @param environmentSettingName The name of the environment Setting.
   * @param environmentName The name of the environment.
   * @param options The options parameters.
   */
  async start(
    resourceGroupName: string,
    labAccountName: string,
    labName: string,
    environmentSettingName: string,
    environmentName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      labAccountName,
      labName,
      environmentSettingName,
      environmentName,
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
      startOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: startOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Stops an environment by stopping all resources inside the environment This operation can take a
   * while to complete
   * @param resourceGroupName The name of the resource group.
   * @param labAccountName The name of the lab Account.
   * @param labName The name of the lab.
   * @param environmentSettingName The name of the environment Setting.
   * @param environmentName The name of the environment.
   * @param options The options parameters.
   */
  async stop(
    resourceGroupName: string,
    labAccountName: string,
    labName: string,
    environmentSettingName: string,
    environmentName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      labAccountName,
      labName,
      environmentSettingName,
      environmentName,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        coreHttp.RestResponse
      >;
    const initialOperationResult = await sendOperation(args, stopOperationSpec);

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: stopOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * ListNext
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param resourceGroupName The name of the resource group.
   * @param labAccountName The name of the lab Account.
   * @param labName The name of the lab.
   * @param environmentSettingName The name of the environment Setting.
   * @param options The options parameters.
   */
  listNext(
    nextLink: string,
    resourceGroupName: string,
    labAccountName: string,
    labName: string,
    environmentSettingName: string,
    options?: EnvironmentsListNextOptionalParams
  ): Promise<EnvironmentsListNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        nextLink,
        resourceGroupName,
        labAccountName,
        labName,
        environmentSettingName,
        options: operationOptions
      },
      listNextOperationSpec
    ) as Promise<EnvironmentsListNextResponse>;
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

const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labaccounts/{labAccountName}/labs/{labName}/environmentsettings/{environmentSettingName}/environments",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ResponseWithContinuationEnvironment
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.filter,
    Parameters.top,
    Parameters.orderby,
    Parameters.expand5
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.labAccountName,
    Parameters.labName,
    Parameters.environmentSettingName
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labaccounts/{labAccountName}/labs/{labName}/environmentsettings/{environmentSettingName}/environments/{environmentName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Environment
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.expand5],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.labAccountName,
    Parameters.labName,
    Parameters.environmentSettingName,
    Parameters.environmentName
  ],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labaccounts/{labAccountName}/labs/{labName}/environmentsettings/{environmentSettingName}/environments/{environmentName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.Environment
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.environment,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.labAccountName,
    Parameters.labName,
    Parameters.environmentSettingName,
    Parameters.environmentName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labaccounts/{labAccountName}/labs/{labName}/environmentsettings/{environmentSettingName}/environments/{environmentName}",
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
    Parameters.labAccountName,
    Parameters.labName,
    Parameters.environmentSettingName,
    Parameters.environmentName
  ],
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labaccounts/{labAccountName}/labs/{labName}/environmentsettings/{environmentSettingName}/environments/{environmentName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.Environment
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.environment1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.labAccountName,
    Parameters.labName,
    Parameters.environmentSettingName,
    Parameters.environmentName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const claimOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labaccounts/{labAccountName}/labs/{labName}/environmentsettings/{environmentSettingName}/environments/{environmentName}/claim",
  httpMethod: "POST",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.labAccountName,
    Parameters.labName,
    Parameters.environmentSettingName,
    Parameters.environmentName
  ],
  serializer
};
const resetPasswordOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labaccounts/{labAccountName}/labs/{labName}/environmentsettings/{environmentSettingName}/environments/{environmentName}/resetPassword",
  httpMethod: "POST",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.resetPasswordPayload,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.labAccountName,
    Parameters.labName,
    Parameters.environmentSettingName,
    Parameters.environmentName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const startOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labaccounts/{labAccountName}/labs/{labName}/environmentsettings/{environmentSettingName}/environments/{environmentName}/start",
  httpMethod: "POST",
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
    Parameters.labAccountName,
    Parameters.labName,
    Parameters.environmentSettingName,
    Parameters.environmentName
  ],
  serializer
};
const stopOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labaccounts/{labAccountName}/labs/{labName}/environmentsettings/{environmentSettingName}/environments/{environmentName}/stop",
  httpMethod: "POST",
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
    Parameters.labAccountName,
    Parameters.labName,
    Parameters.environmentSettingName,
    Parameters.environmentName
  ],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ResponseWithContinuationEnvironment
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.filter,
    Parameters.top,
    Parameters.orderby,
    Parameters.expand5
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.labAccountName,
    Parameters.labName,
    Parameters.environmentSettingName
  ],
  serializer
};
