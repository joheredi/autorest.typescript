import { SdkCredentialType } from "@azure-tools/typespec-client-generator-core";

export function getCredentialExpression(type: SdkCredentialType): string {
  switch (type.scheme.type) {
    case "apiKey":
    case "http":
      return "KeyCredential";
    case "oauth2":
    case "openIdConnect":
      return "TokenCredential";
    default:
      // TODO: Add diagnostics about unknown credential type
      return "any";
  }
}
