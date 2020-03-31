import { LroClient } from "./generated/lro/src/lroClient";
import { assert } from "chai";

describe.only("LRO", () => {
  let client: LroClient;

  beforeEach(() => {
    client = new LroClient();
  });

  it("should handle initial response with terminal state through an Azure Resource", async () => {
    const poller = await client.lROs.put200Succeeded();
    const result = await poller.pollUntilDone();
    assert.equal(result.provisioningState, "Succeeded");
  });

  it("should handle initial response with terminal state without provisioning State", async () => {
    const poller = await client.lROs.put200SucceededNoState();
    const result = await poller.pollUntilDone();
    assert.deepEqual(result.id, "100");
    assert.deepEqual(result.name, "foo");
  });

  it.only("should handle initial response creating followed by success through an Azure Resource", async () => {
    const poller = await client.lROs.put201CreatingSucceeded200();
    const result = await poller.pollUntilDone();
    assert.deepEqual(result.provisioningState, "Succeeded");
    assert.deepEqual(result.id, "100");
    assert.deepEqual(result.name, "foo");
  });
});
