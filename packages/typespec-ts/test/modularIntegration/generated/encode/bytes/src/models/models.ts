// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import "../rest/outputModels.js";
import {
  withNullChecks,
  deserializeBytes,
  deserializeArray,
} from "../helpers/serializerHelpers.js";
import { uint8ArrayToString } from "@azure/core-util";
import {
  Base64BytesPropertyOutput,
  Base64urlArrayBytesPropertyOutput,
  Base64urlBytesPropertyOutput,
  DefaultBytesPropertyOutput,
} from "../rest/outputModels.js";
import {
  DefaultBytesProperty as DefaultBytesPropertyRest,
  Base64BytesProperty as Base64BytesPropertyRest,
  Base64urlBytesProperty as Base64urlBytesPropertyRest,
  Base64urlArrayBytesProperty as Base64urlArrayBytesPropertyRest,
} from "../rest/index.js";

export interface DefaultBytesProperty {
  value: Uint8Array;
}

function _deserializeDefaultBytesProperty(
  input: DefaultBytesPropertyOutput,
): DefaultBytesProperty {
  return {
    value: deserializeBytes(input["value"], "base64"),
  };
}

export const deserializeDefaultBytesProperty = withNullChecks(
  _deserializeDefaultBytesProperty,
);

export function defaultBytesPropertySerializer(
  item: DefaultBytesProperty,
): DefaultBytesPropertyRest {
  return {
    value: uint8ArrayToString(item["value"], "base64"),
  };
}

export interface Base64BytesProperty {
  value: Uint8Array;
}

function _deserializeBase64BytesProperty(
  input: Base64BytesPropertyOutput,
): Base64BytesProperty {
  return {
    value: deserializeBytes(input["value"], "base64"),
  };
}

export const deserializeBase64BytesProperty = withNullChecks(
  _deserializeBase64BytesProperty,
);

export function base64BytesPropertySerializer(
  item: Base64BytesProperty,
): Base64BytesPropertyRest {
  return {
    value: uint8ArrayToString(item["value"], "base64"),
  };
}

export interface Base64urlBytesProperty {
  value: Uint8Array;
}

function _deserializeBase64urlBytesProperty(
  input: Base64urlBytesPropertyOutput,
): Base64urlBytesProperty {
  return {
    value: deserializeBytes(input["value"], "base64url"),
  };
}

export const deserializeBase64urlBytesProperty = withNullChecks(
  _deserializeBase64urlBytesProperty,
);

export function base64urlBytesPropertySerializer(
  item: Base64urlBytesProperty,
): Base64urlBytesPropertyRest {
  return {
    value: uint8ArrayToString(item["value"], "base64url"),
  };
}

export interface Base64urlArrayBytesProperty {
  value: Uint8Array[];
}

function _deserializeBase64urlArrayBytesProperty(
  input: Base64urlArrayBytesPropertyOutput,
): Base64urlArrayBytesProperty {
  return {
    value: deserializeArray(input["value"], (i) =>
      deserializeBytes(i, "base64url"),
    ),
  };
}

export const deserializeBase64urlArrayBytesProperty = withNullChecks(
  _deserializeBase64urlArrayBytesProperty,
);

export function base64urlArrayBytesPropertySerializer(
  item: Base64urlArrayBytesProperty,
): Base64urlArrayBytesPropertyRest {
  return {
    value: item["value"].map((p) => uint8ArrayToString(p, "base64url")),
  };
}
