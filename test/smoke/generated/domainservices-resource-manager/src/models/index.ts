/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

/**
 * The list of domain service operation response.
 */
export interface OperationEntityListResult {
  /**
   * The list of operations.
   */
  value?: OperationEntity[];
  /**
   * The continuation token for the next page of results.
   */
  readonly nextLink?: string;
}

/**
 * The operation supported by Domain Services.
 */
export interface OperationEntity {
  /**
   * Operation name: {provider}/{resource}/{operation}.
   */
  name?: string;
  /**
   * The operation supported by Domain Services.
   */
  display?: OperationDisplayInfo;
  /**
   * The origin of the operation.
   */
  origin?: string;
}

/**
 * The operation supported by Domain Services.
 */
export interface OperationDisplayInfo {
  /**
   * The description of the operation.
   */
  description?: string;
  /**
   * The action that users can perform, based on their permission level.
   */
  operation?: string;
  /**
   * Service provider: Domain Services.
   */
  provider?: string;
  /**
   * Resource on which the operation is performed.
   */
  resource?: string;
}

/**
 * The response from the List Domain Services operation.
 */
export interface DomainServiceListResult {
  /**
   * the list of domain services.
   */
  value?: DomainService[];
  /**
   * The continuation token for the next page of results.
   */
  readonly nextLink?: string;
}

/**
 * The Resource model definition.
 */
export interface Resource {
  /**
   * Resource Id
   */
  readonly id?: string;
  /**
   * Resource name
   */
  readonly name?: string;
  /**
   * Resource type
   */
  readonly type?: string;
  /**
   * Resource location
   */
  location?: string;
  /**
   * Resource tags
   */
  tags?: { [propertyName: string]: string };
  /**
   * Resource etag
   */
  etag?: string;
}

/**
 * Domain service.
 */
export type DomainService = Resource & {
  /**
   * Azure Active Directory tenant id
   */
  readonly tenantId?: string;
  /**
   * The name of the Azure domain that the user would like to deploy Domain Services to.
   */
  domainName?: string;
  /**
   * Virtual network site id
   */
  readonly vnetSiteId?: string;
  /**
   * The name of the virtual network that Domain Services will be deployed on. The id of the subnet that Domain Services will be deployed on. /virtualNetwork/vnetName/subnets/subnetName.
   */
  subnetId?: string;
  /**
   * Secure LDAP Settings
   */
  ldapsSettings?: LdapsSettings;
  /**
   * Last domain evaluation run DateTime
   */
  readonly healthLastEvaluated?: Date;
  /**
   * List of Domain Health Monitors
   */
  readonly healthMonitors?: HealthMonitor[];
  /**
   * List of Domain Health Alerts
   */
  readonly healthAlerts?: HealthAlert[];
  /**
   * Notification Settings
   */
  notificationSettings?: NotificationSettings;
  /**
   * DomainSecurity Settings
   */
  domainSecuritySettings?: DomainSecuritySettings;
  /**
   * Enabled or Disabled flag to turn on Group-based filtered sync
   */
  filteredSync?: FilteredSync;
  /**
   * List of Domain Controller IP Address
   */
  readonly domainControllerIpAddress?: string[];
  /**
   * Status of Domain Service instance
   */
  readonly serviceStatus?: string;
  /**
   * the current deployment or provisioning state, which only appears in the response.
   */
  readonly provisioningState?: string;
};

/**
 * Secure LDAP Settings
 */
export interface LdapsSettings {
  /**
   * A flag to determine whether or not Secure LDAP is enabled or disabled.
   */
  ldaps?: Ldaps;
  /**
   * The certificate required to configure Secure LDAP. The parameter passed here should be a base64encoded representation of the certificate pfx file.
   */
  pfxCertificate?: string;
  /**
   * The password to decrypt the provided Secure LDAP certificate pfx file.
   */
  pfxCertificatePassword?: string;
  /**
   * Public certificate used to configure secure ldap.
   */
  readonly publicCertificate?: string;
  /**
   * Thumbprint of configure ldaps certificate.
   */
  readonly certificateThumbprint?: string;
  /**
   * NotAfter DateTime of configure ldaps certificate.
   */
  readonly certificateNotAfter?: Date;
  /**
   * A flag to determine whether or not Secure LDAP access over the internet is enabled or disabled.
   */
  externalAccess?: ExternalAccess;
  /**
   * External access ip address.
   */
  readonly externalAccessIpAddress?: string;
}

/**
 * Health Monitor Description
 */
export interface HealthMonitor {
  /**
   * Health Monitor Id
   */
  readonly id?: string;
  /**
   * Health Monitor Name
   */
  readonly name?: string;
  /**
   * Health Monitor Details
   */
  readonly details?: string;
}

/**
 * Health Alert Description
 */
export interface HealthAlert {
  /**
   * Health Alert Id
   */
  readonly id?: string;
  /**
   * Health Alert Name
   */
  readonly name?: string;
  /**
   * Health Alert Issue
   */
  readonly issue?: string;
  /**
   * Health Alert Severity
   */
  readonly severity?: string;
  /**
   * Health Alert Raised DateTime
   */
  readonly raised?: Date;
  /**
   * Health Alert Last Detected DateTime
   */
  readonly lastDetected?: Date;
  /**
   * Health Alert TSG Link
   */
  readonly resolutionUri?: string;
}

/**
 * Settings for notification
 */
export interface NotificationSettings {
  /**
   * Should global admins be notified
   */
  notifyGlobalAdmins?: NotifyGlobalAdmins;
  /**
   * Should domain controller admins be notified
   */
  notifyDcAdmins?: NotifyDcAdmins;
  /**
   * The list of additional recipients
   */
  additionalRecipients?: string[];
}

/**
 * Domain Security Settings
 */
export interface DomainSecuritySettings {
  /**
   * A flag to determine whether or not NtlmV1 is enabled or disabled.
   */
  ntlmV1?: NtlmV1;
  /**
   * A flag to determine whether or not TlsV1 is enabled or disabled.
   */
  tlsV1?: TlsV1;
  /**
   * A flag to determine whether or not SyncNtlmPasswords is enabled or disabled.
   */
  syncNtlmPasswords?: SyncNtlmPasswords;
}

/**
 * Defines values for Ldaps.
 */
export type Ldaps = "Enabled" | "Disabled";
/**
 * Defines values for ExternalAccess.
 */
export type ExternalAccess = "Enabled" | "Disabled";
/**
 * Defines values for NotifyGlobalAdmins.
 */
export type NotifyGlobalAdmins = "Enabled" | "Disabled";
/**
 * Defines values for NotifyDcAdmins.
 */
export type NotifyDcAdmins = "Enabled" | "Disabled";
/**
 * Defines values for NtlmV1.
 */
export type NtlmV1 = "Enabled" | "Disabled";
/**
 * Defines values for TlsV1.
 */
export type TlsV1 = "Enabled" | "Disabled";
/**
 * Defines values for SyncNtlmPasswords.
 */
export type SyncNtlmPasswords = "Enabled" | "Disabled";
/**
 * Defines values for FilteredSync.
 */
export type FilteredSync = "Enabled" | "Disabled";

/**
 * Contains response data for the list operation.
 */
export type DomainServiceOperationsListResponse = OperationEntityListResult & {
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
    parsedBody: OperationEntityListResult;
  };
};

/**
 * Contains response data for the listNext operation.
 */
export type DomainServiceOperationsListNextResponse = OperationEntityListResult & {
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
    parsedBody: OperationEntityListResult;
  };
};

/**
 * Contains response data for the list operation.
 */
export type DomainServicesListResponse = DomainServiceListResult & {
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
    parsedBody: DomainServiceListResult;
  };
};

/**
 * Contains response data for the listByResourceGroup operation.
 */
export type DomainServicesListByResourceGroupResponse = DomainServiceListResult & {
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
    parsedBody: DomainServiceListResult;
  };
};

/**
 * Contains response data for the createOrUpdate operation.
 */
export type DomainServicesCreateOrUpdateResponse = DomainService & {
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
    parsedBody: DomainService;
  };
};

/**
 * Contains response data for the get operation.
 */
export type DomainServicesGetResponse = DomainService & {
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
    parsedBody: DomainService;
  };
};

/**
 * Contains response data for the update operation.
 */
export type DomainServicesUpdateResponse = DomainService & {
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
    parsedBody: DomainService;
  };
};

/**
 * Contains response data for the listNext operation.
 */
export type DomainServicesListNextResponse = DomainServiceListResult & {
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
    parsedBody: DomainServiceListResult;
  };
};

/**
 * Contains response data for the listByResourceGroupNext operation.
 */
export type DomainServicesListByResourceGroupNextResponse = DomainServiceListResult & {
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
    parsedBody: DomainServiceListResult;
  };
};

/**
 * Optional parameters.
 */
export interface DomainServicesResourceProviderOptionalParams
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
