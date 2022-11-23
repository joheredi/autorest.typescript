import { RLCModel, Schema } from "../interfaces";
import { isConstantSchema } from "./schemaHelpers";

export function getApiVersion(model: RLCModel): string | undefined {
  if (!model.apiVersionParam) {
    return undefined;
  }

  if (
    model.apiVersionParam &&
    isConstantSchema(model.apiVersionParam as Schema)
  ) {
    return model.apiVersionParam.default;
  }

  return undefined;
}
