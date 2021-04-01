import {
  JsonEntityMutationResponse,
  JsonAtlasEntitiesWithExtInfo,
  JsonAtlasEntityWithExtInfo,
  JsonAtlasClassification,
  JsonAtlasClassifications,
  JsonAtlasEntityHeader,
  JsonAtlasGlossary,
  JsonAtlasGlossaryCategory,
  DictionaryOfpathsCic80AAtlasV2GlossaryCategoryCategoryguidRelatedGetResponses200ContentApplicationJsonSchemaAdditionalproperties,
  JsonAtlasRelatedTermHeader,
  JsonAtlasGlossaryTerm,
  JsonAtlasRelatedObjectId,
  DictionaryOfpathsV84KwqAtlasV2GlossaryTermsTermguidRelatedGetResponses200ContentApplicationJsonSchemaAdditionalproperties,
  JsonAtlasRelatedCategoryHeader,
  JsonAtlasGlossaryExtInfo,
  JsonImportCSVOperation,
  JsonSearchResult,
  JsonSuggestResult,
  JsonAutocompleteResult,
  JsonAtlasLineageInfo,
  JsonAtlasRelationship,
  JsonAtlasRelationshipWithExtInfo,
  JsonAtlasClassificationDef,
  JsonAtlasEntityDef,
  JsonAtlasEnumDef,
  JsonAtlasRelationshipDef,
  JsonAtlasStructDef,
  JsonAtlasTypeDef,
  JsonAtlasTypesDef,
  JsonAtlasTypeDefHeader,
  JsonTermTemplateDef
} from "./models";
import { HttpResponse } from "@azure-rest/core-client";

export type EntityRestCreateOrUpdate200Response = EntityRestCreateOrUpdate200Properties &
  HttpResponse;

export interface EntityRestCreateOrUpdate200Properties {
  status: 200;
  parsedBody: JsonEntityMutationResponse;
}

export type EntityRestGetByGuids200Response = EntityRestGetByGuids200Properties &
  HttpResponse;

export interface EntityRestGetByGuids200Properties {
  status: 200;
  parsedBody: JsonAtlasEntitiesWithExtInfo;
}

export type EntityRestCreateOrUpdateBulk200Response = EntityRestCreateOrUpdateBulk200Properties &
  HttpResponse;

export interface EntityRestCreateOrUpdateBulk200Properties {
  status: 200;
  parsedBody: JsonEntityMutationResponse;
}

export type EntityRestBulkDelete200Response = EntityRestBulkDelete200Properties &
  HttpResponse;

export interface EntityRestBulkDelete200Properties {
  status: 200;
  parsedBody: JsonEntityMutationResponse;
}

export type EntityRestAddClassification204Response = EntityRestAddClassification204Properties &
  HttpResponse;

export interface EntityRestAddClassification204Properties {
  status: 204;
}

export type EntityRestGetById200Response = EntityRestGetById200Properties &
  HttpResponse;

export interface EntityRestGetById200Properties {
  status: 200;
  parsedBody: JsonAtlasEntityWithExtInfo;
}

export type EntityRestPartialUpdateEntityAttrByGuid200Response = EntityRestPartialUpdateEntityAttrByGuid200Properties &
  HttpResponse;

export interface EntityRestPartialUpdateEntityAttrByGuid200Properties {
  status: 200;
  parsedBody: JsonEntityMutationResponse;
}

export type EntityRestDeleteByGuid200Response = EntityRestDeleteByGuid200Properties &
  HttpResponse;

export interface EntityRestDeleteByGuid200Properties {
  status: 200;
  parsedBody: JsonEntityMutationResponse;
}

export type EntityRestGetClassification200Response = EntityRestGetClassification200Properties &
  HttpResponse;

export interface EntityRestGetClassification200Properties {
  status: 200;
  parsedBody: JsonAtlasClassification;
}

export type EntityRestDeleteClassification204Response = EntityRestDeleteClassification204Properties &
  HttpResponse;

export interface EntityRestDeleteClassification204Properties {
  status: 204;
}

export type EntityRestGetClassifications200Response = EntityRestGetClassifications200Properties &
  HttpResponse;

export interface EntityRestGetClassifications200Properties {
  status: 200;
  parsedBody: JsonAtlasClassifications;
}

export type EntityRestAddClassifications204Response = EntityRestAddClassifications204Properties &
  HttpResponse;

export interface EntityRestAddClassifications204Properties {
  status: 204;
}

export type EntityRestUpdateClassifications204Response = EntityRestUpdateClassifications204Properties &
  HttpResponse;

export interface EntityRestUpdateClassifications204Properties {
  status: 204;
}

export type EntityRestGetByUniqueAttributes200Response = EntityRestGetByUniqueAttributes200Properties &
  HttpResponse;

export interface EntityRestGetByUniqueAttributes200Properties {
  status: 200;
  parsedBody: JsonAtlasEntityWithExtInfo;
}

export type EntityRestPartialUpdateEntityByUniqueAttrs200Response = EntityRestPartialUpdateEntityByUniqueAttrs200Properties &
  HttpResponse;

export interface EntityRestPartialUpdateEntityByUniqueAttrs200Properties {
  status: 200;
  parsedBody: JsonEntityMutationResponse;
}

export type EntityRestDeleteByUniqueAttribute200Response = EntityRestDeleteByUniqueAttribute200Properties &
  HttpResponse;

export interface EntityRestDeleteByUniqueAttribute200Properties {
  status: 200;
  parsedBody: JsonEntityMutationResponse;
}

export type EntityRestDeleteClassificationByUniqueAttribute204Response = EntityRestDeleteClassificationByUniqueAttribute204Properties &
  HttpResponse;

export interface EntityRestDeleteClassificationByUniqueAttribute204Properties {
  status: 204;
}

export type EntityRestAddClassificationsByUniqueAttribute204Response = EntityRestAddClassificationsByUniqueAttribute204Properties &
  HttpResponse;

export interface EntityRestAddClassificationsByUniqueAttribute204Properties {
  status: 204;
}

export type EntityRestUpdateClassificationsByUniqueAttribute204Response = EntityRestUpdateClassificationsByUniqueAttribute204Properties &
  HttpResponse;

export interface EntityRestUpdateClassificationsByUniqueAttribute204Properties {
  status: 204;
}

export type EntityRestSetClassifications200Response = EntityRestSetClassifications200Properties &
  HttpResponse;

export interface EntityRestSetClassifications200Properties {
  status: 200;
  parsedBody: string[];
}

export type EntityRestGetEntitiesByUniqueAttributes200Response = EntityRestGetEntitiesByUniqueAttributes200Properties &
  HttpResponse;

export interface EntityRestGetEntitiesByUniqueAttributes200Properties {
  status: 200;
  parsedBody: JsonAtlasEntitiesWithExtInfo;
}

export type EntityRestGetHeaderById200Response = EntityRestGetHeaderById200Properties &
  HttpResponse;

export interface EntityRestGetHeaderById200Properties {
  status: 200;
  parsedBody: JsonAtlasEntityHeader;
}

export type GlossaryRestGetGlossaries200Response = GlossaryRestGetGlossaries200Properties &
  HttpResponse;

export interface GlossaryRestGetGlossaries200Properties {
  status: 200;
  parsedBody: JsonAtlasGlossary[];
}

export type GlossaryRestCreateGlossary200Response = GlossaryRestCreateGlossary200Properties &
  HttpResponse;

export interface GlossaryRestCreateGlossary200Properties {
  status: 200;
  parsedBody: JsonAtlasGlossary;
}

export type GlossaryRestCreateGlossaryCategories200Response = GlossaryRestCreateGlossaryCategories200Properties &
  HttpResponse;

export interface GlossaryRestCreateGlossaryCategories200Properties {
  status: 200;
  parsedBody: JsonAtlasGlossaryCategory[];
}

export type GlossaryRestCreateGlossaryCategory200Response = GlossaryRestCreateGlossaryCategory200Properties &
  HttpResponse;

export interface GlossaryRestCreateGlossaryCategory200Properties {
  status: 200;
  parsedBody: JsonAtlasGlossaryCategory;
}

export type GlossaryRestGetGlossaryCategory200Response = GlossaryRestGetGlossaryCategory200Properties &
  HttpResponse;

export interface GlossaryRestGetGlossaryCategory200Properties {
  status: 200;
  parsedBody: JsonAtlasGlossaryCategory;
}

export type GlossaryRestUpdateGlossaryCategory200Response = GlossaryRestUpdateGlossaryCategory200Properties &
  HttpResponse;

export interface GlossaryRestUpdateGlossaryCategory200Properties {
  status: 200;
  parsedBody: JsonAtlasGlossaryCategory;
}

export type GlossaryRestDeleteGlossaryCategory204Response = GlossaryRestDeleteGlossaryCategory204Properties &
  HttpResponse;

export interface GlossaryRestDeleteGlossaryCategory204Properties {
  status: 204;
}

export type GlossaryRestPartialUpdateGlossaryCategory200Response = GlossaryRestPartialUpdateGlossaryCategory200Properties &
  HttpResponse;

export interface GlossaryRestPartialUpdateGlossaryCategory200Properties {
  status: 200;
  parsedBody: JsonAtlasGlossaryCategory;
}

export type GlossaryRestGetRelatedCategories200Response = GlossaryRestGetRelatedCategories200Properties &
  HttpResponse;

export interface GlossaryRestGetRelatedCategories200Properties {
  status: 200;
  parsedBody: DictionaryOfpathsCic80AAtlasV2GlossaryCategoryCategoryguidRelatedGetResponses200ContentApplicationJsonSchemaAdditionalproperties;
}

export type GlossaryRestGetCategoryTerms200Response = GlossaryRestGetCategoryTerms200Properties &
  HttpResponse;

export interface GlossaryRestGetCategoryTerms200Properties {
  status: 200;
  parsedBody: JsonAtlasRelatedTermHeader[];
}

export type GlossaryRestCreateGlossaryTerm200Response = GlossaryRestCreateGlossaryTerm200Properties &
  HttpResponse;

export interface GlossaryRestCreateGlossaryTerm200Properties {
  status: 200;
  parsedBody: JsonAtlasGlossaryTerm;
}

export type GlossaryRestGetGlossaryTerm200Response = GlossaryRestGetGlossaryTerm200Properties &
  HttpResponse;

export interface GlossaryRestGetGlossaryTerm200Properties {
  status: 200;
  parsedBody: JsonAtlasGlossaryTerm;
}

export type GlossaryRestUpdateGlossaryTerm200Response = GlossaryRestUpdateGlossaryTerm200Properties &
  HttpResponse;

export interface GlossaryRestUpdateGlossaryTerm200Properties {
  status: 200;
  parsedBody: JsonAtlasGlossaryTerm;
}

export type GlossaryRestDeleteGlossaryTerm204Response = GlossaryRestDeleteGlossaryTerm204Properties &
  HttpResponse;

export interface GlossaryRestDeleteGlossaryTerm204Properties {
  status: 204;
}

export type GlossaryRestPartialUpdateGlossaryTerm200Response = GlossaryRestPartialUpdateGlossaryTerm200Properties &
  HttpResponse;

export interface GlossaryRestPartialUpdateGlossaryTerm200Properties {
  status: 200;
  parsedBody: JsonAtlasGlossaryTerm;
}

export type GlossaryRestCreateGlossaryTerms200Response = GlossaryRestCreateGlossaryTerms200Properties &
  HttpResponse;

export interface GlossaryRestCreateGlossaryTerms200Properties {
  status: 200;
  parsedBody: JsonAtlasGlossaryTerm[];
}

export type GlossaryRestGetEntitiesAssignedWithTerm200Response = GlossaryRestGetEntitiesAssignedWithTerm200Properties &
  HttpResponse;

export interface GlossaryRestGetEntitiesAssignedWithTerm200Properties {
  status: 200;
  parsedBody: JsonAtlasRelatedObjectId[];
}

export type GlossaryRestAssignTermToEntities204Response = GlossaryRestAssignTermToEntities204Properties &
  HttpResponse;

export interface GlossaryRestAssignTermToEntities204Properties {
  status: 204;
}

export type GlossaryRestRemoveTermAssignmentFromEntities204Response = GlossaryRestRemoveTermAssignmentFromEntities204Properties &
  HttpResponse;

export interface GlossaryRestRemoveTermAssignmentFromEntities204Properties {
  status: 204;
}

export type GlossaryRestDeleteTermAssignmentFromEntities204Response = GlossaryRestDeleteTermAssignmentFromEntities204Properties &
  HttpResponse;

export interface GlossaryRestDeleteTermAssignmentFromEntities204Properties {
  status: 204;
}

export type GlossaryRestGetRelatedTerms200Response = GlossaryRestGetRelatedTerms200Properties &
  HttpResponse;

export interface GlossaryRestGetRelatedTerms200Properties {
  status: 200;
  parsedBody: DictionaryOfpathsV84KwqAtlasV2GlossaryTermsTermguidRelatedGetResponses200ContentApplicationJsonSchemaAdditionalproperties;
}

export type GlossaryRestGetGlossary200Response = GlossaryRestGetGlossary200Properties &
  HttpResponse;

export interface GlossaryRestGetGlossary200Properties {
  status: 200;
  parsedBody: JsonAtlasGlossary;
}

export type GlossaryRestUpdateGlossary200Response = GlossaryRestUpdateGlossary200Properties &
  HttpResponse;

export interface GlossaryRestUpdateGlossary200Properties {
  status: 200;
  parsedBody: JsonAtlasGlossary;
}

export type GlossaryRestDeleteGlossary204Response = GlossaryRestDeleteGlossary204Properties &
  HttpResponse;

export interface GlossaryRestDeleteGlossary204Properties {
  status: 204;
}

export type GlossaryRestGetGlossaryCategories200Response = GlossaryRestGetGlossaryCategories200Properties &
  HttpResponse;

export interface GlossaryRestGetGlossaryCategories200Properties {
  status: 200;
  parsedBody: JsonAtlasGlossaryCategory[];
}

export type GlossaryRestGetGlossaryCategoriesHeaders200Response = GlossaryRestGetGlossaryCategoriesHeaders200Properties &
  HttpResponse;

export interface GlossaryRestGetGlossaryCategoriesHeaders200Properties {
  status: 200;
  parsedBody: JsonAtlasRelatedCategoryHeader[];
}

export type GlossaryRestGetDetailedGlossary200Response = GlossaryRestGetDetailedGlossary200Properties &
  HttpResponse;

export interface GlossaryRestGetDetailedGlossary200Properties {
  status: 200;
  parsedBody: JsonAtlasGlossaryExtInfo;
}

export type GlossaryRestPartialUpdateGlossary200Response = GlossaryRestPartialUpdateGlossary200Properties &
  HttpResponse;

export interface GlossaryRestPartialUpdateGlossary200Properties {
  status: 200;
  parsedBody: JsonAtlasGlossary;
}

export type GlossaryRestGetGlossaryTerms200Response = GlossaryRestGetGlossaryTerms200Properties &
  HttpResponse;

export interface GlossaryRestGetGlossaryTerms200Properties {
  status: 200;
  parsedBody: JsonAtlasGlossaryTerm[];
}

export type GlossaryRestGetGlossaryTermHeaders200Response = GlossaryRestGetGlossaryTermHeaders200Properties &
  HttpResponse;

export interface GlossaryRestGetGlossaryTermHeaders200Properties {
  status: 200;
  parsedBody: JsonAtlasRelatedTermHeader[];
}

export type GlossaryRestImportGlossaryTermsViaCSV202Response = GlossaryRestImportGlossaryTermsViaCSV202Properties &
  HttpResponse;

export interface GlossaryRestImportGlossaryTermsViaCSV202Properties {
  status: 202;
  parsedBody: JsonImportCSVOperation;
}

export type GlossaryRestImportGlossaryTermsViaCSVByGlossaryName202Response = GlossaryRestImportGlossaryTermsViaCSVByGlossaryName202Properties &
  HttpResponse;

export interface GlossaryRestImportGlossaryTermsViaCSVByGlossaryName202Properties {
  status: 202;
  parsedBody: JsonImportCSVOperation;
}

export type GlossaryRestGetImportCSVOperationStatus200Response = GlossaryRestGetImportCSVOperationStatus200Properties &
  HttpResponse;

export interface GlossaryRestGetImportCSVOperationStatus200Properties {
  status: 200;
  parsedBody: JsonImportCSVOperation;
}

export type GlossaryRestExportGlossaryTermsAsCSV200Response = GlossaryRestExportGlossaryTermsAsCSV200Properties &
  HttpResponse;

export interface GlossaryRestExportGlossaryTermsAsCSV200Properties {
  status: 200;
}

export type GlossaryRestGetTermsByGlossaryName200Response = GlossaryRestGetTermsByGlossaryName200Properties &
  HttpResponse;

export interface GlossaryRestGetTermsByGlossaryName200Properties {
  status: 200;
  parsedBody: JsonAtlasGlossaryTerm[];
}

export type DiscoveryRestSearchAdvanced200Response = DiscoveryRestSearchAdvanced200Properties &
  HttpResponse;

export interface DiscoveryRestSearchAdvanced200Properties {
  status: 200;
  parsedBody: JsonSearchResult;
}

export type DiscoveryRestSuggest200Response = DiscoveryRestSuggest200Properties &
  HttpResponse;

export interface DiscoveryRestSuggest200Properties {
  status: 200;
  parsedBody: JsonSuggestResult;
}

export type DiscoveryRestAutoComplete200Response = DiscoveryRestAutoComplete200Properties &
  HttpResponse;

export interface DiscoveryRestAutoComplete200Properties {
  status: 200;
  parsedBody: JsonAutocompleteResult;
}

export type LineageRestGetLineageGraph200Response = LineageRestGetLineageGraph200Properties &
  HttpResponse;

export interface LineageRestGetLineageGraph200Properties {
  status: 200;
  parsedBody: JsonAtlasLineageInfo;
}

export type LineageRestNextLevelLineage200Response = LineageRestNextLevelLineage200Properties &
  HttpResponse;

export interface LineageRestNextLevelLineage200Properties {
  status: 200;
  parsedBody: JsonAtlasLineageInfo;
}

export type RelationshipRestCreate200Response = RelationshipRestCreate200Properties &
  HttpResponse;

export interface RelationshipRestCreate200Properties {
  status: 200;
  parsedBody: JsonAtlasRelationship;
}

export type RelationshipRestUpdate200Response = RelationshipRestUpdate200Properties &
  HttpResponse;

export interface RelationshipRestUpdate200Properties {
  status: 200;
  parsedBody: JsonAtlasRelationship;
}

export type RelationshipRestGetById2200Response = RelationshipRestGetById2200Properties &
  HttpResponse;

export interface RelationshipRestGetById2200Properties {
  status: 200;
  parsedBody: JsonAtlasRelationshipWithExtInfo;
}

export type RelationshipRestDeleteById204Response = RelationshipRestDeleteById204Properties &
  HttpResponse;

export interface RelationshipRestDeleteById204Properties {
  status: 204;
}

export type TypesRestGetClassificationDefByGuid200Response = TypesRestGetClassificationDefByGuid200Properties &
  HttpResponse;

export interface TypesRestGetClassificationDefByGuid200Properties {
  status: 200;
  parsedBody: JsonAtlasClassificationDef;
}

export type TypesRestGetClassificationDefByName200Response = TypesRestGetClassificationDefByName200Properties &
  HttpResponse;

export interface TypesRestGetClassificationDefByName200Properties {
  status: 200;
  parsedBody: JsonAtlasClassificationDef;
}

export type TypesRestGetEntityDefByGuid200Response = TypesRestGetEntityDefByGuid200Properties &
  HttpResponse;

export interface TypesRestGetEntityDefByGuid200Properties {
  status: 200;
  parsedBody: JsonAtlasEntityDef;
}

export type TypesRestGetEntityDefByName200Response = TypesRestGetEntityDefByName200Properties &
  HttpResponse;

export interface TypesRestGetEntityDefByName200Properties {
  status: 200;
  parsedBody: JsonAtlasEntityDef;
}

export type TypesRestGetEnumDefByGuid200Response = TypesRestGetEnumDefByGuid200Properties &
  HttpResponse;

export interface TypesRestGetEnumDefByGuid200Properties {
  status: 200;
  parsedBody: JsonAtlasEnumDef;
}

export type TypesRestGetEnumDefByName200Response = TypesRestGetEnumDefByName200Properties &
  HttpResponse;

export interface TypesRestGetEnumDefByName200Properties {
  status: 200;
  parsedBody: JsonAtlasEnumDef;
}

export type TypesRestGetRelationshipDefByGuid200Response = TypesRestGetRelationshipDefByGuid200Properties &
  HttpResponse;

export interface TypesRestGetRelationshipDefByGuid200Properties {
  status: 200;
  parsedBody: JsonAtlasRelationshipDef;
}

export type TypesRestGetRelationshipDefByName200Response = TypesRestGetRelationshipDefByName200Properties &
  HttpResponse;

export interface TypesRestGetRelationshipDefByName200Properties {
  status: 200;
  parsedBody: JsonAtlasRelationshipDef;
}

export type TypesRestGetStructDefByGuid200Response = TypesRestGetStructDefByGuid200Properties &
  HttpResponse;

export interface TypesRestGetStructDefByGuid200Properties {
  status: 200;
  parsedBody: JsonAtlasStructDef;
}

export type TypesRestGetStructDefByName200Response = TypesRestGetStructDefByName200Properties &
  HttpResponse;

export interface TypesRestGetStructDefByName200Properties {
  status: 200;
  parsedBody: JsonAtlasStructDef;
}

export type TypesRestGetTypeDefByGuid200Response = TypesRestGetTypeDefByGuid200Properties &
  HttpResponse;

export interface TypesRestGetTypeDefByGuid200Properties {
  status: 200;
  parsedBody: JsonAtlasTypeDef;
}

export type TypesRestGetTypeDefByName200Response = TypesRestGetTypeDefByName200Properties &
  HttpResponse;

export interface TypesRestGetTypeDefByName200Properties {
  status: 200;
  parsedBody: JsonAtlasTypeDef;
}

export type TypesRestDeleteTypeByName204Response = TypesRestDeleteTypeByName204Properties &
  HttpResponse;

export interface TypesRestDeleteTypeByName204Properties {
  status: 204;
}

export type TypesRestGetAllTypeDefs200Response = TypesRestGetAllTypeDefs200Properties &
  HttpResponse;

export interface TypesRestGetAllTypeDefs200Properties {
  status: 200;
  parsedBody: JsonAtlasTypesDef;
}

export type TypesRestCreateTypeDefs200Response = TypesRestCreateTypeDefs200Properties &
  HttpResponse;

export interface TypesRestCreateTypeDefs200Properties {
  status: 200;
  parsedBody: JsonAtlasTypesDef;
}

export type TypesRestUpdateAtlasTypeDefs200Response = TypesRestUpdateAtlasTypeDefs200Properties &
  HttpResponse;

export interface TypesRestUpdateAtlasTypeDefs200Properties {
  status: 200;
  parsedBody: JsonAtlasTypesDef;
}

export type TypesRestDeleteTypeDefs204Response = TypesRestDeleteTypeDefs204Properties &
  HttpResponse;

export interface TypesRestDeleteTypeDefs204Properties {
  status: 204;
}

export type TypesRestGetTypeDefHeaders200Response = TypesRestGetTypeDefHeaders200Properties &
  HttpResponse;

export interface TypesRestGetTypeDefHeaders200Properties {
  status: 200;
  parsedBody: JsonAtlasTypeDefHeader[];
}

export type TypesRestGetTermTemplateDefByGuid200Response = TypesRestGetTermTemplateDefByGuid200Properties &
  HttpResponse;

export interface TypesRestGetTermTemplateDefByGuid200Properties {
  status: 200;
  parsedBody: JsonTermTemplateDef;
}

export type TypesRestGetTermTemplateDefByName200Response = TypesRestGetTermTemplateDefByName200Properties &
  HttpResponse;

export interface TypesRestGetTermTemplateDefByName200Properties {
  status: 200;
  parsedBody: JsonTermTemplateDef;
}
