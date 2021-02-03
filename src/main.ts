// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AutoRestExtension,
  Host
  // startSession
} from "@autorest/extension-base";
// import { generateTypeScriptLibrary } from "./typescriptGenerator";
import { generateLowlevelClient } from "./lowlevel/lowLevelGenerator";
// import { CodeModel, codeModelSchema } from "@azure-tools/codemodel";

export async function processRequest(host: Host) {
  try {
    // const session = await startSession<CodeModel>(
    //   host,
    //   undefined,
    //   codeModelSchema
    // );
    // const start = Date.now();
    // await generateTypeScriptLibrary(session.model, host);
    try {
      await generateLowlevelClient(host);
    } catch (e) {
      throw e;
    }

    //session.log(`Autorest.Typescript took ${Date.now() - start}ms`, "");
  } catch (err) {
    console.error("An error was encountered while handling a request:", err);
    throw err;
  }
}

async function main() {
  const pluginHost = new AutoRestExtension();
  pluginHost.Add("typescript", processRequest);
  await pluginHost.Run();
}

main();
