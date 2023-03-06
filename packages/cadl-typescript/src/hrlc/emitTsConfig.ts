import { File } from "@azure-tools/rlc-common";
import { Project } from "ts-morph";
import { HrlcCodeModel } from "./hrlcCodeModel.js";

export function emitTsConfig(
  project: Project,
  srcPath: string,
  codeModel: HrlcCodeModel,
  files: File[]
) {
  const tsConfig = project.createSourceFile(`${srcPath}/tsconfig.json`, "", {
    overwrite: true
  });
  const content = {
    extends: "../../../tsconfig.package",
    compilerOptions: {
      outDir: "./dist-esm",
      declarationDir: "./types",
      paths: {
        [`${
          codeModel.options?.packageDetails?.name ?? "@msinternal/unamedpackage"
        }`]: ["./src/index.js"]
      },
      module: "NodeNext",
      moduleResolution: "NodeNext",
      rootDir: "."
    },
    "ts-node": {
      esm: true
    },
    include: ["src/**/*.ts", "test/**/*.ts", "samples-dev/**/*.ts"]
  };
  tsConfig.addStatements(JSON.stringify(content));
  files.push({
    path: `${srcPath}/tsconfig.json`,
    content: tsConfig.getFullText()
  });
}
