import type { YDataSourcePropertiesUnion } from "./src/models/y/models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types *//**
 * model interface YDataverseDataverseSourceConnectorProperties
 */
export interface YDataverseDataverseSourceConnectorProperties extends YDataSourcePropertiesUnion {
  connectorType: "EventHubSource";
  startEventPosition: YDataverseDataverseEventPosition;
}
/**
 * Type of YDataverseDataverseEventPosition
 */
export type YDataverseDataverseEventPosition = "Earliest" | "Latest";/**
 * Known values of {@link DataverseEventPosition} that the service accepts.
 */
export enum KnownYDataverseDataverseEventPosition {
  /**
   * Earliest
   */
  Earliest = "Earliest",
  /**
   * Latest
   */
  Latest = "Latest",
}
