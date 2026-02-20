/**
 * Index file components.
 *
 * Note: The full RootIndex and SubpathIndex JSX components are deferred.
 * The index file generation is deeply coupled to ts-morph (it inspects
 * existing source files in the project to determine what to export).
 *
 * In Alloy, this would be handled by:
 * - <ts.BarrelFile> for simple barrel exports
 * - Custom components that track what was emitted
 *
 * For now, the existing buildRootIndex.ts and buildSubpathIndex.ts
 * continue to be used.
 */

export { buildRootIndex, buildSubClientIndexFile } from "../buildRootIndex.js";
export { buildSubpathIndexFile } from "../buildSubpathIndex.js";
