// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Program, EmitContext } from "@cadl-lang/compiler";
import * as fsextra from "fs-extra";
import {
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
  buildReadmeFile,
  buildSerializeHelper,
  RLCOptions,
  RLCModel
} from "@azure-tools/rlc-common";
import { transformRLCModel } from "./transform/transform.js";
import { emitContentByBuilder, emitModels } from "./emitUtil.js";
import { listClients } from "@azure-tools/cadl-dpg";
import { emitCodeModel } from "./hrlc/sharedEmitter.js";
import { emitClients } from "./hrlc/emitClients.js";

export async function $onEmit(context: EmitContext) {
  const program: Program = context.program;
  const options: RLCOptions = context.options;
  const clients = listClients(program);
  const hrlc = emitCodeModel(context, { casing: "camel" });
  const hrlcClients = emitClients(hrlc, context.emitterOutputDir);
  clearSrcFolder(context.emitterOutputDir);

  for (const hrlcClient of hrlcClients) {
    emitContentByBuilder(program, () => hrlcClient, hrlc as any);
    // emitFile(program, { content: hrlcClient.content, path: hrlcClient.path });
  }

  for (const client of clients) {
    const rlcModels = await transformRLCModel(
      program,
      options,
      client,
      context.emitterOutputDir
    );
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
    // buildSerializeHelper
    await emitContentByBuilder(program, buildSerializeHelper, rlcModels);
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
      rlcModels,
      context.emitterOutputDir
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
      rlcModels,
      context.emitterOutputDir
    );
  }
}

function clearSrcFolder(srcPath: string) {
  fsextra.emptyDirSync(srcPath);
}
