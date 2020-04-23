/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Models from "./models";

const packageName = "hdinsight-data-plane";
const packageVersion = "";

export class HDInsightJobManagementClientContext extends coreHttp.ServiceClient {
  clusterDnsName: string;
  userName: string;

  /**
   * Initializes a new instance of the HDInsightJobManagementClientContext class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param clusterDnsName The cluster dns name against which the job management is to be.
   * @param userName The user name used for running job.
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    clusterDnsName: string,
    userName: string,
    options?: Models.HDInsightJobManagementClientOptionalParams
  ) {
    if (credentials === undefined) {
      throw new Error("'credentials' cannot be null");
    }
    if (clusterDnsName === undefined) {
      throw new Error("'clusterDnsName' cannot be null");
    }
    if (userName === undefined) {
      throw new Error("'userName' cannot be null");
    }

    // Initializing default values for options
    if (!options) {
      options = {};
    }

    if (!options.userAgent) {
      const defaultUserAgent = coreHttp.getDefaultUserAgentValue();
      options.userAgent = `${packageName}/${packageVersion} ${defaultUserAgent}`;
    }

    super(credentials, options);

    this.requestContentType = "application/json; charset=utf-8";

    this.baseUri = options.endpoint || "https://{clusterDnsName}";

    // Parameter assignments
    this.clusterDnsName = clusterDnsName;
    this.userName = userName;
  }
}
