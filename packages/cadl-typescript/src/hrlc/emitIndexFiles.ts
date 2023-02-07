import { Project } from "ts-morph";

export function emitApiIndex(exports: string[], srcPath: string = "src") {
  const project = new Project();
  const indexFile = project.createSourceFile("index.ts");
  indexFile.addExportDeclarations(
    exports.map((e) => ({
      moduleSpecifier: `./${e}`
    }))
  );

  return {
    path: `${srcPath}/src/api/index.ts`,
    content: indexFile.getFullText()
  };
}
