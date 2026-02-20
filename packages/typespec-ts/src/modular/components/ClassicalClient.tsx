import { code, Children, refkey, Refkey } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import {
  InitializedByFlags,
  SdkClientType,
  SdkServiceOperation
} from "@azure-tools/typespec-client-generator-core";
import {
  NameType,
  normalizeName,
  isAzurePackage
} from "@azure-tools/rlc-common";
import { SdkContext } from "../../utils/interfaces.js";
import { ModularEmitterOptions } from "../interfaces.js";
import {
  getClassicalClientName,
  getClientName
} from "../helpers/namingHelpers.js";
import { getOperationFunction } from "../helpers/operationHelpers.js";
import { getClientParametersDeclaration } from "../helpers/clientHelpers.js";
import {
  getModularClientOptions,
  isRLCMultiEndpoint
} from "../../utils/clientUtils.js";
import {
  getMethodHierarchiesMap,
  isTenantLevelOperation
} from "../../utils/operationUtil.js";
import { httpRuntimeLib, azureCorePipelineLib } from "./ExternalPackages.js";
import path from "path";

// ── Refkey helpers ──────────────────────────────────────────────────────

/** Refkey for the classical client class */
export function classicalClientRefkey(
  client: SdkClientType<SdkServiceOperation>
): Refkey {
  return refkey(client, "classicalClient");
}

export function getClassicalClientDisplayName(
  client: SdkClientType<SdkServiceOperation>
): string {
  return getClassicalClientName(client);
}

// ── Component ───────────────────────────────────────────────────────────

export interface ClassicalClientProps {
  context: SdkContext;
  clientMap: [string[], SdkClientType<SdkServiceOperation>];
  emitterOptions: ModularEmitterOptions;
}

/**
 * Generates the classical client file containing:
 * - Re-export of OptionalParams from context module
 * - A client class with pipeline, operations, and sub-clients
 */
export function ClassicalClient(props: ClassicalClientProps): Children {
  const { context, clientMap, emitterOptions } = props;
  const [_hierarchy, client] = clientMap;

  const modularClientName = getClientName(client);
  const classicalClientName = getClassicalClientName(client);
  const isAzure = isAzurePackage({ options: context.rlcOptions ?? {} });

  const classicalParams = getClientParametersDeclaration(client, context, {
    requiredOnly: true
  });
  const contextParams = getClientParametersDeclaration(client, context, {
    onClientOnly: false,
    requiredOnly: true
  });

  const srcPath = emitterOptions.modularOptions.sourceRoot;
  const { subfolder, rlcClientName } = getModularClientOptions(clientMap);

  const filePath = path.join(
    `${srcPath}/${subfolder && subfolder !== "" ? subfolder + "/" : ""}${normalizeName(
      classicalClientName,
      NameType.File
    )}.ts`
  );

  // Pipeline type reference
  const pipelineRef = isAzure
    ? azureCorePipelineLib.Pipeline
    : httpRuntimeLib.Pipeline;

  // Client type for _client property
  const clientPropType = isRLCMultiEndpoint(context)
    ? `Client.${rlcClientName}`
    : rlcClientName;

  // Check for child clients
  const hasChildClient =
    client.children &&
    client.children.some(
      (childClient) =>
        childClient.clientInitialization.initializedBy &
        InitializedByFlags.Parent
    );

  // Check if constructor overloads for subscriptionId needed
  const hasSubscriptionIdParam = classicalParams.some(
    (param) => param.name.toLowerCase() === "subscriptionid"
  );
  const shouldSubscriptionIdOptional =
    context.arm &&
    hasSubscriptionIdParam &&
    hasTenantLevelOperations(client, context);

  // Build constructor params string
  const constructorParamsStr = shouldSubscriptionIdOptional
    ? buildOverloadConstructorParams(classicalParams, classicalClientName)
    : classicalParams
        .map((p) => {
          if (p.initializer) return `${p.name}: ${p.type} = ${p.initializer}`;
          return `${p.name}: ${p.type}`;
        })
        .join(", ");

  // Build constructor overloads
  const constructorOverloads = shouldSubscriptionIdOptional
    ? buildConstructorOverloads(classicalParams, classicalClientName)
    : "";

  // Build user agent options
  const userAgentBody = buildUserAgentOptionsStatements(emitterOptions);

  // Build constructor body
  const paramNames = (contextParams ?? [])
    .map((p) => p.name)
    .map((x) => {
      if (x === "options") {
        return `{...options, userAgentOptions: ${userAgentBody}}`;
      } else if (
        x.toLowerCase() === "subscriptionid" &&
        shouldSubscriptionIdOptional
      ) {
        return `subscriptionId ?? ""`;
      }
      return x;
    });

  const overloadResolution = shouldSubscriptionIdOptional
    ? `let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }
    options = options ?? {};
    `
    : "";

  const createClientStatement = `this._client = create${modularClientName}(${paramNames.join(",")});`;
  const pipelineStatement = `this.pipeline = this._client.pipeline;`;
  const clientParamsStatement =
    hasChildClient && client.children
      ? `this._clientParams = {${classicalParams.map((p) => p.name).join(",")}};`
      : "";

  // Build operation group properties and constructor assignments
  const methodMap = getMethodHierarchiesMap(context, client);
  let clientType = "Client";
  if (subfolder && subfolder !== "") {
    clientType = `Client.${classicalClientName}`;
  }

  const operationGroupDecls: string[] = [];
  const operationGroupAssigns: string[] = [];
  const directMethods: string[] = [];
  const seenGroupNames = new Set<string>();

  for (const [prefixKey, operations] of methodMap) {
    const prefixes = prefixKey.split("/");
    if (prefixKey === "") {
      // Direct operations on the class
      for (const op of operations) {
        const declaration = getOperationFunction(
          context,
          [prefixes, op],
          clientType
        );
        const methodName =
          declaration.propertyName ?? declaration.name ?? "FIXME";
        const methodParams =
          declaration.parameters?.filter((p) => p.name !== "context") ?? [];
        const methodParamStr = [
          "this._client",
          ...methodParams.map((p) => p.name)
        ].join(", ");
        const paramDecl = methodParams
          .map(
            (p) =>
              `${p.name}${
                p.type?.toString().endsWith("operationOptions__") ||
                p.hasQuestionToken
                  ? "?"
                  : ""
              }: ${p.type}`
          )
          .join(", ");
        const docs = declaration.docs
          ? declaration.docs.map((d) => `/** ${d} */`).join("\n")
          : "";
        const apiFuncName = declaration.name ?? "FIXME";

        directMethods.push(
          `${docs}
${methodName}(${paramDecl}): ${declaration.returnType} {
  return ${apiFuncName}(${methodParamStr});
}`
        );

        // LRO compat methods
        if (context.rlcOptions?.compatibilityLro && declaration.isLro) {
          const returnType = declaration.lroFinalReturnType ?? "void";
          const beginName = normalizeName(
            `begin_${methodName}`,
            NameType.Method
          );
          const beginAndWaitName = normalizeName(
            `${beginName}_andWait`,
            NameType.Method
          );

          directMethods.push(
            `/** @deprecated use ${methodName} instead */
async ${beginName}(${paramDecl}): Promise<SimplePollerLike<OperationState<${returnType}>, ${returnType}>> {
  const poller = ${apiFuncName}(${methodParamStr});
  await poller.submitted();
  return getSimplePoller(poller);
}`
          );
          directMethods.push(
            `/** @deprecated use ${methodName} instead */
async ${beginAndWaitName}(${paramDecl}): Promise<${returnType}> {
  return await ${apiFuncName}(${methodParamStr});
}`
          );
        }
      }
    } else {
      const rawGroupName = normalizeName(prefixes[0] ?? "", NameType.Interface);
      const operationFnName = `_get${normalizeName(
        rawGroupName,
        NameType.OperationGroup
      )}Operations`;
      const propertyTypeName = `${normalizeName(
        rawGroupName,
        NameType.OperationGroup
      )}Operations`;
      const groupName = normalizeName(rawGroupName, NameType.Property);

      if (!seenGroupNames.has(groupName)) {
        seenGroupNames.add(groupName);
        operationGroupDecls.push(
          `/** The operation groups for ${groupName} */\nreadonly ${groupName}: ${propertyTypeName};`
        );
        operationGroupAssigns.push(
          `this.${groupName} = ${operationFnName}(this._client);`
        );
      }
    }
  }

  // Build child client imports and methods
  const childClientImports: string[] = [];
  const childClientMethods: string[] = [];

  if (hasChildClient && client.children) {
    const parentParams = getClientParametersDeclaration(client, context, {
      requiredOnly: true
    });
    for (const childClient of client.children) {
      if (
        !(
          childClient.clientInitialization.initializedBy &
          InitializedByFlags.Parent
        )
      ) {
        continue;
      }
      const childName = getClassicalClientName(childClient);
      const childSubfolder = normalizeName(
        childClient.name.replace("Client", ""),
        NameType.File
      );

      childClientImports.push(
        `import { ${childName}, ${childName}OptionalParams } from "./${childSubfolder}/${normalizeName(childName, NameType.File)}.js";`
      );

      const childParams = getClientParametersDeclaration(childClient, context, {
        requiredOnly: true
      });
      const diffParams = childParams.filter(
        (p) =>
          !parentParams.some(
            (pp) => pp.name === p.name && pp.name !== "options"
          )
      );
      const diffParamDecl = diffParams
        .map((p) => {
          if (p.initializer) return `${p.name}: ${p.type} = ${p.initializer}`;
          return `${p.name}: ${p.type}`;
        })
        .join(", ");
      const docs = childClient.doc ? `/** ${childClient.doc} */\n` : "";
      const parentArgStr = parentParams
        .filter((p) => !p.name.includes("options"))
        .map((p) => `this._clientParams.${p.name}`)
        .join(",");
      const diffArgStr = diffParams
        .filter((p) => p.name !== "options")
        .map((p) => p.name)
        .join(",");
      const argParts = [
        parentArgStr,
        diffArgStr,
        "{ ...this._clientParams.options, ...options }"
      ].filter(Boolean);

      childClientMethods.push(
        `${docs}get${childName}(${diffParamDecl}): ${childName} {
  return new ${childName}(${argParts.join(", ")});
}`
      );
    }
  }

  // Build client params type for the private field
  const clientParamsType = classicalParams
    .map((p) => `${p.name}: ${p.type}`)
    .join("; ");

  // Collect all API function names we need to import
  const apiImportNames = new Set<string>();
  apiImportNames.add(`create${modularClientName}`);
  for (const [prefixKey, operations] of methodMap) {
    if (prefixKey === "") {
      for (const op of operations) {
        const declaration = getOperationFunction(
          context,
          [prefixKey.split("/"), op],
          clientType
        );
        if (declaration.name) apiImportNames.add(declaration.name);
      }
    }
  }

  // Collect operation group function and interface names to import from classic/
  const classicImportNames = new Set<string>();
  const classicInterfaceNames = new Set<string>();
  for (const [prefixKey] of methodMap) {
    if (prefixKey !== "") {
      const prefixes = prefixKey.split("/");
      const rawGroupName = normalizeName(prefixes[0] ?? "", NameType.Interface);
      classicImportNames.add(
        `_get${normalizeName(rawGroupName, NameType.OperationGroup)}Operations`
      );
      classicInterfaceNames.add(
        `${normalizeName(rawGroupName, NameType.OperationGroup)}Operations`
      );
    }
  }

  // Check if LRO compat imports are needed
  const needsLroCompat =
    context.rlcOptions?.compatibilityLro &&
    directMethods.some((m) => m.includes("SimplePollerLike"));

  // Build import statements
  const apiImport =
    apiImportNames.size > 0
      ? `import { ${[...apiImportNames].join(", ")} } from "./api/index.js";`
      : "";
  const classicImport =
    classicImportNames.size > 0 || classicInterfaceNames.size > 0
      ? `import { ${[...classicImportNames, ...classicInterfaceNames].join(", ")} } from "./classic/index.js";`
      : "";
  const lroImports = needsLroCompat
    ? [
        `import { SimplePollerLike, getSimplePoller } from "./static-helpers/simplePollerHelpers.js";`,
        `import { OperationState } from "@azure/core-lro";`
      ].join("\n")
    : "";

  const constructorDocs = client.doc ? `/** ${client.doc} */` : "";

  return (
    <ts.SourceFile path={filePath}>
      {code`
export { ${classicalClientName}OptionalParams } from "./api/${normalizeName(modularClientName, NameType.File)}Context.js";
${apiImport}
${classicImport}
${childClientImports.join("\n")}
${lroImports}

export class ${classicalClientName} {
  private _client: ${clientPropType};
  /** The pipeline used by this client to make requests */
  readonly pipeline: ${pipelineRef};
  ${hasChildClient ? `private _clientParams: {${clientParamsType}};` : ""}

  ${constructorOverloads}
  ${constructorDocs}
  constructor(${constructorParamsStr}) {
    ${overloadResolution}
    ${createClientStatement}
    ${pipelineStatement}
    ${clientParamsStatement}
    ${operationGroupAssigns.join("\n    ")}
  }

  ${directMethods.join("\n\n  ")}

  ${operationGroupDecls.join("\n  ")}

  ${childClientMethods.join("\n\n  ")}
}
`}
    </ts.SourceFile>
  );
}

// ── Pure helper functions ───────────────────────────────────────────────

function hasTenantLevelOperations(
  client: SdkClientType<SdkServiceOperation>,
  dpgContext: SdkContext
): boolean {
  const methodMap = getMethodHierarchiesMap(dpgContext, client);
  for (const [_, operations] of methodMap) {
    for (const op of operations) {
      if (isTenantLevelOperation(op, client)) {
        return true;
      }
    }
  }
  return false;
}

function buildOverloadConstructorParams(
  classicalParams: any[],
  classicalClientName: string
): string {
  const filteredParams = classicalParams.filter(
    (p: any) =>
      p.name.toLowerCase() !== "subscriptionid" &&
      p.name.toLowerCase() !== "options"
  );
  const params = [
    ...filteredParams.map((p: any) => {
      if (p.initializer) return `${p.name}: ${p.type} = ${p.initializer}`;
      return `${p.name}: ${p.type}`;
    }),
    `subscriptionIdOrOptions?: string | ${classicalClientName}OptionalParams`,
    `options?: ${classicalClientName}OptionalParams`
  ];
  return params.join(", ");
}

function buildConstructorOverloads(
  classicalParams: any[],
  classicalClientName: string
): string {
  const filteredParams = classicalParams.filter(
    (p: any) =>
      p.name.toLowerCase() !== "subscriptionid" &&
      p.name.toLowerCase() !== "options"
  );
  const baseParams = filteredParams
    .map((p: any) => {
      if (p.initializer) return `${p.name}: ${p.type} = ${p.initializer}`;
      return `${p.name}: ${p.type}`;
    })
    .join(", ");
  const subscriptionIdParams = classicalParams
    .filter((p: any) => p.name.toLowerCase() === "subscriptionid")
    .map((p: any) => `${p.name}: ${p.type}`)
    .join(", ");

  return `constructor(${baseParams}, options?: ${classicalClientName}OptionalParams);
  constructor(${baseParams}, ${subscriptionIdParams}, options?: ${classicalClientName}OptionalParams);`;
}

function buildUserAgentOptionsStatements(
  emitterOptions: ModularEmitterOptions
): string {
  const clientPackageName =
    emitterOptions.options.packageDetails?.nameWithoutScope ??
    emitterOptions.options.packageDetails?.name ??
    "";
  const packageVersion = emitterOptions.options.packageDetails?.version ?? "";
  const sdkUserAgentPrefix = "azsdk-js-client";

  const hasInfo = packageVersion && clientPackageName;
  if (hasInfo) {
    return `{
      userAgentPrefix: (options?.userAgentOptions?.userAgentPrefix
        ? \`\${options.userAgentOptions.userAgentPrefix} ${sdkUserAgentPrefix} azsdk-js-${clientPackageName}/${packageVersion}\`
        : \`${sdkUserAgentPrefix} azsdk-js-${clientPackageName}/${packageVersion}\`)
    }`;
  }
  return `{
    userAgentPrefix: (options?.userAgentOptions?.userAgentPrefix
      ? \`\${options.userAgentOptions.userAgentPrefix} ${sdkUserAgentPrefix}\`
      : \`${sdkUserAgentPrefix}\`)
  }`;
}
