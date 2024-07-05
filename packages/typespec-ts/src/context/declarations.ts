import { SourceFile } from "ts-morph";
import { useContext } from "../contextManager.js";
import { Type as TspType } from "@typespec/compiler";

export type DeclarationsContext = Map<string, Declaration[]>;

export interface Declaration {
  symbolName: string;
  kind:
    | "interface"
    | "enum"
    | "union"
    | "serializer"
    | "deserializer"
    | "operation";
  sourceFile: SourceFile;
}

export function useDeclarations() {
  const declarationsContext = useContext("declarations");

  function addDeclaration(type: TspType, declaration: Declaration) {
    const declarations = declarationsContext.get(type) || [];
    if (!declarations.some((d) => d.symbolName === declaration.symbolName)) {
      console.warn(
        "Duplicate declaration found for symbol: ",
        declaration.symbolName
      );
    }

    declarations.push(declaration);
    declarationsContext.set(type, declarations);
  }

  function getDeclaration(
    type: TspType,
    kind: Declaration["kind"]
  ): Declaration | undefined {
    const declarations = declarationsContext.get(type) || [];
    return declarations.find((d) => d.kind === kind);
  }

  return [addDeclaration, getDeclaration] as const;
}
