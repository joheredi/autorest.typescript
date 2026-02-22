// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * JSON serializer and deserializer components for the Alloy pipeline.
 *
 * Converts the old ts-morph-based buildSerializerFunction.ts and
 * buildDeserializerFunction.ts into Alloy JSX components that render
 * `<ts.FunctionDeclaration>` elements with refkey-based cross-references.
 */

import { Children, For, code, refkey, Refkey } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import {
  SdkArrayType,
  SdkDictionaryType,
  SdkModelPropertyType,
  SdkModelType,
  SdkType,
  SdkUnionType,
  UsageFlags
} from "@azure-tools/typespec-client-generator-core";
import { NameType, normalizeName } from "@azure-tools/rlc-common";
import { SdkContext } from "../../utils/interfaces.js";
import {
  getAllAncestors,
  getAllProperties,
  getPropertySerializedName,
  getPropertyFullName,
  getSerializationExpression,
  getRequestModelMapping,
  getResponseMapping
} from "../helpers/operationHelpers.js";
import {
  getAdditionalPropertiesName,
  normalizeModelName,
  getModelNamespaces
} from "../model-utils.js";
import { isAzureCoreErrorType } from "../../utils/modelUtils.js";
import {
  getAllDiscriminatedValues,
  isDiscriminatedUnion,
  isSupportedSerializeType,
  ModelSerializeOptions
} from "../serialization/serializeUtils.js";
import {
  getAdditionalPropertiesType,
  getDirectSubtypes,
  getNullableValidType
} from "../helpers/typeHelpers.js";
import { emitQueue } from "../../framework/hooks/sdkTypes.js";
import { reportDiagnostic } from "../../lib.js";
import { NoTarget } from "@typespec/compiler";
import { isOrExtendsHttpFile } from "@typespec/http";
import { useSdkTypes } from "./context/SdkContextProvider.js";

// ── Refkey helpers ──────────────────────────────────────────────────────

/** Refkey for a JSON serializer function */
export function serializerRefkey(type: SdkType | SdkModelPropertyType): Refkey {
  return refkey(type, "serializer");
}

/** Refkey for a JSON deserializer function */
export function deserializerRefkey(
  type: SdkType | SdkModelPropertyType
): Refkey {
  return refkey(type, "deserializer");
}

// ── Props ───────────────────────────────────────────────────────────────

export interface SerializersProps {
  context: SdkContext;
  sourceRoot: string;
}

// ── Root component ──────────────────────────────────────────────────────

/**
 * Renders JSON serializer and deserializer functions for all types
 * that require (de)serialization. Emits into namespace-grouped
 * source files under `{sourceRoot}/models/`.
 */
export function Serializers(props: SerializersProps) {
  const { context, sourceRoot } = props;

  // Collect types that need serialization from the emit queue
  const serializableTypes: Array<SdkType | SdkModelPropertyType> = [];

  for (const type of emitQueue) {
    if (!isGenerableSerializeType(type)) continue;
    serializableTypes.push(type);
  }

  // Add flattened properties
  const sdkTypes = useSdkTypes();
  for (const [property] of sdkTypes.flattenProperties) {
    serializableTypes.push(property);
  }

  if (serializableTypes.length === 0) return null;

  // Group by file path (same grouping as Models.tsx)
  const fileGroups = groupByFile(context, sourceRoot, serializableTypes);

  return (
    <For each={Array.from(fileGroups.entries())}>
      {([filepath, types]) => (
        <ts.SourceFile path={filepath}>
          <For each={types} hardline>
            {(typeOrProp) => (
              <TypeSerializers context={context} typeOrProp={typeOrProp} />
            )}
          </For>
        </ts.SourceFile>
      )}
    </For>
  );
}

// ── File grouping ───────────────────────────────────────────────────────

function isGenerableSerializeType(type: SdkType): boolean {
  return (
    type.kind === "model" ||
    type.kind === "union" ||
    type.kind === "enum" ||
    type.kind === "dict" ||
    type.kind === "array"
  );
}

function groupByFile(
  context: SdkContext,
  sourceRoot: string,
  types: Array<SdkType | SdkModelPropertyType>
): Map<string, Array<SdkType | SdkModelPropertyType>> {
  const groups = new Map<string, Array<SdkType | SdkModelPropertyType>>();
  for (const typeOrProp of types) {
    const type = typeOrProp.kind === "property" ? typeOrProp.type : typeOrProp;
    const namespaces = getModelNamespaces(context, type);
    const filepath = getModelsPath(sourceRoot, namespaces);
    if (!groups.has(filepath)) groups.set(filepath, []);
    groups.get(filepath)!.push(typeOrProp);
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

// ── Per-type component ──────────────────────────────────────────────────

interface TypeSerializersComponentProps {
  context: SdkContext;
  typeOrProp: SdkType | SdkModelPropertyType;
}

function TypeSerializers(props: TypeSerializersComponentProps) {
  const { context, typeOrProp } = props;

  if (typeOrProp.kind === "property") {
    return (
      <>
        <FlattenPropertySerializerFn context={context} property={typeOrProp} />
        <FlattenPropertyDeserializerFn
          context={context}
          property={typeOrProp}
        />
      </>
    );
  }

  return (
    <>
      <SerializerDispatch context={context} type={typeOrProp} />
      <DeserializerDispatch context={context} type={typeOrProp} />
    </>
  );
}

// ── Serializer dispatch ─────────────────────────────────────────────────

interface SerializerDispatchProps {
  context: SdkContext;
  type: SdkType;
}

function SerializerDispatch(props: SerializerDispatchProps): Children {
  const { context, type } = props;

  if (!shouldGenerateSerializer(context, type)) return null;

  // Polymorphic base model (has discriminator but is not a discriminated union itself)
  if (
    !isDiscriminatedUnion(type) &&
    type.kind === "model" &&
    type.discriminatorProperty
  ) {
    return <PolymorphicSerializerFn context={context} type={type} />;
  }

  // Discriminated union (concrete model with discriminator subtypes)
  if (isDiscriminatedUnion(type) && type.kind === "model") {
    return <DiscriminatedUnionSerializerFn context={context} type={type} />;
  }

  switch (type.kind) {
    case "model":
      return <ModelTypeSerializerFn context={context} type={type} />;
    case "union":
      return (
        <UnionSerializerFn context={context} type={type as SdkUnionType} />
      );
    case "dict":
      return (
        <DictTypeSerializerFn
          context={context}
          type={type as SdkDictionaryType}
        />
      );
    case "array":
      return (
        <ArrayTypeSerializerFn context={context} type={type as SdkArrayType} />
      );
    default:
      return null;
  }
}

// ── Deserializer dispatch ───────────────────────────────────────────────

interface DeserializerDispatchProps {
  context: SdkContext;
  type: SdkType;
}

function DeserializerDispatch(props: DeserializerDispatchProps): Children {
  const { context, type } = props;

  if (!shouldGenerateDeserializer(context, type)) return null;

  if (
    !isDiscriminatedUnion(type) &&
    type.kind === "model" &&
    type.discriminatorProperty
  ) {
    return <PolymorphicDeserializerFn context={context} type={type} />;
  }

  if (isDiscriminatedUnion(type) && type.kind === "model") {
    return <DiscriminatedUnionDeserializerFn context={context} type={type} />;
  }

  switch (type.kind) {
    case "model":
      return <ModelTypeDeserializerFn context={context} type={type} />;
    case "union":
      return (
        <UnionDeserializerFn context={context} type={type as SdkUnionType} />
      );
    case "dict":
      return (
        <DictTypeDeserializerFn
          context={context}
          type={type as SdkDictionaryType}
        />
      );
    case "array":
      return (
        <ArrayTypeDeserializerFn
          context={context}
          type={type as SdkArrayType}
        />
      );
    default:
      return null;
  }
}

// ── Guards ──────────────────────────────────────────────────────────────

function shouldGenerateSerializer(context: SdkContext, type: SdkType): boolean {
  if (!isSupportedSerializeType(type)) return false;
  if (type.kind === "model" || type.kind === "union" || type.kind === "enum") {
    if (
      !type.usage ||
      (type.usage !== undefined &&
        (type.usage & UsageFlags.Input) !== UsageFlags.Input)
    ) {
      return false;
    }
    if (!type.name) return false;
    if (
      isAzureCoreErrorType(context.program, type.__raw!) ||
      isOrExtendsHttpFile(context.program, type.__raw!)
    ) {
      return false;
    }
  }
  return true;
}

function shouldGenerateDeserializer(
  context: SdkContext,
  type: SdkType
): boolean {
  if (!isSupportedSerializeType(type)) return false;
  if (type.kind === "model" || type.kind === "union" || type.kind === "enum") {
    if (
      !type.usage ||
      (type.usage !== undefined &&
        (type.usage & UsageFlags.Output) !== UsageFlags.Output &&
        (type.usage & UsageFlags.Exception) !== UsageFlags.Exception)
    ) {
      return false;
    }
    if (!type.name) return false;
    if (isAzureCoreErrorType(context.program, type.__raw!)) {
      return false;
    }
  }
  return true;
}

/**
 * Checks if a type has a serializer function (without generating it).
 * Used for building property expressions.
 */
function hasSerializerFunction(context: SdkContext, type: SdkType): boolean {
  const validType = getNullableValidType(type);
  if (!isSupportedSerializeType(validType)) return false;
  if (
    validType.kind === "model" ||
    validType.kind === "union" ||
    validType.kind === "enum"
  ) {
    if (
      !validType.usage ||
      (validType.usage !== undefined &&
        (validType.usage & UsageFlags.Input) !== UsageFlags.Input)
    ) {
      return false;
    }
    if (!validType.name) return false;
    if (
      isAzureCoreErrorType(context.program, validType.__raw!) ||
      isOrExtendsHttpFile(context.program, validType.__raw!)
    ) {
      return false;
    }
  }
  // Recursively check nested value types for dict/array
  if (validType.kind === "dict") {
    return hasSerializerFunction(context, validType.valueType);
  }
  if (validType.kind === "array") {
    return hasSerializerFunction(context, validType.valueType);
  }
  return true;
}

function hasDeserializerFunction(context: SdkContext, type: SdkType): boolean {
  const validType = getNullableValidType(type);
  if (!isSupportedSerializeType(validType)) return false;
  if (
    validType.kind === "model" ||
    validType.kind === "union" ||
    validType.kind === "enum"
  ) {
    if (
      !validType.usage ||
      (validType.usage !== undefined &&
        (validType.usage & UsageFlags.Output) !== UsageFlags.Output &&
        (validType.usage & UsageFlags.Exception) !== UsageFlags.Exception)
    ) {
      return false;
    }
    if (!validType.name) return false;
    if (isAzureCoreErrorType(context.program, validType.__raw!)) {
      return false;
    }
  }
  // Recursively check nested value types for dict/array
  if (validType.kind === "dict") {
    return hasDeserializerFunction(context, validType.valueType);
  }
  if (validType.kind === "array") {
    return hasDeserializerFunction(context, validType.valueType);
  }
  return true;
}

// ═══════════════════════════════════════════════════════════════════════
// SERIALIZERS
// ═══════════════════════════════════════════════════════════════════════

// ── Polymorphic Serializer ──────────────────────────────────────────────

function PolymorphicSerializerFn(props: {
  context: SdkContext;
  type: SdkModelType;
}): Children {
  const { context, type } = props;

  if (!type.name) {
    reportDiagnostic(context.program, {
      code: "anonymous-type-serialization",
      target: type.__raw || NoTarget
    });
    return null;
  }

  if (!type.discriminatorProperty) return null;

  const functionName = `${normalizeModelName(
    context,
    type,
    NameType.Operation
  )}Serializer`;

  const subTypes = type.discriminatedSubtypes;
  if (!subTypes) {
    // No subtypes — fall back to regular model serializer
    return <ModelTypeSerializerFn context={context} type={type} />;
  }

  const cases: Children[] = [];
  Object.keys(subTypes).forEach((discriminatedValue) => {
    const subType = subTypes[discriminatedValue];
    if (
      !subType?.usage ||
      (subType?.usage !== undefined &&
        (subType.usage & UsageFlags.Input) !== UsageFlags.Input)
    ) {
      return;
    }
    const union = subType?.discriminatedSubtypes ? "_Union" : "";
    if (!subType || !subType?.name) {
      reportDiagnostic(context.program, {
        code: "anonymous-type-serialization",
        target: subType?.__raw || NoTarget
      });
      return;
    }
    const rawSubTypeName = `${subType.name}${union}`;
    const subTypeName = `${normalizeName(rawSubTypeName, NameType.Interface, true)}`;
    const subtypeSerializerName = normalizeName(
      `${rawSubTypeName}_Serializer`,
      NameType.Method,
      true
    );

    cases.push(
      `case "${discriminatedValue}":\n  return ${subtypeSerializerName}(item as ${subTypeName});`
    );
  });

  const discriminatorPropName = normalizeName(
    type.discriminatorProperty.name,
    NameType.Property
  );

  return (
    <ts.FunctionDeclaration
      export
      name={functionName}
      refkey={serializerRefkey(type)}
      parameters={[{ name: "item", type: refkey(type, "polymorphicType") }]}
      returnType="any"
    >
      {code`switch (item.${discriminatorPropName}) {\n  ${cases.join("\n  ")}\n  default:\n    return item;\n}`}
    </ts.FunctionDeclaration>
  );
}

// ── Discriminated Union Serializer ──────────────────────────────────────

function DiscriminatedUnionSerializerFn(props: {
  context: SdkContext;
  type: SdkModelType;
}): Children {
  const { context, type } = props;

  if (!type.name) {
    reportDiagnostic(context.program, {
      code: "anonymous-type-serialization",
      target: type.__raw || NoTarget
    });
    return null;
  }

  const functionName = `${normalizeModelName(
    context,
    type,
    NameType.Operation
  )}Serializer`;

  const baseSerializerName = `${normalizeModelName(
    context,
    type,
    NameType.Operation,
    true
  )}Serializer`;

  const directSubtypes = getDirectSubtypes(type);
  const cases: Children[] = [];

  for (const subType of directSubtypes) {
    if (
      !subType.usage ||
      (subType.usage !== undefined &&
        (subType.usage & UsageFlags.Input) !== UsageFlags.Input)
    ) {
      continue;
    }
    const discriminatedValues = getAllDiscriminatedValues(
      subType,
      type.discriminatorProperty
    );
    const union = subType.discriminatedSubtypes ? "Union" : "";
    const subTypeName = normalizeModelName(
      context,
      subType,
      NameType.Interface,
      !union
    );
    const subtypeSerializerRef = serializerRefkey(subType);

    const caseLabels = discriminatedValues
      .map((value) => `case "${value}":`)
      .join("\n  ");
    cases.push(
      code`${caseLabels}\n    return ${subtypeSerializerRef}(item as ${subTypeName});`
    );
  }

  const discriminatorPropName = type.discriminatorProperty
    ? normalizeName(type.discriminatorProperty.name, NameType.Property)
    : "unknown";

  return (
    <ts.FunctionDeclaration
      export
      name={functionName}
      refkey={serializerRefkey(type)}
      parameters={[{ name: "item", type: refkey(type, "polymorphicType") }]}
      returnType="any"
    >
      {code`switch (item.${discriminatorPropName}) {\n  ${cases}\n  default:\n    return ${baseSerializerName}(item);\n}`}
    </ts.FunctionDeclaration>
  );
}

// ── Union Serializer ────────────────────────────────────────────────────

function UnionSerializerFn(props: {
  context: SdkContext;
  type: SdkUnionType;
}): Children {
  const { context, type } = props;

  if (!type.name) {
    reportDiagnostic(context.program, {
      code: "anonymous-type-serialization",
      target: type.__raw || NoTarget
    });
    return null;
  }

  const functionName = `${normalizeModelName(
    context,
    type,
    NameType.Operation
  )}Serializer`;

  return (
    <ts.FunctionDeclaration
      export
      name={functionName}
      refkey={serializerRefkey(type)}
      parameters={[{ name: "item", type: refkey(type) }]}
      returnType="any"
    >
      {"return item;"}
    </ts.FunctionDeclaration>
  );
}

// ── Model Type Serializer ───────────────────────────────────────────────

function ModelTypeSerializerFn(props: {
  context: SdkContext;
  type: SdkModelType;
  options?: ModelSerializeOptions;
}): Children {
  const { context, type, options } = props;
  const opts = options ?? {
    nameOnly: false,
    skipDiscriminatedUnionSuffix: false
  };

  if (!type.name) {
    reportDiagnostic(context.program, {
      code: "anonymous-type-deserialization",
      target: type.__raw || NoTarget
    });
    return null;
  }

  const functionName =
    opts.predefinedName ??
    `${normalizeModelName(
      context,
      type,
      NameType.Operation,
      opts.skipDiscriminatedUnionSuffix
    )}Serializer`;

  const fnRefkey = opts.flatten
    ? serializerRefkey(opts.flatten.property)
    : serializerRefkey(type);
  const paramType = opts.flatten
    ? refkey(opts.flatten.baseModel)
    : refkey(type);

  // Check for multipart form data
  if (
    (type.usage & UsageFlags.Input) === UsageFlags.Input &&
    (type.usage & UsageFlags.MultipartFormData) === UsageFlags.MultipartFormData
  ) {
    return (
      <MultipartSerializerFn
        context={context}
        type={type}
        functionName={functionName}
        fnRefkey={fnRefkey}
        paramType={paramType}
      />
    );
  }

  // Build property mappings using the old helper functions.
  // getRequestModelMapping returns string[] with property mappings.
  // These strings may contain old binder placeholders from resolveReference,
  // but during the coexistence period, the ts-morph pipeline also generates
  // serializers (for binder registration), and the Alloy output takes
  // precedence via writeOutput.
  const additionalPropertiesSpread = getAdditionalPropertiesSerializeStatement(
    context,
    type
  );

  const propertiesStr = getRequestModelMapping(
    context,
    type,
    "item",
    opts.overrides,
    !opts.flatten
  );

  if (additionalPropertiesSpread) {
    propertiesStr.unshift(additionalPropertiesSpread);
  }

  const body =
    propertiesStr.length > 0
      ? `return {${propertiesStr.join(",")}}`
      : "return item;";

  return (
    <ts.FunctionDeclaration
      export
      name={functionName}
      refkey={fnRefkey}
      parameters={[{ name: "item", type: paramType }]}
      returnType="any"
    >
      {body}
    </ts.FunctionDeclaration>
  );
}

// ── Multipart Serializer ────────────────────────────────────────────────

function MultipartSerializerFn(props: {
  context: SdkContext;
  type: SdkModelType;
  functionName: string;
  fnRefkey: Refkey;
  paramType: Refkey;
}): Children {
  const { context, type, functionName, fnRefkey, paramType } = props;

  const properties = getAllProperties(context, type, getAllAncestors(type));
  const parts: string[] = [];

  for (const property of properties) {
    if (property.kind !== "property") continue;
    const expr = getSerializationExpression(context, property, "item");

    const multipart = property.serializationOptions.multipart;
    if (!multipart) continue;

    let partDefinition: string;
    if (multipart.isFilePart) {
      const contentType =
        multipart.defaultContentTypes?.[0] === "*/*"
          ? undefined
          : multipart.defaultContentTypes?.[0];
      const propertyAccessor = getPropertyFullName(context, property, "item");

      if (multipart.isMulti) {
        // For multipart with createFilePartDescriptor, we embed a string reference.
        // The refkey for createFilePartDescriptor is used in the code template.
        partDefinition = `...(${propertyAccessor}.map((x: unknown) => createFilePartDescriptor("${multipart.name}", x${contentType ? `,"${contentType}"` : ""})))`;
      } else {
        partDefinition = `createFilePartDescriptor("${multipart.name}", ${propertyAccessor}${contentType ? `, "${contentType}"` : ""})`;
      }
    } else if (multipart.isMulti) {
      partDefinition = `...((${expr}).map((x: unknown) => ({ name: "${multipart.name}", body: x })))`;
    } else {
      partDefinition = `{ name: "${multipart.name}", body: (${expr}) }`;
    }

    if (property.optional) {
      parts.push(
        `...(${getPropertyFullName(context, property, "item")} === undefined ? [] : [${partDefinition}])`
      );
    } else {
      parts.push(partDefinition);
    }
  }

  return (
    <ts.FunctionDeclaration
      export
      name={functionName}
      refkey={fnRefkey}
      parameters={[{ name: "item", type: paramType }]}
      returnType="any"
    >
      {code`return [${parts.join(",")}]`}
    </ts.FunctionDeclaration>
  );
}

// ── Dict Type Serializer ────────────────────────────────────────────────

function DictTypeSerializerFn(props: {
  context: SdkContext;
  type: SdkDictionaryType;
}): Children {
  const { context, type } = props;

  if (!isSupportedSerializeType(type.valueType)) return null;
  if (!hasSerializerFunction(context, type.valueType)) return null;

  const functionName = `${normalizeModelName(
    context,
    type,
    NameType.Operation,
    false,
    true
  )}Serializer`;

  const valueSerializerRef = serializerRefkey(type.valueType);
  const valueTypeName = normalizeModelName(context, type.valueType as any);

  return (
    <ts.FunctionDeclaration
      export
      name={functionName}
      refkey={serializerRefkey(type)}
      parameters={[
        {
          name: "item",
          type: `Record<string, ${valueTypeName}>`
        }
      ]}
      returnType="Record<string, any>"
    >
      {code`const result: Record<string, any> = {};
Object.keys(item).map((key) => {
  result[key] = !item[key]? item[key]: ${valueSerializerRef}(item[key])
});
return result;`}
    </ts.FunctionDeclaration>
  );
}

// ── Array Type Serializer ───────────────────────────────────────────────

function ArrayTypeSerializerFn(props: {
  context: SdkContext;
  type: SdkArrayType;
}): Children {
  const { context, type } = props;

  if (!isSupportedSerializeType(type.valueType)) return null;
  if (!hasSerializerFunction(context, type.valueType)) return null;

  const functionName = `${normalizeModelName(
    context,
    type,
    NameType.Operation,
    false,
    true
  )}Serializer`;

  const valueSerializerRef = serializerRefkey(type.valueType);
  const valueTypeName =
    normalizeModelName(context, type.valueType as any) ?? "any";

  return (
    <ts.FunctionDeclaration
      export
      name={functionName}
      refkey={serializerRefkey(type)}
      parameters={[{ name: "result", type: `Array<${valueTypeName}>` }]}
      returnType="any[]"
    >
      {code`return result.map((item) => {
  return ${valueSerializerRef}(item)
});`}
    </ts.FunctionDeclaration>
  );
}

// ── Flatten Property Serializer ─────────────────────────────────────────

function FlattenPropertySerializerFn(props: {
  context: SdkContext;
  property: SdkModelPropertyType;
}): Children {
  const { context, property } = props;

  const sdkTypes = useSdkTypes();
  const propertyContext = sdkTypes.flattenProperties.get(property);
  if (property.flatten !== true || !propertyContext) return null;

  const predefinedName = `_${normalizeName(
    `${propertyContext.baseModel.name}_${property.name}`,
    NameType.Method,
    true
  )}Serializer`;

  return (
    <ModelTypeSerializerFn
      context={context}
      type={property.type as SdkModelType}
      options={{
        nameOnly: false,
        skipDiscriminatedUnionSuffix: false,
        flatten: {
          baseModel: propertyContext.baseModel,
          property
        },
        overrides: {
          allOptional: property.optional,
          propertyRenames: propertyContext.conflictMap
        },
        predefinedName
      }}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════
// DESERIALIZERS
// ═══════════════════════════════════════════════════════════════════════

// ── Polymorphic Deserializer ────────────────────────────────────────────

function PolymorphicDeserializerFn(props: {
  context: SdkContext;
  type: SdkModelType;
}): Children {
  const { context, type } = props;

  if (!type.name) {
    reportDiagnostic(context.program, {
      code: "anonymous-type-deserialization",
      target: type.__raw || NoTarget
    });
    return null;
  }

  if (!type.discriminatorProperty) return null;

  const functionName = `${normalizeModelName(
    context,
    type,
    NameType.Operation
  )}Deserializer`;

  const subTypes = type.discriminatedSubtypes;
  if (!subTypes) {
    return <ModelTypeDeserializerFn context={context} type={type} />;
  }

  const cases: Children[] = [];
  Object.keys(subTypes).forEach((discriminatedValue) => {
    const subType = subTypes[discriminatedValue];
    if (
      !subType?.usage ||
      (subType?.usage !== undefined &&
        (subType.usage & UsageFlags.Output) !== UsageFlags.Output)
    ) {
      return;
    }
    const union = subType?.discriminatedSubtypes ? "_Union" : "";
    if (!subType || !subType?.name) {
      reportDiagnostic(context.program, {
        code: "anonymous-type-deserialization",
        target: subType?.__raw || NoTarget
      });
      return;
    }

    const rawSubTypeName = `${subType.name}${union}`;
    const subTypeName = `${normalizeName(rawSubTypeName, NameType.Interface, true)}`;
    const subtypeDeserializerName = normalizeName(
      `${subTypeName}Deserializer`,
      NameType.Operation,
      true
    );

    cases.push(
      `case "${discriminatedValue}":\n  return ${subtypeDeserializerName}(item as ${subTypeName});`
    );
  });

  const discriminatorWireName = getPropertySerializedName(
    type.discriminatorProperty
  );

  return (
    <ts.FunctionDeclaration
      export
      name={functionName}
      refkey={deserializerRefkey(type)}
      parameters={[{ name: "item", type: "any" }]}
      returnType={refkey(type, "polymorphicType")}
    >
      {code`switch (item["${discriminatorWireName}"]) {\n  ${cases.join("\n  ")}\n  default:\n    return item;\n}`}
    </ts.FunctionDeclaration>
  );
}

// ── Discriminated Union Deserializer ────────────────────────────────────

function DiscriminatedUnionDeserializerFn(props: {
  context: SdkContext;
  type: SdkModelType;
}): Children {
  const { context, type } = props;

  if (!type.name) {
    reportDiagnostic(context.program, {
      code: "anonymous-type-deserialization",
      target: type.__raw || NoTarget
    });
    return null;
  }

  const functionName = `${normalizeModelName(
    context,
    type,
    NameType.Operation
  )}Deserializer`;

  const baseDeserializerName = `${normalizeModelName(
    context,
    type,
    NameType.Operation,
    true
  )}Deserializer`;

  const directSubtypes = getDirectSubtypes(type);
  const cases: Children[] = [];

  for (const subType of directSubtypes) {
    if (
      !subType.usage ||
      (subType.usage !== undefined &&
        (subType.usage & UsageFlags.Output) !== UsageFlags.Output)
    ) {
      continue;
    }
    const discriminatedValues = getAllDiscriminatedValues(
      subType,
      type.discriminatorProperty
    );
    const union = subType.discriminatedSubtypes ? "Union" : "";
    const subTypeName = normalizeModelName(
      context,
      subType,
      NameType.Interface,
      !union
    );
    const subtypeDeserializerRef = deserializerRefkey(subType);

    const caseLabels = discriminatedValues
      .map((value) => `case "${value}":`)
      .join("\n  ");
    cases.push(
      code`${caseLabels}\n    return ${subtypeDeserializerRef}(item as ${subTypeName});`
    );
  }

  const discriminatorWireName = type.discriminatorProperty
    ? getPropertySerializedName(type.discriminatorProperty)
    : "unknown";

  return (
    <ts.FunctionDeclaration
      export
      name={functionName}
      refkey={deserializerRefkey(type)}
      parameters={[{ name: "item", type: "any" }]}
      returnType={refkey(type, "polymorphicType")}
    >
      {code`switch (item["${discriminatorWireName}"]) {\n  ${cases}\n  default:\n    return ${baseDeserializerName}(item);\n}`}
    </ts.FunctionDeclaration>
  );
}

// ── Union Deserializer ──────────────────────────────────────────────────

function UnionDeserializerFn(props: {
  context: SdkContext;
  type: SdkUnionType;
}): Children {
  const { context, type } = props;

  if (!type.name) {
    reportDiagnostic(context.program, {
      code: "anonymous-type-deserialization",
      target: type.__raw || NoTarget
    });
    return null;
  }

  const functionName = `${normalizeModelName(
    context,
    type,
    NameType.Operation
  )}Deserializer`;

  return (
    <ts.FunctionDeclaration
      export
      name={functionName}
      refkey={deserializerRefkey(type)}
      parameters={[{ name: "item", type: "any" }]}
      returnType={refkey(type)}
    >
      {"return item;"}
    </ts.FunctionDeclaration>
  );
}

// ── Model Type Deserializer ─────────────────────────────────────────────

function ModelTypeDeserializerFn(props: {
  context: SdkContext;
  type: SdkModelType;
  options?: ModelSerializeOptions;
}): Children {
  const { context, type, options } = props;
  const opts = options ?? {
    nameOnly: false,
    skipDiscriminatedUnionSuffix: false
  };

  if (!type.name) {
    reportDiagnostic(context.program, {
      code: "anonymous-type-deserialization",
      target: type.__raw || NoTarget
    });
    return null;
  }

  const functionName =
    opts.predefinedName ??
    `${normalizeModelName(
      context,
      type,
      NameType.Operation,
      opts.skipDiscriminatedUnionSuffix
    )}Deserializer`;

  const fnRefkey = opts.flatten
    ? deserializerRefkey(opts.flatten.property)
    : deserializerRefkey(type);

  const returnType = opts.flatten ? undefined : refkey(type);

  // Build property mappings using the old helper functions
  const additionalPropertiesSpread =
    getAdditionalPropertiesDeserializeStatement(context, type) ?? "";

  const propertiesStr = getResponseMapping(
    context,
    type,
    "item",
    opts.overrides,
    !opts.flatten
  );
  const propertiesDeserialization = propertiesStr.filter((p) => p.trim());

  let body: string;
  if (propertiesDeserialization.length || additionalPropertiesSpread) {
    const fnBody = `{
           ${additionalPropertiesSpread}
            ${propertiesDeserialization.join(",\n")}
        }`;
    body = `return ${fnBody}`;
  } else {
    body = "return item;";
  }

  return (
    <ts.FunctionDeclaration
      export
      name={functionName}
      refkey={fnRefkey}
      parameters={[{ name: "item", type: "any" }]}
      returnType={returnType}
    >
      {body}
    </ts.FunctionDeclaration>
  );
}

// ── Dict Type Deserializer ──────────────────────────────────────────────

function DictTypeDeserializerFn(props: {
  context: SdkContext;
  type: SdkDictionaryType;
}): Children {
  const { context, type } = props;

  if (!isSupportedSerializeType(type.valueType)) return null;
  if (!hasDeserializerFunction(context, type.valueType)) return null;

  const functionName = `${normalizeModelName(
    context,
    type,
    NameType.Operation,
    false,
    true
  )}Deserializer`;

  const valueDeserializerRef = deserializerRefkey(type.valueType);
  const valueTypeName = normalizeModelName(context, type.valueType as any);

  return (
    <ts.FunctionDeclaration
      export
      name={functionName}
      refkey={deserializerRefkey(type)}
      parameters={[{ name: "item", type: "Record<string, any>" }]}
      returnType={`Record<string, ${valueTypeName}>`}
    >
      {code`const result: Record<string, any> = {};
Object.keys(item).map((key) => {
  result[key] = !item[key]? item[key]: ${valueDeserializerRef}(item[key])
});
return result;`}
    </ts.FunctionDeclaration>
  );
}

// ── Array Type Deserializer ─────────────────────────────────────────────

function ArrayTypeDeserializerFn(props: {
  context: SdkContext;
  type: SdkArrayType;
}): Children {
  const { context, type } = props;

  if (!isSupportedSerializeType(type.valueType)) return null;
  if (!hasDeserializerFunction(context, type.valueType)) return null;

  const functionName = `${normalizeModelName(
    context,
    type,
    NameType.Operation,
    false,
    true
  )}Deserializer`;

  const valueDeserializerRef = deserializerRefkey(type.valueType);
  const valueTypeName =
    normalizeModelName(context, type.valueType as any) ?? "any";

  return (
    <ts.FunctionDeclaration
      export
      name={functionName}
      refkey={deserializerRefkey(type)}
      parameters={[{ name: "result", type: `Array<${valueTypeName}>` }]}
      returnType="any[]"
    >
      {code`return result.map((item) => {
  return ${valueDeserializerRef}(item)
});`}
    </ts.FunctionDeclaration>
  );
}

// ── Flatten Property Deserializer ───────────────────────────────────────

function FlattenPropertyDeserializerFn(props: {
  context: SdkContext;
  property: SdkModelPropertyType;
}): Children {
  const { context, property } = props;

  const sdkTypes = useSdkTypes();
  const propertyContext = sdkTypes.flattenProperties.get(property);
  if (property.flatten !== true || !propertyContext) return null;

  const predefinedName = `_${normalizeName(
    `${propertyContext.baseModel.name}_${property.name}`,
    NameType.Method,
    true
  )}Deserializer`;

  return (
    <ModelTypeDeserializerFn
      context={context}
      type={property.type as SdkModelType}
      options={{
        nameOnly: false,
        skipDiscriminatedUnionSuffix: false,
        flatten: {
          baseModel: propertyContext.baseModel,
          property
        },
        overrides: {
          allOptional: property.optional,
          propertyRenames: propertyContext.conflictMap
        },
        predefinedName
      }}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════
// HELPER: Additional properties statements
// ═══════════════════════════════════════════════════════════════════════

function getAdditionalPropertiesSerializeStatement(
  context: SdkContext,
  type: SdkModelType
): string | undefined {
  const additionalPropertyType = getAdditionalPropertiesType(type);
  if (!additionalPropertyType) return undefined;

  // Check if the additional property type has a serializer
  const serializerName = hasSerializerFunction(context, additionalPropertyType)
    ? `${normalizeModelName(context, additionalPropertyType as any, NameType.Operation)}Serializer`
    : undefined;

  const params = [`item.${getAdditionalPropertiesName(context, type)} ?? {}`];
  if (serializerName) {
    params.push("undefined");
    params.push(serializerName);
  }

  return context.rlcOptions?.compatibilityMode === true
    ? "...item"
    : `...serializeRecord(${params.join(",")})`;
}

function getAdditionalPropertiesDeserializeStatement(
  context: SdkContext,
  type: SdkModelType
): string | undefined {
  const additionalPropertyType = getAdditionalPropertiesType(type);
  if (!additionalPropertyType) return undefined;

  const allParents = getAllAncestors(type);
  const properties = getAllProperties(context, type, allParents);
  const excludeProperties = properties
    .filter((p) => !!p.name)
    .map((p) => `"${p.name}"`);

  const params = ["item"];
  params.push(`[${excludeProperties.join(",")}]`);

  const deserializerName = hasDeserializerFunction(
    context,
    additionalPropertyType
  )
    ? `${normalizeModelName(context, additionalPropertyType as any, NameType.Operation)}Deserializer`
    : undefined;

  if (deserializerName) {
    params.push(deserializerName);
  }

  return context.rlcOptions?.compatibilityMode === true
    ? "...item,"
    : `${getAdditionalPropertiesName(context, type)}: serializeRecord(${params.join(",")}),`;
}
