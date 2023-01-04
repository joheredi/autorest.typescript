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
  AccountSasParameters,
  StorageManagementClient
} from "@msinternal/storage-resource-manager";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to List SAS credentials of a storage account.
 *
 * @summary List SAS credentials of a storage account.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2021-06-01/examples/StorageAccountListAccountSAS.json
 */
async function storageAccountListAccountSas() {
  const subscriptionId = process.env["SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["RESOURCE_GROUP"] || "res7985";
  const accountName = "sto8588";
  const parameters: AccountSasParameters = {
    keyToSign: "key1",
    sharedAccessExpiryTime: new Date("2017-05-24T11:42:03.1567373Z"),
    permissions: "r",
    protocols: "https,http",
    resourceTypes: "s",
    services: "b",
    sharedAccessStartTime: new Date("2017-05-24T10:42:03.1567373Z")
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.listAccountSAS(
    resourceGroupName,
    accountName,
    parameters
  );
  console.log(result);
}

async function main() {
  storageAccountListAccountSas();
}

main().catch(console.error);
