// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import "../rest/outputModels.js";
import { BodyModel as BodyModelRest } from "../rest/index.js";

export interface BodyModel {
  name: string;
}

export function bodyModelSerializer(item: BodyModel): BodyModelRest {
  return {
    name: item["name"],
  };
}
