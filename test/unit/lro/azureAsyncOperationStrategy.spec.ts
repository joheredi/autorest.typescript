import { assert } from "chai";
import { createAzureAsyncOperationStrategy } from "../../../src/lro/azureAsyncOperationStrategy";
import { LastOperation } from "../../../src/lro/models";
import { OperationSpec, OperationArguments } from "@azure/core-http";

describe("AzureAsyncOperationStrategy", () => {
  let mockSendOperation: any = () => Promise.resolve({});
  let originalOperation: LastOperation<any>;
  beforeEach(() => {
    originalOperation = {
      args: {},
      spec: { path: "originalPath", responses: {} } as any,
      result: { azureAsyncOperation: "someUrl" }
    };
  });

  describe("isTerminal", () => {
    it("should return false on the original response", async () => {
      originalOperation.result = { status: "Succeeded" };
      const pollingStrategy = createAzureAsyncOperationStrategy({
        lastOperation: originalOperation,
        sendOperation: mockSendOperation
      });
      assert.isFalse(pollingStrategy.isTerminal());
    });

    it("should default to Succeeded and be terminal when no status was returned", async () => {
      const pollingStrategy = createAzureAsyncOperationStrategy({
        lastOperation: originalOperation,
        sendOperation: mockSendOperation
      });

      await pollingStrategy.poll();
      assert.isTrue(pollingStrategy.isTerminal());
    });

    it("should be terminal state when status is succeeded", async () => {
      originalOperation.result = {
        azureAsyncOperation: "someUrl"
      };
      const pollingStrategy = createAzureAsyncOperationStrategy({
        lastOperation: originalOperation,
        sendOperation: () => {
          return Promise.resolve({
            status: "Succeeded"
          });
        }
      });

      await pollingStrategy.poll();
      assert.isTrue(pollingStrategy.isTerminal());
    });

    it("should be terminal state when status is Failed", async () => {
      originalOperation.result = {
        azureAsyncOperation: "someUrl"
      };
      const pollingStrategy = createAzureAsyncOperationStrategy({
        lastOperation: originalOperation,
        sendOperation: () => {
          return Promise.resolve({
            status: "Failed"
          });
        }
      });

      await pollingStrategy.poll();
      assert.isTrue(pollingStrategy.isTerminal());
    });

    it("should be terminal state when status is Canceled", async () => {
      originalOperation.result = {
        azureAsyncOperation: "someUrl"
      };
      const pollingStrategy = createAzureAsyncOperationStrategy({
        lastOperation: originalOperation,
        sendOperation: () => {
          return Promise.resolve({
            status: "Canceled"
          });
        }
      });

      await pollingStrategy.poll();
      assert.isTrue(pollingStrategy.isTerminal());
    });

    it("should be not terminal state when status is not a terminal one", async () => {
      originalOperation.result = {
        azureAsyncOperation: "someUrl"
      };
      const pollingStrategy = createAzureAsyncOperationStrategy({
        lastOperation: originalOperation,
        sendOperation: () => {
          return Promise.resolve({
            status: "InProgress"
          });
        }
      });

      await pollingStrategy.poll();
      assert.isFalse(pollingStrategy.isTerminal());
    });
  });

  describe("sendFinalRequest", () => {
    it("should return last operation when the original method is DELETE", async () => {
      originalOperation.spec = {
        ...originalOperation.spec,
        httpMethod: "DELETE"
      };

      const pollingStrategy = createAzureAsyncOperationStrategy({
        lastOperation: originalOperation,
        sendOperation: mockSendOperation
      });

      const result = await pollingStrategy.sendFinalRequest();
      assert.deepEqual(result, originalOperation);
    });

    it("should poll the originalUrl (GET) when original method is PUT", async () => {
      originalOperation.spec = {
        ...originalOperation.spec,
        httpMethod: "PUT"
      };

      let finalOperationMethod = "";
      let finalOperationUrl = "";

      mockSendOperation = (_args: OperationArguments, spec: OperationSpec) => {
        finalOperationMethod = spec.httpMethod;
        finalOperationUrl = spec.path || "";
        return Promise.resolve({});
      };

      const pollingStrategy = createAzureAsyncOperationStrategy({
        lastOperation: originalOperation,
        sendOperation: mockSendOperation
      });

      await pollingStrategy.sendFinalRequest();
      assert.equal(finalOperationMethod, "GET");
      assert.equal(finalOperationUrl, "originalPath");
    });

    it("should not do final GET when status is not success", async () => {
      originalOperation.spec = {
        ...originalOperation.spec,
        httpMethod: "PUT"
      };

      originalOperation.result.status = "failed";

      let wasFinalGetCalled = false;

      mockSendOperation = (_args: OperationArguments, _spec: OperationSpec) => {
        wasFinalGetCalled = true;
        return Promise.resolve({});
      };

      const pollingStrategy = createAzureAsyncOperationStrategy({
        lastOperation: originalOperation,
        sendOperation: mockSendOperation
      });

      await pollingStrategy.sendFinalRequest();
      assert.isFalse(wasFinalGetCalled);
    });

    it("should poll the originalUrl (GET) when location header is in result and finalStateVia is originalUrl", async () => {
      originalOperation.spec = {
        ...originalOperation.spec,
        httpMethod: "PUT"
      };

      originalOperation.result.location = "someLocation";

      let finalOperationMethod = "";
      let finalOperationUrl = "";

      mockSendOperation = (_args: OperationArguments, spec: OperationSpec) => {
        finalOperationMethod = spec.httpMethod;
        finalOperationUrl = spec.path || "";
        return Promise.resolve({});
      };

      const pollingStrategy = createAzureAsyncOperationStrategy({
        lastOperation: originalOperation,
        sendOperation: mockSendOperation,
        finalStateVia: "original-uri"
      });

      await pollingStrategy.sendFinalRequest();
      assert.equal(finalOperationMethod, "GET");
      assert.equal(finalOperationUrl, "originalPath");
    });

    it("should poll the url sent in location header when location header is in result and finalStateVia is location", async () => {
      originalOperation.spec = {
        ...originalOperation.spec
      };

      originalOperation.result.location = "someLocation";

      let finalOperationMethod = "";
      let finalOperationUrl = "";

      const sendOperation = (
        _args: OperationArguments,
        spec: OperationSpec
      ) => {
        finalOperationMethod = spec.httpMethod;
        finalOperationUrl = spec.path || "";
        return Promise.resolve({});
      };

      const pollingStrategy = createAzureAsyncOperationStrategy({
        lastOperation: originalOperation,
        sendOperation,
        finalStateVia: "location"
      });

      await pollingStrategy.sendFinalRequest();
      assert.equal(finalOperationMethod, "GET");
      assert.equal(finalOperationUrl, "someLocation");
    });

    it("should not do a final GET when final-state-via is Azure-AsyncOperation", async () => {
      originalOperation.spec = {
        ...originalOperation.spec
      };
      let wasLastGetCalled = false;

      const sendOperation = () => {
        wasLastGetCalled = true;
        return Promise.resolve({});
      };

      const pollingStrategy = createAzureAsyncOperationStrategy({
        lastOperation: originalOperation,
        sendOperation,
        finalStateVia: "azure-async-operation"
      });

      await pollingStrategy.sendFinalRequest();
      assert.isFalse(wasLastGetCalled);
    });

    it("should not do final GET in the default case", async () => {
      originalOperation.spec = {
        ...originalOperation.spec,
        httpMethod: "POST"
      };

      let wasLastGetCalled = false;

      const sendOperation = () => {
        wasLastGetCalled = true;
        return Promise.resolve({});
      };

      const pollingStrategy = createAzureAsyncOperationStrategy({
        lastOperation: originalOperation,
        sendOperation
      });

      await pollingStrategy.sendFinalRequest();
      assert.isFalse(wasLastGetCalled);
    });
  });

  describe("poll", () => {
    it("should poll to the url specified in azureAsyncOperation", async () => {
      const expectedUrl = "pollingURL";
      let pollingMethod = "";
      let pollingUrl = "";
      const lastOperation = { ...originalOperation };
      lastOperation.result = { azureAsyncOperation: expectedUrl };

      const pollingStrategy = createAzureAsyncOperationStrategy({
        lastOperation,
        sendOperation: (_args: OperationArguments, spec: OperationSpec) => {
          pollingMethod = spec.httpMethod;
          pollingUrl = spec.path || "";
          return Promise.resolve({});
        }
      });

      await pollingStrategy.poll();
      assert.equal(pollingMethod, "GET");
      assert.equal(pollingUrl, expectedUrl);
    });

    it("should poll to the url specified in operationLocation", async () => {
      const expectedUrl = "operationLocationUrl";
      let pollingMethod = "";
      let pollingUrl = "";
      const lastOperation = { ...originalOperation };
      lastOperation.result = { operationLocation: expectedUrl };

      const pollingStrategy = createAzureAsyncOperationStrategy({
        lastOperation,
        sendOperation: (_args: OperationArguments, spec: OperationSpec) => {
          pollingMethod = spec.httpMethod;
          pollingUrl = spec.path || "";
          return Promise.resolve({});
        }
      });

      await pollingStrategy.poll();
      assert.equal(pollingMethod, "GET");
      assert.equal(pollingUrl, expectedUrl);
    });
  });
});
