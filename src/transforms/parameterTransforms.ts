import {
  Parameter,
  ParameterLocation,
  SchemaType
} from "@azure-tools/codemodel";
import { OperationRequestParameterDetails } from "../models/operationDetails";
import { getLanguageMetadata } from "../utils/languageHelpers";
import { normalizeName, NameType } from "../utils/nameUtils";
import { transformMapper, getMapperClassName } from "./mapperTransforms";
import { getTypeForSchema } from "../utils/schemaHelpers";
import { Schema } from "js-yaml";

export function getParameterName(parameter: Parameter): string {
  const { name: originalName } = getLanguageMetadata(parameter.language);
  const location = getParameterLocation(parameter);
  const name =
    (location === ParameterLocation.Body &&
      parameter.extensions &&
      parameter.extensions["x-ms-requestBody-name"]) ||
    originalName;
  return normalizeName(name, NameType.Property);
}

export function getParameterLocation(parameter: Parameter): ParameterLocation {
  const { protocol } = parameter;
  const location = protocol.http && (protocol.http.in as ParameterLocation);
  if (!location) {
    throw new Error(
      `Unable to extract Parameter location ${getParameterName(parameter)}`
    );
  }

  return location;
}

export function isRequired(parameter: Parameter): boolean {
  const required = parameter.required;
  const isConstant = parameter.schema.type === SchemaType.Constant;

  return isConstant ? false : !!required;
}

export function transformParameter(
  parameter: Parameter
): OperationRequestParameterDetails {
  const metadata = getLanguageMetadata(parameter.language);
  const modelType = getTypeForSchema(parameter.schema).typeName;
  const location = getParameterLocation(parameter);
  const name = getParameterName(parameter);
  const required = parameter.required;
  const mapper = getMapper(parameter);
  const isConstant = parameter.schema.type === SchemaType.Constant;
  return {
    name,
    description: metadata.description,
    modelType,
    location,
    mapper,
    serializedName: metadata.serializedName,
    ...(required && { required }),
    ...(isConstant && { isConstant })
  };
}

function getMapper(paramerer: Parameter) {
  if (paramerer.schema.type === SchemaType.Object) {
    return `Mappers.${getMapperClassName(paramerer.schema)}`;
  }
  const { serializedName } = getLanguageMetadata(paramerer.language);
  return transformMapper({
    schema: paramerer.schema,
    options: { required: paramerer.required, serializedName }
  });
}
