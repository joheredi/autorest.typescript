/**
 * Unified component that renders model types, JSON serializers, and XML
 * serializers into a SINGLE `<ts.SourceFile>` per file path. This prevents
 * Alloy from generating self-imports when serializers reference types
 * defined in the same output file.
 */

import { For } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import {
  SdkModelPropertyType,
  SdkModelType,
  SdkType
} from "@azure-tools/typespec-client-generator-core";
import { SdkContext } from "../../utils/interfaces.js";
import { getModelNamespaces } from "../model-utils.js";
import {
  hasXmlSerialization
} from "../serialization/buildXmlSerializerFunction.js";
import { emitQueue } from "../../framework/hooks/sdkTypes.js";
import { useSdkTypes } from "./context/SdkContextProvider.js";
import {
  ModelType,
  isGenerableType,
  getModelsPath
} from "./Models.js";
import {
  TypeSerializers,
  isGenerableSerializeType
} from "./Serializers.js";
import { XmlModelSerializers } from "./XmlSerializers.js";

// ── Props ───────────────────────────────────────────────────────────────

export interface ModelFilesProps {
  context: SdkContext;
  sourceRoot: string;
}

// ── Root component ──────────────────────────────────────────────────────

/**
 * Renders all model types, JSON serializers, and XML serializers grouped
 * into a single `<ts.SourceFile>` per output file path. This ensures that
 * type declarations and their serializers share the same Alloy scope,
 * eliminating spurious self-imports.
 */
export function ModelFiles(props: ModelFilesProps) {
  const { context, sourceRoot } = props;

  // Collect model types
  const modelTypes: SdkType[] = [];
  const serializableTypes: Array<SdkType | SdkModelPropertyType> = [];
  const xmlModels: SdkModelType[] = [];

  for (const type of emitQueue) {
    if (isGenerableType(type)) {
      modelTypes.push(type);
    }
    if (isGenerableSerializeType(type)) {
      serializableTypes.push(type);
    }
    if (type.kind === "model" && hasXmlSerialization(type)) {
      xmlModels.push(type);
    }
  }

  // Add flattened properties for serializers
  const sdkTypes = useSdkTypes();
  for (const [property] of sdkTypes.flattenProperties) {
    serializableTypes.push(property);
  }

  // Group all items by file path
  const allPaths = new Set<string>();
  const modelsByFile = new Map<string, SdkType[]>();
  const serializersByFile = new Map<
    string,
    Array<SdkType | SdkModelPropertyType>
  >();
  const xmlByFile = new Map<string, SdkModelType[]>();

  for (const type of modelTypes) {
    const namespaces = getModelNamespaces(context, type);
    const filepath = getModelsPath(sourceRoot, namespaces);
    allPaths.add(filepath);
    if (!modelsByFile.has(filepath)) modelsByFile.set(filepath, []);
    modelsByFile.get(filepath)!.push(type);
  }

  for (const typeOrProp of serializableTypes) {
    const type = typeOrProp.kind === "property" ? typeOrProp.type : typeOrProp;
    const namespaces = getModelNamespaces(context, type);
    const filepath = getModelsPath(sourceRoot, namespaces);
    allPaths.add(filepath);
    if (!serializersByFile.has(filepath))
      serializersByFile.set(filepath, []);
    serializersByFile.get(filepath)!.push(typeOrProp);
  }

  for (const model of xmlModels) {
    const namespaces = getModelNamespaces(context, model);
    const filepath = getModelsPath(sourceRoot, namespaces);
    allPaths.add(filepath);
    if (!xmlByFile.has(filepath)) xmlByFile.set(filepath, []);
    xmlByFile.get(filepath)!.push(model);
  }

  if (allPaths.size === 0) return null;

  return (
    <For each={Array.from(allPaths)}>
      {(filepath) => (
        <ts.SourceFile path={filepath}>
          {`/**\n * This file contains only generated model types and their (de)serializers.\n * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.\n */\n/* eslint-disable @typescript-eslint/naming-convention */\n/* eslint-disable @typescript-eslint/explicit-module-boundary-types */`}
          <For each={modelsByFile.get(filepath) ?? []} hardline>
            {(type) => <ModelType context={context} type={type} />}
          </For>
          <For each={serializersByFile.get(filepath) ?? []} hardline>
            {(typeOrProp) => (
              <TypeSerializers context={context} typeOrProp={typeOrProp} />
            )}
          </For>
          <For each={xmlByFile.get(filepath) ?? []} hardline>
            {(model) => (
              <XmlModelSerializers context={context} type={model} />
            )}
          </For>
        </ts.SourceFile>
      )}
    </For>
  );
}
