/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  StaticSiteCustomDomainRequestPropertiesARMResource,
  WebSiteManagementClient
} from "@msinternal/web-resource-manager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Description for Validates a particular custom domain can be added to a static site.
 *
 * @summary Description for Validates a particular custom domain can be added to a static site.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2021-02-01/examples/ValidateStaticSiteCustomDomain.json
 */
async function validateACustomDomainForAStaticSite() {
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = "rg";
  const name = "testStaticSite0";
  const domainName = "custom.domain.net";
  const staticSiteCustomDomainRequestPropertiesEnvelope: StaticSiteCustomDomainRequestPropertiesARMResource = {};
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.beginValidateCustomDomainCanBeAddedToStaticSiteAndWait(
    resourceGroupName,
    name,
    domainName,
    staticSiteCustomDomainRequestPropertiesEnvelope
  );
  console.log(result);
}

validateACustomDomainForAStaticSite().catch(console.error);
