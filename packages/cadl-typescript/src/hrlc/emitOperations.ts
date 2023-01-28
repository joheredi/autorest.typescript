import { File } from "@azure-tools/rlc-common";
import {
  OptionalKind,
  ParameterDeclarationStructure,
  Project,
  SourceFile
} from "ts-morph";
import { getType } from "./getType.js";
import {
  OperationGroup,
  Operation,
  Parameter,
  Property,
  Type
} from "./hrlcCodeModel.js";

export function emitOperationGroups(
  operationGroups: OperationGroup[],
  project: Project,
  srcPath: string = "src"
): File[] {
  const files: File[] = [];
  for (const operationGroup of operationGroups) {
    const imports: Record<string, Set<string>> = {};
    const fileName = operationGroup.className
      ? `${operationGroup.className}.ts`
      : "operations.ts";

    const operationGroupFile = project.createSourceFile(fileName);
    operationGroup.operations.forEach((o) =>
      emitOperation(o, operationGroupFile, imports)
    );

    for (const module in imports) {
      operationGroupFile.addImportDeclaration({
        moduleSpecifier: module,
        namedImports: [...imports[module]!]
      });
    }
    operationGroupFile.addImportDeclaration({
      moduleSpecifier: "@azure-rest/core-client",
      namedImports: ["Client", "RequestParameters"]
    });
    files.push({
      content: operationGroupFile.getFullText(),
      path: `${srcPath}/src/api/${fileName}`
    });
  }

  return files;
}

function emitOperation(
  operation: Operation,
  sourceFile: SourceFile,
  imports: Record<string, Set<string>>
) {
  let parameters: OptionalKind<ParameterDeclarationStructure>[] = (
    operation.bodyParameter?.type.properties ?? []
  )
    .filter((p) => !p.optional)
    .map((p) => buildParameterType(p.clientName, p.type, imports));

  parameters = parameters.concat(
    operation.parameters
      .filter(
        (p) =>
          p.implementation === "Method" &&
          p.type.type !== "constant" &&
          !p.optional
      )
      .map((p) => buildParameterType(p.clientName, p.type, imports))
  );

  parameters.unshift({ name: "context", type: "Client" });
  const optionsType = emitOptionsInterface(operation, sourceFile, imports);
  parameters.push({ name: "options", type: optionsType, initializer: "{}" });

  // TODO: Support operation overloads
  const response = operation.responses[0]!;
  const returnType =
    response?.type?.type === "model"
      ? buildParameterType(response.type.name!, response.type!, imports)
      : { name: "", type: "void" };

  const operationDeclaration = sourceFile.addFunction({
    docs: [operation.description],
    isAsync: true,
    isExported: true,
    name: operation.name,
    parameters,
    returnType: `Promise<${returnType.type}>`
  });

  const operationPath = operation.url;
  const operationMethod = operation.method.toLowerCase();
  operationDeclaration.addStatements([
    `const result = await context.pathUnchecked("${operationPath}", ${getPathParameters(
      operation
    )}).${operationMethod}({${getRequestParameters(operation)}});`
  ]);

  const successCodes = getSuccessStatuses(operation);

  operationDeclaration.addStatements([
    `if(![${successCodes
      .map((s) => `"${s}"`)
      .join(",")}].includes(result.status)){`,
    "throw result.body",
    "}"
  ]);

  if (!response?.type?.properties) {
    operationDeclaration.addStatements([`return;`]);
  } else {
    operationDeclaration.addStatements([
      `return {`,
      getResponseMapping(response.type.properties ?? []).join(","),
      `}`
    ]);
  }
}

function getResponseMapping(properties: Property[]) {
  const props: string[] = [];
  for (const property of properties) {
    // TODO: Do we need to also add headers in the result type?
    props.push(`"${property.restApiName}": result.body.${property.clientName}`);
  }

  return props;
}
function getSuccessStatuses(operation: Operation): number[] {
  const success: Set<number> = new Set();
  for (const response of operation.responses) {
    for (const status of response.statusCodes) {
      if (status !== "default") {
        success.add(status);
      }
    }
  }

  return [...success];
}

function getPathParameters(operation: Operation) {
  if (!operation.parameters) {
    return "";
  }

  let pathParams = "";
  for (const param of operation.parameters) {
    if (param.location === "path") {
      if (!param.optional) {
        pathParams = `${pathParams} ${param.clientName},`;
        continue;
      }

      const defaultValue = getDefaultValue(param);

      pathParams = `${pathParams}, options.${param.clientName}`;

      if (defaultValue) {
        pathParams = ` ?? "${defaultValue}"`;
      }
      pathParams = `${pathParams},`;
    }
  }

  return pathParams;
}

function getRequestParameters(operation: Operation): string {
  if (!operation.parameters) {
    return "";
  }

  const parametersImplementation: Record<
    "header" | "query" | "body",
    string[]
  > = {
    header: [],
    query: [],
    body: []
  };

  for (const param of operation.parameters) {
    if (param.location === "header" || param.location === "query") {
      parametersImplementation[param.location].push(getParameterMap(param));
    }
  }

  for (const param of operation.bodyParameter?.type.properties ?? []) {
    parametersImplementation.body.push(getParameterMap(param));
  }

  let paramStr = "";

  if (parametersImplementation.header.length) {
    paramStr = `${paramStr}\nheaders: {${parametersImplementation.header.join(
      "\n"
    )}},`;
  }

  if (parametersImplementation.query.length) {
    paramStr = `${paramStr}\nqueryParameters: {${parametersImplementation.query.join(
      "\n"
    )}},`;
  }

  if (operation.bodyParameter && operation.bodyParameter.type.properties) {
    paramStr = `${paramStr}\nbody: {${parametersImplementation.body.join(
      "\n"
    )}},`;
  }

  return paramStr;
}

function getDefaultValue(param: Parameter | Property) {
  return (param.clientDefaultValue ?? param.type.clientDefaultValue) !==
    undefined
    ? `?? "${param.clientDefaultValue ?? param.type.clientDefaultValue}"`
    : "";
}

function getParameterMap(param: Parameter | Property) {
  const defaultValue = getDefaultValue(param);
  return `"${param.restApiName}": ${
    param.optional || param.type.type === "constant"
      ? `options.${param.clientName} ${defaultValue}`
      : param.clientName
  },`;
}

// function getBodyParameters(operation: Operation): string {
//   if (!operation.bodyParameter) {
//     return "undefined";
//   }

//   const bodyParams = operation.bodyParameter;

//   let paramStr = "";
//   for (const param of bodyParams.type.properties ?? []) {
//     paramStr = `${paramStr}\n"${param.restApiName}": ${
//       param.optional || param.type.type === "constant"
//         ? `options.${param.clientName}`
//         : param.clientName
//     },`;
//   }

//   return paramStr;
// }

function emitOptionsInterface(
  operation: Operation,
  sourceFile: SourceFile,
  imports: Record<string, Set<string>>
): string {
  const optionalParameters = operation.parameters.filter((p) => p.optional);
  const optionalBodyParams = (
    operation.bodyParameter?.type.properties ?? []
  ).filter((p) => p.optional);
  const options = [...optionalBodyParams, ...optionalParameters];
  const name = toPascalCase(`${operation.name}Options`);
  sourceFile.addInterface({
    name,
    extends: ["RequestParameters"],
    properties: options.map((p) => {
      return {
        docs: [p.description],
        hasQuestionToken: true,
        ...buildParameterType(p.clientName, p.type, imports)
      };
    })
  });

  return name;
}

function toPascalCase(name: string): string {
  return name[0]?.toUpperCase() + name.substring(1);
}

function buildParameterType(
  clientName: string,
  type: Type,
  imports: Record<string, Set<string>>
) {
  let typeMetadata = getType(type);
  let typeName = typeMetadata.name;
  if (typeMetadata.modifier === "Array") {
    typeName = `${typeName}[]`;
  }
  if (typeMetadata.originModule) {
    if (!imports[typeMetadata.originModule!]) {
      imports[typeMetadata.originModule] = new Set();
    }

    imports[typeMetadata.originModule]!.add(typeMetadata.name);
  }
  return { name: clientName, type: typeName };
}
