import {
  OperationParameter,
  RLCOptions,
  Schema,
  buildClient,
  buildClientDefinitions,
  buildPaginateHelper,
  buildParameterTypes,
  buildResponseTypes,
  buildRuntimeImports,
  buildSchemaTypes,
  initInternalImports
} from "@azure-tools/rlc-common";
import {
  compileTypeSpecFor,
  createDpgContextTestHelper,
  ExampleJson,
  rlcEmitterFor
} from "./testUtil.js";
import { transformUrlInfo } from "../../src/transform/transform.js";

import { transformModularEmitterOptions } from "../../src/modular/buildModularOptions.js";
import { expectDiagnosticEmpty } from "@typespec/compiler/testing";
import { getCredentialInfo } from "../../src/transform/transfromRLCOptions.js";
import {
  getClientHierarchyMap,
  getRLCClients
} from "../../src/utils/clientUtils.js";
import { transformHelperFunctionDetails } from "../../src/transform/transformHelperFunctionDetails.js";
import { transformPaths } from "../../src/transform/transformPaths.js";
import { transformSchemas } from "../../src/transform/transformSchemas.js";
import { transformToParameterTypes } from "../../src/transform/transformParameters.js";
import { transformToResponseTypes } from "../../src/transform/transformResponses.js";
import { renameClientName } from "../../src/index.js";
import { useContext } from "../../src/contextManager.js";
import { Project } from "ts-morph";
import {
  renderOperations,
  renderClientContext,
  renderClassicalClient,
  renderRootIndex,
  renderSamples,
  renderModels,
  renderOperationOptionsOnly
} from "../../dist/src/test-utils/alloy-test-render.js";

/**
 * Creates ts-morph SourceFile objects from rendered text for test API compatibility.
 */
function createSourceFilesFromText(
  files: Map<string, string>
): import("ts-morph").SourceFile[] {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFiles: import("ts-morph").SourceFile[] = [];
  for (const [path, content] of files) {
    sourceFiles.push(
      project.createSourceFile(path, content, { overwrite: true })
    );
  }
  return sourceFiles;
}

export async function emitPageHelperFromTypeSpec(
  tspContent: string,
  {
    needAzureCore = false,
    needTCGC = false
  }: {
    needAzureCore?: boolean;
    needTCGC?: boolean;
  } = {}
) {
  const context = await rlcEmitterFor(tspContent, {
    needNamespaces: true,
    needAzureCore,
    needTCGC
  });
  const program = context.program;
  const dpgContext = await createDpgContextTestHelper(context.program);
  const clients = getRLCClients(dpgContext);
  let helperDetail;
  if (clients && clients[0]) {
    helperDetail = transformHelperFunctionDetails(
      clients[0],
      dpgContext,
      "azure"
    );
  }
  expectDiagnosticEmpty(program.diagnostics);
  return buildPaginateHelper({
    helperDetails: helperDetail,
    srcPath: "",
    paths: {},
    libraryName: "test",
    schemas: [],
    importInfo: {
      internalImports: initInternalImports(),
      runtimeImports: buildRuntimeImports("azure")
    }
  });
}

export async function emitSchemasFromTypeSpec(
  tspContent: string,
  {
    needAzureCore = false,
    needTCGC = false
  }: {
    needAzureCore?: boolean;
    needTCGC?: boolean;
  } = {}
) {
  const context = await rlcEmitterFor(tspContent, {
    needNamespaces: true,
    needAzureCore,
    needTCGC
  });
  const program = context.program;
  const dpgContext = await createDpgContextTestHelper(context.program);
  const clients = getRLCClients(dpgContext);
  let rlcSchemas: Schema[] = [];
  if (clients && clients[0]) {
    rlcSchemas = transformSchemas(clients[0], dpgContext);
  }
  expectDiagnosticEmpty(program.diagnostics);
  return rlcSchemas;
}

export async function emitModelsFromTypeSpec(
  tspContent: string,
  {
    needAzureCore = false,
    needTCGC = false,
    withRawContent = false,
    mustEmptyDiagnostic = true,
    enableModelNamespace = false
  }: {
    needAzureCore?: boolean;
    needTCGC?: boolean;
    withRawContent?: boolean;
    mustEmptyDiagnostic?: boolean;
    enableModelNamespace?: boolean;
  } = {}
) {
  const context = await rlcEmitterFor(tspContent, {
    needNamespaces: true,
    needAzureCore,
    needTCGC,
    withRawContent
  });
  const dpgContext = await createDpgContextTestHelper(
    context.program,
    enableModelNamespace
  );
  const clients = getRLCClients(dpgContext);
  let rlcSchemas: Schema[] = [];
  if (clients && clients[0]) {
    rlcSchemas = transformSchemas(clients[0], dpgContext);
  }
  if (mustEmptyDiagnostic && dpgContext.program.diagnostics.length > 0) {
    throw dpgContext.program.diagnostics;
  }
  return buildSchemaTypes({
    schemas: rlcSchemas,
    srcPath: "",
    paths: {},
    libraryName: "test",
    importInfo: {
      internalImports: initInternalImports(),
      runtimeImports: buildRuntimeImports("azure")
    }
  });
}

export async function emitParameterFromTypeSpec(
  tspContent: string,
  {
    needAzureCore = false,
    needTCGC = false,
    withRawContent = false,
    mustEmptyDiagnostic = true,
    withVersionedApiVersion = false
  }: {
    needAzureCore?: boolean;
    needTCGC?: boolean;
    withRawContent?: boolean;
    mustEmptyDiagnostic?: boolean;
    withVersionedApiVersion?: boolean;
  } = {}
) {
  const context = await rlcEmitterFor(tspContent, {
    needNamespaces: true,
    needAzureCore,
    needTCGC,
    withRawContent,
    withVersionedApiVersion
  });
  const dpgContext = await createDpgContextTestHelper(context.program);
  const clients = getRLCClients(dpgContext);
  const importSet = initInternalImports();
  let parameters;
  let helperDetails;
  if (clients && clients[0]) {
    const urlInfo = transformUrlInfo(clients[0], dpgContext, importSet);
    parameters = transformToParameterTypes(
      clients[0],
      dpgContext,
      importSet,
      urlInfo?.apiVersionInfo
    );
    helperDetails = transformHelperFunctionDetails(clients[0], dpgContext);
  }
  if (mustEmptyDiagnostic && dpgContext.program.diagnostics.length > 0) {
    throw dpgContext.program.diagnostics;
  }
  return buildParameterTypes({
    srcPath: "",
    paths: {},
    libraryName: "test",
    schemas: [],
    parameters,
    helperDetails,
    importInfo: {
      internalImports: importSet,
      runtimeImports: buildRuntimeImports("azure")
    },
    options: {
      sourceFrom: "TypeSpec"
    }
  });
}

export async function emitClientDefinitionFromTypeSpec(
  tspContent: string,
  {
    needAzureCore = false
  }: {
    needAzureCore?: boolean;
  } = {}
) {
  const context = await rlcEmitterFor(tspContent, {
    needNamespaces: true,
    needAzureCore
  });
  const dpgContext = await createDpgContextTestHelper(context.program);
  const clients = getRLCClients(dpgContext);
  const internalImports = initInternalImports();
  let paths = {};
  let parameters: OperationParameter[] = [];
  if (clients && clients[0]) {
    paths = transformPaths(clients[0], dpgContext, internalImports);
    parameters = transformToParameterTypes(
      clients[0],
      dpgContext,
      internalImports
    );
  }
  expectDiagnosticEmpty(dpgContext.program.diagnostics);
  return buildClientDefinitions({
    srcPath: "",
    libraryName: "test",
    schemas: [],
    paths,
    parameters,
    importInfo: {
      internalImports,
      runtimeImports: buildRuntimeImports("azure")
    }
  });
}

export async function emitClientFactoryFromTypeSpec(
  tspContent: string,
  {
    needAzureCore = false,
    mustEmptyDiagnostic = true,
    withRawContent = false,
    needNamespaces = false,
    needTCGC = false
  }: {
    needAzureCore?: boolean;
    mustEmptyDiagnostic?: boolean;
    withRawContent?: boolean;
    needNamespaces?: boolean;
    needTCGC?: boolean;
  } = {}
) {
  const context = await rlcEmitterFor(tspContent, {
    needNamespaces,
    needAzureCore,
    needTCGC,
    withRawContent
  });
  const program = context.program;
  const dpgContext = await createDpgContextTestHelper(context.program);
  const clients = getRLCClients(dpgContext);
  const importSet = initInternalImports();

  const credentialInfo = getCredentialInfo(program, {});

  let urlInfo;
  if (clients && clients[0]) {
    urlInfo = transformUrlInfo(clients[0], dpgContext, importSet);
  }
  if (mustEmptyDiagnostic && dpgContext.program.diagnostics.length > 0) {
    throw dpgContext.program.diagnostics;
  }

  return buildClient({
    srcPath: "",
    libraryName: "test",
    schemas: [],
    paths: {},
    urlInfo,
    apiVersionInfo: urlInfo?.apiVersionInfo,
    options: {
      packageDetails: {
        name: "test",
        version: "1.0.0-beta.1"
      },
      flavor: "azure",
      ...credentialInfo
    },
    importInfo: {
      internalImports: importSet,
      runtimeImports: buildRuntimeImports("azure")
    }
  });
}

export async function emitResponsesFromTypeSpec(
  tspContent: string,
  {
    needAzureCore = false,
    withRawContent = false,
    needTCGC = false,
    withVersionedApiVersion = false,
    needArmTemplate = false
  }: {
    needAzureCore?: boolean;
    withRawContent?: boolean;
    needTCGC?: boolean;
    withVersionedApiVersion?: boolean;
    needArmTemplate?: boolean;
  } = {}
) {
  const context = await rlcEmitterFor(tspContent, {
    needNamespaces: true,
    needAzureCore,
    needTCGC,
    withRawContent,
    withVersionedApiVersion,
    needArmTemplate
  });
  const dpgContext = await createDpgContextTestHelper(context.program);
  const importSet = initInternalImports();
  const clients = getRLCClients(dpgContext);
  let responses;
  if (clients && clients[0]) {
    responses = transformToResponseTypes(clients[0], dpgContext, importSet);
  }
  expectDiagnosticEmpty(dpgContext.program.diagnostics);
  return buildResponseTypes({
    srcPath: "",
    libraryName: "test",
    schemas: [],
    paths: {},
    responses,
    importInfo: {
      internalImports: importSet,
      runtimeImports: buildRuntimeImports("azure")
    }
  });
}

export async function getRLCClientsFromTypeSpec(tspContent: string) {
  const context = await rlcEmitterFor(tspContent, {
    needNamespaces: true,
    needAzureCore: false,
    needTCGC: true,
    withRawContent: true
  });
  const dpgContext = await createDpgContextTestHelper(context.program);
  const clients = getRLCClients(dpgContext);
  expectDiagnosticEmpty(dpgContext.program.diagnostics);
  return clients;
}

export interface ModelConfigOptions extends RLCOptions {
  needOptions?: boolean;
  withRawContent?: boolean;
  needAzureCore?: boolean;
  needNamespaces?: boolean;
  mustEmptyDiagnostic?: boolean;
  withVersionedApiVersion?: boolean;
  [key: string]: any;
}

export async function emitModularModelsFromTypeSpec(
  tspContent: string,
  options: ModelConfigOptions = {}
) {
  const {
    needOptions = false,
    withRawContent = false,
    needAzureCore = false,
    mustEmptyDiagnostic = true,
    needTCGC = false,
    withVersionedApiVersion = false,
    needArmTemplate = false
  } = options;
  if (options["experimental-extensible-enums"] === undefined) {
    options["experimental-extensible-enums"] = false;
  }
  if (options["compatibility-mode"] === undefined) {
    options["compatibility-mode"] = false;
  }
  const context = await rlcEmitterFor(tspContent, {
    needNamespaces: true,
    needAzureCore,
    needTCGC,
    withRawContent,
    withVersionedApiVersion,
    needArmTemplate
  });
  const dpgContext = await createDpgContextTestHelper(
    context.program,
    false,
    options
  );
  const includeResponseHeaders =
    options["include-headers-in-response"] === true;
  dpgContext.rlcOptions!.includeHeadersInResponse = includeResponseHeaders;
  dpgContext.rlcOptions!.isModularLibrary = true;
  dpgContext.rlcOptions!.compatibilityMode = options["compatibility-mode"];
  dpgContext.rlcOptions!.experimentalExtensibleEnums =
    options["experimental-extensible-enums"];
  dpgContext.rlcOptions!.ignoreNullableOnOptional =
    options["ignore-nullable-on-optional"] ?? true;

  if (mustEmptyDiagnostic && dpgContext.program.diagnostics.length > 0) {
    throw dpgContext.program.diagnostics;
  }

  // Use Alloy render helper to get models as rendered strings
  const modularEmitterOptions = transformModularEmitterOptions(dpgContext, "", {
    casing: "camel"
  });
  const sdkTypes = useContext("sdkTypes");

  if (needOptions) {
    // Render operation options instead of models
    const clientMap = Array.from(getClientHierarchyMap(dpgContext));
    const files = await renderOperationOptionsOnly(
      context.program,
      dpgContext,
      modularEmitterOptions,
      sdkTypes,
      clientMap
    );
    // Find the options file (contains "Options" in the name)
    const optionsContent: string[] = [];
    for (const [path, content] of files) {
      if (path.includes("options") || path.includes("Options")) {
        optionsContent.push(content);
      }
    }
    return optionsContent.length > 0 ? optionsContent.join("\n\n") : undefined;
  }

  const files = await renderModels(
    context.program,
    dpgContext,
    modularEmitterOptions,
    sdkTypes
  );

  // renderModels generates multiple files (models.ts and serializers.ts)
  // Combine them into a single string, excluding static helper stubs
  const allContent: string[] = [];
  for (const [path, content] of files) {
    if (
      path.endsWith(".ts") &&
      !path.includes("index") &&
      !path.startsWith("static-helpers/")
    ) {
      allContent.push(content);
    }
  }

  return allContent.length > 0 ? allContent.join("\n\n") : undefined;
}

export async function emitRootIndexFromTypeSpec(
  tspContent: string,
  options: ModelConfigOptions = {}
) {
  const {
    withRawContent = false,
    needAzureCore = false,
    mustEmptyDiagnostic = true,
    needTCGC = false
  } = options;
  if (options["experimental-extensible-enums"] === undefined) {
    options["experimental-extensible-enums"] = false;
  }
  if (options["compatibility-mode"] === undefined) {
    options["compatibility-mode"] = false;
  }
  const context = await rlcEmitterFor(tspContent, {
    needNamespaces: true,
    needAzureCore,
    needTCGC,
    withRawContent
  });
  const dpgContext = await createDpgContextTestHelper(
    context.program,
    false,
    options
  );
  const includeResponseHeaders =
    options["include-headers-in-response"] === true;
  dpgContext.rlcOptions!.includeHeadersInResponse = includeResponseHeaders;
  dpgContext.rlcOptions!.isModularLibrary = true;
  dpgContext.rlcOptions!.compatibilityMode = options["compatibility-mode"];
  dpgContext.rlcOptions!.experimentalExtensibleEnums =
    options["experimental-extensible-enums"];
  // need to specify the root path for this case
  const modularEmitterOptions = transformModularEmitterOptions(
    dpgContext,
    "/any/path",
    {
      casing: "camel"
    }
  );
  const clientMap = Array.from(getClientHierarchyMap(dpgContext));
  const sdkTypes = useContext("sdkTypes");
  const files = await renderRootIndex(
    context.program,
    dpgContext,
    modularEmitterOptions,
    sdkTypes,
    clientMap
  );
  if (mustEmptyDiagnostic && dpgContext.program.diagnostics.length > 0) {
    throw dpgContext.program.diagnostics;
  }
  // Find root index.ts file
  const indexFiles = new Map<string, string>();
  for (const [path, content] of files) {
    if (
      path.endsWith("/index.ts") &&
      !path.includes("api/") &&
      !path.includes("models/") &&
      !path.includes("classic/")
    ) {
      indexFiles.set(path, content);
      break;
    }
  }
  const sourceFiles = createSourceFilesFromText(indexFiles);
  return sourceFiles.length > 0 ? sourceFiles[0] : undefined;
}

export async function emitModularOperationsFromTypeSpec(
  tspContent: string,
  options: ModelConfigOptions = {}
) {
  if (options.mustEmptyDiagnostic === undefined) {
    options.mustEmptyDiagnostic = true;
  }
  if (options.needNamespaces === undefined) {
    options.needNamespaces = true;
  }
  if (options["experimental-extensible-enums"] === undefined) {
    options["experimental-extensible-enums"] = false;
  }
  const context = await rlcEmitterFor(tspContent, {
    needNamespaces: options.needNamespaces,
    needAzureCore: options.needAzureCore ? true : false,
    needTCGC: options["needTCGC"] ? true : false,
    withRawContent: options.withRawContent ? true : false,
    withVersionedApiVersion: options.withVersionedApiVersion ? true : false
  });
  const dpgContext = await createDpgContextTestHelper(context.program);
  const includeResponseHeaders =
    options["include-headers-in-response"] === true;
  dpgContext.rlcOptions!.includeHeadersInResponse = includeResponseHeaders;
  dpgContext.rlcOptions!.isModularLibrary = true;
  dpgContext.rlcOptions!.experimentalExtensibleEnums =
    options["experimental-extensible-enums"];
  const modularEmitterOptions = transformModularEmitterOptions(dpgContext, "", {
    casing: "camel"
  });
  if (
    dpgContext.sdkPackage.clients &&
    dpgContext.sdkPackage.clients.length > 0 &&
    dpgContext.sdkPackage.clients[0]
  ) {
    const clientMap = Array.from(getClientHierarchyMap(dpgContext));
    const sdkTypes = useContext("sdkTypes");
    const files = await renderOperations(
      context.program,
      dpgContext,
      modularEmitterOptions,
      sdkTypes,
      clientMap
    );
    if (
      options.mustEmptyDiagnostic &&
      dpgContext.program.diagnostics.length > 0
    ) {
      throw dpgContext.program.diagnostics;
    }
    // Filter to only operation files (api/*operations*.ts)
    const opFiles = new Map<string, string>();
    for (const [path, content] of files) {
      if (path.includes("api/") && path.includes("operations")) {
        opFiles.set(path, content);
      }
    }
    return createSourceFilesFromText(opFiles);
  }
  return undefined;
}

export async function emitModularClientContextFromTypeSpec(
  tspContent: string,
  options: ModelConfigOptions = {}
) {
  const context = await rlcEmitterFor(tspContent, {
    needNamespaces: true,
    needAzureCore: false,
    needTCGC: false,
    withRawContent: options.withRawContent ? true : false,
    withVersionedApiVersion: options.withVersionedApiVersion ? true : false
  });
  const dpgContext = await createDpgContextTestHelper(context.program);
  const includeResponseHeaders =
    options["include-headers-in-response"] === true;
  dpgContext.rlcOptions!.includeHeadersInResponse = includeResponseHeaders;
  dpgContext.rlcOptions!.isModularLibrary = true;
  dpgContext.rlcOptions!.typespecTitleMap = options["typespec-title-map"];
  const modularEmitterOptions = transformModularEmitterOptions(dpgContext, "", {
    casing: "camel"
  });
  if (
    dpgContext.sdkPackage.clients &&
    dpgContext.sdkPackage.clients.length > 0 &&
    dpgContext.sdkPackage.clients[0]
  ) {
    renameClientName(dpgContext.sdkPackage.clients[0], modularEmitterOptions);
    const clientMap = Array.from(getClientHierarchyMap(dpgContext));
    const sdkTypes = useContext("sdkTypes");
    const files = await renderClientContext(
      context.program,
      dpgContext,
      modularEmitterOptions,
      sdkTypes,
      clientMap[0]!
    );
    // ClientContext generates a single file — return it as ts-morph SourceFile
    const sourceFiles = createSourceFilesFromText(files);
    return sourceFiles.length > 0 ? sourceFiles[0] : undefined;
  }
  expectDiagnosticEmpty(dpgContext.program.diagnostics);
  return undefined;
}

export async function emitModularClientFromTypeSpec(
  tspContent: string,
  options: ModelConfigOptions = {}
) {
  const context = await rlcEmitterFor(tspContent, {
    needNamespaces: true,
    needAzureCore: false,
    needTCGC: false,
    withRawContent: options.withRawContent ? true : false,
    withVersionedApiVersion: options.withVersionedApiVersion ? true : false
  });
  const dpgContext = await createDpgContextTestHelper(context.program);
  const includeResponseHeaders =
    options["include-headers-in-response"] === true;
  dpgContext.rlcOptions!.includeHeadersInResponse = includeResponseHeaders;
  dpgContext.rlcOptions!.isModularLibrary = true;
  dpgContext.rlcOptions!.typespecTitleMap = options["typespec-title-map"];
  const modularEmitterOptions = transformModularEmitterOptions(dpgContext, "", {
    casing: "camel"
  });
  if (
    dpgContext.sdkPackage.clients &&
    dpgContext.sdkPackage.clients.length > 0 &&
    dpgContext.sdkPackage.clients[0]
  ) {
    renameClientName(dpgContext.sdkPackage.clients[0], modularEmitterOptions);
    const clientMap = Array.from(getClientHierarchyMap(dpgContext));
    const sdkTypes = useContext("sdkTypes");
    const files = await renderClassicalClient(
      context.program,
      dpgContext,
      modularEmitterOptions,
      sdkTypes,
      clientMap
    );
    // Find the classical client file
    const clientFiles = new Map<string, string>();
    for (const [path, content] of files) {
      if (
        path.endsWith("Client.ts") &&
        !path.includes("api/") &&
        !path.includes("Context")
      ) {
        clientFiles.set(path, content);
      }
    }
    const sourceFiles = createSourceFilesFromText(clientFiles);
    return sourceFiles.length > 0 ? sourceFiles[0] : undefined;
  }
  expectDiagnosticEmpty(dpgContext.program.diagnostics);
  return undefined;
}

export async function emitSamplesFromTypeSpec(
  tspContent: string,
  examples: ExampleJson[],
  configs: Record<string, any> = {}
) {
  const context = await compileTypeSpecFor(tspContent, examples);
  configs["typespecTitleMap"] = configs["typespec-title-map"];
  configs["hierarchyClient"] = configs["hierarchy-client"];
  configs["enableOperationGroup"] = configs["enable-operation-group"];
  const dpgContext = await createDpgContextTestHelper(context.program, false, {
    "examples-directory": `./examples`,
    packageDetails: {
      name: "@azure/internal-test"
    },
    ...configs
  });
  const modularEmitterOptions = transformModularEmitterOptions(dpgContext, "", {
    casing: "camel"
  });
  for (const subClient of dpgContext.sdkPackage.clients) {
    await renameClientName(subClient, modularEmitterOptions);
  }
  const sdkTypes = useContext("sdkTypes");
  const files = await renderSamples(
    context.program,
    dpgContext,
    modularEmitterOptions,
    sdkTypes
  );
  return createSourceFilesFromText(files);
}
