import { SpreadClient } from "./generated/parameters/spread/src/index.js";
import { assert } from "chai";
describe("SpreadClient Client", () => {
  let client: SpreadClient;

  beforeEach(() => {
    client = new SpreadClient({
      allowInsecureConnection: true,
      endpoint: "http://localhost:3002"
    });
  });

  it("should spread named model", async () => {
    try {
      const result = await client.model.spreadAsRequestBody({ name: "foo" });
      assert.isUndefined(result);
    } catch (err) {
      assert.fail(err as string);
    }
  });

  it("should spread alias with only body param", async () => {
    try {
      const result = await client.alias.spreadAsRequestBody("foo");
      assert.isUndefined(result);
    } catch (err) {
      assert.fail(err as string);
    }
  });

  it("should spread model composite request only with body", async () => {
    try {
      const result = await client.model.spreadCompositeRequestOnlyWithBody({
        name: "foo"
      });
      assert.isUndefined(result);
    } catch (err) {
      assert.fail(err as string);
    }
  });

  it("should spread model composite request without body", async () => {
    try {
      const result = await client.model.spreadCompositeRequestWithoutBody(
        "foo",
        "bar"
      );
      assert.isUndefined(result);
    } catch (err) {
      assert.fail(err as string);
    }
  });

  it("should spread model composite request ", async () => {
    try {
      const result = await client.model.spreadCompositeRequest("foo", "bar", {
        name: "foo"
      });
      assert.isUndefined(result);
    } catch (err) {
      assert.fail(err as string);
    }
  });

  it("should spread model composite request mix", async () => {
    try {
      const result = await client.model.spreadCompositeRequestMix(
        "foo",
        "bar",
        { prop: "foo" }
      );
      assert.isUndefined(result);
    } catch (err) {
      assert.fail(err as string);
    }
  });

  it("should spread alias with mixed params", async () => {
    try {
      const result = await client.alias.spreadAsRequestParameter(
        "1",
        "bar",
        "foo"
      );
      assert.isUndefined(result);
    } catch (err) {
      assert.fail(err as string);
    }
  });

  it("should spread alias with more than 5 params", async () => {
    try {
      const result = await client.alias.spreadWithMultipleParameters(
        "1",
        "bar",
        "foo1",
        "foo2",
        "foo3",
        "foo4",
        "foo5",
        "foo6"
      );
      assert.isUndefined(result);
    } catch (err) {
      assert.fail(err as string);
    }
  });
});
