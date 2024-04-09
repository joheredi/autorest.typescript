// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  getClientName,
  hasUnexpectedHelper,
  buildClientDefinitions,
  buildResponseTypes,
  buildClient,
  buildParameterTypes,
  buildIsUnexpectedHelper,
  buildIndexFile,
  buildLogger,
  buildTopLevelIndex,
  buildPollingHelper,
  buildSerializeHelper,
  buildSamples,
  RLCModel,
  buildPaginateHelper
} from "@azure-tools/rlc-common";
import { transformRLCModel } from "../transform/transform.js";
import { getRLCClients } from "../utils/clientUtils.js";
import { emitModels, emitContentByBuilder } from "../utils/emitUtil.js";
import { SdkContext } from "../utils/interfaces.js";

export async function generateRlcSources(
  dpgContext: SdkContext,
  rlcCodeModels: RLCModel[],
  mappings: {
    serviceNameToRlcModelsMap: Map<string, RLCModel>;
    needUnexpectedHelper: Map<string, boolean>;
  }
) {
  const { program } = dpgContext;
  const clients = getRLCClients(dpgContext);
  for (const client of clients) {
    const rlcModels = await transformRLCModel(client, dpgContext);
    rlcCodeModels.push(rlcModels);
    mappings.serviceNameToRlcModelsMap.set(client.service.name, rlcModels);
    mappings.needUnexpectedHelper.set(
      getClientName(rlcModels),
      hasUnexpectedHelper(rlcModels)
    );

    await emitModels(rlcModels, dpgContext.program);
    await emitContentByBuilder(program, buildClientDefinitions, rlcModels);
    await emitContentByBuilder(program, buildResponseTypes, rlcModels);
    await emitContentByBuilder(program, buildClient, rlcModels);
    await emitContentByBuilder(program, buildParameterTypes, rlcModels);
    await emitContentByBuilder(program, buildIsUnexpectedHelper, rlcModels);
    await emitContentByBuilder(program, buildIndexFile, rlcModels);
    await emitContentByBuilder(program, buildLogger, rlcModels);
    await emitContentByBuilder(program, buildTopLevelIndex, rlcModels);
    await emitContentByBuilder(program, buildPaginateHelper, rlcModels);
    await emitContentByBuilder(program, buildPollingHelper, rlcModels);
    await emitContentByBuilder(program, buildSerializeHelper, rlcModels);
    await emitContentByBuilder(
      program,
      buildSamples,
      rlcModels,
      dpgContext.generationPathDetail?.metadataDir
    );
  }
}
