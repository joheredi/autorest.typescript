// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ClientDetails } from "../models/clientDetails";
import { UnionDetails } from "../models/unionDetails";
import { ModelDetails, PropertyDetails } from "../models/modelDetails";
import { isNil } from "lodash";

import {
  CodeModel,
  ObjectSchema,
  Property,
  ChoiceSchema,
  SealedChoiceSchema,
  Parameter
} from "@azure-tools/codemodel";
import {
  normalizeName,
  NameType,
  guardReservedNames
} from "../utils/nameUtils";
import { getTypeForSchema } from "../utils/schemaHelpers";
import { getStringForValue } from "../utils/valueHelpers";
import { getLanguageMetadata } from "../utils/languageHelpers";
import { transformMapper } from "./mapperTransforms";
import { transformOperationGroup } from "./operationTransforms";
import { transformParameter, getParameterName } from "./parameterTransforms";
import { OperationRequestParameterDetails } from "../models/operationDetails";

export function transformProperty(property: Property): PropertyDetails {
  const metadata = getLanguageMetadata(property.language);
  const { typeName, isConstant, defaultValue } = getTypeForSchema(
    property.schema
  );

  return {
    name: normalizeName(metadata.name, NameType.Property),
    description: !metadata.description.startsWith("MISSING")
      ? metadata.description
      : undefined,
    serializedName: property.serializedName,
    type: typeName,
    required: !!property.required,
    readOnly: !!property.readOnly,
    isConstant,
    defaultValue
  };
}

export function transformChoice(
  choice: ChoiceSchema | SealedChoiceSchema
): UnionDetails {
  const metadata = getLanguageMetadata(choice.language);
  let name = guardReservedNames(metadata.name);

  return {
    name,
    description: `Defines values for ${metadata.name}.`,
    serializedName: metadata.name,
    values: choice.choices.map(c =>
      getStringForValue(c.value, choice.choiceType)
    )
  };
}

export function transformObject(obj: ObjectSchema): ModelDetails {
  const metadata = getLanguageMetadata(obj.language);
  let name = normalizeName(guardReservedNames(metadata.name), NameType.Class);

  return {
    name,
    description: `An interface representing ${metadata.name}.`,
    serializedName: metadata.name,
    properties: obj.properties
      ? obj.properties.map(prop => transformProperty(prop))
      : []
  };
}

function getOperationParameters(codeModel: CodeModel): Parameter[] {
  return codeModel.operationGroups.reduce<Parameter[]>((acc, og) => {
    const params = og.operations.reduce<Parameter[]>((acc, operation) => {
      if (!operation.request.parameters) {
        return acc;
      }

      return [...acc, ...operation.request.parameters];
    }, []);

    return [...acc, ...params];
  }, []);
}

function getAllParameters(
  codeModel: CodeModel
): OperationRequestParameterDetails[] {
  const operationParams = getOperationParameters(codeModel);
  const globalParams = codeModel.globalParameters || [];
  const allParams = dedupeParams([...operationParams, ...globalParams]);
  return allParams.map(transformParameter);
}

function dedupeParams(params: Parameter[]) {
  return params.reduce<Parameter[]>((acc, curr) => {
    if (acc.some(a => getParameterName(a) === getParameterName(curr))) {
      return acc;
    }

    return [...acc, curr];
  }, []);
}

export function transformCodeModel(codeModel: CodeModel): ClientDetails {
  const className = normalizeName(codeModel.info.title, NameType.Class);

  return {
    name: codeModel.info.title,
    className,
    description: codeModel.info.description,
    sourceFileName: normalizeName(className, NameType.File),
    models: (codeModel.schemas.objects || []).map(transformObject),
    mappers: (codeModel.schemas.objects || []).map(schema =>
      transformMapper({ schema })
    ),
    unions: [
      ...(codeModel.schemas.choices || []),
      ...(codeModel.schemas.sealedChoices || [])
    ].map(transformChoice),
    operationGroups: codeModel.operationGroups.map(transformOperationGroup),
    parameters: getAllParameters(codeModel)
  };
}
