// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutoRestExtension, Host } from "@autorest/extension-base";
import { generateTypeScriptLibrary } from "./typescriptGenerator";
import { generateLowlevelClient } from "./lowlevel/lowLevelGenerator";
import {
  getAutorestOptions,
  getSession,
  initializeSession
} from "./autorestSession";

export async function processRequest(host: Host) {
  await initializeSession(host);
  const session = getSession();
  const autorestOptions = await getAutorestOptions();
  try {
    const start = Date.now();
    if (autorestOptions.lowLevelClient) {
      await generateLowlevelClient();
    } else {
      await generateTypeScriptLibrary(session.model, host);
    }
    session.log(`Autorest.Typescript took ${Date.now() - start}ms`, "");
  } catch (err) {
    session.error("An error was encountered while handling a request:", err);
    throw err;
  }
}

async function main() {
  const pluginHost = new AutoRestExtension();
  pluginHost.Add("typescript", processRequest);
  await pluginHost.Run();
}

main();
