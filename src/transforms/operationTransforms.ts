// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HttpMethods, Mapper } from "@azure/core-http";
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
  CodeModel,
  HttpHeader,
  StringSchema,
  NumberSchema,
  ObjectSchema,
  Property,
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
  OperationResponseTypes,
} from "../models/operationDetails";
import { getLanguageMetadata } from "../utils/languageHelpers";
import { getTypeForSchema, isSchemaResponse } from "../utils/schemaHelpers";
import { getMapperTypeFromSchema, transformMapper } from "./mapperTransforms";
import { ParameterDetails } from "../models/parameterDetails";
import { PropertyKind, TypeDetails } from "../models/modelDetails";
import { KnownMediaType, isEqual } from "@azure-tools/codegen";
import { headersToSchema } from "../utils/headersToSchema";
import { extractPaginationDetails } from "../utils/extractPaginationDetails";
import { uniqWith } from "lodash";

export function transformOperationSpec(
  operationDetails: OperationDetails,
  parameters: ParameterDetails[]
): OperationSpecDetails[] {
  const operationName = normalizeName(operationDetails.name, NameType.Property);
  // Extract protocol information
  const operationFullName = operationDetails.fullName;

  const operationSpecDetails: OperationSpecDetails[] = [];

  const hasMultipleRequests = operationDetails.requests.length > 1;
  for (const request of operationDetails.requests) {
    const isXML = request.mediaType
      ? request.mediaType === KnownMediaType.Xml
      : operationDetails.mediaTypes.has(KnownMediaType.Xml);
    const httpInfo = extractHttpDetails(request);
    const {
      requestBody,
      queryParameters,
      urlParameters,
      headerParameters,
    } = getGroupedParameters(parameters, operationFullName, request.mediaType);

    const name = hasMultipleRequests
      ? `${operationName}$${request.mediaType}OperationSpec`
      : `${operationName}OperationSpec`;
    operationSpecDetails.push({
      ...httpInfo,
      responses: extractSpecResponses(operationDetails),
      requestBody,
      ...(queryParameters && queryParameters.length && { queryParameters }),
      ...(urlParameters && urlParameters.length && { urlParameters }),
      ...(headerParameters && headerParameters.length && { headerParameters }),
      ...(isXML && { isXML }),
      name,
    });
  }

  return operationSpecDetails;
}

export function extractHttpDetails({ path, method }: OperationRequestDetails) {
  return {
    path,
    httpMethod: method.toUpperCase() as HttpMethods,
  };
}

export function extractSpecResponses({
  name,
  responses,
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
            defaultValue: constantSchema.value.value,
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
      allowedValues = choiceSchema.choices.map((choice) => choice.value);
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
    reference,
  };

  return {
    ...result,
    ...(!!allowedValues && { allowedValues }),
    ...(!!constantProps && { constantProps }),
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
  if (!request.protocol.http) {
    throw new Error("Operation does not specify HTTP request details.");
  }
  return {
    path: request.protocol.http.path,
    method: request.protocol.http.method,
    mediaType: request.protocol.http.knownMediaType,
    parameters: request.parameters,
  };
}

function getLROBodySchema(responseSchema: SchemaResponse) {
  if (responseSchema.schema.type === SchemaType.Object) {
    const schema = responseSchema.schema as ObjectSchema;
    const properties = schema.properties || [];

    if (
      !properties.some((p) =>
        ["properties.provisioningstate", "provisioningstate"].includes(
          p.serializedName.toLowerCase()
        )
      )
    ) {
      const provisioningState = new Property(
        "provisioningState",
        "",
        new StringSchema("string", ""),
        { serializedName: "properties.provisioningState" }
      );

      properties.push(provisioningState);
    }

    if (!properties.some((p) => p.serializedName.toLowerCase() === "status")) {
      const status = new Property(
        "status",
        "",
        new StringSchema("string", ""),
        {
          serializedName: "status",
        }
      );

      properties.push(status);
    }

    schema.properties = properties;
  }

  return responseSchema;
}

function getLROHeaders(headers: HttpHeader[]): HttpHeader[] {
  const azureAsyncOperationHeader = new HttpHeader(
    "Azure-AsyncOperation",
    new StringSchema("string", "")
  );

  const operationLocation = new HttpHeader(
    "Operation-Location",
    new StringSchema("string", "")
  );

  const location = new HttpHeader("Location", new StringSchema("string", ""));

  const retryAfter = new HttpHeader(
    "Retry-After",
    new NumberSchema("number", "", SchemaType.Integer, 32)
  );

  const headersToAdd = [
    ...headers,
    azureAsyncOperationHeader,
    operationLocation,
    location,
    retryAfter,
  ];

  return uniqWith(
    headersToAdd,
    (a, b) => a.header.toLowerCase() === b.header.toLowerCase()
  );
}

/**
 * Build OperationResponseDetails by extracting body and header information
 * from the response
 */
export function transformOperationResponse(
  response: SchemaResponse | Response,
  operationFullName: string,
  isLRO: boolean
): OperationResponseDetails {
  const httpInfo = response.protocol.http;
  if (!httpInfo) {
    throw new Error("Operation does not specify HTTP response details.");
  }

  const isError =
    Boolean(
      response.extensions && !!response.extensions["x-ms-error-response"]
    ) || httpInfo.statusCodes.indexOf("default") > -1;

  // if (isLRO && !isError) {
  //   httpInfo.headers = getLROHeaders(httpInfo.headers || []);
  //   if (isSchemaResponse(response)) {
  //     response = getLROBodySchema(response);
  //   }
  // }

  // Transform Headers to am ObjectSchema to represent headers as an object
  const headersSchema = headersToSchema(httpInfo.headers, operationFullName);
  const mediaType = httpInfo.knownMediaType;

  const mappers: OperationResponseMappers = {
    bodyMapper: isSchemaResponse(response)
      ? getMapperForSchema(response.schema, mediaType)
      : undefined,
    headersMapper: headersSchema
      ? getMapperForSchema(headersSchema, mediaType)
      : undefined,
  };

  const types: OperationResponseTypes = {
    bodyType: isSchemaResponse(response)
      ? getTypeForSchema(response.schema)
      : undefined,
    headersType: headersSchema ? getTypeForSchema(headersSchema) : undefined,
  };

  return {
    statusCodes: httpInfo.statusCodes,
    mediaType: httpInfo.knownMediaType,
    mappers,
    types,
    isError,
  };
}

export async function transformOperation(
  operation: Operation,
  operationGroupName: string
): Promise<OperationDetails> {
  const metadata = getLanguageMetadata(operation.language);
  const pagination = extractPaginationDetails(operation);
  const name = normalizeName(metadata.name, NameType.Property);
  const operationFullName = `${operationGroupName}_${name}`;
  const responsesAndErrors = [
    ...(operation.responses || []),
    ...(operation.exceptions || []),
  ];
  const typeName = `${normalizeName(
    operationGroupName,
    NameType.Interface
  )}${normalizeName(metadata.name, NameType.Interface)}`;

  const typeDetails: TypeDetails = {
    typeName,
    kind: PropertyKind.Composite,
    usedModels: [typeName],
  };

  const isLRO: boolean = Boolean(
    operation.extensions && operation.extensions["x-ms-long-running-operation"]
  );

  const lroOptions =
    operation.extensions &&
    operation.extensions["x-ms-long-running-operation-options"];

  const codeModelRequests = operation.requests;
  if (codeModelRequests === undefined || !codeModelRequests.length) {
    throw new Error(
      `No request object was found for operation: ${operationFullName}`
    );
  }

  const requests = codeModelRequests.map(transformOperationRequest);
  let responses = responsesAndErrors.map((response) =>
    transformOperationResponse(response, operationFullName, isLRO)
  );
  const hasMultipleResponses = responses.filter((r) => !r.isError).length > 1;

  // If this is an LRO operation only consider the success response,
  // this is because LRO operations swagger defines initial and final operation
  // responses in the same operation.
  if (isLRO && hasMultipleResponses) {
    const firstSuccess = responses.find(
      (response) =>
        response.statusCodes.includes("200") ||
        response.statusCodes.includes("204")
    );

    responses = firstSuccess ? [firstSuccess] : responses;
  }

  const mediaTypes = await getOperationMediaTypes(requests, responses);

  return {
    name,
    typeDetails,
    fullName: operationFullName.toLowerCase(),
    apiVersions: operation.apiVersions
      ? operation.apiVersions.map((v) => v.version)
      : [],
    description: metadata.description,
    requests,
    responses,
    mediaTypes,
    pagination,
    isLRO,
    lroOptions,
  };
}

export function transformOperationGroups(
  codeModel: CodeModel
): Promise<OperationGroupDetails[]> {
  const clientName = getLanguageMetadata(codeModel.language).name;
  return Promise.all(
    codeModel.operationGroups.map((operationGroup) =>
      transformOperationGroup(operationGroup, clientName)
    )
  );
}

export async function transformOperationGroup(
  operationGroup: OperationGroup,
  clientName: string
): Promise<OperationGroupDetails> {
  const metadata = getLanguageMetadata(operationGroup.language);
  const isTopLevel = !metadata.name;
  const name = normalizeName(metadata.name || clientName, NameType.Property);

  const operations = await Promise.all(
    operationGroup.operations.map((operation) =>
      transformOperation(operation, name)
    )
  );
  const mediaTypes = getOperationGroupMediaTypes(operations);

  return {
    name,
    key: operationGroup.$key,
    operations,
    isTopLevel,
    mediaTypes,
  };
}

function getOperationGroupMediaTypes(operationDetails: OperationDetails[]) {
  return operationDetails.reduce((acc, op) => {
    return new Set<KnownMediaType>([...acc, ...op.mediaTypes]);
  }, new Set<KnownMediaType>());
}

async function getOperationMediaTypes(
  requests: OperationRequestDetails[],
  responses: OperationResponseDetails[]
) {
  const mediaTypes = new Set<KnownMediaType>();

  requests.forEach((r) => r.mediaType && mediaTypes.add(r.mediaType));
  responses.forEach((r) => r.mediaType && mediaTypes.add(r.mediaType));

  return mediaTypes;
}

function getGroupedParameters(
  parameters: ParameterDetails[],
  operationFullname: string,
  mediaType?: KnownMediaType
) {
  const operationParams = parameters.filter((p) => {
    // Ensure parameters are specific to the operation.
    const matchesOperation =
      p.operationsIn && p.operationsIn.indexOf(operationFullname) > -1;
    // Consider the media type as a match if none was provided, or they actually match.
    // This is important when an operation supports multiple media types.
    const matchesMediaType =
      !mediaType || !p.targetMediaType || p.targetMediaType === mediaType;
    return Boolean(matchesOperation && matchesMediaType);
  });
  return {
    requestBody: operationParams.find(
      (p) => p.location === ParameterLocation.Body
    ),
    queryParameters: operationParams.filter(
      (p) => p.location === ParameterLocation.Query
    ),
    urlParameters: operationParams.filter(
      (p) =>
        p.location === ParameterLocation.Path ||
        p.location === ParameterLocation.Uri
    ),
    headerParameters: operationParams.filter(
      (p) => p.location === ParameterLocation.Header
    ),
    cookie: operationParams.filter(
      (p) => p.location === ParameterLocation.Cookie
    ),
  };
}

function getMapperForSchema(
  responseSchema: Schema,
  mediaType?: KnownMediaType,
  expand = false
): Mapper | string {
  const responseType = getSpecType(responseSchema, expand);
  const { reference } = responseType;
  return (
    reference ||
    transformMapper({
      schema: responseSchema,
      options: { hasXmlMetadata: mediaType === KnownMediaType.Xml },
    })
  );
}
