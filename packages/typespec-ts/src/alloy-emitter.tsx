import { writeOutput } from "@typespec/emitter-framework";
import { Program } from "@typespec/compiler";
import { Project } from "ts-morph";
import { Output } from "./modular/components/Output.js";
import { Logger } from "./modular/components/Logger.js";
import { Models } from "./modular/components/Models.js";
import { TsMorphBridge } from "./modular/components/TsMorphBridge.js";
import { SdkContextProvider } from "./modular/components/context/SdkContextProvider.js";
import { ModularEmitterOptions } from "./modular/interfaces.js";
import { SdkContext } from "./utils/interfaces.js";
import { SdkTypeContext } from "./framework/hooks/sdkTypes.js";

/**
 * Emits ALL modular source files using the Alloy JSX pipeline.
 *
 * Pure Alloy components (no ts-morph):
 *   - Logger
 *   - Models (interfaces, enums, unions, type aliases)
 *
 * TsMorphBridge components (ts-morph output routed through Alloy):
 *   - Operations, OperationOptions, ClientContext, ClassicalClient,
 *     ClassicalOperationGroups, RestorePoller, Serializers,
 *     SubpathIndex, RootIndex, Samples
 *
 * As each bridged component is converted to pure JSX, it moves from
 * the bridge into the native component tree.
 */
export async function emitAlloyOutput(
  program: Program,
  emitterOutputDir: string,
  modularEmitterOptions: ModularEmitterOptions,
  modularSourcesRoot: string,
  dpgContext: SdkContext,
  sdkTypes: SdkTypeContext,
  tsMorphProject: Project
): Promise<void> {
  await writeOutput(
    program,
    <Output program={program}>
      <SdkContextProvider
        sdkContext={dpgContext}
        emitterOptions={modularEmitterOptions}
        sdkTypes={sdkTypes}
      >
        {/* Pure Alloy components */}
        <Logger
          emitterOptions={modularEmitterOptions}
          srcPath={modularSourcesRoot}
        />
        <Models context={dpgContext} sourceRoot={modularSourcesRoot} />

        {/* Bridge: ts-morph generated files rendered through Alloy */}
        <TsMorphBridge project={tsMorphProject} />
      </SdkContextProvider>
    </Output>,
    emitterOutputDir
  );
}
