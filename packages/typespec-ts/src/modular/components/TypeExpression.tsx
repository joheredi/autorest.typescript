import { Children, Refkey } from "@alloy-js/core";
import { Reference } from "@alloy-js/typescript";
import {
  SdkCredentialType,
  SdkEnumType,
  SdkModelPropertyType,
  SdkModelType,
  SdkNullableType,
  SdkServiceResponseHeader,
  SdkType,
  SdkUnionType
} from "@azure-tools/typespec-client-generator-core";
import { SdkContext } from "../../utils/interfaces.js";
import { normalizeModelPropertyName } from "../type-expressions/get-type-expression.js";
import { shouldEmitInline } from "../type-expressions/utils.js";
import { isExtensibleEnum } from "../type-expressions/get-enum-expression.js";
import {
  httpRuntimeLib,
  azureCoreClientLib,
  azureCoreAuthLib
} from "./ExternalPackages.js";
import { isAzurePackage } from "@azure-tools/rlc-common";
import { typeRefkey, polymorphicTypeRefkey } from "./Models.js";

// ── Public API ──────────────────────────────────────────────────────────

export interface TypeExpressionProps {
  /** The TCGC SdkType to render as a TypeScript type expression. */
  type: SdkType;
  /** The SdkContext for naming, options, etc. */
  context: SdkContext;
  /** Options controlling inline emission and optionality. */
  options?: EmitTypeOptions;
}

export interface EmitTypeOptions {
  emitInline?: boolean;
  isOptional?: boolean;
}

/**
 * Renders a TCGC `SdkType` as a TypeScript type expression.
 *
 * For named types (models, enums, unions) this emits an Alloy `refkey`
 * which the binder automatically resolves to the correct import + name.
 * For primitives and inline types it emits literal text.
 */
export function TypeExpression(props: TypeExpressionProps): Children {
  return renderTypeExpression(props.context, props.type, props.options);
}

// ── Internal rendering ──────────────────────────────────────────────────

function renderTypeExpression(
  context: SdkContext,
  type: SdkType,
  options?: EmitTypeOptions
): Children {
  switch (type.kind) {
    case "array":
      return (
        <>
          (
          <TypeExpression
            context={context}
            type={type.valueType}
            options={options}
          />
          )[]
        </>
      );

    case "enum":
      return renderEnumExpression(context, type, options);

    case "unknown":
      return "any";

    case "boolean":
      return "boolean";

    case "decimal":
    case "decimal128":
    case "float":
    case "float32":
    case "float64":
    case "integer":
    case "int16":
    case "int32":
    case "int64":
    case "int8":
    case "uint16":
    case "uint32":
    case "uint64":
    case "uint8":
    case "numeric":
    case "safeint":
      return type.encode === "string" ? "string" : "number";

    case "endpoint":
    case "plainTime":
    case "string":
    case "url":
      return "string";

    case "bytes":
      return "Uint8Array";

    case "constant":
    case "enumvalue": {
      const baseType = renderTypeExpression(context, type.valueType);
      // If the base type is string, emit a string literal
      if (baseType === "string") {
        return `"${type.value}"`;
      }
      return String(type.value);
    }

    case "duration":
      if (type.encode === "seconds") return "number";
      return renderTypeExpression(context, type.wireType, options);

    case "credential":
      return renderCredentialExpression(context, type);

    case "dict":
      return (
        <>
          {"Record<string, "}
          <TypeExpression
            context={context}
            type={type.valueType}
            options={options}
          />
          {">"}
        </>
      );

    case "model":
      return renderModelExpression(context, type);

    case "nullable":
      return renderNullableExpression(context, type, options);

    case "offsetDateTime":
      return "string";

    case "tuple":
      return (
        <>
          [
          {type.valueTypes.map((v, i) => (
            <>
              {i > 0 ? ", " : ""}
              <TypeExpression context={context} type={v} options={options} />
            </>
          ))}
          ]
        </>
      );

    case "union":
      return renderUnionExpression(context, type, options);

    case "utcDateTime":
    case "plainDate":
      return "Date";

    default:
      return "any";
  }
}

// ── Model expression ────────────────────────────────────────────────────

function renderModelExpression(
  context: SdkContext,
  type: SdkModelType,
  options: { skipPolymorphicUnion?: boolean } = {}
): Children {
  // External models (e.g. Azure.Core.Foundations.Error → ErrorModel)
  const externalRefkey = getExternalModelRefkey(context, type);
  if (externalRefkey) {
    return <Reference refkey={externalRefkey} />;
  }

  // Inline anonymous models
  if (shouldEmitInline(type, {})) {
    return renderInlineModel(context, type.properties);
  }

  // Polymorphic union reference
  if (!options.skipPolymorphicUnion && type.discriminatedSubtypes) {
    return <Reference refkey={polymorphicTypeRefkey(type)} />;
  }

  // Standard model reference
  return <Reference refkey={typeRefkey(type)} />;
}

const externalModels: Record<string, string> = {
  "Azure.Core.Foundations.Error": "ErrorModel",
  "Azure.Core.Foundations.ErrorResponse": "AzureCoreErrorResponse"
};

function getExternalModelRefkey(
  context: SdkContext,
  type: SdkModelType
): Refkey | undefined {
  const commonName = externalModels[type.crossLanguageDefinitionId];
  if (!commonName) return undefined;

  const isAzure = isAzurePackage({ options: context.rlcOptions ?? {} });
  if (commonName === "ErrorModel") {
    return isAzure ? azureCoreClientLib.ErrorModel : httpRuntimeLib.ErrorModel;
  }
  if (commonName === "AzureCoreErrorResponse") {
    // AzureCoreErrorResponse only exists in Azure flavor
    return (azureCoreClientLib as any).AzureCoreErrorResponse;
  }
  return undefined;
}

function renderInlineModel(
  context: SdkContext,
  properties: (SdkModelPropertyType | SdkServiceResponseHeader)[]
): Children {
  if (properties.length === 0) {
    return "Record<string, any>";
  }
  return (
    <>
      {"{ "}
      {properties.map((p, i) => (
        <>
          {i > 0 ? ", " : ""}
          {normalizeModelPropertyName(context, p)}
          {p.optional ? "?" : ""}:{" "}
          <TypeExpression context={context} type={p.type} />
        </>
      ))}
      {" }"}
    </>
  );
}

// ── Enum expression ─────────────────────────────────────────────────────

function renderEnumExpression(
  context: SdkContext,
  type: SdkEnumType,
  options: EmitTypeOptions = {}
): Children {
  if (shouldEmitInline(type, options)) {
    if (!isExtensibleEnum(context, type)) {
      return (
        <>
          {type.values.map((v, i) => (
            <>
              {i > 0 ? " | " : ""}
              <TypeExpression context={context} type={v} />
            </>
          ))}
        </>
      );
    }
    return <TypeExpression context={context} type={type.valueType} />;
  }
  return <Reference refkey={typeRefkey(type)} />;
}

// ── Union expression ────────────────────────────────────────────────────

function renderUnionExpression(
  context: SdkContext,
  type: SdkUnionType,
  options: EmitTypeOptions = {}
): Children {
  if (shouldEmitInline(type, options)) {
    // Deduplicate variant types by rendering them
    return (
      <>
        (
        {type.variantTypes.map((v, i) => (
          <>
            {i > 0 ? " | " : ""}
            <TypeExpression context={context} type={v} options={options} />
          </>
        ))}
        )
      </>
    );
  }
  return <Reference refkey={typeRefkey(type)} />;
}

// ── Nullable expression ─────────────────────────────────────────────────

function renderNullableExpression(
  context: SdkContext,
  type: SdkNullableType,
  options: EmitTypeOptions = {}
): Children {
  if (shouldEmitInline(type, options)) {
    const ignoreNullableOnOptional =
      context.rlcOptions?.ignoreNullableOnOptional ?? false;
    const isOptional = options?.isOptional ?? false;

    if (ignoreNullableOnOptional && isOptional) {
      return (
        <TypeExpression context={context} type={type.type} options={options} />
      );
    }
    return (
      <>
        (<TypeExpression context={context} type={type.type} options={options} />
        ) | null
      </>
    );
  }
  return <Reference refkey={typeRefkey(type)} />;
}

// ── Credential expression ───────────────────────────────────────────────

function renderCredentialExpression(
  context: SdkContext,
  type: SdkCredentialType
): Children {
  const isAzure = isAzurePackage({ options: context.rlcOptions ?? {} });
  switch (type.scheme.type) {
    case "apiKey":
    case "http":
      return (
        <Reference
          refkey={
            isAzure
              ? azureCoreAuthLib.KeyCredential
              : httpRuntimeLib.KeyCredential
          }
        />
      );
    case "oauth2":
    case "openIdConnect":
      return (
        <Reference
          refkey={
            isAzure
              ? azureCoreAuthLib.TokenCredential
              : httpRuntimeLib.TokenCredential
          }
        />
      );
    default:
      return "any";
  }
}
