import { TestHost } from "@typespec/compiler/testing";
import { SdkContext } from "../../../src/utils/interfaces.js";
import { getDpgContext } from "../../test-host.js";
import { EmitterOptions, enrichDpgContext } from "../../../src/index.js";
import { CompilerOptions } from "@typespec/compiler";

export async function compileTypespec(
  host: TestHost,
  content: string,
  options: {
    compilerOptions?: CompilerOptions;
    emitterOptions?: EmitterOptions;
  } = {}
): Promise<SdkContext> {
  host.addTypeSpecFile("main.tsp", content);
  await host.compile("./", {
    warningAsError: false
  });

  const context = await getDpgContext(host.program);
  await enrichDpgContext(context, options.emitterOptions ?? {});

  return context;
}
