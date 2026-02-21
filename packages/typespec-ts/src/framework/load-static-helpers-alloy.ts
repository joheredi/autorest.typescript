import { readdir, stat, readFile } from "fs/promises";
import * as path from "path";
import { SourceFile } from "ts-morph";
import { resolveProjectRoot } from "../utils/resolve-project-root.js";
import { isAzurePackage } from "@azure-tools/rlc-common";
import { ModularEmitterOptions } from "../modular/interfaces.js";

const DEFAULT_STATIC_HELPERS_PATH = "static/static-helpers";

// Types for legacy test infrastructure compatibility
export const SourceFileSymbol = Symbol("SourceFile");
export interface StaticHelperMetadata {
  name: string;
  kind: "function" | "interface" | "typeAlias" | "class" | "enum";
  location: string;
  [SourceFileSymbol]?: SourceFile;
}

export interface LoadStaticHelpersAlloyOptions extends Partial<ModularEmitterOptions> {
  helpersAssetDirectory?: string;
}

/**
 * File-reading utility for static helper files.
 *
 * Reads all .ts files from static/static-helpers/ recursively.
 * For non-Azure packages, rewrites imports:
 *   - '@azure/core-rest-pipeline' → '@typespec/ts-http-runtime'
 *   - '@azure-rest/core-client' → '@typespec/ts-http-runtime'
 *
 * Returns Map<string, string> where keys are output-relative paths
 * like "static-helpers/pagingHelpers.ts" and values are file contents.
 *
 * Uses resolveProjectRoot() to find static/static-helpers/ directory.
 *
 * Example usage:
 * ```ts
 * const files = await loadStaticHelpersAlloy({ options: rlcOptions });
 * <StaticHelperFiles files={files} />
 * ```
 */
export async function loadStaticHelpersAlloy(
  options: LoadStaticHelpersAlloyOptions = {}
): Promise<Map<string, string>> {
  const helpersMap = new Map<string, string>();
  const defaultStaticHelpersPath = path.join(
    resolveProjectRoot(),
    DEFAULT_STATIC_HELPERS_PATH
  );
  const files = await traverseDirectory(
    options.helpersAssetDirectory ?? defaultStaticHelpersPath
  );

  const isAzure = isAzurePackage({ options: options.options });

  for (const file of files) {
    let contents = await readFile(file.source, "utf-8");

    // Apply Azure import rewriting if not an Azure package
    if (!isAzure) {
      contents = contents
        .replace(/@azure\/core-rest-pipeline/g, "@typespec/ts-http-runtime")
        .replace(/@azure-rest\/core-client/g, "@typespec/ts-http-runtime");
    }

    helpersMap.set(file.target, contents);
  }

  return helpersMap;
}

const _targetStaticHelpersBaseDir = "static-helpers";

async function traverseDirectory(
  directory: string,
  result: { source: string; target: string }[] = [],
  relativePath: string = ""
): Promise<{ source: string; target: string }[]> {
  const files = await readdir(directory);

  await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(directory, file);
      const fileStat = await stat(filePath);

      if (fileStat.isDirectory()) {
        await traverseDirectory(
          filePath,
          result,
          path.join(relativePath, file)
        );
      } else if (
        fileStat.isFile() &&
        !file.endsWith(".d.ts") &&
        /.*\..?ts$/.test(file)
      ) {
        const target = path.join(
          _targetStaticHelpersBaseDir,
          relativePath,
          file
        );
        result.push({ source: filePath, target });
      }
    })
  );

  return result;
}
