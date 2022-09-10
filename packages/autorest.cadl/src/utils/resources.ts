import {
  CodeModel,
  isObjectSchema,
  ObjectSchema,
  Operation,
  Schema,
  SchemaResponse,
} from "@autorest/codemodel";
import { getDataTypes } from "../dataTypes";
import { CadlResource } from "../interfaces";
import { transformDataType } from "../model";
import { getOptions } from "../options";
import {
  getPageableResponse,
  isPageableOperation,
  isPageValue,
} from "./paging";
import { isArraySchema } from "./schemas";

export function markResources(codeModel: CodeModel) {
  for (const operationGroup of codeModel.operationGroups) {
    for (const operation of operationGroup.operations) {
      const resource = getResourceKind(codeModel, operation);
      if (resource) {
        operation.language.default.resource = resource;
      }
    }
  }
}

function getResourceKind(
  codeModel: CodeModel,
  operation: Operation
): CadlResource | undefined {
  if (isPageableOperation(operation)) {
    return getPageableResource(codeModel, operation);
  }

  return undefined;
}

function getResourcePath(operation: Operation): string {
  for (const requests of operation.requests ?? []) {
    const path = requests.protocol.http?.path;
    if (path) {
      return path;
    }
  }

  throw new Error(
    `Couldn't find a resource path for operation ${operation.language.default.name}`
  );
}

function getPageableResource(
  codeModel: CodeModel,
  operation: Operation
): CadlResource {
  const response = getPageableResponse(operation) as SchemaResponse;
  if (isObjectSchema(response.schema)) {
    for (const property of response.schema.properties ?? []) {
      if (isPageValue(property) && isArraySchema(property.schema)) {
        const dataTypes = getDataTypes(codeModel);

        const elementType = property.schema.elementType;
        if (!isObjectSchema(elementType)) {
          throw new Error(
            `A Resource type has to be a model but got ${elementType.type}`
          );
        }

        markModelWithResource(elementType, getResourcePath(operation));
        markWithKey(elementType);

        let cadlResponse =
          dataTypes.get(elementType) ??
          transformDataType(elementType, codeModel);
        return {
          kind: "ResourceList",
          response: cadlResponse,
        };
      }
    }
  }

  throw new Error(
    `Couldn't determine the Pageable resource for the operation: ${operation.language.default.name}`
  );
}

function markModelWithResource(elementType: Schema, resource: string) {
  elementType.language.default.resource = resource;
}

function markWithKey({ properties }: ObjectSchema) {
  const { guessResourceKey } = getOptions();

  if (!guessResourceKey) {
    return;
  }

  const requiredProperties = properties?.filter((p) => p.required === true);

  if (!requiredProperties || !requiredProperties.length) {
    return;
  }

  for (const property of requiredProperties) {
    const serializedName = property.serializedName.toLowerCase();
    if (
      serializedName.endsWith("name") ||
      serializedName.endsWith("key") ||
      serializedName.endsWith("id")
    ) {
      property.language.default.isResourceKey = true;
      return;
    }
  }

  requiredProperties[0].language.default.isResourceKey = true;
}
