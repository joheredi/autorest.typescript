import { File } from "@azure-tools/rlc-common";
import { Project } from "ts-morph";
import { getType } from "./getType.js";
import { HrlcCodeModel } from "./hrlcCodeModel.js";

export function emitModels(
  codeModel: HrlcCodeModel,
  project: Project,
  srcPath: string = "src"
): File[] {
  const files: File[] = [];
  const modelsFile = project.createSourceFile(`models.ts`);
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
          const propertyMetadata = getType(p.type);
          let propertyTypeName = propertyMetadata.name;
          if (propertyMetadata.modifier === "Array") {
            propertyTypeName = `${propertyTypeName}[]`;
          }
          return {
            name: p.clientName,
            docs: [p.description],
            hasQuestionToken: p.optional,
            isReadonly: p.readonly,
            type: propertyTypeName
          };
        })
      });
    }
  }

  files.push({
    content: modelsFile.getFullText(),
    path: `${srcPath}/src/api/models.ts`
  });
  return files;
}
