import { Children } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import { Project } from "ts-morph";

export interface TsMorphBridgeProps {
  /**
   * The ts-morph Project containing generated files to emit.
   */
  project?: Project;

  children?: Children;
}

/**
 * Bridge component that takes pre-generated ts-morph source files and emits
 * them through the Alloy pipeline. This allows incremental migration — ts-morph
 * generation runs first, then TsMorphBridge renders the results as Alloy
 * SourceFile nodes alongside pure Alloy components.
 */
export function TsMorphBridge(props: TsMorphBridgeProps): Children {
  // The bridge is designed to be called during the Alloy render phase.
  // It extracts files from the ts-morph project and returns them as
  // raw SourceFile content children.
  //
  // Note: This component cannot actually call generate() during render
  // because Alloy rendering is synchronous. The generation must happen
  // BEFORE the component tree is constructed. The caller should pass
  // pre-generated project files.

  if (!props.project) return props.children ?? null;

  const files = props.project.getSourceFiles();
  return (
    <>
      {files.map((file) => (
        <ts.SourceFile path={file.getFilePath()}>
          {file.getFullText()}
        </ts.SourceFile>
      ))}
      {props.children}
    </>
  );
}
