// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EmitContext } from "@typespec/compiler";
import * as fsextra from "fs-extra";
import { RLCOptions, RLCModel } from "@azure-tools/rlc-common";
import { createSdkContext } from "@azure-tools/typespec-client-generator-core";
import { Project } from "ts-morph";
import { emitCodeModel } from "./modular/buildCodeModel.js";
import { join } from "path";
import { GenerationDirDetail, SdkContext } from "./utils/interfaces.js";
import { transformRLCOptions } from "./transform/transfromRLCOptions.js";
import { ModularCodeModel } from "./modular/modularCodeModel.js";
import { EmitterOptions } from "./lib.js";
import { generateRlcSources } from "./rlc/generateRlcSources.js";
import { generateModularSources } from "./modular/generateModularSources.js";
import { generateMetadataAndTest } from "./test/generateMetadataAndTest.js";

export * from "./lib.js";

export async function $onEmit(context: EmitContext) {
  /** Shared status */
  const emitterOptions: EmitterOptions = context.options;
  const dpgContext = createSdkContext(
    context,
    "@azure-tools/typespec-ts"
  ) as SdkContext;
  const needUnexpectedHelper: Map<string, boolean> = new Map<string, boolean>();
  const serviceNameToRlcModelsMap: Map<string, RLCModel> = new Map<
    string,
    RLCModel
  >();
  const rlcCodeModels: RLCModel[] = [];

  // 1. Enrich the dpg context with path detail and common options
  await enrichDpgContext(dpgContext, emitterOptions, context.emitterOutputDir);
  // 2. Clear sources folder
  await clearSrcFolder();
  // 3. Generate RLC sources
  await generateRlcSources(dpgContext, rlcCodeModels, {
    needUnexpectedHelper,
    serviceNameToRlcModelsMap
  });
  // 4. Generate Modular sources
  const modularSourcesRoot =
    dpgContext.generationPathDetail?.modularSourcesDir ?? "src";
  let modularCodeModel: ModularCodeModel = emitCodeModel(
    dpgContext,
    serviceNameToRlcModelsMap,
    modularSourcesRoot,
    new Project(),
    {
      casing: "camel"
    }
  );
  await generateModularSources(
    dpgContext,
    modularCodeModel,
    { needUnexpectedHelper, serviceNameToRlcModelsMap },
    emitterOptions
  );
  // 5. Generate metadata and test files
  await generateMetadataAndTest(dpgContext, rlcCodeModels, modularCodeModel);

  async function clearSrcFolder() {
    await fsextra.emptyDir(
      dpgContext.generationPathDetail?.modularSourcesDir ??
        dpgContext.generationPathDetail?.rlcSourcesDir ??
        ""
    );
  }
}

export async function enrichDpgContext(
  dpgContext: SdkContext,
  emitterOptions: EmitterOptions,
  emitterOutputDir: string = ""
) {
  const generationPathDetail: GenerationDirDetail =
    await calculateGenerationDir(emitterOptions, emitterOutputDir);
  dpgContext.generationPathDetail = generationPathDetail;
  const options: RLCOptions = transformRLCOptions(emitterOptions, dpgContext);
  const hasTestFolder = await fsextra.pathExists(
    join(dpgContext.generationPathDetail?.metadataDir ?? "", "test")
  );
  options.generateTest =
    options.generateTest === true ||
    (options.generateTest === undefined &&
      !hasTestFolder &&
      options.flavor === "azure");
  dpgContext.rlcOptions = options;
}
