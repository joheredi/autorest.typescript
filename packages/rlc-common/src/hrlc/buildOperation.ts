import { OptionalKind, ParameterDeclarationStructure, Project } from "ts-morph";
import { NameType, normalizeName } from "../helpers/nameUtils.js";
import {
  PathMetadata,
  RLCModel,
  File,
  OperationParameter,
  ParameterMetadatas,
  OperationMethod,
  ParameterMetadata,
  ParameterBodyMetadata,
  Schema,
  PathParameter
} from "../interfaces.js";
import * as path from "path";
import { getName } from "../helpers/hrlcNames.js";
import { inRange } from "lodash";

export function buildOperations(model: RLCModel): File[] {
  const pathsByOperationGroup = getPathsByOperationGroup(model);
  const files: File[] = [];
  for (const operationGroupName in pathsByOperationGroup) {
    const name =
      normalizeName(operationGroupName, NameType.File) ?? "operations";
    const paths = pathsByOperationGroup[operationGroupName];
    const { srcPath } = model;
    const project = new Project();
    const filePath = path.join(srcPath, "api", `${name}.ts`);
    const operationsFile = project.createSourceFile(filePath, undefined, {
      overwrite: true
    });

    for (const path of paths) {
      for (const verb in path.methods) {
        const methods = path.methods[verb];
        for (const method of methods) {
          const operationName = method.operationName;
          const operationFunctionName = normalizeName(
            operationName,
            NameType.Operation
          );

          const pathParameters = path.pathParameters;
          const otherParameters = getOperationMethodParameters(
            path.operationGroupName,
            method.operationName,
            model
          );

          const parameters = getParametersForSignature([
            ...pathParameters,
            ...otherParameters
          ]);
          const implementation =
            getHttpMethodParams(otherParameters)?.join("\n");
          const statements = `const result = await context.path("${path.path}"${
            pathParameters.length > 0
              ? ", " + pathParameters.map((p) => p.clientName).join(", ")
              : ""
          }).${verb}(${implementation ?? ""});`;
          addContextParameter(parameters);
          addOptionsParameter(parameters);
          operationsFile.addFunction({
            name: operationFunctionName,
            isAsync: true,
            isExported: true,
            parameters,
            statements
          });
        }
      }
    }
    operationsFile.addImportDeclaration({
      moduleSpecifier: "@azure-rest/core-client",
      namedImports: ["Client"]
    });
    files.push({ path: filePath, content: operationsFile.getFullText() });
  }
  return files;
}

function addContextParameter(
  parameters: OptionalKind<ParameterDeclarationStructure>[]
) {
  parameters.unshift({
    name: "context",
    type: "Client"
  });
}

function addOptionsParameter(
  parameters: OptionalKind<ParameterDeclarationStructure>[]
) {
  parameters.push({
    name: "options",
    type: "any",
    hasQuestionToken: true
  });
}

type ExtendedPathMetadata = PathMetadata & { path: string };

// function getSignatureParameters(
//   path: PathMetadata,
//   method: OperationMethod,
//   model: RLCModel
// ) {
//   const parameters = getOperationMethodParameters(
//     path.operationGroupName,
//     method.operationName,
//     model
//   );

//   parameters[0].parameters/
// }

function getPathsByOperationGroup(model: RLCModel) {
  const pathsByOperationGroup: Record<string, ExtendedPathMetadata[]> = {};
  for (const p in model.paths) {
    const path = model.paths[p];

    if (!pathsByOperationGroup[path.operationGroupName]) {
      pathsByOperationGroup[path.operationGroupName] = [];
    }
    pathsByOperationGroup[path.operationGroupName].push({
      ...model.paths[p],
      path: p
    });
  }
  return pathsByOperationGroup;
}

function getOperationMethodParameters(
  operationGroup: string,
  operationName: string,
  codeModel: RLCModel
): ParameterMetadata[] {
  const params = codeModel.parameters ?? [];

  const result = params.filter(
    (p) =>
      p.operationGroup === operationGroup && p.operationName === operationName
  );

  if (result?.length > 0) {
    const otherParams = result[0].parameters[0].parameters ?? [];
    const bodyParams = (
      result[0].parameters[0].body?.body ?? []
    ).map<ParameterMetadata>((p) => ({
      clientName: p.clientName,
      name: p.name,
      kind: "body",
      param: p
    }));
    return [...otherParams, ...bodyParams];
  }

  return [];
}

function getHttpMethodParams(parameters: ParameterMetadata[]) {
  const queryParameters = parameters.filter((p) => p.kind === "query");
  const bodyParameter = parameters.find((p) => p.kind === "body");
  const headerParameters = parameters.filter((p) => p.kind === "header");

  if (!queryParameters.length && !bodyParameter && !headerParameters.length) {
    return undefined;
  }

  const statements: string[] = ["{"];

  if (queryParameters.length > 0) {
    statements.push("queryParameters: {");
    for (const p of queryParameters) {
      if (p.param.required) {
        statements.push(`${p.name}: ${p.clientName},`);
      } else {
        statements.push(
          `${p.name}: options?.[${p.clientName}] ${
            p.param.default ? `?? ${p.param.default},` : ","
          }`
        );
      }
    }
    statements.push("},");
  }

  if (headerParameters.length > 0) {
    statements.push("headerParameters: {");
    for (const p of headerParameters) {
      if (p.param.required) {
        statements.push(`${p.name}: ${p.clientName},`);
      } else {
        statements.push(
          `${p.name}: options?.[${p.clientName}] ${
            p.param.default ? `?? ${p.param.default},` : ""
          }`
        );
      }
    }
    statements.push("},");
  }

  if (bodyParameter) {
    statements.push(`body: ${bodyParameter.clientName}`);
  }

  statements.push("}");
  return statements;
}

function getParametersForSignature(
  parameters: (ParameterMetadata | PathParameter)[]
): OptionalKind<ParameterDeclarationStructure>[] {
  return parameters
    .filter((p) => !(isParameterMetadata(p) && !p.param.required))
    .map((p) => {
      if (isParameterMetadata(p)) {
        return {
          name: p.clientName ?? p.name,
          type: p.param.type
        };
      } else {
        return {
          name: p.name,
          type: p.type
        };
      }
    });
}

function isParameterMetadata(parameter: any): parameter is ParameterMetadata {
  return parameter.param !== undefined;
}
