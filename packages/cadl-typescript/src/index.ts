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
  // buildTsConfig,
  buildApiExtractorConfig,
  // buildPackageFile,
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
  buildTsConfig,
  buildPackageFile
} from "@azure-tools/rlc-common";
import { transformRLCModel } from "./transform/transform.js";
import { emitContentByBuilder, emitModels } from "./emitUtil.js";
import { listClients } from "@azure-tools/cadl-dpg";
import { emitCodeModel } from "./hrlc/sharedEmitter.js";
import { emitClients } from "./hrlc/emitClients.js";
import { emitApiIndex } from "./hrlc/emitIndexFiles.js";

export async function $onEmit(context: EmitContext) {
  const program: Program = context.program;
  const options: RLCOptions = context.options;
  clearSrcFolder(context.emitterOutputDir);
  const clients = listClients(program);

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

  if (options.isHrlc) {
    const hrlcExports: string[] = [];
    const hrlc = emitCodeModel(context, { casing: "camel" });
    const hrlcProject = emitClients(
      hrlc,
      hrlcExports,
      context.emitterOutputDir
    );
    for (let file of hrlcProject.getSourceFiles()) {
      file = file.fixMissingImports();
      emitContentByBuilder(
        program,
        () => ({ content: file.getFullText(), path: file.getFilePath() }),
        hrlc as any
      );
      // emitFile(program, { content: hrlcClient.content, path: hrlcClient.path });
    }
    emitContentByBuilder(
      program,
      () => emitApiIndex(hrlcExports, context.emitterOutputDir),
      hrlc as any
    );
  }

}

function clearSrcFolder(srcPath: string) {
  fsextra.emptyDirSync(srcPath);
}
