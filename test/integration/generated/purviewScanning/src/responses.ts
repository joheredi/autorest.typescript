import {
  ErrorResponseModel,
  AzureKeyVault,
  AzureKeyVaultList,
  ClassificationRule,
  ClassificationRuleList,
  OperationResponse,
  DataSource,
  DataSourceList,
  Filter,
  FilterList,
  ScanHistoryList,
  Scan,
  ScanList,
  ScanRuleset,
  ScanRulesetList,
  SystemScanRulesetList,
  SystemScanRuleset,
  SystemScanRulesetSetting,
  SystemScanRulesetSettingList,
  Trigger,
  TriggerList
} from "./models";
import { HttpResponse } from "@azure-rest/core-client";
import { RawHttpHeaders } from "@azure/core-rest-pipeline";

export type AzureKeyVaultsHead200Response = AzureKeyVaultsHead200Properties &
  HttpResponse;

export interface AzureKeyVaultsHead200Properties {
  status: 200;
}

export type AzureKeyVaultsHeaddefaultResponse = AzureKeyVaultsHeaddefaultProperties &
  HttpResponse;

export interface AzureKeyVaultsHeaddefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type AzureKeyVaultsGetAzureKeyVault200Response = AzureKeyVaultsGetAzureKeyVault200Properties &
  HttpResponse;

export interface AzureKeyVaultsGetAzureKeyVault200Properties {
  status: 200;
  parsedBody: AzureKeyVault;
}

export type AzureKeyVaultsGetAzureKeyVaultdefaultResponse = AzureKeyVaultsGetAzureKeyVaultdefaultProperties &
  HttpResponse;

export interface AzureKeyVaultsGetAzureKeyVaultdefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type AzureKeyVaultsCreateAzureKeyVault200Response = AzureKeyVaultsCreateAzureKeyVault200Properties &
  HttpResponse;

export interface AzureKeyVaultsCreateAzureKeyVault200Properties {
  status: 200;
  parsedBody: AzureKeyVault;
}

export type AzureKeyVaultsCreateAzureKeyVaultdefaultResponse = AzureKeyVaultsCreateAzureKeyVaultdefaultProperties &
  HttpResponse;

export interface AzureKeyVaultsCreateAzureKeyVaultdefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type AzureKeyVaultsDeleteAzureKeyVault200Response = AzureKeyVaultsDeleteAzureKeyVault200Properties &
  HttpResponse;

export interface AzureKeyVaultsDeleteAzureKeyVault200Properties {
  status: 200;
}

export type AzureKeyVaultsDeleteAzureKeyVaultdefaultResponse = AzureKeyVaultsDeleteAzureKeyVaultdefaultProperties &
  HttpResponse;

export interface AzureKeyVaultsDeleteAzureKeyVaultdefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type AzureKeyVaultsListByAccount200Response = AzureKeyVaultsListByAccount200Properties &
  HttpResponse;

export interface AzureKeyVaultsListByAccount200Properties {
  status: 200;
  parsedBody: AzureKeyVaultList;
}

export type AzureKeyVaultsListByAccountdefaultResponse = AzureKeyVaultsListByAccountdefaultProperties &
  HttpResponse;

export interface AzureKeyVaultsListByAccountdefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type BloomFilterCook200Response = BloomFilterCook200Properties &
  HttpResponse;

export interface BloomFilterCook200Properties {
  status: 200;
}

export type BloomFilterCookdefaultResponse = BloomFilterCookdefaultProperties &
  HttpResponse;

export interface BloomFilterCookdefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type ClassificationRulesHead200Response = ClassificationRulesHead200Properties &
  HttpResponse;

export interface ClassificationRulesHead200Properties {
  status: 200;
}

export type ClassificationRulesHeaddefaultResponse = ClassificationRulesHeaddefaultProperties &
  HttpResponse;

export interface ClassificationRulesHeaddefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type ClassificationRulesGet200Response = ClassificationRulesGet200Properties &
  HttpResponse;

export interface ClassificationRulesGet200Properties {
  status: 200;
  parsedBody: ClassificationRule;
}

export type ClassificationRulesGetdefaultResponse = ClassificationRulesGetdefaultProperties &
  HttpResponse;

export interface ClassificationRulesGetdefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type ClassificationRulesCreateOrUpdate200Response = ClassificationRulesCreateOrUpdate200Properties &
  HttpResponse;

export interface ClassificationRulesCreateOrUpdate200Properties {
  status: 200;
  parsedBody: ClassificationRule;
}

export type ClassificationRulesCreateOrUpdate201Response = ClassificationRulesCreateOrUpdate201Properties &
  HttpResponse;

export interface ClassificationRulesCreateOrUpdate201Properties {
  status: 201;
  parsedBody: ClassificationRule;
}

export type ClassificationRulesCreateOrUpdatedefaultResponse = ClassificationRulesCreateOrUpdatedefaultProperties &
  HttpResponse;

export interface ClassificationRulesCreateOrUpdatedefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type ClassificationRulesDelete200Response = ClassificationRulesDelete200Properties &
  HttpResponse;

export interface ClassificationRulesDelete200Properties {
  status: 200;
}

export type ClassificationRulesDelete202Response = ClassificationRulesDelete202Properties &
  HttpResponse;

export interface ClassificationRulesDelete202Properties {
  status: 202;
}

export type ClassificationRulesDelete204Response = ClassificationRulesDelete204Properties &
  HttpResponse;

export interface ClassificationRulesDelete204Properties {
  status: 204;
}

export type ClassificationRulesDeletedefaultResponse = ClassificationRulesDeletedefaultProperties &
  HttpResponse;

export interface ClassificationRulesDeletedefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type ClassificationRulesListAll200Response = ClassificationRulesListAll200Properties &
  HttpResponse;

export interface ClassificationRulesListAll200Properties {
  status: 200;
  parsedBody: ClassificationRuleList;
}

export type ClassificationRulesListAlldefaultResponse = ClassificationRulesListAlldefaultProperties &
  HttpResponse;

export interface ClassificationRulesListAlldefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type ClassificationRulesListVersionsByClassificationRuleName200Response = ClassificationRulesListVersionsByClassificationRuleName200Properties &
  HttpResponse;

export interface ClassificationRulesListVersionsByClassificationRuleName200Properties {
  status: 200;
  parsedBody: ClassificationRuleList;
}

export type ClassificationRulesListVersionsByClassificationRuleNamedefaultResponse = ClassificationRulesListVersionsByClassificationRuleNamedefaultProperties &
  HttpResponse;

export interface ClassificationRulesListVersionsByClassificationRuleNamedefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type ClassificationRulesSetClassificationActionForVersion200Response = ClassificationRulesSetClassificationActionForVersion200Properties &
  HttpResponse;

export interface ClassificationRulesSetClassificationActionForVersion200Properties {
  status: 200;
  parsedBody: OperationResponse;
}

export type ClassificationRulesSetClassificationActionForVersion202Response = ClassificationRulesSetClassificationActionForVersion202Properties &
  HttpResponse;

export interface ClassificationRulesSetClassificationActionForVersion202Properties {
  status: 202;
  parsedBody: OperationResponse;
}

export type ClassificationRulesSetClassificationActionForVersiondefaultResponse = ClassificationRulesSetClassificationActionForVersiondefaultProperties &
  HttpResponse;

export interface ClassificationRulesSetClassificationActionForVersiondefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type DataSourcesCreateOrUpdate200Response = DataSourcesCreateOrUpdate200Properties &
  HttpResponse;

export interface DataSourcesCreateOrUpdate200Properties {
  status: 200;
  parsedBody: DataSource;
}

export type DataSourcesCreateOrUpdate201Response = DataSourcesCreateOrUpdate201Properties &
  HttpResponse;

export interface DataSourcesCreateOrUpdate201Properties {
  status: 201;
  parsedBody: DataSource;
}

export type DataSourcesCreateOrUpdatedefaultResponse = DataSourcesCreateOrUpdatedefaultProperties &
  HttpResponse;

export interface DataSourcesCreateOrUpdatedefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type DataSourcesHead200Response = DataSourcesHead200Properties &
  HttpResponse;

export interface DataSourcesHead200Properties {
  status: 200;
}

export type DataSourcesHeaddefaultResponse = DataSourcesHeaddefaultProperties &
  HttpResponse;

export interface DataSourcesHeaddefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type DataSourcesGet200Response = DataSourcesGet200Properties &
  HttpResponse;

export interface DataSourcesGet200Properties {
  status: 200;
  parsedBody: DataSource;
}

export type DataSourcesGetdefaultResponse = DataSourcesGetdefaultProperties &
  HttpResponse;

export interface DataSourcesGetdefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type DataSourcesDelete200Response = DataSourcesDelete200Properties &
  HttpResponse;

export interface DataSourcesDelete200Properties {
  status: 200;
}

export type DataSourcesDelete202Response = DataSourcesDelete202Properties &
  HttpResponse;

export interface DataSourcesDelete202Properties {
  status: 202;
}

export type DataSourcesDelete204Response = DataSourcesDelete204Properties &
  HttpResponse;

export interface DataSourcesDelete204Properties {
  status: 204;
}

export type DataSourcesDeletedefaultResponse = DataSourcesDeletedefaultProperties &
  HttpResponse;

export interface DataSourcesDeletedefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type DataSourcesListByAccount200Response = DataSourcesListByAccount200Properties &
  HttpResponse;

export interface DataSourcesListByAccount200Properties {
  status: 200;
  parsedBody: DataSourceList;
}

export type DataSourcesListByAccountdefaultResponse = DataSourcesListByAccountdefaultProperties &
  HttpResponse;

export interface DataSourcesListByAccountdefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type DataSourcesListChildrenByCollection200Response = DataSourcesListChildrenByCollection200Properties &
  HttpResponse;

export interface DataSourcesListChildrenByCollection200Properties {
  status: 200;
  parsedBody: DataSourceList;
}

export type DataSourcesListChildrenByCollectiondefaultResponse = DataSourcesListChildrenByCollectiondefaultProperties &
  HttpResponse;

export interface DataSourcesListChildrenByCollectiondefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type DataSourceListUnparentedDataSourcesByAccount200Response = DataSourceListUnparentedDataSourcesByAccount200Properties &
  HttpResponse;

export interface DataSourceListUnparentedDataSourcesByAccount200Properties {
  status: 200;
  parsedBody: DataSourceList;
}

export type DataSourceListUnparentedDataSourcesByAccountdefaultResponse = DataSourceListUnparentedDataSourcesByAccountdefaultProperties &
  HttpResponse;

export interface DataSourceListUnparentedDataSourcesByAccountdefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type FiltersHead200Response = FiltersHead200Properties & HttpResponse;

export interface FiltersHead200Properties {
  status: 200;
}

export type FiltersHeaddefaultResponse = FiltersHeaddefaultProperties &
  HttpResponse;

export interface FiltersHeaddefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type FiltersGet200Response = FiltersGet200Properties & HttpResponse;

export interface FiltersGet200Properties {
  status: 200;
  parsedBody: Filter;
}

export type FiltersGetdefaultResponse = FiltersGetdefaultProperties &
  HttpResponse;

export interface FiltersGetdefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type FiltersCreateOrUpdate200Response = FiltersCreateOrUpdate200Properties &
  HttpResponse;

export interface FiltersCreateOrUpdate200Properties {
  status: 200;
  parsedBody: Filter;
}

export type FiltersCreateOrUpdate201Response = FiltersCreateOrUpdate201Properties &
  HttpResponse;

export interface FiltersCreateOrUpdate201Properties {
  status: 201;
  parsedBody: Filter;
}

export type FiltersCreateOrUpdatedefaultResponse = FiltersCreateOrUpdatedefaultProperties &
  HttpResponse;

export interface FiltersCreateOrUpdatedefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type FiltersDelete200Response = FiltersDelete200Properties &
  HttpResponse;

export interface FiltersDelete200Properties {
  status: 200;
}

export type FiltersDelete202Response = FiltersDelete202Properties &
  HttpResponse;

export interface FiltersDelete202Properties {
  status: 202;
}

export type FiltersDelete204Response = FiltersDelete204Properties &
  HttpResponse;

export interface FiltersDelete204Properties {
  status: 204;
}

export type FiltersDeletedefaultResponse = FiltersDeletedefaultProperties &
  HttpResponse;

export interface FiltersDeletedefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type FiltersListByScan200Response = FiltersListByScan200Properties &
  HttpResponse;

export interface FiltersListByScan200Properties {
  status: 200;
  parsedBody: FilterList;
}

export type FiltersListByScandefaultResponse = FiltersListByScandefaultProperties &
  HttpResponse;

export interface FiltersListByScandefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type ScansRun200Response = ScansRun200Properties & HttpResponse;

export interface ScansRun200Properties {
  status: 200;
  parsedBody: OperationResponse;
}

export type ScansRun202Response = ScansRun202Properties & HttpResponse;

export interface ScansRun202Properties {
  status: 202;
  parsedBody: OperationResponse;
}

export type ScansRundefaultResponse = ScansRundefaultProperties & HttpResponse;

export interface ScansRundefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type ScansCancel202Response = ScansCancel202Properties & HttpResponse;

export interface ScansCancel202Properties {
  status: 202;
  parsedBody: OperationResponse;
}

export type ScansCanceldefaultResponse = ScansCanceldefaultProperties &
  HttpResponse;

export interface ScansCanceldefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type ScansListHistory200Response = ScansListHistory200Properties &
  HttpResponse;

export interface ScansListHistory200Properties {
  status: 200;
  parsedBody: ScanHistoryList;
}

export type ScansListHistorydefaultResponse = ScansListHistorydefaultProperties &
  HttpResponse;

export interface ScansListHistorydefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type ScansListHistoryPost200Response = ScansListHistoryPost200Properties &
  HttpResponse;

export interface ScansListHistoryPost200Properties {
  status: 200;
  parsedBody: ScanHistoryList;
}

export type ScansListHistoryPostdefaultResponse = ScansListHistoryPostdefaultProperties &
  HttpResponse;

export interface ScansListHistoryPostdefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type ScansCreateOrUpdate200Response = ScansCreateOrUpdate200Properties &
  HttpResponse;

export interface ScansCreateOrUpdate200Properties {
  status: 200;
  parsedBody: Scan;
}

export type ScansCreateOrUpdate201Response = ScansCreateOrUpdate201Properties &
  HttpResponse;

export interface ScansCreateOrUpdate201Properties {
  status: 201;
  parsedBody: Scan;
}

export type ScansCreateOrUpdatedefaultResponse = ScansCreateOrUpdatedefaultProperties &
  HttpResponse;

export interface ScansCreateOrUpdatedefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type ScansHead200Response = ScansHead200Properties & HttpResponse;

export interface ScansHead200Properties {
  status: 200;
}

export type ScansHeaddefaultResponse = ScansHeaddefaultProperties &
  HttpResponse;

export interface ScansHeaddefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type ScansGet200Response = ScansGet200Properties & HttpResponse;

export interface ScansGet200Properties {
  status: 200;
  parsedBody: Scan;
}

export type ScansGetdefaultResponse = ScansGetdefaultProperties & HttpResponse;

export interface ScansGetdefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type ScansDelete200Response = ScansDelete200Properties & HttpResponse;

export interface ScansDelete200Properties {
  status: 200;
}

export type ScansDelete202Response = ScansDelete202Properties & HttpResponse;

export interface ScansDelete202Properties {
  status: 202;
}

export type ScansDelete204Response = ScansDelete204Properties & HttpResponse;

export interface ScansDelete204Properties {
  status: 204;
}

export type ScansDeletedefaultResponse = ScansDeletedefaultProperties &
  HttpResponse;

export interface ScansDeletedefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type ScansListByDataSource200Response = ScansListByDataSource200Properties &
  HttpResponse;

export interface ScansListByDataSource200Properties {
  status: 200;
  parsedBody: ScanList;
}

export type ScansListByDataSourcedefaultResponse = ScansListByDataSourcedefaultProperties &
  HttpResponse;

export interface ScansListByDataSourcedefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type ScanRulesetsHead200Response = ScanRulesetsHead200Properties &
  HttpResponse;

export interface ScanRulesetsHead200Properties {
  status: 200;
}

export type ScanRulesetsHeaddefaultResponse = ScanRulesetsHeaddefaultProperties &
  HttpResponse;

export interface ScanRulesetsHeaddefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type ScanRulesetsGet200Response = ScanRulesetsGet200Properties &
  HttpResponse;

export interface ScanRulesetsGet200Properties {
  status: 200;
  parsedBody: ScanRuleset;
}

export type ScanRulesetsGetdefaultResponse = ScanRulesetsGetdefaultProperties &
  HttpResponse;

export interface ScanRulesetsGetdefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type ScanRulesetsCreateOrUpdate200Response = ScanRulesetsCreateOrUpdate200Properties &
  HttpResponse;

export interface ScanRulesetsCreateOrUpdate200Properties {
  status: 200;
  parsedBody: ScanRuleset;
}

export type ScanRulesetsCreateOrUpdate201Response = ScanRulesetsCreateOrUpdate201Properties &
  HttpResponse;

export interface ScanRulesetsCreateOrUpdate201Properties {
  status: 201;
  parsedBody: ScanRuleset;
}

export type ScanRulesetsCreateOrUpdatedefaultResponse = ScanRulesetsCreateOrUpdatedefaultProperties &
  HttpResponse;

export interface ScanRulesetsCreateOrUpdatedefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type ScanRulesetsDelete200Response = ScanRulesetsDelete200Properties &
  HttpResponse;

export interface ScanRulesetsDelete200Properties {
  status: 200;
}

export type ScanRulesetsDelete202Response = ScanRulesetsDelete202Properties &
  HttpResponse;

export interface ScanRulesetsDelete202Properties {
  status: 202;
}

export type ScanRulesetsDelete204Response = ScanRulesetsDelete204Properties &
  HttpResponse;

export interface ScanRulesetsDelete204Properties {
  status: 204;
}

export type ScanRulesetsDeletedefaultResponse = ScanRulesetsDeletedefaultProperties &
  HttpResponse;

export interface ScanRulesetsDeletedefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type ScanRulesetsListAll200Response = ScanRulesetsListAll200Properties &
  HttpResponse;

export interface ScanRulesetsListAll200Properties {
  status: 200;
  parsedBody: ScanRulesetList;
}

export type ScanRulesetsListAlldefaultResponse = ScanRulesetsListAlldefaultProperties &
  HttpResponse;

export interface ScanRulesetsListAlldefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type SystemScanRulesetsListAll200Response = SystemScanRulesetsListAll200Properties &
  HttpResponse;

export interface SystemScanRulesetsListAll200Properties {
  status: 200;
  parsedBody: SystemScanRulesetList;
}

export type SystemScanRulesetsListAlldefaultResponse = SystemScanRulesetsListAlldefaultProperties &
  HttpResponse;

export interface SystemScanRulesetsListAlldefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type SystemScanRulesetsGet200Response = SystemScanRulesetsGet200Properties &
  HttpResponse;

export interface SystemScanRulesetsGet200Properties {
  status: 200;
  parsedBody: SystemScanRuleset;
}

export type SystemScanRulesetsGetdefaultResponse = SystemScanRulesetsGetdefaultProperties &
  HttpResponse;

export interface SystemScanRulesetsGetdefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type SystemScanRulesetsGetByVersion200Response = SystemScanRulesetsGetByVersion200Properties &
  HttpResponse;

export interface SystemScanRulesetsGetByVersion200Properties {
  status: 200;
  parsedBody: SystemScanRuleset;
}

export type SystemScanRulesetsGetByVersiondefaultResponse = SystemScanRulesetsGetByVersiondefaultProperties &
  HttpResponse;

export interface SystemScanRulesetsGetByVersiondefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type SystemScanRulesetsGetLatest200Response = SystemScanRulesetsGetLatest200Properties &
  HttpResponse;

export interface SystemScanRulesetsGetLatest200Properties {
  status: 200;
  parsedBody: SystemScanRuleset;
}

export type SystemScanRulesetsGetLatestdefaultResponse = SystemScanRulesetsGetLatestdefaultProperties &
  HttpResponse;

export interface SystemScanRulesetsGetLatestdefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type SystemScanRulesetsListVersionsByDataSource200Response = SystemScanRulesetsListVersionsByDataSource200Properties &
  HttpResponse;

export interface SystemScanRulesetsListVersionsByDataSource200Properties {
  status: 200;
  parsedBody: SystemScanRulesetList;
}

export type SystemScanRulesetsListVersionsByDataSourcedefaultResponse = SystemScanRulesetsListVersionsByDataSourcedefaultProperties &
  HttpResponse;

export interface SystemScanRulesetsListVersionsByDataSourcedefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type SystemScanRulesetSettingsGet200Response = SystemScanRulesetSettingsGet200Properties &
  HttpResponse;

export interface SystemScanRulesetSettingsGet200Properties {
  status: 200;
  parsedBody: SystemScanRulesetSetting;
}

export type SystemScanRulesetSettingsGetdefaultResponse = SystemScanRulesetSettingsGetdefaultProperties &
  HttpResponse;

export interface SystemScanRulesetSettingsGetdefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type SystemScanRulesetSettingsListAll200Response = SystemScanRulesetSettingsListAll200Properties &
  HttpResponse;

export interface SystemScanRulesetSettingsListAll200Properties {
  status: 200;
  parsedBody: SystemScanRulesetSettingList;
}

export type SystemScanRulesetSettingsListAlldefaultResponse = SystemScanRulesetSettingsListAlldefaultProperties &
  HttpResponse;

export interface SystemScanRulesetSettingsListAlldefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type SystemScanRulesetSettingsCreateOrUpdate200Response = SystemScanRulesetSettingsCreateOrUpdate200Properties &
  HttpResponse;

export interface SystemScanRulesetSettingsCreateOrUpdate200Properties {
  status: 200;
  parsedBody: SystemScanRulesetSetting;
}

export type SystemScanRulesetSettingsCreateOrUpdate201Response = SystemScanRulesetSettingsCreateOrUpdate201Properties &
  HttpResponse;

export interface SystemScanRulesetSettingsCreateOrUpdate201Properties {
  status: 201;
  parsedBody: SystemScanRulesetSetting;
}

export type SystemScanRulesetSettingsCreateOrUpdatedefaultResponse = SystemScanRulesetSettingsCreateOrUpdatedefaultProperties &
  HttpResponse;

export interface SystemScanRulesetSettingsCreateOrUpdatedefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type TriggersHead200Response = TriggersHead200Properties & HttpResponse;

export interface TriggersHead200Properties {
  status: 200;
}

export type TriggersHeaddefaultResponse = TriggersHeaddefaultProperties &
  HttpResponse;

export interface TriggersHeaddefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type TriggersGetTrigger200Response = TriggersGetTrigger200Properties &
  HttpResponse;

export interface TriggersGetTrigger200Properties {
  status: 200;
  parsedBody: Trigger;
}

export type TriggersGetTriggerdefaultResponse = TriggersGetTriggerdefaultProperties &
  HttpResponse;

export interface TriggersGetTriggerdefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type TriggersCreateTrigger200Response = TriggersCreateTrigger200Properties &
  HttpResponse;

export interface TriggersCreateTrigger200Properties {
  status: 200;
  parsedBody: Trigger;
}

export type TriggersCreateTrigger201Response = TriggersCreateTrigger201Properties &
  HttpResponse;

export interface TriggersCreateTrigger201Properties {
  status: 201;
  parsedBody: Trigger;
}

export type TriggersCreateTriggerdefaultResponse = TriggersCreateTriggerdefaultProperties &
  HttpResponse;

export interface TriggersCreateTriggerdefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type TriggersDeleteTrigger200Response = TriggersDeleteTrigger200Properties &
  HttpResponse;

export interface TriggersDeleteTrigger200Properties {
  status: 200;
}

export type TriggersDeleteTrigger202Response = TriggersDeleteTrigger202Properties &
  HttpResponse;

export interface TriggersDeleteTrigger202Properties {
  status: 202;
}

export type TriggersDeleteTrigger204Response = TriggersDeleteTrigger204Properties &
  HttpResponse;

export interface TriggersDeleteTrigger204Properties {
  status: 204;
}

export type TriggersDeleteTriggerdefaultResponse = TriggersDeleteTriggerdefaultProperties &
  HttpResponse;

export interface TriggersDeleteTriggerdefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}

export type TriggersListByScan200Response = TriggersListByScan200Properties &
  HttpResponse;

export interface TriggersListByScan200Properties {
  status: 200;
  parsedBody: TriggerList;
}

export type TriggersListByScandefaultResponse = TriggersListByScandefaultProperties &
  HttpResponse;

export interface TriggersListByScandefaultProperties {
  status: number;
  parsedBody: ErrorResponseModel;
}
