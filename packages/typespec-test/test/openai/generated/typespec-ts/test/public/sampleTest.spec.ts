// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert, describe, it, beforeEach, TaskContext } from "vitest";
import { createRecorder } from "./utils/recordedClient.js";

describe("My test", () => {
  let recorder: Recorder;

  beforeEach(async function (this: TaskContext) {
    recorder = await createRecorder(this);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("sample test", async function () {
    assert.equal(1, 1);
  });
});
