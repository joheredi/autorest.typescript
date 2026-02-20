import { SourceDirectory } from "@alloy-js/core";
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
 *
 * Currently wired components (rendered via Alloy):
 *   - Logger (logger.ts)
 *   - Models (model interfaces, enums, unions, type aliases)
 *
 * Still on ts-morph pipeline (in index.ts generateModularSources):
 *   - Operations (buildOperationFiles)
 *   - OperationOptions (buildApiOptions)
 *   - ClientContext (buildClientContext)
 *   - ClassicalClient (buildClassicalClient)
 *   - ClassicalOperationGroups (buildClassicOperationFiles)
 *   - RestorePoller (buildRestorePoller)
 *   - Serializers (emitTypes - serialization portion)
 *   - SubpathIndex (buildSubpathIndexFile)
 *   - RootIndex (buildRootIndex)
 *   - Samples (emitSamples)
 *
 * Target state (once all phases complete):
 *   <Output program={program} externals={[httpRuntimeLib, ...]}>
 *     <SdkContextProvider ...>
 *       <SourceDirectory path={srcRoot}>
 *         <Logger />
 *         <Models />
 *         {clients.map(c => (
 *           <ClientDirectory>
 *             <OperationOptions />
 *             <Operations />
 *             <ClientContext />
 *             <ClassicalClient />
 *             <ClassicalOperationGroups />
 *             <RestorePoller />
 *           </ClientDirectory>
 *         ))}
 *         <RootIndex />
 *         <Samples />
 *       </SourceDirectory>
 *     </SdkContextProvider>
 *   </Output>
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
        <SourceDirectory path={modularSourcesRoot}>
          <Logger
            emitterOptions={modularEmitterOptions}
            srcPath={modularSourcesRoot}
          />
          <Models context={dpgContext} sourceRoot={modularSourcesRoot} />
        </SourceDirectory>
      </SdkContextProvider>
    </Output>,
    emitterOutputDir
  );
}
