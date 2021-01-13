/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

export interface Resource {
  /**
   * Fully qualified resource Id for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly id?: string;
  /**
   * The name of the resource
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly name?: string;
  /**
   * The type of the resource. Ex- Microsoft.Compute/virtualMachines or Microsoft.Storage/storageAccounts.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly type?: string;
}

/** An error response from the ManagedServiceIdentity service. */
export interface CloudError {
  /** A list of additional details about the error. */
  error?: CloudErrorBody;
}

/** An error response from the ManagedServiceIdentity service. */
export interface CloudErrorBody {
  /** An identifier for the error. */
  code?: string;
  /** A message describing the error, intended to be suitable for display in a user interface. */
  message?: string;
  /** The target of the particular error. For example, the name of the property in error. */
  target?: string;
  /** A list of additional details about the error. */
  details?: CloudErrorBody[];
}

/** A list of operations supported by Microsoft.ManagedIdentity Resource Provider. */
export interface OperationListResult {
  /** A list of operations supported by Microsoft.ManagedIdentity Resource Provider. */
  value?: Operation[];
  /** The url to get the next page of results, if any. */
  nextLink?: string;
}

/** Operation supported by the Microsoft.ManagedIdentity REST API. */
export interface Operation {
  /** The name of the REST Operation. This is of the format {provider}/{resource}/{operation}. */
  name?: string;
  /** The object that describes the operation. */
  display?: OperationDisplay;
}

/** The object that describes the operation. */
export interface OperationDisplay {
  /** Friendly name of the resource provider. */
  provider?: string;
  /** The type of operation. For example: read, write, delete. */
  operation?: string;
  /** The resource type on which the operation is performed. */
  resource?: string;
  /** A description of the operation. */
  description?: string;
}

/** Values returned by the List operation. */
export interface UserAssignedIdentitiesListResult {
  /** The collection of userAssignedIdentities returned by the listing operation. */
  value?: Identity[];
  /** The url to get the next page of results, if any. */
  nextLink?: string;
}

/** The resource model definition for a ARM proxy resource. It will have everything other than required location and tags */
export type ProxyResource = Resource & {};

/** The resource model definition for a ARM tracked top level resource */
export type TrackedResource = Resource & {
  /** Resource tags. */
  tags?: { [propertyName: string]: string };
  /** The geo-location where the resource lives */
  location: string;
};

/** Describes an identity resource. */
export type IdentityUpdate = Resource & {
  /** The geo-location where the resource lives */
  location?: string;
  /** Resource tags */
  tags?: { [propertyName: string]: string };
  /**
   * The id of the tenant which the identity belongs to.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly tenantId?: string;
  /**
   * The id of the service principal object associated with the created identity.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly principalId?: string;
  /**
   * The id of the app associated with the identity. This is a random generated UUID by MSI.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly clientId?: string;
};

/** Describes a system assigned identity resource. */
export type SystemAssignedIdentity = ProxyResource & {
  /** The geo-location where the resource lives */
  location: string;
  /** Resource tags */
  tags?: { [propertyName: string]: string };
  /**
   * The id of the tenant which the identity belongs to.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly tenantId?: string;
  /**
   * The id of the service principal object associated with the created identity.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly principalId?: string;
  /**
   * The id of the app associated with the identity. This is a random generated UUID by MSI.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly clientId?: string;
  /**
   *  The ManagedServiceIdentity DataPlane URL that can be queried to obtain the identity credentials.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly clientSecretUrl?: string;
};

/** Describes an identity resource. */
export type Identity = TrackedResource & {
  /**
   * The id of the tenant which the identity belongs to.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly tenantId?: string;
  /**
   * The id of the service principal object associated with the created identity.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly principalId?: string;
  /**
   * The id of the app associated with the identity. This is a random generated UUID by MSI.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly clientId?: string;
};

/** Contains response data for the getByScope operation. */
export type SystemAssignedIdentitiesGetByScopeResponse = SystemAssignedIdentity & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: SystemAssignedIdentity;
  };
};

/** Contains response data for the list operation. */
export type OperationsListResponse = OperationListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: OperationListResult;
  };
};

/** Contains response data for the listNext operation. */
export type OperationsListNextResponse = OperationListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: OperationListResult;
  };
};

/** Contains response data for the listBySubscription operation. */
export type UserAssignedIdentitiesListBySubscriptionResponse = UserAssignedIdentitiesListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: UserAssignedIdentitiesListResult;
  };
};

/** Contains response data for the listByResourceGroup operation. */
export type UserAssignedIdentitiesListByResourceGroupResponse = UserAssignedIdentitiesListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: UserAssignedIdentitiesListResult;
  };
};

/** Contains response data for the createOrUpdate operation. */
export type UserAssignedIdentitiesCreateOrUpdateResponse = Identity & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: Identity;
  };
};

/** Contains response data for the update operation. */
export type UserAssignedIdentitiesUpdateResponse = Identity & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: Identity;
  };
};

/** Contains response data for the get operation. */
export type UserAssignedIdentitiesGetResponse = Identity & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: Identity;
  };
};

/** Contains response data for the listBySubscriptionNext operation. */
export type UserAssignedIdentitiesListBySubscriptionNextResponse = UserAssignedIdentitiesListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: UserAssignedIdentitiesListResult;
  };
};

/** Contains response data for the listByResourceGroupNext operation. */
export type UserAssignedIdentitiesListByResourceGroupNextResponse = UserAssignedIdentitiesListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: UserAssignedIdentitiesListResult;
  };
};

/** Optional parameters. */
export interface ManagedServiceIdentityClientOptionalParams
  extends coreHttp.ServiceClientOptions {
  /** server parameter */
  $host?: string;
  /** Api Version */
  apiVersion?: string;
  /** Overrides client endpoint. */
  endpoint?: string;
}
