import * as ts from "@alloy-js/typescript";
import { ModularEmitterOptions } from "../interfaces.js";

export interface LoggerProps {
  emitterOptions: ModularEmitterOptions;
  srcPath?: string;
}

/**
 * Generates the logger.ts file for Azure-flavored packages.
 * Only emitted when the flavor is "azure".
 */
export function Logger(props: LoggerProps) {
  const { emitterOptions, srcPath = "src" } = props;

  if (emitterOptions.options.flavor !== "azure") return null;

  const name =
    emitterOptions.options.packageDetails?.nameWithoutScope ??
    emitterOptions.options.packageDetails?.name;

  return (
    <ts.SourceFile path={`${srcPath}/logger.ts`}>
      {`import { createClientLogger } from "@azure/logger";\n\nexport const logger = createClientLogger("${name}");`}
    </ts.SourceFile>
  );
}
