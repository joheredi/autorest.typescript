import { join } from "path";
import { EmitterOptions } from "../lib.js";
import { GenerationDirDetail } from "./interfaces.js";
import fsextra from "fs-extra";

export async function calculateGenerationDir(
  emitterOptions: EmitterOptions,
  emitterOutputDir: string = ""
): Promise<GenerationDirDetail> {
  const projectRoot = Boolean(emitterOutputDir)
    ? emitterOutputDir
    : process.cwd();
  let sourcesRoot = join(projectRoot, "src");
  const customizationFolder = join(projectRoot, "sources");
  if (await fsextra.pathExists(customizationFolder)) {
    sourcesRoot = join(customizationFolder, "generated", "src");
  }
  return {
    rootDir: projectRoot,
    metadataDir: projectRoot,
    rlcSourcesDir: join(
      sourcesRoot,
      emitterOptions.isModularLibrary ? "rest" : "" // When generating modular library, RLC has to go under rest folder
    ),
    modularSourcesDir: emitterOptions.isModularLibrary ? sourcesRoot : undefined
  };
}
