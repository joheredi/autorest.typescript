import {
  CodeModel,
  Operation as M4Operation,
  ParameterLocation as M4ParameterLocation,
  ImplementationLocation,
  Response,
  SchemaContext,
  OperationGroup as M4OperationGroup,
  Parameter as M4Parameter,
  Schema,
  SchemaType,
  ObjectSchema,
  ArraySchema
} from "@autorest/codemodel";
import { isEqual } from "lodash";

import {
  gerOperationSuccessStatus,
  getResponseTypeName
} from "./operationHelpers";

import { Project } from "ts-morph";

import { getAutorestOptions } from "../autorestSession";
import { CasingConvention, NameType, normalizeName } from "../utils/nameUtils";
import { getLanguageMetadata } from "../utils/languageHelpers";
import { getOperationParameters } from "./helpers/operationHelpers";
import { ResponseTypes } from "./interfaces";
import { isLongRunningOperation } from "./helpers/hasPollingOperations";
import { getElementType } from "./schemaHelpers";
import {
  buildClientDefinitions,
  Paths,
  PathParameter,
  OperationShortcuts,
  OperationShortcutGroup,
  OperationGroup,
  Operation,
  Parameter,
  ParameterLocation,
  TsType
} from "@azure-tools/rlc-codegen";
import { REST_CLIENT_RESERVED } from "./generateMethodShortcuts";
import { getParameterLocation } from "../utils/parameterHelpers";
export let pathDictionary: Paths = {};

export function generatePathFirstClient(model: CodeModel, project: Project) {
  const name = normalizeName(
    getLanguageMetadata(model.language).name,
    NameType.Interface
  );
  const { srcPath } = getAutorestOptions();
  pathDictionary = {};
  const importedParameters = new Set<string>();
  const importedResponses = new Set<string>();
  const clientImports = new Set<string>();
  for (const operationGroup of model.operationGroups) {
    for (const operation of operationGroup.operations) {
      const operationName = getLanguageMetadata(operation.language).name;
      const operationDescription = getLanguageMetadata(operation.language)
        .description;
      const pathParameters: PathParameter[] =
        operation.parameters
          ?.filter(p => p.protocol.http?.in === M4ParameterLocation.Path)
          .map(p => {
            const languageMetadata = getLanguageMetadata(p.language);
            return {
              name: languageMetadata.serializedName || languageMetadata.name,
              schema: p.schema,
              description: languageMetadata.description,
              type: getElementType(p.schema, [
                SchemaContext.Input,
                SchemaContext.Exception
              ])
            };
          }) || [];
      const path: string = operation.requests?.[0].protocol.http?.path;
      pathParameters.sort(function compare(a: PathParameter, b: PathParameter) {
        return path.indexOf(a.name) - path.indexOf(b.name);
      });

      for (const request of operation.requests || []) {
        const path: string = (request.protocol.http?.path as string) || "";
        const method = request.protocol.http?.method;

        if (path && method) {
          if (!pathDictionary[path]) {
            pathDictionary[path] = {
              pathParameters,
              methods: {},
              name: operationName,
              annotations: {
                isLongRunning: isLongRunningOperation(operation)
              }
            };
          }
          const hasOptionalOptions = !hasRequiredOptions(operation);

          const newMethod = {
            description: operationDescription,
            optionsName: getOperationOptionsType(operation, importedParameters),
            hasOptionalOptions,
            returnType: `StreamableMethod<${getOperationReturnType(
              operation,
              importedResponses,
              clientImports
            )}>`,
            responseTypes: getResponseTypes(operation),
            successStatus: gerOperationSuccessStatus(operation)
          };

          if (
            pathDictionary[path].methods[`${method}`] &&
            !pathDictionary[path].methods[`${method}`].some(m =>
              isEqual(m, newMethod)
            )
          ) {
            pathDictionary[path].methods[`${method}`].push(newMethod);
          } else {
            pathDictionary[path].methods[`${method}`] = [newMethod];
          }
        }
      }
    }
  }

  const { rlcShortcut } = getAutorestOptions();
  const shortcutGroups = rlcShortcut ? getShortcuts(model.operationGroups) : [];
  const shortcuts: OperationShortcuts = { groups: shortcutGroups };

  const operationGroups: OperationGroup[] = model.operationGroups.map(g => {
    const name = normalizeName(
      g.language.default.name,
      NameType.OperationGroup,
      true,
      REST_CLIENT_RESERVED,
      CasingConvention.Camel
    );
    return {
      name,
      description: g.language.default?.description,
      operations: g.operations.map(transformOperation)
    };
  });

  const clientDefinitionsFile = buildClientDefinitions(
    {
      libraryName: name,
      paths: pathDictionary,
      srcPath,
      shortcuts,
      operationGroups
    },
    { clientImports, importedParameters, importedResponses }
  );

  project.createSourceFile(
    clientDefinitionsFile.path,
    clientDefinitionsFile.content
  );
}

function transformOperation(m4Operation: M4Operation): Operation {
  const name = normalizeName(
    m4Operation.language.default.name,
    NameType.Property,
    true
  );

  const description = m4Operation.language.default.description;

  return {
    name,
    ...(description && { docs: description }),
    parameters: m4Operation.parameters?.map(transformParameters) ?? [],
    path: m4Operation.requests?.[0].protocol.http?.path,
    returnType: "any",
    verb: m4Operation.requests?.[0].protocol.http?.method
  };
}

function transformType(schema: Schema): TsType {
  switch (schema.type) {
    case SchemaType.Object:
      return {
        kind: "record",
        valueType: { kind: "primitive", name: "unknown" }
      };
    case SchemaType.Array:
      return {
        kind: "array",
        elementType: transformType((schema as ArraySchema).elementType)
      };
    case SchemaType.Any:
      return {
        kind: "primitive",
        name: "any"
      };
    case SchemaType.Binary:
      return {
        kind: "primitive",
        name: "Uint8Array"
      };
    case SchemaType.Boolean:
      return {
        kind: "primitive",
        name: "boolean"
      };
    case SchemaType.Date:
    case SchemaType.DateTime:
      return {
        kind: "primitive",
        name: "Date"
      };
    case SchemaType.Char:
    case SchemaType.String:
    case SchemaType.Uri:
    case SchemaType.Uuid:
      return {
        kind: "primitive",
        name: "string"
      };
    case SchemaType.Integer:
    case SchemaType.Number:
      return {
        kind: "primitive",
        name: "string"
      };
    default:
      return {
        kind: "primitive",
        name: "any"
      };
  }
}

function transformParameters(m4Parameter: M4Parameter): Parameter {
  const name = normalizeName(
    m4Parameter.language.default.name,
    NameType.Parameter,
    true
  );
  const location = getParameterLocation(m4Parameter);
  return {
    name,
    location: transformParameterLocation(location),
    type: transformType(m4Parameter.schema),
    docs: m4Parameter.language.default.description
  };
}

function transformParameterLocation(
  m4Location: M4ParameterLocation
): ParameterLocation {
  switch (m4Location) {
    case M4ParameterLocation.Body:
      return "body";
    case M4ParameterLocation.Header:
      return "header";
    case M4ParameterLocation.Path:
      return "path";
    case M4ParameterLocation.Query:
      return "query";
    case M4ParameterLocation.Uri:
      return "url";
    case M4ParameterLocation.Cookie:
      return "cookie";
    case M4ParameterLocation.None:
      return "none";
    case M4ParameterLocation.Virtual:
      return "virtual";
  }
}

function getShortcuts(
  operationGroups: M4OperationGroup[]
): OperationShortcutGroup[] {
  return operationGroups.map(og => {
    const groupName = og.language.default.name;
    const name = normalizeName(
      groupName,
      NameType.OperationGroup,
      true,
      REST_CLIENT_RESERVED,
      CasingConvention.Camel
    );
    const interfaceName = normalizeName(
      `${name}Operations`,
      NameType.Interface,
      true,
      REST_CLIENT_RESERVED
    );
    return { name, type: interfaceName };
  });
}

function hasRequiredOptions(operation: M4Operation) {
  return getOperationParameters(operation)
    .filter(p => p.implementation === ImplementationLocation.Method)
    .filter(p => ["query", "body", "headers"].includes(p.protocol.http?.in))
    .some(p => p.required);
}

function getOperationOptionsType(
  operation: M4Operation,
  importedParameters = new Set<string>()
) {
  const paramsName = `${
    getLanguageMetadata(operation.language).name
  }Parameters`;
  importedParameters.add(paramsName);

  return paramsName;
}

function getOperationReturnType(
  operation: M4Operation,
  importedResponses = new Set<string>(),
  coreClientImports = new Set<string>()
) {
  let returnType: string = "HttpResponse";
  if (
    (operation.responses && operation.responses.length) ||
    (operation.exceptions && operation.exceptions.length)
  ) {
    const responses = [
      ...(operation.responses ?? []),
      ...(operation.exceptions ?? [])
    ];
    const responseTypes = responses
      .filter(
        r => r.protocol.http?.statusCodes && r.protocol.http?.statusCodes.length
      )
      .map(r => {
        const responseName = getResponseTypeName(operation, r);
        importedResponses.add(responseName);
        return responseName;
      });

    if (responseTypes.length) {
      if (
        responseTypes.indexOf("HttpResponse") > -1 &&
        !coreClientImports.has(returnType)
      ) {
        coreClientImports.add("HttpResponse");
      }
      returnType = responseTypes.join(" | ");
    }
  }
  if (returnType === "HttpResponse" && !coreClientImports.has(returnType)) {
    coreClientImports.add(returnType);
  }
  return returnType;
}

/**
 * This function computes all the response types error and success
 * an operation can end up returning.
 */
function getResponseTypes(operation: M4Operation): ResponseTypes {
  let returnTypes: ResponseTypes = {
    error: [],
    success: []
  };
  if (
    (operation.responses && operation.responses.length) ||
    (operation.exceptions && operation.exceptions.length)
  ) {
    function getResponseType(responses: Response[]) {
      return responses
        .filter(
          r =>
            r.protocol.http?.statusCodes && r.protocol.http?.statusCodes.length
        )
        .map(r => {
          const responseName = getResponseTypeName(operation, r);
          return responseName;
        });
    }

    returnTypes.error = getResponseType(operation.exceptions ?? []);
    returnTypes.success = getResponseType(operation.responses ?? []);
  }
  return returnTypes;
}
