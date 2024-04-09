import {
  getOperationSignatureParameters,
  getRLCResponseType,
  extractPagingType,
  getOperationOptionsName,
  buildHeaderParameter,
  getEncodingFormat,
  buildBodyParameter,
  getConstantValue,
  getCollectionFormat,
  getOptionalModularToRlcMapping,
  OptionalType,
  serializeRequestValue,
  needsDeserialize,
  getAllProperties,
  getAllAncestors,
  isPagingOperation,
  isLROOperation,
  deserializeResponseValue,
  getResponseMapping
} from "../../../../src/modular/helpers/operationHelpers.js";
import { describe, it, assert, vi, expect } from "vitest";
import {
  BodyParameter,
  Operation,
  Parameter,
  Type
} from "../../../../src/modular/modularCodeModel.js";
import * as lib from "../../../../src/lib.js";
import { NoTarget } from "@typespec/compiler";

describe("operationHelpers", () => {
  describe("getOperationOptionsName", function () {
    const baseOperation: Operation = {
      name: "get",
      namespaceHierarchies: [],
      overloads: [],
      parameters: [],
      responses: [],
      summary: "",
      url: "",
      apiVersions: [],
      description: "Get a foo",
      method: "GET",
      discriminator: "",
      exceptions: [],
      groupName: "",
      isOverload: false
    };

    it("should include operation name in the options name", function () {
      const operation = { ...baseOperation, name: "prefix_get" };
      const optionsName = getOperationOptionsName(operation, true);

      assert.equal(optionsName, "PrefixGetOptions");
    });

    it("should not include operation name in the options name", function () {
      const operation = { ...baseOperation, name: "get" };
      const optionsName = getOperationOptionsName(operation, false);

      assert.equal(optionsName, "GetOptions");
    });

    it("should include operation name with pascale case", function () {
      const operation = { ...baseOperation, name: "GetItems" };
      const optionsName = getOperationOptionsName(operation, true);

      assert.equal(optionsName, "GetItemsOptions");
    });

    it("should avoid collisions with spec defined options", function () {
      const operation: Operation = {
        ...baseOperation,
        name: "get",
        bodyParameter: {
          clientName: "getOptions",
          contentTypes: ["application/json"],
          description: "",
          inOverload: false,
          isBinaryPayload: false,
          location: "body",
          optional: false,
          restApiName: "getOptions",
          type: { type: "model", name: "GetOptions" }
        }
      };
      const optionsName = getOperationOptionsName(operation, true);

      assert.equal(optionsName, "GetRequestOptions");
    });
  });

  describe("getOptionalModularToRlcMapping", () => {
    it("should should map an optional primitive modular property name to the RLC name", () => {
      const param: OptionalType = {
        clientName: "myFoo",
        description: "",
        implementation: "Method",
        inOverload: false,
        restApiName: "foo",
        type: { type: "string", optional: true }
      };
      const mapping = getOptionalModularToRlcMapping(param, {} as any);
      assert.equal(mapping, `"foo": options?.myFoo`);
    });

    it("should should map an optional datetime modular property name to the RLC name with default format in heder", () => {
      const param: Parameter & { type: { optional: true } } = {
        clientName: "myFoo",
        description: "",
        implementation: "Method",
        inOverload: false,
        restApiName: "foo",
        location: "header",
        optional: true,
        type: { type: "datetime", optional: true }
      };
      const mapping = getOptionalModularToRlcMapping(param, {} as any);
      assert.equal(mapping, `"foo": options?.myFoo?.toUTCString()`);
    });

    it("should should map an optional datetime modular property name to the RLC name with default format in non-header", () => {
      const param: Parameter & { type: { optional: true } } = {
        clientName: "myFoo",
        description: "",
        implementation: "Method",
        inOverload: false,
        restApiName: "foo",
        location: "body",
        optional: true,
        type: { type: "datetime", optional: true }
      };
      const mapping = getOptionalModularToRlcMapping(param, {} as any);
      assert.equal(mapping, `"foo": options?.myFoo?.toISOString()`);
    });

    it("should should map an optional datetime modular property name to the RLC name with provided format in non-header", () => {
      const param: Parameter & { type: { optional: true } } = {
        clientName: "myFoo",
        description: "",
        implementation: "Method",
        inOverload: false,
        restApiName: "foo",
        location: "body",
        optional: true,
        type: { type: "datetime", optional: true, format: "unixTimestamp" }
      };
      const mapping = getOptionalModularToRlcMapping(param, {} as any);
      assert.equal(mapping, `"foo": options?.myFoo?.getTime()`);
    });

    it("should should map an optional datetime modular property name to the RLC name with provided format in header", () => {
      const param: Parameter & { type: { optional: true } } = {
        clientName: "myFoo",
        description: "",
        implementation: "Method",
        inOverload: false,
        restApiName: "foo",
        location: "body",
        optional: true,
        type: { type: "datetime", optional: true, format: "time" }
      };
      const mapping = getOptionalModularToRlcMapping(param, {} as any);
      assert.equal(mapping, `"foo": options?.myFoo?.toTimeString()`);
    });

    it("should should map an optional model modular property name to the RLC name", () => {
      const param: OptionalType = {
        clientName: "myFoo",
        description: "",
        implementation: "Method",
        inOverload: false,
        restApiName: "foo",
        type: {
          type: "model",
          optional: true,
          properties: [
            {
              clientName: "myProp",
              description: "",
              restApiName: "prop",
              type: { type: "string" }
            }
          ]
        }
      };
      const mapping = getOptionalModularToRlcMapping(param, {} as any);
      assert.equal(mapping, `"foo": {"prop": options?.myFoo?.["myProp"]}`);
    });
  });

  describe("serializeRequestValue", () => {
    describe("datetime", () => {
      it("should serialize datetime to ISO string when format is rfc3339", () => {
        const serializedValue = serializeRequestValue(
          { type: "datetime", format: "rfc3339" } as any,
          "foo",
          {} as any,
          true,
          []
        );

        assert.equal(serializedValue, "foo.toISOString()");
      });

      it("should serialize datetime to ISO string when format is not provided", () => {
        const serializedValue = serializeRequestValue(
          { type: "datetime" } as any,
          "foo",
          {} as any,
          true,
          []
        );

        assert.equal(serializedValue, "foo.toISOString()");
      });

      it("should serialize datetime to unix timestamp when format is unixTimestamp", () => {
        const serializedValue = serializeRequestValue(
          { type: "datetime", format: "unixTimestamp" } as any,
          "foo",
          {} as any,
          true,
          []
        );

        assert.equal(serializedValue, "foo.getTime()");
      });

      it("should serialize datetime to time string when format is time", () => {
        const serializedValue = serializeRequestValue(
          { type: "datetime", format: "time" } as any,
          "foo",
          {} as any,
          true,
          []
        );

        assert.equal(serializedValue, "foo.toTimeString()");
      });

      it("should serialize datetime to UTC string when format is not provided and location is header", () => {
        const serializedValue = serializeRequestValue(
          { type: "datetime" } as any,
          "foo",
          {} as any,
          true,
          [],
          "headerDefault"
        );

        assert.equal(serializedValue, "foo.toUTCString()");
      });

      it("should serialize datetime to UTC string when format is rfc7231", () => {
        const serializedValue = serializeRequestValue(
          { type: "datetime", format: "rfc7231" } as any,
          "foo",
          {} as any,
          true,
          []
        );

        assert.equal(serializedValue, "foo.toUTCString()");
      });

      it("should serialize datetime to toDateString when format is date", () => {
        const serializedValue = serializeRequestValue(
          { type: "datetime", format: "date" } as any,
          "foo",
          {} as any,
          true,
          []
        );

        assert.equal(serializedValue, "foo.toDateString()");
      });
    });

    describe("list", () => {
      it("should map each element directly with the rlc type when the element type is a model", () => {
        const serializedValue = serializeRequestValue(
          {
            type: "list",
            elementType: {
              type: "model",
              properties: [
                {
                  clientName: "myFoo",
                  description: "",
                  restApiName: "foo",
                  type: { type: "string" }
                }
              ]
            }
          } as any,
          "foo",
          {} as any,
          true,
          []
        );

        assert.equal(serializedValue, `foo.map(p => ({"foo": p["myFoo"]}))`);
      });

      it("should deep map each element directly with the rlc type when the element type is a model", () => {
        const serializedValue = serializeRequestValue(
          {
            type: "list",
            elementType: {
              type: "model",
              properties: [
                {
                  clientName: "myFoo",
                  description: "",
                  restApiName: "foo",
                  type: {
                    type: "model",
                    properties: [
                      {
                        clientName: "myBar",
                        description: "",
                        restApiName: "bar",
                        type: { type: "string" }
                      }
                    ]
                  }
                }
              ]
            }
          } as any,
          "foo",
          {} as any,
          true,
          []
        );

        assert.equal(
          serializedValue,
          `foo.map(p => ({"foo":   {"bar": p.myFoo["myBar"]}}))`
        );
      });

      it("should map each element directly with the rlc type when the element type is a polymorphic union", () => {
        // TODO inplement this tests
        assert.equal(1, 1);
      });

      it("should return the client value directly", () => {
        const serializedValue = serializeRequestValue(
          {
            type: "list",
            elementType: { type: "string" }
          } as any,
          "foo",
          {} as any,
          true,
          []
        );

        assert.equal(serializedValue, "foo");
      });
    });

    describe("byte-array", function () {
      it("should return the client value directly when format is binary", function () {
        const serializedValue = serializeRequestValue(
          {
            type: "byte-array",
            format: "binary"
          } as any,
          "foo",
          {} as any,
          true,
          [],
          "binary"
        );

        assert.equal(serializedValue, "foo");
      });

      it("should convert the client value to a base64Url string ", function () {
        const serializedValue = serializeRequestValue(
          {
            type: "byte-array",
            format: "base64Url"
          } as any,
          "foo",
          {} as any,
          true,
          [],
          "base64url"
        );

        assert.equal(serializedValue, 'uint8ArrayToString(foo, "base64url")');
      });

      it("should convert the client value to a base64Url string and handle nullchecks ", function () {
        const serializedValue = serializeRequestValue(
          {
            type: "byte-array",
            format: "base64Url"
          } as any,
          "foo",
          {} as any,
          false,
          [],
          "base64url"
        );

        assert.equal(
          serializedValue,
          'foo !== undefined ? uint8ArrayToString(foo, "base64url"): undefined'
        );
      });
    });

    describe("unions", () => {
      it("should just ouptut modular client value for normal variants", function () {
        const testType: Type = {
          type: "combined",
          types: [
            { type: "string", clientDefaultValue: "foo" },
            { type: "string", clientDefaultValue: "bar" }
          ]
        };

        const serializedValue = serializeRequestValue(
          testType,
          "foo",
          {} as any,
          false,
          []
        );

        assert.equal(serializedValue, "foo");
      });

      //TODO: Implement tests for polymorphic unions

      it("should deserialize datetime variants", function () {
        const testType: Type = {
          type: "combined",
          types: [{ type: "datetime" }]
        };

        const serializedValue = serializeRequestValue(
          testType,
          "foo",
          {} as any,
          false,
          []
        );

        // TODO: Verify this is the expected and correct behavior
        assert.equal(serializedValue, "foo as any");
      });
    });
  });

  describe("needsDeserialize", () => {
    it("should return true for datetime type", () => {
      const deserialize = needsDeserialize({
        type: "datetime"
      });

      assert.isTrue(deserialize);
    });

    it("should return true for list type", () => {
      const deserialize = needsDeserialize({
        type: "list"
      });

      assert.isTrue(deserialize);
    });

    it("should return true for byte-array type", () => {
      const deserialize = needsDeserialize({
        type: "byte-array"
      });

      assert.isTrue(deserialize);
    });

    it("should return false for string type", () => {
      const deserialize = needsDeserialize({
        type: "string"
      });

      assert.isFalse(deserialize);
    });
  });

  describe("buildHeaderParameter", function () {
    const baseParameter: Parameter = {
      clientName: "foo",
      description: "",
      implementation: "Method",
      inOverload: false,
      location: "header",
      optional: false,
      restApiName: "foo",
      type: { type: "string" }
    };
    it("should report diagnostics when the header parameter is required and nullable", () => {
      vi.mock("../../../../src/lib.js", () => {
        return {
          reportDiagnostic: vi.fn().mockImplementation(() => {})
        };
      });

      const paramMap = "";
      const parameter: Parameter = {
        ...baseParameter,
        type: { type: "string", nullable: true }
      };
      const headerParameter = buildHeaderParameter(
        {} as any,
        paramMap,
        parameter
      );

      expect(lib.reportDiagnostic).to.have.been.toHaveBeenCalledWith(
        {} as any,
        {
          code: "nullable-required-header",
          target: NoTarget
        }
      );

      assert.equal(headerParameter, paramMap);
    });

    it("should do nothing when parameter is required and non-nullable", () => {
      const paramMap = "";
      const parameter = { ...baseParameter };
      const headerParameter = buildHeaderParameter(
        {} as any,
        paramMap,
        parameter
      );

      assert.equal(headerParameter, paramMap);
    });

    it("should add condition checking for undefined", () => {
      const paramMap = "";
      const parameter: Parameter = { ...baseParameter, optional: true };
      const headerParameter = buildHeaderParameter(
        {} as any,
        paramMap,
        parameter
      );

      assert.equal(
        headerParameter,
        "...(options?.foo !== undefined ? {} : {})"
      );
    });

    it("should add condition checking for null", () => {
      const paramMap = "";
      const parameter: Parameter = {
        ...baseParameter,
        type: { type: "string", nullable: true },
        optional: true
      };
      const headerParameter = buildHeaderParameter(
        {} as any,
        paramMap,
        parameter
      );

      assert.equal(
        headerParameter,
        "...(options?.foo !== undefined && options?.foo !== null ? {} : {})"
      );
    });
  });

  describe("getEncodingFormat", () => {
    it("should return base64 an unsupported format is provided", () => {
      const encodingFormat = getEncodingFormat({
        format: "myEncodingFoo"
      });

      assert.equal(encodingFormat, "base64");
    });

    it("should return the format provided when it is base64, base64url or byte", () => {
      let encodingFormat = getEncodingFormat({
        format: "base64"
      });

      assert.equal(encodingFormat, "base64");

      encodingFormat = getEncodingFormat({
        format: "base64url"
      });

      assert.equal(encodingFormat, "base64url");

      encodingFormat = getEncodingFormat({
        format: "byte"
      });

      assert.equal(encodingFormat, "byte");
    });
  });

  describe("extractPagingType", function () {
    it("should return undefined when no itemName is provided", function () {
      const pagingType = extractPagingType({
        type: "model",
        properties: []
      });

      assert.isUndefined(pagingType);
    });

    it("should return the type of elements in the page", function () {
      const pageTypeName = "values";
      const pagingType = extractPagingType(
        {
          type: "model",
          properties: [
            {
              clientName: pageTypeName,
              description: "",
              restApiName: pageTypeName,
              type: { type: "list", elementType: { type: "string" } }
            }
          ]
        },
        pageTypeName
      );

      assert.deepEqual(pagingType, { type: "string" });
    });

    it("should return undefined when pageTypeName is not a property", function () {
      const pageTypeName = "values";
      const pagingType = extractPagingType(
        {
          type: "model",
          properties: [
            {
              clientName: "otherName",
              description: "",
              restApiName: "otherName",
              type: { type: "list", elementType: { type: "string" } }
            }
          ]
        },
        pageTypeName
      );

      assert.isUndefined(pagingType);
    });

    it("should return undefined when property with name pageTypeName is not a list", function () {
      const pageTypeName = "values";
      const pagingType = extractPagingType(
        {
          type: "model",
          properties: [
            {
              clientName: pageTypeName,
              description: "",
              restApiName: pageTypeName,
              type: { type: "model" }
            }
          ]
        },
        pageTypeName
      );

      assert.isUndefined(pagingType);
    });
  });

  describe("getRLCResponseType", function () {
    it("should return the RLC response type for the operation", async function () {
      const responseType = getRLCResponseType({
        operationGroup: "Foo",
        operationName: "Bar",
        path: "/foo/bar",
        responses: [{ statusCode: "200" }]
      });

      assert.equal(responseType, "FooBar200Response");
    });

    it("should return the RLC response type for the operation when a name is overriden", async function () {
      const responseType = getRLCResponseType({
        operationGroup: "Foo",
        operationName: "Bar",
        path: "/foo/bar",
        responses: [{ statusCode: "200", predefinedName: "OverridenResponse" }]
      });

      assert.equal(responseType, "OverridenResponse");
    });
  });

  describe("buildBodyParameter - Mapping from Modular to RLC types", () => {
    const baseParameter: BodyParameter = {
      contentTypes: ["application/json"],
      isBinaryPayload: false,
      clientName: "foo",
      description: "",
      inOverload: false,
      location: "body",
      optional: false,
      restApiName: "foo",
      type: { type: "model", name: "Foo" }
    };

    describe("model", function () {
      it("should return empty string when body parameter is not provided", () => {
        const parameter = buildBodyParameter(undefined, {} as any);
        assert.equal(parameter, "");
      });

      it("should map body directly to the model when it is a model and alias, with no bodyparts", () => {
        const parameter = buildBodyParameter(
          {
            ...baseParameter,
            type: { type: "model", name: "Foo", aliasType: undefined }
          },
          {} as any
        );

        assert.equal(parameter.trim(), "body: foo,");
      });

      it("should map each property of the model when it is a model and alias, with bodyparts", () => {
        const parameter = buildBodyParameter(
          {
            ...baseParameter,
            type: {
              type: "model",
              name: "foo",
              properties: [
                {
                  clientName: "bar",
                  description: "",
                  restApiName: "bar",
                  type: { type: "string" }
                }
              ]
            }
          },
          {} as any
        );

        assert.equal(parameter.trim(), `body: {"bar": foo["bar"]},`);
      });

      it("should map each property of the model, checking for undefined when it is a model and alias, with bodyparts", () => {
        const parameter = buildBodyParameter(
          {
            ...baseParameter,
            optional: true,
            type: {
              type: "model",
              name: "foo",
              properties: [
                {
                  clientName: "bar",
                  description: "",
                  restApiName: "bar",
                  type: { type: "string" }
                }
              ]
            }
          },
          {} as any
        );

        assert.equal(
          parameter.trim(),
          `body: foo === undefined ? foo : {"bar": foo["bar"]},`
        );
      });

      it("should map directly when it is a model and has an aliasType", () => {
        const parameter = buildBodyParameter(
          { ...baseParameter, type: { type: "model", aliasType: "myFoo" } },
          {} as any
        );

        assert.equal(parameter.trim(), "body: foo,");
      });
    });

    describe("list", () => {
      it("should map body directly to the body parameter if it is an alias", () => {
        const parameter = buildBodyParameter(
          {
            ...baseParameter,
            type: { type: "list", elementType: { type: "string" } }
          },
          {} as any
        );

        assert.equal(parameter.trim(), "body: foo,");
      });

      it("should map body directly to the body parameter if it is an alias", () => {
        const parameter = buildBodyParameter(
          {
            ...baseParameter,
            type: {
              type: "list",
              elementType: { type: "model", aliasType: "myFoo" }
            }
          },
          {} as any
        );

        assert.equal(parameter.trim(), "body: foo,");
      });

      it("should loop the elements on the list and map each of the body parts", () => {
        const parameter = buildBodyParameter(
          {
            ...baseParameter,
            type: {
              type: "list",
              elementType: {
                type: "model",
                name: "foo",
                properties: [
                  {
                    clientName: "bar",
                    description: "",
                    restApiName: "bar",
                    type: { type: "string" }
                  },
                  {
                    clientName: "bazzz",
                    description: "",
                    restApiName: "baz",
                    type: { type: "integer" }
                  }
                ]
              }
            }
          },
          {} as any
        );

        assert.equal(
          parameter.trim().replace(/\s/g, ""),
          `body: (foo ?? []).map((p) => {
             return {
              "bar": p["bar"],
              "baz": p["bazzz"]
            };
          }),`.replace(/\s/g, "")
        );
      });
    });

    describe("byte-array", () => {
      it("should check for type to be string and then deserializing when the body parameter is optional", function () {
        const parameter = buildBodyParameter(
          {
            ...baseParameter,
            optional: true,
            type: { type: "byte-array" }
          },
          {} as any
        );

        assert.equal(
          parameter.trim().replace(/\s/g, ""),
          `body: typeof foo === 'string'
            ? uint8ArrayToString(foo, "base64")
            : foo`.replace(/\s/g, "")
        );
      });

      it("should serialize the uint8Array to the provided format string", function () {
        const parameter = buildBodyParameter(
          {
            ...baseParameter,
            optional: true,
            type: { type: "byte-array", format: "base64url" }
          },
          {} as any
        );

        assert.equal(
          parameter.trim().replace(/\s/g, ""),
          `body: typeof foo === 'string'
            ? uint8ArrayToString(foo, "base64url")
            : foo`.replace(/\s/g, "")
        );
      });

      it("should serialize the uint8Array to the provided format string base64 when format is not provided", function () {
        const parameter = buildBodyParameter(
          {
            ...baseParameter,
            optional: true,
            type: { type: "byte-array" }
          },
          {} as any
        );

        assert.equal(
          parameter.trim().replace(/\s/g, ""),
          `body: typeof foo === 'string'
            ? uint8ArrayToString(foo, "base64")
            : foo`.replace(/\s/g, "")
        );
      });

      it("should map the type directly when it is binary payload", function () {
        const parameter = buildBodyParameter(
          {
            ...baseParameter,
            optional: true,
            clientName: "myFoo",
            type: { type: "byte-array" },
            isBinaryPayload: true
          },
          {} as any
        );

        assert.equal(parameter.trim(), `body: myFoo,`);
      });
    });
  });

  describe("getConstantValue", () => {
    it("should extract value from a constant parameter", () => {
      const constantValue = getConstantValue({
        type: { type: "constant", value: "foo" },
        clientName: "myConstant",
        description: "",
        implementation: "Method",
        inOverload: false,
        restApiName: "foo",
        clientDefaultValue: "myValue"
      });

      assert.equal(constantValue, `"foo": "myValue"`);
    });

    it("should extract value from a constant parameter's type", () => {
      const constantValue = getConstantValue({
        type: {
          type: "constant",
          clientDefaultValue: "myValue",
          value: "myValue"
        },
        clientName: "myConstant",
        description: "",
        implementation: "Method",
        inOverload: false,
        restApiName: "foo"
      });

      assert.equal(constantValue, `"foo": "myValue"`);
    });
  });

  describe("getCollectionFormat", () => {
    const baseParameter: Parameter = {
      implementation: "Method",
      clientName: "foo",
      description: "",
      inOverload: false,
      location: "query",
      optional: false,
      restApiName: "foo",
      type: { type: "string" }
    };

    it("should format as multiCollection", () => {
      const collectionFormat = getCollectionFormat(
        { ...baseParameter, format: "multi" },
        {} as any
      );

      assert.equal(collectionFormat, `"foo": buildMultiCollection(foo, "foo")`);
    });

    it("should format as getHasSsvCollection", () => {
      const collectionFormat = getCollectionFormat(
        { ...baseParameter, format: "ssv" },
        {} as any
      );

      assert.equal(collectionFormat, `"foo": buildSsvCollection(foo)`);
    });

    it("should format as getHasTsvCollection", () => {
      const collectionFormat = getCollectionFormat(
        { ...baseParameter, format: "tsv" },
        {} as any
      );

      assert.equal(collectionFormat, `"foo": buildTsvCollection(foo)`);
    });

    it("should format as getHasCsvCollection", () => {
      const collectionFormat = getCollectionFormat(
        // TODO: Check if we need to handle query as well
        { ...baseParameter, location: "header", format: "csv" },
        {} as any
      );

      assert.equal(collectionFormat, `"foo": buildCsvCollection(foo)`);
    });

    it("should format as pipe collection", () => {
      const collectionFormat = getCollectionFormat(
        { ...baseParameter, format: "pipes" },
        {} as any
      );

      assert.equal(collectionFormat, `"foo": buildPipeCollection(foo)`);
    });
  });

  describe("getOperationSignatureParameters", function () {
    const baseOperation: Operation = {
      name: "getFoo",
      namespaceHierarchies: [],
      overloads: [],
      parameters: [],
      responses: [],
      summary: "",
      url: "",
      apiVersions: [],
      description: "Get a foo",
      method: "GET",
      discriminator: "",
      exceptions: [],
      groupName: "",
      isOverload: false
    };

    it("should return context and options parameters", function () {
      const clientContextName = "FooClientContext";
      const operation: Operation = baseOperation;
      const signatureParameters = getOperationSignatureParameters(
        operation,
        clientContextName
      );

      assert.lengthOf(signatureParameters, 2);

      assert.includeDeepMembers(signatureParameters, [
        { name: "context", type: clientContextName },
        {
          name: "options",
          type: "GetFooOptions",
          initializer: "{ requestOptions: {} }"
        }
      ]);
    });

    it("should not include non method parameters", function () {
      const clientContextName = "FooClientContext";
      const operation: Operation = {
        ...baseOperation,
        parameters: [
          {
            clientName: "foo",
            description: "",
            implementation: "Client",
            inOverload: false,
            location: "body",
            optional: false,
            restApiName: "foo",
            type: { type: "string" }
          }
        ]
      };

      const signatureParameters = getOperationSignatureParameters(
        operation,
        clientContextName
      );

      assert.lengthOf(signatureParameters, 2);

      assert.notIncludeMembers(
        signatureParameters.map((p) => p.name),
        ["foo"]
      );
    });

    it("should not include constant parameters", function () {
      const clientContextName = "FooClientContext";
      const operation: Operation = {
        ...baseOperation,
        parameters: [
          {
            clientName: "foo",
            description: "",
            implementation: "Method",
            inOverload: false,
            location: "body",
            optional: false,
            restApiName: "foo",
            type: { type: "constant", value: "bar" }
          }
        ]
      };

      const signatureParameters = getOperationSignatureParameters(
        operation,
        clientContextName
      );

      assert.lengthOf(signatureParameters, 2);
      assert.notIncludeMembers(
        signatureParameters.map((p) => p.name),
        ["foo"]
      );
    });

    it("should not include parameters with default value", function () {
      const clientContextName = "FooClientContext";
      const operation: Operation = {
        ...baseOperation,
        parameters: [
          {
            clientName: "foo",
            description: "",
            implementation: "Method",
            inOverload: false,
            location: "body",
            optional: false,
            restApiName: "foo",
            clientDefaultValue: "bar",
            type: { type: "string" }
          }
        ]
      };

      const signatureParameters = getOperationSignatureParameters(
        operation,
        clientContextName
      );

      assert.lengthOf(signatureParameters, 2);
      assert.notIncludeMembers(
        signatureParameters.map((p) => p.name),
        ["foo"]
      );
    });

    it("should not include optional parameters", function () {
      const clientContextName = "FooClientContext";
      const operation: Operation = {
        ...baseOperation,
        parameters: [
          {
            clientName: "foo",
            description: "",
            implementation: "Method",
            inOverload: false,
            location: "body",
            optional: true,
            restApiName: "foo",
            type: { type: "string" }
          }
        ]
      };

      const signatureParameters = getOperationSignatureParameters(
        operation,
        clientContextName
      );

      assert.lengthOf(signatureParameters, 2);
      assert.notIncludeMembers(
        signatureParameters.map((p) => p.name),
        ["foo"]
      );
    });

    it("should include optional body parameter ", function () {
      const clientContextName = "FooClientContext";
      const operation: Operation = {
        ...baseOperation,
        bodyParameter: {
          clientName: "fooBody",
          contentTypes: ["application/json"],
          description: "",
          inOverload: false,
          isBinaryPayload: false,
          location: "body",
          optional: true,
          restApiName: "body",
          type: { type: "model", name: "FooBody" }
        }
      };

      const signatureParameters = getOperationSignatureParameters(
        operation,
        clientContextName
      );

      assert.lengthOf(signatureParameters, 3);
      const item = signatureParameters.find((p) => p.name === "fooBody")!;
      assert.isTrue(item.hasQuestionToken);
      assert.includeMembers(
        signatureParameters.map((p) => p.name),
        ["fooBody"]
      );
    });

    it("should include required body parameter ", function () {
      const clientContextName = "FooClientContext";
      const operation: Operation = {
        ...baseOperation,
        bodyParameter: {
          clientName: "fooBody",
          contentTypes: ["application/json"],
          description: "",
          inOverload: false,
          isBinaryPayload: false,
          location: "body",
          optional: false,
          restApiName: "body",
          type: { type: "model", name: "FooBody" }
        }
      };

      const signatureParameters = getOperationSignatureParameters(
        operation,
        clientContextName
      );

      assert.lengthOf(signatureParameters, 3);
      assert.includeMembers(
        signatureParameters.map((p) => p.name),
        ["fooBody"]
      );
      const item = signatureParameters.find((p) => p.name === "fooBody")!;
      assert.isFalse(item.hasQuestionToken);
    });

    it("should include method parameters", function () {
      const clientContextName = "FooClientContext";
      const operation: Operation = {
        ...baseOperation,
        parameters: [
          {
            clientName: "foo",
            description: "",
            implementation: "Method",
            inOverload: false,
            location: "body",
            optional: false,
            restApiName: "foo",
            type: { type: "string" }
          }
        ]
      };

      const signatureParameters = getOperationSignatureParameters(
        operation,
        clientContextName
      );

      assert.lengthOf(signatureParameters, 3);
      assert.includeMembers(
        signatureParameters.map((p) => p.name),
        ["context", "foo", "options"]
      );
    });
  });

  describe("getAllProperties", function () {
    it("should return an empty array when no type is passed", function () {
      const properties = getAllProperties(undefined as any);
      assert.deepEqual(properties, []);
    });

    it("should get all properties of a model", function () {
      const properties = getAllProperties({
        type: "model",
        properties: [
          {
            clientName: "foo",
            description: "",
            restApiName: "foo",
            type: { type: "string" }
          },
          {
            clientName: "bar",
            description: "",
            restApiName: "bar",
            type: { type: "string" }
          }
        ]
      });

      assert.deepEqual(properties, [
        {
          clientName: "foo",
          description: "",
          restApiName: "foo",
          type: { type: "string" }
        },
        {
          clientName: "bar",
          description: "",
          restApiName: "bar",
          type: { type: "string" }
        }
      ]);
    });

    it("should get all properties of a model with parents", function () {
      const properties = getAllProperties(
        {
          type: "model",
          properties: [
            {
              clientName: "foo",
              description: "",
              restApiName: "foo",
              type: { type: "string" }
            },
            {
              clientName: "bar",
              description: "",
              restApiName: "bar",
              type: { type: "string" }
            }
          ]
        },
        [
          {
            type: "model",
            properties: [
              {
                clientName: "baz",
                description: "",
                restApiName: "baz",
                type: { type: "string" }
              }
            ]
          }
        ]
      );

      assert.deepEqual(properties, [
        {
          clientName: "baz",
          description: "",
          restApiName: "baz",
          type: { type: "string" }
        },
        {
          clientName: "foo",
          description: "",
          restApiName: "foo",
          type: { type: "string" }
        },
        {
          clientName: "bar",
          description: "",
          restApiName: "bar",
          type: { type: "string" }
        }
      ]);
    });
  });

  describe("getAllAncestors", () => {
    it("should return an empty array when no ancestors are present", function () {
      const ancestors = getAllAncestors({
        type: "model",
        properties: []
      });

      assert.deepEqual(ancestors, []);
    });

    it("should return all ancestors of a model", function () {
      const ancestors = getAllAncestors({
        type: "model",
        properties: [],
        parents: [
          {
            name: "parent1",
            type: "model",
            properties: []
          },
          {
            name: "parent2",
            type: "model",
            properties: []
          }
        ]
      });

      assert.deepEqual(ancestors, [
        {
          name: "parent1",
          type: "model",
          properties: []
        },
        {
          name: "parent2",
          type: "model",
          properties: []
        }
      ]);
    });
  });

  describe("isPagingOperation", () => {
    const baseOperation: Operation = {
      apiVersions: [],
      description: "",
      discriminator: "",
      exceptions: [],
      groupName: "",
      isOverload: false,
      method: "GET",
      name: "getFoo",
      namespaceHierarchies: [],
      overloads: [],
      parameters: [],
      responses: [],
      summary: "",
      url: ""
    };

    it("should return true when the operation has a paging discriminator", function () {
      const isPaging = isPagingOperation({
        ...baseOperation,
        discriminator: "paging"
      });

      assert.isTrue(isPaging);
    });

    it("should return true when the operation has a lropaging discriminator", function () {
      const isPaging = isPagingOperation({
        ...baseOperation,
        discriminator: "lropaging"
      });

      assert.isTrue(isPaging);
    });

    it("should return false when the operation has a lro discriminator", function () {
      const isPaging = isPagingOperation({
        ...baseOperation,
        discriminator: "lro"
      });

      assert.isFalse(isPaging);
    });
  });

  describe("isLROOperation", () => {
    const baseOperation: Operation = {
      apiVersions: [],
      description: "",
      discriminator: "",
      exceptions: [],
      groupName: "",
      isOverload: false,
      method: "GET",
      name: "getFoo",
      namespaceHierarchies: [],
      overloads: [],
      parameters: [],
      responses: [],
      summary: "",
      url: ""
    };

    it("should return true when the operation has a lro discriminator", function () {
      const isLRO = isLROOperation({
        ...baseOperation,
        discriminator: "lro"
      });

      assert.isTrue(isLRO);
    });

    it("should return true when the operation has a lropaging discriminator", function () {
      const isLRO = isLROOperation({
        ...baseOperation,
        discriminator: "lropaging"
      });

      assert.isTrue(isLRO);
    });

    it("should return false when the operation has a paging discriminator", function () {
      const isLRO = isLROOperation({
        ...baseOperation,
        discriminator: "paging"
      });

      assert.isFalse(isLRO);
    });
  });

  describe("deserializeResponseValue", () => {
    describe("datetime", () => {
      it("should deserialize datetime to a Date object", () => {
        const deserializedValue = deserializeResponseValue(
          { type: "datetime", format: "rfc3339" },
          `fooDate`,
          {} as any,
          true,
          []
        );

        assert.equal(deserializedValue, `new Date(fooDate)`);
      });

      it("should deserialize datetime to a Date object with nullchecks", () => {
        const testType: Type = { type: "datetime", format: "rfc3339" };
        const deserializedValue = deserializeResponseValue(
          testType,
          `fooDate`,
          {} as any,
          false,
          []
        );

        assert.equal(
          deserializedValue,
          `fooDate !== undefined? new Date(fooDate): undefined`
        );
      });
    });

    describe("list", () => {
      it("should map each element directly with the rlc type when the element type is a model", () => {
        const deserializedValue = deserializeResponseValue(
          {
            type: "list",
            elementType: {
              type: "model",
              properties: [
                {
                  clientName: "myFoo",
                  description: "",
                  restApiName: "foo",
                  type: { type: "string" }
                }
              ]
            }
          },
          "fooList",
          {} as any,
          true,
          []
        );

        assert.equal(
          deserializedValue,
          `fooList.map(p => ({"myFoo": p["foo"]}))`
        );
      });

      it("should map each element directly with the rlc type when the element type is a model and nullchecks", () => {
        const deserializedValue = deserializeResponseValue(
          {
            type: "list",
            elementType: {
              type: "model",
              properties: [
                {
                  clientName: "myFoo",
                  description: "",
                  restApiName: "foo",
                  type: { type: "string" }
                }
              ]
            }
          },
          "fooList",
          {} as any,
          false,
          []
        );

        assert.equal(
          deserializedValue,
          `fooList === undefined ? fooList : fooList.map(p => ({"myFoo": p["foo"]}))`
        );
      });

      it("should deep map each element directly with the rlc type when the element type is a model", () => {
        const deserializedValue = deserializeResponseValue(
          {
            type: "list",
            elementType: {
              type: "model",
              properties: [
                {
                  clientName: "myFoo",
                  description: "",
                  restApiName: "foo",
                  type: {
                    type: "model",
                    properties: [
                      {
                        clientName: "myBar",
                        description: "",
                        restApiName: "bar",
                        type: { type: "string" }
                      }
                    ]
                  }
                }
              ]
            }
          } as any,
          "foo",
          {} as any,
          true,
          []
        );

        assert.equal(
          deserializedValue,
          `foo.map(p => ({"myFoo":   {"myBar": p.foo["bar"]}}))`
        );
      });

      it("should map each element directly with the rlc type when the element type is a polymorphic union", () => {
        // TODO inplement this tests
        assert.equal(1, 1);
      });

      it("should deserialize datetime elemets to a Date object", () => {
        const deserializedValue = deserializeResponseValue(
          {
            type: "list",
            elementType: { type: "datetime" }
          } as any,
          "foo",
          {} as any,
          true,
          []
        );

        assert.equal(deserializedValue, `foo.map(p => new Date(p))`);
      });

      it("should deserialize datetime elemets to a Date object and nullchecks", () => {
        const deserializedValue = deserializeResponseValue(
          {
            type: "list",
            elementType: { type: "datetime" }
          } as any,
          "foo",
          {} as any,
          false,
          []
        );

        assert.equal(
          deserializedValue,
          `foo === undefined ? foo : foo.map(p => new Date(p))`
        );
      });

      it("should return the client value directly", () => {
        const deserializedValue = deserializeResponseValue(
          {
            type: "list",
            elementType: { type: "string" }
          } as any,
          "foo",
          {} as any,
          true,
          []
        );

        assert.equal(deserializedValue, "foo");
      });
    });
  });

  describe("getResponseMapping", () => {
    it("should return the response mapping for a model", () => {
      const responseMapping = getResponseMapping(
        {
          type: "model",
          properties: [
            {
              clientName: "myBar",
              description: "",
              restApiName: "bar",
              type: { type: "string" }
            }
          ]
        },
        "foo",
        {} as any
      );

      assert.deepEqual(responseMapping, [`"myBar": foo["bar"]`]);
    });

    it("should map nested models", () => {
      const responseMapping = getResponseMapping(
        {
          type: "model",
          properties: [
            {
              clientName: "myBar",
              description: "",
              restApiName: "bar",
              type: {
                type: "model",
                properties: [
                  {
                    clientName: "myBaz",
                    description: "",
                    restApiName: "baz",
                    type: { type: "string" }
                  }
                ]
              }
            }
          ]
        },
        "foo",
        {} as any
      );

      assert.deepEqual(responseMapping, [
        `"myBar":   {"myBaz": foo.bar["baz"]}`
      ]);
    });

    it("should map nested models without infinite loops", () => {
      const responseMapping = getResponseMapping(
        {
          type: "model",
          properties: [
            {
              clientName: "myBar",
              description: "",
              restApiName: "bar",
              type: {
                type: "model",
                properties: [
                  {
                    clientName: "myBaz",
                    description: "",
                    restApiName: "baz",
                    type: { type: "string" }
                  }
                ]
              }
            }
          ]
        },
        "foo",
        {} as any
      );

      assert.deepEqual(responseMapping, [
        `"myBar":   {"myBaz": foo.bar["baz"]}`
      ]);
    });
  });
});
