// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Project } from "ts-morph";
import { getAutorestOptions } from "../../autorestSession";
import { ClientDetails } from "../../models/clientDetails";
import { PackageDetails } from "../../models/packageDetails";

export function generatePackageJson(
  project: Project,
  clientDetails?: ClientDetails
) {
  const {
    restLevelClient,
    generateMetadata,
    packageDetails
  } = getAutorestOptions();
  let packageJsonContents;

  if (!generateMetadata) {
    return;
  }

  if (!restLevelClient) {
    if (!clientDetails) {
      throw new Error(
        `Expected ClientDetails and PackageDetails to generate package.json`
      );
    }
    packageJsonContents = highLevelPackage(clientDetails, packageDetails);
  } else {
    packageJsonContents = restLevelPackage(packageDetails);
  }

  project.createSourceFile(
    "package.json",
    JSON.stringify(packageJsonContents),
    {
      overwrite: true
    }
  );
}

function restLevelPackage(packageDetails: PackageDetails) {
  return {
    name: `${packageDetails.name}`,
    version: `${packageDetails.version}`,
    description: `${packageDetails.description}`,
    main: "esm/index.js",
    types: "esm/index.d.ts",
    scripts: {
      regenerate:
        "autorest --reset && autorest --typescript --use=https://aka.ms/azsdk/typescript/rlc --rest-level-client=true https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/iothub/resource-manager/readme.md --credential-scopes=https://management.azure.com/.default --add-credentials=true --output-folder=. --generate-metadata=false",
      test: 'echo "Error: no test specified" && exit 1',
      build: "tsc --build && npm run extract-api",
      "extract-api": "mkdirp ./review && api-extractor run --local"
    },
    keywords: [],
    author: "",
    license: "ISC",
    dependencies: {
      "@azure-rest/core-client": "^1.0.3",
      "@azure/ai-text-analytics": "^5.0.1",
      "@azure/core-auth": "^1.1.4",
      "@azure/core-rest-pipeline": "^1.0.3",
      "@azure/identity": "^1.2.2",
      "@azure/storage-blob": "^12.5.0"
    },
    devDependencies: {
      autorest: "latest",
      "@microsoft/api-extractor": "^7.13.2",
      "@types/node": "^14.14.22",
      dotenv: "^8.2.0",
      prettier: "^2.2.1",
      "ts-node": "^9.1.1",
      typescript: "^4.1.5",
      mkdirp: "^1.0.4"
    }
  };
}

function highLevelPackage(
  clientDetails: ClientDetails,
  packageDetails: PackageDetails
) {
  const { srcPath } = getAutorestOptions();
  const hasLRO = clientDetails.operationGroups.some(og =>
    og.operations.some(o => o.isLRO)
  );
  const hasAsyncIterators =
    !clientDetails.options.disablePagingAsyncIterators &&
    clientDetails.options.hasPaging;

  return {
    name: packageDetails.name,
    author: "Microsoft Corporation",
    description:
      packageDetails.description ||
      `A generated SDK for ${clientDetails.name}.`,
    version: packageDetails.version,
    dependencies: {
      ...(hasLRO && { "@azure/core-lro": "^1.0.1" }),
      ...(hasAsyncIterators && { "@azure/core-paging": "^1.1.1" }),
      "@azure/core-http": "^1.1.4",
      ...(clientDetails.tracing && {
        "@azure/core-tracing": "1.0.0-preview.9",
        "@opentelemetry/api": "^0.10.2"
      }),

      tslib: "^1.9.3"
    },
    keywords: ["node", "azure", "typescript", "browser", "isomorphic"],
    license: "MIT",
    main: `./dist/${packageDetails.nameWithoutScope}.js`,
    module: `./esm/index.js`,
    types: `./esm/index.d.ts`,
    devDependencies: {
      typescript: "^3.1.1",
      rollup: "^0.66.2",
      "rollup-plugin-node-resolve": "^3.4.0",
      "rollup-plugin-sourcemaps": "^0.4.2",
      "uglify-js": "^3.4.9",
      "@microsoft/api-extractor": "7.9.10",
      mkdirp: "^1.0.4"
    },
    // TODO: Calculate the SDK path for the package
    homepage: `https://github.com/Azure/azure-sdk-for-js`,
    repository: {
      type: "git",
      url: "https://github.com/Azure/azure-sdk-for-js.git"
    },
    bugs: {
      url: "https://github.com/Azure/azure-sdk-for-js/issues"
    },
    files: [
      "dist/**/*.js",
      "dist/**/*.js.map",
      "dist/**/*.d.ts",
      "dist/**/*.d.ts.map",
      "esm/**/*.js",
      "esm/**/*.js.map",
      "esm/**/*.d.ts",
      "esm/**/*.d.ts.map",
      `${srcPath}/**/*.ts`,
      "README.md",
      "rollup.config.js",
      "tsconfig.json"
    ],
    scripts: {
      build:
        "tsc && rollup -c rollup.config.js && npm run minify && mkdirp ./review &&  npm run extract-api",
      minify: `uglifyjs -c -m --comments --source-map "content='./dist/${packageDetails.nameWithoutScope}.js.map'" -o ./dist/${packageDetails.nameWithoutScope}.min.js ./dist/${packageDetails.nameWithoutScope}.js`,
      prepack: "npm install && npm run build",
      "extract-api": "api-extractor run --local"
    },
    sideEffects: false,
    autoPublish: true
  };
}
