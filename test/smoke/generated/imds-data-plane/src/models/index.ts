/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

/**
 * This is the response from the Instance_GetMetadata operation.
 */
export interface Instance {
  /**
   * Compute Metadata
   */
  compute?: Compute;
  /**
   * Network Metadata
   */
  network?: Network;
}

/**
 * Compute Metadata
 */
export interface Compute {
  /**
   * This is the name of the environment in which the VM is running.
   */
  azEnvironment?: string;
  /**
   * This is the base64 encoded custom data for the running VM.
   */
  customData?: string;
  /**
   * This is the Azure Region in which the VM is running.
   */
  location?: string;
  /**
   * This is the name of the VM.
   */
  name?: string;
  /**
   * This is the offer information for the VM image. This value is only present for images deployed from the Azure Image Gallery.
   */
  offer?: string;
  /**
   * This value indicates the type of OS the VM is running, either Linux or Windows.
   */
  osType?: string;
  /**
   * This is the placement group of your Virtual Machine Scale Set.
   */
  placementGroupId?: string;
  /**
   * This contains the data about the plan.
   */
  plan?: PlanProperties;
  /**
   * This is information about the SSH certificate
   */
  publicKeys?: PublicKeysProperties[];
  /**
   * This is the fault domain in which the VM.
   */
  platformFaultDomain?: string;
  /**
   * This is the update domain in which the VM.
   */
  platformUpdateDomain?: string;
  /**
   * This is the provider of the VM.
   */
  provider?: string;
  /**
   * This is the publisher of the VM image.
   */
  publisher?: string;
  /**
   * This is the resource group for the VM.
   */
  resourceGroupName?: string;
  /**
   * This is the specific SKU for the VM image.
   */
  sku?: string;
  /**
   * This is the Azure subscription for the VM.
   */
  subscriptionId?: string;
  /**
   * This is the list of tags for your VM.
   */
  tags?: string;
  /**
   * This is the version of the VM image.
   */
  version?: string;
  /**
   * This is the unique identifier for the VM.
   */
  vmId?: string;
  /**
   * This is the resource name of the VMSS.
   */
  vmScaleSetName?: string;
  /**
   * This is the size of the VM.
   */
  vmSize?: string;
  /**
   * This is the availability zone of the VM.
   */
  zone?: string;
}

/**
 * This contains the data about the plan.
 */
export interface PlanProperties {
  /**
   * This is the Plan ID.
   */
  name?: string;
  /**
   * This is the publisher ID.
   */
  publisher?: string;
  /**
   * This is the product of the image from the Marketplace.
   */
  product?: string;
}

/**
 * This contains the data about the public key.
 */
export interface PublicKeysProperties {
  /**
   * This specifies the full path on the VM where the SSH public key is stored.
   */
  path?: string;
  /**
   * This is the SSH public key certificate used to authenticate with the VM.
   */
  keyData?: string;
}

/**
 * Network Metadata
 */
export interface Network {
  /**
   * This contains data about the network interface.
   */
  interface?: NetworkInterface[];
}

/**
 * This contains data about the network interface.
 */
export interface NetworkInterface {
  /**
   * This contains the IPv4 address.
   */
  ipv4?: NetworkInterfaceIpv4;
  /**
   * This contains the IPv6 address.
   */
  ipv6?: NetworkInterfaceIpv6;
  /**
   * This is the MAC address of the interface.
   */
  macAddress?: string;
}

/**
 * This contains the IPv4 address.
 */
export interface NetworkInterfaceIpv4 {
  /**
   * This is the IP address
   */
  ipAddress?: Ipv4Properties[];
  /**
   * This is the subnet
   */
  subnet?: SubnetProperties[];
}

/**
 * This contains the IPv4 properties.
 */
export interface Ipv4Properties {
  /**
   * This is the private IP address assigned to the interface.
   */
  privateIpAddress?: string;
  /**
   * This is the public IP address assigned to the interface.
   */
  publicIpAddress?: string;
}

/**
 * This contains the properties of the subnet.
 */
export interface SubnetProperties {
  /**
   * This is the address range of the subnet.
   */
  address?: string;
  /**
   * This is the prefix of the subnet.
   */
  prefix?: string;
}

/**
 * This contains the IPv6 address.
 */
export interface NetworkInterfaceIpv6 {
  /**
   * This is the IP address
   */
  ipAddress?: Ipv6Properties[];
}

/**
 * This contains the IPv6 properties.
 */
export interface Ipv6Properties {
  /**
   * This is the private IPv6 address assigned to the interface.
   */
  privateIpAddress?: string;
}

/**
 * This is the response from an operation in the case an error occurs.
 */
export interface ErrorResponse {
  /**
   * Error message indicating why the operation failed.
   */
  error?: string;
}

/**
 * This is the response from the Attested_GetDocument operation.
 */
export interface AttestedData {
  /**
   * This is the encoded string containing the VM ID, plan information, public key, timestamp, and nonce value.
   */
  signature?: string;
  /**
   * This is the encoding scheme of the signature.
   */
  encoding?: string;
}

/**
 * This is the response from the Identity_GetToken operation.
 */
export interface IdentityTokenResponse {
  /**
   * This is the requested access token. The app can use this token to authenticate to the sink resource.
   */
  accessToken?: string;
  /**
   * This is how long the access token is valid (in seconds).
   */
  expiresIn?: string;
  /**
   * This is the time when the access token expires. The date is represented as the number of seconds from 1970-01-01T0:0:0Z UTC until the expiration time. This value is used to determine the lifetime of cached tokens.
   */
  expiresOn?: string;
  /**
   * This indicates the extended lifetime of the token (in seconds).
   */
  extExpiresIn?: string;
  /**
   * This is the time when the access token becomes effective. The date is represented as the number of seconds from 1970-01-01T0:0:0Z UTC until the expiration time.
   */
  notBefore?: string;
  /**
   * This is the app ID URI of the sink resource.
   */
  resource?: string;
  /**
   * This indicates the token type value.
   */
  tokenType?: string;
  /**
   * This is the client_id specified in the request, if any.
   */
  clientId?: string;
  /**
   * This is the object_id specified in the request, if any.
   */
  objectId?: string;
  /**
   * This is the msi_res_id specified in the request, if any.
   */
  msiResId?: string;
}

/**
 * This is the response from an Identity operation in the case an error occurs.
 */
export interface IdentityErrorResponse {
  /**
   * Error code
   */
  error?: Error;
  /**
   * Error message indicating why the operation failed.
   */
  errorDescription?: string;
}

/**
 * This is the response from the Identity_GetInfo operation.
 */
export interface IdentityInfoResponse {
  /**
   * This is the AAD tenantId of the identity of the caller.
   */
  tenantId?: string;
}

/**
 * Defines values for Error.
 */
export type ErrorModel =
  | "invalid_request"
  | "unauthorized_client"
  | "access_denied"
  | "unsupported_response_type"
  | "invalid_scope"
  | "server_error"
  | "service_unavailable"
  | "bad_request"
  | "forbidden"
  | "not_found"
  | "method_not_allowed"
  | "too_many_requests";

/**
 * Contains response data for the getMetadata operation.
 */
export type InstancesGetMetadataResponse = Instance & {
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
    parsedBody: Instance;
  };
};

/**
 * Optional parameters.
 */
export interface AttestedGetDocumentOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * This is a string of up to 32 random alphanumeric characters.
   */
  nonce?: string;
}

/**
 * Contains response data for the getDocument operation.
 */
export type AttestedGetDocumentResponse = AttestedData & {
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
    parsedBody: AttestedData;
  };
};

/**
 * Optional parameters.
 */
export interface IdentityGetTokenOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * This identifies, by Azure AD client id, a specific explicit identity to use when authenticating to Azure AD. Mutually exclusive with object_id and msi_res_id.
   */
  clientId?: string;
  /**
   * This identifies, by Azure AD object id, a specific explicit identity to use when authenticating to Azure AD. Mutually exclusive with client_id and msi_res_id.
   */
  objectId?: string;
  /**
   * This identifies, by urlencoded ARM resource id, a specific explicit identity to use when authenticating to Azure AD. Mutually exclusive with client_id and object_id.
   */
  msiResId?: string;
  /**
   * This indicates the authority to request AAD tokens from. Defaults to the known authority of the identity to be used.
   */
  authority?: string;
}

/**
 * Contains response data for the getToken operation.
 */
export type IdentityGetTokenResponse = IdentityTokenResponse & {
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
    parsedBody: IdentityTokenResponse;
  };
};

/**
 * Contains response data for the getInfo operation.
 */
export type IdentityGetInfoResponse = IdentityInfoResponse & {
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
    parsedBody: IdentityInfoResponse;
  };
};

/**
 * Optional parameters.
 */
export interface InstanceMetadataClientOptionalParams
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
