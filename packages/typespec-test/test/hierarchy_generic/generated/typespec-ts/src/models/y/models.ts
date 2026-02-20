import type { YDataverseDataverseSourceConnectorProperties } from "./src/models/y/dataverse/models.js";
import type { YDataverseV2DataverseSourceConnectorV2Properties } from "./src/models/y/dataverseV2/models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types *//**
 * model interface YDataSourceProperties
 */
export interface YDataSourceProperties {
  connectorType: YConnectorType;
}/**
 * Alias for YDataSourcePropertiesUnion
 */
export type YDataSourcePropertiesUnion = YDataverseDataverseSourceConnectorProperties | YDataverseV2DataverseSourceConnectorV2Properties | YDataSourcePropertiesUnion;
/**
 * Type of YConnectorType
 */
export type YConnectorType = "EventHubSource" | "IoTHubSource";/**
 * Known values of {@link ConnectorType} that the service accepts.
 */
export enum KnownYConnectorType {
  /**
   * EventHubSource
   */
  EventHubSource = "EventHubSource",
  /**
   * IoTHubSource
   */
  IoTHubSource = "IoTHubSource",
}
