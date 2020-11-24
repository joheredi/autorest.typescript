import { Project, VariableDeclarationKind } from "ts-morph";
import { ClientDetails } from "../models/clientDetails";

export function generateLoggerFile(
  clientDetails: ClientDetails,
  project: Project
) {
  const loggerFile = project.createSourceFile(
    `${clientDetails.srcPath}/logger.ts`,
    undefined,
    {
      overwrite: true
    }
  );

  loggerFile.addImportDeclarations([
    { namedImports: ["createClientLogger"], moduleSpecifier: "@azure/logger" }
  ]);

  loggerFile.addVariableStatement({
    isExported: true,
    declarationKind: VariableDeclarationKind.Const,
    docs: ["The @azure/logger configuration for this package."],
    declarations: [
      {
        name: "logger",
        initializer: `createClientLogger("$${clientDetails.name}");`
      }
    ]
  });
}
