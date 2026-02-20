import { Children, code } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import {
  SdkClientType,
  SdkHttpOperationExample,
  SdkHttpParameterExampleValue,
  SdkServiceOperation,
  SdkExampleValue,
  SdkClientInitializationType,
  SdkModelPropertyType,
  isReadOnly
} from "@azure-tools/typespec-client-generator-core";
import {
  isAzurePackage,
  NameType,
  normalizeName
} from "@azure-tools/rlc-common";
import { join } from "path";
import { reportDiagnostic } from "../../lib.js";
import { NoTarget } from "@typespec/compiler";
import {
  buildPropertyNameMapper,
  isSpreadBodyParameter
} from "../helpers/typeHelpers.js";
import { getClassicalClientName } from "../helpers/namingHelpers.js";
import {
  hasKeyCredential,
  hasTokenCredential
} from "../../utils/credentialUtils.js";
import {
  getMethodHierarchiesMap,
  isTenantLevelOperation,
  ServiceOperation
} from "../../utils/operationUtil.js";
import { getSubscriptionId } from "../../transform/transfromRLCOptions.js";
import {
  getClientParametersDeclaration,
  getClientParameters,
  hasDefaultValue,
  getClientParameterName
} from "../helpers/clientHelpers.js";
import { getOperationFunction } from "../helpers/operationHelpers.js";
import { ModelOverrideOptions } from "../serialization/serializeUtils.js";
import { SdkContext } from "../../utils/interfaces.js";
import { SdkTypeContext } from "../../framework/hooks/sdkTypes.js";
import { useSdkTypes as useSdkTypesAlloy } from "./context/SdkContextProvider.js";
import { azureIdentityLib } from "./ExternalPackages.js";
export { hasSamples } from "./sampleUtils.js";

// ── Interfaces ──────────────────────────────────────────────────────────

interface ExampleValue {
  name: string;
  value: string;
  isOptional: boolean;
  onClient: boolean;
}

interface SampleFileData {
  path: string;
  content: string;
  needsAzureIdentity: boolean;
}

interface ComputeSampleOptions {
  topLevelClient: SdkClientType<SdkServiceOperation>;
  classicalMethodPrefix?: string;
  subFolder?: string;
  hierarchies?: string[];
}

// ── Public API ──────────────────────────────────────────────────────────

export interface SamplesProps {
  context: SdkContext;
}

/**
 * Generates sample .ts files for each operation that has examples.
 * Renders one <ts.SourceFile> per sample file.
 */
export function Samples(props: SamplesProps): Children {
  const sdkTypesAlloy = useSdkTypesAlloy();
  const samples = computeAllSamples(props.context, sdkTypesAlloy);
  if (samples.length === 0) return null;

  return (
    <>
      {samples.map((sample) => {
        if (sample.needsAzureIdentity) {
          return (
            <ts.SourceFile path={sample.path}>
              {renderWithCredentialRef(sample.content)}
            </ts.SourceFile>
          );
        }
        return (
          <ts.SourceFile path={sample.path}>{sample.content}</ts.SourceFile>
        );
      })}
    </>
  );
}

// ── Credential reference rendering ──────────────────────────────────────

const CREDENTIAL_MARKER = "\0__AZURE_CREDENTIAL__\0";

/**
 * Replace CREDENTIAL_MARKER occurrences with the Alloy package reference
 * for DefaultAzureCredential. This triggers Alloy's auto-import system.
 */
function renderWithCredentialRef(content: string): Children {
  const parts = content.split(CREDENTIAL_MARKER);
  if (parts.length === 1) return content;
  const raw = [...parts];
  const templateStrings = Object.assign(raw, {
    raw: [...raw]
  }) as TemplateStringsArray;
  const values = new Array(parts.length - 1).fill(
    azureIdentityLib.DefaultAzureCredential
  );
  return code(templateStrings, ...values);
}

// ── Sample computation ──────────────────────────────────────────────────

function computeAllSamples(
  dpgContext: SdkContext,
  sdkTypes: SdkTypeContext
): SampleFileData[] {
  const samples: SampleFileData[] = [];
  const clients = dpgContext.sdkPackage.clients;
  for (const client of clients) {
    computeClientSamples(dpgContext, sdkTypes, client, {
      topLevelClient: client,
      subFolder:
        clients.length > 1
          ? normalizeName(getClassicalClientName(client), NameType.File)
          : undefined
    }).forEach((s) => samples.push(s));
  }
  return samples;
}

function computeClientSamples(
  dpgContext: SdkContext,
  sdkTypes: SdkTypeContext,
  client: SdkClientType<SdkServiceOperation>,
  options: ComputeSampleOptions
): SampleFileData[] {
  const results: SampleFileData[] = [];
  const methodMap = getMethodHierarchiesMap(dpgContext, client);
  for (const [prefixKey, operations] of methodMap) {
    const hierarchies = prefixKey ? prefixKey.split("/") : [];
    const prefix = hierarchies
      .map((name) => normalizeName(name, NameType.Property))
      .join(".");
    for (const op of operations) {
      const sample = computeMethodSample(dpgContext, sdkTypes, op, {
        ...options,
        classicalMethodPrefix: prefix,
        hierarchies
      });
      if (sample) results.push(sample);
    }
  }
  return results;
}

function computeMethodSample(
  dpgContext: SdkContext,
  sdkTypes: SdkTypeContext,
  method: ServiceOperation,
  options: ComputeSampleOptions
): SampleFileData | undefined {
  const examples = method.operation.examples ?? [];
  if (examples.length === 0) return undefined;

  const operationPrefix = `${options.classicalMethodPrefix ?? ""} ${
    method.oriName ?? method.name
  }`;
  const sampleFolder = join("samples-dev", options.subFolder ?? "");
  const fileName = normalizeName(`${operationPrefix} Sample`, NameType.File);
  const filePath = join(sampleFolder, `${fileName}.ts`);

  let needsAzureIdentity = false;
  const lines: string[] = [];

  // Add client import
  if (dpgContext.rlcOptions?.packageDetails?.name) {
    lines.push(
      `import { ${getClassicalClientName(options.topLevelClient)} } from "${dpgContext.rlcOptions.packageDetails.name}";`
    );
    lines.push("");
  }

  const exampleFunctionNames: string[] = [];

  for (const example of examples) {
    const exampleFunctionBody: string[] = [];
    const exampleName = normalizeName(
      escapeSpecialCharToSpace(example.name),
      NameType.Method
    );

    const parameterMap = buildParameterValueMap(example);
    const parameters = prepareExampleParameters(
      dpgContext,
      sdkTypes,
      method,
      parameterMap,
      options.topLevelClient
    );

    // Check if credential uses DefaultAzureCredential
    const credentialParam = parameters.find(
      (p) => p.onClient && p.name === "credential"
    );
    if (credentialParam && credentialParam.value.includes(CREDENTIAL_MARKER)) {
      needsAzureIdentity = true;
    }

    // Client-level parameters
    const clientParamValues = parameters.filter((p) => p.onClient);
    const clientParams: string[] = clientParamValues
      .filter((p) => !p.isOptional)
      .map((param) => {
        exampleFunctionBody.push(`const ${param.name} = ${param.value};`);
        return param.name;
      });
    const optionalClientParams = clientParamValues
      .filter((p) => p.isOptional)
      .map((param) => `${param.name}: ${param.value}`);
    if (optionalClientParams.length > 0) {
      exampleFunctionBody.push(
        `const clientOptions = {${optionalClientParams.join(", ")}};`
      );
      clientParams.push("clientOptions");
    }
    exampleFunctionBody.push(
      `const client = new ${getClassicalClientName(options.topLevelClient)}(${clientParams.join(", ")});`
    );

    // Operation-level parameters - get function signature for ordering
    const operationFunction = getOperationFunction(
      dpgContext,
      [options.hierarchies ?? [], method],
      "Client"
    );
    const signatureParamNames =
      operationFunction.parameters
        ?.filter(
          (p) =>
            p.name !== "context" &&
            !String(p.type || "").includes("OptionalParams")
        )
        .map((p) => p.name) ?? [];

    const methodParamValues = parameters.filter((p) => !p.onClient);
    const paramValueMap = new Map(methodParamValues.map((p) => [p.name, p]));
    const orderedRequiredParams = signatureParamNames
      .map((name) => paramValueMap.get(name))
      .filter((p): p is ExampleValue => p !== undefined && !p.isOptional);

    const methodParams = orderedRequiredParams.map((p) => `${p.value}`);
    const optionalParams = methodParamValues
      .filter((p) => p.isOptional)
      .map((param) => `${param.name}: ${param.value}`);
    if (optionalParams.length > 0) {
      methodParams.push(`{${optionalParams.join(", ")}}`);
    }

    const prefix = options.classicalMethodPrefix
      ? `${options.classicalMethodPrefix}.`
      : "";
    const isPaging = method.kind === "paging";
    const methodCall = `client.${prefix}${normalizeName(method.oriName ?? method.name, NameType.Property)}(${methodParams.join(", ")})`;

    if (isPaging) {
      exampleFunctionBody.push(`const resArray = new Array();`);
      exampleFunctionBody.push(
        `for await (const item of ${methodCall}) { resArray.push(item); }`
      );
      exampleFunctionBody.push(`console.log(resArray);`);
    } else if (method.response.type === undefined) {
      exampleFunctionBody.push(`await ${methodCall};`);
    } else {
      exampleFunctionBody.push(`const result = await ${methodCall};`);
      exampleFunctionBody.push(`console.log(result);`);
    }

    // Build function declaration
    const description =
      method.doc ?? `execute ${method.oriName ?? method.name}`;
    const normalizedDescription =
      description.charAt(0).toLowerCase() + description.slice(1);
    const jsdoc = `/**\n * This sample demonstrates how to ${normalizedDescription}\n *\n * @summary ${normalizedDescription}\n * x-ms-original-file: ${example.filePath}\n */`;

    lines.push(jsdoc);
    lines.push(`async function ${exampleName}(): Promise<void> {`);
    for (const stmt of exampleFunctionBody) {
      lines.push(`  ${stmt}`);
    }
    lines.push(`}`);
    lines.push("");

    exampleFunctionNames.push(exampleName);
  }

  // Add main function
  const functionCalls = exampleFunctionNames
    .map((f) => `  await ${f}();`)
    .join("\n");
  lines.push(`async function main(): Promise<void> {`);
  lines.push(functionCalls);
  lines.push(`}`);
  lines.push("");
  lines.push(`main().catch(console.error);`);

  return {
    path: filePath,
    content: lines.join("\n"),
    needsAzureIdentity
  };
}

// ── Helpers ─────────────────────────────────────────────────────────────

function buildParameterValueMap(example: SdkHttpOperationExample) {
  const parameterMap: Record<string, SdkHttpParameterExampleValue> = {};
  example.parameters.forEach(
    (param) => (parameterMap[param.parameter.serializedName] = param)
  );
  return parameterMap;
}

function prepareExampleValue(
  context: SdkContext,
  sdkTypes: SdkTypeContext,
  name: string,
  value: SdkExampleValue | string,
  isOptional?: boolean,
  onClient?: boolean
): ExampleValue {
  return {
    name: normalizeName(name, NameType.Parameter, true),
    value:
      typeof value === "string"
        ? value
        : getParameterValue(context, sdkTypes, value),
    isOptional: Boolean(isOptional),
    onClient: Boolean(onClient)
  };
}

function prepareExampleParameters(
  dpgContext: SdkContext,
  sdkTypes: SdkTypeContext,
  method: ServiceOperation,
  parameterMap: Record<string, SdkHttpParameterExampleValue>,
  topLevelClient: SdkClientType<SdkServiceOperation>
): ExampleValue[] {
  const result: ExampleValue[] = [];

  const rawClientParams = getClientParameters(topLevelClient, dpgContext, {
    onClientOnly: true
  });

  const clientParams = getClientParametersDeclaration(
    topLevelClient,
    dpgContext,
    { onClientOnly: true }
  );

  const hasParamDefaultValue = (paramName: string) => {
    const rawParam = rawClientParams.find(
      (p) => getClientParameterName(p) === paramName
    );
    if (!rawParam) return false;
    return hasDefaultValue(rawParam);
  };

  for (const param of clientParams) {
    if (param.name === "options" || param.name === "credential") {
      continue;
    }
    if (hasParamDefaultValue(param.name)) {
      continue;
    }

    const exampleValue: ExampleValue = {
      name: param.name === "endpointParam" ? "endpoint" : param.name,
      value: getEnvironmentVariableName(
        param.name,
        getClassicalClientName(topLevelClient)
      ),
      isOptional: Boolean(
        (param as Record<string, unknown>)["hasQuestionToken"]
      ),
      onClient: true
    };
    result.push(exampleValue);
  }

  const credentialExampleValue = getCredentialExampleValue(
    dpgContext,
    topLevelClient.clientInitialization
  );
  if (credentialExampleValue) {
    result.push(credentialExampleValue);
  }

  let subscriptionIdValue = `"00000000-0000-0000-0000-000000000000"`;
  let isSubscriptionIdAdded = false;

  for (const param of method.operation.parameters) {
    if (
      param.optional === true ||
      param.type.kind === "constant" ||
      param.clientDefaultValue
    ) {
      continue;
    }

    const exampleValue = parameterMap[param.serializedName];

    if (param.name.toLowerCase() === "subscriptionid" && dpgContext.arm) {
      isSubscriptionIdAdded = true;
      if (exampleValue && exampleValue.value) {
        subscriptionIdValue = getParameterValue(
          dpgContext,
          sdkTypes,
          exampleValue.value
        );
      }
      result.push(
        prepareExampleValue(
          dpgContext,
          sdkTypes,
          param.name,
          subscriptionIdValue,
          param.optional,
          param.onClient
        )
      );
      continue;
    }

    if (!exampleValue || !exampleValue.value) {
      reportDiagnostic(dpgContext.program, {
        code: "required-sample-parameter",
        format: {
          exampleName: method.oriName ?? method.name,
          paramName: param.name
        },
        target: NoTarget
      });
      continue;
    }

    result.push(
      prepareExampleValue(
        dpgContext,
        sdkTypes,
        exampleValue.parameter.name,
        exampleValue.value,
        param.optional,
        param.onClient
      )
    );
  }

  if (
    dpgContext.arm &&
    getSubscriptionId(dpgContext) &&
    !isSubscriptionIdAdded &&
    !isTenantLevelOperation(method, topLevelClient)
  ) {
    result.push(
      prepareExampleValue(
        dpgContext,
        sdkTypes,
        "subscriptionId",
        subscriptionIdValue,
        false,
        true
      )
    );
  }

  // required/optional body parameters
  const bodyParam = method.operation.bodyParam;
  const bodySerializeName = bodyParam?.serializedName;
  const bodyExample = parameterMap[bodySerializeName ?? ""];
  if (bodyParam && bodyExample && bodyExample.value) {
    if (
      isSpreadBodyParameter(bodyParam) &&
      bodyParam.type.kind === "model" &&
      bodyExample.value.kind === "model"
    ) {
      for (const prop of bodyParam.type.properties) {
        const propExample = bodyExample.value.value[prop.name];
        if (!propExample) continue;
        if (isReadOnly(prop as SdkModelPropertyType)) continue;
        result.push(
          prepareExampleValue(
            dpgContext,
            sdkTypes,
            prop.name,
            propExample,
            prop.optional,
            prop.onClient
          )
        );
      }
    } else {
      result.push(
        prepareExampleValue(
          dpgContext,
          sdkTypes,
          bodyParam.name,
          bodyExample.value,
          bodyParam.optional,
          bodyParam.onClient
        )
      );
    }
  }

  // optional parameters
  method.operation.parameters
    .filter(
      (param) =>
        param.optional === true &&
        parameterMap[param.serializedName] &&
        !param.clientDefaultValue
    )
    .map((param) => parameterMap[param.serializedName]!)
    .forEach((param) => {
      result.push(
        prepareExampleValue(
          dpgContext,
          sdkTypes,
          param.parameter.name,
          param.value,
          true,
          param.parameter.onClient
        )
      );
    });

  return result;
}

function getCredentialExampleValue(
  dpgContext: SdkContext,
  initialization: SdkClientInitializationType
): ExampleValue | undefined {
  const keyCredential = hasKeyCredential(initialization),
    tokenCredential = hasTokenCredential(initialization);
  const defaultSetting = {
    isOptional: false,
    onClient: true,
    name: "credential"
  };
  if (keyCredential || tokenCredential) {
    if (isAzurePackage({ options: dpgContext.rlcOptions })) {
      return {
        ...defaultSetting,
        value: `new ${CREDENTIAL_MARKER}()`
      };
    } else if (keyCredential) {
      return {
        ...defaultSetting,
        value: `{ key: "INPUT_YOUR_KEY_HERE" }`
      };
    } else if (tokenCredential) {
      return {
        ...defaultSetting,
        value: `{ getToken: async () => {
          return { token: "INPUT_YOUR_TOKEN_HERE", expiresOnTimestamp: now() }; } }`
      };
    }
  }
  return undefined;
}

function getParameterValue(
  context: SdkContext,
  sdkTypes: SdkTypeContext,
  value: SdkExampleValue,
  options?: {
    overrides?: ModelOverrideOptions;
  }
): string {
  let retValue = `{} as any`;
  switch (value.kind) {
    case "string": {
      switch (value.type.kind) {
        case "plainDate":
        case "utcDateTime":
          retValue = `new Date("${value.value}")`;
          break;
        case "bytes": {
          const encode = value.type.encode ?? "base64";
          retValue = `Buffer.from("${value.value}",  "${encode}")`;
          break;
        }
        default:
          retValue = `"${value.value
            ?.toString()
            .replace(/\\/g, "\\\\")
            .replace(/"/g, '\\"')
            .replace(/\n/g, "\\n")
            .replace(/\r/g, "\\r")
            .replace(/\t/g, "\\t")
            .replace(/\f/g, "\\f")
            .replace(/>/g, ">")
            .replace(/</g, "<")}"`;
          break;
      }
      break;
    }
    case "boolean":
    case "number":
    case "null":
    case "unknown":
    case "union":
      retValue = `${JSON.stringify(value.value)}`;
      break;
    case "dict":
    case "model": {
      const mapper = buildPropertyNameMapper(
        context,
        value.type,
        options?.overrides
      );
      const values = [];
      const additionalPropertiesValue =
        value.kind === "model" ? (value.additionalPropertiesValue ?? {}) : {};
      for (const propName in { ...value.value }) {
        let property;
        if (value.type.kind === "model") {
          property = value.type.properties.find((p) => p.name === propName);
        }
        const propValue = value.value[propName];
        if (propValue === undefined || propValue === null) {
          continue;
        }
        if (property && isReadOnly(property as SdkModelPropertyType)) {
          continue;
        }
        let propRetValue;

        if (
          property?.flatten &&
          property.type.kind === "model" &&
          options?.overrides?.enableFlatten !== false
        ) {
          const paramValue = getParameterValue(context, sdkTypes, propValue, {
            overrides: {
              propertyRenames:
                sdkTypes.flattenProperties.get(property)?.conflictMap,
              enableFlatten: false
            }
          });
          propRetValue =
            paramValue.length > 2 ? paramValue.slice(1, -1) : undefined;
        } else {
          propRetValue =
            `"${mapper.get(propName) ?? propName}": ` +
            getParameterValue(context, sdkTypes, propValue, options);
        }
        if (propRetValue) values.push(propRetValue);
      }
      const additionalBags = [];
      for (const propName in { ...additionalPropertiesValue }) {
        const propValue = additionalPropertiesValue[propName];
        if (propValue === undefined || propValue === null) {
          continue;
        }
        const propRetValue =
          `"${mapper.get(propName) ?? propName}": ` +
          getParameterValue(context, sdkTypes, propValue);
        additionalBags.push(propRetValue);
      }
      if (additionalBags.length > 0) {
        const name = mapper.get("additionalProperties")
          ? "additionalPropertiesBag"
          : "additionalProperties";
        values.push(`"${name}": {
          ${additionalBags.join(", ")}
          }`);
      }

      retValue = `{${values.join(", ")}}`;
      break;
    }
    case "array": {
      const valuesArr = value.value.map((item) =>
        getParameterValue(context, sdkTypes, item)
      );
      retValue = `[${valuesArr.join(", ")}]`;
      break;
    }
    default:
      break;
  }
  return retValue;
}

function escapeSpecialCharToSpace(str: string) {
  if (!str) return str;
  return str.replace(/_|,|\.|\(|\)|'s |\[|\]/g, " ").replace(/\//g, " Or ");
}

function getEnvironmentVariableName(
  paramName: string,
  clientName?: string
): string {
  const cleanName = paramName.replace(/Param$/, "");
  let prefix = "";
  if (clientName) {
    const cleanClientName = clientName.replace(/Client$/, "");
    prefix =
      cleanClientName
        .replace(/([A-Z])/g, "_$1")
        .toUpperCase()
        .replace(/^_/, "") + "_";
  }
  const envVarName = cleanName
    .replace(/([A-Z])/g, "_$1")
    .toUpperCase()
    .replace(/^_/, "");
  return `process.env.${prefix}${envVarName} || ""`;
}
