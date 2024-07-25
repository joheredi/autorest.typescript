import * as path from "path";
import {
  EnumDeclarationStructure,
  InterfaceDeclarationStructure,
  SourceFile,
  StructureKind,
  TypeAliasDeclarationStructure
} from "ts-morph";
import { buildOperationOptions } from "./buildOperations.js";
import { getDocsFromDescription } from "./helpers/docsHelpers.js";
import { getModularModelFilePath } from "./helpers/namingHelpers.js";
import { getType } from "./helpers/typeHelpers.js";
import {
  Client,
  ModularCodeModel,
  Type as ModularType
} from "./modularCodeModel.js";
import { buildModelSerializer } from "./serialization/buildSerializerFunction.js";
import { toCamelCase } from "../utils/casingUtils.js";
import { addDeclaration, DeclarationKind } from "../framework/declaration.js";
import { refkey } from "../framework/refkey.js";
import { resolveReference } from "../framework/reference.js";

// ====== UTILITIES ======

function isAzureCoreErrorSdkType(t: ModularType) {
  return (
    t.name &&
    ["error", "errormodel", "innererror", "errorresponse"].includes(
      t.name.toLowerCase()
    ) &&
    t.coreTypeInfo === "ErrorType"
  );
}

function isAzureCoreLroSdkType(t: ModularType) {
  return (
    t.name &&
    ["operationstate"].includes(t.name.toLowerCase()) &&
    t.coreTypeInfo === "LroType"
  );
}

function isAnonymousModel(t: ModularType) {
  return t.type === "model" && t.name === "";
}

export function isModelWithAdditionalProperties(t: ModularType) {
  return t.type === "dict" && t.name !== "Record";
}

function getCoreClientErrorType(name: string, coreClientTypes: Set<string>) {
  const coreClientType: string = name === "Error" ? "ErrorModel" : name;
  coreClientTypes.add(coreClientType);
  return coreClientType;
}

function getCoreLroType(name: string, coreLroTypes: Set<string>) {
  const coreLroType = name === "OperationState" ? "CoreOperationStatus" : name;
  coreLroTypes.add(coreLroType);
  return coreLroType;
}

// ====== TYPE EXTRACTION ======

function extractModels(codeModel: ModularCodeModel): ModularType[] {
  const models = codeModel.types.filter(
    (t) =>
      ((t.type === "model" || t.type === "enum") &&
        !isAzureCoreErrorSdkType(t) &&
        !isAzureCoreLroSdkType(t) &&
        !isAnonymousModel(t)) ||
      isModelWithAdditionalProperties(t)
  );

  for (const model of codeModel.types) {
    if (model.type === "combined") {
      for (const unionModel of model.types ?? []) {
        if (unionModel.type === "model") {
          models.push(unionModel);
        }
      }
    }
  }
  return models;
}

/**
 * Extracts all the aliases from the code model
 * 1. alias from polymorphic base model, where we need to use typescript union to combine all the sub models
 * 2. alias from unions, where we also need to use typescript union to combine all the union variants
 */
export function extractAliases(codeModel: ModularCodeModel): ModularType[] {
  const models = codeModel.types.filter(
    (t) =>
      ((t.type === "model" || t.type === "combined") &&
        t.alias &&
        t.aliasType) ||
      (isModelWithAdditionalProperties(t) && t.alias && t.aliasType)
  );
  return models;
}
// ====== TYPE BUILDERS ======
function buildEnumModel(model: ModularType): TypeAliasDeclarationStructure {
  const valueType = model.valueType?.type === "string" ? "string" : "number";
  return {
    kind: StructureKind.TypeAlias,
    name: model.name!,
    isExported: true,
    docs: [...getDocsFromDescription(model.description)],
    type: buildEnumType()
  };

  function buildEnumType() {
    return model.isFixed || !model.isNonExhaustive
      ? getEnumValues(" | ")
      : valueType;
  }

  function getEnumValues(separator: string = ", ") {
    const splitWord = valueType === "string" ? `"` : ``;
    return (model.values ?? [])
      .map((v) => `${splitWord}${v.value}${splitWord}`)
      .join(separator);
  }
}

export function buildModelInterface(
  model: ModularType,
  cache: { coreClientTypes: Set<string>; coreLroTypes: Set<string> }
): InterfaceDeclarationStructure {
  const modelProperties = model.properties ?? [];
  const modelInterface: InterfaceDeclarationStructure = {
    kind: StructureKind.Interface,
    name: model.alias ?? model.name ?? "FIXMYNAME",
    isExported: true,
    docs: getDocsFromDescription(model.description),
    extends: [] as string[],
    properties: (modelProperties ?? []).map((p) => {
      const propertyMetadata = getType(p.type, p.format);
      let propertyTypeName = propertyMetadata.name;
      if (isAzureCoreErrorSdkType(p.type)) {
        propertyTypeName = getCoreClientErrorType(
          propertyTypeName,
          cache.coreClientTypes
        );
      }
      if (isAzureCoreLroSdkType(p.type)) {
        propertyTypeName = getCoreLroType(propertyTypeName, cache.coreLroTypes);
      }

      return {
        name: `"${p.clientName}"`,
        docs: getDocsFromDescription(p.description),
        hasQuestionToken: p.optional,
        isReadonly: p.readonly,
        type: propertyTypeName
      };
    })
  };

  return modelInterface;
}

// ====== MAIN FUNCTIONS ======
/**
 * This function creates the file containing all the models defined in TypeSpec
 */
export function buildModels(
  subClient: Client,
  codeModel: ModularCodeModel
): SourceFile | undefined {
  // We are generating both models and enums here
  const coreClientTypes = new Set<string>();
  const coreLroTypes = new Set<string>();
  // filter out the models/enums that are anonymous
  const models = extractModels(codeModel).filter((m) => !!m.name);
  const aliases = extractAliases(codeModel);
  // Skip to generate models.ts if there is no any models
  if (models.length === 0 && aliases.length === 0) {
    return;
  }
  const modelsFile = codeModel.project.createSourceFile(
    getModularModelFilePath(codeModel, subClient)
  );
  for (const model of models) {
    if (model.type === "enum") {
      if (modelsFile.getTypeAlias(model.name!)) {
        // If the enum is already defined, we don't need to do anything
        continue;
      }
      const enumAlias = buildEnumModel(model);

      if (model.isNonExhaustive && model.name) {
        const enumDeclaration: EnumDeclarationStructure = {
          kind: StructureKind.Enum,
          name: `Known${model.name}`,
          isExported: true,
          members:
            model.values?.map((v) => ({
              name: v.value,
              value: v.value,
              docs: [v.value]
            })) ?? [],
          docs: [
            `Known values of {@link ${model.name}} that the service accepts.`
          ]
        };

        addDeclaration(
          modelsFile,
          enumDeclaration,
          refkey(model, DeclarationKind.KnownValues)
        );

        const description = getExtensibleEnumDescription(model);
        if (description) {
          enumAlias.docs = [description];
        }
      }

      addDeclaration(
        modelsFile,
        enumAlias,
        refkey(model, DeclarationKind.EnumUnion)
      );
    } else {
      const modelInterface: InterfaceDeclarationStructure = buildModelInterface(
        model,
        {
          coreClientTypes,
          coreLroTypes
        }
      );

      for (const parent of model.parents ?? []) {
        if (!modelInterface.extends) {
          modelInterface.extends = [];
        }

        if (Array.isArray(modelInterface.extends)) {
          modelInterface.extends.push(
            resolveReference(refkey(parent, DeclarationKind.Model))
          );
        }
      }

      if (isModelWithAdditionalProperties(model)) {
        addExtendedDictInfo(
          model,
          modelInterface,
          codeModel.modularOptions.compatibilityMode
        );
      }

      if (!modelsFile.getInterface(modelInterface.name)) {
        addDeclaration(
          modelsFile,
          modelInterface,
          refkey(model, DeclarationKind.Model)
        );
      }

      // Generate a serializer function next to each model
      const serializerFunction = buildModelSerializer(model);

      if (
        serializerFunction &&
        !modelsFile.getFunction(toCamelCase(modelInterface.name + "Serializer"))
      ) {
        addDeclaration(
          modelsFile,
          serializerFunction,
          refkey(model, DeclarationKind.ModelSerializer)
        );
      }
    }
  }

  aliases.forEach((alias) => {
    const modelUnion: TypeAliasDeclarationStructure =
      buildModelTypeAlias(alias);
    addDeclaration(
      modelsFile,
      modelUnion,
      refkey(alias, DeclarationKind.ModelUnion)
    );
    if (!models.includes(alias)) {
      // Generate a serializer function next to each model
      const serializerFunction = buildModelSerializer(alias);
      if (serializerFunction) {
        addDeclaration(
          modelsFile,
          serializerFunction,
          refkey(alias, DeclarationKind.ModelUnionSerializer)
        );
      }
    }
  });
  return modelsFile;
}

function getExtensibleEnumDescription(model: ModularType): string | undefined {
  if (!(model.isNonExhaustive && model.name && model.values)) {
    return;
  }
  const valueDescriptions = model.values
    .map((v) => `**${v.value}**${v.description ? `: ${v.description}` : ""}`)
    .join(` \\\n`)
    // Escape the character / to make sure we don't incorrectly announce a comment blocks /** */
    .replace(/^\//g, "\\/")
    .replace(/([^\\])(\/)/g, "$1\\/");
  const enumLink = `{@link Known${model.name}} can be used interchangeably with ${model.name},\n this enum contains the known values that the service supports.`;

  return [
    `${model.description} \\`,
    enumLink,
    `### Known values supported by the service`,
    valueDescriptions
  ].join(" \n");
}

function addExtendedDictInfo(
  model: ModularType,
  modelInterface: InterfaceDeclarationStructure,
  compatibilityMode: boolean = false
) {
  if (
    (model.properties &&
      model.properties.length > 0 &&
      model.elementType &&
      model.properties?.every((p) => {
        return getType(model.elementType!)?.name.includes(getType(p.type).name);
      })) ||
    (model.properties?.length === 0 && model.elementType)
  ) {
    if (modelInterface.extends === undefined) {
      modelInterface.extends = [];
    }

    if (Array.isArray(modelInterface.extends)) {
      modelInterface.extends.push(
        `Record<string, ${getType(model.elementType!).name ?? "any"}>`
      );
    }
  } else if (compatibilityMode) {
    if (modelInterface.extends === undefined) {
      modelInterface.extends = [];
    }

    if (Array.isArray(modelInterface.extends)) {
      modelInterface.extends.push(`Record<string, any>`);
    }
  } else {
    modelInterface.properties?.push({
      name: "additionalProperties",
      docs: ["Additional properties"],
      hasQuestionToken: true,
      isReadonly: false,
      type: `Record<string, ${getType(model.elementType!).name ?? "any"}>`
    });
  }
}

export function buildModelTypeAlias(
  model: ModularType
): TypeAliasDeclarationStructure {
  return {
    kind: StructureKind.TypeAlias,
    name: model.name!,
    isExported: true,
    docs: ["Alias for " + model.name],
    type: model.aliasType!
  };
}

export function buildModelsOptions(
  client: Client,
  codeModel: ModularCodeModel
) {
  const modelOptionsFile = codeModel.project.createSourceFile(
    path.join(
      codeModel.modularOptions.sourceRoot,
      client.subfolder ?? "",
      `models/options.ts`
    ),
    undefined,
    {
      overwrite: true
    }
  );
  for (const operationGroup of client.operationGroups) {
    operationGroup.operations.forEach((o) => {
      buildOperationOptions(o, modelOptionsFile);
    });
  }

  modelOptionsFile
    .getImportDeclarations()
    .filter((id) => {
      return (
        id.isModuleSpecifierRelative() &&
        !id.getModuleSpecifierValue().endsWith(".js")
      );
    })
    .map((id) => {
      id.setModuleSpecifier(id.getModuleSpecifierValue() + ".js");
      return id;
    });
  return modelOptionsFile;
}
