import { Children } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import { Program } from "@typespec/compiler";
import { Output as EFOutput } from "@typespec/emitter-framework";

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
    <EFOutput namePolicy={tsNamePolicy} program={props.program}>
      {props.children}
    </EFOutput>
  );
}
