import { Children } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import { Program } from "@typespec/compiler";
import { Output as EFOutput } from "@typespec/emitter-framework";
import {
  httpRuntimeLib,
  azureCoreClientLib,
  azureCorePipelineLib,
  azureAbortControllerLib,
  azureCoreAuthLib,
  azureCoreUtilLib,
  azureCoreLroLib,
  azureIdentityLib
} from "./ExternalPackages.js";

export interface OutputProps {
  children?: Children;
  program: Program;
}

/**
 * Root output component for the typespec-ts emitter.
 * This component sets up the Alloy rendering pipeline with
 * TypeScript name policies and the emitter framework.
 */
export function Output(props: OutputProps) {
  const tsNamePolicy = ts.createTSNamePolicy();
  return (
    <EFOutput
      namePolicy={tsNamePolicy}
      program={props.program}
      externals={[
        httpRuntimeLib,
        azureCoreClientLib,
        azureCorePipelineLib,
        azureAbortControllerLib,
        azureCoreAuthLib,
        azureCoreUtilLib,
        azureCoreLroLib,
        azureIdentityLib
      ]}
    >
      {props.children}
    </EFOutput>
  );
}
