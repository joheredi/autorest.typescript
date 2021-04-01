import {
  CodeModel,
  ImplementationLocation,
  ParameterLocation
} from "@azure-tools/codemodel";
import { getLanguageMetadata } from "../utils/languageHelpers";

export interface EndpointDetails {
  isCustom: boolean;
  endpoint?: string;
  parameterName?: string;
}

export function transformBaseUrl(codeModel: CodeModel): EndpointDetails {
  let endpoint: string | undefined = "";
  let isCustom = false;

  const $host = (codeModel.globalParameters || []).find(p => {
    const { name } = getLanguageMetadata(p.language);
    return name === "$host" && Boolean(p.clientDefaultValue);
  });

  let parameterName: string | undefined;

  if (!$host) {
    // No support yet for multi-baseUrl yet Issue #553
    const { requests } = codeModel.operationGroups[0].operations[0];
    parameterName = getEndpointParameter(codeModel);
    isCustom = true;
    endpoint = requests![0].protocol.http!.uri;
  } else {
    endpoint = $host.clientDefaultValue;
  }

  return {
    parameterName,
    endpoint: endpoint,
    isCustom
  };
}

function getEndpointParameter(codeModel: CodeModel) {
  if (!codeModel.globalParameters || !codeModel.globalParameters.length) {
    return;
  }

  const uriParameters = codeModel.globalParameters.filter(
    gp =>
      gp.implementation === ImplementationLocation.Client &&
      gp.protocol.http?.in === ParameterLocation.Uri
  );

  // Currently only support one parametrized host
  if (
    !uriParameters.length ||
    !uriParameters[0].language.default.serializedName
  ) {
    return;
  }

  return uriParameters[0].language.default.serializedName;
}
