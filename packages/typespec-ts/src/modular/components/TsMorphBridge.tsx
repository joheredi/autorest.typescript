import { Children } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import { Project } from "ts-morph";

export interface TsMorphBridgeProps {
  /**
   * The ts-morph Project containing generated files to emit.
   */
  project?: Project;

  /**
   * The emitter output directory. File paths from ts-morph will be
   * made relative to this directory to avoid path doubling when
   * writeOutput() joins emitterOutputDir + filePath.
   */
  emitterOutputDir: string;

  children?: Children;
}

/**
 * Bridge component that takes pre-generated ts-morph source files and emits
 * them through the Alloy pipeline. File paths are made relative to
 * emitterOutputDir to work correctly with writeOutput().
 */
export function TsMorphBridge(props: TsMorphBridgeProps): Children {
  if (!props.project) return props.children ?? null;

  const files = props.project.getSourceFiles();
  const baseDir = props.emitterOutputDir.replace(/\/$/, "");

  return (
    <>
      {files.map((file) => {
        let filePath = file.getFilePath();
        // Make path relative to emitterOutputDir to avoid doubling
        if (filePath.startsWith(baseDir)) {
          filePath = filePath.slice(baseDir.length) as any;
          // Remove leading slash
          if (filePath.startsWith("/")) {
            filePath = filePath.slice(1) as any;
          }
        }
        return (
          <ts.SourceFile path={filePath}>{file.getFullText()}</ts.SourceFile>
        );
      })}
      {props.children}
    </>
  );
}
