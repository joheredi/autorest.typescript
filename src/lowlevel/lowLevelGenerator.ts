import {
  CodeModel,
  Response,
  Schema,
  SchemaType,
  PrimitiveSchema,
  ArraySchema,
  Operation,
  Property,
  Parameter,
  ParameterLocation,
  ChoiceSchema,
  HttpHeader,
  ConstantSchema
} from "@autorest/codemodel";

import {
  CallSignatureDeclarationStructure,
  IndentationText,
  MethodSignatureStructure,
  OptionalKind,
  Project,
  PropertySignatureStructure,
  SourceFile,
  StatementStructures,
  StructureKind,
  VariableDeclarationKind,
  VariableStatementStructure,
  WriterFunction,
  Writers
} from "ts-morph";

import * as prettier from "prettier";
import { isSchemaResponse } from "../utils/schemaHelpers";
import { getAutorestOptions, getHost, getSession } from "../autorestSession";
import { transformBaseUrl } from "../transforms/urlTransforms";
import { NameType, normalizeName } from "../utils/nameUtils";

const prettierTypeScriptOptions: prettier.Options = {
  parser: "typescript",
  arrowParens: "always",
  bracketSpacing: true,
  endOfLine: "lf",
  printWidth: 80,
  semi: true,
  singleQuote: false,
  tabWidth: 2
};

const prettierJSONOptions: prettier.Options = {
  parser: "json",
  tabWidth: 2,
  semi: false,
  singleQuote: false
};

function escapeDecriptions(model: CodeModel) {
  model.schemas.objects?.forEach(escapeDescription);
  model.schemas.choices?.forEach(escapeDescription);
  model.schemas.sealedChoices?.forEach(escapeDescription);
  model.schemas.dictionaries?.forEach(escapeDescription);

  model.operationGroups.forEach(og => {
    og.operations.forEach(o => {
      escapeDescription(o);
      o.signatureParameters?.forEach(escapeDescription);
    });
  });
}

function escapeDescription(schema: Schema | Operation | Parameter) {
  schema.language.default.description = schema.language.default.description.replace(
    /@/g,
    "\\@"
  );
  schema.language.default.description = schema.language.default.description.replace(
    /{/g,
    "\\{"
  );
  schema.language.default.description = schema.language.default.description.replace(
    /}/g,
    "\\}"
  );
}

function setOperationName(model: CodeModel) {
  // No need to append operation group name if there is only a single OperationGroup
  if (model.operationGroups.length > 1) {
    model.operationGroups.forEach(og =>
      og.operations.forEach(o => {
        o.language.default.name = `${og.language.default.name}${o.language.default.name}`;
      })
    );
  }
}

export async function generateLowlevelClient() {
  const host = getHost();
  const session = getSession();
  const { model } = session;

  const project = new Project({
    useInMemoryFileSystem: true,
    manipulationSettings: {
      indentationText: IndentationText.TwoSpaces
    }
  });

  escapeDecriptions(model);
  setOperationName(model);
  await generateTypes(model, project);

  // Save the source files to the virtual filesystem
  project.saveSync();
  const fs = project.getFileSystem();

  // Loop over the files
  for (const file of project.getSourceFiles()) {
    const filePath = file.getFilePath();
    const isJson = /\.json$/gi.test(filePath);
    const isSourceCode = /\.(ts|js)$/gi.test(filePath);
    let fileContents = fs.readFileSync(filePath);
    const licenseHeader = `// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT license.\n`;
    fileContents = `${licenseHeader.trimLeft()}\n${fileContents}`;

    // Format the contents if necessary
    if (isJson || isSourceCode) {
      fileContents = prettier.format(
        fileContents,
        isJson ? prettierJSONOptions : prettierTypeScriptOptions
      );
    }

    // Write the file to the AutoRest host
    host.WriteFile(
      filePath.substr(1), // Get rid of the leading slash '/'
      fileContents
    );
  }
}

async function generateTypes(model: CodeModel, project: Project) {
  generatePathFirstClient(model, project);
  generateResponsesInterface(model, project);
  generateModelInterfaces(model, project);
  generateParameterInterfaces(model, project);
}

function generateParameterInterfaces(model: CodeModel, project: Project) {
  const clientFile = project.createSourceFile(`src/parameters.ts`, undefined, {
    overwrite: true
  });

  let importedModels = new Set<string>();

  model.operationGroups.forEach(og =>
    og.operations.forEach(o => {
      const operationParameters =
        (o.signatureParameters &&
          o.signatureParameters.length &&
          o.signatureParameters) ||
        [];
      const requestParameters =
        (o.requests && o.requests[0].signatureParameters) || [];

      const signatureParameters = [
        ...operationParameters,
        ...requestParameters
      ];
      const name = `${o.language.default.name}Parameters`;
      let refs: string[] = ["RequestParameters"];

      if (signatureParameters.length) {
        const bodyParameter = signatureParameters.filter(
          p => p.protocol.http?.in === "body"
        );

        const queryParameters = signatureParameters.filter(
          p => p.protocol.http?.in === "query"
        );

        const referencedModels = new Set<string>();
        if (queryParameters.length) {
          const name = `${o.language.default.name}QueryParamProperties`;
          const propDef = queryParameters.map(p => {
            return getPropertySignature(p, referencedModels);
          });

          clientFile.addInterface({
            isExported: true,
            name: name,
            properties: propDef
          });

          const queryParamName = normalizeName(
            `${o.language.default.name}QueryParam`,
            NameType.Interface
          );

          clientFile.addInterface({
            isExported: true,
            name: queryParamName,
            properties: [
              {
                name: "queryParameters",
                type: name,
                hasQuestionToken: !propDef.some(p => !p.hasQuestionToken)
              }
            ]
          });

          refs.push(queryParamName);
        }

        if (bodyParameter.length) {
          const name = `${o.language.default.name}BodyParam`;
          const body = getPropertySignature(bodyParameter[0], referencedModels);

          clientFile.addInterface({
            isExported: true,
            name: name,
            properties: [
              {
                name: "body",
                type: body.type,
                hasQuestionToken: body.hasQuestionToken
              }
            ]
          });

          refs.push(name);
        }

        referencedModels.forEach(m => importedModels.add(m));

        clientFile.addTypeAlias({
          name,
          isExported: true,
          type: refs.join(" & ")
        });
      } else {
        clientFile.addTypeAlias({
          name,
          isExported: true,
          type: refs.join(" & ")
        });
      }
    })
  );

  clientFile.addImportDeclarations([
    {
      namedImports: ["RequestParameters"],
      moduleSpecifier: "@azure-rest/core-client"
    }
  ]);

  clientFile.addImportDeclarations([
    {
      namedImports: [...importedModels],
      moduleSpecifier: "./models"
    }
  ]);
}

function generateModelInterfaces(model: CodeModel, project: Project) {
  const clientFile = project.createSourceFile(`src/models.ts`, undefined, {
    overwrite: true
  });

  generateObjectInterfaces(model, clientFile);
  generateChoices(model, clientFile);
  generateSealedChoices(model, clientFile);
  generateDictionaries(model, clientFile);
}

function generateSealedChoices(model: CodeModel, file: SourceFile) {
  (model.schemas.sealedChoices || []).forEach(choice => {
    const type = choice.choices
      .map(c => {
        let value = c.value;

        if (typeof value === "string") {
          value = `"${value}"`;
        }

        return value;
      })
      .join(" | ");
    file.addTypeAlias({
      name: choice.language.default.name,
      isExported: true,
      type
    });
  });
}

function generateDictionaries(model: CodeModel, file: SourceFile) {
  const existingDictionaries = new Set<string>();
  (model.schemas.dictionaries || []).forEach(dictionary => {
    let elementType = getTypeForSchema(dictionary.elementType);

    const type = `Record<string, ${elementType.typeName}>`;
    const typeAlias = {
      name: dictionary.language.default.name,
      isExported: true,
      type
    };

    if (!existingDictionaries.has(JSON.stringify(typeAlias))) {
      file.addTypeAlias(typeAlias);
      existingDictionaries.add(JSON.stringify(typeAlias));
    }
  });
}

function generateChoices(model: CodeModel, file: SourceFile) {
  (model.schemas.choices || []).forEach(choice => {
    file.addTypeAlias({
      name: choice.language.default.name,
      isExported: true,
      type: choice.choices.map(choice => `"${choice.value}"`).join(" | ")
    });
  });
}

function isPrimitiveSchema(schema: Schema): boolean {
  return [
    SchemaType.Binary,
    SchemaType.String,
    SchemaType.Number,
    SchemaType.Integer,
    SchemaType.Date,
    SchemaType.DateTime,
    SchemaType.Any,
    SchemaType.Boolean,
    SchemaType.ByteArray,
    SchemaType.Char,
    SchemaType.Credential,
    SchemaType.Duration,
    SchemaType.Time,
    SchemaType.UnixTime,
    SchemaType.Uri,
    SchemaType.Uuid,
    SchemaType.Unknown,
    SchemaType.Constant
  ].includes(schema.type);
}

function getPropertySignature(
  p: Property | Parameter,
  importedModels = new Set<string>()
) {
  let property: PropertySignatureStructure;
  const propertyName = `"${p.language.default.serializedName ||
    p.language.default.name}"`;
  if (isPrimitiveSchema(p.schema)) {
    const schemaType = primitiveSchemaToType(p.schema);
    const propertyType = p.nullable ? `${schemaType} | null` : schemaType;
    property = {
      name: propertyName,
      docs: [{ description: p.language.default.description }],
      hasQuestionToken: !p.required,
      type: propertyType,
      kind: StructureKind.PropertySignature
    };
  } else if (p.schema.type === SchemaType.Array) {
    const arraySchema = p.schema as ArraySchema;
    let elementType = "";

    if (arraySchema.elementType.type === SchemaType.Object) {
      elementType = normalizeName(
        arraySchema.elementType.language.default.name,
        NameType.Interface
      );
      importedModels.add(elementType);
    } else {
      elementType = primitiveSchemaToType(arraySchema.elementType);
    }

    property = {
      name: propertyName,
      docs: [{ description: p.language.default.description }],
      hasQuestionToken: !p.required,
      type: `${elementType}[]`,
      kind: StructureKind.PropertySignature
    };
  } else {
    const type = normalizeName(
      p.schema.language.default.name,
      NameType.Interface
    );
    importedModels.add(p.schema.language.default.name);

    property = {
      name: p.language.default.name,
      docs: [{ description: p.language.default.description }],
      hasQuestionToken: !p.required,
      type,
      kind: StructureKind.PropertySignature
    };
  }
  return property;
}

// Need to fix this logic
function generateObjectInterfaces(model: CodeModel, file: SourceFile) {
  (model.schemas.objects || []).forEach(o => {
    const properties: PropertySignatureStructure[] = (o.properties || []).map(
      p => {
        return getPropertySignature(p);
      }
    );

    let baseName = normalizeName(o.language.default.name, NameType.Interface);

    if (o.parents?.immediate && o.parents.immediate.length) {
      if (
        o.parents.immediate.length === 1 &&
        o.parents.immediate[0].language.default.name === baseName &&
        !properties.length
      ) {
        return;
      }
      const exportedName = baseName;
      baseName = `${baseName}Base`;
      const parentNames = o.parents.immediate.map(p => p.language.default.name);

      file.addTypeAlias({
        name: `${exportedName}`,
        isExported: true,
        type: [baseName, ...parentNames].join(" & ")
      });
    }

    file.addInterface({
      name: baseName,
      isExported: true,
      properties
    });
  });
}

interface TypeInfo {
  typeName: string;
  modelName?: string;
}

function getTypeForSchema(schema: Schema): TypeInfo {
  let modelName: string | undefined = schema.language.default.name;
  let typeName = schema.language.default.name;
  if (isPrimitiveSchema(schema)) {
    typeName = primitiveSchemaToType(schema);
    modelName = undefined;
  }

  if (isArraySchema(schema)) {
    const elementType = getTypeForSchema(schema.elementType);
    typeName = `${elementType.typeName}[]`;
    modelName = elementType.modelName;
  }

  return { typeName, modelName };
}

function isArraySchema(schema: Schema): schema is ArraySchema {
  return schema.type === SchemaType.Array;
}

// function isDictionarySchema(schema: Schema): schema is DictionarySchema {
//   return schema.type === SchemaType.Dictionary;
// }

function primitiveSchemaToType(schema: PrimitiveSchema): string {
  switch (schema.type) {
    case SchemaType.Any:
      return "any";
    case SchemaType.Integer:
    case SchemaType.Number:
      return "number";
    case SchemaType.Date:
    case SchemaType.Time:
    case SchemaType.DateTime:
      return "Date";
    case SchemaType.Char:
      return "string";
    case SchemaType.Binary:
    case SchemaType.Duration:
    case SchemaType.Credential:
    case SchemaType.UnixTime:
    case SchemaType.Uri:
    case SchemaType.Uuid:
    case SchemaType.String:
      return "string";
    case SchemaType.Boolean:
      return "boolean";
    case SchemaType.ByteArray:
      return "Uint8Array";
    case SchemaType.Choice:
    case SchemaType.SealedChoice:
      return (schema as ChoiceSchema).choices
        .map(choice => `"${choice.value}"`)
        .join(" | ");
    case SchemaType.Constant:
      const value = (schema as ConstantSchema).value.value;
      return typeof value === "string" ? `"${value}"` : value;
  }

  throw new Error(`Unknown primitive schema ${schema.type}`);
}

type PathParameter = { name: string; description?: string };

type Methods = {
  [key: string]: {
    optionsName: string;
    description: string;
    hasOptionalOptions: boolean;
    returnType: string;
  };
};
type Paths = {
  [key: string]: {
    name: string;
    pathParameters: PathParameter[];
    methods: Methods;
  };
};

function generatePathFirstClient(model: CodeModel, project: Project) {
  const name = normalizeName(model.language.default.name, NameType.File);
  const clientFile = project.createSourceFile(`src/${name}.ts`, undefined, {
    overwrite: true
  });

  // Get all paths
  const importedParameters = new Set<string>();
  const importedResponses = new Set<string>();
  const pathDictionary: Paths = {};
  for (const operationGroup of model.operationGroups) {
    for (const operation of operationGroup.operations) {
      const operationName = operation.language.default.name;
      const operationDescription = operation.language.default.description;
      const pathParameters: PathParameter[] =
        operation.parameters
          ?.filter(p => p.protocol.http?.in === ParameterLocation.Path)
          .map(p => {
            return {
              name:
                p.language.default.serializedName || p.language.default.name,
              description: p.language.default.description
            };
          }) || [];

      for (const request of operation.requests || []) {
        const path: string = (request.protocol.http?.path as string) || "";
        const method = request.protocol.http?.method;

        if (path && method) {
          if (!pathDictionary[path]) {
            pathDictionary[path] = {
              pathParameters,
              methods: {},
              name: operationName
            };
          }
          const hasOptionalOptions = !request.signatureParameters?.some(
            p => p.required
          );
          pathDictionary[path] = {
            name: operationName,
            pathParameters,
            methods: {
              ...pathDictionary[path].methods,
              [`${method}`]: {
                description: operationDescription,
                optionsName: getOperationOptionsType(
                  operation,
                  importedParameters
                ),
                hasOptionalOptions,
                returnType: `Promise<${getOperationReturnType(
                  operation,
                  importedResponses
                )}>`
              }
            }
          };
        }
      }
    }
  }

  clientFile.addInterface({
    name: "Routes",
    isExported: true,
    callSignatures: getPathFirstRoutesInterfaceDefinition(
      pathDictionary,
      clientFile
    )
  });

  const clientName = model.language.default.name;
  const uriParameter = getClientUriParameter();
  const { addCredentials } = getAutorestOptions();
  const commonClientParams = [
    ...(uriParameter ? [{ name: uriParameter, type: "string" }] : []),
    ...(addCredentials === false
      ? []
      : [{ name: "credentials", type: "TokenCredential | KeyCredential" }])
  ];
  const clientIterfaceName = `${clientName}Client`;
  const factoryTypeName = `${clientName}Factory`;
  clientFile.addTypeAlias({
    isExported: true,
    name: clientIterfaceName,
    type: Writers.intersectionType(
      "Client",
      Writers.objectType({ properties: [{ name: "path", type: "Routes" }] })
    )
  });

  clientFile.addInterface({
    isExported: true,
    name: factoryTypeName,
    callSignatures: [
      {
        parameters: [
          ...commonClientParams,
          {
            name: "options",
            type: "ClientOptions",
            hasQuestionToken: true /** TODO: Check if there are any required client params */
          }
        ]
      }
    ]
  });

  clientFile.addFunction({
    isExported: true,
    name: clientName,
    parameters: [
      ...commonClientParams,
      { name: "options", type: "ClientOptions = {}" }
    ],
    returnType: clientIterfaceName,
    isDefaultExport: true,
    statements: getClientFactoryBody(clientIterfaceName)
  });

  if (importedParameters.size) {
    clientFile.addImportDeclaration({
      namedImports: [...importedParameters],
      moduleSpecifier: "./parameters"
    });
  }

  if (importedResponses.size) {
    clientFile.addImportDeclaration({
      namedImports: [...importedResponses],
      moduleSpecifier: "./responses"
    });
  }

  clientFile.addImportDeclarations([
    {
      namedImports: ["getClient", "ClientOptions", "Client"],
      moduleSpecifier: "@azure-rest/core-client"
    }
  ]);

  clientFile.addImportDeclarations([
    {
      namedImports: ["KeyCredential", "TokenCredential"],
      moduleSpecifier: "@azure/core-auth"
    }
  ]);
}

function getClientUriParameter() {
  const { model } = getSession();
  const { parameterName } = transformBaseUrl(model);
  return parameterName;
}

function getClientFactoryBody(
  clientTypeName: string
): string | WriterFunction | (string | WriterFunction | StatementStructures)[] {
  const { model } = getSession();
  const { endpoint, parameterName } = transformBaseUrl(model);
  let baseUrl: string;
  if (parameterName) {
    const parsedEndpoint = endpoint?.replace(
      `{${parameterName}}`,
      `\${${parameterName}}`
    );
    baseUrl = `options.baseUrl ?? \`${parsedEndpoint}\``;
  } else {
    baseUrl = `options.baseUrl ?? "${endpoint}"`;
  }

  const baseUrlStatement: VariableStatementStructure = {
    kind: StructureKind.VariableStatement,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [{ name: "baseUrl", initializer: baseUrl }]
  };

  const { credentialScopes, credentialKeyHeaderName } = getAutorestOptions();

  const scopesString =
    credentialScopes && credentialScopes.length
      ? credentialScopes.map(cs => `"${cs}"`).join(", ")
      : "";
  const scopes = scopesString ? `scopes: [${scopesString}],` : "";

  const apiKeyHeaderName = credentialKeyHeaderName
    ? `apiKeyHeaderName: "${credentialKeyHeaderName}",`
    : "";

  const credentials =
    scopes || apiKeyHeaderName
      ? `options = {
    ...options,
    credentials: {
      ${scopes}
      ${apiKeyHeaderName}
    }
  }`
      : "";

  const getClient = `return getClient(
    baseUrl,
    ${credentials ? "credentials," : ""}
    options
  ) as ${clientTypeName};`;

  return [baseUrlStatement, credentials, getClient];
}

function generatePathFirstRouteMethodsDefinition(
  operationName: string,
  methods: Methods,
  file: SourceFile
): void {
  const methodDefinitions: OptionalKind<MethodSignatureStructure>[] = [];
  for (const key of Object.keys(methods)) {
    const method = methods[key];
    methodDefinitions.push({
      name: key,
      docs: [{ description: methods[key].description }],
      parameters: [
        {
          name: "options",
          hasQuestionToken: method.hasOptionalOptions,
          type: method.optionsName
        }
      ],
      returnType: method.returnType
    });
  }

  file.addInterface({
    methods: methodDefinitions,
    name: operationName,
    isExported: true
  });
}

function getPathFirstRoutesInterfaceDefinition(
  paths: Paths,
  sourcefile: SourceFile
): CallSignatureDeclarationStructure[] {
  const signatures: CallSignatureDeclarationStructure[] = [];
  for (const key of Object.keys(paths)) {
    generatePathFirstRouteMethodsDefinition(
      paths[key].name,
      paths[key].methods,
      sourcefile
    );
    const pathParams = paths[key].pathParameters;
    signatures.push({
      docs: [
        `Resource for '${key
          .replace(/}/g, "\\}")
          .replace(
            /{/g,
            "\\{"
          )}' has methods for the following verbs: ${Object.keys(
          paths[key].methods
        ).join(", ")}`
      ],
      parameters: [
        { name: "path", type: `"${key}"` },
        ...pathParams.map(p => {
          return { name: p.name, type: "string", description: p.description };
        })
      ],
      returnType: paths[key].name,
      kind: StructureKind.CallSignature
    });
  }
  return signatures;
}

function getResponseInterfaceName(operation: Operation, response: Response) {
  return `${operation.language.default.name}${response.protocol.http?.statusCodes[0]}Response`;
}

function generateResponsesInterface(model: CodeModel, project: Project) {
  const clientFile = project.createSourceFile(`src/responses.ts`, undefined, {
    overwrite: true
  });

  let importedModels = new Set<string>();
  let hasHeaders = false;

  const operations = getAllOperations(model);

  operations.forEach(o => {
    [...(o.responses || []), ...(o.exceptions || [])].forEach(r => {
      if (!r.protocol.http) {
        return;
      }

      const baseResponseName = `${o.language.default.name}${r.protocol.http?.statusCodes[0]}`;
      let bodyType: string | undefined;
      let headersType = "RawHttpHeaders";
      const isHeadersOptional =
        !r.protocol.http?.headers || !r.protocol.http?.headers.length;

      if (isSchemaResponse(r)) {
        const typeInfo = getTypeForSchema(r.schema);
        bodyType = typeInfo.typeName;

        if (typeInfo.modelName) {
          importedModels.add(typeInfo.modelName);
        }
      }

      if (!isHeadersOptional) {
        hasHeaders = true;
        const headersInterfaceName = `${baseResponseName}Headers`;
        clientFile.addInterface({
          isExported: true,
          name: headersInterfaceName,
          properties: headersType = r.protocol.http?.headers.map(
            (h: HttpHeader) => ({
              name: `"${h.header.toLowerCase()}"`,
              docs: [h.language.default.description],
              type: "string",
              hasQuestionToken: true
            })
          )
        });

        headersType = `RawHttpHeaders & ${headersInterfaceName}`;
      }

      const responseTypeName = getResponseInterfaceName(o, r);
      const statusCode =
        r.protocol.http?.statusCodes[0] === "default"
          ? `"500"`
          : `"${r.protocol.http?.statusCodes[0]}"`;

      const responseProperties = [{ name: "status", type: statusCode }];

      if (bodyType) {
        responseProperties.push({
          name: "body",
          type: bodyType ?? "any"
        });
      }

      if (!isHeadersOptional) {
        responseProperties.push({
          name: "headers",
          type: headersType
        });
      }

      clientFile.addInterface({
        docs: [o.language.default.description],
        name: responseTypeName,
        properties: responseProperties,
        isExported: true,
        extends: ["HttpResponse"]
      });
    });
  });

  if (importedModels.size) {
    clientFile.addImportDeclaration({
      namedImports: [...importedModels],
      moduleSpecifier: "./models"
    });
  }

  clientFile.addImportDeclarations([
    {
      namedImports: ["HttpResponse"],
      moduleSpecifier: "@azure-rest/core-client"
    }
  ]);

  if (hasHeaders) {
    clientFile.addImportDeclaration({
      namedImports: ["RawHttpHeaders"],
      moduleSpecifier: "@azure/core-rest-pipeline"
    });
  }
}

function getAllOperations(model: CodeModel) {
  let operations: Operation[] = [];
  model.operationGroups.forEach(og =>
    og.operations
      .filter(o => o.requests && o.requests.length)
      .forEach(o => {
        operations.push(o);
      })
  );

  return operations;
}

function getOperationOptionsType(
  operation: Operation,
  importedParameters = new Set<string>()
) {
  const paramsName = `${operation.language.default.name}Parameters`;
  importedParameters.add(paramsName);

  return paramsName;
}

function getOperationReturnType(
  operation: Operation,
  importedResponses = new Set<string>()
) {
  let returnType: string = "HttpResponse";
  if (operation.responses && operation.responses.length) {
    const responses = [...operation.responses, ...(operation.exceptions || [])];

    const responseTypes = responses
      .filter(
        r => r.protocol.http?.statusCodes && r.protocol.http?.statusCodes.length
      )
      .map(r => {
        const responseName = getResponseInterfaceName(operation, r);
        importedResponses.add(responseName);
        return responseName;
      });

    if (responseTypes.length) {
      returnType = responseTypes.join(" | ");
    }
  }

  return returnType;
}
