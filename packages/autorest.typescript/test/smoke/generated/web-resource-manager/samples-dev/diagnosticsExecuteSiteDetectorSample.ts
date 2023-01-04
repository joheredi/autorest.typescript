/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { WebSiteManagementClient } from "@msinternal/web-resource-manager";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Description for Execute Detector
 *
 * @summary Description for Execute Detector
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2021-02-01/examples/Diagnostics_ExecuteSiteDetector.json
 */
async function executeSiteDetector() {
  const subscriptionId =
    process.env["SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["RESOURCE_GROUP"] || "Sample-WestUSResourceGroup";
  const siteName = "SampleApp";
  const detectorName = "sitecrashes";
  const diagnosticCategory = "availability";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.diagnostics.executeSiteDetector(
    resourceGroupName,
    siteName,
    detectorName,
    diagnosticCategory
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Description for Execute Detector
 *
 * @summary Description for Execute Detector
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2021-02-01/examples/Diagnostics_ExecuteSiteDetectorSlot.json
 */
async function executeSiteSlotDetector() {
  const subscriptionId =
    process.env["SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["RESOURCE_GROUP"] || "Sample-WestUSResourceGroup";
  const siteName = "SampleApp";
  const detectorName = "sitecrashes";
  const diagnosticCategory = "availability";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.diagnostics.executeSiteDetector(
    resourceGroupName,
    siteName,
    detectorName,
    diagnosticCategory
  );
  console.log(result);
}

async function main() {
  executeSiteDetector();
  executeSiteSlotDetector();
}

main().catch(console.error);
