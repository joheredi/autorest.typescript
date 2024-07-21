import {
  SdkPackage,
  SdkHttpOperation,
  SdkContext
} from "@azure-tools/typespec-client-generator-core";
import { beforeAll, assert, it, describe, expect } from "vitest";
import { provideContext } from "../../../src/contextManager.js";
import { provideSdkTypes } from "../../../src/framework/hooks/sdkTypes.js";
import { emitType } from "../../../src/next/emitType.js";
import { createSdkContextFromTypespec } from "../test-hots.js";
import { provideBinder } from "../../../src/framework/hooks/binder.js";
import { expectEqualCode } from "../../utils/code-utils.js";

describe("Emit types ", () => {
  let sdkPackage: SdkPackage<SdkHttpOperation>;
  let sdkContext: SdkContext;

  describe("emitTypes from client", () => {
    it("should handle KeyCredentia", async () => {
      const spec = `
        @service({
        title: "Contoso Widget Manager",
        })
        @useAuth(ApiKeyAuth<ApiKeyLocation.header, "x-ms-api-key">)
        @server(
        "{endpoint}/widget",
        "Contoso Widget APIs",
        {
            /** 
        Supported Widget Services endpoints (protocol and hostname, for example:
        https://westus.api.widget.contoso.com).
        */
            endpoint: string,
        }
        )
        namespace Contoso.WidgetManager;
        `;

      sdkContext = await createSdkContextFromTypespec(spec, {
        skipServiceSpecPrepend: true
      });
      sdkPackage = sdkContext.sdkPackage;
      provideBinder();
      provideSdkTypes(sdkPackage);
      provideContext("emitContext", {
        tcgcContext: sdkContext,
        compilerContext: sdkContext.emitContext as any
      });

      const client = sdkPackage.clients[0];
      const credential = client.initialization.properties.find(
        (p) => p.kind === "credential"
      );
      assert(credential);
      const credentialType = emitType(credential.type);
      expect(credentialType).toBe("KeyCredential");
    });

    it("should handle http credential", async () => {
      const spec = `
          @service({
          title: "Contoso Widget Manager",
          })
          @useAuth(BasicAuth)
          @server(
          "{endpoint}/widget",
          "Contoso Widget APIs",
          {
              /** 
          Supported Widget Services endpoints (protocol and hostname, for example:
          https://westus.api.widget.contoso.com).
          */
              endpoint: string,
          }
          )
          namespace Contoso.WidgetManager;
          `;

      sdkContext = await createSdkContextFromTypespec(spec, {
        skipServiceSpecPrepend: true
      });
      sdkPackage = sdkContext.sdkPackage;
      provideBinder();
      provideSdkTypes(sdkPackage);
      provideContext("emitContext", {
        tcgcContext: sdkContext,
        compilerContext: sdkContext.emitContext as any
      });

      const client = sdkPackage.clients[0];
      const credential = client.initialization.properties.find(
        (p) => p.kind === "credential"
      );
      assert(credential);
      const credentialType = emitType(credential.type);
      expect(credentialType).toBe("KeyCredential");

      const endpoint = client.initialization.properties.find(
        (p) => p.kind === "endpoint"
      );

      assert(endpoint);
      const endpointType = emitType(endpoint.type);
      expect(endpointType).toBe("string");
    });

    it("should handle oauth2 credential", async () => {
      const spec = `
        @server("http://localhost:3000", "endpoint")
        @useAuth(OAuth2Auth<[MyFlow]>)
        @service({})
        namespace My.Service;

        model MyFlow {
          type: OAuth2FlowType.implicit;
          authorizationUrl: "https://login.microsoftonline.com/common/oauth2/authorize";
          scopes: ["https://security.microsoft.com/.default"];
        }
            `;

      sdkContext = await createSdkContextFromTypespec(spec, {
        skipServiceSpecPrepend: true
      });
      sdkPackage = sdkContext.sdkPackage;
      provideBinder();
      provideSdkTypes(sdkPackage);
      provideContext("emitContext", {
        tcgcContext: sdkContext,
        compilerContext: sdkContext.emitContext as any
      });

      const client = sdkPackage.clients[0];
      const credential = client.initialization.properties.find(
        (p) => p.kind === "credential"
      );
      assert(credential);
      const credentialType = emitType(credential.type);
      expect(credentialType).toBe("TokenCredential");
    });

    it("should handle openidconnect credential", async () => {
      const spec = `
          @server("http://localhost:3000", "endpoint")
          @useAuth(OpenIdConnectAuth<"http://example.com/well-known/openid-configuration">)
          @service({})
          namespace My.Service;
              `;

      sdkContext = await createSdkContextFromTypespec(spec, {
        skipServiceSpecPrepend: true
      });
      sdkPackage = sdkContext.sdkPackage;
      provideBinder();
      provideSdkTypes(sdkPackage);
      provideContext("emitContext", {
        tcgcContext: sdkContext,
        compilerContext: sdkContext.emitContext as any
      });

      const client = sdkPackage.clients[0];
      const credential = client.initialization.properties.find(
        (p) => p.kind === "credential"
      );
      assert(credential);
      const credentialType = emitType(credential.type);
      expect(credentialType).toBe("TokenCredential");
    });

    it("should handle unknown credential", async () => {
      const spec = `
            @server("http://localhost:3000", "endpoint")
            @useAuth(OpenIdConnectAuth<"http://example.com/well-known/openid-configuration">)
            @service({})
            namespace My.Service;
                `;

      sdkContext = await createSdkContextFromTypespec(spec, {
        skipServiceSpecPrepend: true
      });
      sdkPackage = sdkContext.sdkPackage;
      provideBinder();
      provideSdkTypes(sdkPackage);
      provideContext("emitContext", {
        tcgcContext: sdkContext,
        compilerContext: sdkContext.emitContext as any
      });

      const client = sdkPackage.clients[0];
      const credential = client.initialization.properties.find(
        (p) => p.kind === "credential"
      );
      assert(credential);
      // There should be no way to naturally get an unknown credential so we are injecting an invalid kind.
      (credential.type as any).scheme.type = "unknown";
      const credentialType = emitType(credential.type);
      expect(credentialType).toBe("any");
    });
  });

  describe("emit types", () => {
    beforeAll(async () => {
      const spec = ` 
            @usage(Usage.input | Usage.output)
            @access(Access.public)
             enum StringEnum {
                ONE: "one";
                TWO: "two";
             };
    
            @usage(Usage.input | Usage.output)
            @access(Access.public)
             enum NumericEnum {
                ONE: 1;
                TWO: 2;
             };

            @usage(Usage.input | Usage.output)
            @access(Access.public)
            model EnumModel {
                stringEnum: StringEnum;
            }

            @usage(Usage.input | Usage.output)
            @access(Access.public)
             model NumericModel {
                integerProperty: integer;
                int8Property: int8;
                int16Property: int16;
                int32Property: int32;
                int64Property: int64;
                decimalProperty: decimal;
                decimal128Property: decimal128;
                floatProperty: float;
                float32Property: float32;
                float64Property: float64;
                uint8Property: uint8;
                uint16Property: uint16;
                uint32Property: uint32;
                uint64Property: uint64;
                numericProperty: numeric;
                safeintProperty: safeint;
                numericLiteralProperty: 13;
             };
    
            @usage(Usage.input | Usage.output)
            @access(Access.public)
            /** My model for testing */
            model StringModel {
                /** test property */
                stringProperty: string;
                /** test property */
                urlProperty: url;
                /** test property */
                guidProperty: uuid;
                /** test property */
                eTagProperty: eTag;
                /** test property */
                ipV4AddressProperty: ipV4Address;
                /** test property */
                ipV6AddressProperty: ipV6Address;
                /** test property */
                armIdProperty: armResourceIdentifier;
                 /** test property */
                azureLocationProperty: azureLocation;
                /** test property */
                literalStringProperty: "hello";
            };
    
            @usage(Usage.input | Usage.output)
            @access(Access.public)
            /** My model for testing */
            model BooleanModel {
                /** test property */
                booleanProperty: boolean;
                /** test property */
                booleanLiteralProperty: true;
                /** test property */
                booleanWithDefaultProperty: boolean = true;
            };

            @usage(Usage.input | Usage.output)
            @access(Access.public)
            model BytesModel {
                    bytesProperty: bytes;
                    @encode(BytesKnownEncoding.base64)
                    bytesAsB64Property: bytes;
                    @encode(BytesKnownEncoding.base64url)
                    bytesAsB64UrlProperty: bytes;
            }

            @usage(Usage.input | Usage.output)
            @access(Access.public)
            /** My model for testing */
            model DateTimeModel {
                /** Test */
                utcDateTimeProperty: utcDateTime;
                /** Test */
                @encode(DateTimeKnownEncoding.unixTimestamp, int32)
                utcDateTimeUnixProperty: utcDateTime;
                /** Test */
                @encode(DateTimeKnownEncoding.rfc3339)
                utcDateTimeRfc3339Property: utcDateTime;
                /** Test */
                plainDateProperty: plainDate;
                /** Test */
                plainTimeProperty: plainTime;
                /** Test */
                offsetDateTimeProperty: offsetDateTime;
                /** Test */
                durationProperty: duration;
                /** Test */
                @encode(DurationKnownEncoding.seconds, int32)
                durationSecodsProperty: duration;
            }

            @usage(Usage.input | Usage.output)
            @access(Access.public)
            model DictionaryModel {
                dictProperty: Record<string>;
                dictArrayProperty: Record<string[]>;
                dictDictProperty: Record<Record<string>>;
                dictModelProperty: Record<Foo>;
                dictNullableProperty: Record<string> | null;
                dictValueNullableProperty: Record<string | null>;
                dictValueNullableNested: Record<Record<string | null>>;
            }

                model Foo {
                    bar: string;
                }


                @usage(Usage.input | Usage.output)
                @access(Access.public)
                union ClosedStringUnion {
                    "one",
                    "two",
                    "three"
                };

                @usage(Usage.input | Usage.output)
                @access(Access.public)
                model UnionModel {
                    refUnionProperty: ClosedStringUnion;
                    inlineUnionProperty: "one" | "two" | "three";
                    inlineMixedUnionProperty: "one" | "two" | 3;
                    inlineMixedUnionProperty2: "one" | 2 | ClosedStringUnion;
                }

                model RefModel {
                    foo: string;
                }

                @usage(Usage.input | Usage.output)
                @access(Access.public)
                model ModelsModel {
                    modelProperty: RefModel;
                    cyclicModelProperty: ModelsModel;
                    inlineModel: {bar: int32}
                }

                @usage(Usage.input | Usage.output)
                @access(Access.public)
                model UnknownModel {
                   unknownProperty: unknown;
                }

                @usage(Usage.input | Usage.output)
                @access(Access.public)
                model TupleModel {
                    scopes: ["https://security.microsoft.com/.default"];
                    test: [int32, string]
                }
                
            `;
      sdkContext = await createSdkContextFromTypespec(spec, {});
      sdkPackage = sdkContext.sdkPackage;
      provideBinder();
      provideSdkTypes(sdkPackage);
      provideContext("emitContext", {
        tcgcContext: sdkContext,
        compilerContext: sdkContext.emitContext as any
      });
    });

    it("should emit an anonymous string enum", async () => {
      const stringEnum = sdkPackage.enums.find((e) => e.name === "StringEnum");
      assert(stringEnum);

      const result = emitType(stringEnum, { emitInline: true });

      assert.equal(result, `("one" | "two")`);
    });

    it("should emit a string enum", async () => {
      const stringEnum = sdkPackage.enums.find((e) => e.name === "StringEnum");
      assert(stringEnum);

      const result = emitType(stringEnum);

      expect(result).toMatch(/^PLACEHOLDER:(.*)$/);
    });

    it("should emit a numeric anonymous enum", async () => {
      const numericEnum = sdkPackage.enums.find(
        (e) => e.name === "NumericEnum"
      );
      assert(numericEnum);

      const result = emitType(numericEnum, { emitInline: true });

      assert.equal(result, `(1 | 2)`);
    });

    it("should emit a numeric enum", async () => {
      const numericEnum = sdkPackage.enums.find(
        (e) => e.name === "NumericEnum"
      );
      assert(numericEnum);

      const result = emitType(numericEnum);
      expect(result).toMatch(/^PLACEHOLDER:(.*)$/);
    });

    it("should emit the right types for string types", async () => {
      const testModel = sdkPackage.models.find((a) => a.name === "StringModel");
      assert(testModel);

      const stringProperty = testModel.properties.find(
        (p) => p.name === "stringProperty"
      );
      assert(stringProperty);
      expect(emitType(stringProperty.type)).toBe("string");

      const urlProperty = testModel.properties.find(
        (p) => p.name === "urlProperty"
      );
      assert(urlProperty);
      expect(emitType(urlProperty.type)).toBe("string");

      const guidProperty = testModel.properties.find(
        (p) => p.name === "guidProperty"
      );
      assert(guidProperty);
      expect(emitType(guidProperty.type)).toBe("string");

      const eTagProperty = testModel.properties.find(
        (p) => p.name === "eTagProperty"
      );
      assert(eTagProperty);
      expect(emitType(eTagProperty.type)).toBe("string");

      const ipV4AddressProperty = testModel.properties.find(
        (p) => p.name === "ipV4AddressProperty"
      );
      assert(ipV4AddressProperty);
      expect(emitType(ipV4AddressProperty.type)).toBe("string");

      const ipV6AddressProperty = testModel.properties.find(
        (p) => p.name === "ipV6AddressProperty"
      );
      assert(ipV6AddressProperty);
      expect(emitType(ipV6AddressProperty.type)).toBe("string");

      const literalStringProperty = testModel.properties.find(
        (p) => p.name === "literalStringProperty"
      );
      assert(literalStringProperty);
      expect(emitType(literalStringProperty.type)).toBe(`"hello"`);
    });

    it("should handle boolean types", async () => {
      const testModel = sdkPackage.models.find(
        (a) => a.name === "BooleanModel"
      );
      assert(testModel);

      const booleanProperty = testModel.properties.find(
        (p) => p.name === "booleanProperty"
      );
      assert(booleanProperty);
      expect(emitType(booleanProperty.type)).toBe("boolean");

      const booleanLiteralProperty = testModel.properties.find(
        (p) => p.name === "booleanLiteralProperty"
      );
      assert(booleanLiteralProperty);
      expect(emitType(booleanLiteralProperty.type)).toBe("true");

      const booleanWithDefaultProperty = testModel.properties.find(
        (p) => p.name === "booleanWithDefaultProperty"
      );
      assert(booleanWithDefaultProperty);
      expect(emitType(booleanWithDefaultProperty.type)).toBe("boolean");
    });

    it("numeric types", () => {
      const testModel = sdkPackage.models.find(
        (a) => a.name === "NumericModel"
      );
      assert(testModel);

      const integerProperty = testModel.properties.find(
        (p) => p.name === "integerProperty"
      );
      assert(integerProperty);
      expect(emitType(integerProperty.type)).toBe("number");

      const int8Property = testModel.properties.find(
        (p) => p.name === "int8Property"
      );
      assert(int8Property);
      expect(emitType(int8Property.type)).toBe("number");

      const int16Property = testModel.properties.find(
        (p) => p.name === "int16Property"
      );
      assert(int16Property);
      expect(emitType(int16Property.type)).toBe("number");

      const int32Property = testModel.properties.find(
        (p) => p.name === "int32Property"
      );
      assert(int32Property);
      expect(emitType(int32Property.type)).toBe("number");

      const int64Property = testModel.properties.find(
        (p) => p.name === "int64Property"
      );
      assert(int64Property);
      expect(emitType(int64Property.type)).toBe("number");

      const decimalProperty = testModel.properties.find(
        (p) => p.name === "decimalProperty"
      );
      assert(decimalProperty);
      expect(emitType(decimalProperty.type)).toBe("number");

      const decimal128Property = testModel.properties.find(
        (p) => p.name === "decimal128Property"
      );
      assert(decimal128Property);
      expect(emitType(decimal128Property.type)).toBe("number");

      const floatProperty = testModel.properties.find(
        (p) => p.name === "floatProperty"
      );
      assert(floatProperty);
      expect(emitType(floatProperty.type)).toBe("number");

      const float32Property = testModel.properties.find(
        (p) => p.name === "float32Property"
      );
      assert(float32Property);
      expect(emitType(float32Property.type)).toBe("number");

      const float64Property = testModel.properties.find(
        (p) => p.name === "float64Property"
      );
      assert(float64Property);
      expect(emitType(float64Property.type)).toBe("number");

      const uint8Property = testModel.properties.find(
        (p) => p.name === "uint8Property"
      );
      assert(uint8Property);
      expect(emitType(uint8Property.type)).toBe("number");

      const uint16Property = testModel.properties.find(
        (p) => p.name === "uint16Property"
      );
      assert(uint16Property);
      expect(emitType(uint16Property.type)).toBe("number");

      const uint32Property = testModel.properties.find(
        (p) => p.name === "uint32Property"
      );
      assert(uint32Property);
      expect(emitType(uint32Property.type)).toBe("number");

      const uint64Property = testModel.properties.find(
        (p) => p.name === "uint64Property"
      );
      assert(uint64Property);
      expect(emitType(uint64Property.type)).toBe("number");

      const numericProperty = testModel.properties.find(
        (p) => p.name === "numericProperty"
      );
      assert(numericProperty);
      expect(emitType(numericProperty.type)).toBe("number");

      const safeintProperty = testModel.properties.find(
        (p) => p.name === "safeintProperty"
      );
      assert(safeintProperty);
      expect(emitType(safeintProperty.type)).toBe("number");

      const numericLiteralProperty = testModel.properties.find(
        (p) => p.name === "numericLiteralProperty"
      );
      assert(numericLiteralProperty);
      expect(emitType(numericLiteralProperty.type)).toBe("13");
    });

    it("should handle bytes", async () => {
      const testModel = sdkPackage.models.find((a) => a.name === "BytesModel");
      assert(testModel);

      const bytesProperty = testModel.properties.find(
        (p) => p.name === "bytesProperty"
      );
      assert(bytesProperty);
      expect(emitType(bytesProperty.type)).toBe("Uint8Array");

      const bytesAsB64Property = testModel.properties.find(
        (p) => p.name === "bytesAsB64Property"
      );
      assert(bytesAsB64Property);
      expect(emitType(bytesAsB64Property.type)).toBe("Uint8Array");

      const bytesAsB64UrlProperty = testModel.properties.find(
        (p) => p.name === "bytesAsB64UrlProperty"
      );
      assert(bytesAsB64UrlProperty);
      expect(emitType(bytesAsB64UrlProperty.type)).toBe("Uint8Array");
    });

    it("should handle date time types", async () => {
      const testModel = sdkPackage.models.find(
        (a) => a.name === "DateTimeModel"
      );
      assert(testModel);

      const utcDateTimeProperty = testModel.properties.find(
        (p) => p.name === "utcDateTimeProperty"
      );
      assert(utcDateTimeProperty);
      expect(emitType(utcDateTimeProperty.type)).toBe("Date");

      const utcDateTimeUnixProperty = testModel.properties.find(
        (p) => p.name === "utcDateTimeUnixProperty"
      );
      assert(utcDateTimeUnixProperty);
      expect(emitType(utcDateTimeUnixProperty.type)).toBe("Date");

      const utcDateTimeRfc3339Property = testModel.properties.find(
        (p) => p.name === "utcDateTimeRfc3339Property"
      );
      assert(utcDateTimeRfc3339Property);
      expect(emitType(utcDateTimeRfc3339Property.type)).toBe("Date");

      const plainDateProperty = testModel.properties.find(
        (p) => p.name === "plainDateProperty"
      );
      assert(plainDateProperty);
      expect(emitType(plainDateProperty.type)).toBe("string");

      const plainTimeProperty = testModel.properties.find(
        (p) => p.name === "plainTimeProperty"
      );
      assert(plainTimeProperty);
      expect(emitType(plainTimeProperty.type)).toBe("string");

      const offsetDateTimeProperty = testModel.properties.find(
        (p) => p.name === "offsetDateTimeProperty"
      );
      assert(offsetDateTimeProperty);
      expect(emitType(offsetDateTimeProperty.type)).toBe("string");

      const durationProperty = testModel.properties.find(
        (p) => p.name === "durationProperty"
      );
      assert(durationProperty);
      expect(emitType(durationProperty.type)).toBe("string");

      const durationSecodsProperty = testModel.properties.find(
        (p) => p.name === "durationSecodsProperty"
      );
      assert(durationSecodsProperty);
      expect(emitType(durationSecodsProperty.type)).toBe("number");
    });

    it("should handle Dictionaries", async () => {
      const testModel = sdkPackage.models.find(
        (a) => a.name === "DictionaryModel"
      );
      assert(testModel);

      const dictProperty = testModel.properties.find(
        (p) => p.name === "dictProperty"
      );
      assert(dictProperty);
      expect(emitType(dictProperty.type)).toBe("Record<string, string>");

      const dictArrayProperty = testModel.properties.find(
        (p) => p.name === "dictArrayProperty"
      );
      assert(dictArrayProperty);
      expect(emitType(dictArrayProperty.type)).toBe(
        "Record<string, (string)[]>"
      );

      const dictDictProperty = testModel.properties.find(
        (p) => p.name === "dictDictProperty"
      );
      assert(dictDictProperty);
      expect(emitType(dictDictProperty.type)).toBe(
        "Record<string, Record<string, string>>"
      );

      const dictModelProperty = testModel.properties.find(
        (p) => p.name === "dictModelProperty"
      );
      assert(dictModelProperty);
      expect(emitType(dictModelProperty.type)).toMatch(
        /^Record<string, PLACEHOLDER:(.+)>$/
      );

      const dictNullableProperty = testModel.properties.find(
        (p) => p.name === "dictNullableProperty"
      );
      assert(dictNullableProperty);
      expect(emitType(dictNullableProperty.type)).toBe(
        "(Record<string, string>) | null"
      );

      const dictValueNullableProperty = testModel.properties.find(
        (p) => p.name === "dictValueNullableProperty"
      );
      assert(dictValueNullableProperty);
      expect(emitType(dictValueNullableProperty.type)).toBe(
        "Record<string, (string) | null>"
      );

      const dictValueNullableNested = testModel.properties.find(
        (p) => p.name === "dictValueNullableNested"
      );
      assert(dictValueNullableNested);
      expect(emitType(dictValueNullableNested.type)).toBe(
        "Record<string, Record<string, (string) | null>>"
      );
    });

    it("should handle unions", async () => {
      const testModel = sdkPackage.models.find((a) => a.name === "UnionModel");
      assert(testModel);

      const refUnionProperty = testModel.properties.find(
        (p) => p.name === "refUnionProperty"
      );
      assert(refUnionProperty);
      expect(emitType(refUnionProperty.type)).toMatch(/^PLACEHOLDER:(.+)$/);

      const inlineUnionProperty = testModel.properties.find(
        (p) => p.name === "inlineUnionProperty"
      );
      assert(inlineUnionProperty);
      expect(emitType(inlineUnionProperty.type)).toBe(
        `("one" | "two" | "three")`
      );

      const inlineMixedUnionProperty = testModel.properties.find(
        (p) => p.name === "inlineMixedUnionProperty"
      );
      assert(inlineMixedUnionProperty);
      expect(emitType(inlineMixedUnionProperty.type)).toBe(
        `("one" | "two" | 3)`
      );

      const inlineMixedUnionProperty2 = testModel.properties.find(
        (p) => p.name === "inlineMixedUnionProperty2"
      );
      assert(inlineMixedUnionProperty2);
      expect(emitType(inlineMixedUnionProperty2.type)).toMatch(
        /\("one" \| 2 \| PLACEHOLDER:(.+)\)/
      );

      // Test it can undfold unions when emitInline is set to true
      expect(
        emitType(inlineMixedUnionProperty2.type, { emitInline: true })
      ).toBe(`("one" | 2 | ("one" | "two" | "three"))`);
    });

    it("should handle models with enums", async () => {
      const testModel = sdkPackage.models.find((a) => a.name === "EnumModel");
      assert(testModel);

      const stringEnumProperty = testModel.properties.find(
        (p) => p.name === "stringEnum"
      );
      assert(stringEnumProperty);
      expect(emitType(stringEnumProperty.type)).toMatch(/^PLACEHOLDER:(.+)$/);

      // Test it can unfold when emitInline is set to true
      expect(emitType(stringEnumProperty.type, { emitInline: true })).toBe(
        `("one" | "two")`
      );
    });

    it("should handle models with cyclic references", async () => {
      const testModel = sdkPackage.models.find((a) => a.name === "ModelsModel");
      assert(testModel);

      const cyclicModelProperty = testModel.properties.find(
        (p) => p.name === "cyclicModelProperty"
      );
      assert(cyclicModelProperty);
      expect(emitType(cyclicModelProperty.type)).toMatch(/^PLACEHOLDER:(.+)$/);
    });

    it("should handle models with models", async () => {
      const testModel = sdkPackage.models.find((a) => a.name === "ModelsModel");
      assert(testModel);

      const modelProperty = testModel.properties.find(
        (p) => p.name === "modelProperty"
      );
      assert(modelProperty);
      expect(emitType(modelProperty.type)).toMatch(/^PLACEHOLDER:(.+)$/);
    });

    it("should handle models with models inline", async () => {
      const testModel = sdkPackage.models.find((a) => a.name === "ModelsModel");
      assert(testModel);

      const modelProperty = testModel.properties.find(
        (p) => p.name === "modelProperty"
      );
      assert(modelProperty);
      const emittedType = emitType(modelProperty.type, { emitInline: true });
      await expectEqualCode(
        `type test = ${emittedType}`,
        `type test = { 
            foo: string
        }`
      );
    });

    it("should handle models with models inline", async () => {
      const testModel = sdkPackage.models.find((a) => a.name === "ModelsModel");
      assert(testModel);

      const modelProperty = testModel.properties.find(
        (p) => p.name === "inlineModel"
      );
      assert(modelProperty);
      const emittedType = emitType(modelProperty.type);
      await expectEqualCode(
        `type test = ${emittedType}`,
        `type test = { 
            bar: number
        }`
      );
    });

    it("should handle unknown types", async () => {
      const testModel = sdkPackage.models.find(
        (a) => a.name === "UnknownModel"
      );
      assert(testModel);

      const unknownProperty = testModel.properties.find(
        (p) => p.name === "unknownProperty"
      );
      assert(unknownProperty);
      expect(emitType(unknownProperty.type)).toBe("any");
    });

    it("should handle tuple types", async () => {
      const testModel = sdkPackage.models.find((a) => a.name === "TupleModel");
      assert(testModel);

      const testProperty = testModel.properties.find((p) => p.name === "test");
      assert(testProperty);
      expect(emitType(testProperty.type)).toBe("[number, string]");

      const scopesProperty = testModel.properties.find(
        (p) => p.name === "scopes"
      );
      assert(scopesProperty);
      expect(emitType(scopesProperty.type)).toBe(
        `["https://security.microsoft.com/.default"]`
      );
    });

    it("should handle a non-supported kind gracefully", async () => {
      const testModel = sdkPackage.models.find(
        (a) => a.name === "UnknownModel"
      );
      assert(testModel);

      const unknownProperty = testModel.properties.find(
        (p) => p.name === "unknownProperty"
      );

      assert(unknownProperty);
      // Inject an invalid kind
      (unknownProperty.type as any).kind = "unsupported";

      assert(unknownProperty);
      expect(emitType(unknownProperty.type)).toBe("any");
    });
  });
});
