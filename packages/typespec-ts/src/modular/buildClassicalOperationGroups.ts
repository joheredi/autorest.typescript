import { NameType } from "@azure-tools/rlc-common";
import { SourceFile } from "ts-morph";
import { getClassicalOperation } from "./helpers/classicalOperationHelpers.js";
import { getClassicalLayerPrefix } from "./helpers/namingHelpers.js";
import { Client, ModularCodeModel } from "./modularCodeModel.js";
import { SdkContext } from "../utils/interfaces.js";

export function foo(dpgContext: SdkContext) {
  const { sdkPackage } = dpgContext;

  for (const client of sdkPackage.clients) {
    for (const member of client.methods) {
      if (member.kind === "clientaccessor") {
        console.log(`${member.name} is an operation group`);
      } else {
        console.log(`${member.name} is an operation of kind ${member.kind}`);
      }
    }
  }
}

export function buildClassicOperationFiles(
  dpgContext: SdkContext,
  codeModel: ModularCodeModel,
  client: Client
) {
  foo(dpgContext);
  const classicOperationFiles: Map<string, SourceFile> = new Map<
    string,
    SourceFile
  >();
  for (const operationGroup of client.operationGroups) {
    if (operationGroup.namespaceHierarchies.length > 0) {
      const classicOperationFileName =
        operationGroup.namespaceHierarchies.length > 0
          ? `${getClassicalLayerPrefix(
              operationGroup,
              NameType.File,
              "/",
              operationGroup.namespaceHierarchies.length - 1
            )}/index`
          : // When the program has no operation groups defined all operations are put
            // into a nameless operation group. We'll call this operations.
            "index";

      const subfolder = client.subfolder;
      const srcPath = codeModel.modularOptions.sourceRoot;
      const classicFile =
        classicOperationFiles.get(classicOperationFileName) ??
        codeModel.project.createSourceFile(
          `${srcPath}/${
            subfolder && subfolder !== "" ? subfolder + "/" : ""
          }classic/${classicOperationFileName}.ts`
        );
      getClassicalOperation(dpgContext, client, classicFile, operationGroup);
    }
  }
  for (const operationGroup of client.operationGroups) {
    if (operationGroup.namespaceHierarchies.length > 0) {
      for (
        let layer = 0;
        layer < operationGroup.namespaceHierarchies.length - 1;
        layer++
      ) {
        const classicOperationFileName =
          operationGroup.namespaceHierarchies.length > 0
            ? `${getClassicalLayerPrefix(
                operationGroup,
                NameType.File,
                "/",
                layer
              )}/index`
            : // When the program has no operation groups defined all operations are put
              // into a nameless operation group. We'll call this operations.
              "index";

        const subfolder = client.subfolder;
        const srcPath = codeModel.modularOptions.sourceRoot;
        const classicFile =
          classicOperationFiles.get(classicOperationFileName) ??
          codeModel.project.createSourceFile(
            `${srcPath}/${
              subfolder && subfolder !== "" ? subfolder + "/" : ""
            }classic/${classicOperationFileName}.ts`
          );
        getClassicalOperation(
          dpgContext,
          client,
          classicFile,
          operationGroup,
          layer
        );
        classicOperationFiles.set(classicOperationFileName, classicFile);
      }
    }
  }
  return classicOperationFiles;
}
