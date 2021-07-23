// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as prettier from "prettier";
import { CodeModel } from "@autorest/codemodel";
import { Project, IndentationText } from "ts-morph";
import { Host } from "@autorest/extension-base";
import { transformCodeModel } from "./transforms/transforms";
import { ClientDetails } from "./models/clientDetails";
import { generateClient } from "./generators/clientFileGenerator";
import { generateClientContext } from "./generators/clientContextFileGenerator";
import { generateModels } from "./generators/modelsGenerator";
import { generateMappers } from "./generators/mappersGenerator";
import { generateIndexFile } from "./generators/indexGenerator";
import { generatePackageJson } from "./generators/static/packageFileGenerator";
import { generateApiExtractorConfig } from "./generators/static/apiExtractorConfig";
import { generateLicenseFile } from "./generators/static/licenseFileGenerator";
import { generateReadmeFile } from "./generators/static/readmeFileGenerator";
import { generateTsConfig } from "./generators/static/tsConfigFileGenerator";
import { generateRollupConfig } from "./generators/static/rollupConfigFileGenerator";
import { generateOperations } from "./generators/operationGenerator";
import { generateOperationsInterfaces } from "./generators/operationInterfaceGenerator";
import { generateParameters } from "./generators/parametersGenerator";
import { generateLroFiles } from "./generators/LROGenerator";
import { generateTracingFile } from "./generators/tracingFileGenerator";
import { getAutorestOptions } from "./autorestSession";

const prettierTypeScriptOptions: prettier.Options = {
  parser: "typescript",
  arrowParens: "always",
  bracketSpacing: true,
  endOfLine: "lf",
  printWidth: 80,
  semi: true,
  singleQuote: false,
  tabWidth: 2
};

const prettierJSONOptions: prettier.Options = {
  parser: "json",
  tabWidth: 2,
  semi: false,
  singleQuote: false
};

export async function generateTypeScriptLibrary(
  codeModel: CodeModel,
  host: Host
): Promise<void> {
  const project = new Project({
    useInMemoryFileSystem: true,
    manipulationSettings: {
      indentationText: IndentationText.TwoSpaces
    }
  });

  const {
    packageDetails,
    licenseHeader: shouldGenerateLicense
  } = getAutorestOptions();

  const clientDetails = await transformCodeModel(codeModel, host);

  clientDetails.operationGroups.forEach(operationGroup => {
    const isConflict: boolean = checkForConflictWithDefinitions(
      operationGroup.name,
      clientDetails
    );

    if (isConflict) {
      operationGroup.operations.forEach(operation => {
        operation.typeDetails.typeName = operation.typeDetails.typeName.replace(
          operationGroup.name,
          `${operationGroup.name}Operations`
        );
      });
      operationGroup.name = `${operationGroup.name}Operations`;
      operationGroup.key = `${operationGroup.key}Operations`;
    }
  });

  // Skip metadata generation if `generate-metadata` is explicitly false
  generatePackageJson(project, clientDetails);
  generateLicenseFile(project);
  generateReadmeFile(clientDetails, project);
  generateTsConfig(project);
  generateRollupConfig(project);
  generateApiExtractorConfig(project);

  generateClient(clientDetails, project);
  generateClientContext(clientDetails, packageDetails, project);
  generateModels(clientDetails, project);

  generateMappers(clientDetails, project);
  generateOperations(clientDetails, project);
  generateOperationsInterfaces(clientDetails, project);
  generateParameters(clientDetails, project);
  generateIndexFile(project, clientDetails);
  await generateLroFiles(clientDetails, project);
  generateTracingFile(project);

  const licenseHeader = `
/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
`;

  // Save the source files to the virtual filesystem
  project.saveSync();
  const fs = project.getFileSystem();

  // Loop over the files
  for (const file of project.getSourceFiles()) {
    const filePath = file.getFilePath();
    const isJson = /\.json$/gi.test(filePath);
    const isSourceCode = /\.(ts|js)$/gi.test(filePath);
    let fileContents = fs.readFileSync(filePath);

    // Add the license header to source code files
    if (shouldGenerateLicense && isSourceCode) {
      fileContents = `${licenseHeader.trimLeft()}\n${fileContents}`;
    }

    // Format the contents if necessary
    if (isJson || isSourceCode) {
      fileContents = prettier.format(
        fileContents,
        isJson ? prettierJSONOptions : prettierTypeScriptOptions
      );
    }

    // Write the file to the AutoRest host
    host.WriteFile(
      filePath.substr(1), // Get rid of the leading slash '/'
      fileContents
    );
  }
}

function checkForConflictWithDefinitions(
  operationGroupName: string,
  clientDetails: ClientDetails
): boolean {
  let conflict: boolean = false;
  clientDetails.objects.forEach(model => {
    if (model.name === operationGroupName) {
      conflict = true;
    }
  });
  return conflict;
}
