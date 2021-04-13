"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const extension_base_1 = require("@autorest/extension-base");
const typescriptGenerator_1 = require("./typescriptGenerator");
const lowLevelGenerator_1 = require("./lowlevel/lowLevelGenerator");
const autorestSession_1 = require("./autorestSession");
async function processRequest(host) {
    await autorestSession_1.initializeSession(host);
    const session = autorestSession_1.getSession();
    const autorestOptions = await autorestSession_1.getAutorestOptions();
    try {
        const start = Date.now();
        if (autorestOptions.lowLevelClient) {
            await lowLevelGenerator_1.generateLowlevelClient();
        }
        else {
            await typescriptGenerator_1.generateTypeScriptLibrary(session.model, host);
        }
        session.log(`Autorest.Typescript took ${Date.now() - start}ms`, "");
    }
    catch (err) {
        session.error("An error was encountered while handling a request:", err);
        throw err;
    }
}
exports.processRequest = processRequest;
async function main() {
    const pluginHost = new extension_base_1.AutoRestExtension();
    pluginHost.Add("typescript", processRequest);
    await pluginHost.Run();
}
main();
//# sourceMappingURL=main.js.map