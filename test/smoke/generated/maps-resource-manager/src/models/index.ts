/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

/**
 * Parameters used to create a new Maps Account.
 */
export interface MapsAccountCreateParameters {
  /**
   * The location of the resource.
   */
  location: string;
  /**
   * Gets or sets a list of key value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). Each tag must have a key no greater than 128 characters and value no greater than 256 characters.
   */
  tags?: { [propertyName: string]: string };
  /**
   * The SKU of this account.
   */
  sku: Sku;
}

/**
 * The SKU of the Maps Account.
 */
export interface Sku {
  /**
   * The name of the SKU, in standard format (such as S0).
   */
  name: string;
  /**
   * Gets the sku tier. This is based on the SKU name.
   */
  readonly tier?: string;
}

export interface Resource {
  /**
   * Fully qualified resource Id for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}
   */
  readonly id?: string;
  /**
   * The name of the resource
   */
  readonly name?: string;
  /**
   * The type of the resource. Ex- Microsoft.Compute/virtualMachines or Microsoft.Storage/storageAccounts.
   */
  readonly type?: string;
}

/**
 * The resource model definition for a ARM tracked top level resource
 */
export type TrackedResource = Resource & {
  /**
   * Resource tags.
   */
  tags?: { [propertyName: string]: string };
  /**
   * The geo-location where the resource lives
   */
  location: string;
};

/**
 * An Azure resource which represents access to a suite of Maps REST APIs.
 */
export type MapsAccount = TrackedResource & {
  /**
   * The SKU of this account.
   */
  readonly sku?: Sku;
  /**
   * The system meta data relating to this resource.
   */
  readonly systemData?: SystemData;
  /**
   * The map account properties.
   */
  readonly properties?: MapsAccountProperties;
};

/**
 * Metadata pertaining to creation and last modification of the resource.
 */
export interface SystemData {
  /**
   * The identity that created the resource.
   */
  createdBy?: string;
  /**
   * The type of identity that created the resource.
   */
  createdByType?: CreatedByType;
  /**
   * The timestamp of resource creation (UTC).
   */
  createdAt?: Date;
  /**
   * The identity that last modified the resource.
   */
  lastModifiedBy?: string;
  /**
   * The type of identity that last modified the resource.
   */
  lastModifiedByType?: CreatedByType;
  /**
   * The type of identity that last modified the resource.
   */
  lastModifiedAt?: Date;
}

/**
 * Additional Map account properties
 */
export interface MapsAccountProperties {
  /**
   * A unique identifier for the maps account
   */
  xMsClientId?: string;
}

/**
 * The resource management error response.
 */
export interface ErrorResponse {
  /**
   * The error code.
   */
  readonly code?: string;
  /**
   * The error message.
   */
  readonly message?: string;
  /**
   * The error target.
   */
  readonly target?: string;
  /**
   * The error details.
   */
  readonly details?: ErrorResponse[];
  /**
   * The error additional info.
   */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

/**
 * The resource management error additional info.
 */
export interface ErrorAdditionalInfo {
  /**
   * The additional info type.
   */
  readonly type?: string;
  /**
   * The additional info.
   */
  readonly info?: any;
}

/**
 * Parameters used to update an existing Maps Account.
 */
export interface MapsAccountUpdateParameters {
  /**
   * Gets or sets a list of key value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters.
   */
  tags?: { [propertyName: string]: string };
  /**
   * The SKU of this account.
   */
  sku?: Sku;
}

/**
 * A list of Maps Accounts.
 */
export interface MapsAccounts {
  /**
   * a Maps Account.
   */
  readonly value?: MapsAccount[];
}

/**
 * The set of keys which can be used to access the Maps REST APIs. Two keys are provided for key rotation without interruption.
 */
export interface MapsAccountKeys {
  /**
   * The full Azure resource identifier of the Maps Account.
   */
  readonly id?: string;
  /**
   * The primary key for accessing the Maps REST APIs.
   */
  readonly primaryKey?: string;
  /**
   * The secondary key for accessing the Maps REST APIs.
   */
  readonly secondaryKey?: string;
}

/**
 * Whether the operation refers to the primary or secondary key.
 */
export interface MapsKeySpecification {
  /**
   * Whether the operation refers to the primary or secondary key.
   */
  keyType: KeyType;
}

/**
 * The set of operations available for Maps.
 */
export interface MapsOperations {
  /**
   * An operation available for Maps.
   */
  readonly value?: MapsOperationsValueItem[];
}

export interface MapsOperationsValueItem {
  /**
   * Operation name: {provider}/{resource}/{operation}.
   */
  readonly name?: string;
  /**
   * The human-readable description of the operation.
   */
  display?: MapsOperationsValueItemDisplay;
  /**
   * The origin of the operation.
   */
  readonly origin?: string;
}

/**
 * The human-readable description of the operation.
 */
export interface MapsOperationsValueItemDisplay {
  /**
   * Service provider: Microsoft Maps.
   */
  readonly provider?: string;
  /**
   * Resource on which the operation is performed.
   */
  readonly resource?: string;
  /**
   * The action that users can perform, based on their permission level.
   */
  readonly operation?: string;
  /**
   * The description of the operation.
   */
  readonly description?: string;
}

/**
 * Parameters used to create a new Private Atlas resource.
 */
export interface PrivateAtlasCreateParameters {
  /**
   * The location of the resource.
   */
  location: string;
  /**
   * Gets or sets a list of key value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters.
   */
  tags?: { [propertyName: string]: string };
}

/**
 * An Azure resource which represents which will provision the ability to create private location data.
 */
export type PrivateAtlas = TrackedResource & {
  /**
   * The Private Atlas resource properties.
   */
  properties?: PrivateAtlasProperties;
};

/**
 * Private Atlas resource properties
 */
export interface PrivateAtlasProperties {
  /**
   * The state of the resource provisioning, terminal states: Succeeded, Failed, Canceled
   */
  provisioningState?: string;
}

/**
 * Parameters used to update an existing Private Atlas resource.
 */
export interface PrivateAtlasUpdateParameters {
  /**
   * Gets or sets a list of key value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters.
   */
  tags?: { [propertyName: string]: string };
}

/**
 * A list of Private Atlas resources.
 */
export interface PrivateAtlasList {
  /**
   * a Private Atlas.
   */
  readonly value?: PrivateAtlas[];
}

/**
 * Defines values for CreatedByType.
 */
export type CreatedByType = "User" | "Application" | "ManagedIdentity" | "Key";
/**
 * Defines values for KeyType.
 */
export type KeyType = "primary" | "secondary";

/**
 * Contains response data for the createOrUpdate operation.
 */
export type AccountsCreateOrUpdateResponse = MapsAccount & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: MapsAccount;
  };
};

/**
 * Contains response data for the update operation.
 */
export type AccountsUpdateResponse = MapsAccount & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: MapsAccount;
  };
};

/**
 * Contains response data for the get operation.
 */
export type AccountsGetResponse = MapsAccount & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: MapsAccount;
  };
};

/**
 * Contains response data for the listByResourceGroup operation.
 */
export type AccountsListByResourceGroupResponse = MapsAccounts & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: MapsAccounts;
  };
};

/**
 * Contains response data for the listBySubscription operation.
 */
export type AccountsListBySubscriptionResponse = MapsAccounts & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: MapsAccounts;
  };
};

/**
 * Contains response data for the listKeys operation.
 */
export type AccountsListKeysResponse = MapsAccountKeys & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: MapsAccountKeys;
  };
};

/**
 * Contains response data for the regenerateKeys operation.
 */
export type AccountsRegenerateKeysResponse = MapsAccountKeys & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: MapsAccountKeys;
  };
};

/**
 * Contains response data for the listOperations operation.
 */
export type MapsListOperationsResponse = MapsOperations & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: MapsOperations;
  };
};

/**
 * Contains response data for the createOrUpdate operation.
 */
export type PrivateAtlasesCreateOrUpdateResponse = PrivateAtlas & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: PrivateAtlas;
  };
};

/**
 * Contains response data for the update operation.
 */
export type PrivateAtlasesUpdateResponse = PrivateAtlas & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: PrivateAtlas;
  };
};

/**
 * Contains response data for the get operation.
 */
export type PrivateAtlasesGetResponse = PrivateAtlas & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: PrivateAtlas;
  };
};

/**
 * Contains response data for the listByAccount operation.
 */
export type PrivateAtlasesListByAccountResponse = PrivateAtlasList & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: PrivateAtlasList;
  };
};

/**
 * Optional parameters.
 */
export interface AzureMapsResourceProviderOptionalParams
  extends coreHttp.ServiceClientOptions {
  /**
   * server parameter
   */
  $host?: string;
  /**
   * Api Version
   */
  apiVersion?: string;
  /**
   * Overrides client endpoint.
   */
  endpoint?: string;
}
