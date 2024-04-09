// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Project, SyntaxKind } from "ts-morph";
import { EmitterOptions } from "../index.js";
import { emitContentByBuilder } from "../utils/emitUtil.js";
import { SdkContext } from "../utils/interfaces.js";
import { buildClassicalClient } from "./buildClassicalClient.js";
import { buildClassicOperationFiles } from "./buildClassicalOperationGroups.js";
import { buildClientContext } from "./buildClientContext.js";
import { buildOperationFiles } from "./buildOperations.js";
import { buildPagingHelpers, buildPagingTypes } from "./buildPagingFiles.js";
import { buildSubClientIndexFile, buildRootIndex } from "./buildRootIndex.js";
import { buildSerializeUtils } from "./buildSerializeUtils.js";
import { buildSubpathIndexFile } from "./buildSubpathIndex.js";
import { buildModels, buildModelsOptions } from "./emitModels.js";
import { RLCModel } from "@azure-tools/rlc-common";
import { ModularCodeModel } from "./modularCodeModel.js";

export async function generateModularSources(
  dpgContext: SdkContext,
  modularCodeModel: ModularCodeModel,
  mappings: {
    serviceNameToRlcModelsMap: Map<string, RLCModel>;
    needUnexpectedHelper: Map<string, boolean>;
  },
  emitterOptions: EmitterOptions = {}
) {
  const { program } = dpgContext;

  if (!emitterOptions.isModularLibrary) {
    return;
  }

  // TODO: Emit modular parts of the library

  const { project } = modularCodeModel;
  const modularSourcesRoot =
    dpgContext.generationPathDetail?.modularSourcesDir ?? "src";
  const rootIndexFile = project.createSourceFile(
    `${modularSourcesRoot}/index.ts`,
    "",
    {
      overwrite: true
    }
  );

  const isMultiClients = modularCodeModel.clients.length > 1;
  for (const subClient of modularCodeModel.clients) {
    buildModels(modularCodeModel, subClient);
    buildModelsOptions(modularCodeModel, subClient);
    const hasClientUnexpectedHelper =
      mappings.needUnexpectedHelper.get(subClient.rlcClientName) ?? false;
    buildSerializeUtils(modularCodeModel);
    buildPagingTypes(modularCodeModel, subClient);
    buildPagingHelpers(
      modularCodeModel,
      subClient,
      hasClientUnexpectedHelper,
      isMultiClients
    );
    buildOperationFiles(
      dpgContext,
      modularCodeModel,
      subClient,
      hasClientUnexpectedHelper
    );
    buildClientContext(dpgContext, modularCodeModel, subClient);
    buildSubpathIndexFile(modularCodeModel, subClient, "models");
    if (dpgContext.rlcOptions?.hierarchyClient) {
      buildSubpathIndexFile(modularCodeModel, subClient, "api");
    } else {
      buildSubpathIndexFile(modularCodeModel, subClient, "api", {
        exportIndex: true
      });
    }

    buildClassicalClient(dpgContext, modularCodeModel, subClient);
    buildClassicOperationFiles(modularCodeModel, subClient);
    buildSubpathIndexFile(modularCodeModel, subClient, "classic", {
      exportIndex: true,
      interfaceOnly: true
    });
    if (isMultiClients) {
      buildSubClientIndexFile(modularCodeModel, subClient);
    }
    buildRootIndex(modularCodeModel, subClient, rootIndexFile);
  }

  if (!emitterOptions.generateOrphanModels) {
    removeUnusedInterfaces(project);
  }

  for (const file of project.getSourceFiles()) {
    await emitContentByBuilder(
      program,
      () => ({ content: file.getFullText(), path: file.getFilePath() }),
      modularCodeModel as any
    );
  }
}

function removeUnusedInterfaces(project: Project) {
  const allInterfaces = project.getSourceFiles().flatMap((file) =>
    file.getInterfaces().map((interfaceDeclaration) => {
      return { interfaceDeclaration, filepath: file.getFilePath() };
    })
  );

  const unusedInterfaces = allInterfaces.filter((interfaceDeclaration) => {
    const references = interfaceDeclaration.interfaceDeclaration
      .findReferencesAsNodes()
      .filter((node) => {
        const kind = node.getParent()?.getKind();
        return (
          kind !== SyntaxKind.ExportSpecifier &&
          kind !== SyntaxKind.InterfaceDeclaration
        );
      });
    return references.length === 0;
  });

  unusedInterfaces.forEach((interfaceDeclaration) => {
    const references = interfaceDeclaration.interfaceDeclaration
      .findReferencesAsNodes()
      .filter((node) => {
        const kind = node.getParent()?.getKind();
        return kind === SyntaxKind.ExportSpecifier;
      });
    const map = new Map<string, string>();
    references.forEach((node) => {
      const exportPath = node.getSourceFile().getFilePath();
      map.set(exportPath, node.getText());
    });

    // Get the index.ts file
    const indexFiles = project.getSourceFiles().filter((file) => {
      return file.getFilePath().endsWith("index.ts");
    }); // Adjust the path to your index.ts file
    // to make sure the top level index file is in the last
    const sortedIndexFiles = indexFiles.sort((idx1, idx2) => {
      return (
        idx2.getFilePath().split("/").length -
        idx1.getFilePath().split("/").length
      );
    });

    const matchAliasNodes: string[] = [];
    for (const indexFile of sortedIndexFiles) {
      const filepath = indexFile.getFilePath();
      if (map.has(filepath)) {
        // Get all export declarations
        const exportDeclarations = indexFile.getExportDeclarations();

        // Iterate over each export declaration
        exportDeclarations.forEach((exportDeclaration) => {
          // Find named exports that match the unused interface
          const matchingExports = exportDeclaration
            .getNamedExports()
            .filter((ne) => {
              const aliasNode = ne.getAliasNode();
              if (
                aliasNode &&
                aliasNode.getText() !== map.get(filepath) &&
                ne.getName() === map.get(filepath)
              ) {
                matchAliasNodes.push(aliasNode.getText());
              }
              return (
                matchAliasNodes.indexOf(ne.getName()) > -1 ||
                ne.getName() === map.get(filepath) ||
                ne.getAliasNode()?.getText() === map.get(filepath)
              );
            });
          // Remove the matching exports
          matchingExports.forEach((me) => me.remove());
        });
      }
    }
    interfaceDeclaration.interfaceDeclaration.remove();
  });
}
