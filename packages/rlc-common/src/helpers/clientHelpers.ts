import { InterfaceDeclarationStructure, OptionalKind } from "ts-morph";
import { PathParameter } from "../interfaces";

export function getClientOptionsInterface(
  clientName: string,
  optionalUrlParameters?: PathParameter[]
): OptionalKind<InterfaceDeclarationStructure> | undefined {
  if (!optionalUrlParameters || optionalUrlParameters.length === 0) {
    return undefined;
  }

  const properties = optionalUrlParameters.map((param) => {
    return {
      name: param.name,
      type: param.type,
      hasQuestionToken: true
    };
  });

  return {
    name: `${clientName}Options`,
    extends: ["ClientOptions"],
    isExported: true,
    properties
  };
}
