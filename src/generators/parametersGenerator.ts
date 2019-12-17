import { ClientDetails } from "../models/clientDetails";
import { Project, VariableDeclarationKind } from "ts-morph";
import { Parameter } from "@azure-tools/codemodel";
import { OperationRequestParameterDetails } from "../models/operationDetails";
import { write } from "fs";
import { isString } from "util";

export function generateParameters(
  clientDetails: ClientDetails,
  project: Project
): void {
  const parametersFile = project.createSourceFile(
    `src/models/parameters.ts`,
    undefined,
    { overwrite: true }
  );

  parametersFile.addImportDeclaration({
    namespaceImport: "coreHttp",
    moduleSpecifier: "@azure/core-http"
  });

  parametersFile.addImportDeclaration({
    namespaceImport: "Mappers",
    moduleSpecifier: "../models/mappers"
  });

  clientDetails.parameters.forEach(param => {
    parametersFile.addVariableStatement({
      isExported: true,
      declarationKind: VariableDeclarationKind.Const,
      declarations: [
        {
          name: param.name,
          type: "coreHttp.OperationParameter",
          initializer: writer => {
            writer.block(() => {
              const { parameterPath, mapper } = buildParameter(param);
              writer.write(`parameterPath: ${JSON.stringify(parameterPath)},`);
              writer.write(
                `mapper: ${isString(mapper) ? mapper : JSON.stringify(mapper)}`
              );
            });
          }
        }
      ]
    });
  });
}

function buildParameter(parameter: OperationRequestParameterDetails) {
  return {
    parameterPath: parameter.required
      ? parameter.name
      : ["options", parameter.name],
    mapper: parameter.mapper
  };
}
