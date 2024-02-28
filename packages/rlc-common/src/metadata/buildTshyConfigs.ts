import { Project } from "ts-morph";
import { join as pathJoin } from "path";

export function buildTshyBrowser() {
  const project = new Project();
  const filePath = pathJoin(".tshy", "browser.json");
  const config = {
    extends: "./build.json",
    include: ["../src/**/*.ts", "../src/**/*.mts", "../src/**/*.tsx"],
    exclude: [],
    compilerOptions: {
      outDir: "../.tshy-build/browser"
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

export function buildTshyBuild() {
  const project = new Project();
  const filePath = pathJoin(".tshy", "build.json");
  const config = {
    extends: "../tsconfig.json",
    compilerOptions: {
      rootDir: "../src",
      target: "es2022",
      module: "nodenext",
      moduleResolution: "nodenext"
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

export function buildTshyCommonjs() {
  const project = new Project();
  const filePath = pathJoin(".tshy", "commonjs.json");
  const config = {
    extends: "./build.json",
    include: ["../src/**/*.ts", "../src/**/*.cts", "../src/**/*.tsx"],
    exclude: ["../src/**/*.mts"],
    compilerOptions: {
      outDir: "../.tshy-build/commonjs"
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

export function buildTshyEsm() {
  const project = new Project();
  const filePath = pathJoin(".tshy", "esm.json");
  const config = {
    extends: "./build.json",
    include: ["../src/**/*.ts", "../src/**/*.mts", "../src/**/*.tsx"],
    exclude: [],
    compilerOptions: {
      outDir: "../.tshy-build/esm"
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

export function buildTshyReactNative() {
  const project = new Project();
  const filePath = pathJoin(".tshy", "react-native.json");
  const config = {
    extends: "./build.json",
    include: ["../src/**/*.ts", "../src/**/*.mts", "../src/**/*.tsx"],
    exclude: [],
    compilerOptions: {
      outDir: "../.tshy-build/esm"
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
