import { exec } from "child_process";
import { json } from "express";
import { TracingInfo } from "../../src/models/clientDetails";

interface SwaggerConfig {
  swagger: string;
  clientName: string;
  packageName: string;
  addCredentials?: boolean;
  licenseHeader?: boolean;
  tracing?: TracingInfo;
}

const package_version = "1.0.0-preview1";
let whiteList: string[] = [];

const testSwaggers: { [name: string]: SwaggerConfig } = {
  additionalProperties: {
    swagger: "additionalProperties.json",
    clientName: "AdditionalPropertiesClient",
    packageName: "additional-properties",
    licenseHeader: true
  },
  arrayConstraints: {
    swagger: "test/integration/swaggers/arrayConstraints.json",
    clientName: "ArrayConstraintsClient",
    packageName: "array-constraints-client",
    licenseHeader: true
  },
  azureParameterGrouping: {
    swagger: "azure-parameter-grouping.json",
    clientName: "AzureParameterGroupingClient",
    packageName: "azure-parameter-grouping",
    licenseHeader: true
  },
  azureReport: {
    swagger: "azure-report.json",
    clientName: "ReportClient",
    packageName: "zzzAzureReport",
    licenseHeader: true
  },
  azureSpecialProperties: {
    swagger: "azure-special-properties.json",
    clientName: "AzureSpecialPropertiesClient",
    packageName: "azure-special-properties",
    licenseHeader: true,
    addCredentials: true
  },
  bodyArray: {
    swagger: "body-array.json",
    clientName: "BodyArrayClient",
    packageName: "body-array",
    licenseHeader: true
  },
  bodyBoolean: {
    swagger: "body-boolean.json",
    clientName: "BodyBooleanClient",
    packageName: "body-boolean",
    licenseHeader: true
  },
  bodyBooleanQuirks: {
    swagger: "body-boolean.quirks.json",
    clientName: "BodyBooleanQuirksClient",
    packageName: "body-boolean-quirks",
    licenseHeader: true
  },
  bodyByte: {
    swagger: "body-byte.json",
    clientName: "BodyByteClient",
    packageName: "body-byte",
    licenseHeader: true
  },
  bodyComplex: {
    swagger: "body-complex.json",
    clientName: "BodyComplexClient",
    packageName: "body-complex",
    licenseHeader: true
  },
  bodyComplexWithTracing: {
    swagger: "body-complex.json",
    clientName: "bodyComplexWithTracing",
    packageName: "body-complex-tracing",
    licenseHeader: true,
    tracing: {
      namespace: "Microsoft.Body.Complex",
      packagePrefix: "Azure.Body.Complex"
    }
  },
  bodyDate: {
    swagger: "body-date.json",
    clientName: "BodyDateClient",
    packageName: "body-date",
    licenseHeader: true
  },
  bodyDateTime: {
    swagger: "body-datetime.json",
    clientName: "BodyDateTimeClient",
    packageName: "body-datetime",
    licenseHeader: true
  },
  bodyDateTimeRfc1123: {
    swagger: "body-datetime-rfc1123.json",
    clientName: "BodyDateTimeRfc1123Client",
    packageName: "body-datetime-rfc1123",
    licenseHeader: true
  },
  bodyDictionary: {
    swagger: "body-dictionary.json",
    clientName: "BodyDictionaryClient",
    packageName: "body-dictionary",
    licenseHeader: true
  },
  bodyDuration: {
    swagger: "body-duration.json",
    clientName: "BodyDurationClient",
    packageName: "body-duration",
    licenseHeader: true
  },
  bodyFile: {
    swagger: "body-file.json",
    clientName: "BodyFileClient",
    packageName: "body-file",
    licenseHeader: true
  },
  bodyInteger: {
    swagger: "body-integer.json",
    clientName: "BodyIntegerClient",
    packageName: "body-integer",
    licenseHeader: true
  },
  bodyNumber: {
    swagger: "body-number.json",
    clientName: "BodyNumberClient",
    packageName: "body-number",
    licenseHeader: true
  },
  bodyString: {
    swagger: "body-string.json",
    clientName: "BodyStringClient",
    packageName: "body-string",
    licenseHeader: true
  },
  bodyTime: {
    swagger: "body-time.json",
    clientName: "BodyTimeClient",
    packageName: "body-time",
    licenseHeader: true
  },
  customUrl: {
    swagger: "custom-baseUrl.json",
    clientName: "CustomUrlClient",
    packageName: "custom-url",
    licenseHeader: true
  },
  customUrlMoreOptions: {
    swagger: "custom-baseUrl-more-options.json",
    clientName: "CustomUrlMoreOptionsClient",
    packageName: "custom-url-MoreOptions",
    licenseHeader: true
  },
  customUrlPaging: {
    swagger: "custom-baseUrl-paging.json",
    clientName: "CustomUrlPagingClient",
    packageName: "custom-url-paging",
    licenseHeader: true
  },
  header: {
    swagger: "header.json",
    clientName: "HeaderClient",
    packageName: "header",
    licenseHeader: true
  },
  httpInfrastructure: {
    swagger: "httpInfrastructure.json",
    clientName: "HttpInfrastructureClient",
    packageName: "httpInfrastructure",
    licenseHeader: true
  },
  lro: {
    swagger: "lro.json",
    clientName: "LROClient",
    packageName: "lro",
    licenseHeader: true
  },
  lroParametrizedEndpoints: {
    swagger: "lro-parameterized-endpoints.json",
    clientName: "LroParametrizedEndpointsClient",
    packageName: "lro-parameterized-endpoints",
    licenseHeader: true
  },
  mediaTypes: {
    swagger: "media_types.json",
    clientName: "MediaTypesClient",
    packageName: "media-types-service",
    licenseHeader: true
  },
  mediaTypesWithTracing: {
    swagger: "media_types.json",
    clientName: "mediaTypesWithTracingClient",
    packageName: "media-types-service-tracing",
    licenseHeader: true,
    tracing: {
      namespace: "Microsoft.Media.Types",
      packagePrefix: "Azure.Media.Types"
    }
  },
  mediaTypesV3: {
    swagger: "test/integration/swaggers/media-types-v3.json",
    clientName: "MediaTypesV3Client",
    packageName: "media-types-v3-client",
    licenseHeader: true
  },
  mediaTypesV3Lro: {
    swagger: "test/integration/swaggers/media-types-v3-lro.json",
    clientName: "MediaTypesV3LROClient",
    packageName: "media-types-v3-lro-client",
    licenseHeader: true
  },
  modelFlattening: {
    swagger: "model-flattening.json",
    clientName: "ModelFlatteningClient",
    packageName: "model-flattening",
    licenseHeader: true
  },
  multipleInheritance: {
    swagger: "multiple-inheritance.json",
    clientName: "MultipleInheritanceClient",
    packageName: "multiple-inheritance",
    licenseHeader: true
  },
  noMappers: {
    swagger: "test/integration/swaggers/no-mappers.json",
    clientName: "NoMappersClient",
    packageName: "no-mappers",
    licenseHeader: true
  },
  nonStringEnum: {
    swagger: "non-string-enum.json",
    clientName: "NonStringEnumClient",
    packageName: "non-string-num",
    licenseHeader: true
  },
  objectType: {
    swagger: "object-type.json",
    clientName: "ObjectTypeClient",
    packageName: "object-type",
    licenseHeader: true
  },
  paging: {
    swagger: "paging.json",
    clientName: "PagingClient",
    packageName: "paging-service",
    licenseHeader: true
  },
  requiredOptional: {
    swagger: "required-optional.json",
    clientName: "RequiredOptionalClient",
    packageName: "required-optional",
    licenseHeader: true
  },
  regexConstraint: {
    swagger: "test/integration/swaggers/regex-constraint.json",
    clientName: "RegexConstraint",
    packageName: "regex-constraint",
    licenseHeader: true
  },
  report: {
    swagger: "report.json",
    clientName: "ReportClient",
    packageName: "zzzReport",
    licenseHeader: true
  },
  uuid: {
    swagger: "test/integration/swaggers/uuid.json",
    clientName: "UuidClient",
    packageName: "uuid",
    licenseHeader: true
  },
  url: {
    swagger: "url.json",
    clientName: "UrlClient",
    packageName: "url",
    licenseHeader: true
  },
  urlMulti: {
    swagger: "url-multi-collectionFormat.json",
    clientName: "UrlMultiClient",
    packageName: "url-multi",
    licenseHeader: true
  },
  url2: {
    swagger: "test/integration/swaggers/url.json",
    clientName: "UrlClient",
    packageName: "url",
    licenseHeader: true
  },
  xmlservice: {
    swagger: "xml-service.json",
    clientName: "XmlServiceClient",
    packageName: "xml-service",
    licenseHeader: true
  },
  noLicenseHeader: {
    swagger: "test/integration/swaggers/license-header.json",
    clientName: "NoLicenseHeaderClient",
    packageName: "nolicense-header"
  },
  licenseHeader: {
    swagger: "test/integration/swaggers/license-header.json",
    clientName: "LicenseHeaderClient",
    packageName: "license-header",
    licenseHeader: true
  },
  subscriptionIdApiVersion: {
    swagger: "subscriptionId-apiVersion.json",
    clientName: "SubscriptionIdApiVersionClient",
    packageName: "subscriptionid-apiversion",
    licenseHeader: true
  },
  bodyFormData: {
    swagger: "body-formdata.json",
    clientName: "BodyFormDataClient",
    packageName: "body-formdata",
    licenseHeader: true
  },
  validation: {
    swagger: "validation.json",
    clientName: "ValidationClient",
    packageName: "validation",
    licenseHeader: true
  },
  extensibleEnums: {
    swagger: "extensible-enums-swagger.json",
    clientName: "ExtensibleEnumsClient",
    packageName: "extensible-enums",
    licenseHeader: true
  },
  xmsErrorResponses: {
    swagger: "xms-error-responses.json",
    clientName: "XmsErrorResponsesClient",
    packageName: "xms-error-responses",
    licenseHeader: true
  }
};

const generateSwaggers = async (
  whiteList?: string[],
  isDebugging?: boolean
) => {
  const swaggers = Object.keys(testSwaggers).filter(name => {
    if (!whiteList || !whiteList.length) {
      return true;
    }
    return whiteList.includes(name);
  });

  for (let name of swaggers) {
    const {
      addCredentials,
      clientName,
      swagger,
      packageName,
      licenseHeader,
      tracing
    } = testSwaggers[name];

    let swaggerPath = swagger;

    const tracingInfo = tracing
      ? `--tracing-info.namespace=${tracing.namespace} --tracing-info.packagePrefix=${tracing.packagePrefix}`
      : "";

    if (swagger.split("/").length === 1) {
      // When given a filename look for it in test server, otherwise use the path
      swaggerPath = `node_modules/@microsoft.azure/autorest.testserver/swagger/${swagger}`;
    }

    let autorestCommand = `autorest --clear-output-folder=true ${tracingInfo} --license-header=${!!licenseHeader} --add-credentials=${!!addCredentials} --typescript --output-folder=./test/integration/generated/${name} --use=. --title=${clientName} --input-file=${swaggerPath} --package-name=${packageName} --package-version=${package_version}`;

    if (isDebugging) {
      autorestCommand = `${autorestCommand} --typescript.debugger`;
    }

    const generationTask = () => {
      return new Promise<void>((resolve, reject) => {
        exec(autorestCommand, (error, stdout, stderr) => {
          if (error) {
            reject(`Failed to generate ${name} with error: \n ${error}`);
            return;
          }
          console.log(`=== Start ${name} ===`);
          console.log(stdout);
          stderr && console.error(stderr);
          console.log(`=== End ${name} ===`);
          resolve();
        });
      });
    };

    try {
      await generationTask();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

const buildWhitelist = () =>
  process.argv.forEach((arg, index) => {
    if (arg !== "--include" && arg !== "-i") {
      return;
    }

    const includesValue = process.argv[index + 1];
    if (!includesValue) {
      console.warn(
        "No valid include list provided, generating all test swaggers"
      );
      return;
    }

    const swaggers = includesValue.split(",");

    swaggers.forEach(swagger => {
      const validSwaggers = Object.keys(testSwaggers);
      if (!validSwaggers.includes(swagger)) {
        throw new Error(
          `Unknown swagger ${swagger}, valid swaggers: \n ${JSON.stringify(
            validSwaggers
          )}`
        );
      }

      whiteList.push(swagger);
    });
  });

const buildAutorest = () => {
  if (!process.argv.includes("--build") && !process.argv.includes("-b")) {
    console.warn(
      "Not building Autorest.Typescript, use --build or -b to build"
    );
    return Promise.resolve();
  }

  return new Promise<void>((resolve, reject) => {
    console.log("Building Autorest.Typescript");
    exec("npm run build", (error, stdout, stderror) => {
      if (error) {
        reject(
          `Failed to build autorest.typescript \n ${JSON.stringify(error)}`
        );
        return;
      }

      console.log(stdout);
      stderror && console.error(stderror);
      resolve();
    });
  });
};

const run = async () => {
  const isDebugging = process.argv.indexOf("--debug") !== -1;
  buildWhitelist();
  await buildAutorest();
  await generateSwaggers(whiteList, isDebugging);
};

run().catch(error => {
  console.error(error);
  process.exit(-1000);
});
