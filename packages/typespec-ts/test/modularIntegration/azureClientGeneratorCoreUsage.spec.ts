import { assert } from "chai";
import { UsageClient } from "./generated/azure/client-generator-core/usage/src/index.js";
describe("Azure ClientGeneratorCore Usage Client", () => {
  let client: UsageClient;

  beforeEach(() => {
    client = new UsageClient({
      endpoint: "http://localhost:3002",
      allowInsecureConnection: true,
      retryOptions: {
        maxRetries: 0
      }
    });
  });

  it("should post input usage model in operation", async () => {
    try {
      const result = await client.inputToInputOutput({ name: "Madge" });
      assert.isUndefined(result);
    } catch (err) {
      assert.fail(err as string);
    }
  });

  it("should get usage model in operation", async () => {
    try {
      const result = await client.outputToInputOutput();
      assert.strictEqual(result.name, "Madge");
    } catch (err) {
      assert.fail(err as string);
    }
  });
});
