// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Program } from "@cadl-lang/compiler";
import { RLCOptions } from "@azure-tools/rlc-common";
import { emitRlc } from "./emitRlc.js";
import { emitHrlc } from "./emitHrlc.js";

export async function $onEmit(program: Program, options: RLCOptions) {
  await emitRlc(program, options);
  await emitHrlc(program, options);
}
