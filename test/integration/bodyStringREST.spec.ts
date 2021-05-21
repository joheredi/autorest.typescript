import { assert } from "chai";
import BodyString, {
  BodyStringRestRestClient
} from "./generated/bodyStringREST/src/bodyStringRest";

describe.only("BodyString LLC", () => {
  let client: BodyStringRestRestClient;

  beforeEach(() => {
    client = BodyString();
  });

  it("should support valid null value", async function () {
    const result = await client
      .path("/string/null")
      .get({ allowInsecureConnection: true });
    assert.deepStrictEqual(result.body, undefined);

    const putResult = await client
      .path("/string/null")
      .put({ body: undefined, allowInsecureConnection: true });
    assert.deepStrictEqual(putResult.status, "200");
  });

  it("should support valid empty string value", async function () {
    const putResult = await client.path("/string/empty").put({
      allowInsecureConnection: true,
      body: ""
    });
    assert.equal(putResult.status, "200");
    const getResult = await client
      .path("/string/empty")
      .get({ allowInsecureConnection: true });
    assert.equal(getResult.body, "");
  });

  it("should support whitespace string value", async function () {
    const whiteSpace = client.path("/string/whitespace");
    const expected =
      "    Now is the time for all good men to come to the aid of their country    ";
    assert.equal(
      (await whiteSpace.get({ allowInsecureConnection: true })).body,
      expected
    );
    assert.equal(
      (
        await whiteSpace.put({
          allowInsecureConnection: true,
          body: expected
        })
      ).status,
      "200"
    );
  });

  it("should support not provided value", async function () {
    const notProvided = client.path("/string/notProvided");
    assert.equal(
      (await notProvided.get({ allowInsecureConnection: true })).body,
      undefined
    );
  });

  it("should support valid enum valid value", async function () {
    const expected = "red color";
    const notExpandable = client.path("/string/enum/notExpandable");
    assert.equal(
      (await notExpandable.get({ allowInsecureConnection: true })).body,
      expected
    );
    assert.equal(
      (
        await notExpandable.put({
          allowInsecureConnection: true,
          body: expected
        })
      ).status,
      "200"
    );
  });

  it("should correctly handle invalid values for enum", async function () {
    const invalidEnum = await client
      .path("/string/enum/notExpandable")
      .put({ allowInsecureConnection: true, body: "red_color" as any });
    assert.equal(invalidEnum.status, "400");
  });

  it("should correctly deserialize base64 encoded string", async function () {
    const expected = "YSBzdHJpbmcgdGhhdCBnZXRzIGVuY29kZWQgd2l0aCBiYXNlNjQ=";
    const result = await client
      .path("/string/base64Encoding")
      .get({ allowInsecureConnection: true });

    if (result.status !== "200") {
      assert.fail("Expected 200 status code")
    } else {
      assert.equal(result.body.toString(), expected);
    }


  });

  it("should correctly handle null base64url encoded string", async () => {
    const result = await client
      .path("/string/nullBase64UrlEncoding")
      .get({ allowInsecureConnection: true });

    assert.equal(result.body, undefined);
  });

  it("should correctly serialize and deserialize base64url encoded string", async () => {
    const expected = `YSBzdHJpbmcgdGhhdCBnZXRzIGVuY29kZWQgd2l0aCBiYXNlNjR1cmw`;
    const base64UrlEncoded = client.path("/string/base64UrlEncoding");
    assert.equal(
      (await base64UrlEncoded.get({ allowInsecureConnection: true })).body.toString(),
      expected
    );

    const result = await base64UrlEncoded.put({
      allowInsecureConnection: true,
      body: expected as any
    });
    assert.equal(result.status, "200");
  });

  it("should getEnumReferenced", async function () {
    const { body } = await client.path("/string/enum/Referenced").get({ allowInsecureConnection: true })
    assert.equal(body, "red color");
  });

  it("should putEnumReferenced", async function () {
    await client.path("/string/enum/Referenced").put({ body: "red color", allowInsecureConnection: true });
  });

  it("should getEnumReferencedConstant", async function () {
    const result = await client.path("/string/enum/ReferencedConstant").get({ allowInsecureConnection: true });

    if (result.status !== "200") {
      assert.fail("Expected success status");
    } else {

      assert.equal(result.body.field1, "Sample String");
    }

  });

  it("should putEnumReferencedConstant", async function () {
    const result = await client.path("/string/enum/ReferencedConstant").put({ body: { colorConstant: "green-color" }, allowInsecureConnection: true })
    assert.equal(result.status, "200");
  });
});
