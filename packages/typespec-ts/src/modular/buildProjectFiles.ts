import { NameType } from "@azure-tools/rlc-common";

import { ModularEmitterOptions } from "./interfaces.js";
import { getClassicalLayerPrefix } from "./helpers/namingHelpers.js";
import { SdkContext } from "@azure-tools/typespec-client-generator-core";
import {
  getClientHierarchyMap,
  getModularClientOptions
} from "../utils/clientUtils.js";
import { getMethodHierarchiesMap } from "../utils/operationUtil.js";
import path from "path/posix";
import { readdirSync } from "fs";

function buildExportsForMultiClient(
  context: SdkContext,
  emitterOptions: ModularEmitterOptions,
  packageInfo: any
) {
  const clientMap = getClientHierarchyMap(context);
  let hasTopLevelClient = false;
  for (const [hierarchy, client] of clientMap) {
    const methodMap = getMethodHierarchiesMap(context, client);
    if (hierarchy.length === 0) {
      hasTopLevelClient = true;
    }
    const { subfolder } = getModularClientOptions([hierarchy, client]);
    if (subfolder !== "" && methodMap.size > 0) {
      packageInfo.exports[`./${subfolder}`] = `./src/${subfolder}/index.ts`;

      packageInfo.exports[`./${subfolder}/api`] =
        `./src/${subfolder}/api/index.ts`;
    }
  }
  if (!hasTopLevelClient) {
    delete packageInfo.exports["./api"];
  }
  if (emitterOptions.options.hierarchyClient) {
    // TODO: support api subpath exports for multi-service. Skip for now. https://github.com/Azure/autorest.typescript/issues/3717
    if (!emitterOptions.options.isMultiService) {
      for (const flattenedClient of clientMap) {
        const { subfolder } = getModularClientOptions(flattenedClient);
        const client = flattenedClient[1];
        const methodMap = getMethodHierarchiesMap(context, client);
        for (const [prefixKey, _] of methodMap) {
          const prefixes = prefixKey.split("/");
          if (prefixKey === "") {
            continue;
          }
          const subApiPath = `api/${getClassicalLayerPrefix(
            prefixes,
            NameType.File,
            "/"
          )}`;
          packageInfo.exports[
            `./${subfolder ? subfolder + "/" : ""}${subApiPath}`
          ] = `src/${subfolder ? subfolder + "/" : ""}${subApiPath}/index.ts`;
        }
      }
    }
    delete packageInfo.exports["./models"];
    const modelSubpaths = getModelSubpaths(emitterOptions);
    for (const modelSubpath of modelSubpaths) {
      packageInfo.exports[`./${modelSubpath.replace("/index.ts", "")}`] =
        `./src/${modelSubpath}`;
    }
  }

  return packageInfo.exports;
}

export function getModuleExports(
  context: SdkContext,
  emitterOptions: ModularEmitterOptions
) {
  const exports: Record<string, any> = {
    exports: {
      ".": "./src/index.ts",
      "./models": "./src/models/index.ts"
    }
  };
  exports["exports"]["./api"] = "./src/api/index.ts";

  return buildExportsForMultiClient(context, emitterOptions, exports);
}

function getModelSubpaths(emitterOptions: ModularEmitterOptions) {
  const sourceRoot = emitterOptions.modularOptions.sourceRoot.replace(
    /\\/g,
    "/"
  );
  const modelsPath = path.join(sourceRoot, "models");
  const subpath = new Set<string>();

  // Recursively find all index.ts files under models/
  function findIndexFiles(dir: string) {
    try {
      const entries = readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          findIndexFiles(fullPath);
        } else if (entry.isFile() && entry.name === "index.ts") {
          const relativePath = path.relative(sourceRoot, fullPath);
          subpath.add(relativePath);
        }
      }
    } catch (err) {
      // If models directory doesn't exist, return empty array
    }
  }

  findIndexFiles(modelsPath);
  return Array.from(subpath);
}
