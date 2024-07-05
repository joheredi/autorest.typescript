import { SdkModelType } from "@azure-tools/typespec-client-generator-core";
import { SourceFile } from "ts-morph";
import { buildModelDeserializer } from "./buildDeserializerFunction.js";

export function emitDeserializers(
  models: SdkModelType[],
  sourceFile: SourceFile
) {
  for (const model of models) {
    const deserializerFunction = buildModelDeserializer(model);

    if (deserializerFunction) {
      sourceFile.addStatements(deserializerFunction);
    }
  }
}
