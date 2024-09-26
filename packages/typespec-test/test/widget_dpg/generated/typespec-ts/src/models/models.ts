// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Details about a user. */
export interface User {
  /** The name of user. */
  readonly name: string;
  /** The role of user */
  role: string;
  /** The UUID of this widget. This is generated automatically by the service. */
  id: string;
}

export function userSerializer(item: User): any {
  return { role: item["role"], id: item["id"] };
}

export function userDeserializer(item: any): User {
  return {
    name: item["name"],
    role: item["role"],
    id: item["id"],
  };
}

/** model interface Widget */
export interface Widget {
  /** The UUID of this widget. This is generated automatically by the service. */
  id: string;
  /** The weight of the widget. This is an int32, but must be greater than zero. */
  weight: number;
  /** The color of the widget. */
  color: "red" | "blue";
}

export function widgetDeserializer(item: any): Widget {
  return {
    id: item["id"],
    weight: item["weight"],
    color: item["color"],
  };
}

/** Type of WidgetColor */
export type WidgetColor = "red" | "blue";

/** model interface WidgetError */
export interface WidgetError {
  /** The HTTP error code. */
  code: number;
  /** A human-readable message describing the error. */
  message: string;
}

export function widgetErrorDeserializer(item: any): WidgetError {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** model interface _ListWidgetsPagesResults */
export interface _ListWidgetsPagesResults {
  /** The current page of results. */
  results: Widget[];
  /** The URL to get the next set of results. */
  "odata.nextLink"?: string;
}

export function _listWidgetsPagesResultsDeserializer(
  item: any,
): _ListWidgetsPagesResults {
  return {
    results: widgetArrayDeserializer(item["results"]),
    "odata.nextLink": item["odata.nextLink"],
  };
}

export function widgetArrayDeserializer(result: Array<Widget>): any[] {
  return result.map((item) => {
    widgetDeserializer(item);
  });
}

/** Type of CreateWidgetColor */
export type CreateWidgetColor = "red" | "blue";
/** Type of UpdateWidgetRequestColor */
export type UpdateWidgetRequestColor = "red" | "blue";

/** model interface AnalyzeResult */
export interface AnalyzeResult {
  summary: string;
}

export function analyzeResultDeserializer(item: any): AnalyzeResult {
  return {
    summary: item["summary"],
  };
}

/** model interface NonReferencedModel */
export interface NonReferencedModel {
  /** The weight of the widget. This is an int32, but must be greater than zero. */
  prop1: number;
  /** The color of the widget. */
  prop2: string;
}

export function nonReferencedModelSerializer(item: NonReferencedModel): any {
  return { prop1: item["prop1"], prop2: item["prop2"] };
}

export function nonReferencedModelDeserializer(item: any): NonReferencedModel {
  return {
    prop1: item["prop1"],
    prop2: item["prop2"],
  };
}
