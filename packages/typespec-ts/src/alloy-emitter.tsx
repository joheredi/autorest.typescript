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
import { ClientContext } from "./modular/components/ClientContext.js";
import { ClassicalClient } from "./modular/components/ClassicalClient.js";
import { ClassicalOperationGroups } from "./modular/components/ClassicalOperationGroups.js";
import { RootIndex } from "./modular/components/RootIndex.js";
import { SubpathIndex } from "./modular/components/SubpathIndex.js";
import { Samples } from "./modular/components/Samples.js";
import { TsMorphBridge } from "./modular/components/TsMorphBridge.js";
import { SdkContextProvider } from "./modular/components/context/SdkContextProvider.js";
import { ModularEmitterOptions } from "./modular/interfaces.js";
import { SdkContext } from "./utils/interfaces.js";
import { SdkTypeContext } from "./framework/hooks/sdkTypes.js";
import { EmitterOptions } from "./lib.js";

/**
 * Emits ALL modular source files using the Alloy JSX pipeline.
 *
 * Pure Alloy components (no ts-morph):
 *   - Logger
 *   - Models (interfaces, enums, unions, type aliases)
 *   - RestorePoller (LRO restore poller helpers)
 *   - ClientContext (client interface, options, factory function)
 *   - ClassicalClient (client class with operations and sub-clients)
 *   - ClassicalOperationGroups (operation group files with interfaces/functions)
 *   - RootIndex (root index.ts and sub-client index files)
 *   - SubpathIndex (barrel index files for models/, api/, classic/)
 *   - Samples (operation example files)
 *
 * TsMorphBridge components (ts-morph output routed through Alloy):
 *   - Operations, OperationOptions, Serializers
 */
export async function emitAlloyOutput(
  program: Program,
  emitterOutputDir: string,
  modularEmitterOptions: ModularEmitterOptions,
  modularSourcesRoot: string,
  dpgContext: SdkContext,
  sdkTypes: SdkTypeContext,
  tsMorphProject: Project,
  clientMap: [string[], SdkClientType<SdkServiceOperation>][],
  emitterOptions: EmitterOptions,
  tsMorphGenerate?: () => Promise<void>
): Promise<void> {
  // Run remaining ts-morph generation before Alloy rendering.
  // This populates the ts-morph Project with operation files, options,
  // serializers, and resolves binder references.
  if (tsMorphGenerate) {
    await tsMorphGenerate();
  }

  // Alloy writeOutput() does joinPaths(emitterOutputDir, path), so all paths
  // in Alloy components must be relative to emitterOutputDir.
  // Create a copy of emitterOptions with a relative sourceRoot.
  const alloyEmitterOptions: ModularEmitterOptions = {
    ...modularEmitterOptions,
    modularOptions: {
      ...modularEmitterOptions.modularOptions,
      sourceRoot: modularSourcesRoot
    }
  };

  await writeOutput(
    program,
    <Output program={program}>
      <SdkContextProvider
        sdkContext={dpgContext}
        emitterOptions={alloyEmitterOptions}
        sdkTypes={sdkTypes}
      >
        {/* Pure Alloy components — paths must be relative to emitterOutputDir */}
        <Logger
          emitterOptions={alloyEmitterOptions}
          srcPath={modularSourcesRoot}
        />
        <Models context={dpgContext} sourceRoot={modularSourcesRoot} />
        {clientMap.map((subClient) => (
          <>
            <RestorePoller
              context={dpgContext}
              clientMap={subClient}
              emitterOptions={alloyEmitterOptions}
            />
            <ClientContext
              context={dpgContext}
              clientMap={subClient}
              emitterOptions={alloyEmitterOptions}
            />
            <ClassicalClient
              context={dpgContext}
              clientMap={subClient}
              emitterOptions={alloyEmitterOptions}
            />
            <ClassicalOperationGroups
              context={dpgContext}
              clientMap={subClient}
              emitterOptions={alloyEmitterOptions}
            />
          </>
        ))}

        {/* Bridge: ts-morph files written directly via emitFile (absolute paths) */}
        <TsMorphBridge project={tsMorphProject} program={program} />

        {/* Index files: barrel exports and root index */}
        <SubpathIndex
          context={dpgContext}
          emitterOptions={alloyEmitterOptions}
          clientMap={clientMap}
        />
        <RootIndex
          context={dpgContext}
          emitterOptions={alloyEmitterOptions}
          clientMap={clientMap}
        />

        {/* Samples: conditionally rendered when generate-sample is enabled */}
        {emitterOptions["generate-sample"] === true && (
          <Samples context={dpgContext} />
        )}
      </SdkContextProvider>
    </Output>,
    emitterOutputDir
  );
}
