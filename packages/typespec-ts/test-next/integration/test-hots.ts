import {
  SdkContext,
  SdkEmitterOptions,
  SdkHttpOperation,
  SdkServiceOperation,
  createSdkContext
} from "@azure-tools/typespec-client-generator-core";
import { SdkTestLibrary } from "@azure-tools/typespec-client-generator-core/testing";
import { EmitContext, Program } from "@typespec/compiler";
import {
  createTestHost,
  createTestWrapper,
  TypeSpecTestLibrary
} from "@typespec/compiler/testing";
import { HttpTestLibrary } from "@typespec/http/testing";
import { AzureCoreTestLibrary } from "@azure-tools/typespec-azure-core/testing";
import { RestTestLibrary } from "@typespec/rest/testing";
import { VersioningTestLibrary } from "@typespec/versioning/testing";

export async function createMyTestHost() {
  return createTestHost({
    libraries: [
      HttpTestLibrary,
      SdkTestLibrary,
      AzureCoreTestLibrary,
      RestTestLibrary,
      VersioningTestLibrary
    ]
  });
}

export interface CreateSdkTestRunnerOptions extends SdkEmitterOptions {
  emitterName?: string;
  librariesToAdd?: TypeSpecTestLibrary[];
  autoUsings?: string[];
  packageName?: string;
  skipServiceSpecPrepend?: boolean;
}

export async function createSdkContextFromTypespec(
  code: string,
  options: CreateSdkTestRunnerOptions = {}
): Promise<SdkContext<CreateSdkTestRunnerOptions, SdkHttpOperation>> {
  const runner = await createMyTestRunner();

  const prependServiceSpec = `@service({
      title: "Contoso Widget Manager",
    })
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
    @versioned(Contoso.WidgetManager.Versions)
    namespace Contoso.WidgetManager;

    /** The Contoso Widget Manager service version. */
    enum Versions {
      /** Version 2022-08-31 */
      @useDependency(Azure.Core.Versions.v1_0_Preview_2)
      \`2022-08-30\`,
    }`;

  let fullSpec = code;

  if (!options.skipServiceSpecPrepend) {
    fullSpec = `${prependServiceSpec}\n${code}`;
  }

  await runner.compile(fullSpec);

  return createSdkContextTestHelper(runner.program, options);
}

export function createSdkContextTestHelper<
  TOptions extends Record<string, any> = CreateSdkTestRunnerOptions,
  TServiceOperation extends SdkServiceOperation = SdkHttpOperation
>(
  program: Program,
  options: TOptions,
  sdkContextOption?: any
): SdkContext<TOptions, TServiceOperation> {
  const emitContext: EmitContext<TOptions> = {
    program: program,
    emitterOutputDir: "dummy",
    options: options,
    getAssetEmitter: null as any
  };
  return createSdkContext(
    emitContext,
    options.emitterName ?? "@azure-tools/typespec-ts",
    sdkContextOption
  );
}

export async function createMyTestRunner() {
  const host = await createMyTestHost();
  return createTestWrapper(host, {
    autoUsings: [
      "TypeSpec.Http",
      "Azure.ClientGenerator.Core",
      "Azure.Core",
      "Azure.Core.Traits",
      "TypeSpec.Versioning"
    ]
  });
}

export function createTcgcContext(
  context: EmitContext<Record<string, any>>
): SdkContext {
  const tcgcSettings = {
    "generate-protocol-methods": true,
    "generate-convenience-methods": true,
    "flatten-union-as-enum": false,
    emitters: [
      {
        main: "@azure-tools/typespec-ts",
        metadata: { name: "@azure-tools/typespec-ts" }
      }
    ]
  };

  const contextForTcgc = {
    ...context,
    options: {
      ...context.options,
      ...tcgcSettings
    }
  };

  return createSdkContext(contextForTcgc);
}
