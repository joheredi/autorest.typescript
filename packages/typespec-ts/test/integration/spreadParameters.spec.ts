import ParametersSpreadClientFactory, {
  SpreadClient
} from "./generated/parameters/spread/src/index.js";
import { assert } from "chai";
describe("HelloClient Rest Client", () => {
  let client: SpreadClient;

  beforeEach(() => {
    client = ParametersSpreadClientFactory({ allowInsecureConnection: true });
  });

  it("should spread named model", async () => {
    try {
      const result = await client
        .path("/parameters/spread/model/request-body")
        .put({
          body: {
            name: "foo"
          }
        });
      assert.strictEqual(result.status, "204");
    } catch (err) {
      assert.fail(err as string);
    }
  });

  it("should spread model composite request only with body param", async () => {
    try {
      const result = await client
        .path("/parameters/spread/model/composite-request-only-with-body")
        .put({
          body: {
            name: "foo"
          }
        });
      assert.strictEqual(result.status, "204");
    } catch (err) {
      assert.fail(err as string);
    }
  });

  it("should spread model composite request without body param", async () => {
    try {
      const result = await client
        .path(
          "/parameters/spread/model/composite-request-without-body/{name}",
          "foo"
        )
        .put({ headers: { "test-header": "bar" } });
      assert.strictEqual(result.status, "204");
    } catch (err) {
      assert.fail(err as string);
    }
  });

  it("should spread model composite request", async () => {
    try {
      const result = await client
        .path("/parameters/spread/model/composite-request/{name}", "foo")
        .put({
          headers: { "test-header": "bar" },
          body: {
            name: "foo"
          }
        });
      assert.strictEqual(result.status, "204");
    } catch (err) {
      assert.fail(err as string);
    }
  });

  it("should spread model composite request mix", async () => {
    try {
      const result = await client
        .path("/parameters/spread/model/composite-request-mix/{name}", "foo")
        .put({
          headers: { "test-header": "bar" },
          body: {
            prop: "foo"
          }
        });
      assert.strictEqual(result.status, "204");
    } catch (err) {
      assert.fail(err as string);
    }
  });

  it("should spread alias with only body param", async () => {
    try {
      const result = await client
        .path("/parameters/spread/alias/request-body")
        .put({
          body: {
            name: "foo"
          }
        });
      assert.strictEqual(result.status, "204");
    } catch (err) {
      assert.fail(err as string);
    }
  });

  it("should spread alias with mixed params", async () => {
    try {
      const result = await client
        .path("/parameters/spread/alias/request-parameter/{id}", "1")
        .put({
          body: {
            name: "foo"
          },
          headers: {
            "x-ms-test-header": "bar"
          }
        });
      assert.strictEqual(result.status, "204");
    } catch (err) {
      assert.fail(err as string);
    }
  });

  it("should spread alias with more than 5 params", async () => {
    try {
      const result = await client
        .path("/parameters/spread/alias/multiple-parameters/{id}", "1")
        .put({
          body: {
            prop1: "foo1",
            prop2: "foo2",
            prop3: "foo3",
            prop4: "foo4",
            prop5: "foo5",
            prop6: "foo6"
          },
          headers: {
            "x-ms-test-header": "bar"
          }
        });
      assert.strictEqual(result.status, "204");
    } catch (err) {
      assert.fail(err as string);
    }
  });
});
