import {
  RLCOptions,
  buildClientDefinitions,
  buildResponseTypes,
  buildParameterTypes,
  buildIsUnexpectedHelper,
  buildClient,
  buildIndexFile,
  buildTopLevelIndex,
  buildRollupConfig,
  buildTsConfig,
  buildApiExtractorConfig,
  buildPackageFile,
  buildPollingHelper,
  buildPaginateHelper,
  buildEsLintConfig,
  buildKarmaConfigFile,
  buildEnvFile,
  buildEnvBrowserFile,
  buildRecordedClientFile,
  buildSampleTest,
  buildReadmeFile
} from "@azure-tools/rlc-common";
import { Program } from "@cadl-lang/compiler";

import { transformRLCModel } from "./transform/transform.js";
import { emitContentByBuilder, emitModels } from "./emitUtil.js";

export async function emitRlc(program: Program, options: RLCOptions) {
  const rlcModels = await transformRLCModel(program, options);
  await emitModels(rlcModels, program);
  await emitContentByBuilder(program, buildClientDefinitions, rlcModels);
  await emitContentByBuilder(program, buildResponseTypes, rlcModels);
  await emitContentByBuilder(program, buildClient, rlcModels);
  await emitContentByBuilder(program, buildParameterTypes, rlcModels);
  await emitContentByBuilder(program, buildIsUnexpectedHelper, rlcModels);
  await emitContentByBuilder(program, buildIndexFile, rlcModels);
  await emitContentByBuilder(program, buildTopLevelIndex, rlcModels);
  await emitContentByBuilder(program, buildPaginateHelper, rlcModels);
  await emitContentByBuilder(program, buildPollingHelper, rlcModels);
  // build metadata relevant files
  await emitContentByBuilder(
    program,
    [
      buildEsLintConfig,
      buildRollupConfig,
      buildTsConfig,
      buildApiExtractorConfig,
      buildPackageFile,
      buildReadmeFile
    ],
    rlcModels
  );
  // build test relevant files
  await emitContentByBuilder(
    program,
    [
      buildKarmaConfigFile,
      buildEnvFile,
      buildEnvBrowserFile,
      buildRecordedClientFile,
      buildSampleTest
    ],
    rlcModels
  );
}
