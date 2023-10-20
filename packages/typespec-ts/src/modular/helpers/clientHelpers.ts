import {
  OptionalKind,
  ParameterDeclarationStructure,
  SourceFile
} from "ts-morph";
import { Client } from "../modularCodeModel.js";
import { getType } from "./typeHelpers.js";
import { getClientName } from "./namingHelpers.js";

export function getClientParameters(
  client: Client
): OptionalKind<ParameterDeclarationStructure>[] {
  const { parameters } = client;
  const name = getClientName(client);
  const optionsParam = {
    name: "options",
    type: `${name}ClientOptions`,
    initializer: "{}"
  };

  const params: OptionalKind<ParameterDeclarationStructure>[] = [
    ...parameters
      .filter(
        (p) =>
          p.type.type !== "constant" &&
          (p.clientDefaultValue === null || p.clientDefaultValue === undefined)
      )
      .map<OptionalKind<ParameterDeclarationStructure>>((p) => {
        let typeName = getType(p.type, p.format).name;
        if (p.type.nullable) {
          typeName = `${typeName} | null`;
        }
        return {
          name: p.clientName,
          type: typeName
        };
      }),
    optionsParam
  ];

  return params;
}

export function importCredential(clientSourceFile: SourceFile): void {
  clientSourceFile.addImportDeclaration({
    moduleSpecifier: "@azure/core-auth",
    namedImports: ["TokenCredential", "KeyCredential"]
  });
}
