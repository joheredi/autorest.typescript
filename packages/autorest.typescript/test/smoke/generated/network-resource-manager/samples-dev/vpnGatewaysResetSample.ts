/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { NetworkManagementClient } from "@msinternal/network-resource-manager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Resets the primary of the vpn gateway in the specified resource group.
 *
 * @summary Resets the primary of the vpn gateway in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2021-05-01/examples/VpnGatewayReset.json
 */
async function resetVpnGateway() {
  const subscriptionId = "subid";
  const resourceGroupName = "rg1";
  const gatewayName = "vpngw";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.vpnGateways.beginResetAndWait(
    resourceGroupName,
    gatewayName
  );
  console.log(result);
}

resetVpnGateway().catch(console.error);
