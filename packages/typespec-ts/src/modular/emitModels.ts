import {
  SdkClientType,
  SdkHttpOperation,
  SdkMethod,
  SdkServiceMethod,
  SdkServiceOperation,
  SdkType
} from "@azure-tools/typespec-client-generator-core";
import { getExternalModel } from "./type-expressions/get-model-expression.js";

import { SdkContext } from "../utils/interfaces.js";
import { reportDiagnostic } from "../lib.js";
import { NoTarget } from "@typespec/compiler";
import {
  emitQueue,
  flattenPropertyModelMap,
  getAllOperationsFromClient
} from "../framework/hooks/sdkTypes.js";

// Pure utility functions extracted to model-utils.ts
export {
  normalizeModelName,
  getModelNamespaces,
  getModelsPath,
  getAdditionalPropertiesName,
  getApiVersionEnum,
  buildEnumTypes
} from "./model-utils.js";

// ====================================================================
// DELETED DEAD CODE - Lines 118-645 were deleted (emitTypes and helpers)
// emitTypes() was removed in Phase 8 (R7-R8) - replaced by Alloy components
// Functions used ts-morph Project, which is no longer available
// ====================================================================

export function visitPackageTypes(context: SdkContext) {
  const { sdkPackage } = context;
  emitQueue.clear();
  flattenPropertyModelMap.clear();
  // Add all models in the package to the emit queue
  for (const model of sdkPackage.models) {
    visitType(context, model);
  }

  for (const union of sdkPackage.unions) {
    visitType(context, union);
  }
  // Add all enums to the queue
  for (const enumType of sdkPackage.enums) {
    if (!emitQueue.has(enumType)) {
      emitQueue.add(enumType);
    }
  }

  // Visit the clients to discover all models
  for (const client of sdkPackage.clients) {
    visitClient(context, client);
  }
}

function visitClient(
  context: SdkContext,
  client: SdkClientType<SdkServiceOperation>
) {
  // TODO: include the client parameters
  // https://github.com/Azure/autorest.typescript/issues/3148
  // Comment this out for now, as client initialization is not used in the generated code
  getAllOperationsFromClient(client).forEach((method) =>
    visitClientMethod(context, method)
  );
}

function visitClientMethod(
  context: SdkContext,
  method: SdkMethod<SdkHttpOperation>
) {
  switch (method.kind) {
    case "lro":
    case "paging":
    case "lropaging":
    case "basic":
      visitMethod(context, method);
      visitOperation(context, method.operation);
      break;
    default:
      reportDiagnostic(context.program, {
        code: "unknown-sdk-method-kind",
        format: {
          methodKind: (method as any).kind
        },
        target: NoTarget
      });
      return; // Skip processing this method but continue with others
  }
}

function visitOperation(context: SdkContext, operation: SdkHttpOperation) {
  // Visit the request
  visitType(context, operation.bodyParam?.type);
  // Visit the response
  operation.exceptions.forEach((exception) =>
    visitType(context, exception.type)
  );

  operation.parameters.forEach((parameter) => {
    visitType(context, parameter.type);
  });

  operation.responses.forEach((response) => visitType(context, response.type));
}

function visitMethod(
  context: SdkContext,
  method: SdkServiceMethod<SdkHttpOperation>
) {
  // Visit the request
  method.parameters.forEach((parameter) => {
    visitType(context, parameter.type);
  });
  visitType(context, method.response.type);
}

function visitType(context: SdkContext, type: SdkType | undefined) {
  if (!type) {
    return;
  }

  if (emitQueue.has(type)) {
    return;
  }
  emitQueue.add(type);
  if (type.kind === "model") {
    const externalModel = getExternalModel(type);
    if (externalModel) {
      return;
    }

    if (type.additionalProperties) {
      visitType(context, type.additionalProperties);
    }
    for (const property of type.properties) {
      if (!emitQueue.has(property.type)) {
        visitType(context, property.type);
      }
      if (property.flatten && property.type.kind === "model") {
        flattenPropertyModelMap.set(property, type);
      }
    }
    if (type.discriminatedSubtypes) {
      for (const subType of Object.values(type.discriminatedSubtypes)) {
        if (!emitQueue.has(subType)) {
          visitType(context, subType);
        }
      }
    }
  }
  if (type.kind === "array") {
    if (!emitQueue.has(type.valueType)) {
      visitType(context, type.valueType);
    }
  }
  if (type.kind === "dict") {
    if (!emitQueue.has(type.valueType)) {
      visitType(context, type.valueType);
    }
  }
  if (type.kind === "union") {
    emitQueue.add(type);
    for (const value of type.variantTypes) {
      if (!emitQueue.has(value)) {
        visitType(context, value);
      }
    }
  }
  if (type.kind === "nullable") {
    emitQueue.add(type);
    if (!emitQueue.has(type.type)) {
      visitType(context, type.type);
    }
  }
}
