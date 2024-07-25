// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { WidgetServiceClientOptionalParams } from "./api/widgetServiceContext.js";
import { Client } from "@azure-rest/core-client";
import { Pipeline } from "@azure/core-rest-pipeline";

export { WidgetServiceClientOptionalParams } from "./api/widgetServiceContext.js";

export class WidgetServiceClient {
  private _client: Client;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;
  /** The operation groups for Widgets */
  public readonly widgets: WidgetsOperations;
  /** The operation groups for Budgets */
  public readonly budgets: BudgetsOperations;

  constructor(
    endpoint: string,
    options: WidgetServiceClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : "azsdk-js-client";

    this._client = createWidgetService(endpoint, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.widgets = getWidgetsOperations(this._client);
    this.budgets = getBudgetsOperations(this._client);
  }
}
