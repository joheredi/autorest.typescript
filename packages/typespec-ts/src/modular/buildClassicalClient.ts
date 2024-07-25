import { NameType, normalizeName } from "@azure-tools/rlc-common";
import {
  ClassDeclarationStructure,
  MethodDeclarationStructure,
  Scope,
  SourceFile,
  StructureKind
} from "ts-morph";
import { isRLCMultiEndpoint } from "../utils/clientUtils.js";
import { SdkContext } from "../utils/interfaces.js";
import {
  getClientParameters,
  getUserAgentStatements
} from "./helpers/clientHelpers.js";
import { getDocsFromDescription } from "./helpers/docsHelpers.js";
import {
  getClassicalLayerPrefix,
  getClientName
} from "./helpers/namingHelpers.js";
import { getOperationFunction } from "./helpers/operationHelpers.js";
import { Client, ModularCodeModel } from "./modularCodeModel.js";
import { shouldPromoteSubscriptionId } from "./helpers/classicalOperationHelpers.js";
import {
  addDeclaration,
  ClientDeclarations
} from "../framework/declaration.js";
import { refkey } from "../framework/refkey.js";
import { resolveReference } from "../framework/reference.js";
import { CoreDependencies } from "../core/dependencies.js";

export function buildClassicalClient(
  client: Client,
  dpgContext: SdkContext,
  codeModel: ModularCodeModel
) {
  const { description } = client;
  const modularClientName = getClientName(client);
  const classicalClientName = `${getClientName(client)}Client`;
  const classicalParams = getClientParameters(client, dpgContext, true);
  const contextParams = getClientParameters(client, dpgContext, false);
  const srcPath = codeModel.modularOptions.sourceRoot;
  const subfolder = client.subfolder ?? "";

  const clientFile = codeModel.project.createSourceFile(
    `${srcPath}/${subfolder !== "" ? subfolder + "/" : ""}${normalizeName(
      classicalClientName,
      NameType.File
    )}.ts`
  );

  clientFile.addExportDeclaration({
    namedExports: [`${classicalClientName}OptionalParams`],
    moduleSpecifier: `./api/${normalizeName(
      modularClientName,
      NameType.File
    )}Context.js`
  });

  const clientClassDeclaration: ClassDeclarationStructure = {
    kind: StructureKind.Class,
    isExported: true,
    name: `${classicalClientName}`,
    properties: [],
    ctors: []
  };

  // Add the private client member. This will be the client context from /api
  if (isRLCMultiEndpoint(dpgContext)) {
    clientClassDeclaration.properties!.push({
      name: "_client",
      type: resolveReference(CoreDependencies.clientType),
      scope: Scope.Private
    });
  } else {
    clientClassDeclaration.properties!.push({
      name: "_client",
      type: resolveReference(CoreDependencies.clientType),
      scope: Scope.Private
    });
  }

  // Add the pipeline member. This will be the pipeline from /api
  clientClassDeclaration.properties!.push({
    name: "pipeline",
    type: resolveReference(CoreDependencies.restPipeline),
    scope: Scope.Public,
    isReadonly: true,
    docs: ["The pipeline used by this client to make requests"]
  });

  // TODO: We may need to generate constructor overloads at some point. Here we'd do that.
  const paramNames = (contextParams ?? []).map((p) => p.name);
  const { updatedParamNames, userAgentStatements } = getUserAgentStatements(
    "azsdk-js-client",
    paramNames
  );
  clientClassDeclaration.ctors!.push({
    docs: getDocsFromDescription(description),
    parameters: classicalParams,
    statements: [
      userAgentStatements,
      `this._client = create${modularClientName}(${updatedParamNames.join(
        ","
      )})`,
      `this.pipeline = this._client.pipeline`
    ]
  });
  buildClientOperationGroups(
    clientFile,
    client,
    dpgContext,
    clientClassDeclaration
  );

  addDeclaration(
    clientFile,
    clientClassDeclaration,
    refkey(client, ClientDeclarations.ClientClass)
  );

  return clientFile;
}

function buildClientOperationGroups(
  _clientFile: SourceFile,
  client: Client,
  dpgContext: SdkContext,
  clientClass: ClassDeclarationStructure
) {
  for (const operationGroup of client.operationGroups) {
    const groupName = normalizeName(
      operationGroup.namespaceHierarchies[0] ?? operationGroup.propertyName,
      NameType.Property
    );
    // TODO: remove this logic once client-level parameter design is finalized
    // https://github.com/Azure/autorest.typescript/issues/2618
    const hasSubscriptionIdPromoted = shouldPromoteSubscriptionId(
      dpgContext,
      operationGroup
    );
    if (groupName === "") {
      operationGroup.operations.forEach((op) => {
        const declarations = getOperationFunction(op, client);
        const method: MethodDeclarationStructure = {
          docs: declarations.docs,
          name: declarations.propertyName ?? declarations.name ?? "FIXME",
          kind: StructureKind.Method,
          returnType: declarations.returnType,
          parameters: declarations.parameters?.filter(
            (p) => p.name !== "context"
          ),
          statements: `return ${declarations.name}(${[
            "this._client",
            ...[
              declarations.parameters
                ?.map((p) => p.name)
                .filter((p) => p !== "context")
            ]
          ].join(",")})`
        };
        if (!clientClass.methods) {
          clientClass.methods = [];
        }
        clientClass.methods!.push(method);
      });
      continue;
    }
    const propertyType = `${getClassicalLayerPrefix(
      operationGroup,
      NameType.Interface,
      "",
      0
    )}Operations`;
    const existProperty = (clientClass.properties ?? []).filter((p) => {
      return p.name === groupName;
    });
    if (!existProperty || existProperty.length === 0) {
      clientClass.properties!.push({
        name: groupName,
        type: propertyType,
        scope: Scope.Public,
        isReadonly: true,
        docs: ["The operation groups for " + operationGroup.propertyName]
      });
      const firstConstructor = clientClass.ctors![0]!;
      if (!firstConstructor.statements) {
        firstConstructor.statements = [];
      }

      (firstConstructor.statements as string[]).push!(
        `this.${groupName} = get${getClassicalLayerPrefix(
          operationGroup,
          NameType.Interface,
          "",
          0
        )}Operations(this._client${
          hasSubscriptionIdPromoted ? ", subscriptionId" : ""
        })`
      );
    }
  }
}
