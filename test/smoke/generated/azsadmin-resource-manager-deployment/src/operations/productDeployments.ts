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
import { DeploymentAdminClient } from "../deploymentAdminClient";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  ProductDeploymentsListResponse,
  ProductDeploymentsGetResponse,
  BootStrapActionParameters,
  DeployActionParameters,
  UnlockActionParameters,
  ProductDeploymentsListNextResponse
} from "../models";

/**
 * Class representing a ProductDeployments.
 */
export class ProductDeployments {
  private readonly client: DeploymentAdminClient;

  /**
   * Initialize a new instance of the class ProductDeployments class.
   * @param client Reference to the service client
   */
  constructor(client: DeploymentAdminClient) {
    this.client = client;
  }

  /**
   * Invokes bootstrap action on the product deployment
   * @param options The options parameters.
   */
  list(
    options?: coreHttp.OperationOptions
  ): Promise<ProductDeploymentsListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      listOperationSpec
    ) as Promise<ProductDeploymentsListResponse>;
  }

  /**
   * Invokes bootstrap action on the product deployment
   * @param productId The product identifier.
   * @param options The options parameters.
   */
  get(
    productId: string,
    options?: coreHttp.OperationOptions
  ): Promise<ProductDeploymentsGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { productId, options: operationOptions },
      getOperationSpec
    ) as Promise<ProductDeploymentsGetResponse>;
  }

  /**
   * Invokes bootstrap action on the product deployment
   * @param productId The product identifier.
   * @param bootstrapActionParameter Represents bootstrap action parameter
   * @param options The options parameters.
   */
  async bootStrap(
    productId: string,
    bootstrapActionParameter: BootStrapActionParameters,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      productId,
      bootstrapActionParameter,
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
      bootStrapOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: bootStrapOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Invokes deploy action on the product
   * @param productId The product identifier.
   * @param deployActionParameter Represents bootstrap action parameter
   * @param options The options parameters.
   */
  async deploy(
    productId: string,
    deployActionParameter: DeployActionParameters,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      productId,
      deployActionParameter,
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
      deployOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: deployOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Invokes remove action on the product deployment
   * @param productId The product identifier.
   * @param options The options parameters.
   */
  async remove(
    productId: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      productId,
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
      removeOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: removeOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Invokes rotate secrets action on the product deployment
   * @param productId The product identifier.
   * @param options The options parameters.
   */
  async rotateSecrets(
    productId: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      productId,
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
      rotateSecretsOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: rotateSecretsOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Unlocks the product subscription
   * @param productId The product identifier.
   * @param unlockActionParameter Represents bootstrap action parameter
   * @param options The options parameters.
   */
  unlock(
    productId: string,
    unlockActionParameter: UnlockActionParameters,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { productId, unlockActionParameter, options: operationOptions },
      unlockOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * locks the product subscription
   * @param productId The product identifier.
   * @param options The options parameters.
   */
  lock(
    productId: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { productId, options: operationOptions },
      lockOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * ListNext
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  listNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<ProductDeploymentsListNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { nextLink, options: operationOptions },
      listNextOperationSpec
    ) as Promise<ProductDeploymentsListNextResponse>;
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
    "/subscriptions/{subscriptionId}/providers/Microsoft.Deployment.Admin/locations/global/productDeployments",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProductDeploymentsList
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Deployment.Admin/locations/global/productDeployments/{productId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProductDeploymentResourceEntity
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.productId
  ],
  serializer
};
const bootStrapOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Deployment.Admin/locations/global/productDeployments/{productId}/bootstrap",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  requestBody: Parameters.bootstrapActionParameter,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.productId
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const deployOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Deployment.Admin/locations/global/productDeployments/{productId}/deploy",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  requestBody: Parameters.deployActionParameter,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.productId
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const removeOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Deployment.Admin/locations/global/productDeployments/{productId}/remove",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.productId
  ],
  serializer
};
const rotateSecretsOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Deployment.Admin/locations/global/productDeployments/{productId}/rotateSecrets",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.productId
  ],
  serializer
};
const unlockOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Deployment.Admin/locations/global/productDeployments/{productId}/unlock",
  httpMethod: "POST",
  responses: { 200: {} },
  requestBody: Parameters.unlockActionParameter,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.productId
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const lockOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Deployment.Admin/locations/global/productDeployments/{productId}/lock",
  httpMethod: "POST",
  responses: { 200: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.productId
  ],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProductDeploymentsList
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.subscriptionId
  ],
  serializer
};
