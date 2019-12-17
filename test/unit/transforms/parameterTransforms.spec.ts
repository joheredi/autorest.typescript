import * as assert from "assert";
import {
  Parameter,
  NumberSchema,
  SchemaType,
  ParameterLocation,
  StringSchema,
  ChoiceSchema,
  ChoiceValue,
  ConstantSchema,
  ConstantValue
} from "@azure-tools/codemodel";
import {
  getParameterName,
  getParameterLocation,
  isRequired,
  transformParameter
} from "../../../src/transforms/parameterTransforms";
import { Schema } from "js-yaml";
import { MapperType } from "@azure/core-http";

describe("ParameterTransforms", () => {
  let mockBodyParam: Parameter;
  let mockQueryParam: Parameter;
  let mockPathParam: Parameter;
  let mockHeaderParam: Parameter;
  let mockCookieParam: Parameter;
  let mockUriParam: Parameter;

  beforeEach(() => {
    mockBodyParam = new Parameter(
      "mock-body-parameter",
      "description",
      new NumberSchema("numberParameter", "", SchemaType.Integer, 32),
      { protocol: { http: { in: ParameterLocation.Body } } }
    );

    mockQueryParam = new Parameter(
      "mock-query-parameter",
      "description",
      new StringSchema("stringParameter", ""),
      { protocol: { http: { in: ParameterLocation.Query } } }
    );

    mockPathParam = new Parameter(
      "mock-path-parameter",
      "description",
      new StringSchema("stringParameter", ""),
      {
        protocol: { http: { in: ParameterLocation.Path } }
      }
    );

    mockHeaderParam = new Parameter(
      "mock-header-parameter",
      "description",
      new StringSchema("stringParameter", ""),
      { protocol: { http: { in: ParameterLocation.Header } } }
    );

    mockCookieParam = new Parameter(
      "mock-cookie-parameter",
      "description",
      new StringSchema("stringParameter", ""),
      { protocol: { http: { in: ParameterLocation.Cookie } } }
    );

    mockUriParam = new Parameter(
      "mock-uri-parameter",
      "description",
      new ConstantSchema("stringParameter", "", {
        valueType: new StringSchema("stringValue", ""),
        value: new ConstantValue("defaultValue")
      }),
      { protocol: { http: { in: ParameterLocation.Uri } } }
    );
  });

  describe("tansformParameter", () => {
    it("should correctly transform a body parameter", () => {
      const serializedName = "bodyParameter";

      mockBodyParam.language.default.serializedName = serializedName;
      const result = transformParameter(mockBodyParam);
      assert.deepEqual(result, {
        name: "mockBodyParameter",
        description: "description",
        modelType: SchemaType.Number,
        location: ParameterLocation.Body,
        mapper: {
          serializedName: "numberParameter",
          type: { name: MapperType.Number }
        },
        serializedName
      });
    });

    it("should correctly transform a header parameter", () => {
      const serializedName = "headerParameter";
      mockHeaderParam.language.default.serializedName = serializedName;
      const result = transformParameter(mockHeaderParam);
      assert.deepEqual(result, {
        name: "mockHeaderParameter",
        description: "description",
        modelType: SchemaType.String,
        location: ParameterLocation.Header,
        mapper: {
          serializedName: "stringParameter",
          type: { name: MapperType.String }
        },
        serializedName
      });
    });

    it("should correctly transform a query parameter", () => {
      const serializedName = "queryParameter";
      mockQueryParam.language.default.serializedName = serializedName;
      const result = transformParameter(mockQueryParam);
      assert.deepEqual(result, {
        name: "mockQueryParameter",
        description: "description",
        modelType: SchemaType.String,
        location: ParameterLocation.Query,
        mapper: {
          serializedName: "stringParameter",
          type: { name: MapperType.String }
        },
        serializedName
      });
    });

    it("should correctly transform a path parameter", () => {
      const serializedName = "pathParameter";
      mockPathParam.language.default.serializedName = serializedName;
      const result = transformParameter(mockPathParam);
      assert.deepEqual(result, {
        name: "mockPathParameter",
        description: "description",
        modelType: "string",
        location: ParameterLocation.Path,
        mapper: {
          serializedName: "stringParameter",
          type: { name: MapperType.String }
        },
        serializedName
      });
    });

    it("should correctly transform a uri parameter", () => {
      const serializedName = "uriParameter";
      mockUriParam.language.default.serializedName = serializedName;
      const result = transformParameter(mockUriParam);
      assert.deepEqual(result, {
        name: "mockUriParameter",
        description: "description",
        modelType: "string",
        location: ParameterLocation.Uri,
        mapper: {
          defaultValue: "defaultValue",
          isConstant: true,
          serializedName: "stringParameter",
          type: { name: MapperType.String }
        },
        serializedName
      });
    });

    it("should correctly transform a cookie parameter", () => {
      const serializedName = "cookieParameter";
      mockCookieParam.language.default.serializedName = serializedName;
      const result = transformParameter(mockCookieParam);
      assert.deepEqual(result, {
        name: "mockCookieParameter",
        description: "description",
        modelType: "string",
        location: ParameterLocation.Cookie,
        mapper: {
          serializedName: "stringParameter",
          type: { name: MapperType.String }
        },
        serializedName
      });
    });

    it("should transform parameter with x-ms-requestBody-name extension", () => {
      const overrideName = "overrideName";
      mockBodyParam.extensions = { "x-ms-requestBody-name": overrideName };
      const result = transformParameter(mockBodyParam);
      assert.equal(result.name, overrideName);
    });

    it("should not affect non-body params when x-ms-requestBody-name is set", () => {
      const overrideName = "overrideName";
      mockQueryParam.extensions = { "x-ms-requestBody-name": overrideName };
      const result = transformParameter(mockQueryParam);
      assert.equal(result.name, "mockQueryParameter");
    });

    it("should transform parameter with x-ms-priority extension");
    it("should transform parameter with x-ms-skip-url-encoding extension");

    it("should transform parameter with json style");
    it("should transform parameter with form style");
    it("should transform parameter with spaceDelimited style");
    it("should transform parameter with tabDelimited style");
    it("should transform parameter with pipeDelimited style");
    it("should transform parameter with simple style");
  });

  describe("getParameterName", () => {
    it(" should return a name with camel casing", () => {
      const parameterName = getParameterName(mockBodyParam);
      assert.equal(parameterName, "mockBodyParameter");
    });
  });

  describe("isRequired", () => {
    it("should return false for a constant paramerer", () => {
      const result = isRequired(mockUriParam);
      assert.equal(result, false);
    });

    it("should return true for a parameter marked as required", () => {
      mockBodyParam.required = true;
      const result = isRequired(mockBodyParam);
      assert.equal(result, true);
    });

    it("should return false for a constant paramerer, even when marked as required", () => {
      mockUriParam.required = true;
      const result = isRequired(mockUriParam);
      assert.equal(result, false);
    });

    it("should return false for a parameter not marked as required", () => {
      mockBodyParam.required = false;
      const result = isRequired(mockBodyParam);
      assert.equal(result, false);
    });
  });

  describe("getParameterLocation", () => {
    it("should get body location", () => {
      const location = getParameterLocation(mockBodyParam);
      assert.equal(location, ParameterLocation.Body);
    });

    it("should get header location", () => {
      const location = getParameterLocation(mockHeaderParam);
      assert.equal(location, ParameterLocation.Header);
    });

    it("should get cookie location", () => {
      const location = getParameterLocation(mockCookieParam);
      assert.equal(location, ParameterLocation.Cookie);
    });

    it("should get query location", () => {
      const location = getParameterLocation(mockQueryParam);
      assert.equal(location, ParameterLocation.Query);
    });

    it("should get path location", () => {
      const location = getParameterLocation(mockPathParam);
      assert.equal(location, ParameterLocation.Path);
    });

    it("should get uri location", () => {
      const location = getParameterLocation(mockUriParam);
      assert.equal(location, ParameterLocation.Uri);
    });
  });
});
