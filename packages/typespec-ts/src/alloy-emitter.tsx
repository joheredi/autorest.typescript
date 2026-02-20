import { writeOutput } from "@typespec/emitter-framework";
import { Program } from "@typespec/compiler";
import { Project } from "ts-morph";
import {
  SdkClientType,
  SdkServiceOperation
} from "@azure-tools/typespec-client-generator-core";
import { Output } from "./modular/components/Output.js";
import { Logger } from "./modular/components/Logger.js";
import { Models } from "./modular/components/Models.js";
import { RestorePoller } from "./modular/components/RestorePoller.js";
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
 *   - RestorePoller (LRO restore poller helpers)
 *
 * TsMorphBridge components (ts-morph output routed through Alloy):
 *   - Operations, OperationOptions, ClientContext, ClassicalClient,
 *     ClassicalOperationGroups, Serializers, SubpathIndex, RootIndex, Samples
 */
export async function emitAlloyOutput(
  program: Program,
  emitterOutputDir: string,
  modularEmitterOptions: ModularEmitterOptions,
  modularSourcesRoot: string,
  dpgContext: SdkContext,
  sdkTypes: SdkTypeContext,
  tsMorphProject: Project,
  clientMap: [string[], SdkClientType<SdkServiceOperation>][]
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
        {clientMap.map((subClient) => (
          <RestorePoller
            context={dpgContext}
            clientMap={subClient}
            emitterOptions={modularEmitterOptions}
          />
        ))}

        {/* Bridge: ts-morph generated files rendered through Alloy */}
        <TsMorphBridge project={tsMorphProject} />
      </SdkContextProvider>
    </Output>,
    emitterOutputDir
  );
}
