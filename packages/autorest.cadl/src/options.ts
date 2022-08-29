import { CodeModel } from "@autorest/codemodel";
import { Session } from "@autorest/extension-base";
import { getSession } from "./autorestSession";
import { CadlOptions } from "./interfaces";

export let options: CadlOptions;

export function getOptions(): CadlOptions {
  if (!options) {
    const session = getSession();
    options = {
      isAzureSpec: getIsAzureSpec(session),
      namespace: getNamespace(session),
    };
  }

  return options;
}

export function getIsAzureSpec(session: Session<CodeModel>) {
  return session.configuration["isAzureSpec"] !== false;
}

export function getNamespace(session: Session<CodeModel>) {
  return session.configuration["namespace"];
}
