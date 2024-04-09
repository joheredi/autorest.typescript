import { createTestHost } from "@typespec/compiler/testing";
import { Program, CompilerOptions } from "@typespec/compiler";
import { RestTestLibrary } from "@typespec/rest/testing";
import { HttpTestLibrary } from "@typespec/http/testing";
import { VersioningTestLibrary } from "@typespec/versioning/testing";
import { createSdkContext } from "@azure-tools/typespec-client-generator-core";

import { SdkTestLibrary } from "@azure-tools/typespec-client-generator-core/testing";

export async function createTypescriptTestHost() {
  return createTestHost({
    libraries: [
      RestTestLibrary,
      HttpTestLibrary,
      VersioningTestLibrary,
      SdkTestLibrary
    ]
  });
}

export async function getDpgContext(
  program: Program,
  options: CompilerOptions = {}
) {
  const sdkContext = createSdkContext(
    {
      program,
      options,
      emitterOutputDir: "",
      getAssetEmitter: (() => {
        console.warn("[getAssetEmitter] no-op");
      }) as any
    },
    "@azure-tools/typespec-ts"
  );
  return sdkContext;
}
