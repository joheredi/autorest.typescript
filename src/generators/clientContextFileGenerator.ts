// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Project, Scope } from "ts-morph";
import { normalizeName, NameType } from "../utils/nameUtils";
import { ClientDetails } from "../models/clientDetails";
import { PackageDetails } from "../models/packageDetails";
import { ParameterLocation, Parameter } from "@azure-tools/codemodel";
import { OperationRequestParameterDetails } from "../models/operationDetails";

export function generateClientContext(
  clientDetails: ClientDetails,
  packageDetails: PackageDetails,
  project: Project
) {
  const clientContextClassName = `${clientDetails.className}Context`;
  const clientContextFileName = normalizeName(
    clientContextClassName,
    NameType.File
  );

  const sourceFile = project.createSourceFile(
    `src/${clientContextFileName}.ts`,
    undefined,
    {
      overwrite: true
    }
  );

  sourceFile.addImportDeclaration({
    namespaceImport: "coreHttp",
    moduleSpecifier: "@azure/core-http"
  });

  sourceFile.addImportDeclaration({
    namespaceImport: "Models",
    moduleSpecifier: "./models"
  });

  sourceFile.addStatements([
    `\n\n`,
    `const packageName = "${packageDetails.name}";`,
    `const packageVersion = "${packageDetails.version}";`
  ]);

  const contextClass = sourceFile.addClass({
    name: clientContextClassName,
    extends: "coreHttp.ServiceClient",
    isExported: true
  });

  const globalParams = clientDetails.parameters.filter(p => p.isGlobal);

  // throw new Error(JSON.stringify(clientDetails.parameters));
  globalParams.forEach(param => {
    contextClass.addProperty({
      name: `${param.name}`,
      type: "string",
      hasQuestionToken: !param.required
    });
  });

  const requiredParams = globalParams.filter(p => p.required);
  const optionalParams = globalParams.filter(p => !p.required);

  const classConstructor = contextClass.addConstructor({
    docs: [
      `Initializes a new instance of the ${clientContextClassName} class.\n
@param options The parameter options`
    ],
    parameters: [
      ...requiredParams.map(p => ({
        name: p.name,
        type: "any"
      })),
      {
        name: "options",
        hasQuestionToken: true,
        type: "any" // TODO: Use the correct type from models `Models.${clientDetails.className}Options`
      }
    ]
  });

  // This could all be expressed as one string template, but we may need to
  // optionally skip some segments based on generation options
  classConstructor.addStatements([
    `if (!options) {
       options = {};
     }`,
    `if (!options.userAgent) {
       const defaultUserAgent = coreHttp.getDefaultUserAgentValue();
       options.userAgent = \`\${packageName}/\${packageVersion} \${defaultUserAgent}\`;
     }\n`,
    `super(undefined, options);\n\n`,
    `this.baseUri = options.baseUri || this.baseUri || "http://localhost:3000";
     this.requestContentType = "application/json; charset=utf-8";`,
    ...requiredParams.map(getRequiredParamAssignment),
    ...optionalParams.map(getOptionalParamAssignment)
  ]);
}

function getRequiredParamAssignment(
  parameter: OperationRequestParameterDetails
): string {
  return `this.${parameter.name} = ${parameter.name}`;
}

function getOptionalParamAssignment({
  name
}: OperationRequestParameterDetails) {
  return `if (options.${name} !== null && options.${name} !== undefined) {
      this.${name} = options.${name};
    }`;
}
