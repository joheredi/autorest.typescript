// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Operation, OperationGroup } from "@azure-tools/codemodel";
import { getLanguageMetadata } from "./languageHelpers";
import { TypeDetails, PropertyKind } from "../models/modelDetails";

const ReservedModelNames = [
  "error",
  "date",
  "break",
  "as",
  "any",
  "case",
  "implements",
  "boolean",
  "catch",
  "interface",
  "constructor",
  "class",
  "let",
  "declare",
  "const",
  "package",
  "get",
  "continue",
  "private",
  "module",
  "debugger",
  "protected",
  "require",
  "default",
  "public",
  "number",
  "delete",
  "static",
  "set",
  "do",
  "yield",
  "string",
  "else",
  "symbol",
  "enum",
  "type",
  "export",
  "from",
  "extends",
  "of",
  "false",
  "finally",
  "for",
  "function",
  "if",
  "import",
  "in",
  "instanceof",
  "new",
  "null",
  "return",
  "super",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "typeof",
  "var",
  "void",
  "while",
  "with"
];

export enum CasingConvention {
  Pascal,
  Camel
}

export enum NameType {
  Class,
  File,
  Interface,
  Property,
  Parameter,
  Operation,
  OperationGroup
}

export function guardReservedNames(name: string, nameType?: NameType): string {
  const suffix = getSuffix(nameType);
  return ReservedModelNames.indexOf(name.toLowerCase()) > -1
    ? `${name}${suffix}`
    : name;
}

function getSuffix(nameType?: NameType) {
  switch (nameType) {
    case NameType.File:
      return "";
    case NameType.Operation:
      return "Operation";
    case NameType.OperationGroup:
      return "Operations";
    case NameType.Property:
      return "Property";
    case NameType.Parameter:
      return "Param";
    case NameType.Class:
    case NameType.Interface:
    default:
      return "Model";
  }
}

/**
 * Returns a normalized Type name, this is, the type name capitalized when needed.
 * Otherwise, return the original typename, for example primitives "string", etc. don't need capitalization.
 */
export function normalizeTypeName({ kind, typeName }: TypeDetails) {
  // Only Enum and Composite kinds need normalization
  if ([PropertyKind.Enum, PropertyKind.Composite].includes(kind)) {
    return `${normalizeName(typeName, NameType.Interface)}`;
  }

  // Other kinds are already in the form they need to be
  return typeName;
}

export function normalizeName(
  name: string,
  nameType: NameType,
  shouldGuard?: boolean
): string {
  const casingConvention = getCasingConvention(nameType);

  let parts = getNameParts(name);
  const [firstPart, ...otherParts] = parts;
  const normalizedFirstPart = toCasing(firstPart, casingConvention);
  const normalizedParts = (otherParts || [])
    .map(part => toCasing(part, CasingConvention.Pascal))
    .join("");

  const normalized = `${normalizedFirstPart}${normalizedParts}`;
  return shouldGuard ? guardReservedNames(normalized, nameType) : normalized;
}

export function getModelsName(title: string): string {
  const spaceRemovedTitle = title.replace(/ /g, "");
  return `${spaceRemovedTitle.replace("Client", "")}Models`;
}

export function getMappersName(title: string): string {
  const spaceRemovedTitle = title.replace(/ /g, "");
  return `${spaceRemovedTitle.replace("Client", "")}Mappers`;
}

function getCasingConvention(nameType: NameType) {
  switch (nameType) {
    case NameType.Class:
    case NameType.Interface:
      return CasingConvention.Pascal;
    case NameType.File:
    case NameType.Property:
    case NameType.Operation:
    case NameType.OperationGroup:
    case NameType.Parameter:
      return CasingConvention.Camel;
  }
}

/**
 * TODO: Improve this function to handle cases such as TEST -> test. Current basic implementation
 * results in TEST -> test or Test (depending on the CasingConvention). We should switch to relay
 * on Modeler four namer for this once it is stable
 */
function toCasing(str: string, casing: CasingConvention): string {
  let value = str;
  if (value === value.toUpperCase()) {
    value = str.toLowerCase();
  }

  const firstChar =
    casing === CasingConvention.Pascal
      ? value.charAt(0).toUpperCase()
      : value.charAt(0).toLocaleLowerCase();
  return `${firstChar}${value.substring(1)}`;
}

function getNameParts(name: string) {
  let parts = name.split(/[-._ ]+/);

  return parts.length > 0 ? parts : [name];
}

export function getOperationFullName(
  operationGroup: OperationGroup,
  operation: Operation,
  clientName: string
) {
  const groupName = normalizeName(
    getLanguageMetadata(operationGroup.language).name || clientName,
    NameType.OperationGroup
  );
  const operationName = normalizeName(
    getLanguageMetadata(operation.language).name,
    NameType.Operation
  );

  return `${groupName}_${operationName}`.toLowerCase();
}
