// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Project } from "ts-morph";
import { RLCModel } from "../interfaces.js";

const restLevelTsConfigInAzureSdkForJs: Record<string, any> = {
  extends: "../../../tsconfig.package",
  compilerOptions: {
    module: "NodeNext",
    moduleResolution: "NodeNext",
    rootDir: "."
  },
  include: ["./src/**/*.ts", "./src/**/*.mts", "./test/**/*.ts"]
};

const restLevelTsConfigNotInAzureSdkForJs: Record<string, any> = {
  compilerOptions: {
    target: "ES2017",
    module: "NodeNext",
    lib: [],
    declaration: true,
    declarationMap: true,
    inlineSources: true,
    sourceMap: true,
    importHelpers: true,
    strict: true,
    alwaysStrict: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
    noImplicitReturns: true,
    noFallthroughCasesInSwitch: true,
    forceConsistentCasingInFileNames: true,
    moduleResolution: "NodeNext",
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    rootDir: "."
  },
  include: ["./src/**/*.ts", "./src/**/*.mts", "./test/**/*.ts"]
};

export function buildTsConfigBrowser(model: RLCModel) {
  const project = new Project();
  const filePath = "tsconfig.browser.config.json";

  const config = {
    extends: "./.tshy/build.json",
    include: ["./src/**/*.ts", "./src/**/*.mts", "./test/**/*.spec.ts"],
    exclude: ["./test/**/node/**/*.ts"],
    compilerOptions: {
      outDir: "./dist-test/browser",
      rootDir: ".",
      skipLibCheck: true
    }
  };

  const configFile = project.createSourceFile(
    filePath,
    JSON.stringify(config),
    {
      overwrite: true
    }
  );
  return {
    path: filePath,
    content: configFile.getFullText()
  };
}

export function buildTsConfig(model: RLCModel) {
  const { packageDetails, azureSdkForJs } = model.options || {};
  const { generateTest, generateSample } = model.options || {};
  // Take the undefined as true by default
  const clientPackageName = packageDetails?.name ?? "";
  const project = new Project();

  const restLevelTsConfig = azureSdkForJs
    ? restLevelTsConfigInAzureSdkForJs
    : restLevelTsConfigNotInAzureSdkForJs;

  if (generateTest) {
    restLevelTsConfig.include.push("./test/**/*.ts");
  }
  if (generateSample) {
    restLevelTsConfig.include.push("samples-dev/**/*.ts");
    restLevelTsConfig.compilerOptions["paths"] = {};
    restLevelTsConfig.compilerOptions["paths"][clientPackageName] = [
      "./src/index.ts"
    ];
  }

  const filePath = "tsconfig.json";
  const configFile = project.createSourceFile(
    filePath,
    JSON.stringify(restLevelTsConfig),
    {
      overwrite: true
    }
  );
  return {
    path: filePath,
    content: configFile.getFullText()
  };
}
