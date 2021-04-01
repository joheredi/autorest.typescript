import { Channel, Host } from "@autorest/extension-base";
import { getHost } from "../autorestSession";

/**
 * Extracts common autorest options
 */
export async function extractAutorestOptions() {
  const host = getHost();
  const lowLevelClient = (await host.GetValue("low-level-client")) === true;
  const azureArm = !((await host.GetValue("azure-arm")) === false);
  const addCredentials =
    !((await host.GetValue("add-credentials")) === false) || azureArm;
  const credentialKeyHeaderName: string | undefined = await host.GetValue(
    "credential-key-header-name"
  );
  const credentialScopes = await getCredentialScopes(host);

  return {
    azureArm,
    addCredentials,
    credentialKeyHeaderName,
    credentialScopes,
    lowLevelClient
  };
}

async function getCredentialScopes(host: Host): Promise<string[] | undefined> {
  const addCredentials = await host.GetValue("add-credentials");
  const credentialScopes = await host.GetValue("credential-scopes");
  const azureArm = await host.GetValue("azure-arm");

  if (credentialScopes && !addCredentials) {
    throw new Error(
      "--credential-scopes must be used with the --add-credentials flag"
    );
  }

  if (!credentialScopes) {
    if (azureArm) {
      return ["https://management.azure.com/.default"];
    } else if (addCredentials) {
      host.Message({
        Channel: Channel.Warning,
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
