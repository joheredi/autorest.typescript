import { headersToSchema } from "../../../src/utils/headersToSchema";
import {
  HttpHeader,
  StringSchema,
  ObjectSchema,
  Property,
  NumberSchema,
  SchemaType
} from "@azure-tools/codemodel";
import { expect } from "chai";

describe("transformResponseHeaders", () => {
  it("should generate an ObjectSchema with a single property when there is only one Header", () => {
    const headers = [
      new HttpHeader("test-header", new StringSchema("string", ""))
    ];

    const transformedHeaders =
      headersToSchema(headers, "Test_Operation") || ({} as ObjectSchema);

    expect(transformedHeaders).to.be.instanceOf(ObjectSchema);
    expect(transformedHeaders.properties!).to.have.length(1);
    expect(transformedHeaders.properties![0]).to.be.instanceOf(Property);
    expect(transformedHeaders.properties![0].serializedName).to.equal(
      "test-header"
    );
    expect(transformedHeaders.properties![0].schema).to.be.instanceOf(
      StringSchema
    );
  });

  it("should generate an ObjectSchema with a multiple property when there are multiple Headers", () => {
    const headers = [
      new HttpHeader("test-header", new StringSchema("string", "")),
      new HttpHeader(
        "test-header-two",
        new NumberSchema("number", "", SchemaType.Integer, 32)
      )
    ];

    const transformedHeaders =
      headersToSchema(headers, "Test_Operation") || ({} as ObjectSchema);

    expect(transformedHeaders).to.be.instanceOf(ObjectSchema);
    expect(transformedHeaders.properties!).to.have.length(2);

    expect(transformedHeaders.properties![0]).to.be.instanceOf(Property);
    expect(transformedHeaders.properties![0].serializedName).to.equal(
      "test-header"
    );
    expect(transformedHeaders.properties![0].schema).to.be.instanceOf(
      StringSchema
    );

    expect(transformedHeaders.properties![1]).to.be.instanceOf(Property);
    expect(transformedHeaders.properties![1].serializedName).to.equal(
      "test-header-two"
    );
    expect(transformedHeaders.properties![1].schema).to.be.instanceOf(
      NumberSchema
    );
  });
});
