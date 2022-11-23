// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  InterfaceDeclarationStructure,
  OptionalKind,
  Project,
  StatementStructures,
  StructureKind,
  VariableDeclarationKind,
  VariableStatementStructure,
  WriterFunction
} from "ts-morph";
import * as path from "path";
import { NameType, normalizeName } from "./helpers/nameUtils.js";
import { isConstantSchema } from "./helpers/schemaHelpers.js";
import { buildMethodShortcutImplementation } from "./buildMethodShortcuts.js";
import { RLCModel, Schema, File, BuildClientOptions } from "./interfaces.js";
import { getClientOptionsInterface } from "./helpers/clientHelpers.js";
import { getClientFactoryBody } from "./helpers/rlcClientBody.js";

export function buildClient(
  model: RLCModel,
  options?: BuildClientOptions
): File | undefined {
  const bodyBuilder = options?.bodyBuilder ?? getClientFactoryBody;
  const name = normalizeName(model.libraryName, NameType.File);
  const { srcPath } = model;
  const project = new Project();
  const filePath = path.join(srcPath, `${name}.ts`);
  const clientFile = project.createSourceFile(filePath, undefined, {
    overwrite: true
  });

  // Get all paths
  const clientName = model.libraryName;
  const clientInterfaceName = clientName.endsWith("Client")
    ? `${clientName}`
    : `${clientName}Client`;

  const urlParameters = model?.urlInfo?.urlParameters?.filter(
    // Do not include parameters with constant values in the signature, these should go in the options bag
    (p) => p.value === undefined
  );

  const optionalUrlParameters = model?.urlInfo?.urlParameters?.filter(
    // Do not include parameters with constant values in the signature, these should go in the options bag
    (p) => Boolean(p.value)
  );

  const clientOptionsInterface = getClientOptionsInterface(
    clientInterfaceName,
    optionalUrlParameters
  );

  if (clientOptionsInterface) {
    clientFile.addInterface(clientOptionsInterface);
  }

  if (!model.options) {
    return undefined;
  }
  const { multiClient, batch } = model.options;
  const { addCredentials, credentialScopes, credentialKeyHeaderName } =
    model.options;
  const credentialTypes =
    credentialScopes && credentialScopes.length > 0 ? ["TokenCredential"] : [];

  if (credentialKeyHeaderName) {
    credentialTypes.push("KeyCredential");
  }

  const commonClientParams = [
    ...(urlParameters ?? []),
    ...(addCredentials === false ||
    !isSecurityInfoDefined(credentialScopes, credentialKeyHeaderName)
      ? []
      : [
          {
            name: "credentials",
            type: credentialTypes.join(" | "),
            clientName: "credentials"
          }
        ])
  ];

  const functionStatement = {
    isExported: true,
    name: `createClient`,
    parameters: [
      ...commonClientParams,
      {
        name: "options",
        type: `${clientOptionsInterface?.name ?? "ClientOptions"} = {}`
      }
    ],
    docs: [
      {
        description:
          `Initialize a new instance of the class ${clientInterfaceName} class. \n` +
          commonClientParams
            .map((param) => {
              return `@param ${param.name} type: ${param.type} ${
                param.description ?? ""
              }`;
            })
            .join("\n")
      }
    ],
    returnType: clientInterfaceName,
    isDefaultExport: false,
    statements: bodyBuilder(model, clientInterfaceName)
  };

  if (!multiClient || !batch || batch.length === 1) {
    functionStatement.isDefaultExport = true;
  }
  clientFile.addFunction(functionStatement);

  clientFile.addImportDeclarations([
    {
      namedImports: ["getClient", "ClientOptions"],
      moduleSpecifier: "@azure-rest/core-client"
    }
  ]);

  if (
    addCredentials &&
    isSecurityInfoDefined(credentialScopes, credentialKeyHeaderName)
  ) {
    clientFile.addImportDeclarations([
      {
        namedImports: credentialTypes,
        moduleSpecifier: "@azure/core-auth"
      }
    ]);
  }
  clientFile.addImportDeclarations([
    {
      namedImports: [`${clientInterfaceName}`],
      moduleSpecifier: "./clientDefinitions"
    }
  ]);
  return { path: filePath, content: clientFile.getFullText() };
}

function isSecurityInfoDefined(
  credentialScopes?: string[],
  credentialKeyHeaderName?: string
) {
  return (
    (credentialScopes && credentialScopes.length > 0) || credentialKeyHeaderName
  );
}
