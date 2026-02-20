/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types *//**
 * Paged collection of SchemaGroup items
 */
export interface _PagedSchemaGroup {
  /**
   * The SchemaGroup items on this page
   */
  value: (SchemaGroup)[];
  /**
   * The link to the next page of items
   */
  nextLink?: string;
}
export type ArraySchemaGroup = Array<SchemaGroup>;
/**
 * Schema Group resource.
 */
export interface SchemaGroup {
  /**
   * Name of schema group.
   */
  readonly groupName: string;
}
/**
 * Paged collection of Version items
 */
export interface _PagedVersion {
  /**
   * The Version items on this page
   */
  value: (SchemaVersion)[];
  /**
   * The link to the next page of items
   */
  nextLink?: string;
}
export type ArraySchemaVersion = Array<SchemaVersion>;
/**
 * Schema versions resource.
 */
export interface SchemaVersion {
  /**
   * Version number of specific schema.
   */
  readonly schemaVersion: number;
}
/**
 * Meta properties of a schema.
 */
export interface SchemaProperties {
  /**
   * References a specific schema in the registry namespace.
   */
  id: string;
  /**
   * Format for the schema being stored.
   */
  format: SchemaFormat;
  /**
   * Schema group under which schema is stored.
   */
  groupName: string;
  /**
   * Name of schema.
   */
  name: string;
  /**
   * Version of schema.
   */
  version: number;
}
/**
 * Represents the format of the schema to be stored by the Schema Registry service.
 */
export type SchemaFormat = "Avro" | "Json" | "Custom" | "Protobuf";/**
 * Represents the format of the schema to be stored by the Schema Registry service.
 */
export enum KnownSchemaFormat {
  /**
   * Represents the Apache Avro schema format.
   */
  Avro = "Avro",
  /**
   * Represents the JSON schema format.
   */
  Json = "Json",
  /**
   * Represents a custom schema format.
   */
  Custom = "Custom",
  /**
   * Represents a protobuf schema format.
   */
  Protobuf = "Protobuf",
}
/**
 * The schema content of a schema, along with id and meta properties.
 */
export interface Schema {
  /**
   * The content of the schema.
   */
  definition: string;
  /**
   * The properties of the schema.
   */
  properties: SchemaProperties;
}
/**
 * Type of SchemaContentTypeValues
 */
export type SchemaContentTypeValues = "application/json; serialization=Avro" | "application/json; serialization=json" | "text/plain; charset=utf-8" | "text/vnd.ms.protobuf";/**
 * Known values of {@link SchemaContentTypeValues} that the service accepts.
 */
export enum KnownSchemaContentTypeValues {
  /**
   * application/json; serialization=Avro
   */
  Avro = "application/json; serialization=Avro",
  /**
   * application/json; serialization=json
   */
  Json = "application/json; serialization=json",
  /**
   * text/plain; charset=utf-8
   */
  Custom = "text/plain; charset=utf-8",
  /**
   * text/vnd.ms.protobuf
   */
  Protobuf = "text/vnd.ms.protobuf",
}
/**
 * Represents the Schema Registry API version to use for requests.
 */
export enum KnownServiceApiVersions {
  /**
   * Azure Schema Registry 2021-10 Version
   */
  V202110 = "2021-10",
  /**
   * Azure Schema Registry 2022-10 Version
   */
  V202210 = "2022-10",
  /**
   * Azure Schema Registry 2023-07-01 Version. This is the default version.
   */
  V20230701 = "2023-07-01",
}
/**
 * The content type for the schema.
 */
export type ContentTypeEnum = "application/octet-stream" | "application/json; serialization=Avro" | "application/json; serialization=json" | "text/vnd.ms.protobuf";/**
 * The content type for the schema.
 */
export enum KnownContentTypeEnum {
  /**
   * The custom schema content type.
   */
  Custom = "application/octet-stream",
  /**
   * The Avro schema content type.
   */
  Avro = "application/json; serialization=Avro",
  /**
   * The JSON schema content type.
   */
  Json = "application/json; serialization=json",
  /**
   * The protobuf schema content type.
   */
  Protobuf = "text/vnd.ms.protobuf",
}
