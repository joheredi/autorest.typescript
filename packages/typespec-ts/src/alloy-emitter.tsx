import { writeOutput } from "@typespec/emitter-framework";
import { Program } from "@typespec/compiler";
import { Output } from "./modular/components/Output.js";
import { Logger } from "./modular/components/Logger.js";
import { Models } from "./modular/components/Models.js";
import { SdkContextProvider } from "./modular/components/context/SdkContextProvider.js";
import { ModularEmitterOptions } from "./modular/interfaces.js";
import { SdkContext } from "./utils/interfaces.js";
import { SdkTypeContext } from "./framework/hooks/sdkTypes.js";

/**
 * Emits files using the Alloy JSX pipeline.
 * This function is called from index.ts to render Alloy components
 * and write them to the output directory.
 */
export async function emitAlloyOutput(
  program: Program,
  emitterOutputDir: string,
  modularEmitterOptions: ModularEmitterOptions,
  modularSourcesRoot: string,
  dpgContext: SdkContext,
  sdkTypes: SdkTypeContext
): Promise<void> {
  await writeOutput(
    program,
    <Output program={program}>
      <SdkContextProvider
        sdkContext={dpgContext}
        emitterOptions={modularEmitterOptions}
        sdkTypes={sdkTypes}
      >
        <Logger
          emitterOptions={modularEmitterOptions}
          srcPath={modularSourcesRoot}
        />
        <Models context={dpgContext} sourceRoot={modularSourcesRoot} />
      </SdkContextProvider>
    </Output>,
    emitterOutputDir
  );
}
