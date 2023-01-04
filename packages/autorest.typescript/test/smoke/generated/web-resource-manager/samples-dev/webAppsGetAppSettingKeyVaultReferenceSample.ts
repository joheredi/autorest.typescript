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
 * This sample demonstrates how to Description for Gets the config reference and status of an app
 *
 * @summary Description for Gets the config reference and status of an app
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2021-02-01/examples/GetKeyVaultReferencesForAppSetting.json
 */
async function getAzureKeyVaultAppSettingReference() {
  const subscriptionId =
    process.env["SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["RESOURCE_GROUP"] || "testrg123";
  const name = "testc6282";
  const appSettingKey = "setting";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.getAppSettingKeyVaultReference(
    resourceGroupName,
    name,
    appSettingKey
  );
  console.log(result);
}

async function main() {
  getAzureKeyVaultAppSettingReference();
}

main().catch(console.error);
