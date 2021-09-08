/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreAuth from "@azure/core-auth";
import {
  RecoverableDatabasesImpl,
  RestorableDroppedDatabasesImpl,
  ServerConnectionPoliciesImpl,
  DatabaseThreatDetectionPoliciesImpl,
  DataMaskingPoliciesImpl,
  DataMaskingRulesImpl,
  FirewallRulesImpl,
  GeoBackupPoliciesImpl,
  DatabasesImpl,
  ElasticPoolsImpl,
  RecommendedElasticPoolsImpl,
  ReplicationLinksImpl,
  ServerCommunicationLinksImpl,
  ServiceObjectivesImpl,
  ElasticPoolActivitiesImpl,
  ElasticPoolDatabaseActivitiesImpl,
  ServiceTierAdvisorsImpl,
  TransparentDataEncryptionsImpl,
  TransparentDataEncryptionActivitiesImpl,
  ServerUsagesImpl,
  DatabaseUsagesImpl,
  DatabaseAutomaticTuningOperationsImpl,
  EncryptionProtectorsImpl,
  FailoverGroupsImpl,
  OperationsImpl,
  ServerKeysImpl,
  SyncAgentsImpl,
  SyncGroupsImpl,
  SyncMembersImpl,
  SubscriptionUsagesImpl,
  VirtualClustersImpl,
  VirtualNetworkRulesImpl,
  ExtendedDatabaseBlobAuditingPoliciesImpl,
  ExtendedServerBlobAuditingPoliciesImpl,
  ServerBlobAuditingPoliciesImpl,
  DatabaseBlobAuditingPoliciesImpl,
  DatabaseVulnerabilityAssessmentRuleBaselinesImpl,
  DatabaseVulnerabilityAssessmentsImpl,
  JobAgentsImpl,
  JobCredentialsImpl,
  JobExecutionsImpl,
  JobsImpl,
  JobStepExecutionsImpl,
  JobStepsImpl,
  JobTargetExecutionsImpl,
  JobTargetGroupsImpl,
  JobVersionsImpl,
  LongTermRetentionBackupsImpl,
  BackupLongTermRetentionPoliciesImpl,
  ManagedBackupShortTermRetentionPoliciesImpl,
  ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesImpl,
  ServerAutomaticTuningOperationsImpl,
  ServerDnsAliasesImpl,
  ServerSecurityAlertPoliciesImpl,
  RestorableDroppedManagedDatabasesImpl,
  RestorePointsImpl,
  ManagedDatabaseSecurityAlertPoliciesImpl,
  ManagedServerSecurityAlertPoliciesImpl,
  SensitivityLabelsImpl,
  ManagedInstanceAdministratorsImpl,
  DatabaseOperationsImpl,
  ElasticPoolOperationsImpl,
  DatabaseVulnerabilityAssessmentScansImpl,
  ManagedDatabaseVulnerabilityAssessmentRuleBaselinesImpl,
  ManagedDatabaseVulnerabilityAssessmentScansImpl,
  ManagedDatabaseVulnerabilityAssessmentsImpl,
  InstanceFailoverGroupsImpl,
  BackupShortTermRetentionPoliciesImpl,
  TdeCertificatesImpl,
  ManagedInstanceTdeCertificatesImpl,
  ManagedInstanceKeysImpl,
  ManagedInstanceEncryptionProtectorsImpl,
  RecoverableManagedDatabasesImpl,
  ManagedInstanceVulnerabilityAssessmentsImpl,
  ServerVulnerabilityAssessmentsImpl,
  ManagedDatabaseSensitivityLabelsImpl,
  InstancePoolsImpl,
  UsagesImpl,
  ManagedInstancesImpl,
  PrivateEndpointConnectionsImpl,
  PrivateLinkResourcesImpl,
  ServersImpl,
  CapabilitiesImpl,
  LongTermRetentionManagedInstanceBackupsImpl,
  ManagedInstanceLongTermRetentionPoliciesImpl,
  WorkloadGroupsImpl,
  WorkloadClassifiersImpl,
  ManagedDatabaseRestoreDetailsImpl,
  ManagedDatabasesImpl,
  ServerAzureADAdministratorsImpl,
  ManagedInstanceOperationsImpl
} from "./operations";
import {
  RecoverableDatabases,
  RestorableDroppedDatabases,
  ServerConnectionPolicies,
  DatabaseThreatDetectionPolicies,
  DataMaskingPolicies,
  DataMaskingRules,
  FirewallRules,
  GeoBackupPolicies,
  Databases,
  ElasticPools,
  RecommendedElasticPools,
  ReplicationLinks,
  ServerCommunicationLinks,
  ServiceObjectives,
  ElasticPoolActivities,
  ElasticPoolDatabaseActivities,
  ServiceTierAdvisors,
  TransparentDataEncryptions,
  TransparentDataEncryptionActivities,
  ServerUsages,
  DatabaseUsages,
  DatabaseAutomaticTuningOperations,
  EncryptionProtectors,
  FailoverGroups,
  Operations,
  ServerKeys,
  SyncAgents,
  SyncGroups,
  SyncMembers,
  SubscriptionUsages,
  VirtualClusters,
  VirtualNetworkRules,
  ExtendedDatabaseBlobAuditingPolicies,
  ExtendedServerBlobAuditingPolicies,
  ServerBlobAuditingPolicies,
  DatabaseBlobAuditingPolicies,
  DatabaseVulnerabilityAssessmentRuleBaselines,
  DatabaseVulnerabilityAssessments,
  JobAgents,
  JobCredentials,
  JobExecutions,
  Jobs,
  JobStepExecutions,
  JobSteps,
  JobTargetExecutions,
  JobTargetGroups,
  JobVersions,
  LongTermRetentionBackups,
  BackupLongTermRetentionPolicies,
  ManagedBackupShortTermRetentionPolicies,
  ManagedRestorableDroppedDatabaseBackupShortTermRetentionPolicies,
  ServerAutomaticTuningOperations,
  ServerDnsAliases,
  ServerSecurityAlertPolicies,
  RestorableDroppedManagedDatabases,
  RestorePoints,
  ManagedDatabaseSecurityAlertPolicies,
  ManagedServerSecurityAlertPolicies,
  SensitivityLabels,
  ManagedInstanceAdministrators,
  DatabaseOperations,
  ElasticPoolOperations,
  DatabaseVulnerabilityAssessmentScans,
  ManagedDatabaseVulnerabilityAssessmentRuleBaselines,
  ManagedDatabaseVulnerabilityAssessmentScans,
  ManagedDatabaseVulnerabilityAssessments,
  InstanceFailoverGroups,
  BackupShortTermRetentionPolicies,
  TdeCertificates,
  ManagedInstanceTdeCertificates,
  ManagedInstanceKeys,
  ManagedInstanceEncryptionProtectors,
  RecoverableManagedDatabases,
  ManagedInstanceVulnerabilityAssessments,
  ServerVulnerabilityAssessments,
  ManagedDatabaseSensitivityLabels,
  InstancePools,
  Usages,
  ManagedInstances,
  PrivateEndpointConnections,
  PrivateLinkResources,
  Servers,
  Capabilities,
  LongTermRetentionManagedInstanceBackups,
  ManagedInstanceLongTermRetentionPolicies,
  WorkloadGroups,
  WorkloadClassifiers,
  ManagedDatabaseRestoreDetails,
  ManagedDatabases,
  ServerAzureADAdministrators,
  ManagedInstanceOperations
} from "./operationsInterfaces";
import { SqlManagementClientContext } from "./sqlManagementClientContext";
import { SqlManagementClientOptionalParams } from "./models";

export class SqlManagementClient extends SqlManagementClientContext {
  /**
   * Initializes a new instance of the SqlManagementClient class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param subscriptionId The subscription ID that identifies an Azure subscription.
   * @param options The parameter options
   */
  constructor(
    credentials: coreAuth.TokenCredential,
    subscriptionId: string,
    options?: SqlManagementClientOptionalParams
  ) {
    super(credentials, subscriptionId, options);
    this.recoverableDatabases = new RecoverableDatabasesImpl(this);
    this.restorableDroppedDatabases = new RestorableDroppedDatabasesImpl(this);
    this.serverConnectionPolicies = new ServerConnectionPoliciesImpl(this);
    this.databaseThreatDetectionPolicies = new DatabaseThreatDetectionPoliciesImpl(
      this
    );
    this.dataMaskingPolicies = new DataMaskingPoliciesImpl(this);
    this.dataMaskingRules = new DataMaskingRulesImpl(this);
    this.firewallRules = new FirewallRulesImpl(this);
    this.geoBackupPolicies = new GeoBackupPoliciesImpl(this);
    this.databases = new DatabasesImpl(this);
    this.elasticPools = new ElasticPoolsImpl(this);
    this.recommendedElasticPools = new RecommendedElasticPoolsImpl(this);
    this.replicationLinks = new ReplicationLinksImpl(this);
    this.serverCommunicationLinks = new ServerCommunicationLinksImpl(this);
    this.serviceObjectives = new ServiceObjectivesImpl(this);
    this.elasticPoolActivities = new ElasticPoolActivitiesImpl(this);
    this.elasticPoolDatabaseActivities = new ElasticPoolDatabaseActivitiesImpl(
      this
    );
    this.serviceTierAdvisors = new ServiceTierAdvisorsImpl(this);
    this.transparentDataEncryptions = new TransparentDataEncryptionsImpl(this);
    this.transparentDataEncryptionActivities = new TransparentDataEncryptionActivitiesImpl(
      this
    );
    this.serverUsages = new ServerUsagesImpl(this);
    this.databaseUsages = new DatabaseUsagesImpl(this);
    this.databaseAutomaticTuningOperations = new DatabaseAutomaticTuningOperationsImpl(
      this
    );
    this.encryptionProtectors = new EncryptionProtectorsImpl(this);
    this.failoverGroups = new FailoverGroupsImpl(this);
    this.operations = new OperationsImpl(this);
    this.serverKeys = new ServerKeysImpl(this);
    this.syncAgents = new SyncAgentsImpl(this);
    this.syncGroups = new SyncGroupsImpl(this);
    this.syncMembers = new SyncMembersImpl(this);
    this.subscriptionUsages = new SubscriptionUsagesImpl(this);
    this.virtualClusters = new VirtualClustersImpl(this);
    this.virtualNetworkRules = new VirtualNetworkRulesImpl(this);
    this.extendedDatabaseBlobAuditingPolicies = new ExtendedDatabaseBlobAuditingPoliciesImpl(
      this
    );
    this.extendedServerBlobAuditingPolicies = new ExtendedServerBlobAuditingPoliciesImpl(
      this
    );
    this.serverBlobAuditingPolicies = new ServerBlobAuditingPoliciesImpl(this);
    this.databaseBlobAuditingPolicies = new DatabaseBlobAuditingPoliciesImpl(
      this
    );
    this.databaseVulnerabilityAssessmentRuleBaselines = new DatabaseVulnerabilityAssessmentRuleBaselinesImpl(
      this
    );
    this.databaseVulnerabilityAssessments = new DatabaseVulnerabilityAssessmentsImpl(
      this
    );
    this.jobAgents = new JobAgentsImpl(this);
    this.jobCredentials = new JobCredentialsImpl(this);
    this.jobExecutions = new JobExecutionsImpl(this);
    this.jobs = new JobsImpl(this);
    this.jobStepExecutions = new JobStepExecutionsImpl(this);
    this.jobSteps = new JobStepsImpl(this);
    this.jobTargetExecutions = new JobTargetExecutionsImpl(this);
    this.jobTargetGroups = new JobTargetGroupsImpl(this);
    this.jobVersions = new JobVersionsImpl(this);
    this.longTermRetentionBackups = new LongTermRetentionBackupsImpl(this);
    this.backupLongTermRetentionPolicies = new BackupLongTermRetentionPoliciesImpl(
      this
    );
    this.managedBackupShortTermRetentionPolicies = new ManagedBackupShortTermRetentionPoliciesImpl(
      this
    );
    this.managedRestorableDroppedDatabaseBackupShortTermRetentionPolicies = new ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesImpl(
      this
    );
    this.serverAutomaticTuningOperations = new ServerAutomaticTuningOperationsImpl(
      this
    );
    this.serverDnsAliases = new ServerDnsAliasesImpl(this);
    this.serverSecurityAlertPolicies = new ServerSecurityAlertPoliciesImpl(
      this
    );
    this.restorableDroppedManagedDatabases = new RestorableDroppedManagedDatabasesImpl(
      this
    );
    this.restorePoints = new RestorePointsImpl(this);
    this.managedDatabaseSecurityAlertPolicies = new ManagedDatabaseSecurityAlertPoliciesImpl(
      this
    );
    this.managedServerSecurityAlertPolicies = new ManagedServerSecurityAlertPoliciesImpl(
      this
    );
    this.sensitivityLabels = new SensitivityLabelsImpl(this);
    this.managedInstanceAdministrators = new ManagedInstanceAdministratorsImpl(
      this
    );
    this.databaseOperations = new DatabaseOperationsImpl(this);
    this.elasticPoolOperations = new ElasticPoolOperationsImpl(this);
    this.databaseVulnerabilityAssessmentScans = new DatabaseVulnerabilityAssessmentScansImpl(
      this
    );
    this.managedDatabaseVulnerabilityAssessmentRuleBaselines = new ManagedDatabaseVulnerabilityAssessmentRuleBaselinesImpl(
      this
    );
    this.managedDatabaseVulnerabilityAssessmentScans = new ManagedDatabaseVulnerabilityAssessmentScansImpl(
      this
    );
    this.managedDatabaseVulnerabilityAssessments = new ManagedDatabaseVulnerabilityAssessmentsImpl(
      this
    );
    this.instanceFailoverGroups = new InstanceFailoverGroupsImpl(this);
    this.backupShortTermRetentionPolicies = new BackupShortTermRetentionPoliciesImpl(
      this
    );
    this.tdeCertificates = new TdeCertificatesImpl(this);
    this.managedInstanceTdeCertificates = new ManagedInstanceTdeCertificatesImpl(
      this
    );
    this.managedInstanceKeys = new ManagedInstanceKeysImpl(this);
    this.managedInstanceEncryptionProtectors = new ManagedInstanceEncryptionProtectorsImpl(
      this
    );
    this.recoverableManagedDatabases = new RecoverableManagedDatabasesImpl(
      this
    );
    this.managedInstanceVulnerabilityAssessments = new ManagedInstanceVulnerabilityAssessmentsImpl(
      this
    );
    this.serverVulnerabilityAssessments = new ServerVulnerabilityAssessmentsImpl(
      this
    );
    this.managedDatabaseSensitivityLabels = new ManagedDatabaseSensitivityLabelsImpl(
      this
    );
    this.instancePools = new InstancePoolsImpl(this);
    this.usages = new UsagesImpl(this);
    this.managedInstances = new ManagedInstancesImpl(this);
    this.privateEndpointConnections = new PrivateEndpointConnectionsImpl(this);
    this.privateLinkResources = new PrivateLinkResourcesImpl(this);
    this.servers = new ServersImpl(this);
    this.capabilities = new CapabilitiesImpl(this);
    this.longTermRetentionManagedInstanceBackups = new LongTermRetentionManagedInstanceBackupsImpl(
      this
    );
    this.managedInstanceLongTermRetentionPolicies = new ManagedInstanceLongTermRetentionPoliciesImpl(
      this
    );
    this.workloadGroups = new WorkloadGroupsImpl(this);
    this.workloadClassifiers = new WorkloadClassifiersImpl(this);
    this.managedDatabaseRestoreDetails = new ManagedDatabaseRestoreDetailsImpl(
      this
    );
    this.managedDatabases = new ManagedDatabasesImpl(this);
    this.serverAzureADAdministrators = new ServerAzureADAdministratorsImpl(
      this
    );
    this.managedInstanceOperations = new ManagedInstanceOperationsImpl(this);
  }

  recoverableDatabases: RecoverableDatabases;
  restorableDroppedDatabases: RestorableDroppedDatabases;
  serverConnectionPolicies: ServerConnectionPolicies;
  databaseThreatDetectionPolicies: DatabaseThreatDetectionPolicies;
  dataMaskingPolicies: DataMaskingPolicies;
  dataMaskingRules: DataMaskingRules;
  firewallRules: FirewallRules;
  geoBackupPolicies: GeoBackupPolicies;
  databases: Databases;
  elasticPools: ElasticPools;
  recommendedElasticPools: RecommendedElasticPools;
  replicationLinks: ReplicationLinks;
  serverCommunicationLinks: ServerCommunicationLinks;
  serviceObjectives: ServiceObjectives;
  elasticPoolActivities: ElasticPoolActivities;
  elasticPoolDatabaseActivities: ElasticPoolDatabaseActivities;
  serviceTierAdvisors: ServiceTierAdvisors;
  transparentDataEncryptions: TransparentDataEncryptions;
  transparentDataEncryptionActivities: TransparentDataEncryptionActivities;
  serverUsages: ServerUsages;
  databaseUsages: DatabaseUsages;
  databaseAutomaticTuningOperations: DatabaseAutomaticTuningOperations;
  encryptionProtectors: EncryptionProtectors;
  failoverGroups: FailoverGroups;
  operations: Operations;
  serverKeys: ServerKeys;
  syncAgents: SyncAgents;
  syncGroups: SyncGroups;
  syncMembers: SyncMembers;
  subscriptionUsages: SubscriptionUsages;
  virtualClusters: VirtualClusters;
  virtualNetworkRules: VirtualNetworkRules;
  extendedDatabaseBlobAuditingPolicies: ExtendedDatabaseBlobAuditingPolicies;
  extendedServerBlobAuditingPolicies: ExtendedServerBlobAuditingPolicies;
  serverBlobAuditingPolicies: ServerBlobAuditingPolicies;
  databaseBlobAuditingPolicies: DatabaseBlobAuditingPolicies;
  databaseVulnerabilityAssessmentRuleBaselines: DatabaseVulnerabilityAssessmentRuleBaselines;
  databaseVulnerabilityAssessments: DatabaseVulnerabilityAssessments;
  jobAgents: JobAgents;
  jobCredentials: JobCredentials;
  jobExecutions: JobExecutions;
  jobs: Jobs;
  jobStepExecutions: JobStepExecutions;
  jobSteps: JobSteps;
  jobTargetExecutions: JobTargetExecutions;
  jobTargetGroups: JobTargetGroups;
  jobVersions: JobVersions;
  longTermRetentionBackups: LongTermRetentionBackups;
  backupLongTermRetentionPolicies: BackupLongTermRetentionPolicies;
  managedBackupShortTermRetentionPolicies: ManagedBackupShortTermRetentionPolicies;
  managedRestorableDroppedDatabaseBackupShortTermRetentionPolicies: ManagedRestorableDroppedDatabaseBackupShortTermRetentionPolicies;
  serverAutomaticTuningOperations: ServerAutomaticTuningOperations;
  serverDnsAliases: ServerDnsAliases;
  serverSecurityAlertPolicies: ServerSecurityAlertPolicies;
  restorableDroppedManagedDatabases: RestorableDroppedManagedDatabases;
  restorePoints: RestorePoints;
  managedDatabaseSecurityAlertPolicies: ManagedDatabaseSecurityAlertPolicies;
  managedServerSecurityAlertPolicies: ManagedServerSecurityAlertPolicies;
  sensitivityLabels: SensitivityLabels;
  managedInstanceAdministrators: ManagedInstanceAdministrators;
  databaseOperations: DatabaseOperations;
  elasticPoolOperations: ElasticPoolOperations;
  databaseVulnerabilityAssessmentScans: DatabaseVulnerabilityAssessmentScans;
  managedDatabaseVulnerabilityAssessmentRuleBaselines: ManagedDatabaseVulnerabilityAssessmentRuleBaselines;
  managedDatabaseVulnerabilityAssessmentScans: ManagedDatabaseVulnerabilityAssessmentScans;
  managedDatabaseVulnerabilityAssessments: ManagedDatabaseVulnerabilityAssessments;
  instanceFailoverGroups: InstanceFailoverGroups;
  backupShortTermRetentionPolicies: BackupShortTermRetentionPolicies;
  tdeCertificates: TdeCertificates;
  managedInstanceTdeCertificates: ManagedInstanceTdeCertificates;
  managedInstanceKeys: ManagedInstanceKeys;
  managedInstanceEncryptionProtectors: ManagedInstanceEncryptionProtectors;
  recoverableManagedDatabases: RecoverableManagedDatabases;
  managedInstanceVulnerabilityAssessments: ManagedInstanceVulnerabilityAssessments;
  serverVulnerabilityAssessments: ServerVulnerabilityAssessments;
  managedDatabaseSensitivityLabels: ManagedDatabaseSensitivityLabels;
  instancePools: InstancePools;
  usages: Usages;
  managedInstances: ManagedInstances;
  privateEndpointConnections: PrivateEndpointConnections;
  privateLinkResources: PrivateLinkResources;
  servers: Servers;
  capabilities: Capabilities;
  longTermRetentionManagedInstanceBackups: LongTermRetentionManagedInstanceBackups;
  managedInstanceLongTermRetentionPolicies: ManagedInstanceLongTermRetentionPolicies;
  workloadGroups: WorkloadGroups;
  workloadClassifiers: WorkloadClassifiers;
  managedDatabaseRestoreDetails: ManagedDatabaseRestoreDetails;
  managedDatabases: ManagedDatabases;
  serverAzureADAdministrators: ServerAzureADAdministrators;
  managedInstanceOperations: ManagedInstanceOperations;
}
