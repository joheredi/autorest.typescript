// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DemoServiceContext } from "../../api/DemoServiceContext.js";
import { Widget } from "../../models/models.js";
import {
  list,
  read,
  create,
  update,
  deleteOperation,
  analyze,
} from "../../api/widgets/index.js";
import {
  WidgetsListOptions,
  WidgetsReadOptions,
  WidgetsCreateOptions,
  WidgetsUpdateOptions,
  WidgetsDeleteOperationOptions,
  WidgetsAnalyzeOptions,
} from "../../models/options.js";

export interface WidgetsOperations {
  list: (options?: WidgetsListOptions) => Promise<Widget[]>;
  read: (id: string, options?: WidgetsReadOptions) => Promise<Widget>;
  create: (body: Widget, options?: WidgetsCreateOptions) => Promise<Widget>;
  update: (
    id: string,
    body: Widget,
    options?: WidgetsUpdateOptions,
  ) => Promise<Widget>;
  deleteOperation: (
    id: string,
    options?: WidgetsDeleteOperationOptions,
  ) => Promise<void>;
  analyze: (id: string, options?: WidgetsAnalyzeOptions) => Promise<string>;
}

export function getWidgets(context: DemoServiceContext) {
  return {
    list: (options?: WidgetsListOptions) => list(context, options),
    read: (id: string, options?: WidgetsReadOptions) =>
      read(context, id, options),
    create: (body: Widget, options?: WidgetsCreateOptions) =>
      create(context, body, options),
    update: (id: string, body: Widget, options?: WidgetsUpdateOptions) =>
      update(context, id, body, options),
    deleteOperation: (id: string, options?: WidgetsDeleteOperationOptions) =>
      deleteOperation(context, id, options),
    analyze: (id: string, options?: WidgetsAnalyzeOptions) =>
      analyze(context, id, options),
  };
}

export function getWidgetsOperations(
  context: DemoServiceContext,
): WidgetsOperations {
  return {
    ...getWidgets(context),
  };
}
