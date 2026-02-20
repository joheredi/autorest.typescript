/**
 * Index file components — pure Alloy JSX.
 *
 * RootIndex generates the root index.ts and sub-client index files.
 * SubpathIndex generates barrel index files for models/, api/, and classic/.
 */

export { RootIndex } from "./RootIndex.js";
export type { RootIndexProps } from "./RootIndex.js";
export { SubpathIndex } from "./SubpathIndex.js";
export type { SubpathIndexProps } from "./SubpathIndex.js";
