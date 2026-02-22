import { NameType, normalizeName } from "@azure-tools/rlc-common";
import { SourceFile } from "ts-morph";
import { getClassicalClientName } from "../../../src/modular/helpers/namingHelpers.js";
import { ModularEmitterOptions } from "../../../src/modular/interfaces.js";
import {
  SdkClientType,
  SdkServiceOperation
} from "@azure-tools/typespec-client-generator-core";
import { getModularClientOptions } from "../../../src/utils/clientUtils.js";
import { reportDiagnostic } from "../../../src/lib.js";
import { NoTarget } from "@typespec/compiler";
import { SdkContext } from "../../../src/utils/interfaces.js";

/**
 * Test utility for verifying client-file-not-found diagnostic.
 * This simulates the diagnostic reporting that occurs when a client file is missing.
 */
export function buildSubClientIndexFile(
  context: SdkContext,
  clientMap: [string[], SdkClientType<SdkServiceOperation>],
  emitterOptions: ModularEmitterOptions,
  project: any
): SourceFile | undefined {
  const [_, client] = clientMap;
  const { subfolder } = getModularClientOptions(clientMap);
  const srcPath = emitterOptions.modularOptions.sourceRoot;
  const subClientIndexFile = project.createSourceFile(
    `${srcPath}/${subfolder && subfolder !== "" ? subfolder + "/" : ""}index.ts`,
    undefined,
    { overwrite: true }
  );
  const clientName = `${getClassicalClientName(client)}`;
  const clientFilePath = `${srcPath}/${
    subfolder && subfolder !== "" ? subfolder + "/" : ""
  }${normalizeName(clientName, NameType.File)}.ts`;
  const clientFile = project.getSourceFile(clientFilePath);

  if (!clientFile) {
    reportDiagnostic(context.program, {
      code: "client-file-not-found",
      format: {
        filePath: clientFilePath
      },
      target: NoTarget
    });
    return undefined;
  }

  return subClientIndexFile;
}
