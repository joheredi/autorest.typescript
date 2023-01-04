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
  BlobServiceProperties,
  StorageManagementClient
} from "@msinternal/storage-resource-manager";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Sets the properties of a storage account’s Blob service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
 *
 * @summary Sets the properties of a storage account’s Blob service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2021-06-01/examples/BlobServicesPutLastAccessTimeBasedTracking.json
 */
async function blobServicesPutLastAccessTimeBasedTracking() {
  const subscriptionId = process.env["SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["RESOURCE_GROUP"] || "res4410";
  const accountName = "sto8607";
  const parameters: BlobServiceProperties = {
    lastAccessTimeTrackingPolicy: {
      name: "AccessTimeTracking",
      blobType: ["blockBlob"],
      enable: true,
      trackingGranularityInDays: 1
    }
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobServices.setServiceProperties(
    resourceGroupName,
    accountName,
    parameters
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Sets the properties of a storage account’s Blob service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
 *
 * @summary Sets the properties of a storage account’s Blob service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2021-06-01/examples/BlobServicesPut.json
 */
async function putBlobServices() {
  const subscriptionId = process.env["SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["RESOURCE_GROUP"] || "res4410";
  const accountName = "sto8607";
  const parameters: BlobServiceProperties = {
    changeFeed: { enabled: true, retentionInDays: 7 },
    cors: {
      corsRules: [
        {
          allowedHeaders: [
            "x-ms-meta-abc",
            "x-ms-meta-data*",
            "x-ms-meta-target*"
          ],
          allowedMethods: ["GET", "HEAD", "POST", "OPTIONS", "MERGE", "PUT"],
          allowedOrigins: ["http://www.contoso.com", "http://www.fabrikam.com"],
          exposedHeaders: ["x-ms-meta-*"],
          maxAgeInSeconds: 100
        },
        {
          allowedHeaders: ["*"],
          allowedMethods: ["GET"],
          allowedOrigins: ["*"],
          exposedHeaders: ["*"],
          maxAgeInSeconds: 2
        },
        {
          allowedHeaders: ["x-ms-meta-12345675754564*"],
          allowedMethods: ["GET", "PUT"],
          allowedOrigins: [
            "http://www.abc23.com",
            "https://www.fabrikam.com/*"
          ],
          exposedHeaders: [
            "x-ms-meta-abc",
            "x-ms-meta-data*",
            "x -ms-meta-target*"
          ],
          maxAgeInSeconds: 2000
        }
      ]
    },
    defaultServiceVersion: "2017-07-29",
    deleteRetentionPolicy: { days: 300, enabled: true },
    isVersioningEnabled: true
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobServices.setServiceProperties(
    resourceGroupName,
    accountName,
    parameters
  );
  console.log(result);
}

async function main() {
  blobServicesPutLastAccessTimeBasedTracking();
  putBlobServices();
}

main().catch(console.error);
