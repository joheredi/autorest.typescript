// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Project } from "ts-morph";
import { NameType, normalizeName } from "../helpers/nameUtils.js";
import {
  hasPagingOperations,
  hasPollingOperations
} from "../helpers/operationHelpers.js";
import { getRelativePartFromSrcPath } from "../helpers/pathUtils.js";
import { RLCModel } from "../interfaces.js";

let hasPaging = false;
let hasLRO = false;
const clientFilePaths: string[] = [];

export function buildPackageFile(model: RLCModel) {
  const project = new Project();
  const filePath = "package.json";
  const packageJsonContents = restLevelPackage(model);
  // return direclty if no content generated
  if (!packageJsonContents) {
    return;
  }

  const packageFile = project.createSourceFile(
    filePath,
    JSON.stringify(packageJsonContents),
    {
      overwrite: true
    }
  );
  return {
    path: filePath,
    content: packageFile.getFullText()
  };
}

/**
 * This function defines the REST Level client package.json file
 * or High Level Client
 */
function restLevelPackage(model: RLCModel) {
  if (!model.options || !model.options.packageDetails) {
    return;
  }

  clientFilePaths.push(getClientFilePath(model));
  hasPaging = hasPaging || hasPagingOperations(model);
  hasLRO = hasLRO || hasPollingOperations(model);

  const {
    packageDetails,
    azureOutputDirectory,
    azureSdkForJs,
    isTypeSpecTest,
    sourceFrom,
    multiClient,
    batch,
    branded
  } = model.options;
  const { generateTest, generateSample } = model.options;
  if (
    multiClient &&
    batch &&
    batch.length > 1 &&
    clientFilePaths.length < batch.length
  ) {
    return;
  }
  const clientPackageName = packageDetails.name;
  let apiRefUrlQueryParameter: string = "";
  packageDetails.version = packageDetails.version ?? "1.0.0-beta.1";
  if (packageDetails.version.includes("beta")) {
    apiRefUrlQueryParameter = "?view=azure-node-preview";
  }

  const packageInfo: Record<string, any> = {
    name: `${packageDetails.name}`,
    "sdk-type": "client",
    author: "Microsoft Corporation",
    version: `${packageDetails.version}`,
    description:
      `${packageDetails.description}` ||
      `A generated SDK for ${model.libraryName}.`,
    keywords: ["node", "azure", "cloud", "typescript", "browser", "isomorphic"],
    license: "MIT",
    main: "./dist/commonjs/index.js",
    types: "./dist/commonjs/index.d.ts",
    exports: {
      "./package.json": "./package.json",
      ".": {
        browser: {
          types: "./dist/browser/index.d.ts",
          default: "./dist/browser/index.js"
        },
        "react-native": {
          types: "./dist/react-native/index.d.ts",
          default: "./dist/react-native/index.js"
        },
        import: {
          types: "./dist/esm/index.d.ts",
          default: "./dist/esm/index.js"
        },
        require: {
          types: "./dist/commonjs/index.d.ts",
          default: "./dist/commonjs/index.js"
        }
      }
    },
    tshy: {
      exports: {
        "./package.json": "./package.json",
        ".": "./src/index.ts"
      },
      dialects: ["esm", "commonjs"],
      esmDialects: ["browser", "react-native"]
    },
    repository: "github:Azure/azure-sdk-for-js",
    bugs: {
      url: "https://github.com/Azure/azure-sdk-for-js/issues"
    },
    files: ["dist/", "README.md", "LICENSE", "review/*"],
    engines: {
      node: ">=18.0.0"
    },
    scripts: {
      "build:browser": "echo skipped.",
      "build:node": "echo skipped.",
      "build:samples": "echo skipped.",
      "build:test": "echo skipped.",
      "build:debug": "echo skipped.",
      "check-format": `prettier --list-different --config ../../../.prettierrc.json --ignore-path ../../../.prettierignore "src/**/*.ts" "*.{js,json}" ${appendPathWhenFormat(
        generateTest,
        generateSample
      )}`,
      clean:
        "rimraf --glob dist dist-browser dist-esm test-dist temp types *.tgz *.log",
      "execute:samples": "echo skipped",
      "extract-api":
        "rimraf review && mkdirp ./review && api-extractor run --local",
      format: `prettier --write --config ../../../.prettierrc.json --ignore-path ../../../.prettierignore "src/**/*.ts" "*.{js,json}" ${appendPathWhenFormat(
        generateTest,
        generateSample
      )}`,
      "generate:client":
        sourceFrom === "Swagger"
          ? "autorest --typescript swagger/README.md && npm run format"
          : "echo skipped",
      "integration-test:browser": "echo skipped",
      "integration-test:node": "echo skipped",
      "integration-test": "echo skipped",
      "lint:fix": `eslint package.json api-extractor.json src ${appendPathWhenLint(
        generateTest
      )} --ext .ts --fix --fix-type [problem,suggestion]`,
      lint: `eslint package.json api-extractor.json src ${appendPathWhenLint(
        generateTest
      )} --ext .ts`,
      pack: "npm pack 2>&1",
      "test:browser": "echo skipped",
      "test:node": "echo skipped",
      test: 'echo "Error: no test specified" && exit 1',
      "unit-test": "echo skipped",
      "unit-test:node": "echo skipped",
      "unit-test:browser": "echo skipped"
    },
    sideEffects: false,
    autoPublish: false,
    dependencies: {
      "@azure/core-auth": "^1.6.0",
      "@azure-rest/core-client": "^1.2.0",
      "@azure/core-rest-pipeline": "^1.14.0",
      "@azure/logger": "^1.0.0",
      tslib: "^2.6.0",
      ...(hasPaging && {
        "@azure/core-paging": "^1.5.0"
      }),
      ...(hasLRO && {
        "@azure/core-lro": "^2.5.4",
        "@azure/abort-controller": "^1.0.0"
      }),
      ...(model.options.isModularLibrary && {
        "@azure/core-util": "^1.4.0"
      })
    },
    devDependencies: {
      "@microsoft/api-extractor": "^7.31.1",
      autorest: "latest",
      "@types/node": "^18.0.0",
      dotenv: "^16.0.0",
      eslint: "^8.0.0",
      mkdirp: "^2.1.2",
      prettier: "^3.2.5",
      rimraf: "^5.0.5",
      "source-map-support": "^0.5.9",
      typescript: "~5.3.3",
      tshy: "^1.11.1"
    }
  };

  if (azureOutputDirectory) {
    packageInfo.homepage = `https://github.com/Azure/azure-sdk-for-js/tree/main/${azureOutputDirectory}/README.md`;
  }

  if (azureSdkForJs) {
    packageInfo["//metadata"] = {
      constantPaths: []
    };
    clientFilePaths.forEach((path) => {
      packageInfo["//metadata"].constantPaths.push({
        path,
        prefix: "userAgentInfo"
      });
    });
    // Only generate this from Swagger spec
    if (sourceFrom === "Swagger") {
      packageInfo["//metadata"].constantPaths.push({
        path: "swagger/README.md",
        prefix: "package-version"
      });
    }
    packageInfo.scripts["build"] =
      "npm run clean && tshy && npm run extract-api";
    packageInfo.devDependencies["@azure/dev-tool"] = "^1.0.0";
    packageInfo.devDependencies["@azure/eslint-plugin-azure-sdk"] = "^3.0.0";
    // azsdkjs repo use dev-tool to run vendored prettier
    const dtxPrettierCmd = "dev-tool run vendored ";
    packageInfo.scripts["check-format"] =
      dtxPrettierCmd + packageInfo.scripts["check-format"];
    packageInfo.scripts["format"] =
      dtxPrettierCmd + packageInfo.scripts["format"];
    delete packageInfo.devDependencies.prettier;
  } else {
    packageInfo.scripts["build"] =
      "npm run clean && tshy &&  npm run extract-api";
    packageInfo.devDependencies["@rollup/plugin-commonjs"] = "^25.0.7";
    packageInfo.devDependencies["@rollup/plugin-json"] = "^6.0.1";
    packageInfo.devDependencies["@rollup/plugin-multi-entry"] = "^6.0.1";
    packageInfo.devDependencies["@rollup/plugin-inject"] = "^5.0.5";
    packageInfo.devDependencies["@rollup/plugin-node-resolve"] = "^15.2.3";
    packageInfo.devDependencies["rollup"] = "^4.0.0";
    packageInfo.devDependencies["rollup-plugin-polyfill-node"] = "^0.13.0";
    packageInfo.devDependencies["rollup-plugin-visualizer"] = "^5.9.3";
    packageInfo.devDependencies["@types/yargs"] = "^17.0.32";
  }

  if (isTypeSpecTest) {
    packageInfo["type"] = "module";
  }

  if (generateTest) {
    packageInfo.module = `./dist-esm/src/index.js`;
    packageInfo.devDependencies["@azure-tools/test-credential"] = "^1.0.0";
    packageInfo.devDependencies["@azure/identity"] = "^4.0.1";
    packageInfo.devDependencies["@azure-tools/test-recorder"] = "^3.0.0";
    packageInfo.devDependencies["cross-env"] = "^7.0.2";
    packageInfo.devDependencies["@types/chai"] = "^4.2.8";
    packageInfo.devDependencies["cross-env"] = "^7.0.2";
    packageInfo.devDependencies["c8"] = "^8.0.0";
    packageInfo.devDependencies["source-map-support"] = "^0.5.9";
    packageInfo.devDependencies["ts-node"] = "^10.0.0";
    packageInfo.scripts["test"] =
      "npm run clean && npm run build:test && npm run unit-test";
    packageInfo.scripts["test:node"] =
      "npm run clean && npm run build:test && npm run unit-test:node";
    packageInfo.scripts["test:browser"] =
      "npm run clean && npm run build:test && npm run unit-test:browser";
    packageInfo.scripts["build:browser"] =
      "tsc -p . && cross-env ONLY_BROWSER=true rollup -c 2>&1";
    packageInfo.scripts["build:node"] =
      "tsc -p . && cross-env ONLY_NODE=true rollup -c 2>&1";
    packageInfo.scripts["build:test"] = "tsc -p . && rollup -c 2>&1";
    packageInfo.scripts["unit-test"] =
      "npm run unit-test:node && npm run unit-test:browser";
    packageInfo.scripts["unit-test:node"] =
      // eslint-disable-next-line no-useless-escape
      `cross-env TS_NODE_COMPILER_OPTIONS="{\\\"module\\\":\\\"commonjs\\\"}" mocha -r esm --require ts-node/register --timeout 1200000 --full-trace "test/{,!(browser)/**/}*.spec.ts"`;
    packageInfo.scripts["unit-test:browser"] = "karma start --single-run";
    packageInfo.scripts["integration-test:browser"] =
      "karma start --single-run";
    packageInfo.scripts["integration-test:node"] =
      'nyc mocha -r esm --require source-map-support/register --timeout 5000000 --full-trace "dist-esm/test/{,!(browser)/**/}*.spec.js"';
    packageInfo.scripts["integration-test"] =
      "npm run integration-test:node && npm run integration-test:browser";

    if (azureSdkForJs) {
      packageInfo.scripts["build:test"] =
        "npm run clean && tshy && dev-tool run build-test";
      packageInfo.scripts["integration-test:browser"] =
        "npm run build:test && dev-tool run test:vitest --no-test-proxy --browser";
      packageInfo.scripts["unit-test:browser"] =
        "npm run build:test && dev-tool run test:vitest --no-test-proxy --browser";
      packageInfo.scripts["unit-test:node"] =
        "dev-tool run test:vitest --no-test-proxy";
      packageInfo.scripts["integration-test:node"] =
        "dev-tool run test:vitest --no-test-proxy";
    }

    packageInfo["browser"] = {
      "./dist-esm/test/public/utils/env.js":
        "./dist-esm/test/public/utils/env.browser.js"
    };
  }

  if (generateSample) {
    packageInfo["//sampleConfiguration"] = {
      productName: model.options.serviceInfo?.title ?? model.libraryName,
      productSlugs: ["azure"],
      disableDocsMs: true,
      apiRefLink: `https://docs.microsoft.com/javascript/api/${clientPackageName}${apiRefUrlQueryParameter}`
    };
    if (azureSdkForJs) {
      packageInfo.scripts["execute:samples"] =
        "dev-tool samples run samples-dev";
    }
  }

  if (!branded) {
    const runtimeLibVersion =
      model.importInfo.runtimeImports.commonFallback?.version ??
      "1.0.0-alpha.20231129.4";
    packageInfo.dependencies = {
      tslib: "^2.2.0",
      "@typespec/ts-http-runtime": runtimeLibVersion
    };
  }
  return packageInfo;
}

function appendPathWhenFormat(
  generateTest?: boolean,
  generateSample?: boolean
) {
  let path = "";
  if (generateTest) {
    path = path + ` "test/**/*.ts"`;
  }
  if (generateSample) {
    path = path + ` "samples-dev/**/*.ts"`;
  }
  return path;
}

function appendPathWhenLint(generateTest?: boolean) {
  return generateTest ? "test" : "";
}

function getClientFilePath(model: RLCModel) {
  const { srcPath } = model;
  const sdkReletivePart = getRelativePartFromSrcPath(srcPath);
  const clientFilename = normalizeName(model.libraryName, NameType.File);
  return sdkReletivePart
    ? `src/${sdkReletivePart}/${clientFilename}.ts`
    : `src/${clientFilename}.ts`;
}
