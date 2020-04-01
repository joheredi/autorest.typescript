import { assert } from "chai";
import { createBodyPollingStrategy } from "../../../src/lro/bodyPollingStrategy";
import { LastOperation } from "../../../src/lro/models";
describe("BodyPollingStrategy", () => {
  const mockSendOperation: any = () => Promise.resolve({});
  let lastOperation: LastOperation<{}>;
  beforeEach(() => {
    lastOperation = {
      args: {},
      spec: { httpMethod: "PUT" } as any,
      result: {}
    };
  });

  describe("isTerminal", () => {
    it("should default to Succeeded and be terminal when no provisioning state was returned", () => {
      const pollingStrategy = createBodyPollingStrategy({
        lastOperation,
        sendOperation: mockSendOperation
      });

      assert.isTrue(pollingStrategy.isTerminal());
    });

    it("should be terminal state when provisioningState is succeeded", () => {
      lastOperation.result = { provisioningState: "Succeeded" };
      const pollingStrategy = createBodyPollingStrategy({
        lastOperation,
        sendOperation: mockSendOperation
      });

      assert.isTrue(pollingStrategy.isTerminal());
    });

    it("should be terminal state when properties.provisioningState is succeeded", () => {
      lastOperation.result = { properties: { provisioningState: "Succeeded" } };
      const pollingStrategy = createBodyPollingStrategy({
        lastOperation,
        sendOperation: mockSendOperation
      });

      assert.isTrue(pollingStrategy.isTerminal());
    });

    it("should be terminal state when provisioningState is Failed", () => {
      lastOperation.result = { provisioningState: "Failed" };
      const pollingStrategy = createBodyPollingStrategy({
        lastOperation,
        sendOperation: mockSendOperation
      });

      assert.isTrue(pollingStrategy.isTerminal());
    });

    it("should be terminal state when provisioningState is Canceled", () => {
      lastOperation.result = { provisioningState: "Canceled" };
      const pollingStrategy = createBodyPollingStrategy({
        lastOperation,
        sendOperation: mockSendOperation
      });

      assert.isTrue(pollingStrategy.isTerminal());
    });

    it("should be not terminal state when provisioningState is not a terminal one", () => {
      lastOperation.result = { provisioningState: "InProgress" };
      const pollingStrategy = createBodyPollingStrategy({
        lastOperation,
        sendOperation: mockSendOperation
      });

      assert.isFalse(pollingStrategy.isTerminal());
    });
  });

  describe("sendFinalRequest", () => {
    it("should return last operation", async () => {
      const pollingStrategy = createBodyPollingStrategy({
        lastOperation,
        sendOperation: mockSendOperation
      });

      const result = await pollingStrategy.sendFinalRequest();
      assert.deepEqual(result, lastOperation);
    });
  });

  describe("poll", () => {
    it("should return polling operation with GET http method", async () => {
      const pollingStrategy = createBodyPollingStrategy({
        lastOperation,
        sendOperation: mockSendOperation
      });

      const result = await pollingStrategy.poll();
      assert.deepEqual(result.spec, {
        ...lastOperation.spec,
        httpMethod: "GET"
      });
    });
  });
});
