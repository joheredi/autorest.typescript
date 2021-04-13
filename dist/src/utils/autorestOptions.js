"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extension_base_1 = require("@autorest/extension-base");
const autorestSession_1 = require("../autorestSession");
/**
 * Extracts common autorest options
 */
async function extractAutorestOptions() {
    const host = autorestSession_1.getHost();
    const lowLevelClient = (await host.GetValue("low-level-client")) === true;
    const azureArm = !((await host.GetValue("azure-arm")) === false);
    const addCredentials = !((await host.GetValue("add-credentials")) === false) || azureArm;
    const credentialKeyHeaderName = await host.GetValue("credential-key-header-name");
    const credentialScopes = await getCredentialScopes(host);
    return {
        azureArm,
        addCredentials,
        credentialKeyHeaderName,
        credentialScopes,
        lowLevelClient
    };
}
exports.extractAutorestOptions = extractAutorestOptions;
async function getCredentialScopes(host) {
    const addCredentials = await host.GetValue("add-credentials");
    const credentialScopes = await host.GetValue("credential-scopes");
    const azureArm = await host.GetValue("azure-arm");
    if (credentialScopes && !addCredentials) {
        throw new Error("--credential-scopes must be used with the --add-credentials flag");
    }
    if (!credentialScopes) {
        if (azureArm) {
            return ["https://management.azure.com/.default"];
        }
        else if (addCredentials) {
            host.Message({
                Channel: extension_base_1.Channel.Warning,
                Text: `You have default credential policy BearerTokenCredentialPolicy
        but not the --credential-scopes flag set while generating non-management plane code.
        This is not recommended because it forces the customer to pass credential scopes
        through kwargs if they want to authenticate.`
            });
        }
    }
    if (typeof credentialScopes === "string") {
        return credentialScopes.split(",");
    }
    return undefined;
}
//# sourceMappingURL=autorestOptions.js.map