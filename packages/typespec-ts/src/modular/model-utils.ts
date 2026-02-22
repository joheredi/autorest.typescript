import {
  EnumDeclarationStructure,
  EnumMemberStructure,
  StructureKind,
  TypeAliasDeclarationStructure
} from "ts-morph";
import {
  fixLeadingNumber,
  NameType,
  normalizeName
} from "@azure-tools/rlc-common";
import {
  SdkArrayType,
  SdkDictionaryType,
  SdkEnumType,
  SdkEnumValueType,
  SdkModelType,
  SdkNullableType,
  SdkType,
  SdkUnionType,
  UsageFlags,
  isPagedResultModel,
  listAllServiceNamespaces
} from "@azure-tools/typespec-client-generator-core";
import { getNamespaceFullName, NoTarget } from "@typespec/compiler";
import path from "path";

import { SdkContext } from "../utils/interfaces.js";
import { getTypeExpression } from "./type-expressions/get-type-expression.js";
import { isExtensibleEnum } from "./type-expressions/get-enum-expression.js";
import { isDiscriminatedUnion } from "./serialization/serializeUtils.js";
import {
  getAllAncestors,
  getAllProperties
} from "./helpers/operationHelpers.js";
import { reportDiagnostic } from "../lib.js";

export function getApiVersionEnum(context: SdkContext) {
  // Skip api version enum for multi-service scenarios since each service may have different versions
  if (context.rlcOptions?.isMultiService) {
    return;
  }
  const apiVersionEnum = context.sdkPackage.enums.find(
    (e) => e.usage === UsageFlags.ApiVersionEnum
  );
  if (!apiVersionEnum) {
    return;
  }
  return apiVersionEnum;
}

export function getModelsPath(
  sourceRoot: string,
  modelNamespace: string[] = []
): string {
  return path.join(
    ...[
      sourceRoot,
      "models",
      ...modelNamespace.map((n) => normalizeName(n, NameType.File)),
      `models.ts`
    ]
  );
}

export function getModelNamespaces(
  context: SdkContext,
  model: SdkType
): string[] {
  if (
    model.kind === "model" ||
    model.kind === "enum" ||
    model.kind === "union"
  ) {
    if (
      (model.namespace ?? "").startsWith("Azure.ResourceManager") ||
      (model.namespace ?? "").startsWith("Azure.Core") ||
      (model.crossLanguageDefinitionId ?? "").startsWith(
        "TypeSpec.Rest.Resource"
      ) ||
      (model.crossLanguageDefinitionId ?? "") === "TypeSpec.Http.File" // filter out the TypeSpec.Http.File model similar like what java does here https://github.com/microsoft/typespec/blob/main/packages/http-client-java/emitter/src/code-model-builder.ts#L2589
    ) {
      return [];
    }
    const segments = model.namespace.split(".");
    // Keep full namespace segments if multiple services are present because there isn't a root namespace to trim
    if (context.rlcOptions?.isMultiService) {
      return segments;
    }

    const allServiceNamespaces =
      context.allServiceNamespaces ?? listAllServiceNamespaces(context);
    const deepestNamespace = getNamespaceFullName(allServiceNamespaces[0]!);
    const rootNamespace = deepestNamespace.split(".") ?? [];
    if (segments.length > rootNamespace.length) {
      while (segments[0] === rootNamespace[0]) {
        segments.shift();
        rootNamespace.shift();
      }
      return segments;
    }
    return [];
  } else if (model.kind === "array" || model.kind === "dict") {
    return getModelNamespaces(context, model.valueType);
  } else if (model.kind === "nullable") {
    return getModelNamespaces(context, model.type);
  }
  return [];
}

export function buildEnumTypes(
  context: SdkContext,
  type: SdkEnumType,
  reportMemberNameDiagnostic = false // if reportMemberNameDiagnostic is true, it will report diagnostic for enum member name
): [TypeAliasDeclarationStructure, EnumDeclarationStructure] {
  const enumDeclaration: EnumDeclarationStructure = {
    kind: StructureKind.Enum,
    name: `Known${normalizeModelName(context, type)}`,
    isExported: true,
    members: type.values.map((value) =>
      emitEnumMember(context, value, reportMemberNameDiagnostic)
    )
  };

  const enumAsUnion: TypeAliasDeclarationStructure = {
    kind: StructureKind.TypeAlias,
    name: normalizeModelName(context, type),
    isExported: true,
    type: !isExtensibleEnum(context, type)
      ? type.values.map((v) => getTypeExpression(context, v)).join(" | ")
      : getTypeExpression(context, type.valueType)
  };

  const docs = type.doc ? type.doc : "Type of " + enumAsUnion.name;
  enumAsUnion.docs =
    isExtensibleEnum(context, type) && type.doc
      ? [getExtensibleEnumDescription(context, type) ?? docs]
      : [docs];
  enumDeclaration.docs = type.doc
    ? [type.doc]
    : [`Known values of {@link ${type.name}} that the service accepts.`];

  return [enumAsUnion, enumDeclaration];
}

function getExtensibleEnumDescription(
  context: SdkContext,
  model: SdkEnumType
): string | undefined {
  if (model.isFixed && model.name && model.values) {
    return;
  }
  const valueDescriptions = model.values
    .map((v) => `**${v.value}**${v.doc ? `: ${v.doc}` : ""}`)
    .join(` \\\n`)
    // Escape the character / to make sure we don't incorrectly announce a comment blocks /** */
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

function emitEnumMember(
  context: SdkContext,
  member: SdkEnumValueType,
  reportMemberNameDiagnostic = false // if reportMemberNameDiagnostic is true, it will report diagnostic for enum member name
): EnumMemberStructure {
  const normalizedMemberName = context.rlcOptions?.ignoreEnumMemberNameNormalize
    ? fixLeadingNumber(member.name, NameType.EnumMemberName) // need to fix the leading number also for enum member
    : normalizeName(member.name, NameType.EnumMemberName, true);
  if (
    reportMemberNameDiagnostic &&
    normalizedMemberName.toLowerCase().startsWith("_") &&
    !member.name.toLowerCase().startsWith("_")
  ) {
    reportDiagnostic(context.program, {
      code: "prefix-adding-in-enum-member",
      format: {
        memberName: member.name,
        normalizedName: normalizedMemberName
      },
      target: NoTarget
    });
  }
  const memberStructure: EnumMemberStructure = {
    kind: StructureKind.EnumMember,
    name: normalizedMemberName,
    value: member.value
  };

  if (member.doc) {
    memberStructure.docs = [member.doc];
  } else {
    // Provide default documentation using the enum value when no explicit doc exists
    memberStructure.docs = [String(member.value)];
  }

  return memberStructure;
}

export function getAdditionalPropertiesName(
  context: SdkContext,
  model: SdkModelType
): string {
  const ancestors = getAllAncestors(model);
  const properties = getAllProperties(context, model, ancestors);
  const nameConflict = properties.find(
    (p) => p.name === "additionalProperties"
  );
  return nameConflict ? "additionalPropertiesBag" : "additionalProperties";
}

export function normalizeModelName(
  context: SdkContext,
  type:
    | SdkModelType
    | SdkEnumType
    | SdkUnionType
    | SdkArrayType
    | SdkDictionaryType
    | SdkNullableType,
  nameType: NameType = NameType.Interface,
  skipPolymorphicUnionSuffix = false,
  rawModelName?: boolean
): string {
  if (type.kind === "array") {
    if (rawModelName) {
      return `${normalizeModelName(context, type.valueType as any, nameType, skipPolymorphicUnionSuffix, rawModelName)}Array`;
    }
    return `Array<${normalizeModelName(context, type.valueType as any, nameType)}>`;
  } else if (type.kind === "dict") {
    if (rawModelName) {
      return `${normalizeModelName(context, type.valueType as any, nameType, skipPolymorphicUnionSuffix, rawModelName)}Record`;
    }
    return `Record<string, ${normalizeModelName(
      context,
      type.valueType as any,
      nameType
    )}>`;
  }
  if (
    type.kind !== "model" &&
    type.kind !== "enum" &&
    type.kind !== "union" &&
    type.kind !== "nullable"
  ) {
    return getTypeExpression(context, type);
  }

  const segments = getModelNamespaces(context, type);
  let unionSuffix = "";
  if (!skipPolymorphicUnionSuffix) {
    if (type.kind === "model" && isDiscriminatedUnion(type)) {
      unionSuffix = "Union";
    }
  }
  const namespacePrefix = context.rlcOptions?.enableModelNamespace
    ? segments.join("")
    : "";
  const internalModelPrefix =
    isPagedResultModel(context, type) || type.isGeneratedName ? "_" : "";
  return `${internalModelPrefix}${normalizeName(namespacePrefix + type.name, nameType, true)}${unionSuffix}`;
}
