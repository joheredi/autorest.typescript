// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface WidgetOutput {
  weight: number;
  color: "red" | "blue";
}

export interface ErrorModelOutput {
  code: number;
  message: string;
}
