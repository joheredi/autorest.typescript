import {
  SdkClientType,
  SdkContext,
  SdkHttpOperation,
  SdkPackage,
  SdkServiceMethod,
  SdkType
} from "@azure-tools/typespec-client-generator-core";
import { Operation, Type } from "@typespec/compiler";
import { provideContext, useContext } from "../contextManager.js";

export interface SdkTypeContext {
  operations: Map<Type, SdkServiceMethod<SdkHttpOperation>>;
  types: Map<Type, SdkType>;
}

export function useSdkTypes() {
  const sdkTypesContext = useContext("sdkTypes");

  function getSdkType(type: Operation): SdkServiceMethod<SdkHttpOperation>;
  function getSdkType(type: Type): SdkType;
  function getSdkType(
    type: Type | Operation
  ): SdkType | SdkServiceMethod<SdkHttpOperation> {
    let sdkType: SdkType | SdkServiceMethod<SdkHttpOperation> | undefined;

    if (type.kind === "Operation") {
      sdkType = sdkTypesContext.operations.get(type);
    } else {
      sdkType = sdkTypesContext.types.get(type);
    }

    if (!sdkType) {
      throw new Error(`SdkType not found for type: ${type}`);
    }

    return sdkType;
  }

  return getSdkType;
}

export function provideSdkTypes(sdkPackage: SdkPackage<SdkHttpOperation>) {
  const sdkTypesContext = {
    operations: new Map<Type, SdkServiceMethod<SdkHttpOperation>>(),
    types: new Map<Type, SdkType>()
  };

  for (const sdkEnum of sdkPackage.enums) {
    if (!sdkEnum.__raw) {
      continue;
    }

    sdkTypesContext.types.set(sdkEnum.__raw, sdkEnum);
  }

  for (const sdkModel of sdkPackage.models) {
    if (!sdkModel.__raw) {
      continue;
    }

    sdkTypesContext.types.set(sdkModel.__raw, sdkModel);
  }

  for (const client of sdkPackage.clients) {
    for (const method of getAllOperationsFromClient(client)) {
      if (!method.__raw) {
        continue;
      }

      sdkTypesContext.operations.set(method.__raw, method);
    }
  }

  provideContext("sdkTypes", sdkTypesContext);
}

function getAllOperationsFromClient(client: SdkClientType<SdkHttpOperation>) {
  const methodQueue = [...client.methods];
  const operations: SdkServiceMethod<SdkHttpOperation>[] = [];
  while (methodQueue.length > 0) {
    const method = methodQueue.pop()!;
    if (method.kind === "clientaccessor") {
      method.response.methods.forEach((m) => methodQueue.push(m));
    } else {
      operations.push(method);
    }
  }

  return operations;
}

export function getSdkClient(
  context: SdkContext,
  methodToCheck: SdkServiceMethod<SdkHttpOperation>
): SdkClientType<SdkHttpOperation> | undefined {
  for (const client of context.experimental_sdkPackage.clients) {
    for (const method of client.methods) {
      if (method.kind === "clientaccessor") {
        for (const serviceMethod of method.response.methods) {
          if (
            serviceMethod.__raw &&
            serviceMethod.__raw === methodToCheck.__raw
          ) {
            return method.response;
          }
        }
      } else {
        if (method.__raw && method.__raw === methodToCheck.__raw) {
          return client;
        }
      }
    }
  }
  return undefined;
}
