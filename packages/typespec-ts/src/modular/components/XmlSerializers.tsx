// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Children, For, code, refkey, Refkey } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import {
  SdkModelPropertyType,
  SdkModelType,
  SdkType,
  UsageFlags,
  isReadOnly
} from "@azure-tools/typespec-client-generator-core";
import { NameType, isAzurePackage } from "@azure-tools/rlc-common";
import { SdkContext } from "../../utils/interfaces.js";
import {
  getAllAncestors,
  getAllProperties
} from "../helpers/operationHelpers.js";
import { normalizeModelName, getModelNamespaces } from "../model-utils.js";
import { isAzureCoreErrorType } from "../../utils/modelUtils.js";
import { isSupportedSerializeType } from "../serialization/serializeUtils.js";
import {
  hasXmlSerialization,
  getXmlRootName,
  getXmlRootNs
} from "../serialization/buildXmlSerializerFunction.js";
import { xmlHelperRefkey } from "./StaticHelpers.js";
import { emitQueue } from "../../framework/hooks/sdkTypes.js";
import { reportDiagnostic } from "../../lib.js";
import { NoTarget } from "@typespec/compiler";
import { isMetadata } from "@typespec/http";
import { normalizeModelPropertyName } from "../type-expressions/get-type-expression.js";
import { normalizeName } from "@azure-tools/rlc-common";

// ── Refkey helpers ──────────────────────────────────────────────────────

export function xmlSerializerRefkey(type: SdkModelType): Refkey {
  return refkey(type, "xmlSerializer");
}

export function xmlDeserializerRefkey(type: SdkModelType): Refkey {
  return refkey(type, "xmlDeserializer");
}

export function xmlObjectSerializerRefkey(type: SdkModelType): Refkey {
  return refkey(type, "xmlObjectSerializer");
}

export function xmlObjectDeserializerRefkey(type: SdkModelType): Refkey {
  return refkey(type, "xmlObjectDeserializer");
}

// ── Props ───────────────────────────────────────────────────────────────

export interface XmlSerializersProps {
  context: SdkContext;
  sourceRoot: string;
}

// ── Root component ──────────────────────────────────────────────────────

/**
 * Renders XML serializer and deserializer functions for all models
 * that have XML serialization options. Emits into namespace-grouped
 * source files under `{sourceRoot}/models/`.
 */
export function XmlSerializers(props: XmlSerializersProps) {
  const { context, sourceRoot } = props;

  // Collect models from the emit queue that have XML serialization
  const xmlModels: SdkModelType[] = [];
  for (const type of emitQueue) {
    if (type.kind === "model" && hasXmlSerialization(type)) {
      xmlModels.push(type);
    }
  }

  if (xmlModels.length === 0) return null;

  // Group models by file path (same grouping as Models.tsx)
  const fileGroups = groupXmlModelsByFile(context, sourceRoot, xmlModels);

  return (
    <For each={Array.from(fileGroups.entries())}>
      {([filepath, models]) => (
        <ts.SourceFile path={filepath}>
          <For each={models} hardline>
            {(model) => <XmlModelSerializers context={context} type={model} />}
          </For>
        </ts.SourceFile>
      )}
    </For>
  );
}

// ── File grouping ───────────────────────────────────────────────────────

function groupXmlModelsByFile(
  context: SdkContext,
  sourceRoot: string,
  models: SdkModelType[]
): Map<string, SdkModelType[]> {
  const groups = new Map<string, SdkModelType[]>();
  for (const model of models) {
    const namespaces = getModelNamespaces(context, model);
    const filepath = getModelsPath(sourceRoot, namespaces);
    if (!groups.has(filepath)) groups.set(filepath, []);
    groups.get(filepath)!.push(model);
  }
  return groups;
}

function getModelsPath(
  sourceRoot: string,
  modelNamespace: string[] = []
): string {
  return [
    sourceRoot,
    "models",
    ...modelNamespace.map((n) => normalizeName(n, NameType.File)),
    "models.ts"
  ].join("/");
}

// ── Per-model component ─────────────────────────────────────────────────

interface XmlModelSerializersProps {
  context: SdkContext;
  type: SdkModelType;
}

/**
 * Renders all four XML serializer/deserializer functions for a single model:
 * - XmlSerializer (returns XML string)
 * - XmlObjectSerializer (returns serialized object)
 * - XmlDeserializer (takes XML string)
 * - XmlObjectDeserializer (takes parsed object)
 */
function XmlModelSerializers(props: XmlModelSerializersProps) {
  const { context, type } = props;

  return (
    <>
      <XmlModelSerializerFn context={context} type={type} />
      <XmlObjectModelSerializerFn context={context} type={type} />
      <XmlModelDeserializerFn context={context} type={type} />
      <XmlObjectModelDeserializerFn context={context} type={type} />
    </>
  );
}

// ── XML Model Serializer (returns XML string) ───────────────────────────

function XmlModelSerializerFn(props: {
  context: SdkContext;
  type: SdkModelType;
}): Children {
  const { context, type } = props;

  if (!shouldGenerateSerializer(context, type)) return null;

  const functionName = `${normalizeModelName(
    context,
    type,
    NameType.Operation,
    false
  )}XmlSerializer`;

  const serializeToXmlRef = xmlHelperRefkey("serializeToXml");
  const xmlPropertyMetadataRef = xmlHelperRefkey("XmlPropertyMetadata");

  const properties = getAllProperties(context, type, getAllAncestors(type));
  const xmlRootName = getXmlRootName(type);
  const xmlRootNs = getXmlRootNs(type);
  const typeRef = refkey(type);

  const propertyMetadata = buildPropertyMetadataArray(context, properties);

  const nsArg = xmlRootNs
    ? `, { namespace: "${xmlRootNs.namespace}", prefix: "${xmlRootNs.prefix}" }`
    : "";

  return (
    <ts.FunctionDeclaration
      export
      name={functionName}
      refkey={xmlSerializerRefkey(type)}
      parameters={[{ name: "item", type: typeRef }]}
      returnType="string"
    >
      {code`const properties: ${xmlPropertyMetadataRef}[] = [${propertyMetadata}];`}
      {"\n"}
      {code`return ${serializeToXmlRef}(item, properties, "${xmlRootName}"${nsArg});`}
    </ts.FunctionDeclaration>
  );
}

// ── XML Object Model Serializer (returns object) ────────────────────────

function XmlObjectModelSerializerFn(props: {
  context: SdkContext;
  type: SdkModelType;
}): Children {
  const { context, type } = props;

  if (!shouldGenerateSerializer(context, type)) return null;

  const functionName = `${normalizeModelName(
    context,
    type,
    NameType.Operation,
    false
  )}XmlObjectSerializer`;

  const xmlSerializedObjectRef = xmlHelperRefkey("XmlSerializedObject");
  const typeRef = refkey(type);

  const properties = getAllProperties(context, type, getAllAncestors(type));
  const propertyAssignments = buildXmlObjectPropertyAssignments(
    context,
    properties
  );
  const isDictType = type.additionalProperties !== undefined;
  const paramName =
    propertyAssignments.length === 0 && !isDictType ? "_item" : "item";

  let bodyExpr: string;
  if (isDictType && propertyAssignments.length === 0) {
    bodyExpr = `return { ...item } as ${xmlSerializedObjectRef};`;
  } else if (isDictType) {
    bodyExpr = `return {${propertyAssignments}, ...item};`;
  } else {
    bodyExpr = `return {${propertyAssignments}};`;
  }

  return (
    <ts.FunctionDeclaration
      export
      name={functionName}
      refkey={xmlObjectSerializerRefkey(type)}
      parameters={[{ name: paramName, type: typeRef }]}
      returnType={xmlSerializedObjectRef}
    >
      {bodyExpr}
    </ts.FunctionDeclaration>
  );
}

// ── XML Model Deserializer (takes XML string) ───────────────────────────

function XmlModelDeserializerFn(props: {
  context: SdkContext;
  type: SdkModelType;
}): Children {
  const { context, type } = props;

  if (!shouldGenerateDeserializer(context, type)) return null;

  const functionName = `${normalizeModelName(
    context,
    type,
    NameType.Operation,
    false
  )}XmlDeserializer`;

  const deserializeFromXmlRef = xmlHelperRefkey("deserializeFromXml");
  const xmlPropertyDeserializeMetadataRef = xmlHelperRefkey(
    "XmlPropertyDeserializeMetadata"
  );
  const typeRef = refkey(type);

  const properties = getAllProperties(context, type, getAllAncestors(type));
  const xmlRootName = getXmlRootName(type);
  const xmlRootNs = getXmlRootNs(type);

  const propertyMetadata = buildDeserializePropertyMetadataArray(
    context,
    properties
  );

  const nsArg = xmlRootNs
    ? `, { namespace: "${xmlRootNs.namespace}", prefix: "${xmlRootNs.prefix}" }`
    : "";

  return (
    <ts.FunctionDeclaration
      export
      name={functionName}
      refkey={xmlDeserializerRefkey(type)}
      parameters={[{ name: "xmlString", type: "string" }]}
      returnType={typeRef}
    >
      {code`const properties: ${xmlPropertyDeserializeMetadataRef}[] = [${propertyMetadata}];`}
      {"\n"}
      {code`return ${deserializeFromXmlRef}<${typeRef}>(xmlString, properties, "${xmlRootName}"${nsArg});`}
    </ts.FunctionDeclaration>
  );
}

// ── XML Object Model Deserializer (takes parsed object) ─────────────────

function XmlObjectModelDeserializerFn(props: {
  context: SdkContext;
  type: SdkModelType;
}): Children {
  const { context, type } = props;

  if (!shouldGenerateDeserializer(context, type)) return null;

  const functionName = `${normalizeModelName(
    context,
    type,
    NameType.Operation,
    false
  )}XmlObjectDeserializer`;

  const deserializeXmlObjectRef = xmlHelperRefkey("deserializeXmlObject");
  const xmlPropertyDeserializeMetadataRef = xmlHelperRefkey(
    "XmlPropertyDeserializeMetadata"
  );
  const typeRef = refkey(type);

  const properties = getAllProperties(context, type, getAllAncestors(type));
  const propertyMetadata = buildDeserializePropertyMetadataArray(
    context,
    properties
  );

  return (
    <ts.FunctionDeclaration
      export
      name={functionName}
      refkey={xmlObjectDeserializerRefkey(type)}
      parameters={[{ name: "xmlObject", type: "Record<string, unknown>" }]}
      returnType={typeRef}
    >
      {code`const properties: ${xmlPropertyDeserializeMetadataRef}[] = [${propertyMetadata}];`}
      {"\n"}
      {code`return ${deserializeXmlObjectRef}<${typeRef}>(xmlObject, properties);`}
    </ts.FunctionDeclaration>
  );
}

// ── Guards ──────────────────────────────────────────────────────────────

function shouldGenerateSerializer(
  context: SdkContext,
  type: SdkModelType
): boolean {
  if (!isSupportedSerializeType(type)) return false;
  if (!type.name) {
    reportDiagnostic(context.program, {
      code: "anonymous-type-serialization",
      target: type.__raw || NoTarget
    });
    return false;
  }
  if (
    !type.usage ||
    (type.usage !== undefined &&
      (type.usage & UsageFlags.Input) !== UsageFlags.Input)
  ) {
    return false;
  }
  if (isAzureCoreErrorType(context.program, type.__raw!)) return false;
  return true;
}

function shouldGenerateDeserializer(
  context: SdkContext,
  type: SdkModelType
): boolean {
  if (!isSupportedSerializeType(type)) return false;
  if (!type.name) {
    reportDiagnostic(context.program, {
      code: "anonymous-type-deserialization",
      target: type.__raw || NoTarget
    });
    return false;
  }
  if (
    !type.usage ||
    (type.usage !== undefined &&
      (type.usage & UsageFlags.Output) !== UsageFlags.Output &&
      (type.usage & UsageFlags.Exception) !== UsageFlags.Exception)
  ) {
    return false;
  }
  if (isAzureCoreErrorType(context.program, type.__raw!)) return false;
  return true;
}

// ── Metadata builders (pure string-returning helpers) ───────────────────

function buildPropertyMetadataArray(
  context: SdkContext,
  properties: SdkModelPropertyType[]
): string {
  const metadataEntries: string[] = [];

  for (const property of properties) {
    if (property.kind !== "property") continue;
    if (isReadOnly(property)) continue;
    if (isMetadata(context.program, property.__raw!)) continue;

    const xmlOptions = property.serializationOptions?.xml;
    const jsonOptions = property.serializationOptions?.json;
    const propertyName = normalizeModelPropertyName(context, property);
    const cleanPropertyName = propertyName.replace(/^"|"$/g, "");

    const serializedName =
      xmlOptions?.name ?? jsonOptions?.name ?? property.name;

    const metadataObj: string[] = [
      `propertyName: "${cleanPropertyName}"`,
      `xmlOptions: { name: "${serializedName}"${buildXmlOptionsString(xmlOptions)} }`
    ];

    const typeInfo = getPropertyTypeInfo(property.type);
    if (typeInfo.type) metadataObj.push(`type: "${typeInfo.type}"`);
    if (typeInfo.dateEncoding)
      metadataObj.push(`dateEncoding: "${typeInfo.dateEncoding}"`);
    if (typeInfo.bytesEncoding)
      metadataObj.push(`bytesEncoding: "${typeInfo.bytesEncoding}"`);
    if (typeInfo.itemType) metadataObj.push(`itemType: "${typeInfo.itemType}"`);

    const nestedSerializer = getNestedXmlSerializerExpr(context, property.type);
    if (nestedSerializer) {
      metadataObj.push(`serializer: ${nestedSerializer}`);
    }

    metadataEntries.push(`{ ${metadataObj.join(", ")} }`);
  }

  return metadataEntries.join(",\n    ");
}

function buildDeserializePropertyMetadataArray(
  context: SdkContext,
  properties: SdkModelPropertyType[]
): string {
  const metadataEntries: string[] = [];

  for (const property of properties) {
    if (property.kind !== "property") continue;
    if (isMetadata(context.program, property.__raw!)) continue;

    const xmlOptions = property.serializationOptions?.xml;
    const jsonOptions = property.serializationOptions?.json;
    const propertyName = normalizeModelPropertyName(context, property);
    const cleanPropertyName = propertyName.replace(/^"|"$/g, "");

    const serializedName =
      xmlOptions?.name ?? jsonOptions?.name ?? property.name;

    const metadataObj: string[] = [
      `propertyName: "${cleanPropertyName}"`,
      `xmlOptions: { name: "${serializedName}"${buildXmlOptionsString(xmlOptions)} }`
    ];

    const typeInfo = getPropertyTypeInfo(property.type);
    if (typeInfo.type) metadataObj.push(`type: "${typeInfo.type}"`);
    if (typeInfo.dateEncoding)
      metadataObj.push(`dateEncoding: "${typeInfo.dateEncoding}"`);
    if (typeInfo.bytesEncoding)
      metadataObj.push(`bytesEncoding: "${typeInfo.bytesEncoding}"`);
    if (typeInfo.itemType) metadataObj.push(`itemType: "${typeInfo.itemType}"`);

    const nestedDeserializer = getNestedXmlDeserializerExpr(
      context,
      property.type
    );
    if (nestedDeserializer) {
      metadataObj.push(`deserializer: ${nestedDeserializer}`);
    }

    metadataEntries.push(`{ ${metadataObj.join(", ")} }`);
  }

  return metadataEntries.join(",\n    ");
}

// ── XML options string builder ──────────────────────────────────────────

function buildXmlOptionsString(xmlOptions?: {
  name: string;
  attribute?: boolean;
  ns?: { namespace: string; prefix: string };
  unwrapped?: boolean;
  itemsName?: string;
  itemsNs?: { namespace: string; prefix: string };
}): string {
  if (!xmlOptions) return "";

  const parts: string[] = [];
  if (xmlOptions.attribute) parts.push(`attribute: true`);
  if (xmlOptions.ns) {
    parts.push(
      `ns: { namespace: "${xmlOptions.ns.namespace}", prefix: "${xmlOptions.ns.prefix}" }`
    );
  }
  if (xmlOptions.unwrapped) parts.push(`unwrapped: true`);
  if (xmlOptions.itemsName) parts.push(`itemsName: "${xmlOptions.itemsName}"`);
  if (xmlOptions.itemsNs) {
    parts.push(
      `itemsNs: { namespace: "${xmlOptions.itemsNs.namespace}", prefix: "${xmlOptions.itemsNs.prefix}" }`
    );
  }

  return parts.length > 0 ? `, ${parts.join(", ")}` : "";
}

// ── Property type info ──────────────────────────────────────────────────

function getPropertyTypeInfo(type: SdkType): {
  type?: "array" | "object" | "primitive" | "date" | "bytes" | "dict";
  dateEncoding?: "rfc3339" | "rfc7231" | "unixTimestamp";
  bytesEncoding?: "base64" | "base64url";
  itemType?: "primitive" | "date" | "bytes";
} {
  switch (type.kind) {
    case "array": {
      const itemInfo = getPropertyTypeInfo(type.valueType);
      const result: ReturnType<typeof getPropertyTypeInfo> = { type: "array" };
      if (
        itemInfo.type === "bytes" ||
        itemInfo.type === "date" ||
        itemInfo.type === "primitive"
      ) {
        result.itemType = itemInfo.type as "primitive" | "date" | "bytes";
      }
      if (itemInfo.dateEncoding) result.dateEncoding = itemInfo.dateEncoding;
      if (itemInfo.bytesEncoding) result.bytesEncoding = itemInfo.bytesEncoding;
      return result;
    }
    case "model":
      return { type: "object" };
    case "dict":
      return { type: "dict" };
    case "utcDateTime":
      return {
        type: "date",
        dateEncoding:
          (type.encode as "rfc3339" | "rfc7231" | "unixTimestamp") ?? "rfc3339"
      };
    case "bytes": {
      const encode = (type as any).encode as string | undefined;
      const bytesEncoding =
        encode === "base64url" ? "base64url" : ("base64" as const);
      return { type: "bytes", bytesEncoding };
    }
    default:
      return { type: "primitive" };
  }
}

// ── Nested serializer/deserializer expression builders ──────────────────

/**
 * Returns a string expression referencing the XML object serializer for
 * nested model types. Uses `refkey` so Alloy auto-resolves the name.
 */
function getNestedXmlSerializerExpr(
  context: SdkContext,
  type: SdkType
): string | undefined {
  if (type.kind === "model") {
    if (!shouldGenerateSerializer(context, type)) return undefined;
    return `${normalizeModelName(context, type, NameType.Operation, false)}XmlObjectSerializer`;
  }
  if (type.kind === "array" && type.valueType.kind === "model") {
    if (!shouldGenerateSerializer(context, type.valueType)) return undefined;
    return `${normalizeModelName(context, type.valueType, NameType.Operation, false)}XmlObjectSerializer`;
  }
  return undefined;
}

function getNestedXmlDeserializerExpr(
  context: SdkContext,
  type: SdkType
): string | undefined {
  if (type.kind === "model") {
    if (!shouldGenerateDeserializer(context, type)) return undefined;
    return `${normalizeModelName(context, type, NameType.Operation, false)}XmlObjectDeserializer`;
  }
  if (type.kind === "array" && type.valueType.kind === "model") {
    if (!shouldGenerateDeserializer(context, type.valueType)) return undefined;
    return `${normalizeModelName(context, type.valueType, NameType.Operation, false)}XmlObjectDeserializer`;
  }
  return undefined;
}

// ── XML object property assignment builder ──────────────────────────────

function buildXmlObjectPropertyAssignments(
  context: SdkContext,
  properties: SdkModelPropertyType[]
): string {
  const isAzure = isAzurePackage({ options: context.rlcOptions ?? {} });
  const uint8ArrayToStringName = isAzure
    ? "uint8ArrayToString"
    : "uint8ArrayToString";

  const assignments: string[] = [];

  for (const property of properties) {
    if (property.kind !== "property") continue;
    if (isReadOnly(property)) continue;
    if (isMetadata(context.program, property.__raw!)) continue;

    const xmlOptions = property.serializationOptions?.xml;
    const propertyName = normalizeModelPropertyName(context, property);
    const cleanPropertyName = propertyName.replace(/^"|"$/g, "");
    const xmlName = xmlOptions?.name ?? property.name;

    const nestedSerializer = getNestedXmlSerializerExpr(context, property.type);

    let valueExpr: string;
    if (nestedSerializer && property.type.kind === "model") {
      valueExpr = `item["${cleanPropertyName}"] !== undefined ? ${nestedSerializer}(item["${cleanPropertyName}"]) : undefined`;
    } else if (
      nestedSerializer &&
      property.type.kind === "array" &&
      property.type.valueType.kind === "model"
    ) {
      const mappedExpr = `item["${cleanPropertyName}"]?.map((i: any) => ${nestedSerializer}(i))`;
      if (xmlOptions?.unwrapped) {
        const itemKey = xmlOptions?.itemsName ?? xmlName;
        assignments.push(`"${itemKey}": ${mappedExpr}`);
        continue;
      } else if (xmlOptions?.itemsName) {
        valueExpr = `{ "${xmlOptions.itemsName}": ${mappedExpr} }`;
      } else {
        valueExpr = mappedExpr;
      }
    } else if (property.type.kind === "array") {
      const primitiveExpr = buildXmlValueSerializationExpr(
        context,
        property.type,
        `item["${cleanPropertyName}"]`,
        uint8ArrayToStringName
      );
      if (xmlOptions?.unwrapped) {
        const itemKey = xmlOptions?.itemsName ?? xmlName;
        assignments.push(`"${itemKey}": ${primitiveExpr}`);
        continue;
      } else if (xmlOptions?.itemsName) {
        valueExpr = `{ "${xmlOptions.itemsName}": ${primitiveExpr} }`;
      } else {
        valueExpr = primitiveExpr;
      }
    } else {
      valueExpr = buildXmlValueSerializationExpr(
        context,
        property.type,
        `item["${cleanPropertyName}"]`,
        uint8ArrayToStringName
      );
    }

    assignments.push(`"${xmlName}": ${valueExpr}`);
  }

  return assignments.join(",\n    ");
}

// ── Value serialization expression ──────────────────────────────────────

function buildXmlValueSerializationExpr(
  context: SdkContext,
  type: SdkType,
  valueExpr: string,
  uint8ArrayToStringName: any
): string {
  switch (type.kind) {
    case "bytes":
      return `${valueExpr} !== undefined ? ${uint8ArrayToStringName}(${valueExpr}, "base64") : undefined`;

    case "utcDateTime": {
      const encoding = (type.encode as string) ?? "rfc3339";
      if (encoding === "unixTimestamp") {
        return `${valueExpr} !== undefined ? ${valueExpr}.getTime() : undefined`;
      } else if (encoding === "rfc7231") {
        return `${valueExpr} !== undefined ? ${valueExpr}.toUTCString() : undefined`;
      }
      return `${valueExpr} !== undefined ? ${valueExpr}.toISOString() : undefined`;
    }

    case "array": {
      const itemExpr = buildXmlValueSerializationExpr(
        context,
        type.valueType,
        "i",
        uint8ArrayToStringName
      );
      if (itemExpr !== "i") {
        return `${valueExpr}?.map((i: any) => ${itemExpr})`;
      }
      return valueExpr;
    }

    default:
      return valueExpr;
  }
}
