# Azure Example TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
v3: true
package-name: "@azure/monitor"
title: Monitor
description: Azure MonitorClient
generate-metadata: true
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
input-file: https://raw.githubusercontent.com/Azure/azure-sdk-for-java/b5e7e8fc5b37cc09d657033b373fcdbf48117f34/sdk/monitor/azure-monitor-query/swagger/log_query_swagger.json
add-credentials: true
package-version: 1.0.0-beta.1
disable-async-iterators: true
credential-scopes: "https://example.org/.default"
hide-clients: true
rest-leve-client: true
```
