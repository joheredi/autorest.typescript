import { writeOutput } from "@typespec/emitter-framework";
import { Program } from "@typespec/compiler";
import { Output } from "./modular/components/Output.js";
import { Logger } from "./modular/components/Logger.js";
import { ModularEmitterOptions } from "./modular/interfaces.js";

/**
 * Emits files using the Alloy JSX pipeline.
 * This function is called from index.ts to render Alloy components
 * and write them to the output directory.
 */
export async function emitAlloyOutput(
  program: Program,
  emitterOutputDir: string,
  modularEmitterOptions: ModularEmitterOptions,
  modularSourcesRoot: string
): Promise<void> {
  await writeOutput(
    program,
    <Output program={program}>
      <Logger
        emitterOptions={modularEmitterOptions}
        srcPath={modularSourcesRoot}
      />
    </Output>,
    emitterOutputDir
  );
}
