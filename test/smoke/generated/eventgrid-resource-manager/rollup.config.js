/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import nodeResolve from "rollup-plugin-node-resolve";
import sourcemaps from "rollup-plugin-sourcemaps";

/**
 * @type {rollup.RollupFileOptions}
 */
const config = {
  input: "./esm/eventGridManagementClient.js",
  external: ["@azure/core-http", "@azure/core-arm"],
  output: {
    file: "./dist/eventgrid-resource-manager.js",
    format: "umd",
    name: "EventgridResourceManager",
    sourcemap: true,
    globals: {
      "@azure/core-http": "coreHttp",
      "@azure/core-arm": "coreArm"
    },
    banner: `/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */ `
  },
  plugins: [nodeResolve({ module: true }), sourcemaps()]
};

export default config;
