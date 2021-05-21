import { Channel, Host } from "@autorest/extension-base";
import { AutorestOptions, getHost, getSession } from "../autorestSession";
import { TracingInfo } from "../models/clientDetails";
import { PackageDetails } from "../models/packageDetails";
import { NameType, normalizeName } from "./nameUtils";

/**
 * Extracts common autorest options
 */
export async function extractAutorestOptions(): Promise<AutorestOptions> {
  const host = getHost();
  const lowLevelClient = (await host.GetValue("rest-level-client")) === true;
  const azureArm = !((await host.GetValue("azure-arm")) === false);
  const addCredentials =
    !((await host.GetValue("add-credentials")) === false) || azureArm;
  const credentialKeyHeaderName: string | undefined = await host.GetValue(
    "credential-key-header-name"
  );

  const srcPath =
    ((await host.GetValue("source-code-folder-path")) as string) || "src";
  const credentialScopes = await getCredentialScopes(host);
  const packageDetails = await getPackageDetails(host);
  const licenseHeader: boolean =
    (await host.GetValue("license-header")) || false;

  const generateMetadata = (await host.GetValue("generate-metadata")) !== false;

  const tracingInfo = await getTracingInfo(host);

  return {
    azureArm,
    addCredentials,
    credentialKeyHeaderName,
    credentialScopes,
    restLevelClient: lowLevelClient,
    srcPath,
    packageDetails,
    licenseHeader,
    tracingInfo,
    generateMetadata
  };
}

async function getTracingInfo(host: Host): Promise<TracingInfo | undefined> {
  const tracing: TracingInfo | undefined =
    (await host.GetValue("tracing-info")) || undefined;

  if (tracing && tracing.namespace && tracing.packagePrefix) {
    return tracing;
  }

  const namespace =
    (await host.GetValue("tracing-info.namespace")) || undefined;
  const packagePrefix =
    (await host.GetValue("tracing-info.packagePrefix")) || undefined;

  if (packagePrefix && namespace) {
    return {
      namespace,
      packagePrefix
    };
  }

  if (!tracing && !packagePrefix && !namespace) {
    return undefined;
  }

  throw new Error(
    "Invalid tracing-info. Make sure that namespace and packagePrefix are defined"
  );
}

async function getPackageDetails(host: Host): Promise<PackageDetails> {
  const { model } = getSession();
  const name = normalizeName(model.language.default.name, NameType.File);
  // TODO: Look for an existing package.json and
  const packageName = (await host.GetValue("package-name")) || name;
  const packageNameParts = packageName.match(/(^@(.*)\/)?(.*)/);
  const version = (await host.GetValue("package-version")) || "1.0.0-beta.1";

  return {
    name: packageName,
    scopeName: packageNameParts[2],
    nameWithoutScope: packageNameParts[3],
    description: model.language.default.description,
    version
  };
}

export async function getCredentialScopes(host: Host): Promise<string[] | undefined> {
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
