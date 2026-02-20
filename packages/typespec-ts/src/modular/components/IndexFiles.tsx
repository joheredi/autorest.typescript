/**
 * Index file components - placeholder.
 *
 * Index file generation is still handled by the ts-morph pipeline because
 * it inspects existing source files in the ts-morph project to determine
 * what to export. Will be converted to JSX in Phase 4.
 *
 * In the Alloy world, this will use:
 * - <ts.BarrelFile> for simple barrel exports
 * - Custom components that track what was emitted via sibling refkeys
 */

// These re-exports are used by the ts-morph pipeline in index.ts
export { buildRootIndex, buildSubClientIndexFile } from "../buildRootIndex.js";
export { buildSubpathIndexFile } from "../buildSubpathIndex.js";
