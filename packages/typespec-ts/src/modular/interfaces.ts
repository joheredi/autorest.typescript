import { RLCOptions } from "@azure-tools/rlc-common";
import { ServiceOperation } from "../utils/operationUtil.js";

export interface ModularOptions {
  sourceRoot: string;
  compatibilityMode: boolean;
  experimentalExtensibleEnums: boolean;
}
export interface ModularEmitterOptions {
  options: RLCOptions;
  modularOptions: ModularOptions;
}

export interface ModularClientOptions {
  subfolder?: string;
  rlcClientName: string;
}

export interface OperationPathAndDeserDetails {
  path: string;
  expectedStatusesExpression: string;
  deserName: string;
  renamedDeserName?: string;
  operation: ServiceOperation;
}
