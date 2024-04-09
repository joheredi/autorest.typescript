// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  RLCModel,
  buildApiExtractorConfig,
  buildEnvBrowserFile,
  buildEnvFile,
  buildEsLintConfig,
  buildKarmaConfigFile,
  buildPackageFile,
  buildReadmeFile,
  buildRecordedClientFile,
  buildRollupConfig,
  buildSampleTest,
  buildTsConfig,
  buildVitestConfig
} from "@azure-tools/rlc-common";
import { SdkContext } from "../utils/interfaces.js";
import { existsSync } from "fs";
import { join } from "path";
import { getModuleExports } from "../modular/buildProjectFiles.js";
import { emitContentByBuilder } from "../utils/emitUtil.js";
import { ModularCodeModel } from "../modular/modularCodeModel.js";

export async function generateMetadataAndTest(
  dpgContext: SdkContext,
  rlcCodeModels: RLCModel[],
  modularCodeModel: ModularCodeModel
) {
  if (rlcCodeModels.length === 0 || !rlcCodeModels[0]) {
    return;
  }

  const { program } = dpgContext;

  const rlcClient: RLCModel = rlcCodeModels[0];
  const option = dpgContext.rlcOptions!;
  const isAzureFlavor = option.flavor === "azure";
  // Generate metadata
  const hasPackageFile = await existsSync(
    join(dpgContext.generationPathDetail?.metadataDir ?? "", "package.json")
  );
  const shouldGenerateMetadata =
    option.generateMetadata === true ||
    (option.generateMetadata === undefined && !hasPackageFile);
  if (shouldGenerateMetadata) {
    const commonBuilders = [
      buildRollupConfig,
      buildApiExtractorConfig,
      buildReadmeFile
    ];
    if (option.moduleKind === "esm") {
      commonBuilders.push((model) => buildVitestConfig(model, "node"));
      commonBuilders.push((model) => buildVitestConfig(model, "browser"));
    }
    if (isAzureFlavor) {
      commonBuilders.push(buildEsLintConfig);
    }
    let moduleExports = {};
    if (option.isModularLibrary) {
      moduleExports = getModuleExports(modularCodeModel);
    }
    commonBuilders.push((model) => buildPackageFile(model, moduleExports));
    commonBuilders.push(buildTsConfig);
    // build metadata relevant files
    await emitContentByBuilder(
      program,
      commonBuilders,
      rlcClient,
      dpgContext.generationPathDetail?.metadataDir
    );
  }

  // Generate test relevant files
  if (option.generateTest && isAzureFlavor) {
    await emitContentByBuilder(
      program,
      [
        buildKarmaConfigFile,
        buildEnvFile,
        buildEnvBrowserFile,
        buildRecordedClientFile,
        buildSampleTest
      ],
      rlcClient,
      dpgContext.generationPathDetail?.metadataDir
    );
  }
}
