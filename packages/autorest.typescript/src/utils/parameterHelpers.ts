import {
  Parameter,
  ParameterLocation,
  VirtualParameter
} from "@autorest/codemodel";

export function getParameterLocation(parameter: Parameter): ParameterLocation {
  const originalLocaltion =
    parameter.protocol.http?.in ||
    (parameter as VirtualParameter).originalParameter.protocol.http?.in;
  const locationExtension =
    parameter.extensions && parameter.extensions["x-in"];
  if (!originalLocaltion && !locationExtension) {
    throw new Error("Expected parameter to contain HTTP Protocol information");
  }

  return locationExtension || originalLocaltion;
}
