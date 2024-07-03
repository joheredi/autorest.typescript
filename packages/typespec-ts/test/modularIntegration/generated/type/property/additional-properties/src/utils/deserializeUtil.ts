// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { WidgetData1Output, WidgetDataOutput } from "../rest/index.js";
import { WidgetData1, WidgetData } from "../models/models.js";

/** deserialize function for WidgetData1 */
function deserializeWidgetData1(obj: WidgetData1Output): WidgetData1 {
  return {
    kind: obj["kind"],
    start: deserializeUtcDateTime(obj["start"]),
    end: deserializeUtcDateTime(obj["end"]),
  };
}

/** deserialize function for WidgetDataOutput */
export function deserializeWidgetData(obj: WidgetDataOutput): WidgetData {
  switch (obj.kind) {
    case "kind1":
      return deserializeWidgetData1(obj);
    default:
      return obj;
  }
}
