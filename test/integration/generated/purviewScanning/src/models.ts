export interface ErrorResponseModel {
  /** */
  error?: ErrorResponseModelError;
}

export type ErrorResponseModelError = ErrorResponseModelErrorBase & ErrorModel;

export interface ErrorResponseModelErrorBase {}

export interface ErrorModel {
  /** */
  code?: string;
  /** */
  message?: string;
  /** */
  target?: string;
  /** */
  details?: ErrorModel[];
}

export type AzureKeyVault = AzureKeyVaultBase & ProxyResource;

export interface AzureKeyVaultBase {
  /** */
  properties?: AzureKeyVaultProperties;
}

export interface AzureKeyVaultProperties {
  /** */
  baseUrl?: string;
  /** */
  description?: string;
}

export interface ProxyResource {
  /** */
  id?: string;
  /** */
  name?: string;
}

export interface AzureKeyVaultList {
  /** */
  value?: AzureKeyVault[];
  /** */
  nextLink?: string;
  /** */
  count?: number;
}

export type ClassificationRule = ClassificationRuleBase & ProxyResource;

export interface ClassificationRuleBase {
  /** */
  kind: ClassificationRuleKind;
}

export interface ClassificationRuleList {
  /** */
  value?: ClassificationRule[];
  /** */
  nextLink?: string;
  /** */
  count?: number;
}

export interface ClassificationRuleVersionAction {
  /** */
  classificationAction?: string;
}

export interface OperationResponse {
  /** */
  scanResultId?: string;
  /** */
  startTime?: Date;
  /** */
  endTime?: Date;
  /** */
  status?: OperationResponseStatus;
  /** */
  error?: OperationResponseError;
}

export type OperationResponseError = OperationResponseErrorBase & ErrorInfo;

export interface OperationResponseErrorBase {}

export interface ErrorInfo {
  /** */
  code?: string;
  /** */
  message?: string;
  /** */
  target?: string;
  /** */
  details?: ErrorInfo[];
}

export type DataSource = DataSourceBase & ProxyResource;

export interface DataSourceBase {
  /** */
  kind: DataSourceKind;
  /** */
  scans?: Scan[];
}

export type Scan = ScanBase & ProxyResource;

export interface ScanBase {
  /** */
  kind: ScanKind;
  /** */
  scanResults?: ScanResult[];
}

export interface ScanResult {
  /** */
  parentId?: string;
  /** */
  id?: string;
  /** */
  resourceId?: string;
  /** */
  status?: string;
  /** */
  assetsDiscovered?: number;
  /** */
  assetsClassified?: number;
  /** */
  diagnostics?: ScanResultDiagnostics;
  /** */
  startTime?: Date;
  /** */
  queuedTime?: Date;
  /** */
  pipelineStartTime?: Date;
  /** */
  endTime?: Date;
  /** */
  scanRulesetType?: ScanResultScanRulesetType;
  /** */
  errorMessage?: string;
  /** */
  error?: ScanResultError;
  /** */
  runType?: string;
}

export type ScanResultDiagnostics = ScanResultDiagnosticsBase & ScanDiagnostics;

export interface ScanResultDiagnosticsBase {}

export interface ScanDiagnostics {
  /** Dictionary of <integer> */
  exceptionCountMap?: ScanDiagnosticsExceptionCountMap;
}

export type ScanResultError = ScanResultErrorBase & ErrorModel;

export interface ScanResultErrorBase {}

export interface DataSourceList {
  /** */
  value?: DataSource[];
  /** */
  nextLink?: string;
  /** */
  count?: number;
}

export type Filter = FilterBase & ProxyResource;

export interface FilterBase {
  /** */
  properties?: FilterProperties;
}

export interface FilterProperties {
  /** */
  excludeUriPrefixes?: string[];
  /** */
  includeUriPrefixes?: string[];
}

export interface FilterList {
  /** */
  value?: Filter[];
  /** */
  nextLink?: string;
  /** */
  count?: number;
}

export interface ScanRunProperties {
  /** */
  scanLevel?: ScanRunPropertiesScanLevel;
  /** */
  incrementalScanStartTime?: Date;
}

export interface CancelScanRequest {
  /** */
  id?: string;
}

export interface ScanHistoryList {
  /** */
  value?: ScanResult[];
  /** */
  nextLink?: string;
  /** */
  count?: number;
}

export interface ScanList {
  /** */
  value?: Scan[];
  /** */
  nextLink?: string;
  /** */
  count?: number;
}

export type ScanRuleset = ScanRulesetBase & ProxyResource;

export interface ScanRulesetBase {
  /** */
  kind: ScanRulesetKind;
  /** */
  scanRulesetType?: ScanRulesetType;
}

export interface ScanRulesetList {
  /** */
  value?: ScanRuleset[];
  /** */
  nextLink?: string;
  /** */
  count?: number;
}

export interface SystemScanRulesetList {
  /** */
  value?: SystemScanRuleset[];
  /** */
  nextLink?: string;
  /** */
  count?: number;
}

export type SystemScanRuleset = SystemScanRulesetBase & ProxyResource;

export interface SystemScanRulesetBase {
  /** */
  kind: SystemScanRulesetKind;
  /** */
  scanRulesetType?: SystemScanRulesetType;
  /** */
  status?: SystemScanRulesetStatus;
  /** */
  version?: number;
}

export interface SystemScanRulesetSetting {
  /** */
  properties?: SystemScanRulesetSettingProperties;
}

export interface SystemScanRulesetSettingProperties {
  /** */
  createdAt?: Date;
  /** */
  lastModifiedAt?: Date;
  /** */
  dataSourceType?: SystemScanRulesetSettingPropertiesDataSourceType;
  /** */
  version?: number;
}

export interface SystemScanRulesetSettingList {
  /** */
  value?: SystemScanRulesetSetting[];
  /** */
  nextLink?: string;
  /** */
  count?: number;
}

export type Trigger = TriggerBase & ProxyResource;

export interface TriggerBase {
  /** */
  properties?: TriggerProperties;
}

export interface TriggerProperties {
  /** */
  recurrence?: TriggerPropertiesRecurrence;
  /** */
  recurrenceInterval?: string;
  /** */
  createdAt?: Date;
  /** */
  lastModifiedAt?: Date;
  /** */
  lastScheduled?: Date;
  /** */
  scanLevel?: TriggerPropertiesScanLevel;
  /** */
  incrementalScanStartTime?: Date;
}

export type TriggerPropertiesRecurrence = TriggerPropertiesRecurrenceBase &
  TriggerRecurrence;

export interface TriggerPropertiesRecurrenceBase {}

export interface TriggerRecurrence {
  /** */
  frequency?: TriggerRecurrenceFrequency;
  /** */
  interval?: number;
  /** */
  startTime?: Date;
  /** */
  endTime?: Date;
  /** */
  schedule?: TriggerRecurrenceSchedule;
}

export type TriggerRecurrenceSchedule = TriggerRecurrenceScheduleBase &
  RecurrenceSchedule;

export interface TriggerRecurrenceScheduleBase {}

export interface RecurrenceSchedule {
  /** Dictionary of <any> */
  additionalProperties?: RecurrenceScheduleAdditionalProperties;
  /** */
  minutes?: number[];
  /** */
  hours?: number[];
  /** */
  weekDays?:
    | "Sunday"
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"[];
  /** */
  monthDays?: number[];
  /** */
  monthlyOccurrences?: RecurrenceScheduleOccurrence[];
}

export interface RecurrenceScheduleOccurrence {
  /** Dictionary of <any> */
  additionalProperties?: RecurrenceScheduleOccurrenceAdditionalProperties;
  /** */
  day?: RecurrenceScheduleOccurrenceDay;
  /** */
  occurrence?: number;
}

export interface TriggerList {
  /** */
  value?: Trigger[];
  /** */
  nextLink?: string;
  /** */
  count?: number;
}

export interface SystemClassificationRuleProperties {
  /** */
  description?: string;
  /** */
  version?: number;
  /** */
  classificationName?: string;
  /** */
  owner?: string;
  /** */
  ruleStatus?: SystemClassificationRulePropertiesRuleStatus;
  /** */
  createdAt?: Date;
  /** */
  lastModifiedAt?: Date;
}

export type SystemClassificationRule = SystemClassificationRuleBase &
  ClassificationRule;

export interface SystemClassificationRuleBase {
  /** */
  properties?: SystemClassificationRuleProperties;
}

export interface ClassificationRulePattern {
  /** */
  kind: "Regex";
}

export interface ClassificationRuleBloomFilter {
  /** */
  sourceFileName?: string;
  /** */
  cookedBloomFilter?: Uint8Array;
  /** */
  bloomFilterName?: string;
}

export interface CustomClassificationRuleProperties {
  /** */
  minimumDistinctMatchCount?: number;
  /** */
  minimumPercentageMatch?: number;
  /** */
  classificationAction?: CustomClassificationRulePropertiesClassificationAction;
  /** */
  dataPatterns?: ClassificationRulePattern[];
  /** */
  columnPatterns?: ClassificationRulePattern[];
  /** */
  classificationRuleBloomFilter?: CustomClassificationRulePropertiesClassificationRuleBloomFilter;
  /** */
  description?: string;
  /** */
  version?: number;
  /** */
  classificationName?: string;
  /** */
  owner?: string;
  /** */
  ruleStatus?: CustomClassificationRulePropertiesRuleStatus;
  /** */
  createdAt?: Date;
  /** */
  lastModifiedAt?: Date;
}

export type CustomClassificationRulePropertiesClassificationRuleBloomFilter = CustomClassificationRulePropertiesClassificationRuleBloomFilterBase &
  ClassificationRuleBloomFilter;

export interface CustomClassificationRulePropertiesClassificationRuleBloomFilterBase {}

export type CustomClassificationRule = CustomClassificationRuleBase &
  ClassificationRule;

export interface CustomClassificationRuleBase {
  /** */
  properties?: CustomClassificationRuleProperties;
}

export type RegexClassificationRulePattern = RegexClassificationRulePatternBase &
  ClassificationRulePattern;

export interface RegexClassificationRulePatternBase {
  /** */
  pattern?: string;
}

export interface DataSourceReference {
  /** */
  type?: string;
  /** */
  referenceName?: string;
}

export interface DataSourceProperties {
  /** */
  createdAt?: Date;
  /** */
  lastModifiedAt?: Date;
  /** */
  parentCollection?: DataSourcePropertiesParentCollection;
}

export type DataSourcePropertiesParentCollection = DataSourcePropertiesParentCollectionBase &
  DataSourceReference;

export interface DataSourcePropertiesParentCollectionBase {}

export type AzureSubscriptionProperties = AzureSubscriptionPropertiesBase &
  DataSourceProperties;

export interface AzureSubscriptionPropertiesBase {
  /** */
  subscriptionId?: string;
}

export type AzureSubscriptionDataSource = AzureSubscriptionDataSourceBase &
  DataSource;

export interface AzureSubscriptionDataSourceBase {
  /** */
  properties?: AzureSubscriptionDataSourceProperties;
}

export type AzureSubscriptionDataSourceProperties = AzureSubscriptionDataSourcePropertiesBase &
  AzureSubscriptionProperties;

export interface AzureSubscriptionDataSourcePropertiesBase {}

export type AzureResourceGroupProperties = AzureResourceGroupPropertiesBase &
  DataSourceProperties;

export interface AzureResourceGroupPropertiesBase {
  /** */
  subscriptionId?: string;
  /** */
  resourceGroup?: string;
}

export type AzureResourceGroupDataSource = AzureResourceGroupDataSourceBase &
  DataSource;

export interface AzureResourceGroupDataSourceBase {
  /** */
  properties?: AzureResourceGroupDataSourceProperties;
}

export type AzureResourceGroupDataSourceProperties = AzureResourceGroupDataSourcePropertiesBase &
  AzureResourceGroupProperties;

export interface AzureResourceGroupDataSourcePropertiesBase {}

export type AzureDataSourceProperties = AzureDataSourcePropertiesBase &
  DataSourceProperties;

export interface AzureDataSourcePropertiesBase {
  /** */
  resourceGroup?: string;
  /** */
  subscriptionId?: string;
  /** */
  location?: string;
  /** */
  resourceName?: string;
}

export type AzureSynapseWorkspaceProperties = AzureSynapseWorkspacePropertiesBase &
  AzureDataSourceProperties;

export interface AzureSynapseWorkspacePropertiesBase {
  /** */
  dedicatedSqlEndpoint?: string;
  /** */
  serverlessSqlEndpoint?: string;
}

export type AzureSynapseWorkspaceDataSource = AzureSynapseWorkspaceDataSourceBase &
  DataSource;

export interface AzureSynapseWorkspaceDataSourceBase {
  /** */
  properties?: AzureSynapseWorkspaceDataSourceProperties;
}

export type AzureSynapseWorkspaceDataSourceProperties = AzureSynapseWorkspaceDataSourcePropertiesBase &
  AzureSynapseWorkspaceProperties;

export interface AzureSynapseWorkspaceDataSourcePropertiesBase {}

export type AzureSynapseProperties = AzureSynapsePropertiesBase &
  AzureDataSourceProperties;

export interface AzureSynapsePropertiesBase {
  /** */
  sqlEndpoint?: string;
  /** */
  sqlOnDemandEndpoint?: string;
}

export type AzureSynapseDataSource = AzureSynapseDataSourceBase & DataSource;

export interface AzureSynapseDataSourceBase {
  /** */
  properties?: AzureSynapseDataSourceProperties;
}

export type AzureSynapseDataSourceProperties = AzureSynapseDataSourcePropertiesBase &
  AzureSynapseProperties;

export interface AzureSynapseDataSourcePropertiesBase {}

export type AdlsGen1Properties = AdlsGen1PropertiesBase &
  AzureDataSourceProperties;

export interface AdlsGen1PropertiesBase {
  /** */
  endpoint?: string;
}

export type AdlsGen1DataSource = AdlsGen1DataSourceBase & DataSource;

export interface AdlsGen1DataSourceBase {
  /** */
  properties?: AdlsGen1DataSourceProperties;
}

export type AdlsGen1DataSourceProperties = AdlsGen1DataSourcePropertiesBase &
  AdlsGen1Properties;

export interface AdlsGen1DataSourcePropertiesBase {}

export type AdlsGen2Properties = AdlsGen2PropertiesBase &
  AzureDataSourceProperties;

export interface AdlsGen2PropertiesBase {
  /** */
  endpoint?: string;
}

export type AdlsGen2DataSource = AdlsGen2DataSourceBase & DataSource;

export interface AdlsGen2DataSourceBase {
  /** */
  properties?: AdlsGen2DataSourceProperties;
}

export type AdlsGen2DataSourceProperties = AdlsGen2DataSourcePropertiesBase &
  AdlsGen2Properties;

export interface AdlsGen2DataSourcePropertiesBase {}

export type AmazonAccountProperties = AmazonAccountPropertiesBase &
  DataSourceProperties;

export interface AmazonAccountPropertiesBase {
  /** */
  awsAccountId?: string;
  /** */
  roleARN?: string;
}

export type AmazonAccountDataSource = AmazonAccountDataSourceBase & DataSource;

export interface AmazonAccountDataSourceBase {
  /** */
  properties?: AmazonAccountDataSourceProperties;
}

export type AmazonAccountDataSourceProperties = AmazonAccountDataSourcePropertiesBase &
  AmazonAccountProperties;

export interface AmazonAccountDataSourcePropertiesBase {}

export type AmazonS3Properties = AmazonS3PropertiesBase & DataSourceProperties;

export interface AmazonS3PropertiesBase {
  /** */
  serviceUrl?: string;
  /** */
  roleARN?: string;
}

export type AmazonS3DataSource = AmazonS3DataSourceBase & DataSource;

export interface AmazonS3DataSourceBase {
  /** */
  properties?: AmazonS3DataSourceProperties;
}

export type AmazonS3DataSourceProperties = AmazonS3DataSourcePropertiesBase &
  AmazonS3Properties;

export interface AmazonS3DataSourcePropertiesBase {}

export type AmazonSqlDatabaseProperties = AmazonSqlDatabasePropertiesBase &
  DataSourceProperties;

export interface AmazonSqlDatabasePropertiesBase {
  /** */
  serverEndpoint?: string;
}

export type AmazonSqlDatabaseDataSource = AmazonSqlDatabaseDataSourceBase &
  DataSource;

export interface AmazonSqlDatabaseDataSourceBase {
  /** */
  properties?: AmazonSqlDatabaseDataSourceProperties;
}

export type AmazonSqlDatabaseDataSourceProperties = AmazonSqlDatabaseDataSourcePropertiesBase &
  AmazonSqlDatabaseProperties;

export interface AmazonSqlDatabaseDataSourcePropertiesBase {}

export type AzureCosmosDbProperties = AzureCosmosDbPropertiesBase &
  AzureDataSourceProperties;

export interface AzureCosmosDbPropertiesBase {
  /** */
  accountUri?: string;
}

export type AzureCosmosDbDataSource = AzureCosmosDbDataSourceBase & DataSource;

export interface AzureCosmosDbDataSourceBase {
  /** */
  properties?: AzureCosmosDbDataSourceProperties;
}

export type AzureCosmosDbDataSourceProperties = AzureCosmosDbDataSourcePropertiesBase &
  AzureCosmosDbProperties;

export interface AzureCosmosDbDataSourcePropertiesBase {}

export type AzureDataExplorerProperties = AzureDataExplorerPropertiesBase &
  AzureDataSourceProperties;

export interface AzureDataExplorerPropertiesBase {
  /** */
  endpoint?: string;
}

export type AzureDataExplorerDataSource = AzureDataExplorerDataSourceBase &
  DataSource;

export interface AzureDataExplorerDataSourceBase {
  /** */
  properties?: AzureDataExplorerDataSourceProperties;
}

export type AzureDataExplorerDataSourceProperties = AzureDataExplorerDataSourcePropertiesBase &
  AzureDataExplorerProperties;

export interface AzureDataExplorerDataSourcePropertiesBase {}

export type AzureFileServiceProperties = AzureFileServicePropertiesBase &
  AzureDataSourceProperties;

export interface AzureFileServicePropertiesBase {
  /** */
  endpoint?: string;
}

export type AzureFileServiceDataSource = AzureFileServiceDataSourceBase &
  DataSource;

export interface AzureFileServiceDataSourceBase {
  /** */
  properties?: AzureFileServiceDataSourceProperties;
}

export type AzureFileServiceDataSourceProperties = AzureFileServiceDataSourcePropertiesBase &
  AzureFileServiceProperties;

export interface AzureFileServiceDataSourcePropertiesBase {}

export type AzureSearchProperties = AzureSearchPropertiesBase &
  AzureDataSourceProperties;

export interface AzureSearchPropertiesBase {
  /** */
  url?: string;
}

export type AzureSearchDataSource = AzureSearchDataSourceBase & DataSource;

export interface AzureSearchDataSourceBase {
  /** */
  properties?: AzureSearchDataSourceProperties;
}

export type AzureSearchDataSourceProperties = AzureSearchDataSourcePropertiesBase &
  AzureSearchProperties;

export interface AzureSearchDataSourcePropertiesBase {}

export type AzureSqlDatabaseProperties = AzureSqlDatabasePropertiesBase &
  AzureDataSourceProperties;

export interface AzureSqlDatabasePropertiesBase {
  /** */
  serverEndpoint?: string;
}

export type AzureSqlDatabaseDataSource = AzureSqlDatabaseDataSourceBase &
  DataSource;

export interface AzureSqlDatabaseDataSourceBase {
  /** */
  properties?: AzureSqlDatabaseDataSourceProperties;
}

export type AzureSqlDatabaseDataSourceProperties = AzureSqlDatabaseDataSourcePropertiesBase &
  AzureSqlDatabaseProperties;

export interface AzureSqlDatabaseDataSourcePropertiesBase {}

export type AmazonPostgreSqlDatabaseProperties = AmazonPostgreSqlDatabasePropertiesBase &
  DataSourceProperties;

export interface AmazonPostgreSqlDatabasePropertiesBase {
  /** */
  serverEndpoint?: string;
}

export type AmazonPostgreSqlDatabaseDataSource = AmazonPostgreSqlDatabaseDataSourceBase &
  DataSource;

export interface AmazonPostgreSqlDatabaseDataSourceBase {
  /** */
  properties?: AmazonPostgreSqlDatabaseDataSourceProperties;
}

export type AmazonPostgreSqlDatabaseDataSourceProperties = AmazonPostgreSqlDatabaseDataSourcePropertiesBase &
  AmazonPostgreSqlDatabaseProperties;

export interface AmazonPostgreSqlDatabaseDataSourcePropertiesBase {}

export type SqlServerDatabaseProperties = SqlServerDatabasePropertiesBase &
  AzureDataSourceProperties;

export interface SqlServerDatabasePropertiesBase {
  /** */
  serverEndpoint?: string;
}

export type SqlServerDatabaseDataSource = SqlServerDatabaseDataSourceBase &
  DataSource;

export interface SqlServerDatabaseDataSourceBase {
  /** */
  properties?: SqlServerDatabaseDataSourceProperties;
}

export type SqlServerDatabaseDataSourceProperties = SqlServerDatabaseDataSourcePropertiesBase &
  SqlServerDatabaseProperties;

export interface SqlServerDatabaseDataSourcePropertiesBase {}

export type AzureSqlDatabaseManagedInstanceProperties = AzureSqlDatabaseManagedInstancePropertiesBase &
  AzureDataSourceProperties;

export interface AzureSqlDatabaseManagedInstancePropertiesBase {
  /** */
  serverEndpoint?: string;
}

export type AzureSqlDatabaseManagedInstanceDataSource = AzureSqlDatabaseManagedInstanceDataSourceBase &
  DataSource;

export interface AzureSqlDatabaseManagedInstanceDataSourceBase {
  /** */
  properties?: AzureSqlDatabaseManagedInstanceDataSourceProperties;
}

export type AzureSqlDatabaseManagedInstanceDataSourceProperties = AzureSqlDatabaseManagedInstanceDataSourcePropertiesBase &
  AzureSqlDatabaseManagedInstanceProperties;

export interface AzureSqlDatabaseManagedInstanceDataSourcePropertiesBase {}

export type AzureSqlDataWarehouseProperties = AzureSqlDataWarehousePropertiesBase &
  AzureDataSourceProperties;

export interface AzureSqlDataWarehousePropertiesBase {
  /** */
  serverEndpoint?: string;
}

export type AzureSqlDataWarehouseDataSource = AzureSqlDataWarehouseDataSourceBase &
  DataSource;

export interface AzureSqlDataWarehouseDataSourceBase {
  /** */
  properties?: AzureSqlDataWarehouseDataSourceProperties;
}

export type AzureSqlDataWarehouseDataSourceProperties = AzureSqlDataWarehouseDataSourcePropertiesBase &
  AzureSqlDataWarehouseProperties;

export interface AzureSqlDataWarehouseDataSourcePropertiesBase {}

export type AzureSynapseDedicatedSqlProperties = AzureSynapseDedicatedSqlPropertiesBase &
  AzureDataSourceProperties;

export interface AzureSynapseDedicatedSqlPropertiesBase {
  /** */
  serverEndpoint?: string;
}

export type AzureSynapseDedicatedSqlDataSource = AzureSynapseDedicatedSqlDataSourceBase &
  DataSource;

export interface AzureSynapseDedicatedSqlDataSourceBase {
  /** */
  properties?: AzureSynapseDedicatedSqlDataSourceProperties;
}

export type AzureSynapseDedicatedSqlDataSourceProperties = AzureSynapseDedicatedSqlDataSourcePropertiesBase &
  AzureSynapseDedicatedSqlProperties;

export interface AzureSynapseDedicatedSqlDataSourcePropertiesBase {}

export type AzureSynapseSqlPoolProperties = AzureSynapseSqlPoolPropertiesBase &
  AzureDataSourceProperties;

export interface AzureSynapseSqlPoolPropertiesBase {
  /** */
  serverEndpoint?: string;
}

export type AzureSynapseSqlPoolDataSource = AzureSynapseSqlPoolDataSourceBase &
  DataSource;

export interface AzureSynapseSqlPoolDataSourceBase {
  /** */
  properties?: AzureSynapseSqlPoolDataSourceProperties;
}

export type AzureSynapseSqlPoolDataSourceProperties = AzureSynapseSqlPoolDataSourcePropertiesBase &
  AzureSynapseSqlPoolProperties;

export interface AzureSynapseSqlPoolDataSourcePropertiesBase {}

export type AzureSynapseServerlessSqlProperties = AzureSynapseServerlessSqlPropertiesBase &
  AzureDataSourceProperties;

export interface AzureSynapseServerlessSqlPropertiesBase {
  /** */
  serverEndpoint?: string;
}

export type AzureSynapseServerlessSqlDataSource = AzureSynapseServerlessSqlDataSourceBase &
  DataSource;

export interface AzureSynapseServerlessSqlDataSourceBase {
  /** */
  properties?: AzureSynapseServerlessSqlDataSourceProperties;
}

export type AzureSynapseServerlessSqlDataSourceProperties = AzureSynapseServerlessSqlDataSourcePropertiesBase &
  AzureSynapseServerlessSqlProperties;

export interface AzureSynapseServerlessSqlDataSourcePropertiesBase {}

export type AzureSynapseSqlOnDemandProperties = AzureSynapseSqlOnDemandPropertiesBase &
  AzureDataSourceProperties;

export interface AzureSynapseSqlOnDemandPropertiesBase {
  /** */
  serverEndpoint?: string;
}

export type AzureSynapseSqlOnDemandDataSource = AzureSynapseSqlOnDemandDataSourceBase &
  DataSource;

export interface AzureSynapseSqlOnDemandDataSourceBase {
  /** */
  properties?: AzureSynapseSqlOnDemandDataSourceProperties;
}

export type AzureSynapseSqlOnDemandDataSourceProperties = AzureSynapseSqlOnDemandDataSourcePropertiesBase &
  AzureSynapseSqlOnDemandProperties;

export interface AzureSynapseSqlOnDemandDataSourcePropertiesBase {}

export type AzureStorageProperties = AzureStoragePropertiesBase &
  AzureDataSourceProperties;

export interface AzureStoragePropertiesBase {
  /** */
  endpoint?: string;
}

export type AzureStorageDataSource = AzureStorageDataSourceBase & DataSource;

export interface AzureStorageDataSourceBase {
  /** */
  properties?: AzureStorageDataSourceProperties;
}

export type AzureStorageDataSourceProperties = AzureStorageDataSourcePropertiesBase &
  AzureStorageProperties;

export interface AzureStorageDataSourcePropertiesBase {}

export type HiveProperties = HivePropertiesBase & DataSourceProperties;

export interface HivePropertiesBase {
  /** */
  host?: string;
  /** */
  clusterUrl?: string;
}

export type HiveDataSource = HiveDataSourceBase & DataSource;

export interface HiveDataSourceBase {
  /** */
  properties?: HiveDataSourceProperties;
}

export type HiveDataSourceProperties = HiveDataSourcePropertiesBase &
  HiveProperties;

export interface HiveDataSourcePropertiesBase {}

export type TeradataProperties = TeradataPropertiesBase & DataSourceProperties;

export interface TeradataPropertiesBase {
  /** */
  host?: string;
}

export type TeradataDataSource = TeradataDataSourceBase & DataSource;

export interface TeradataDataSourceBase {
  /** */
  properties?: TeradataDataSourceProperties;
}

export type TeradataDataSourceProperties = TeradataDataSourcePropertiesBase &
  TeradataProperties;

export interface TeradataDataSourcePropertiesBase {}

export type OracleProperties = OraclePropertiesBase & DataSourceProperties;

export interface OraclePropertiesBase {
  /** */
  host?: string;
  /** */
  port?: string;
  /** */
  service?: string;
}

export type OracleDataSource = OracleDataSourceBase & DataSource;

export interface OracleDataSourceBase {
  /** */
  properties?: OracleDataSourceProperties;
}

export type OracleDataSourceProperties = OracleDataSourcePropertiesBase &
  OracleProperties;

export interface OracleDataSourcePropertiesBase {}

export type SapS4HanaProperties = SapS4HanaPropertiesBase &
  DataSourceProperties;

export interface SapS4HanaPropertiesBase {
  /** */
  applicationServer?: string;
  /** */
  systemNumber?: string;
}

export type SapS4HanaDataSource = SapS4HanaDataSourceBase & DataSource;

export interface SapS4HanaDataSourceBase {
  /** */
  properties?: SapS4HanaDataSourceProperties;
}

export type SapS4HanaDataSourceProperties = SapS4HanaDataSourcePropertiesBase &
  SapS4HanaProperties;

export interface SapS4HanaDataSourcePropertiesBase {}

export type SapEccProperties = SapEccPropertiesBase & DataSourceProperties;

export interface SapEccPropertiesBase {
  /** */
  applicationServer?: string;
  /** */
  systemNumber?: string;
}

export type SapEccDataSource = SapEccDataSourceBase & DataSource;

export interface SapEccDataSourceBase {
  /** */
  properties?: SapEccDataSourceProperties;
}

export type SapEccDataSourceProperties = SapEccDataSourcePropertiesBase &
  SapEccProperties;

export interface SapEccDataSourcePropertiesBase {}

export type PowerBIProperties = PowerBIPropertiesBase & DataSourceProperties;

export interface PowerBIPropertiesBase {
  /** */
  tenant?: string;
}

export type PowerBIDataSource = PowerBIDataSourceBase & DataSource;

export interface PowerBIDataSourceBase {
  /** */
  properties?: PowerBIDataSourceProperties;
}

export type PowerBIDataSourceProperties = PowerBIDataSourcePropertiesBase &
  PowerBIProperties;

export interface PowerBIDataSourcePropertiesBase {}

export interface TemporaryResourceFilter {
  /** */
  resourceFilterPattern?: string;
  /** */
  ingestTemporaryResource?: boolean;
}

export interface ScanRulesetProperties {
  /** */
  createdAt?: Date;
  /** */
  description?: string;
  /** */
  excludedSystemClassifications?: string[];
  /** */
  includedCustomClassificationRuleNames?: string[];
  /** */
  temporaryResourceFilters?: TemporaryResourceFilter[];
  /** */
  lastModifiedAt?: Date;
}

export type AzureSubscriptionScanRulesetProperties = AzureSubscriptionScanRulesetPropertiesBase &
  ScanRulesetProperties;

export interface AzureSubscriptionScanRulesetPropertiesBase {}

export type AzureSubscriptionScanRuleset = AzureSubscriptionScanRulesetBase &
  ScanRuleset;

export interface AzureSubscriptionScanRulesetBase {
  /** */
  properties?: AzureSubscriptionScanRulesetProperties;
}

export type AzureResourceGroupScanRulesetProperties = AzureResourceGroupScanRulesetPropertiesBase &
  ScanRulesetProperties;

export interface AzureResourceGroupScanRulesetPropertiesBase {}

export type AzureResourceGroupScanRuleset = AzureResourceGroupScanRulesetBase &
  ScanRuleset;

export interface AzureResourceGroupScanRulesetBase {
  /** */
  properties?: AzureResourceGroupScanRulesetProperties;
}

export type AzureSynapseWorkspaceScanRulesetProperties = AzureSynapseWorkspaceScanRulesetPropertiesBase &
  ScanRulesetProperties;

export interface AzureSynapseWorkspaceScanRulesetPropertiesBase {}

export type AzureSynapseWorkspaceScanRuleset = AzureSynapseWorkspaceScanRulesetBase &
  ScanRuleset;

export interface AzureSynapseWorkspaceScanRulesetBase {
  /** */
  properties?: AzureSynapseWorkspaceScanRulesetProperties;
}

export type AzureSynapseScanRulesetProperties = AzureSynapseScanRulesetPropertiesBase &
  ScanRulesetProperties;

export interface AzureSynapseScanRulesetPropertiesBase {}

export type AzureSynapseScanRuleset = AzureSynapseScanRulesetBase & ScanRuleset;

export interface AzureSynapseScanRulesetBase {
  /** */
  properties?: AzureSynapseScanRulesetProperties;
}

export interface CustomFileType {
  /** */
  builtInType?: CustomFileTypeBuiltInType;
  /** */
  customDelimiter?: string;
}

export interface CustomFileExtension {
  /** */
  customFileType?: CustomFileExtensionCustomFileType;
  /** */
  description?: string;
  /** */
  enabled?: boolean;
  /** */
  fileExtension?: string;
}

export type CustomFileExtensionCustomFileType = CustomFileExtensionCustomFileTypeBase &
  CustomFileType;

export interface CustomFileExtensionCustomFileTypeBase {}

export interface ScanningRule {
  /** */
  fileExtensions?:
    | "AVRO"
    | "ORC"
    | "PARQUET"
    | "JSON"
    | "TXT"
    | "XML"
    | "Documents"
    | "CSV"
    | "PSV"
    | "SSV"
    | "TSV"
    | "GZ"
    | "DOC"
    | "DOCM"
    | "DOCX"
    | "DOT"
    | "ODP"
    | "ODS"
    | "ODT"
    | "PDF"
    | "POT"
    | "PPS"
    | "PPSX"
    | "PPT"
    | "PPTM"
    | "PPTX"
    | "XLC"
    | "XLS"
    | "XLSB"
    | "XLSM"
    | "XLSX"
    | "XLT"[];
  /** */
  customFileExtensions?: CustomFileExtension[];
}

export type ScanningRuleScanRulesetProperties = ScanningRuleScanRulesetPropertiesBase &
  ScanRulesetProperties;

export interface ScanningRuleScanRulesetPropertiesBase {
  /** */
  scanningRule?: ScanningRuleScanRulesetPropertiesScanningRule;
}

export type ScanningRuleScanRulesetPropertiesScanningRule = ScanningRuleScanRulesetPropertiesScanningRuleBase &
  ScanningRule;

export interface ScanningRuleScanRulesetPropertiesScanningRuleBase {}

export type AdlsGen1ScanRulesetProperties = AdlsGen1ScanRulesetPropertiesBase &
  ScanningRuleScanRulesetProperties;

export interface AdlsGen1ScanRulesetPropertiesBase {}

export type AdlsGen1ScanRuleset = AdlsGen1ScanRulesetBase & ScanRuleset;

export interface AdlsGen1ScanRulesetBase {
  /** */
  properties?: AdlsGen1ScanRulesetProperties;
}

export type AdlsGen2ScanRulesetProperties = AdlsGen2ScanRulesetPropertiesBase &
  ScanningRuleScanRulesetProperties;

export interface AdlsGen2ScanRulesetPropertiesBase {}

export type AdlsGen2ScanRuleset = AdlsGen2ScanRulesetBase & ScanRuleset;

export interface AdlsGen2ScanRulesetBase {
  /** */
  properties?: AdlsGen2ScanRulesetProperties;
}

export type AmazonAccountScanRulesetProperties = AmazonAccountScanRulesetPropertiesBase &
  ScanRulesetProperties;

export interface AmazonAccountScanRulesetPropertiesBase {}

export type AmazonAccountScanRuleset = AmazonAccountScanRulesetBase &
  ScanRuleset;

export interface AmazonAccountScanRulesetBase {
  /** */
  properties?: AmazonAccountScanRulesetProperties;
}

export type AmazonS3ScanRulesetProperties = AmazonS3ScanRulesetPropertiesBase &
  ScanningRuleScanRulesetProperties;

export interface AmazonS3ScanRulesetPropertiesBase {}

export type AmazonS3ScanRuleset = AmazonS3ScanRulesetBase & ScanRuleset;

export interface AmazonS3ScanRulesetBase {
  /** */
  properties?: AmazonS3ScanRulesetProperties;
}

export type AmazonSqlDatabaseScanRulesetProperties = AmazonSqlDatabaseScanRulesetPropertiesBase &
  ScanRulesetProperties;

export interface AmazonSqlDatabaseScanRulesetPropertiesBase {}

export type AmazonSqlDatabaseScanRuleset = AmazonSqlDatabaseScanRulesetBase &
  ScanRuleset;

export interface AmazonSqlDatabaseScanRulesetBase {
  /** */
  properties?: AmazonSqlDatabaseScanRulesetProperties;
}

export type AzureCosmosDbScanRulesetProperties = AzureCosmosDbScanRulesetPropertiesBase &
  ScanRulesetProperties;

export interface AzureCosmosDbScanRulesetPropertiesBase {}

export type AzureCosmosDbScanRuleset = AzureCosmosDbScanRulesetBase &
  ScanRuleset;

export interface AzureCosmosDbScanRulesetBase {
  /** */
  properties?: AzureCosmosDbScanRulesetProperties;
}

export type AzureDataExplorerScanRulesetProperties = AzureDataExplorerScanRulesetPropertiesBase &
  ScanRulesetProperties;

export interface AzureDataExplorerScanRulesetPropertiesBase {}

export type AzureDataExplorerScanRuleset = AzureDataExplorerScanRulesetBase &
  ScanRuleset;

export interface AzureDataExplorerScanRulesetBase {
  /** */
  properties?: AzureDataExplorerScanRulesetProperties;
}

export type AzureFileServiceScanRulesetProperties = AzureFileServiceScanRulesetPropertiesBase &
  ScanningRuleScanRulesetProperties;

export interface AzureFileServiceScanRulesetPropertiesBase {}

export type AzureFileServiceScanRuleset = AzureFileServiceScanRulesetBase &
  ScanRuleset;

export interface AzureFileServiceScanRulesetBase {
  /** */
  properties?: AzureFileServiceScanRulesetProperties;
}

export type AzureSearchScanRulesetProperties = AzureSearchScanRulesetPropertiesBase &
  ScanRulesetProperties;

export interface AzureSearchScanRulesetPropertiesBase {}

export type AzureSearchScanRuleset = AzureSearchScanRulesetBase & ScanRuleset;

export interface AzureSearchScanRulesetBase {
  /** */
  properties?: AzureSearchScanRulesetProperties;
}

export type AzureSqlDatabaseScanRulesetProperties = AzureSqlDatabaseScanRulesetPropertiesBase &
  ScanRulesetProperties;

export interface AzureSqlDatabaseScanRulesetPropertiesBase {}

export type AzureSqlDatabaseScanRuleset = AzureSqlDatabaseScanRulesetBase &
  ScanRuleset;

export interface AzureSqlDatabaseScanRulesetBase {
  /** */
  properties?: AzureSqlDatabaseScanRulesetProperties;
}

export type AmazonPostgreSqlDatabaseScanRulesetProperties = AmazonPostgreSqlDatabaseScanRulesetPropertiesBase &
  ScanRulesetProperties;

export interface AmazonPostgreSqlDatabaseScanRulesetPropertiesBase {}

export type AmazonPostgreSqlDatabaseScanRuleset = AmazonPostgreSqlDatabaseScanRulesetBase &
  ScanRuleset;

export interface AmazonPostgreSqlDatabaseScanRulesetBase {
  /** */
  properties?: AmazonPostgreSqlDatabaseScanRulesetProperties;
}

export type SqlServerDatabaseScanRulesetProperties = SqlServerDatabaseScanRulesetPropertiesBase &
  ScanRulesetProperties;

export interface SqlServerDatabaseScanRulesetPropertiesBase {}

export type SqlServerDatabaseScanRuleset = SqlServerDatabaseScanRulesetBase &
  ScanRuleset;

export interface SqlServerDatabaseScanRulesetBase {
  /** */
  properties?: SqlServerDatabaseScanRulesetProperties;
}

export type AzureSqlDatabaseManagedInstanceScanRulesetProperties = AzureSqlDatabaseManagedInstanceScanRulesetPropertiesBase &
  ScanRulesetProperties;

export interface AzureSqlDatabaseManagedInstanceScanRulesetPropertiesBase {}

export type AzureSqlDatabaseManagedInstanceScanRuleset = AzureSqlDatabaseManagedInstanceScanRulesetBase &
  ScanRuleset;

export interface AzureSqlDatabaseManagedInstanceScanRulesetBase {
  /** */
  properties?: AzureSqlDatabaseManagedInstanceScanRulesetProperties;
}

export type AzureSqlDataWarehouseScanRulesetProperties = AzureSqlDataWarehouseScanRulesetPropertiesBase &
  ScanRulesetProperties;

export interface AzureSqlDataWarehouseScanRulesetPropertiesBase {}

export type AzureSqlDataWarehouseScanRuleset = AzureSqlDataWarehouseScanRulesetBase &
  ScanRuleset;

export interface AzureSqlDataWarehouseScanRulesetBase {
  /** */
  properties?: AzureSqlDataWarehouseScanRulesetProperties;
}

export type AzureSynapseDedicatedSqlScanRulesetProperties = AzureSynapseDedicatedSqlScanRulesetPropertiesBase &
  ScanRulesetProperties;

export interface AzureSynapseDedicatedSqlScanRulesetPropertiesBase {}

export type AzureSynapseDedicatedSqlScanRuleset = AzureSynapseDedicatedSqlScanRulesetBase &
  ScanRuleset;

export interface AzureSynapseDedicatedSqlScanRulesetBase {
  /** */
  properties?: AzureSynapseDedicatedSqlScanRulesetProperties;
}

export type AzureSynapseSqlPoolScanRulesetProperties = AzureSynapseSqlPoolScanRulesetPropertiesBase &
  ScanRulesetProperties;

export interface AzureSynapseSqlPoolScanRulesetPropertiesBase {}

export type AzureSynapseSqlPoolScanRuleset = AzureSynapseSqlPoolScanRulesetBase &
  ScanRuleset;

export interface AzureSynapseSqlPoolScanRulesetBase {
  /** */
  properties?: AzureSynapseSqlPoolScanRulesetProperties;
}

export type AzureSynapseServerlessSqlScanRulesetProperties = AzureSynapseServerlessSqlScanRulesetPropertiesBase &
  ScanRulesetProperties;

export interface AzureSynapseServerlessSqlScanRulesetPropertiesBase {}

export type AzureSynapseServerlessSqlScanRuleset = AzureSynapseServerlessSqlScanRulesetBase &
  ScanRuleset;

export interface AzureSynapseServerlessSqlScanRulesetBase {
  /** */
  properties?: AzureSynapseServerlessSqlScanRulesetProperties;
}

export type AzureSynapseSqlOnDemandScanRulesetProperties = AzureSynapseSqlOnDemandScanRulesetPropertiesBase &
  ScanRulesetProperties;

export interface AzureSynapseSqlOnDemandScanRulesetPropertiesBase {}

export type AzureSynapseSqlOnDemandScanRuleset = AzureSynapseSqlOnDemandScanRulesetBase &
  ScanRuleset;

export interface AzureSynapseSqlOnDemandScanRulesetBase {
  /** */
  properties?: AzureSynapseSqlOnDemandScanRulesetProperties;
}

export type AzureStorageScanRulesetProperties = AzureStorageScanRulesetPropertiesBase &
  ScanningRuleScanRulesetProperties;

export interface AzureStorageScanRulesetPropertiesBase {}

export type AzureStorageScanRuleset = AzureStorageScanRulesetBase & ScanRuleset;

export interface AzureStorageScanRulesetBase {
  /** */
  properties?: AzureStorageScanRulesetProperties;
}

export type HiveScanRulesetProperties = HiveScanRulesetPropertiesBase &
  ScanRulesetProperties;

export interface HiveScanRulesetPropertiesBase {}

export type HiveScanRuleset = HiveScanRulesetBase & ScanRuleset;

export interface HiveScanRulesetBase {
  /** */
  properties?: HiveScanRulesetProperties;
}

export type TeradataScanRulesetProperties = TeradataScanRulesetPropertiesBase &
  ScanRulesetProperties;

export interface TeradataScanRulesetPropertiesBase {}

export type TeradataScanRuleset = TeradataScanRulesetBase & ScanRuleset;

export interface TeradataScanRulesetBase {
  /** */
  properties?: TeradataScanRulesetProperties;
}

export type OracleScanRulesetProperties = OracleScanRulesetPropertiesBase &
  ScanRulesetProperties;

export interface OracleScanRulesetPropertiesBase {}

export type OracleScanRuleset = OracleScanRulesetBase & ScanRuleset;

export interface OracleScanRulesetBase {
  /** */
  properties?: OracleScanRulesetProperties;
}

export type SapS4HanaScanRulesetProperties = SapS4HanaScanRulesetPropertiesBase &
  ScanRulesetProperties;

export interface SapS4HanaScanRulesetPropertiesBase {}

export type SapS4HanaScanRuleset = SapS4HanaScanRulesetBase & ScanRuleset;

export interface SapS4HanaScanRulesetBase {
  /** */
  properties?: SapS4HanaScanRulesetProperties;
}

export type SapEccScanRulesetProperties = SapEccScanRulesetPropertiesBase &
  ScanRulesetProperties;

export interface SapEccScanRulesetPropertiesBase {}

export type SapEccScanRuleset = SapEccScanRulesetBase & ScanRuleset;

export interface SapEccScanRulesetBase {
  /** */
  properties?: SapEccScanRulesetProperties;
}

export type PowerBIScanRulesetProperties = PowerBIScanRulesetPropertiesBase &
  ScanRulesetProperties;

export interface PowerBIScanRulesetPropertiesBase {}

export type PowerBIScanRuleset = PowerBIScanRulesetBase & ScanRuleset;

export interface PowerBIScanRulesetBase {
  /** */
  properties?: PowerBIScanRulesetProperties;
}

export interface ResourceNameFilter {
  /** */
  excludePrefixes?: string[];
  /** */
  includePrefixes?: string[];
  /** */
  resourceNames?: string[];
}

export interface CredentialReference {
  /** */
  referenceName?: string;
  /** */
  credentialType?: CredentialReferenceCredentialType;
}

export interface ResourceTypeFilter {
  /** */
  scanRulesetName?: string;
  /** */
  scanRulesetType?: ResourceTypeFilterScanRulesetType;
  /** */
  resourceNameFilter?: ResourceTypeFilterResourceNameFilter;
  /** */
  credential?: ResourceTypeFilterCredential;
}

export type ResourceTypeFilterResourceNameFilter = ResourceTypeFilterResourceNameFilterBase &
  ResourceNameFilter;

export interface ResourceTypeFilterResourceNameFilterBase {}

export type ResourceTypeFilterCredential = ResourceTypeFilterCredentialBase &
  CredentialReference;

export interface ResourceTypeFilterCredentialBase {}

export interface ConnectedVia {
  /** */
  referenceName?: string;
}

export interface ScanProperties {
  /** */
  scanRulesetName?: string;
  /** */
  scanRulesetType?: ScanPropertiesScanRulesetType;
  /** */
  workers?: number;
  /** */
  createdAt?: Date;
  /** */
  lastModifiedAt?: Date;
  /** */
  connectedVia?: ScanPropertiesConnectedVia;
}

export type ScanPropertiesConnectedVia = ScanPropertiesConnectedViaBase &
  ConnectedVia;

export interface ScanPropertiesConnectedViaBase {}

export type ExpandingResourceScanProperties = ExpandingResourceScanPropertiesBase &
  ScanProperties;

export interface ExpandingResourceScanPropertiesBase {
  /** */
  resourceTypes?: ExpandingResourceScanPropertiesResourceTypes;
  /** */
  credential?: ExpandingResourceScanPropertiesCredential;
}

export interface ExpandingResourceScanPropertiesResourceTypes {
  /** */
  none?: ResourceTypeFilter;
  /** */
  collection?: ResourceTypeFilter;
  /** */
  azureSubscription?: ResourceTypeFilter;
  /** */
  azureResourceGroup?: ResourceTypeFilter;
  /** */
  azureSynapseWorkspace?: ResourceTypeFilter;
  /** */
  azureSynapse?: ResourceTypeFilter;
  /** */
  adlsGen1?: ResourceTypeFilter;
  /** */
  adlsGen2?: ResourceTypeFilter;
  /** */
  amazonAccount?: ResourceTypeFilter;
  /** */
  amazonS3?: ResourceTypeFilter;
  /** */
  amazonSqlDatabase?: ResourceTypeFilter;
  /** */
  azureCosmosDb?: ResourceTypeFilter;
  /** */
  azureDataExplorer?: ResourceTypeFilter;
  /** */
  azureFileService?: ResourceTypeFilter;
  /** */
  azureSearch?: ResourceTypeFilter;
  /** */
  azureSqlDatabase?: ResourceTypeFilter;
  /** */
  amazonPostgreSqlDatabase?: ResourceTypeFilter;
  /** */
  sqlServerDatabase?: ResourceTypeFilter;
  /** */
  azureSqlDatabaseManagedInstance?: ResourceTypeFilter;
  /** */
  azureSqlDataWarehouse?: ResourceTypeFilter;
  /** */
  azureSynapseDedicatedSql?: ResourceTypeFilter;
  /** */
  azureSynapseSqlPool?: ResourceTypeFilter;
  /** */
  azureSynapseServerlessSql?: ResourceTypeFilter;
  /** */
  azureSynapseSqlOnDemand?: ResourceTypeFilter;
  /** */
  azureStorage?: ResourceTypeFilter;
  /** */
  hive?: ResourceTypeFilter;
  /** */
  teradata?: ResourceTypeFilter;
  /** */
  oracle?: ResourceTypeFilter;
  /** */
  sapS4Hana?: ResourceTypeFilter;
  /** */
  sapEcc?: ResourceTypeFilter;
  /** */
  powerBI?: ResourceTypeFilter;
}

export type ExpandingResourceScanPropertiesCredential = ExpandingResourceScanPropertiesCredentialBase &
  CredentialReference;

export interface ExpandingResourceScanPropertiesCredentialBase {}

export type AzureSubscriptionCredentialScanProperties = AzureSubscriptionCredentialScanPropertiesBase &
  ExpandingResourceScanProperties;

export interface AzureSubscriptionCredentialScanPropertiesBase {}

export type AzureSubscriptionCredentialScan = AzureSubscriptionCredentialScanBase &
  Scan;

export interface AzureSubscriptionCredentialScanBase {
  /** */
  properties?: AzureSubscriptionCredentialScanProperties;
}

export type AzureSubscriptionMsiScanProperties = AzureSubscriptionMsiScanPropertiesBase &
  ExpandingResourceScanProperties;

export interface AzureSubscriptionMsiScanPropertiesBase {}

export type AzureSubscriptionMsiScan = AzureSubscriptionMsiScanBase & Scan;

export interface AzureSubscriptionMsiScanBase {
  /** */
  properties?: AzureSubscriptionMsiScanProperties;
}

export type AzureResourceGroupCredentialScanProperties = AzureResourceGroupCredentialScanPropertiesBase &
  ExpandingResourceScanProperties;

export interface AzureResourceGroupCredentialScanPropertiesBase {}

export type AzureResourceGroupCredentialScan = AzureResourceGroupCredentialScanBase &
  Scan;

export interface AzureResourceGroupCredentialScanBase {
  /** */
  properties?: AzureResourceGroupCredentialScanProperties;
}

export type AzureResourceGroupMsiScanProperties = AzureResourceGroupMsiScanPropertiesBase &
  ExpandingResourceScanProperties;

export interface AzureResourceGroupMsiScanPropertiesBase {}

export type AzureResourceGroupMsiScan = AzureResourceGroupMsiScanBase & Scan;

export interface AzureResourceGroupMsiScanBase {
  /** */
  properties?: AzureResourceGroupMsiScanProperties;
}

export type AzureSynapseWorkspaceCredentialScanProperties = AzureSynapseWorkspaceCredentialScanPropertiesBase &
  ExpandingResourceScanProperties;

export interface AzureSynapseWorkspaceCredentialScanPropertiesBase {}

export type AzureSynapseWorkspaceCredentialScan = AzureSynapseWorkspaceCredentialScanBase &
  Scan;

export interface AzureSynapseWorkspaceCredentialScanBase {
  /** */
  properties?: AzureSynapseWorkspaceCredentialScanProperties;
}

export type AzureSynapseWorkspaceMsiScanProperties = AzureSynapseWorkspaceMsiScanPropertiesBase &
  ExpandingResourceScanProperties;

export interface AzureSynapseWorkspaceMsiScanPropertiesBase {}

export type AzureSynapseWorkspaceMsiScan = AzureSynapseWorkspaceMsiScanBase &
  Scan;

export interface AzureSynapseWorkspaceMsiScanBase {
  /** */
  properties?: AzureSynapseWorkspaceMsiScanProperties;
}

export type AzureSynapseCredentialScanProperties = AzureSynapseCredentialScanPropertiesBase &
  ExpandingResourceScanProperties;

export interface AzureSynapseCredentialScanPropertiesBase {}

export type AzureSynapseCredentialScan = AzureSynapseCredentialScanBase & Scan;

export interface AzureSynapseCredentialScanBase {
  /** */
  properties?: AzureSynapseCredentialScanProperties;
}

export type AzureSynapseMsiScanProperties = AzureSynapseMsiScanPropertiesBase &
  ExpandingResourceScanProperties;

export interface AzureSynapseMsiScanPropertiesBase {}

export type AzureSynapseMsiScan = AzureSynapseMsiScanBase & Scan;

export interface AzureSynapseMsiScanBase {
  /** */
  properties?: AzureSynapseMsiScanProperties;
}

export type AdlsGen1CredentialScanProperties = AdlsGen1CredentialScanPropertiesBase &
  ScanProperties;

export interface AdlsGen1CredentialScanPropertiesBase {
  /** */
  credential?: AdlsGen1CredentialScanPropertiesCredential;
}

export type AdlsGen1CredentialScanPropertiesCredential = AdlsGen1CredentialScanPropertiesCredentialBase &
  CredentialReference;

export interface AdlsGen1CredentialScanPropertiesCredentialBase {}

export type AdlsGen1CredentialScan = AdlsGen1CredentialScanBase & Scan;

export interface AdlsGen1CredentialScanBase {
  /** */
  properties?: AdlsGen1CredentialScanProperties;
}

export type AdlsGen1MsiScanProperties = AdlsGen1MsiScanPropertiesBase &
  ScanProperties;

export interface AdlsGen1MsiScanPropertiesBase {}

export type AdlsGen1MsiScan = AdlsGen1MsiScanBase & Scan;

export interface AdlsGen1MsiScanBase {
  /** */
  properties?: AdlsGen1MsiScanProperties;
}

export type AdlsGen1ServicePrincipalScanProperties = AdlsGen1ServicePrincipalScanPropertiesBase &
  ScanProperties;

export interface AdlsGen1ServicePrincipalScanPropertiesBase {
  /** */
  tenantId?: string;
  /** */
  servicePrincipalId?: string;
  /** */
  servicePrincipalKey?: string;
}

export type AdlsGen1ServicePrincipalScan = AdlsGen1ServicePrincipalScanBase &
  Scan;

export interface AdlsGen1ServicePrincipalScanBase {
  /** */
  properties?: AdlsGen1ServicePrincipalScanProperties;
}

export type AdlsGen2CredentialScanProperties = AdlsGen2CredentialScanPropertiesBase &
  ScanProperties;

export interface AdlsGen2CredentialScanPropertiesBase {
  /** */
  credential?: AdlsGen2CredentialScanPropertiesCredential;
}

export type AdlsGen2CredentialScanPropertiesCredential = AdlsGen2CredentialScanPropertiesCredentialBase &
  CredentialReference;

export interface AdlsGen2CredentialScanPropertiesCredentialBase {}

export type AdlsGen2CredentialScan = AdlsGen2CredentialScanBase & Scan;

export interface AdlsGen2CredentialScanBase {
  /** */
  properties?: AdlsGen2CredentialScanProperties;
}

export type AdlsGen2AccessKeyScanProperties = AdlsGen2AccessKeyScanPropertiesBase &
  ScanProperties;

export interface AdlsGen2AccessKeyScanPropertiesBase {
  /** */
  accessKey?: string;
}

export type AdlsGen2AccessKeyScan = AdlsGen2AccessKeyScanBase & Scan;

export interface AdlsGen2AccessKeyScanBase {
  /** */
  properties?: AdlsGen2AccessKeyScanProperties;
}

export type AdlsGen2MsiScanProperties = AdlsGen2MsiScanPropertiesBase &
  ScanProperties;

export interface AdlsGen2MsiScanPropertiesBase {}

export type AdlsGen2MsiScan = AdlsGen2MsiScanBase & Scan;

export interface AdlsGen2MsiScanBase {
  /** */
  properties?: AdlsGen2MsiScanProperties;
}

export type AdlsGen2ServicePrincipalScanProperties = AdlsGen2ServicePrincipalScanPropertiesBase &
  ScanProperties;

export interface AdlsGen2ServicePrincipalScanPropertiesBase {
  /** */
  tenantId?: string;
  /** */
  servicePrincipalId?: string;
  /** */
  servicePrincipalKey?: string;
}

export type AdlsGen2ServicePrincipalScan = AdlsGen2ServicePrincipalScanBase &
  Scan;

export interface AdlsGen2ServicePrincipalScanBase {
  /** */
  properties?: AdlsGen2ServicePrincipalScanProperties;
}

export type AmazonAccountCredentialScanProperties = AmazonAccountCredentialScanPropertiesBase &
  ExpandingResourceScanProperties;

export interface AmazonAccountCredentialScanPropertiesBase {}

export type AmazonAccountCredentialScan = AmazonAccountCredentialScanBase &
  Scan;

export interface AmazonAccountCredentialScanBase {
  /** */
  properties?: AmazonAccountCredentialScanProperties;
}

export type AmazonS3CredentialScanProperties = AmazonS3CredentialScanPropertiesBase &
  ScanProperties;

export interface AmazonS3CredentialScanPropertiesBase {
  /** */
  credential?: AmazonS3CredentialScanPropertiesCredential;
  /** */
  roleARN?: string;
}

export type AmazonS3CredentialScanPropertiesCredential = AmazonS3CredentialScanPropertiesCredentialBase &
  CredentialReference;

export interface AmazonS3CredentialScanPropertiesCredentialBase {}

export type AmazonS3CredentialScan = AmazonS3CredentialScanBase & Scan;

export interface AmazonS3CredentialScanBase {
  /** */
  properties?: AmazonS3CredentialScanProperties;
}

export type AmazonS3RoleARNScanProperties = AmazonS3RoleARNScanPropertiesBase &
  ScanProperties;

export interface AmazonS3RoleARNScanPropertiesBase {
  /** */
  roleARN?: string;
}

export type AmazonS3RoleARNScan = AmazonS3RoleARNScanBase & Scan;

export interface AmazonS3RoleARNScanBase {
  /** */
  properties?: AmazonS3RoleARNScanProperties;
}

export type AmazonSqlDatabaseCredentialScanProperties = AmazonSqlDatabaseCredentialScanPropertiesBase &
  ScanProperties;

export interface AmazonSqlDatabaseCredentialScanPropertiesBase {
  /** */
  credential?: AmazonSqlDatabaseCredentialScanPropertiesCredential;
  /** */
  serverEndpoint?: string;
  /** */
  databaseName?: string;
}

export type AmazonSqlDatabaseCredentialScanPropertiesCredential = AmazonSqlDatabaseCredentialScanPropertiesCredentialBase &
  CredentialReference;

export interface AmazonSqlDatabaseCredentialScanPropertiesCredentialBase {}

export type AmazonSqlDatabaseCredentialScan = AmazonSqlDatabaseCredentialScanBase &
  Scan;

export interface AmazonSqlDatabaseCredentialScanBase {
  /** */
  properties?: AmazonSqlDatabaseCredentialScanProperties;
}

export type AzureCosmosDbCredentialScanProperties = AzureCosmosDbCredentialScanPropertiesBase &
  ScanProperties;

export interface AzureCosmosDbCredentialScanPropertiesBase {
  /** */
  credential?: AzureCosmosDbCredentialScanPropertiesCredential;
  /** */
  databaseName?: string;
}

export type AzureCosmosDbCredentialScanPropertiesCredential = AzureCosmosDbCredentialScanPropertiesCredentialBase &
  CredentialReference;

export interface AzureCosmosDbCredentialScanPropertiesCredentialBase {}

export type AzureCosmosDbCredentialScan = AzureCosmosDbCredentialScanBase &
  Scan;

export interface AzureCosmosDbCredentialScanBase {
  /** */
  properties?: AzureCosmosDbCredentialScanProperties;
}

export type AzureCosmosDbAccessKeyScanProperties = AzureCosmosDbAccessKeyScanPropertiesBase &
  ScanProperties;

export interface AzureCosmosDbAccessKeyScanPropertiesBase {
  /** */
  accessKey?: string;
  /** */
  databaseName?: string;
}

export type AzureCosmosDbAccessKeyScan = AzureCosmosDbAccessKeyScanBase & Scan;

export interface AzureCosmosDbAccessKeyScanBase {
  /** */
  properties?: AzureCosmosDbAccessKeyScanProperties;
}

export type AzureDataExplorerCredentialScanProperties = AzureDataExplorerCredentialScanPropertiesBase &
  ScanProperties;

export interface AzureDataExplorerCredentialScanPropertiesBase {
  /** */
  credential?: AzureDataExplorerCredentialScanPropertiesCredential;
  /** */
  database?: string;
}

export type AzureDataExplorerCredentialScanPropertiesCredential = AzureDataExplorerCredentialScanPropertiesCredentialBase &
  CredentialReference;

export interface AzureDataExplorerCredentialScanPropertiesCredentialBase {}

export type AzureDataExplorerCredentialScan = AzureDataExplorerCredentialScanBase &
  Scan;

export interface AzureDataExplorerCredentialScanBase {
  /** */
  properties?: AzureDataExplorerCredentialScanProperties;
}

export type AzureDataExplorerServicePrincipalScanProperties = AzureDataExplorerServicePrincipalScanPropertiesBase &
  ScanProperties;

export interface AzureDataExplorerServicePrincipalScanPropertiesBase {
  /** */
  tenantId?: string;
  /** */
  servicePrincipalId?: string;
  /** */
  servicePrincipalKey?: string;
  /** */
  database?: string;
}

export type AzureDataExplorerServicePrincipalScan = AzureDataExplorerServicePrincipalScanBase &
  Scan;

export interface AzureDataExplorerServicePrincipalScanBase {
  /** */
  properties?: AzureDataExplorerServicePrincipalScanProperties;
}

export type AzureDataExplorerMsiScanProperties = AzureDataExplorerMsiScanPropertiesBase &
  ScanProperties;

export interface AzureDataExplorerMsiScanPropertiesBase {
  /** */
  database?: string;
}

export type AzureDataExplorerMsiScan = AzureDataExplorerMsiScanBase & Scan;

export interface AzureDataExplorerMsiScanBase {
  /** */
  properties?: AzureDataExplorerMsiScanProperties;
}

export type AzureFileServiceCredentialScanProperties = AzureFileServiceCredentialScanPropertiesBase &
  ScanProperties;

export interface AzureFileServiceCredentialScanPropertiesBase {
  /** */
  credential?: AzureFileServiceCredentialScanPropertiesCredential;
  /** */
  shareName?: string;
}

export type AzureFileServiceCredentialScanPropertiesCredential = AzureFileServiceCredentialScanPropertiesCredentialBase &
  CredentialReference;

export interface AzureFileServiceCredentialScanPropertiesCredentialBase {}

export type AzureFileServiceCredentialScan = AzureFileServiceCredentialScanBase &
  Scan;

export interface AzureFileServiceCredentialScanBase {
  /** */
  properties?: AzureFileServiceCredentialScanProperties;
}

export type AzureFileServiceAccessKeyScanProperties = AzureFileServiceAccessKeyScanPropertiesBase &
  ScanProperties;

export interface AzureFileServiceAccessKeyScanPropertiesBase {
  /** */
  accessKey?: string;
  /** */
  shareName?: string;
}

export type AzureFileServiceAccessKeyScan = AzureFileServiceAccessKeyScanBase &
  Scan;

export interface AzureFileServiceAccessKeyScanBase {
  /** */
  properties?: AzureFileServiceAccessKeyScanProperties;
}

export type AzureSearchAdminKeyScanProperties = AzureSearchAdminKeyScanPropertiesBase &
  ScanProperties;

export interface AzureSearchAdminKeyScanPropertiesBase {
  /** */
  adminKey?: string;
}

export type AzureSearchAdminKeyScan = AzureSearchAdminKeyScanBase & Scan;

export interface AzureSearchAdminKeyScanBase {
  /** */
  properties?: AzureSearchAdminKeyScanProperties;
}

export type AzureSqlScanProperties = AzureSqlScanPropertiesBase &
  ScanProperties;

export interface AzureSqlScanPropertiesBase {
  /** */
  serverEndpoint?: string;
  /** */
  databaseName?: string;
}

export type AzureSqlCredentialScanProperties = AzureSqlCredentialScanPropertiesBase &
  AzureSqlScanProperties;

export interface AzureSqlCredentialScanPropertiesBase {
  /** */
  credential?: AzureSqlCredentialScanPropertiesCredential;
}

export type AzureSqlCredentialScanPropertiesCredential = AzureSqlCredentialScanPropertiesCredentialBase &
  CredentialReference;

export interface AzureSqlCredentialScanPropertiesCredentialBase {}

export type AzureSqlDatabaseCredentialScanProperties = AzureSqlDatabaseCredentialScanPropertiesBase &
  AzureSqlCredentialScanProperties;

export interface AzureSqlDatabaseCredentialScanPropertiesBase {}

export type AzureSqlDatabaseCredentialScan = AzureSqlDatabaseCredentialScanBase &
  Scan;

export interface AzureSqlDatabaseCredentialScanBase {
  /** */
  properties?: AzureSqlDatabaseCredentialScanProperties;
}

export type AzureSqlUsernamePasswordScanProperties = AzureSqlUsernamePasswordScanPropertiesBase &
  AzureSqlScanProperties;

export interface AzureSqlUsernamePasswordScanPropertiesBase {
  /** */
  username?: string;
  /** */
  password?: string;
}

export type AzureSqlDatabaseConnectionStringScanProperties = AzureSqlDatabaseConnectionStringScanPropertiesBase &
  AzureSqlUsernamePasswordScanProperties;

export interface AzureSqlDatabaseConnectionStringScanPropertiesBase {}

export type AzureSqlDatabaseConnectionStringScan = AzureSqlDatabaseConnectionStringScanBase &
  Scan;

export interface AzureSqlDatabaseConnectionStringScanBase {
  /** */
  properties?: AzureSqlDatabaseConnectionStringScanProperties;
}

export type AzureSqlDatabaseMsiScanProperties = AzureSqlDatabaseMsiScanPropertiesBase &
  AzureSqlScanProperties;

export interface AzureSqlDatabaseMsiScanPropertiesBase {}

export type AzureSqlDatabaseMsiScan = AzureSqlDatabaseMsiScanBase & Scan;

export interface AzureSqlDatabaseMsiScanBase {
  /** */
  properties?: AzureSqlDatabaseMsiScanProperties;
}

export type AzureSqlServicePrincipalScanProperties = AzureSqlServicePrincipalScanPropertiesBase &
  AzureSqlScanProperties;

export interface AzureSqlServicePrincipalScanPropertiesBase {
  /** */
  tenantId?: string;
  /** */
  servicePrincipalId?: string;
  /** */
  servicePrincipalKey?: string;
}

export type AzureSqlDatabaseServicePrincipalScanProperties = AzureSqlDatabaseServicePrincipalScanPropertiesBase &
  AzureSqlServicePrincipalScanProperties;

export interface AzureSqlDatabaseServicePrincipalScanPropertiesBase {}

export type AzureSqlDatabaseServicePrincipalScan = AzureSqlDatabaseServicePrincipalScanBase &
  Scan;

export interface AzureSqlDatabaseServicePrincipalScanBase {
  /** */
  properties?: AzureSqlDatabaseServicePrincipalScanProperties;
}

export type AmazonPostgreSqlDatabaseCredentialScanProperties = AmazonPostgreSqlDatabaseCredentialScanPropertiesBase &
  ScanProperties;

export interface AmazonPostgreSqlDatabaseCredentialScanPropertiesBase {
  /** */
  credential?: AmazonPostgreSqlDatabaseCredentialScanPropertiesCredential;
  /** */
  serverEndpoint?: string;
  /** */
  databaseName?: string;
}

export type AmazonPostgreSqlDatabaseCredentialScanPropertiesCredential = AmazonPostgreSqlDatabaseCredentialScanPropertiesCredentialBase &
  CredentialReference;

export interface AmazonPostgreSqlDatabaseCredentialScanPropertiesCredentialBase {}

export type AmazonPostgreSqlDatabaseCredentialScan = AmazonPostgreSqlDatabaseCredentialScanBase &
  Scan;

export interface AmazonPostgreSqlDatabaseCredentialScanBase {
  /** */
  properties?: AmazonPostgreSqlDatabaseCredentialScanProperties;
}

export type SqlServerDatabaseCredentialScanProperties = SqlServerDatabaseCredentialScanPropertiesBase &
  AzureSqlCredentialScanProperties;

export interface SqlServerDatabaseCredentialScanPropertiesBase {}

export type SqlServerDatabaseCredentialScan = SqlServerDatabaseCredentialScanBase &
  Scan;

export interface SqlServerDatabaseCredentialScanBase {
  /** */
  properties?: SqlServerDatabaseCredentialScanProperties;
}

export type SqlServerDatabaseConnectionStringScanProperties = SqlServerDatabaseConnectionStringScanPropertiesBase &
  AzureSqlUsernamePasswordScanProperties;

export interface SqlServerDatabaseConnectionStringScanPropertiesBase {}

export type SqlServerDatabaseConnectionStringScan = SqlServerDatabaseConnectionStringScanBase &
  Scan;

export interface SqlServerDatabaseConnectionStringScanBase {
  /** */
  properties?: SqlServerDatabaseConnectionStringScanProperties;
}

export type AzureSqlDatabaseManagedInstanceCredentialScanProperties = AzureSqlDatabaseManagedInstanceCredentialScanPropertiesBase &
  AzureSqlCredentialScanProperties;

export interface AzureSqlDatabaseManagedInstanceCredentialScanPropertiesBase {}

export type AzureSqlDatabaseManagedInstanceCredentialScan = AzureSqlDatabaseManagedInstanceCredentialScanBase &
  Scan;

export interface AzureSqlDatabaseManagedInstanceCredentialScanBase {
  /** */
  properties?: AzureSqlDatabaseManagedInstanceCredentialScanProperties;
}

export type AzureSqlDatabaseManagedInstanceConnectionStringScanProperties = AzureSqlDatabaseManagedInstanceConnectionStringScanPropertiesBase &
  AzureSqlUsernamePasswordScanProperties;

export interface AzureSqlDatabaseManagedInstanceConnectionStringScanPropertiesBase {}

export type AzureSqlDatabaseManagedInstanceConnectionStringScan = AzureSqlDatabaseManagedInstanceConnectionStringScanBase &
  Scan;

export interface AzureSqlDatabaseManagedInstanceConnectionStringScanBase {
  /** */
  properties?: AzureSqlDatabaseManagedInstanceConnectionStringScanProperties;
}

export type AzureSqlDatabaseManagedInstanceMsiScanProperties = AzureSqlDatabaseManagedInstanceMsiScanPropertiesBase &
  AzureSqlScanProperties;

export interface AzureSqlDatabaseManagedInstanceMsiScanPropertiesBase {}

export type AzureSqlDatabaseManagedInstanceMsiScan = AzureSqlDatabaseManagedInstanceMsiScanBase &
  Scan;

export interface AzureSqlDatabaseManagedInstanceMsiScanBase {
  /** */
  properties?: AzureSqlDatabaseManagedInstanceMsiScanProperties;
}

export type AzureSqlDatabaseManagedInstanceServicePrincipalScanProperties = AzureSqlDatabaseManagedInstanceServicePrincipalScanPropertiesBase &
  AzureSqlServicePrincipalScanProperties;

export interface AzureSqlDatabaseManagedInstanceServicePrincipalScanPropertiesBase {}

export type AzureSqlDatabaseManagedInstanceServicePrincipalScan = AzureSqlDatabaseManagedInstanceServicePrincipalScanBase &
  Scan;

export interface AzureSqlDatabaseManagedInstanceServicePrincipalScanBase {
  /** */
  properties?: AzureSqlDatabaseManagedInstanceServicePrincipalScanProperties;
}

export type AzureSqlDataWarehouseCredentialScanProperties = AzureSqlDataWarehouseCredentialScanPropertiesBase &
  AzureSqlCredentialScanProperties;

export interface AzureSqlDataWarehouseCredentialScanPropertiesBase {}

export type AzureSqlDataWarehouseCredentialScan = AzureSqlDataWarehouseCredentialScanBase &
  Scan;

export interface AzureSqlDataWarehouseCredentialScanBase {
  /** */
  properties?: AzureSqlDataWarehouseCredentialScanProperties;
}

export type AzureSqlDataWarehouseConnectionStringScanProperties = AzureSqlDataWarehouseConnectionStringScanPropertiesBase &
  AzureSqlUsernamePasswordScanProperties;

export interface AzureSqlDataWarehouseConnectionStringScanPropertiesBase {}

export type AzureSqlDataWarehouseConnectionStringScan = AzureSqlDataWarehouseConnectionStringScanBase &
  Scan;

export interface AzureSqlDataWarehouseConnectionStringScanBase {
  /** */
  properties?: AzureSqlDataWarehouseConnectionStringScanProperties;
}

export type AzureSqlDataWarehouseMsiScanProperties = AzureSqlDataWarehouseMsiScanPropertiesBase &
  AzureSqlScanProperties;

export interface AzureSqlDataWarehouseMsiScanPropertiesBase {}

export type AzureSqlDataWarehouseMsiScan = AzureSqlDataWarehouseMsiScanBase &
  Scan;

export interface AzureSqlDataWarehouseMsiScanBase {
  /** */
  properties?: AzureSqlDataWarehouseMsiScanProperties;
}

export type AzureSqlDataWarehouseServicePrincipalScanProperties = AzureSqlDataWarehouseServicePrincipalScanPropertiesBase &
  AzureSqlServicePrincipalScanProperties;

export interface AzureSqlDataWarehouseServicePrincipalScanPropertiesBase {}

export type AzureSqlDataWarehouseServicePrincipalScan = AzureSqlDataWarehouseServicePrincipalScanBase &
  Scan;

export interface AzureSqlDataWarehouseServicePrincipalScanBase {
  /** */
  properties?: AzureSqlDataWarehouseServicePrincipalScanProperties;
}

export type AzureSynapseDedicatedSqlCredentialScanProperties = AzureSynapseDedicatedSqlCredentialScanPropertiesBase &
  AzureSqlCredentialScanProperties;

export interface AzureSynapseDedicatedSqlCredentialScanPropertiesBase {}

export type AzureSynapseDedicatedSqlCredentialScan = AzureSynapseDedicatedSqlCredentialScanBase &
  Scan;

export interface AzureSynapseDedicatedSqlCredentialScanBase {
  /** */
  properties?: AzureSynapseDedicatedSqlCredentialScanProperties;
}

export type AzureSynapseDedicatedSqlMsiScanProperties = AzureSynapseDedicatedSqlMsiScanPropertiesBase &
  AzureSqlScanProperties;

export interface AzureSynapseDedicatedSqlMsiScanPropertiesBase {}

export type AzureSynapseDedicatedSqlMsiScan = AzureSynapseDedicatedSqlMsiScanBase &
  Scan;

export interface AzureSynapseDedicatedSqlMsiScanBase {
  /** */
  properties?: AzureSynapseDedicatedSqlMsiScanProperties;
}

export type AzureSynapseDedicatedSqlConnectionStringScanProperties = AzureSynapseDedicatedSqlConnectionStringScanPropertiesBase &
  AzureSqlUsernamePasswordScanProperties;

export interface AzureSynapseDedicatedSqlConnectionStringScanPropertiesBase {}

export type AzureSynapseDedicatedSqlConnectionStringScan = AzureSynapseDedicatedSqlConnectionStringScanBase &
  Scan;

export interface AzureSynapseDedicatedSqlConnectionStringScanBase {
  /** */
  properties?: AzureSynapseDedicatedSqlConnectionStringScanProperties;
}

export type AzureSynapseSqlPoolCredentialScanProperties = AzureSynapseSqlPoolCredentialScanPropertiesBase &
  AzureSqlCredentialScanProperties;

export interface AzureSynapseSqlPoolCredentialScanPropertiesBase {}

export type AzureSynapseSqlPoolCredentialScan = AzureSynapseSqlPoolCredentialScanBase &
  Scan;

export interface AzureSynapseSqlPoolCredentialScanBase {
  /** */
  properties?: AzureSynapseSqlPoolCredentialScanProperties;
}

export type AzureSynapseSqlPoolMsiScanProperties = AzureSynapseSqlPoolMsiScanPropertiesBase &
  AzureSqlScanProperties;

export interface AzureSynapseSqlPoolMsiScanPropertiesBase {}

export type AzureSynapseSqlPoolMsiScan = AzureSynapseSqlPoolMsiScanBase & Scan;

export interface AzureSynapseSqlPoolMsiScanBase {
  /** */
  properties?: AzureSynapseSqlPoolMsiScanProperties;
}

export type AzureSynapseSqlPoolConnectionStringScanProperties = AzureSynapseSqlPoolConnectionStringScanPropertiesBase &
  AzureSqlUsernamePasswordScanProperties;

export interface AzureSynapseSqlPoolConnectionStringScanPropertiesBase {}

export type AzureSynapseSqlPoolConnectionStringScan = AzureSynapseSqlPoolConnectionStringScanBase &
  Scan;

export interface AzureSynapseSqlPoolConnectionStringScanBase {
  /** */
  properties?: AzureSynapseSqlPoolConnectionStringScanProperties;
}

export type AzureSynapseServerlessSqlCredentialScanProperties = AzureSynapseServerlessSqlCredentialScanPropertiesBase &
  AzureSqlCredentialScanProperties;

export interface AzureSynapseServerlessSqlCredentialScanPropertiesBase {}

export type AzureSynapseServerlessSqlCredentialScan = AzureSynapseServerlessSqlCredentialScanBase &
  Scan;

export interface AzureSynapseServerlessSqlCredentialScanBase {
  /** */
  properties?: AzureSynapseServerlessSqlCredentialScanProperties;
}

export type AzureSynapseServerlessSqlMsiScanProperties = AzureSynapseServerlessSqlMsiScanPropertiesBase &
  AzureSqlScanProperties;

export interface AzureSynapseServerlessSqlMsiScanPropertiesBase {}

export type AzureSynapseServerlessSqlMsiScan = AzureSynapseServerlessSqlMsiScanBase &
  Scan;

export interface AzureSynapseServerlessSqlMsiScanBase {
  /** */
  properties?: AzureSynapseServerlessSqlMsiScanProperties;
}

export type AzureSynapseServerlessSqlConnectionStringScanProperties = AzureSynapseServerlessSqlConnectionStringScanPropertiesBase &
  AzureSqlUsernamePasswordScanProperties;

export interface AzureSynapseServerlessSqlConnectionStringScanPropertiesBase {}

export type AzureSynapseServerlessSqlConnectionStringScan = AzureSynapseServerlessSqlConnectionStringScanBase &
  Scan;

export interface AzureSynapseServerlessSqlConnectionStringScanBase {
  /** */
  properties?: AzureSynapseServerlessSqlConnectionStringScanProperties;
}

export type AzureSynapseSqlOnDemandCredentialScanProperties = AzureSynapseSqlOnDemandCredentialScanPropertiesBase &
  AzureSqlCredentialScanProperties;

export interface AzureSynapseSqlOnDemandCredentialScanPropertiesBase {}

export type AzureSynapseSqlOnDemandCredentialScan = AzureSynapseSqlOnDemandCredentialScanBase &
  Scan;

export interface AzureSynapseSqlOnDemandCredentialScanBase {
  /** */
  properties?: AzureSynapseSqlOnDemandCredentialScanProperties;
}

export type AzureSynapseSqlOnDemandMsiScanProperties = AzureSynapseSqlOnDemandMsiScanPropertiesBase &
  AzureSqlScanProperties;

export interface AzureSynapseSqlOnDemandMsiScanPropertiesBase {}

export type AzureSynapseSqlOnDemandMsiScan = AzureSynapseSqlOnDemandMsiScanBase &
  Scan;

export interface AzureSynapseSqlOnDemandMsiScanBase {
  /** */
  properties?: AzureSynapseSqlOnDemandMsiScanProperties;
}

export type AzureSynapseSqlOnDemandConnectionStringScanProperties = AzureSynapseSqlOnDemandConnectionStringScanPropertiesBase &
  AzureSqlUsernamePasswordScanProperties;

export interface AzureSynapseSqlOnDemandConnectionStringScanPropertiesBase {}

export type AzureSynapseSqlOnDemandConnectionStringScan = AzureSynapseSqlOnDemandConnectionStringScanBase &
  Scan;

export interface AzureSynapseSqlOnDemandConnectionStringScanBase {
  /** */
  properties?: AzureSynapseSqlOnDemandConnectionStringScanProperties;
}

export type AzureStorageCredentialScanProperties = AzureStorageCredentialScanPropertiesBase &
  ScanProperties;

export interface AzureStorageCredentialScanPropertiesBase {
  /** */
  credential?: AzureStorageCredentialScanPropertiesCredential;
}

export type AzureStorageCredentialScanPropertiesCredential = AzureStorageCredentialScanPropertiesCredentialBase &
  CredentialReference;

export interface AzureStorageCredentialScanPropertiesCredentialBase {}

export type AzureStorageCredentialScan = AzureStorageCredentialScanBase & Scan;

export interface AzureStorageCredentialScanBase {
  /** */
  properties?: AzureStorageCredentialScanProperties;
}

export type AzureStorageAccessKeyScanProperties = AzureStorageAccessKeyScanPropertiesBase &
  ScanProperties;

export interface AzureStorageAccessKeyScanPropertiesBase {
  /** */
  accessKey?: string;
}

export type AzureStorageAccessKeyScan = AzureStorageAccessKeyScanBase & Scan;

export interface AzureStorageAccessKeyScanBase {
  /** */
  properties?: AzureStorageAccessKeyScanProperties;
}

export type AzureStorageMsiScanProperties = AzureStorageMsiScanPropertiesBase &
  ScanProperties;

export interface AzureStorageMsiScanPropertiesBase {}

export type AzureStorageMsiScan = AzureStorageMsiScanBase & Scan;

export interface AzureStorageMsiScanBase {
  /** */
  properties?: AzureStorageMsiScanProperties;
}

export type AzureStorageSasScanProperties = AzureStorageSasScanPropertiesBase &
  ScanProperties;

export interface AzureStorageSasScanPropertiesBase {
  /** */
  sasUri?: string;
}

export type AzureStorageSasScan = AzureStorageSasScanBase & Scan;

export interface AzureStorageSasScanBase {
  /** */
  properties?: AzureStorageSasScanProperties;
}

export type AzureStorageServicePrincipalScanProperties = AzureStorageServicePrincipalScanPropertiesBase &
  ScanProperties;

export interface AzureStorageServicePrincipalScanPropertiesBase {
  /** */
  tenantId?: string;
  /** */
  servicePrincipalId?: string;
  /** */
  servicePrincipalKey?: string;
}

export type AzureStorageServicePrincipalScan = AzureStorageServicePrincipalScanBase &
  Scan;

export interface AzureStorageServicePrincipalScanBase {
  /** */
  properties?: AzureStorageServicePrincipalScanProperties;
}

export type MitiScanProperties = MitiScanPropertiesBase & ScanProperties;

export interface MitiScanPropertiesBase {
  /** */
  maximumMemoryAllowedInGb?: string;
  /** */
  mitiCache?: string;
}

export type HiveCredentialScanProperties = HiveCredentialScanPropertiesBase &
  MitiScanProperties;

export interface HiveCredentialScanPropertiesBase {
  /** */
  credential?: HiveCredentialScanPropertiesCredential;
  /** */
  databaseName?: string;
  /** */
  driverLocation?: string;
  /** */
  driverClass?: string;
  /** */
  jdbcUrl?: string;
  /** */
  schema?: string;
}

export type HiveCredentialScanPropertiesCredential = HiveCredentialScanPropertiesCredentialBase &
  CredentialReference;

export interface HiveCredentialScanPropertiesCredentialBase {}

export type HiveCredentialScan = HiveCredentialScanBase & Scan;

export interface HiveCredentialScanBase {
  /** */
  properties?: HiveHiveCredentialScanProperties;
}

export type HiveHiveCredentialScanProperties = HiveHiveCredentialScanPropertiesBase &
  HiveCredentialScanProperties;

export interface HiveHiveCredentialScanPropertiesBase {}

export type HiveUserPassScanProperties = HiveUserPassScanPropertiesBase &
  MitiScanProperties;

export interface HiveUserPassScanPropertiesBase {
  /** */
  username?: string;
  /** */
  password?: string;
  /** */
  databaseName?: string;
  /** */
  driverLocation?: string;
  /** */
  driverClass?: string;
  /** */
  jdbcUrl?: string;
  /** */
  schema?: string;
}

export type HiveUserPassScan = HiveUserPassScanBase & Scan;

export interface HiveUserPassScanBase {
  /** */
  properties?: HiveHiveUserPassScanProperties;
}

export type HiveHiveUserPassScanProperties = HiveHiveUserPassScanPropertiesBase &
  HiveUserPassScanProperties;

export interface HiveHiveUserPassScanPropertiesBase {}

export type TeradataCredentialScanProperties = TeradataCredentialScanPropertiesBase &
  MitiScanProperties;

export interface TeradataCredentialScanPropertiesBase {
  /** */
  credential?: TeradataCredentialScanPropertiesCredential;
  /** */
  schema?: string;
  /** */
  driverLocation?: string;
}

export type TeradataCredentialScanPropertiesCredential = TeradataCredentialScanPropertiesCredentialBase &
  CredentialReference;

export interface TeradataCredentialScanPropertiesCredentialBase {}

export type TeradataCredentialScan = TeradataCredentialScanBase & Scan;

export interface TeradataCredentialScanBase {
  /** */
  properties?: TeradataTeradataCredentialScanProperties;
}

export type TeradataTeradataCredentialScanProperties = TeradataTeradataCredentialScanPropertiesBase &
  TeradataCredentialScanProperties;

export interface TeradataTeradataCredentialScanPropertiesBase {}

export type TeradataUserPassScanProperties = TeradataUserPassScanPropertiesBase &
  ScanProperties;

export interface TeradataUserPassScanPropertiesBase {
  /** */
  username?: string;
  /** */
  password?: string;
}

export type TeradataUserPassScan = TeradataUserPassScanBase & Scan;

export interface TeradataUserPassScanBase {
  /** */
  properties?: TeradataUserPassScanProperties;
}

export type TeradataTeradataUserPassScanProperties = TeradataTeradataUserPassScanPropertiesBase &
  MitiScanProperties;

export interface TeradataTeradataUserPassScanPropertiesBase {
  /** */
  username?: string;
  /** */
  password?: string;
  /** */
  schema?: string;
  /** */
  driverLocation?: string;
}

export type TeradataTeradataUserPassScan = TeradataTeradataUserPassScanBase &
  Scan;

export interface TeradataTeradataUserPassScanBase {
  /** */
  properties?: TeradataTeradataUserPassScanProperties;
}

export type OracleCredentialScanProperties = OracleCredentialScanPropertiesBase &
  MitiScanProperties;

export interface OracleCredentialScanPropertiesBase {
  /** */
  credential?: OracleCredentialScanPropertiesCredential;
  /** */
  schema?: string;
  /** */
  driverLocation?: string;
}

export type OracleCredentialScanPropertiesCredential = OracleCredentialScanPropertiesCredentialBase &
  CredentialReference;

export interface OracleCredentialScanPropertiesCredentialBase {}

export type OracleCredentialScan = OracleCredentialScanBase & Scan;

export interface OracleCredentialScanBase {
  /** */
  properties?: OracleOracleCredentialScanProperties;
}

export type OracleOracleCredentialScanProperties = OracleOracleCredentialScanPropertiesBase &
  OracleCredentialScanProperties;

export interface OracleOracleCredentialScanPropertiesBase {}

export type OracleUserPassScanProperties = OracleUserPassScanPropertiesBase &
  MitiScanProperties;

export interface OracleUserPassScanPropertiesBase {
  /** */
  username?: string;
  /** */
  password?: string;
  /** */
  schema?: string;
  /** */
  driverLocation?: string;
}

export type OracleUserPassScan = OracleUserPassScanBase & Scan;

export interface OracleUserPassScanBase {
  /** */
  properties?: OracleOracleUserPassScanProperties;
}

export type OracleOracleUserPassScanProperties = OracleOracleUserPassScanPropertiesBase &
  OracleUserPassScanProperties;

export interface OracleOracleUserPassScanPropertiesBase {}

export type SapS4HanaSapS4HanaCredentialScanProperties = SapS4HanaSapS4HanaCredentialScanPropertiesBase &
  MitiScanProperties;

export interface SapS4HanaSapS4HanaCredentialScanPropertiesBase {
  /** */
  clientId?: string;
  /** */
  credential?: SapS4HanaSapS4HanaCredentialScanPropertiesCredential;
  /** */
  jCoLibraryPath?: string;
}

export type SapS4HanaSapS4HanaCredentialScanPropertiesCredential = SapS4HanaSapS4HanaCredentialScanPropertiesCredentialBase &
  CredentialReference;

export interface SapS4HanaSapS4HanaCredentialScanPropertiesCredentialBase {}

export type SapS4HanaSapS4HanaCredentialScan = SapS4HanaSapS4HanaCredentialScanBase &
  Scan;

export interface SapS4HanaSapS4HanaCredentialScanBase {
  /** */
  properties?: SapS4HanaSapS4HanaCredentialScanProperties;
}

export type SapS4HanaSapS4HanaUserPassScanProperties = SapS4HanaSapS4HanaUserPassScanPropertiesBase &
  MitiScanProperties;

export interface SapS4HanaSapS4HanaUserPassScanPropertiesBase {
  /** */
  clientId?: string;
  /** */
  username?: string;
  /** */
  password?: string;
  /** */
  jCoLibraryPath?: string;
}

export type SapS4HanaSapS4HanaUserPassScan = SapS4HanaSapS4HanaUserPassScanBase &
  Scan;

export interface SapS4HanaSapS4HanaUserPassScanBase {
  /** */
  properties?: SapS4HanaSapS4HanaUserPassScanProperties;
}

export type SapEccCredentialScanProperties = SapEccCredentialScanPropertiesBase &
  MitiScanProperties;

export interface SapEccCredentialScanPropertiesBase {
  /** */
  clientId?: string;
  /** */
  credential?: SapEccCredentialScanPropertiesCredential;
  /** */
  jCoLibraryPath?: string;
}

export type SapEccCredentialScanPropertiesCredential = SapEccCredentialScanPropertiesCredentialBase &
  CredentialReference;

export interface SapEccCredentialScanPropertiesCredentialBase {}

export type SapEccCredentialScan = SapEccCredentialScanBase & Scan;

export interface SapEccCredentialScanBase {
  /** */
  properties?: SapEccSapEccCredentialScanProperties;
}

export type SapEccSapEccCredentialScanProperties = SapEccSapEccCredentialScanPropertiesBase &
  SapEccCredentialScanProperties;

export interface SapEccSapEccCredentialScanPropertiesBase {}

export type SapEccUserPassScanProperties = SapEccUserPassScanPropertiesBase &
  MitiScanProperties;

export interface SapEccUserPassScanPropertiesBase {
  /** */
  clientId?: string;
  /** */
  username?: string;
  /** */
  password?: string;
  /** */
  jCoLibraryPath?: string;
}

export type SapEccUserPassScan = SapEccUserPassScanBase & Scan;

export interface SapEccUserPassScanBase {
  /** */
  properties?: SapEccSapEccUserPassScanProperties;
}

export type SapEccSapEccUserPassScanProperties = SapEccSapEccUserPassScanPropertiesBase &
  SapEccUserPassScanProperties;

export interface SapEccSapEccUserPassScanPropertiesBase {}

export type PowerBIDelegatedScanProperties = PowerBIDelegatedScanPropertiesBase &
  ScanProperties;

export interface PowerBIDelegatedScanPropertiesBase {
  /** */
  tenant?: string;
  /** */
  authenticationType?: string;
  /** */
  clientId?: string;
  /** */
  userName?: string;
  /** */
  password?: string;
  /** */
  includePersonalWorkspaces?: boolean;
}

export type PowerBIDelegatedScan = PowerBIDelegatedScanBase & Scan;

export interface PowerBIDelegatedScanBase {
  /** */
  properties?: PowerBIDelegatedScanProperties;
}

export type PowerBIMsiScanProperties = PowerBIMsiScanPropertiesBase &
  ScanProperties;

export interface PowerBIMsiScanPropertiesBase {
  /** */
  includePersonalWorkspaces?: boolean;
}

export type PowerBIMsiScan = PowerBIMsiScanBase & Scan;

export interface PowerBIMsiScanBase {
  /** */
  properties?: PowerBIMsiScanProperties;
}

export type AzureSubscriptionSystemScanRuleset = AzureSubscriptionSystemScanRulesetBase &
  SystemScanRuleset;

export interface AzureSubscriptionSystemScanRulesetBase {
  /** */
  properties?: AzureSubscriptionSystemScanRulesetProperties;
}

export type AzureSubscriptionSystemScanRulesetProperties = AzureSubscriptionSystemScanRulesetPropertiesBase &
  AzureSubscriptionScanRulesetProperties;

export interface AzureSubscriptionSystemScanRulesetPropertiesBase {}

export type AzureResourceGroupSystemScanRuleset = AzureResourceGroupSystemScanRulesetBase &
  SystemScanRuleset;

export interface AzureResourceGroupSystemScanRulesetBase {
  /** */
  properties?: AzureResourceGroupSystemScanRulesetProperties;
}

export type AzureResourceGroupSystemScanRulesetProperties = AzureResourceGroupSystemScanRulesetPropertiesBase &
  AzureResourceGroupScanRulesetProperties;

export interface AzureResourceGroupSystemScanRulesetPropertiesBase {}

export type AzureSynapseWorkspaceSystemScanRuleset = AzureSynapseWorkspaceSystemScanRulesetBase &
  SystemScanRuleset;

export interface AzureSynapseWorkspaceSystemScanRulesetBase {
  /** */
  properties?: AzureSynapseWorkspaceSystemScanRulesetProperties;
}

export type AzureSynapseWorkspaceSystemScanRulesetProperties = AzureSynapseWorkspaceSystemScanRulesetPropertiesBase &
  AzureSynapseWorkspaceScanRulesetProperties;

export interface AzureSynapseWorkspaceSystemScanRulesetPropertiesBase {}

export type AzureSynapseSystemScanRuleset = AzureSynapseSystemScanRulesetBase &
  SystemScanRuleset;

export interface AzureSynapseSystemScanRulesetBase {
  /** */
  properties?: AzureSynapseSystemScanRulesetProperties;
}

export type AzureSynapseSystemScanRulesetProperties = AzureSynapseSystemScanRulesetPropertiesBase &
  AzureSynapseScanRulesetProperties;

export interface AzureSynapseSystemScanRulesetPropertiesBase {}

export type AdlsGen1SystemScanRuleset = AdlsGen1SystemScanRulesetBase &
  SystemScanRuleset;

export interface AdlsGen1SystemScanRulesetBase {
  /** */
  properties?: AdlsGen1SystemScanRulesetProperties;
}

export type AdlsGen1SystemScanRulesetProperties = AdlsGen1SystemScanRulesetPropertiesBase &
  AdlsGen1ScanRulesetProperties;

export interface AdlsGen1SystemScanRulesetPropertiesBase {}

export type AdlsGen2SystemScanRuleset = AdlsGen2SystemScanRulesetBase &
  SystemScanRuleset;

export interface AdlsGen2SystemScanRulesetBase {
  /** */
  properties?: AdlsGen2SystemScanRulesetProperties;
}

export type AdlsGen2SystemScanRulesetProperties = AdlsGen2SystemScanRulesetPropertiesBase &
  AdlsGen2ScanRulesetProperties;

export interface AdlsGen2SystemScanRulesetPropertiesBase {}

export type AmazonAccountSystemScanRuleset = AmazonAccountSystemScanRulesetBase &
  SystemScanRuleset;

export interface AmazonAccountSystemScanRulesetBase {
  /** */
  properties?: AmazonAccountSystemScanRulesetProperties;
}

export type AmazonAccountSystemScanRulesetProperties = AmazonAccountSystemScanRulesetPropertiesBase &
  AmazonAccountScanRulesetProperties;

export interface AmazonAccountSystemScanRulesetPropertiesBase {}

export type AmazonS3SystemScanRuleset = AmazonS3SystemScanRulesetBase &
  SystemScanRuleset;

export interface AmazonS3SystemScanRulesetBase {
  /** */
  properties?: AmazonS3SystemScanRulesetProperties;
}

export type AmazonS3SystemScanRulesetProperties = AmazonS3SystemScanRulesetPropertiesBase &
  AmazonS3ScanRulesetProperties;

export interface AmazonS3SystemScanRulesetPropertiesBase {}

export type AmazonSqlDatabaseSystemScanRuleset = AmazonSqlDatabaseSystemScanRulesetBase &
  SystemScanRuleset;

export interface AmazonSqlDatabaseSystemScanRulesetBase {
  /** */
  properties?: AmazonSqlDatabaseSystemScanRulesetProperties;
}

export type AmazonSqlDatabaseSystemScanRulesetProperties = AmazonSqlDatabaseSystemScanRulesetPropertiesBase &
  AmazonSqlDatabaseScanRulesetProperties;

export interface AmazonSqlDatabaseSystemScanRulesetPropertiesBase {}

export type AzureCosmosDbSystemScanRuleset = AzureCosmosDbSystemScanRulesetBase &
  SystemScanRuleset;

export interface AzureCosmosDbSystemScanRulesetBase {
  /** */
  properties?: AzureCosmosDbSystemScanRulesetProperties;
}

export type AzureCosmosDbSystemScanRulesetProperties = AzureCosmosDbSystemScanRulesetPropertiesBase &
  AzureCosmosDbScanRulesetProperties;

export interface AzureCosmosDbSystemScanRulesetPropertiesBase {}

export type AzureDataExplorerSystemScanRuleset = AzureDataExplorerSystemScanRulesetBase &
  SystemScanRuleset;

export interface AzureDataExplorerSystemScanRulesetBase {
  /** */
  properties?: AzureDataExplorerSystemScanRulesetProperties;
}

export type AzureDataExplorerSystemScanRulesetProperties = AzureDataExplorerSystemScanRulesetPropertiesBase &
  AzureDataExplorerScanRulesetProperties;

export interface AzureDataExplorerSystemScanRulesetPropertiesBase {}

export type AzureFileServiceSystemScanRuleset = AzureFileServiceSystemScanRulesetBase &
  SystemScanRuleset;

export interface AzureFileServiceSystemScanRulesetBase {
  /** */
  properties?: AzureFileServiceSystemScanRulesetProperties;
}

export type AzureFileServiceSystemScanRulesetProperties = AzureFileServiceSystemScanRulesetPropertiesBase &
  AzureFileServiceScanRulesetProperties;

export interface AzureFileServiceSystemScanRulesetPropertiesBase {}

export type AzureSearchSystemScanRuleset = AzureSearchSystemScanRulesetBase &
  SystemScanRuleset;

export interface AzureSearchSystemScanRulesetBase {
  /** */
  properties?: AzureSearchSystemScanRulesetProperties;
}

export type AzureSearchSystemScanRulesetProperties = AzureSearchSystemScanRulesetPropertiesBase &
  AzureSearchScanRulesetProperties;

export interface AzureSearchSystemScanRulesetPropertiesBase {}

export type AzureSqlDatabaseSystemScanRuleset = AzureSqlDatabaseSystemScanRulesetBase &
  SystemScanRuleset;

export interface AzureSqlDatabaseSystemScanRulesetBase {
  /** */
  properties?: AzureSqlDatabaseSystemScanRulesetProperties;
}

export type AzureSqlDatabaseSystemScanRulesetProperties = AzureSqlDatabaseSystemScanRulesetPropertiesBase &
  AzureSqlDatabaseScanRulesetProperties;

export interface AzureSqlDatabaseSystemScanRulesetPropertiesBase {}

export type AmazonPostgreSqlDatabaseSystemScanRuleset = AmazonPostgreSqlDatabaseSystemScanRulesetBase &
  SystemScanRuleset;

export interface AmazonPostgreSqlDatabaseSystemScanRulesetBase {
  /** */
  properties?: AmazonPostgreSqlDatabaseSystemScanRulesetProperties;
}

export type AmazonPostgreSqlDatabaseSystemScanRulesetProperties = AmazonPostgreSqlDatabaseSystemScanRulesetPropertiesBase &
  AmazonPostgreSqlDatabaseScanRulesetProperties;

export interface AmazonPostgreSqlDatabaseSystemScanRulesetPropertiesBase {}

export type SqlServerDatabaseSystemScanRuleset = SqlServerDatabaseSystemScanRulesetBase &
  SystemScanRuleset;

export interface SqlServerDatabaseSystemScanRulesetBase {
  /** */
  properties?: SqlServerDatabaseSystemScanRulesetProperties;
}

export type SqlServerDatabaseSystemScanRulesetProperties = SqlServerDatabaseSystemScanRulesetPropertiesBase &
  SqlServerDatabaseScanRulesetProperties;

export interface SqlServerDatabaseSystemScanRulesetPropertiesBase {}

export type AzureSqlDatabaseManagedInstanceSystemScanRuleset = AzureSqlDatabaseManagedInstanceSystemScanRulesetBase &
  SystemScanRuleset;

export interface AzureSqlDatabaseManagedInstanceSystemScanRulesetBase {
  /** */
  properties?: AzureSqlDatabaseManagedInstanceSystemScanRulesetProperties;
}

export type AzureSqlDatabaseManagedInstanceSystemScanRulesetProperties = AzureSqlDatabaseManagedInstanceSystemScanRulesetPropertiesBase &
  AzureSqlDatabaseManagedInstanceScanRulesetProperties;

export interface AzureSqlDatabaseManagedInstanceSystemScanRulesetPropertiesBase {}

export type AzureSqlDataWarehouseSystemScanRuleset = AzureSqlDataWarehouseSystemScanRulesetBase &
  SystemScanRuleset;

export interface AzureSqlDataWarehouseSystemScanRulesetBase {
  /** */
  properties?: AzureSqlDataWarehouseSystemScanRulesetProperties;
}

export type AzureSqlDataWarehouseSystemScanRulesetProperties = AzureSqlDataWarehouseSystemScanRulesetPropertiesBase &
  AzureSqlDataWarehouseScanRulesetProperties;

export interface AzureSqlDataWarehouseSystemScanRulesetPropertiesBase {}

export type AzureSynapseDedicatedSqlSystemScanRuleset = AzureSynapseDedicatedSqlSystemScanRulesetBase &
  SystemScanRuleset;

export interface AzureSynapseDedicatedSqlSystemScanRulesetBase {
  /** */
  properties?: AzureSynapseDedicatedSqlSystemScanRulesetProperties;
}

export type AzureSynapseDedicatedSqlSystemScanRulesetProperties = AzureSynapseDedicatedSqlSystemScanRulesetPropertiesBase &
  AzureSynapseDedicatedSqlScanRulesetProperties;

export interface AzureSynapseDedicatedSqlSystemScanRulesetPropertiesBase {}

export type AzureSynapseSqlPoolSystemScanRuleset = AzureSynapseSqlPoolSystemScanRulesetBase &
  SystemScanRuleset;

export interface AzureSynapseSqlPoolSystemScanRulesetBase {
  /** */
  properties?: AzureSynapseSqlPoolSystemScanRulesetProperties;
}

export type AzureSynapseSqlPoolSystemScanRulesetProperties = AzureSynapseSqlPoolSystemScanRulesetPropertiesBase &
  AzureSynapseSqlPoolScanRulesetProperties;

export interface AzureSynapseSqlPoolSystemScanRulesetPropertiesBase {}

export type AzureSynapseServerlessSqlSystemScanRuleset = AzureSynapseServerlessSqlSystemScanRulesetBase &
  SystemScanRuleset;

export interface AzureSynapseServerlessSqlSystemScanRulesetBase {
  /** */
  properties?: AzureSynapseServerlessSqlSystemScanRulesetProperties;
}

export type AzureSynapseServerlessSqlSystemScanRulesetProperties = AzureSynapseServerlessSqlSystemScanRulesetPropertiesBase &
  AzureSynapseServerlessSqlScanRulesetProperties;

export interface AzureSynapseServerlessSqlSystemScanRulesetPropertiesBase {}

export type AzureSynapseSqlOnDemandSystemScanRuleset = AzureSynapseSqlOnDemandSystemScanRulesetBase &
  SystemScanRuleset;

export interface AzureSynapseSqlOnDemandSystemScanRulesetBase {
  /** */
  properties?: AzureSynapseSqlOnDemandSystemScanRulesetProperties;
}

export type AzureSynapseSqlOnDemandSystemScanRulesetProperties = AzureSynapseSqlOnDemandSystemScanRulesetPropertiesBase &
  AzureSynapseSqlOnDemandScanRulesetProperties;

export interface AzureSynapseSqlOnDemandSystemScanRulesetPropertiesBase {}

export type AzureStorageSystemScanRuleset = AzureStorageSystemScanRulesetBase &
  SystemScanRuleset;

export interface AzureStorageSystemScanRulesetBase {
  /** */
  properties?: AzureStorageSystemScanRulesetProperties;
}

export type AzureStorageSystemScanRulesetProperties = AzureStorageSystemScanRulesetPropertiesBase &
  AzureStorageScanRulesetProperties;

export interface AzureStorageSystemScanRulesetPropertiesBase {}

export type HiveSystemScanRuleset = HiveSystemScanRulesetBase &
  SystemScanRuleset;

export interface HiveSystemScanRulesetBase {
  /** */
  properties?: HiveSystemScanRulesetProperties;
}

export type HiveSystemScanRulesetProperties = HiveSystemScanRulesetPropertiesBase &
  HiveScanRulesetProperties;

export interface HiveSystemScanRulesetPropertiesBase {}

export type TeradataSystemScanRuleset = TeradataSystemScanRulesetBase &
  SystemScanRuleset;

export interface TeradataSystemScanRulesetBase {
  /** */
  properties?: TeradataSystemScanRulesetProperties;
}

export type TeradataSystemScanRulesetProperties = TeradataSystemScanRulesetPropertiesBase &
  TeradataScanRulesetProperties;

export interface TeradataSystemScanRulesetPropertiesBase {}

export type OracleSystemScanRuleset = OracleSystemScanRulesetBase &
  SystemScanRuleset;

export interface OracleSystemScanRulesetBase {
  /** */
  properties?: OracleSystemScanRulesetProperties;
}

export type OracleSystemScanRulesetProperties = OracleSystemScanRulesetPropertiesBase &
  OracleScanRulesetProperties;

export interface OracleSystemScanRulesetPropertiesBase {}

export type SapS4HanaSystemScanRuleset = SapS4HanaSystemScanRulesetBase &
  SystemScanRuleset;

export interface SapS4HanaSystemScanRulesetBase {
  /** */
  properties?: SapS4HanaSystemScanRulesetProperties;
}

export type SapS4HanaSystemScanRulesetProperties = SapS4HanaSystemScanRulesetPropertiesBase &
  SapS4HanaScanRulesetProperties;

export interface SapS4HanaSystemScanRulesetPropertiesBase {}

export type SapEccSystemScanRuleset = SapEccSystemScanRulesetBase &
  SystemScanRuleset;

export interface SapEccSystemScanRulesetBase {
  /** */
  properties?: SapEccSystemScanRulesetProperties;
}

export type SapEccSystemScanRulesetProperties = SapEccSystemScanRulesetPropertiesBase &
  SapEccScanRulesetProperties;

export interface SapEccSystemScanRulesetPropertiesBase {}

export type PowerBISystemScanRuleset = PowerBISystemScanRulesetBase &
  SystemScanRuleset;

export interface PowerBISystemScanRulesetBase {
  /** */
  properties?: PowerBISystemScanRulesetProperties;
}

export type PowerBISystemScanRulesetProperties = PowerBISystemScanRulesetPropertiesBase &
  PowerBIScanRulesetProperties;

export interface PowerBISystemScanRulesetPropertiesBase {}

export type ClassificationRuleKind = "System" | "Custom";
export type OperationResponseStatus =
  | "Accepted"
  | "InProgress"
  | "TransientFailure"
  | "Succeeded"
  | "Failed"
  | "Canceled";
export type DataSourceKind =
  | "None"
  | "Collection"
  | "AzureSubscription"
  | "AzureResourceGroup"
  | "AzureSynapseWorkspace"
  | "AzureSynapse"
  | "AdlsGen1"
  | "AdlsGen2"
  | "AmazonAccount"
  | "AmazonS3"
  | "AmazonSqlDatabase"
  | "AzureCosmosDb"
  | "AzureDataExplorer"
  | "AzureFileService"
  | "AzureSearch"
  | "AzureSqlDatabase"
  | "AmazonPostgreSqlDatabase"
  | "SqlServerDatabase"
  | "AzureSqlDatabaseManagedInstance"
  | "AzureSqlDataWarehouse"
  | "AzureSynapseDedicatedSql"
  | "AzureSynapseSqlPool"
  | "AzureSynapseServerlessSql"
  | "AzureSynapseSqlOnDemand"
  | "AzureStorage"
  | "Hive"
  | "Teradata"
  | "Oracle"
  | "SapS4Hana"
  | "SapEcc"
  | "PowerBI";
export type ScanKind =
  | "AzureSubscriptionCredential"
  | "AzureSubscriptionMsi"
  | "AzureResourceGroupCredential"
  | "AzureResourceGroupMsi"
  | "AzureSynapseWorkspaceCredential"
  | "AzureSynapseWorkspaceMsi"
  | "AzureSynapseCredential"
  | "AzureSynapseMsi"
  | "AdlsGen1Credential"
  | "AdlsGen1Msi"
  | "AdlsGen1ServicePrincipal"
  | "AdlsGen2AccessKey"
  | "AdlsGen2Credential"
  | "AdlsGen2Msi"
  | "AdlsGen2ServicePrincipal"
  | "AmazonAccountCredential"
  | "AmazonS3Credential"
  | "AmazonS3RoleARN"
  | "AmazonSqlDatabaseCredential"
  | "AzureCosmosDbAccessKey"
  | "AzureCosmosDbCredential"
  | "AzureDataExplorerCredential"
  | "AzureDataExplorerMsi"
  | "AzureDataExplorerServicePrincipal"
  | "AzureFileServiceAccessKey"
  | "AzureFileServiceCredential"
  | "AzureSearchAdminKey"
  | "AzureSqlDatabaseConnectionString"
  | "AzureSqlDatabaseCredential"
  | "AzureSqlDatabaseMsi"
  | "AzureSqlDatabaseServicePrincipal"
  | "AmazonPostgreSqlDatabaseCredential"
  | "SqlServerDatabaseConnectionString"
  | "SqlServerDatabaseCredential"
  | "AzureSqlDatabaseManagedInstanceConnectionString"
  | "AzureSqlDatabaseManagedInstanceCredential"
  | "AzureSqlDatabaseManagedInstanceMsi"
  | "AzureSqlDatabaseManagedInstanceServicePrincipal"
  | "AzureSqlDataWarehouseConnectionString"
  | "AzureSqlDataWarehouseCredential"
  | "AzureSqlDataWarehouseMsi"
  | "AzureSqlDataWarehouseServicePrincipal"
  | "AzureSynapseDedicatedSqlConnectionString"
  | "AzureSynapseDedicatedSqlCredential"
  | "AzureSynapseDedicatedSqlMsi"
  | "AzureSynapseSqlPoolConnectionString"
  | "AzureSynapseSqlPoolCredential"
  | "AzureSynapseSqlPoolMsi"
  | "AzureSynapseServerlessSqlConnectionString"
  | "AzureSynapseServerlessSqlCredential"
  | "AzureSynapseServerlessSqlMsi"
  | "AzureSynapseSqlOnDemandConnectionString"
  | "AzureSynapseSqlOnDemandCredential"
  | "AzureSynapseSqlOnDemandMsi"
  | "AzureStorageAccessKey"
  | "AzureStorageCredential"
  | "AzureStorageMsi"
  | "AzureStorageSas"
  | "AzureStorageServicePrincipal"
  | "HiveHiveCredential"
  | "HiveHiveUserPass"
  | "TeradataTeradataCredential"
  | "TeradataTeradataUserPass"
  | "TeradataUserPass"
  | "OracleOracleCredential"
  | "OracleOracleUserPass"
  | "SapS4HanaSapS4HanaCredential"
  | "SapS4HanaSapS4HanaUserPass"
  | "SapEccSapEccCredential"
  | "SapEccSapEccUserPass"
  | "PowerBIDelegated"
  | "PowerBIMsi";
export type ScanResultScanRulesetType = "Custom" | "System";
export type ScanRunPropertiesScanLevel = "Full" | "Incremental";
export type ScanRulesetKind =
  | "None"
  | "Collection"
  | "AzureSubscription"
  | "AzureResourceGroup"
  | "AzureSynapseWorkspace"
  | "AzureSynapse"
  | "AdlsGen1"
  | "AdlsGen2"
  | "AmazonAccount"
  | "AmazonS3"
  | "AmazonSqlDatabase"
  | "AzureCosmosDb"
  | "AzureDataExplorer"
  | "AzureFileService"
  | "AzureSearch"
  | "AzureSqlDatabase"
  | "AmazonPostgreSqlDatabase"
  | "SqlServerDatabase"
  | "AzureSqlDatabaseManagedInstance"
  | "AzureSqlDataWarehouse"
  | "AzureSynapseDedicatedSql"
  | "AzureSynapseSqlPool"
  | "AzureSynapseServerlessSql"
  | "AzureSynapseSqlOnDemand"
  | "AzureStorage"
  | "Hive"
  | "Teradata"
  | "Oracle"
  | "SapS4Hana"
  | "SapEcc"
  | "PowerBI";
export type ScanRulesetType = "Custom" | "System";
export type SystemScanRulesetKind =
  | "None"
  | "Collection"
  | "AzureSubscription"
  | "AzureResourceGroup"
  | "AzureSynapseWorkspace"
  | "AzureSynapse"
  | "AdlsGen1"
  | "AdlsGen2"
  | "AmazonAccount"
  | "AmazonS3"
  | "AmazonSqlDatabase"
  | "AzureCosmosDb"
  | "AzureDataExplorer"
  | "AzureFileService"
  | "AzureSearch"
  | "AzureSqlDatabase"
  | "AmazonPostgreSqlDatabase"
  | "SqlServerDatabase"
  | "AzureSqlDatabaseManagedInstance"
  | "AzureSqlDataWarehouse"
  | "AzureSynapseDedicatedSql"
  | "AzureSynapseSqlPool"
  | "AzureSynapseServerlessSql"
  | "AzureSynapseSqlOnDemand"
  | "AzureStorage"
  | "Hive"
  | "Teradata"
  | "Oracle"
  | "SapS4Hana"
  | "SapEcc"
  | "PowerBI";
export type SystemScanRulesetType = "Custom" | "System";
export type SystemScanRulesetStatus = "Enabled" | "Disabled";
export type Enum11 =
  | "None"
  | "Collection"
  | "AzureSubscription"
  | "AzureResourceGroup"
  | "AzureSynapseWorkspace"
  | "AzureSynapse"
  | "AdlsGen1"
  | "AdlsGen2"
  | "AmazonAccount"
  | "AmazonS3"
  | "AmazonSqlDatabase"
  | "AzureCosmosDb"
  | "AzureDataExplorer"
  | "AzureFileService"
  | "AzureSearch"
  | "AzureSqlDatabase"
  | "AmazonPostgreSqlDatabase"
  | "SqlServerDatabase"
  | "AzureSqlDatabaseManagedInstance"
  | "AzureSqlDataWarehouse"
  | "AzureSynapseDedicatedSql"
  | "AzureSynapseSqlPool"
  | "AzureSynapseServerlessSql"
  | "AzureSynapseSqlOnDemand"
  | "AzureStorage"
  | "Hive"
  | "Teradata"
  | "Oracle"
  | "SapS4Hana"
  | "SapEcc"
  | "PowerBI";
export type Enum12 =
  | "None"
  | "Collection"
  | "AzureSubscription"
  | "AzureResourceGroup"
  | "AzureSynapseWorkspace"
  | "AzureSynapse"
  | "AdlsGen1"
  | "AdlsGen2"
  | "AmazonAccount"
  | "AmazonS3"
  | "AmazonSqlDatabase"
  | "AzureCosmosDb"
  | "AzureDataExplorer"
  | "AzureFileService"
  | "AzureSearch"
  | "AzureSqlDatabase"
  | "AmazonPostgreSqlDatabase"
  | "SqlServerDatabase"
  | "AzureSqlDatabaseManagedInstance"
  | "AzureSqlDataWarehouse"
  | "AzureSynapseDedicatedSql"
  | "AzureSynapseSqlPool"
  | "AzureSynapseServerlessSql"
  | "AzureSynapseSqlOnDemand"
  | "AzureStorage"
  | "Hive"
  | "Teradata"
  | "Oracle"
  | "SapS4Hana"
  | "SapEcc"
  | "PowerBI";
export type Enum13 =
  | "None"
  | "Collection"
  | "AzureSubscription"
  | "AzureResourceGroup"
  | "AzureSynapseWorkspace"
  | "AzureSynapse"
  | "AdlsGen1"
  | "AdlsGen2"
  | "AmazonAccount"
  | "AmazonS3"
  | "AmazonSqlDatabase"
  | "AzureCosmosDb"
  | "AzureDataExplorer"
  | "AzureFileService"
  | "AzureSearch"
  | "AzureSqlDatabase"
  | "AmazonPostgreSqlDatabase"
  | "SqlServerDatabase"
  | "AzureSqlDatabaseManagedInstance"
  | "AzureSqlDataWarehouse"
  | "AzureSynapseDedicatedSql"
  | "AzureSynapseSqlPool"
  | "AzureSynapseServerlessSql"
  | "AzureSynapseSqlOnDemand"
  | "AzureStorage"
  | "Hive"
  | "Teradata"
  | "Oracle"
  | "SapS4Hana"
  | "SapEcc"
  | "PowerBI";
export type Enum14 =
  | "None"
  | "Collection"
  | "AzureSubscription"
  | "AzureResourceGroup"
  | "AzureSynapseWorkspace"
  | "AzureSynapse"
  | "AdlsGen1"
  | "AdlsGen2"
  | "AmazonAccount"
  | "AmazonS3"
  | "AmazonSqlDatabase"
  | "AzureCosmosDb"
  | "AzureDataExplorer"
  | "AzureFileService"
  | "AzureSearch"
  | "AzureSqlDatabase"
  | "AmazonPostgreSqlDatabase"
  | "SqlServerDatabase"
  | "AzureSqlDatabaseManagedInstance"
  | "AzureSqlDataWarehouse"
  | "AzureSynapseDedicatedSql"
  | "AzureSynapseSqlPool"
  | "AzureSynapseServerlessSql"
  | "AzureSynapseSqlOnDemand"
  | "AzureStorage"
  | "Hive"
  | "Teradata"
  | "Oracle"
  | "SapS4Hana"
  | "SapEcc"
  | "PowerBI";
export type Enum15 =
  | "None"
  | "Collection"
  | "AzureSubscription"
  | "AzureResourceGroup"
  | "AzureSynapseWorkspace"
  | "AzureSynapse"
  | "AdlsGen1"
  | "AdlsGen2"
  | "AmazonAccount"
  | "AmazonS3"
  | "AmazonSqlDatabase"
  | "AzureCosmosDb"
  | "AzureDataExplorer"
  | "AzureFileService"
  | "AzureSearch"
  | "AzureSqlDatabase"
  | "AmazonPostgreSqlDatabase"
  | "SqlServerDatabase"
  | "AzureSqlDatabaseManagedInstance"
  | "AzureSqlDataWarehouse"
  | "AzureSynapseDedicatedSql"
  | "AzureSynapseSqlPool"
  | "AzureSynapseServerlessSql"
  | "AzureSynapseSqlOnDemand"
  | "AzureStorage"
  | "Hive"
  | "Teradata"
  | "Oracle"
  | "SapS4Hana"
  | "SapEcc"
  | "PowerBI";
export type SystemScanRulesetSettingPropertiesDataSourceType =
  | "None"
  | "Collection"
  | "AzureSubscription"
  | "AzureResourceGroup"
  | "AzureSynapseWorkspace"
  | "AzureSynapse"
  | "AdlsGen1"
  | "AdlsGen2"
  | "AmazonAccount"
  | "AmazonS3"
  | "AmazonSqlDatabase"
  | "AzureCosmosDb"
  | "AzureDataExplorer"
  | "AzureFileService"
  | "AzureSearch"
  | "AzureSqlDatabase"
  | "AmazonPostgreSqlDatabase"
  | "SqlServerDatabase"
  | "AzureSqlDatabaseManagedInstance"
  | "AzureSqlDataWarehouse"
  | "AzureSynapseDedicatedSql"
  | "AzureSynapseSqlPool"
  | "AzureSynapseServerlessSql"
  | "AzureSynapseSqlOnDemand"
  | "AzureStorage"
  | "Hive"
  | "Teradata"
  | "Oracle"
  | "SapS4Hana"
  | "SapEcc"
  | "PowerBI";
export type TriggerRecurrenceFrequency = "Week" | "Month";
export type RecurrenceScheduleWeekDaysItem =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";
export type RecurrenceScheduleOccurrenceDay =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";
export type TriggerPropertiesScanLevel = "Full" | "Incremental";
export type SystemClassificationRulePropertiesRuleStatus =
  | "Enabled"
  | "Disabled";
export type CustomClassificationRulePropertiesClassificationAction =
  | "Keep"
  | "Delete";
export type CustomClassificationRulePropertiesRuleStatus =
  | "Enabled"
  | "Disabled";
export type CustomFileTypeBuiltInType =
  | "AVRO"
  | "ORC"
  | "PARQUET"
  | "JSON"
  | "TXT"
  | "XML"
  | "Documents"
  | "CSV"
  | "PSV"
  | "SSV"
  | "TSV"
  | "GZ"
  | "DOC"
  | "DOCM"
  | "DOCX"
  | "DOT"
  | "ODP"
  | "ODS"
  | "ODT"
  | "PDF"
  | "POT"
  | "PPS"
  | "PPSX"
  | "PPT"
  | "PPTM"
  | "PPTX"
  | "XLC"
  | "XLS"
  | "XLSB"
  | "XLSM"
  | "XLSX"
  | "XLT";
export type ScanningRuleFileExtensionsItem =
  | "AVRO"
  | "ORC"
  | "PARQUET"
  | "JSON"
  | "TXT"
  | "XML"
  | "Documents"
  | "CSV"
  | "PSV"
  | "SSV"
  | "TSV"
  | "GZ"
  | "DOC"
  | "DOCM"
  | "DOCX"
  | "DOT"
  | "ODP"
  | "ODS"
  | "ODT"
  | "PDF"
  | "POT"
  | "PPS"
  | "PPSX"
  | "PPT"
  | "PPTM"
  | "PPTX"
  | "XLC"
  | "XLS"
  | "XLSB"
  | "XLSM"
  | "XLSX"
  | "XLT";
export type CredentialReferenceCredentialType =
  | "AccountKey"
  | "ServicePrincipal"
  | "BasicAuth"
  | "SqlAuth"
  | "AmazonARN";
export type ResourceTypeFilterScanRulesetType = "Custom" | "System";
export type ScanPropertiesScanRulesetType = "Custom" | "System";
export type ScanDiagnosticsExceptionCountMap = { [key: string]: number };
export type RecurrenceScheduleAdditionalProperties = { [key: string]: any };
export type RecurrenceScheduleOccurrenceAdditionalProperties = {
  [key: string]: any;
};
