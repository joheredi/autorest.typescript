import {
  CodeModel,
  Request,
  Response,
  codeModelSchema,
  Schema,
  SchemaType,
  PrimitiveSchema,
  ArraySchema,
  ChoiceSchema,
  SealedChoiceSchema,
  Operation,
  Property,
  Parameter
  //   ObjectSchema
} from "@azure-tools/codemodel";
import { Host, startSession } from "@autorest/extension-base";

import {
  CallSignatureDeclarationStructure,
  IndentationText,
  Project,
  PropertySignatureStructure,
  SourceFile,
  StructureKind,
  VariableDeclarationKind
} from "ts-morph";

import * as prettier from "prettier";
import { stringifyXML } from "@azure/core-http";
import { sortObjectSchemasHierarchically } from "../utils/sortObjectSchemasHierarchically";
import { isSchemaResponse } from "../utils/schemaHelpers";
import { request } from "http";
import { isPrimitiveType } from "@azure/core-http/types/latest/src/util/utils";
import { basename } from "path";
import { getCredentialScopes } from "../transforms/optionsTransforms";
import { transformBaseUrl } from "../transforms/urlTransforms";
// import { isSchemaResponse } from "../utils/schemaHelpers";

let importedModels = new Set<string>();

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

export async function generateLowlevelClient(host: Host) {
  const session = await startSession<CodeModel>(
    host,
    undefined,
    codeModelSchema
  );

  const { model } = session;

  const project = new Project({
    useInMemoryFileSystem: true,
    manipulationSettings: {
      indentationText: IndentationText.TwoSpaces
    }
  });

  await generateClientHelpers(host, model, project);
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
  generateResponsesInterface(model, project);
  await generateRequestInterface(model, project);
  generateModelInterfaces(model, project);
  generateParameterInterfaces(model, project);

  // generateResponseTypes(model, project);
}

// function generateResponseTypes(model: CodeModel, project: Project) {
//   const clientFile = project.createSourceFile(
//     `src/responseTypes.ts`,
//     undefined,
//     {
//       overwrite: true
//     }
//   );

//   model.operationGroups.forEach(og =>
//     og.operations.forEach(o => {
//       if (!o.responses || !o.responses.length) {
//         return;
//       }

//       const response = o.responses[0];
//       if (!isSchemaResponse(response)) {
//         return;
//       }
//     })
//   );
// }

// function schemaToType(
//   schema: Schema,
//   calculatedSchemas: WeakMap<Schema, string>
// ): string {
//   if (schema.type === SchemaType.Any) {
//     return schema.type;
//   }

//   //   if (isPrimitiveSchema(schema)) {
//   //     return primitiveSchemaToType(schema);
//   //   }

//   if (isArraySchema(schema)) {
//     return arraySchemaToType(schema);
//   }

//   if (isSealedChoiceSchema(schema)) {
//     return schemaToType(schema.choiceType, calculatedSchemas);
//   }

//   if (isChoiceSchema(schema)) {
//     return choiceSchemaToType(schema);
//   }

//   return "any";
// }

// function choiceSchemaToType(schema: ChoiceSchema) {
//   return schema.choices
//     .map(c => {
//       let value = c.value;
//       if (schema.choiceType.type === SchemaType.String) {
//         value = `"${value}"`;
//       }
//       return value;
//     })
//     .join("|");
// }

// interface ProcessedObject {
//   interfaceName: string;
// }

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

      if (signatureParameters.length) {
        const name = `${o.language.default.name}Parameters`;

        let refs: string[] = [];
        let properties: PropertySignatureStructure[] = [];
        signatureParameters.forEach(p => {
          const referencedModels = new Set<string>();
          const x = getPropertySignature(p, referencedModels);
          const model = [...referencedModels][0];
          if (p.schema.type === SchemaType.Object) {
            // is ref
            refs.push(model);
          } else {
            // is primitive
            properties.push(x);
          }

          if (model) {
            importedModels.add(model);
          }
        });

        if (properties.length) {
          const name = `${o.language.default.name}ParamProperties`;
          clientFile.addInterface({
            name: name,
            properties
          });

          refs.push(name);
        }

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
  (model.schemas.dictionaries || []).forEach(dictionary => {
    const elementType = dictionary.elementType.type;
    const type = `{[key: string]: ${elementType}}`;
    file.addTypeAlias({
      name: dictionary.language.default.name,
      isExported: true,
      type
    });
  });
}

function generateChoices(model: CodeModel, file: SourceFile) {
  (model.schemas.choices || []).forEach(choice => {
    file.addTypeAlias({
      name: choice.language.default.name,
      isExported: true,
      type: choice.choiceType.type
    });
  });
}

function isPrimitiveSchema(schema: Schema): boolean {
  return [
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
    SchemaType.Unknown
  ].includes(schema.type);
}

function getTypeForSchema(schema: Schema) {
  if (isPrimitiveSchema(schema)) {
    return primitiveSchemaToType(schema);
  } else if (schema.type === SchemaType.Array) {
    const arraySchema = schema as ArraySchema;
    let elementType = arraySchema.elementType.type.toString();
    return `${elementType}[]`;
  } else {
    return schema.language.default.name;
  }
}

function getPropertySignature(
  p: Property | Parameter,
  importedModels = new Set<string>()
) {
  let property: PropertySignatureStructure;
  const propertyName = `"${p.language.default.serializedName ||
    p.language.default.name}"`;
  if (isPrimitiveSchema(p.schema)) {
    property = {
      name: propertyName,
      hasQuestionToken: !p.required,
      type: primitiveSchemaToType(p.schema),
      kind: StructureKind.PropertySignature
    };
  } else if (p.schema.type === SchemaType.Array) {
    const arraySchema = p.schema as ArraySchema;
    let elementType = arraySchema.elementType.type.toString();

    if (arraySchema.elementType.type === SchemaType.Object) {
      elementType = arraySchema.elementType.language.default.name;
      importedModels.add(elementType);
    }
    property = {
      name: propertyName,
      hasQuestionToken: !p.required,
      type: `${elementType}[]`,
      kind: StructureKind.PropertySignature
    };
  } else {
    importedModels.add(p.schema.language.default.name);

    property = {
      name: p.language.default.name,
      hasQuestionToken: !p.required,
      type: p.schema.language.default.name,
      kind: StructureKind.PropertySignature
    };
  }
  return property;
}

function generateObjectInterfaces(model: CodeModel, file: SourceFile) {
  (model.schemas.objects || []).forEach(o => {
    const properties: PropertySignatureStructure[] = (o.properties || []).map(
      p => {
        return getPropertySignature(p);
      }
    );

    let isBaseExported = true;
    let baseName = o.language.default.name;

    if (o.parents?.immediate && o.parents.immediate.length) {
      isBaseExported = false;
      const exportedName = baseName;
      baseName = `${baseName}Base`;
      const parentNames = o.parents.immediate.map(p => p.language.default.name);

      file.addTypeAlias({
        name: exportedName,
        isExported: true,
        type: [baseName, ...parentNames].join(" & ")
      });
    }

    file.addInterface({
      name: baseName,
      isExported: isBaseExported,
      properties
    });
  });
}

// function objectSchemaToType(
//   schema: ObjectSchema,
//   calculatedSchemas: WeakMap<Schema, string>
// ) {
//   const calculated = calculatedSchemas.get(schema);
//   if (calculated) {
//     return calculated;
//   }
//   if (!schema.properties) {
//     return "{}";
//   }

//   schema.properties.map(property => {
//     const name = property.language.default.name;
//     const type = schemaToType(property.schema, calculatedSchemas);
//     return `${name}`;
//   });
// }

// function isObjectSchema(schema: Schema): schema is ObjectSchema {
//   return schema.type === SchemaType.Object;
// }

// function isChoiceSchema(schema: Schema): schema is ChoiceSchema {
//   return schema.type === SchemaType.Choice;
// }

// function isSealedChoiceSchema(schema: Schema): schema is SealedChoiceSchema {
//   return schema.type === SchemaType.SealedChoice;
// }

// function arraySchemaToType(schema: ArraySchema) {
//   const elementType = schemaToType(schema.elementType);
//   return `${elementType}[]`;
// }

function primitiveSchemaToType(schema: PrimitiveSchema) {
  switch (schema.type) {
    case SchemaType.Integer:
    case SchemaType.Number:
      return "number";
    case SchemaType.Date:
    case SchemaType.Time:
    case SchemaType.DateTime:
      return "Date";
    case SchemaType.Char:
      return "string";
    case SchemaType.Duration:
    case SchemaType.Credential:
    case SchemaType.UnixTime:
    case SchemaType.Uri:
    case SchemaType.Uuid:
    case SchemaType.String:
      return "string";
    case SchemaType.Boolean:
      return "boolean";
  }

  throw new Error(`Unknown primitive schema ${schema.type}`);
}

// function isPrimitiveSchema(schema: Schema): schema is PrimitiveSchema {
//   return [
//     SchemaType.Char,
//     SchemaType.Date,
//     SchemaType.Time,
//     SchemaType.DateTime,
//     SchemaType.Duration,
//     SchemaType.Credential,
//     SchemaType.UnixTime,
//     SchemaType.Uri,
//     SchemaType.Uuid,
//     SchemaType.Boolean,
//     SchemaType.Integer,
//     SchemaType.Number,
//     SchemaType.String
//   ].includes(schema.type);
// }

// function isArraySchema(schema: Schema): schema is ArraySchema {
//   return Boolean((schema as ArraySchema).elementType);
// }

async function generateRequestInterface(model: CodeModel, project: Project) {
  const clientFile = project.createSourceFile(`src/types.ts`, undefined, {
    overwrite: true
  });

  let importedParameters = new Set<string>();
  let importedResponses = new Set<string>();

  const operations = getAllOperations(model);

  const callOverrides = getAllRequestOverrides(
    operations,
    importedParameters,
    importedResponses
  );

  clientFile.addInterface({
    name: "Request",
    isExported: true,
    callSignatures: callOverrides,
    leadingTrivia: writer => writer.blankLine()
  });

  clientFile.addInterface({
    name: "TextAnalyticsClient",
    isExported: true,
    properties: [{ name: "request", type: "Request" }]
  });

  clientFile.addInterface({
    name: "RequestParameters",
    isExported: true,
    properties: [
      {
        name: "baseUrl",
        hasQuestionToken: true,
        type: "string"
      },
      {
        name: "headers",
        hasQuestionToken: true,
        type: "RawHttpHeaders"
      },
      {
        name: "[parameter: string]",
        type: "any"
      }
    ]
  });

  await generateCreaateClient(clientFile, model);

  clientFile.addImportDeclarations([
    {
      namedImports: ["RawHttpHeaders", "PipelineOptions"],
      moduleSpecifier: "@azure/core-https"
    },
    {
      namedImports: ["TokenCredential"],
      moduleSpecifier: "@azure/core-auth"
    }
  ]);

  if (importedModels.size) {
    clientFile.addImportDeclarations([
      {
        namedImports: [...importedModels],
        moduleSpecifier: "./models"
      }
    ]);
  }

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

  clientFile.addStatements(["export default createTextAnalyticsClient;"]);
}

async function generateCreaateClient(clientFile: SourceFile, model: CodeModel) {
  const endpoint = await transformBaseUrl(model);
  let baseUrl = endpoint.endpoint || "";
  const globalParameters = model.globalParameters || [];
  const clientParameters = globalParameters.map(param => ({
    name: param.language.default.name,
    type: getTypeForSchema(param.schema)
  }));

  if (endpoint.isCustom) {
    const paramReplacements = globalParameters
      .filter(p => p.protocol.http?.in === "uri")
      .map(p => {
        const parameterName = p.language.default.name;
        return `replace(/\{${parameterName}\}/g, ${parameterName})`;
      });

    baseUrl = [`"${baseUrl}"`, ...paramReplacements].join(".");
  } else {
    baseUrl = `${baseUrl}`;
  }

  clientFile.addFunction({
    name: "createTextAnalyticsClient",
    parameters: [
      {
        name: "credentials",
        type: "TokenCredential"
      },
      ...(clientParameters.length ? clientParameters : []),
      {
        name: "options",
        type: "PipelineOptions",
        hasQuestionToken: true
      }
    ],
    returnType: "TextAnalyticsClient",
    statements: [
      `const baseUrl = ${baseUrl};`,
      `throw new Error("Not implemented");`
    ]
  });
}

async function generateClientHelpers(
  host: Host,
  model: CodeModel,
  project: Project
) {
  const credentialScopes = await getCredentialScopes(host);
  const clientFile = project.createSourceFile(
    `src/clientHelpers.ts`,
    undefined,
    {
      overwrite: true
    }
  );
  clientFile.addStatements("let cachedHttpsClient: HttpsClient | undefined;");

  clientFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: "DEFAULT_SCOPE",
        initializer: credentialScopes
          ? `[${credentialScopes.map(c => `"${c}"`).join()}]`
          : `""`
      }
    ]
  });

  generateCreateDefaultPipeline(clientFile);
  generateGetCachedDefaultHttpsClient(clientFile);

  clientFile.addImportDeclarations([
    {
      namedImports: [
        "createPipelineFromOptions",
        "PipelineOptions",
        "bearerTokenAuthenticationPolicy",
        "Pipeline",
        "DefaultHttpsClient",
        "HttpsClient"
      ],
      moduleSpecifier: "@azure/core-https"
    },
    {
      namedImports: ["TokenCredential"],
      moduleSpecifier: "@azure/core-auth"
    }
  ]);
}

function generateGetCachedDefaultHttpsClient(clientFile: SourceFile) {
  const getCachedDefaultHttpsClient = clientFile.addFunction({
    name: "getCachedDefaultHttpsClient",
    isExported: true,
    returnType: "HttpsClient"
  });

  getCachedDefaultHttpsClient.addStatements(`
  if (!cachedHttpsClient) {
    cachedHttpsClient = new DefaultHttpsClient();
  }

  return cachedHttpsClient;`);
}

function generateCreateDefaultPipeline(clientFile: SourceFile) {
  const createDefaultPipelineFn = clientFile.addFunction({
    name: "createDefaultPipeline",
    isExported: true,
    parameters: [
      { name: "credential", type: "TokenCredential" },
      { name: "options", type: "PipelineOptions = {}" }
    ],
    returnType: "Pipeline"
  });

  createDefaultPipelineFn.addStatements([
    `
    const pipeline = createPipelineFromOptions(options);
    pipeline.addPolicy(
      bearerTokenAuthenticationPolicy({
        credential,
        scopes: DEFAULT_SCOPE
      })
    );

    return pipeline;
    `
  ]);
}

function getResponseInterfaceName(operation: Operation, response: Response) {
  return `${operation.language.default.name}${response.protocol.http?.statusCodes[0]}Response`;
}

function generateResponsesInterface(model: CodeModel, project: Project) {
  const clientFile = project.createSourceFile(`src/responses.ts`, undefined, {
    overwrite: true
  });

  let importedModels = new Set<string>();

  const operations = getAllOperations(model);

  operations.forEach(o => {
    [...(o.responses || []), ...(o.exceptions || [])].forEach(r => {
      if (!r.protocol.http) {
        return;
      }

      const baseResponseName = `${o.language.default.name}${r.protocol.http?.statusCodes[0]}`;
      let bodyType: string | undefined;
      let headersType = "HttpHeaders";
      const isHeadersOptional =
        !r.protocol.http?.headers || !r.protocol.http?.headers.length;

      if (isSchemaResponse(r)) {
        bodyType = r.schema.language.default.name;
        importedModels.add(bodyType);
      }

      if (!isHeadersOptional) {
        const headersInterfaceName = `${baseResponseName}Headers`;
        clientFile.addInterface({
          name: headersInterfaceName,
          properties: headersType = r.protocol.http?.headers.map((h: any) => ({
            name: `"${h.header}"`,
            type: "string",
            hasQuestionToken: true
          }))
        });

        headersType = `${headersInterfaceName} & HttpHeaders`;
      }

      const responseInterfaceName = `${baseResponseName}Properties`;
      const responseTypeName = getResponseInterfaceName(o, r);
      const statusCode = r.protocol.http?.statusCodes[0];

      clientFile.addTypeAlias({
        name: responseTypeName,
        type: `${responseInterfaceName} & PipelineResponse`,
        isExported: true
      });

      const responseProperties = [{ name: "status", type: statusCode }];

      if (bodyType) {
        responseProperties.push({
          name: "parsedBody",
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
        name: responseInterfaceName,
        properties: responseProperties
      });
    });
  });

  if (importedModels.size) {
    clientFile.addImportDeclaration({
      namedImports: [...importedModels],
      moduleSpecifier: "./models"
    });
  }

  clientFile.addImportDeclaration({
    namedImports: ["PipelineResponse", "HttpHeaders"],
    moduleSpecifier: "@azure/core-https"
  });
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

// function getAllResponses(model: CodeModel) {
//   let responses: Response[] = [];
//   model.operationGroups.forEach(og =>
//     og.operations
//       .filter(o => o.responses && o.responses.length)
//       .forEach(o => {
//         responses.push(...o.responses!);
//       })
//   );

//   return responses;
// }

function getAllRequestOverrides(
  operations: Operation[],
  importedParameters = new Set<string>(),
  importedResponses = new Set<string>()
) {
  let overrides: CallSignatureDeclarationStructure[] = [];
  operations.forEach(o =>
    (o.requests || [])
      .filter(r => r.protocol && r.protocol.http)
      .forEach(r => {
        let returnType: string = "PipelineResponse";
        if (o.responses && o.responses.length) {
          const responses = [...o.responses, ...(o.exceptions || [])];

          const responseTypes = responses
            .filter(
              r =>
                r.protocol.http?.statusCodes &&
                r.protocol.http?.statusCodes.length
            )
            .map(r => {
              const responseName = getResponseInterfaceName(o, r);
              importedResponses.add(responseName);
              return responseName;
            });

          if (responseTypes.length) {
            returnType = responseTypes.join(" | ");
          }
        }

        const parameters = [
          ...(o.signatureParameters || []),
          ...((o.requests &&
            o.requests[0] &&
            o.requests[0].signatureParameters) ||
            [])
        ];
        const isParameterOptional = !parameters.some(p => p.required);

        let optionsType = "RequestParameters";

        if (parameters.length) {
          const paramsName = `${o.language.default.name}Parameters`;
          importedParameters.add(paramsName);
          optionsType = `${paramsName} & ${optionsType}`;
        }

        let override: CallSignatureDeclarationStructure = {
          returnType: `Promise<${returnType}>`,
          kind: StructureKind.CallSignature,
          parameters: [
            {
              name: "route",
              type: `"${r.protocol.http!.method.toUpperCase()} ${
                r.protocol.http!.path
              }"`
            },
            {
              name: "options",
              type: optionsType,
              hasQuestionToken: isParameterOptional
            }
          ]
        };
        overrides.push(override);
      })
  );

  return overrides;
}
