// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HttpMethods, Mapper, MapperType } from "@azure/core-http";
import {
  Operation,
  Request,
  SchemaResponse,
  Response,
  Schema,
  SchemaType,
  ChoiceSchema,
  OperationGroup,
  ParameterLocation,
  ConstantSchema,
  CodeModel
} from "@azure-tools/codemodel";
import { normalizeName, NameType } from "../utils/nameUtils";
import {
  OperationGroupDetails,
  OperationDetails,
  OperationResponseDetails,
  OperationRequestDetails,
  OperationSpecDetails,
  OperationSpecResponses,
  OperationResponseMappers,
  OperationResponseTypes
} from "../models/operationDetails";
import { getLanguageMetadata } from "../utils/languageHelpers";
import { getTypeForSchema, isSchemaResponse } from "../utils/schemaHelpers";
import { getMapperTypeFromSchema } from "./mapperTransforms";
import { ParameterDetails } from "../models/parameterDetails";
import { PropertyKind, TypeDetails } from "../models/modelDetails";
import { TOPLEVEL_OPERATIONGROUP } from "./constants";
import { headersToSchema } from "../utils/headersToSchema";

export function transformOperationSpec(
  operationDetails: OperationDetails,
  parameters: ParameterDetails[]
): OperationSpecDetails {
  // Extract protocol information
  const operationFullName = operationDetails.fullName;
  const httpInfo = extractHttpDetails(operationDetails.request);
  const {
    requestBody,
    queryParameters,
    urlParameters,
    headerParameters
  } = getGroupedParameters(parameters, operationFullName);

  return {
    ...httpInfo,
    responses: extractSpecResponses(operationDetails),
    requestBody,
    ...(queryParameters && queryParameters.length && { queryParameters }),
    ...(urlParameters && urlParameters.length && { urlParameters }),
    ...(headerParameters && headerParameters.length && { headerParameters })
  };
}

export function extractHttpDetails({ path, method }: OperationRequestDetails) {
  return {
    path,
    httpMethod: method.toUpperCase() as HttpMethods
  };
}

export function extractSpecResponses({
  name,
  responses
}: OperationDetails): OperationSpecResponses {
  if (!responses || !responses.length) {
    throw new Error(`The operation ${name} contains no responses`);
  }

  return extractSchemaResponses(responses);
}

export interface SpecType {
  name: string;
  allowedValues?: string[];
  reference?: string;
  constantProps?: ConstantProps;
}

interface ConstantProps {
  isConstant: true;
  defaultValue: any;
}

export function getSpecType(responseSchema: Schema, expand = false): SpecType {
  let typeName: string = "";
  let allowedValues: any[] | undefined = undefined;
  let reference: string | undefined = undefined;
  let constantProps: ConstantProps | undefined;
  switch (responseSchema.type) {
    case SchemaType.ByteArray:
      typeName = "Base64Url";
      break;
    case SchemaType.Constant:
      const constantSchema = responseSchema as ConstantSchema;
      typeName = getSpecType(constantSchema.valueType).name;
      constantProps = expand
        ? {
            isConstant: true,
            defaultValue: constantSchema.value.value
          }
        : undefined;
      break;
    case SchemaType.String:
      typeName = "String";
      break;
    case SchemaType.Choice:
    case SchemaType.SealedChoice:
      const choiceSchema = responseSchema as ChoiceSchema;
      typeName = "Enum";
      allowedValues = choiceSchema.choices.map(choice => choice.value);
      break;
    case SchemaType.Object:
      const name = getLanguageMetadata(responseSchema.language).name;
      reference = `Mappers.${normalizeName(name, NameType.Class)}`;
      break;
    default:
      typeName = getMapperTypeFromSchema(responseSchema.type);
      break;
  }

  let result = {
    name: typeName as any,
    reference
  };

  return {
    ...result,
    ...(!!allowedValues && { allowedValues }),
    ...(!!constantProps && { constantProps })
  };
}

export function extractSchemaResponses(responses: OperationResponseDetails[]) {
  return responses.reduce(
    (
      result: OperationSpecResponses,
      { statusCodes, mappers }: OperationResponseDetails
    ) => {
      if (!statusCodes || !statusCodes.length) {
        return result;
      }

      const statusCode = statusCodes[0];
      result[statusCode] = mappers;
      return result;
    },
    {}
  );
}

export function transformOperationRequest(
  request: Request
): OperationRequestDetails {
  if (request.protocol.http) {
    return {
      path: request.protocol.http.path,
      method: request.protocol.http.method
    };
  } else {
    throw new Error("Operation does not specify HTTP request details.");
  }
}

export function transformOperationResponse(
  response: SchemaResponse | Response,
  operationFullName: string
): OperationResponseDetails {
  const isError =
    !!response.extensions && !!response.extensions["x-ms-error-response"];

  const httpInfo = response.protocol.http;

  if (!httpInfo) {
    throw new Error("Operation does not specify HTTP response details.");
  }

  const headersSchema = headersToSchema(httpInfo.headers, operationFullName);

  const mappers: OperationResponseMappers = {
    bodyMapper: isSchemaResponse(response)
      ? getMapperForSchema(response.schema)
      : undefined,
    headersMapper: headersSchema ? getMapperForSchema(headersSchema) : undefined
  };

  const types: OperationResponseTypes = {
    bodyType: isSchemaResponse(response)
      ? getTypeForSchema(response.schema)
      : undefined,
    headersType: headersSchema ? getTypeForSchema(headersSchema) : undefined
  };
  const isDefault = httpInfo.statusCodes.indexOf("default") > -1;
  return {
    statusCodes: httpInfo.statusCodes,
    mediaType: httpInfo.knownMediaType,
    mappers,
    types,
    isError: isDefault || isError
  };
}

export function transformOperation(
  operation: Operation,
  operationGroupName: string
): OperationDetails {
  const metadata = getLanguageMetadata(operation.language);
  const name = normalizeName(metadata.name, NameType.Property);
  const responses = [
    ...(operation.responses || []),
    ...(operation.exceptions || [])
  ];
  const typeDetails: TypeDetails = {
    typeName: `${normalizeName(
      operationGroupName,
      NameType.Interface
    )}${normalizeName(metadata.name, NameType.Interface)}`,
    kind: PropertyKind.Composite
  };

  const operationFullName = `${operationGroupName}_${name}`;

  return {
    name,
    typeDetails,
    fullName: operationFullName.toLowerCase(),
    apiVersions: operation.apiVersions
      ? operation.apiVersions.map(v => v.version)
      : [],
    description: metadata.description,
    request: transformOperationRequest(operation.request),
    responses: responses.map(response =>
      transformOperationResponse(response, operationFullName)
    )
  };
}

export async function transformOperationGroups(codeModel: CodeModel) {
  return codeModel.operationGroups.map(transformOperationGroup);
}

export function transformOperationGroup(
  operationGroup: OperationGroup
): OperationGroupDetails {
  const metadata = getLanguageMetadata(operationGroup.language);
  const isTopLevel = !metadata.name;
  const name = normalizeName(
    metadata.name || TOPLEVEL_OPERATIONGROUP,
    NameType.Property
  );
  return {
    name,
    key: operationGroup.$key,
    operations: operationGroup.operations.map(operation =>
      transformOperation(operation, name)
    ),
    isTopLevel
  };
}

function getGroupedParameters(
  parameters: ParameterDetails[],
  operationFullname: string
) {
  const operationParams = parameters.filter(
    p => p.operationsIn && p.operationsIn.indexOf(operationFullname) > -1
  );
  return {
    requestBody: operationParams.find(
      p => p.location === ParameterLocation.Body
    ),
    queryParameters: operationParams.filter(
      p => p.location === ParameterLocation.Query
    ),
    urlParameters: operationParams.filter(
      p =>
        p.location === ParameterLocation.Path ||
        p.location === ParameterLocation.Uri
    ),
    headerParameters: operationParams.filter(
      p => p.location === ParameterLocation.Header
    ),
    cookie: operationParams.filter(p => p.location === ParameterLocation.Cookie)
  };
}

function getMapperForSchema(
  responseSchema: Schema,
  expand = false
): Mapper | string {
  const responseType = getSpecType(responseSchema, expand);
  const { reference, constantProps, ...type } = responseType;
  return (
    reference || {
      type: type as MapperType,
      ...(!!constantProps && constantProps)
    }
  );
}
