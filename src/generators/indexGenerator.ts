import { Project, SourceFile } from "ts-morph";
import { ClientDetails } from "../models/clientDetails";
import { getAutorestOptions, getSession } from "../autorestSession";
import { NameType, normalizeName } from "../utils/nameUtils";

export function generateIndexFile(
  project: Project,
  clientDetails?: ClientDetails
) {
  const { restLevelClient, srcPath } = getAutorestOptions();
  const indexFile = project.createSourceFile(`${srcPath}/index.ts`, undefined, {
    overwrite: true
  });

  if (!restLevelClient) {
    if (!clientDetails) {
      throw new Error(
        "ClientDetails are required when generating High Level Clients"
      );
    }
    generateHLCIndex(clientDetails, indexFile);
  } else {
    generateRLCIndex(indexFile);
  }
}

function generateRLCIndex(file: SourceFile) {
  const { model } = getSession();
  const clientName = model.language.default.name;
  const moduleName = normalizeName(clientName, NameType.File);

  file.addImportDeclaration({
    moduleSpecifier: `./${moduleName}`,
    defaultImport: clientName
  });

  file.addExportDeclarations([
    {
      moduleSpecifier: `./${moduleName}`
    },
    {
      moduleSpecifier: "./models"
    },
    {
      moduleSpecifier: "./parameters"
    },
    {
      moduleSpecifier: "./responses"
    }
  ]);

  file.addExportAssignment({
    expression: clientName,
    isExportEquals: false
  });
}

function generateHLCIndex(clientDetails: ClientDetails, file: SourceFile) {
  if (
    clientDetails.options.hasPaging &&
    !clientDetails.options.disablePagingAsyncIterators
  ) {
    file.addStatements([`/// <reference lib="esnext.asynciterable" />`]);
  }

  file.addExportDeclarations([
    {
      moduleSpecifier: "./models"
    },
    {
      moduleSpecifier: `./${clientDetails.sourceFileName}`,
      namedExports: [clientDetails.className]
    },
    {
      moduleSpecifier: `./${clientDetails.sourceFileName}Context`,
      namedExports: [`${clientDetails.className}Context`]
    }
  ]);
}
