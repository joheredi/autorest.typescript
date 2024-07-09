// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  passthroughDeserializer,
  withNullChecks,
  deserializeArray,
} from "../helpers/serializerHelpers.js";
import {
  Element as ElementRest,
  ElementOutput,
  Extension as ExtensionRest,
  ExtensionOutput,
} from "../rest/index.js";

/** element */
export interface Element {
  extension?: Extension[];
}

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

export function extensionSerializer(item: Extension): ExtensionRest {
  return {
    extension:
      item["extension"] === undefined
        ? item["extension"]
        : item["extension"].map(extensionSerializer),
    level: item["level"],
  };
}

function _deserializeElement(input: ElementOutput): Element {
  return {
    extension: deserializeArray(
      input["extension"],
      deserializeExtension,
    ) as any,
  } as any;
}

export const deserializeElement = withNullChecks(_deserializeElement);

function _deserializeExtension(input: ExtensionOutput): Extension {
  return {
    ...deserializeElement(input),
    level: passthroughDeserializer(input["level"]) as any,
  } as any;
}

export const deserializeExtension = withNullChecks(_deserializeExtension);
