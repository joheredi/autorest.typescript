import { Children } from "@alloy-js/core";
import { Project } from "ts-morph";
import { emitFile, type Program } from "@typespec/compiler";

export interface TsMorphBridgeProps {
  /**
   * The ts-morph Project containing generated files to emit.
   */
  project?: Project;

  /**
   * The TypeSpec Program for writing files.
   */
  program?: Program;

  children?: Children;
}

/**
 * Bridge component that writes pre-generated ts-morph source files directly
 * using the TypeSpec compiler's emitFile. ts-morph files have absolute paths
 * that can't be joined with emitterOutputDir, so they bypass the Alloy
 * rendering pipeline and are written as a side-effect during construction.
 *
 * Pure Alloy children are still rendered normally.
 */
export function TsMorphBridge(props: TsMorphBridgeProps): Children {
  if (props.project && props.program) {
    const files = props.project.getSourceFiles();
    for (const file of files) {
      // Write ts-morph files directly — they have absolute paths
      // that the Alloy pipeline can't handle (writeOutput would double them)
      void emitFile(props.program, {
        content: file.getFullText(),
        path: file.getFilePath()
      });
    }
  }

  return props.children ?? null;
}
