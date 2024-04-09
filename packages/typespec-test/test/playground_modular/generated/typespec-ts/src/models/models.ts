// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface Widget {
  weight: number;
  color: "red" | "blue";
}

export interface Error {
  code: number;
  message: string;
}
