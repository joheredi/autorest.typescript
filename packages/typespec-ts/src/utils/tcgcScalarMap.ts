import { SdkType } from "@azure-tools/typespec-client-generator-core";

export function getJsScalar(type: SdkType) {
  const scalar = __JS_SCALARS_MAP[type.kind];

  if (scalar) {
    return scalar;
  } else {
    return "unknown";
  }
}

const __JS_SCALARS_MAP: Record<string, string> = {
  any: "any",
  armId: "string",
  azureLocation: "string",
  boolean: "boolean",
  bytes: "Uint8Array",
  decimal: "number",
  decimal128: "number",
  duration: "string",
  endpoint: "string",
  eTag: "string",
  float: "number",
  float32: "number",
  float64: "number",
  guid: "string",
  int16: "number",
  int32: "number",
  int64: "number",
  int8: "number",
  integer: "number",
  ipAddress: "string",
  ipV4Address: "string",
  ipV6Address: "string",
  numeric: "number",
  offsetDateTime: "string",
  password: "string",
  plainDate: "string",
  plainTime: "string",
  safeint: "number",
  string: "string",
  uint16: "number",
  uint32: "number",
  uint64: "number",
  uint8: "number",
  utcDateTime: "Date",
  uri: "string",
  url: "string",
  uuid: "string"
};
