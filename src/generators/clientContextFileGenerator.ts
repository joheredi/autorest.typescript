// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  Project,
  PropertyDeclarationStructure,
  ConstructorDeclaration,
  CodeBlockWriter,
  ClassDeclaration,
  SourceFile
} from "ts-morph";
import { normalizeName, NameType } from "../utils/nameUtils";
import { ClientDetails } from "../models/clientDetails";
import { PackageDetails } from "../models/packageDetails";
import { ParameterDetails } from "../models/parameterDetails";
import { ImplementationLocation, SchemaType } from "@azure-tools/codemodel";
import { BaseUrlDetails } from "../transforms/urlTransforms";
import { formatJsDocParam } from "./utils/parameterUtils";

export function generateClientContext(
  clientDetails: ClientDetails,
  packageDetails: PackageDetails,
  project: Project
) {
  const clientParams = clientDetails.parameters.filter(
    param => param.implementationLocation === ImplementationLocation.Client
  );
  const clientContextClassName = `${clientDetails.className}Context`;
  const clientContextFileName = normalizeName(
    clientContextClassName,
    NameType.File
  );

  const sourceFile = project.createSourceFile(
    `${clientDetails.srcPath}/${clientContextFileName}.ts`,
    undefined,
    {
      overwrite: true
    }
  );

  writeImports(sourceFile);
  writePackageInfo(sourceFile, packageDetails);

  const contextClass = buildClass(sourceFile, clientContextClassName);
  writeClassProperties(contextClass, clientParams);

  const classConstructor = buildConstructor(contextClass, {
    clientContextClassName,
    clientClassName: clientDetails.className,
    clientParams
  });

  writeConstructorBody(classConstructor, {
    clientParams,
    clientDetails
  });
}

interface WriteConstructorBodyParameters {
  clientParams: ParameterDetails[];
  clientDetails: ClientDetails;
}

function writeImports(sourceFile: SourceFile) {
  sourceFile.addImportDeclaration({
    namespaceImport: "coreHttp",
    moduleSpecifier: "@azure/core-http"
  });

  sourceFile.addImportDeclaration({
    namespaceImport: "Models",
    moduleSpecifier: "./models"
  });
}

function writePackageInfo(
  sourceFile: SourceFile,
  packageDetails: PackageDetails
) {
  sourceFile.addStatements([
    `\n\n`,
    `const packageName = "${packageDetails.name || ""}";`,
    `const packageVersion = "${packageDetails.version || ""}";`
  ]);
}

function writeClassProperties(
  contextClass: ClassDeclaration,
  clientParams: ParameterDetails[]
) {
  contextClass.addProperties(
    clientParams.map(param => {
      return {
        name: param.name,
        type: param.typeDetails.typeName,
        hasQuestionToken: !param.required
      } as PropertyDeclarationStructure;
    })
  );
}

function writeConstructorBody(
  classConstructor: ConstructorDeclaration,
  { clientParams, clientDetails }: WriteConstructorBodyParameters
) {
  const requiredParams = getRequiredParameters(clientParams);
  const addBlankLine = true;
  const requiredParameters = getRequiredParamAssignments(requiredParams);
  const constantParameters = getConstantClientParamAssignments(clientParams);
  classConstructor.addStatements([
    writeStatements(getRequiredParamChecks(requiredParams), addBlankLine),
    writeStatement(
      writeDefaultOptions(clientParams.some(p => p.name === "credentials"))
    ),
    writeStatement(getBaseUriStatement(clientDetails.baseUrl), addBlankLine),
    requiredParameters.length ? "// Parameter assignments" : "",
    writeStatements(getRequiredParamAssignments(requiredParams), addBlankLine),
    constantParameters.length
      ? "// Assigning values to Constant parameters"
      : "",
    writeStatements(constantParameters, addBlankLine)
  ]);
}

const writeStatement = (content: string, shouldAddBlankLine = false) => (
  writer: CodeBlockWriter
) => {
  if (content) {
    writer.writeLine(content);
    shouldAddBlankLine && writer.blankLine();
  }
};

const writeStatements = (lines: string[], shouldAddBlankLine = false) => (
  writer: CodeBlockWriter
) => {
  lines.forEach(line => writer.writeLine(line));
  shouldAddBlankLine && writer.blankLine();
};

function writeDefaultOptions(hasCredentials: boolean) {
  return `// Initializing default values for options
  if (!options) {
     options = {};
   }

  if (!options.userAgent) {
     const defaultUserAgent = coreHttp.getDefaultUserAgentValue();
     options.userAgent = \`\${packageName}/\${packageVersion} \${defaultUserAgent}\`;
   }
  
  super(${hasCredentials ? "credentials" : `undefined`}, options);
  
  this.requestContentType = "application/json; charset=utf-8";
  
  `;
}

function buildClass(sourceFile: SourceFile, clientContextClassName: string) {
  return sourceFile.addClass({
    name: clientContextClassName,
    extends: "coreHttp.ServiceClient",
    isExported: true
  });
}

interface BuildContructorParams {
  clientContextClassName: string;
  clientClassName: string;
  clientParams: ParameterDetails[];
}

function buildConstructor(
  contextClass: ClassDeclaration,
  {
    clientContextClassName,
    clientParams,
    clientClassName
  }: BuildContructorParams
) {
  const requiredParams = getRequiredParameters(clientParams);
  const hasClientOptionalParams = clientParams.some(p => !p.required);
  const docs = [
    `Initializes a new instance of the ${clientContextClassName} class.`,
    ...formatJsDocParam(requiredParams),
    `@param options The parameter options`
  ]
    .filter(d => !!d)
    .join("\n");

  const clientOptionsParameterType = hasClientOptionalParams
    ? `Models.${clientClassName}OptionalParams`
    : "coreHttp.ServiceClientOptions";
  return contextClass.addConstructor({
    docs: [docs],
    parameters: [
      ...requiredParams.map(p => ({
        name: p.name,
        type: p.typeDetails.typeName
      })),
      {
        name: "options",
        hasQuestionToken: true,
        type: clientOptionsParameterType
      }
    ]
  });
}

function getRequiredParameters(parameters: ParameterDetails[]) {
  /**
   * Getting parameters that are marked as required, and also don't have a defaultValue.
   * Constants are also exluded since they have defined value
   */
  return parameters.filter(
    p => p.required && p.schemaType !== SchemaType.Constant && !p.defaultValue
  );
}

function getBaseUriStatement(baseUrl: BaseUrlDetails) {
  const uri = baseUrl.baseUrl;
  return `this.baseUri = options.baseUri ${uri ? ` || "${uri}"` : ""};`;
}

function getConstantClientParamAssignments(
  clientParameters: ParameterDetails[]
) {
  return clientParameters
    .filter(p => !!p.defaultValue || p.schemaType === SchemaType.Constant)
    .map(
      ({ name, defaultValue }) =>
        `this.${name} = options.${name} ||  ${defaultValue}`
    );
}

function getRequiredParamChecks(requiredParameters: ParameterDetails[]) {
  return requiredParameters.map(
    ({ name }) => `if(${name} === undefined) {
    throw new Error("'${name}' cannot be null");
  }`
  );
}

function getRequiredParamAssignments(requiredParameters: ParameterDetails[]) {
  return requiredParameters.map(({ name }) => `this.${name} = ${name};`);
}
