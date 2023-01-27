import { File } from "@azure-tools/rlc-common";
import { Project } from "ts-morph";
import { getType } from "./getType.js";
import { HrlcCodeModel } from "./hrlcCodeModel.js";

export function emitModels(codeModel: HrlcCodeModel, project: Project): File[] {
  const files: File[] = [];
  const modelsFile = project.createSourceFile("models.ts");
  const models = codeModel.types.filter(
    (t) => t.type === "model" || t.type === "enum"
  );

  for (const model of models) {
    const properties = model.properties ?? [];
    const typeMetadata = getType(model);
    let typeName = typeMetadata.name;
    if (typeMetadata.modifier === "Array") {
      typeName = `${typeName}[]`;
    }
    if (model.type === "enum") {
      modelsFile.addTypeAlias({
        name: model.name!,
        isExported: true,
        docs: [model.description ?? ""],
        type: (model.values ?? []).map((v) => `"${v.value}"`).join(" | ")
      });
    } else {
      modelsFile.addInterface({
        name: model.name!,
        isExported: true,
        docs: [model.description ?? ""],
        properties: properties.map((p) => {
          return {
            name: p.clientName,
            docs: [p.description],
            hasQuestionToken: p.optional,
            isReadonly: p.readonly,
            type: typeName
          };
        })
      });
    }
  }

  files.push({ content: modelsFile.getFullText(), path: "models.ts" });
  return files;
}
