import {
  NameType,
  normalizeName,
  ReservedModelNames
} from "@azure-tools/rlc-common";
import {
  SdkClient,
  SdkHttpOperation,
  SdkServiceMethod
} from "@azure-tools/typespec-client-generator-core";
import * as path from "path";
import { toCamelCase, toPascalCase } from "../../utils/casingUtils.js";
import { SdkContext } from "../../utils/interfaces.js";
import {
  Client,
  ModularCodeModel,
  Operation,
  OperationGroup
} from "../modularCodeModel.js";
import { isDefined } from "../serialization/util.js";
import { useContext } from "../../contextManager.js";
import { getSdkClient } from "../../context/sdkTypes.js";

export function getClientName(client: Client) {
  return client.name.replace(/Client$/, "");
}

export interface GuardedName {
  name: string;
  fixme?: string[];
}

export function getOperationName(
  operation: Operation,
  options: { casing: "camel" | "pascal" } = { casing: "camel" }
): GuardedName {
  const casingFn = options.casing === "camel" ? toCamelCase : toPascalCase;
  if (isReservedName(operation.name, NameType.Operation)) {
    return {
      name: `$${operation.name}`,
      fixme: [
        `${operation.name} is a reserved word that cannot be used as an operation name. 
        Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript") 
        to the operation to override the generated name.`
      ]
    };
  }

  return {
    name: normalizeName(casingFn(operation.name), NameType.Operation, true)
  };
}

export function isReservedName(name: string, nameType: NameType): boolean {
  return ReservedModelNames.some(
    (reservedName) =>
      reservedName.name === name.toLowerCase() &&
      reservedName.reservedFor.includes(nameType)
  );
}

export function getClassicalLayerPrefix(
  operationGroup: SdkServiceMethod<SdkHttpOperation>,
  nameType: NameType,
  separator?: string,
  _layer?: number
): string;
export function getClassicalLayerPrefix(
  operationGroup: SdkServiceMethod<SdkHttpOperation> | Operation,
  nameType: NameType,
  separator?: string,
  _layer?: number
): string;
export function getClassicalLayerPrefix(
  operationGroup: OperationGroup | Operation,
  nameType: NameType,
  separator?: string,
  _layer?: number
): string;
export function getClassicalLayerPrefix(
  operationGroup: OperationGroup | Operation | SdkServiceMethod<SdkHttpOperation>,
  nameType: NameType,
  separator: string = "",
  _layer?: number
): string {
  let namespaceHierarchies: string[] = [];
  if ("namespaceHierarchies" in operationGroup) {
    namespaceHierarchies = operationGroup.namespaceHierarchies;
  } else {
    if (operationGroup.__raw) {
      const { tcgcContext } = useContext("emitContext");
      namespaceHierarchies = [];
      const client = getSdkClient(tcgcContext, operationGroup);
      namespaceHierarchies = [client!.name];
    }
  }

  const layer = _layer ?? namespaceHierarchies.length - 1;
  const prefix: string[] = [];
  if (layer < 0) {
    return prefix.join(separator);
  }
  if (layer === 0) {
    return normalizeName(namespaceHierarchies[0] ?? "", nameType);
  }
  for (let i = 0; i <= layer; i++) {
    prefix.push(normalizeName(namespaceHierarchies[i] ?? "", nameType));
  }
  return prefix.join(separator);
}

export function getRLCIndexFilePath(
  dpgContext: SdkContext,
  client: Client | SdkClient,
  ext: "js" | "ts" = "ts"
): string {
  return path.join(
    ...[
      dpgContext.generationPathDetail?.rlcSourcesDir,
      getSubfolder(client, dpgContext),
      `index.${ext}`
    ].filter(isDefined)
  );
}

export function getModularModelFilePath(
  codeModel: ModularCodeModel,
  client: Client | SdkClient,
  ext: "js" | "ts" = "ts"
): string {
  return path.join(
    ...[
      codeModel.modularOptions.sourceRoot,
      getSubfolder(client),
      "models",
      `models.${ext}`
    ].filter(isDefined)
  );
}

function getSubfolder(client: Client): string | undefined;
function getSubfolder(
  client: Client | SdkClient,
  dpgContext?: SdkContext
): string | undefined;
function getSubfolder(
  client: Client | SdkClient,
  dpgContext?: SdkContext
): string | undefined {
  return (
    (client as Client).subfolder ??
    (dpgContext?.rlcOptions!.batch && dpgContext?.rlcOptions!.batch?.length > 1
      ? normalizeName(client.name.replace("Client", ""), NameType.File)
      : undefined)
  );
}
