import { Children, For, refkey, Refkey } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import {
  SdkArrayType,
  SdkDictionaryType,
  SdkEnumType,
  SdkEnumValueType,
  SdkModelPropertyType,
  SdkModelType,
  SdkNullableType,
  SdkType,
  SdkUnionType,
  UsageFlags,
  isReadOnly
} from "@azure-tools/typespec-client-generator-core";
import {
  fixLeadingNumber,
  NameType,
  normalizeName
} from "@azure-tools/rlc-common";
import { SdkContext } from "../../utils/interfaces.js";
import { isMetadata } from "@typespec/http";
import { isAzureCoreErrorType } from "../../utils/modelUtils.js";
import { isExtensibleEnum } from "../type-expressions/get-enum-expression.js";
import {
  getTypeExpression,
  normalizeModelPropertyName
} from "../type-expressions/get-type-expression.js";
import {
  getModelExpression,
  getMultipartFileTypeExpression
} from "../type-expressions/get-model-expression.js";
import {
  getAllDiscriminatedValues,
  getPropertyWithOverrides,
  isDiscriminatedUnion
} from "../serialization/serializeUtils.js";
import {
  getModelNamespaces,
  normalizeModelName,
  getAdditionalPropertiesName
} from "../emitModels.js";
import { emitQueue } from "../../framework/hooks/sdkTypes.js";
import {
  getAllAncestors,
  getAllProperties
} from "../helpers/operationHelpers.js";
import { getDirectSubtypes } from "../helpers/typeHelpers.js";
import { useContext } from "../../contextManager.js";
import { reportDiagnostic } from "../../lib.js";
import { NoTarget } from "@typespec/compiler";
import { isOrExtendsHttpFile } from "@typespec/http";

// ── Refkey helpers ──────────────────────────────────────────────────────

/** Create a stable refkey for a TCGC type (model, enum, union, etc.) */
export function typeRefkey(type: SdkType): Refkey {
  return refkey(type);
}

/** Refkey for the polymorphic union type alias of a model */
export function polymorphicTypeRefkey(type: SdkModelType): Refkey {
  return refkey(type, "polymorphicType");
}

/** Refkey for the KnownValues enum of an extensible enum */
export function knownValuesRefkey(type: SdkEnumType): Refkey {
  return refkey(type, "knownValues");
}

/** Refkey for a named KnownValues enum (api version only) */
export function namedKnownValuesRefkey(name: string): Refkey {
  return refkey(name, "knownValues");
}

// ── Root Models component ───────────────────────────────────────────────

export interface ModelsProps {
  context: SdkContext;
  sourceRoot: string;
}

/**
 * Top-level Models component. Emits all model types (interfaces, enums,
 * unions, type aliases) and their serialization functions into
 * namespace-grouped source files under `{sourceRoot}/models/`.
 */
export function Models(props: ModelsProps) {
  const { context, sourceRoot } = props;

  // Group types by their target file path
  const fileGroups = groupTypesByFile(context, sourceRoot);

  return (
    <For each={Array.from(fileGroups.entries())}>
      {([filepath, types]) => (
        <ts.SourceFile path={filepath}>
          {`/**\n * This file contains only generated model types and their (de)serializers.\n * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.\n */\n/* eslint-disable @typescript-eslint/naming-convention */\n/* eslint-disable @typescript-eslint/explicit-module-boundary-types */`}
          <For each={types} hardline>
            {(type) => <ModelType context={context} type={type} />}
          </For>
        </ts.SourceFile>
      )}
    </For>
  );
}

// ── Type grouping ───────────────────────────────────────────────────────

function groupTypesByFile(
  context: SdkContext,
  sourceRoot: string
): Map<string, SdkType[]> {
  const groups = new Map<string, SdkType[]>();
  for (const type of emitQueue) {
    if (!isGenerableType(type)) continue;
    const namespaces = getModelNamespaces(context, type);
    const filepath = getModelsPath(sourceRoot, namespaces);
    if (!groups.has(filepath)) groups.set(filepath, []);
    groups.get(filepath)!.push(type);
  }
  return groups;
}

function isGenerableType(
  type: SdkType
): type is
  | SdkModelType
  | SdkEnumType
  | SdkUnionType
  | SdkDictionaryType
  | SdkArrayType
  | SdkNullableType {
  return (
    type.kind === "model" ||
    type.kind === "enum" ||
    type.kind === "union" ||
    type.kind === "dict" ||
    type.kind === "array" ||
    (type.kind === "nullable" &&
      isGenerableType(type.type) &&
      Boolean(type.name) &&
      !type.isGeneratedName)
  );
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

// ── Individual type component ───────────────────────────────────────────

interface ModelTypeProps {
  context: SdkContext;
  type: SdkType;
}

function ModelType(props: ModelTypeProps) {
  const { context, type } = props;

  switch (type.kind) {
    case "model":
      return <ModelDeclaration context={context} type={type} />;
    case "enum":
      return <EnumDeclaration context={context} type={type} />;
    case "union":
      return <UnionDeclaration context={context} type={type} />;
    case "dict":
    case "array":
      return (
        <ts.TypeDeclaration
          export
          name={normalizeModelName(context, type)}
          refkey={typeRefkey(type)}
        >
          {normalizeModelName(context, type)}
        </ts.TypeDeclaration>
      );
    case "nullable":
      return <NullableDeclaration context={context} type={type} />;
    default:
      return null;
  }
}

// ── Model interface ─────────────────────────────────────────────────────

interface ModelDeclarationProps {
  context: SdkContext;
  type: SdkModelType;
}

function ModelDeclaration(props: ModelDeclarationProps) {
  const { context, type } = props;

  // Skip types that shouldn't be emitted
  if (isAzureCoreErrorType(context.program, type.__raw)) return null;
  if (isOrExtendsHttpFile(context.program, type.__raw!)) return null;
  if (
    !type.usage ||
    (type.usage !== undefined &&
      (type.usage & UsageFlags.Output) !== UsageFlags.Output &&
      (type.usage & UsageFlags.Input) !== UsageFlags.Input &&
      (type.usage & UsageFlags.Exception) !== UsageFlags.Exception)
  )
    return null;
  if (!type.name && type.isGeneratedName) return null;

  const name = normalizeModelName(context, type, NameType.Interface, true);
  const doc = type.doc ?? "model interface " + name;
  const extendsExpr = getExtendsExpression(context, type);
  const properties = getModelProperties(context, type);

  return (
    <>
      <ts.InterfaceDeclaration
        export
        name={name}
        doc={doc}
        refkey={typeRefkey(type)}
        extends={extendsExpr}
      >
        <For each={properties} semicolon hardline enderPunctuation>
          {(prop) => (
            <ModelProperty context={context} property={prop} model={type} />
          )}
        </For>
        <AdditionalProperties context={context} type={type} />
      </ts.InterfaceDeclaration>
      <PolymorphicTypeAlias context={context} type={type} />
    </>
  );
}

function getExtendsExpression(
  context: SdkContext,
  type: SdkModelType
): Children | undefined {
  if (!type.baseModel) return undefined;
  const parentRef = getModelExpression(context, type.baseModel, {
    skipPolymorphicUnion: true
  });
  return <>{parentRef}</>;
}

function getModelProperties(
  context: SdkContext,
  type: SdkModelType
): SdkModelPropertyType[] {
  const flattenPropertySet = new Set<SdkModelPropertyType>();
  const directProps = type.properties
    .filter((p) => !isMetadata(context.program, p.__raw!))
    .filter((p) => {
      if (p.flatten && p.type.kind === "model") {
        flattenPropertySet.add(p);
        return false;
      }
      return true;
    });

  const flattenedProps: SdkModelPropertyType[] = [];
  for (const flatten of flattenPropertySet.keys()) {
    const sdkTypes = useContext("sdkTypes");
    const conflictMap = sdkTypes.flattenProperties.get(flatten)?.conflictMap;
    const allProperties = getAllProperties(
      context,
      flatten.type,
      getAllAncestors(flatten.type)
    ).filter(
      (p: SdkModelPropertyType) => !isMetadata(context.program, p.__raw!)
    );
    flattenedProps.push(
      ...allProperties.map((p: SdkModelPropertyType) => {
        return getPropertyWithOverrides(p, {
          allOptional: flatten.optional,
          propertyRenames: conflictMap
        });
      })
    );
  }

  return [...directProps, ...flattenedProps];
}

// ── Model property ──────────────────────────────────────────────────────

interface ModelPropertyProps {
  context: SdkContext;
  property: SdkModelPropertyType;
  model: SdkModelType;
}

function ModelProperty(props: ModelPropertyProps) {
  const { context, property, model } = props;
  const name = normalizeModelPropertyName(context, property);
  let typeExpr: string;

  const allDiscriminatorValues = getAllDiscriminatedValues(model, property);
  if (isDiscriminatedUnion(model) && allDiscriminatorValues.length > 1) {
    typeExpr = allDiscriminatorValues.map((v) => `"${v}"`).join(" | ");
  } else if (
    property.kind === "property" &&
    property.serializationOptions.multipart?.isFilePart
  ) {
    typeExpr = getMultipartFileTypeExpression(context, property);
  } else {
    typeExpr = getTypeExpression(context, property.type, {
      isOptional: property.optional
    });
  }

  const doc = property.doc ?? undefined;

  return (
    <ts.InterfaceMember
      name={name}
      optional={property.optional}
      readonly={isReadOnly(property as SdkModelPropertyType)}
      doc={doc}
    >
      {typeExpr}
    </ts.InterfaceMember>
  );
}

// ── Additional properties ───────────────────────────────────────────────

interface AdditionalPropertiesProps {
  context: SdkContext;
  type: SdkModelType;
}

function AdditionalProperties(props: AdditionalPropertiesProps) {
  const { context, type } = props;
  if (!type.additionalProperties) return null;

  const additionalPropertiesType = getTypeExpression(
    context,
    type.additionalProperties
  );

  if (context.rlcOptions?.compatibilityMode) {
    // compatibilityMode handled via extends in getExtendsExpression
    return null;
  }

  const name = getAdditionalPropertiesName(context, type);
  if (name !== "additionalProperties") {
    reportDiagnostic(context.program, {
      code: "property-name-conflict",
      format: { propertyName: "additionalProperties" },
      target: NoTarget
    });
  }

  return (
    <ts.InterfaceMember name={name} optional doc="Additional properties">
      {`Record<string, ${additionalPropertiesType ?? "any"}>`}
    </ts.InterfaceMember>
  );
}

// ── Polymorphic type alias ──────────────────────────────────────────────

interface PolymorphicTypeAliasProps {
  context: SdkContext;
  type: SdkModelType;
}

function PolymorphicTypeAlias(props: PolymorphicTypeAliasProps) {
  const { context, type } = props;
  const directSubtypes = getDirectSubtypes(type);
  if (directSubtypes.length === 0) return null;

  const name = `${normalizeModelName(context, type, NameType.Interface, true)}Union`;
  const typeExpr = directSubtypes
    .filter(
      (p) =>
        p.usage !== undefined &&
        ((p.usage & UsageFlags.Output) === UsageFlags.Output ||
          (p.usage & UsageFlags.Input) === UsageFlags.Input)
    )
    .map((t) => getTypeExpression(context, t))
    .join(" | ");
  const baseName = getModelExpression(context, type, {
    skipPolymorphicUnion: true
  });

  return (
    <ts.TypeDeclaration
      export
      name={name}
      doc={`Alias for ${name}`}
      refkey={polymorphicTypeRefkey(type)}
    >
      {typeExpr} | {baseName}
    </ts.TypeDeclaration>
  );
}

// ── Enum declaration ────────────────────────────────────────────────────

interface EnumDeclarationComponentProps {
  context: SdkContext;
  type: SdkEnumType;
}

function EnumDeclaration(props: EnumDeclarationComponentProps) {
  const { context, type } = props;

  if (!type.usage) return null;
  const apiVersionEnumOnly = type.usage === UsageFlags.ApiVersionEnum;
  if (apiVersionEnumOnly && context.rlcOptions?.isMultiService) return null;

  const inputUsage = (type.usage & UsageFlags.Input) === UsageFlags.Input;
  const outputUsage = (type.usage & UsageFlags.Output) === UsageFlags.Output;
  const exceptionUsage =
    (type.usage & UsageFlags.Exception) === UsageFlags.Exception;
  if (!(inputUsage || outputUsage || apiVersionEnumOnly || exceptionUsage))
    return null;

  const isExtensible = isExtensibleEnum(context, type);
  const enumName = normalizeModelName(context, type);
  const knownValuesName = `Known${enumName}`;

  if (enumName.startsWith("_")) return null;

  // Build the KnownValues enum
  const knownValuesEnum = (
    <ts.EnumDeclaration
      export
      name={knownValuesName}
      doc={
        type.doc ??
        `Known values of {@link ${type.name}} that the service accepts.`
      }
      refkey={
        apiVersionEnumOnly
          ? namedKnownValuesRefkey(knownValuesName)
          : knownValuesRefkey(type)
      }
    >
      <For each={type.values} comma hardline enderPunctuation>
        {(value) => <EnumMember context={context} member={value} />}
      </For>
    </ts.EnumDeclaration>
  );

  // Build the type alias (union of string literals or base type)
  const typeAliasExpr = !isExtensible
    ? type.values.map((v) => getTypeExpression(context, v)).join(" | ")
    : getTypeExpression(context, type.valueType);

  const typeAlias = (
    <ts.TypeDeclaration
      export
      name={enumName}
      doc={getEnumDoc(context, type)}
      refkey={typeRefkey(type)}
    >
      {typeAliasExpr}
    </ts.TypeDeclaration>
  );

  if (apiVersionEnumOnly) {
    return knownValuesEnum;
  }

  return (
    <>
      {isExtensible ? knownValuesEnum : null}
      {typeAlias}
      {!isExtensible ? knownValuesEnum : null}
    </>
  );
}

function getEnumDoc(context: SdkContext, type: SdkEnumType): string {
  const name = normalizeModelName(context, type);
  const docs = type.doc ? type.doc : "Type of " + name;

  if (isExtensibleEnum(context, type) && type.doc) {
    return getExtensibleEnumDescription(context, type) ?? docs;
  }
  return docs;
}

function getExtensibleEnumDescription(
  context: SdkContext,
  model: SdkEnumType
): string | undefined {
  if (model.isFixed && model.name && model.values) return undefined;
  const valueDescriptions = model.values
    .map((v) => `**${v.value}**${v.doc ? `: ${v.doc}` : ""}`)
    .join(` \\\n`)
    .replace(/^\//g, "\\/")
    .replace(/([^\\])(\/)/g, "$1\\/");
  const enumLink = `{@link Known${normalizeModelName(context, model)}} can be used interchangeably with ${normalizeModelName(context, model)},\n this enum contains the known values that the service supports.`;

  return [
    `${model.doc} \\`,
    enumLink,
    `### Known values supported by the service`,
    valueDescriptions
  ].join(" \n");
}

interface EnumMemberProps {
  context: SdkContext;
  member: SdkEnumValueType;
}

function EnumMember(props: EnumMemberProps) {
  const { context, member } = props;
  const name = context.rlcOptions?.ignoreEnumMemberNameNormalize
    ? fixLeadingNumber(member.name, NameType.EnumMemberName)
    : normalizeName(member.name, NameType.EnumMemberName, true);
  const doc = member.doc ?? String(member.value);
  const value = member.value;

  return <ts.EnumMember name={name} doc={doc} jsValue={value} />;
}

// ── Union type alias ────────────────────────────────────────────────────

interface UnionDeclarationProps {
  context: SdkContext;
  type: SdkUnionType;
}

function UnionDeclaration(props: UnionDeclarationProps) {
  const { context, type } = props;
  const name = normalizeModelName(context, type);
  const typeExpr = type.variantTypes
    .map((v) => getTypeExpression(context, v))
    .join(" | ");

  return (
    <ts.TypeDeclaration
      export
      name={name}
      doc={type.doc ?? `Alias for ${name}`}
      refkey={typeRefkey(type)}
    >
      {typeExpr}
    </ts.TypeDeclaration>
  );
}

// ── Nullable type alias ─────────────────────────────────────────────────

interface NullableDeclarationProps {
  context: SdkContext;
  type: SdkNullableType;
}

function NullableDeclaration(props: NullableDeclarationProps) {
  const { context, type } = props;
  const name = normalizeModelName(context, type);
  const typeExpr = getTypeExpression(context, type.type) + " | null";

  return (
    <ts.TypeDeclaration
      export
      name={name}
      doc={type.doc ?? `Alias for ${name}`}
      refkey={typeRefkey(type)}
    >
      {typeExpr}
    </ts.TypeDeclaration>
  );
}
