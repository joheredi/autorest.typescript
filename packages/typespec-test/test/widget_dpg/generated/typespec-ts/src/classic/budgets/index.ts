// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { WidgetServiceContext } from "../../api/widgetServiceContext.js";
import { User } from "../../models/models.js";
import { BudgetsCreateOrReplaceOptionalParams } from "../../models/options.js";

/** Interface representing a Budgets operations. */
export interface BudgetsOperations {
  /** Long-running resource create or replace operation template. */
  createOrReplace: (
    name: string,
    resource: User,
    options: BudgetsCreateOrReplaceOptionalParams,
  ) => undefined;
}

export function getBudgets(context: WidgetServiceContext) {
  return {
    createOrReplace: (
      name: string,
      resource: User,
      options: BudgetsCreateOrReplaceOptionalParams,
    ) => createOrReplace(context, name, resource, options),
  };
}

export function getBudgetsOperations(
  context: WidgetServiceContext,
): BudgetsOperations {
  return {
    ...getBudgets(context),
  };
}
