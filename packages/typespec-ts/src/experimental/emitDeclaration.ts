import { SdkType } from "@azure-tools/typespec-client-generator-core";

import { emitModel } from "./model.js";
import { emitUnion } from "./union.js";
import { emitScalar } from "./scalar.js";
import { SourceFile } from "ts-morph";

export function emitDeclaration(type: SdkType, sourceFile: SourceFile) {
  switch (type.kind) {
    case "model":
      return emitModel(type, sourceFile);
    case "enum":
    case "union":
      return emitUnion(type, sourceFile);
    default:
      return emitScalar(type);
  }
}
