import { File } from "@azure-tools/rlc-common";
import {
  ClassDeclaration,
  FunctionDeclarationStructure,
  MethodDeclarationStructure,
  OptionalKind,
  ParameterDeclarationStructure,
  Project,
  SourceFile,
  StructureKind
} from "ts-morph";
import { toCamelCase } from "../casingUtils.js";
import { getType } from "./getType.js";
import {
  Operation,
  Parameter,
  Property,
  Type,
  Client
} from "./hrlcCodeModel.js";
import { getModuleFullName } from "./importsHelper.js";

export function emitClientOperationGroups(
  client: Client,
  clientClass: ClassDeclaration,
  scope: "client" | "module",
  _clientFile: SourceFile
) {
  for (const operationGroup of client.operationGroups) {
    const imports: Record<string, Set<string>> = {};
    const operationGroupName = toCamelCase(operationGroup.propertyName);
    const operationDeclarations: OptionalKind<FunctionDeclarationStructure>[] =
      operationGroup.operations.map((operation) =>
        emitOperation(operation, imports, scope)
      );
    const tempfile = new Project().createSourceFile("temp.ts");

    const declarations = tempfile.addFunctions(operationDeclarations);

    if (operationGroupName) {
      clientClass.addProperty({
        name: operationGroupName,
        initializer: `
      {
        ${declarations.map((d) => {
          return `${d.getName()}: (${d
            .getParameters()
            .filter((p) => p.getName() !== "context")
            .map((p) => p.getText())
            .join(",")}): ${d
            .getReturnType()
            .getText()} => {return ${d.getName()}(${[
            "this._client",
            ...d.getParameters().map((p) => p.getName())
          ]
            .filter((p) => p !== "context")
            .join(",")})}`;
        })}
      }
      `
      });
    } else {
      clientClass.addMethods(
        declarations.map((d) => {
          const method: MethodDeclarationStructure = {
            name: d.getName() ?? "FIXME",
            kind: StructureKind.Method,
            returnType: d.getReturnType().getText(),
            parameters: d
              .getParameters()
              .filter((p) => p.getName() !== "context")
              .map((d) => d.getStructure()),
            statements: `return ${d.getName()}(${[
              "this._client",
              ...d.getParameters().map((p) => p.getName())
            ]
              .filter((p) => p !== "context")
              .join(",")})`
          };

          return method;
        })
      );
    }
  }
}

export function emitOperationGroups(
  client: Client,
  project: Project,
  exports: string[],
  scope: "client" | "module",
  srcPath: string = "src"
): File[] {
  const files: File[] = [];
  for (const operationGroup of client.operationGroups) {
    const imports: Record<string, Set<string>> = {};
    const fileName = operationGroup.className
      ? `${operationGroup.className}`
      : "operations";

    const operationGroupFile = project.createSourceFile(
      `${srcPath}/src/api/${fileName}.ts`
    );
    exports.push(`${fileName}.js`);
    operationGroup.operations.forEach((o) => {
      emitOptionsInterface(o, imports, scope, operationGroupFile);
      const operationDeclaration = emitOperation(o, imports, scope);
      operationGroupFile.addFunction(operationDeclaration);
    });

    for (const module in imports) {
      operationGroupFile.addImportDeclaration({
        moduleSpecifier: `./${module}`,
        namedImports: [...imports[module]!]
      });
    }
    operationGroupFile.addImportDeclarations([
      {
        moduleSpecifier: "../rest/index.js",
        namedImports: [`${client.name}Context as Client`, "isUnexpected"]
      }
    ]);
    files.push({
      content: operationGroupFile.getFullText(),
      path: `${srcPath}/src/api/${fileName}.ts`
    });
  }

  return files;
}

export function emitOperation(
  operation: Operation,
  imports: Record<string, Set<string>>,
  scope: "client" | "module"
): OptionalKind<FunctionDeclarationStructure> {
  let parameters: OptionalKind<ParameterDeclarationStructure>[] = (
    operation.bodyParameter?.type.properties ?? []
  )
    .filter((p) => !p.optional)
    .map((p) => buildParameterType(p.clientName, p.type, imports, scope));

  parameters = parameters.concat(
    operation.parameters
      .filter(
        (p) =>
          p.implementation === "Method" &&
          p.type.type !== "constant" &&
          !p.optional
      )
      .map((p) => buildParameterType(p.clientName, p.type, imports, scope))
  );

  const optionsType = emitOptionsInterface(operation, imports, scope);
  parameters.unshift({ name: "context", type: "Client" });
  parameters.push({
    name: "options",
    type: optionsType,
    initializer: "{ requestOptions: {} }"
  });

  // TODO: Support operation overloads
  const response = operation.responses[0]!;
  const returnType =
    response?.type?.type === "model"
      ? buildParameterType(response.type.name!, response.type!, imports, scope)
      : { name: "", type: "void" };

  const functionStatement: OptionalKind<FunctionDeclarationStructure> = {
    docs: [operation.description],
    isAsync: true,
    isExported: true,
    name: operation.name,
    parameters,
    returnType: `Promise<${returnType.type}>`
  };

  const operationPath = operation.url;
  const operationMethod = operation.method.toLowerCase();
  const statements: string[] = [];
  statements.push(
    `const result = await context.path("${operationPath}", ${getPathParameters(
      operation
    )}).${operationMethod}({${getRequestParameters(operation)}});`
  );

  statements.push(`if(isUnexpected(result)){`, "throw result.body", "}");

  if (!response?.type?.properties) {
    statements.push(`return;`);
  } else {
    statements.push(
      `return {`,
      getResponseMapping(response.type.properties ?? []).join(","),
      `}`
    );
  }
  return {
    ...functionStatement,
    statements
  };
}

function getResponseMapping(
  properties: Property[],
  propertyPath: string = "result.body"
) {
  const props: string[] = [];
  for (const property of properties) {
    // TODO: Do we need to also add headers in the result type?
    if (property.type.type === "model") {
      props.push(
        `"${property.restApiName}": ${
          !property.optional
            ? ""
            : `!${propertyPath}.${property.clientName} ? undefined :`
        } {${getResponseMapping(
          property.type.properties ?? [],
          `${propertyPath}.${property.restApiName}${
            property.optional ? "?" : ""
          }`
        )}}`
      );
    } else {
      const dot = propertyPath.endsWith("?") ? "." : "";
      const restValue = `${
        propertyPath ? `${propertyPath}${dot}` : `${dot}`
      }["${property.restApiName}"]`;
      props.push(
        `"${property.clientName}": ${deserializeResponseValue(
          property.type,
          restValue
        )}`
      );
    }
  }

  return props;
}

function deserializeResponseValue(type: Type, restValue: string): string {
  switch (type.type) {
    case "datetime":
      return `new Date(${restValue} ?? "")`;
    case "list":
      if (type.elementType?.type === "model") {
        return `(${restValue} ?? []).map(p => ({${getResponseMapping(
          type.elementType?.properties ?? [],
          "p"
        )}}))`;
      } else if (
        type.elementType?.properties?.some((p) => needsDeserialize(p.type))
      ) {
        return `(${restValue} ?? []).map(p => ${deserializeResponseValue(
          type.elementType!,
          "p"
        )})`;
      } else {
        return restValue;
      }

    default:
      return restValue;
  }
}

function needsDeserialize(type?: Type) {
  return type?.type === "datetime" || type?.type === "model";
}

// function getSuccessStatuses(operation: Operation): number[] {
//   const success: Set<number> = new Set();
//   for (const response of operation.responses) {
//     for (const status of response.statusCodes) {
//       if (status !== "default") {
//         success.add(status);
//       }
//     }
//   }

//   return [...success];
// }

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

  const operationParameters = operation.parameters.filter(
    (p) => p.implementation !== "Client"
  );

  const parametersImplementation: Record<
    "header" | "query" | "body",
    string[]
  > = {
    header: [],
    query: [],
    body: []
  };

  for (const param of operationParameters) {
    if (param.location === "header" || param.location === "query") {
      parametersImplementation[param.location].push(getParameterMap(param));
    }
  }

  for (const param of operation.bodyParameter?.type.properties?.filter(
    (p) => !p.readonly
  ) ?? []) {
    parametersImplementation.body.push(getParameterMap(param));
  }

  let paramStr = "";

  if (parametersImplementation.header.length) {
    paramStr = `${paramStr}\nheaders: {${parametersImplementation.header.join(
      "\n"
    )}...options.requestOptions?.customHeaders},`;
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
    ? `${param.optional ? "??" : ""} "${
        param.clientDefaultValue ?? param.type.clientDefaultValue
      }"`
    : "";
}

function getParameterMap(param: Parameter | Property) {
  const defaultValue = getDefaultValue(param);

  if (param.optional || (param.type.type === "constant" && !defaultValue)) {
    return `...(options.${param.clientName} && {"${
      param.restApiName
    }": ${`options.${param.clientName}})`},`;
  }

  return `"${param.restApiName}": ${
    param.optional
      ? `options.${param.clientName} ${defaultValue}`
      : param.type.type === "constant"
      ? `${defaultValue}`
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
  imports: Record<string, Set<string>>,
  scope: "client" | "module",
  sourceFile?: SourceFile
): string {
  const optionalParameters = operation.parameters.filter((p) => p.optional);
  const optionalBodyParams = (
    operation.bodyParameter?.type.properties ?? []
  ).filter((p) => p.optional);
  const options = [...optionalBodyParams, ...optionalParameters];
  const name = toPascalCase(`${operation.groupName}${operation.name}Options`);
  sourceFile?.addInterface({
    name: "RequestOptions",
    properties: [
      {
        name: "customHeaders",
        type: "Record<string, string | number | boolean>",
        hasQuestionToken: true
      }
    ]
  });
  sourceFile?.addInterface({
    name: "RequestParametersCommon",
    properties: [
      { name: "requestOptions", type: "RequestOptions", hasQuestionToken: true }
    ]
  });
  sourceFile?.addInterface({
    name,
    isExported: true,
    extends: ["RequestParametersCommon"],
    properties: options.map((p) => {
      return {
        docs: [p.description],
        hasQuestionToken: true,
        ...buildParameterType(p.clientName, p.type, imports, scope)
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
  imports: Record<string, Set<string>>,
  scope: "client" | "module"
) {
  let typeMetadata = getType(type);
  let typeName = typeMetadata.name;
  if (typeMetadata.modifier === "Array") {
    typeName = `${typeName}[]`;
  }
  if (typeMetadata.originModule) {
    const moduleNameFullName = getModuleFullName(
      typeMetadata.originModule!,
      typeMetadata.isRelative,
      scope
    );
    if (!imports[moduleNameFullName]) {
      imports[moduleNameFullName] = new Set();
    }

    imports[moduleNameFullName]!.add(typeMetadata.name);
  }
  return { name: clientName, type: typeName };
}

