"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extension_base_1 = require("@autorest/extension-base");
const codemodel_1 = require("@azure-tools/codemodel");
const autorestOptions_1 = require("./utils/autorestOptions");
let host;
let session;
let options;
async function initializeSession(autorestHost) {
    if (!host) {
        host = autorestHost;
    }
    if (!session) {
        session = await extension_base_1.startSession(host, undefined, codemodel_1.codeModelSchema);
    }
    if (!options) {
        options = await autorestOptions_1.extractAutorestOptions();
    }
}
exports.initializeSession = initializeSession;
function getSession() {
    if (!session) {
        throw new Error("Session has not been initialized, make sure to call initializeSession early in the plugin startup");
    }
    return session;
}
exports.getSession = getSession;
function getHost() {
    if (!host) {
        throw new Error("Host has not been initialized, make sure to call initializeSession early in the plugin startup");
    }
    return host;
}
exports.getHost = getHost;
function getAutorestOptions() {
    if (!options) {
        throw new Error("Options have not been initialized, make sure to call initializeSession early in the plugin startup");
    }
    return options;
}
exports.getAutorestOptions = getAutorestOptions;
//# sourceMappingURL=autorestSession.js.map