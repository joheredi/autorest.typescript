// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Project } from "ts-morph";

export function buildVitestConfig() {
  const project = new Project();
  const filePath = "vitest.config.ts";
  const configFile = project.createSourceFile(filePath, undefined, {
    overwrite: true
  });

  configFile.addImportDeclaration({
    moduleSpecifier: "vite/config",
    namedImports: ["defineConfig"]
  });

  // Define the configuration object
  const configObject = {
    test: {
      reporters: ["basic", "junit"],
      outputFile: {
        junit: "test-results.xml"
      },
      fakeTimers: {
        toFake: ["setTimeout", "Date"]
      },
      watch: false,
      include: ["test/**/*.spec.ts"],
      exclude: ["test/**/browser/*.spec.ts"],
      coverage: {
        include: ["src/**/*.ts"],
        exclude: [
          "src/**/*-browser.mts",
          "src/**/*-react-native.mts",
          "vitest*.config.ts",
          "samples-dev/**/*.ts"
        ],
        provider: "istanbul",
        reporter: ["text", "json", "html"],
        reportsDirectory: "coverage"
      }
    }
  };

  configFile.addExportAssignment({
    isExportEquals: false,
    expression: `defineConfig(${JSON.stringify(configObject, null, 2)})`
  });

  return {
    path: filePath,
    content: configFile.getFullText()
  };
}

export function buildVitestBrowserConfig() {
  const project = new Project();
  const filePath = "vitest.browser.config.ts";
  const configFile = project.createSourceFile(filePath, undefined, {
    overwrite: true
  });

  configFile.addImportDeclaration({
    moduleSpecifier: "vite/config",
    namedImports: ["defineConfig"]
  });

  // Define the configuration object
  const configObject = {
    test: {
      reporters: ["basic", "junit"],
      outputFile: {
        junit: "test-results.browser.xml"
      },
      browser: {
        enabled: true,
        headless: true,
        name: "chromium",
        provider: "playwright",
        slowHijackESM: false,
        providerOptions: {
          launch: {
            args: ["--disable-web-security"]
          }
        }
      },
      fakeTimers: {
        toFake: ["setTimeout", "Date"]
      },
      watch: false,
      include: ["dist-test/browser/**/*.spec.js"],
      coverage: {
        include: ["dist-test/browser/**/*.js"],
        exclude: [
          "dist-test/browser/**/*./*-browser.mjs",
          "dist-test/browser/**/*./*-react-native.mjs"
        ],
        provider: "istanbul",
        reporter: ["text", "json", "html"],
        reportsDirectory: "coverage-browser"
      }
    }
  };

  configFile.addExportAssignment({
    isExportEquals: false,
    expression: `defineConfig(${JSON.stringify(configObject, null, 2)})`
  });

  return {
    path: filePath,
    content: configFile.getFullText()
  };
}
