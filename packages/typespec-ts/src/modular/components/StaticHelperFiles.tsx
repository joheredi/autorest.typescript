import { Children } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";

export interface StaticHelperFilesProps {
  /**
   * Map of relative file paths to file contents.
   * Example: "static-helpers/pagingHelpers.ts" → "export function..."
   */
  files: Map<string, string>;
  children?: Children;
}

/**
 * Renders static helper files as pure Alloy <ts.SourceFile> components.
 * Each file is written through the Alloy pipeline with its content as-is.
 */
export function StaticHelperFiles(props: StaticHelperFilesProps): Children {
  const files: Children[] = [];

  for (const [relativePath, content] of props.files) {
    files.push(<ts.SourceFile path={relativePath}>{content}</ts.SourceFile>);
  }

  return (
    <>
      {files}
      {props.children}
    </>
  );
}
