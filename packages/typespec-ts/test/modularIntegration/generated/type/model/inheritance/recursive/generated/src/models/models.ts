// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  withNullChecks,
  deserializeArray,
  passthroughDeserializer,
} from "../helpers/serializerHelpers.js";
import { ElementOutput, ExtensionOutput } from "../rest/outputModels.js";
import {
  Element as ElementRest,
  Extension as ExtensionRest,
} from "../rest/index.js";

/** element */
export interface Element {
  extension?: Extension[];
}

function _deserializeElement(input: ElementOutput): Element {
  return {
    extension: deserializeArray(input["extension"], deserializeExtension),
  };
}

export const deserializeElement = withNullChecks(_deserializeElement);

export function elementSerializer(item: Element): ElementRest {
  return {
    extension:
      item["extension"] === undefined
        ? item["extension"]
        : item["extension"].map(extensionSerializer),
  };
}

/** extension */
export interface Extension extends Element {
  level: number;
}

function _deserializeExtension(input: ExtensionOutput): Extension {
  return {
    ...deserializeElement(input),
    level: passthroughDeserializer(input["level"]),
  };
}

export const deserializeExtension = withNullChecks(_deserializeExtension);

export function extensionSerializer(item: Extension): ExtensionRest {
  return {
    extension:
      item["extension"] === undefined
        ? item["extension"]
        : item["extension"].map(extensionSerializer),
    level: item["level"],
  };
}
