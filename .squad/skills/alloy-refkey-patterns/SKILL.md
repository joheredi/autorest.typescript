# Skill: Alloy Refkey Patterns for Static Helpers

## When to use
When creating Alloy refkeys for symbols that exist in files NOT yet rendered through Alloy's component tree (e.g., files emitted by TsMorphBridge or other side-effect mechanisms).

## Pattern: Refkey accessor functions with manual imports

```tsx
// 1. Define type-safe refkey accessors (StaticHelperRefkeys.ts)
import { refkey, Refkey } from "@alloy-js/core";

type HelperName = "functionA" | "functionB";

export function helperRefkey(name: HelperName): Refkey {
  return refkey("Namespace", "Category", name);
}

// 2. Define file metadata for manual imports
export function getHelperFileInfo(category: string, name: string) {
  return { relativePath: "helpers/file.ts", exportName: name };
}

// 3. Use in consumer component
const info = getHelperFileInfo("Category", "functionA");
const relPath = path.relative(consumerDir, path.dirname(path.join(srcPath, info.relativePath)));
const importStatement = `import { ${info.exportName} } from "${relPath}/${basename}.js";`;
```

## Key constraints
- `createPackage()` only works for npm packages — NOT for relative/internal imports
- Alloy auto-import requires declarations in the component tree via `<ts.SourceFile>`
- TsMorphBridge writes via `emitFile()` during render; Alloy writes AFTER render — if both target the same path, Alloy wins
- Use `refkey()` from `@alloy-js/core`, NEVER from `../../framework/refkey.js`

## Anti-patterns
- Don't mix old string-based refkeys with Alloy Refkey objects
- Don't render "stub" SourceFiles alongside TsMorphBridge for the same paths
- Don't hardcode function names — use `getStaticHelperFileInfo()` as single source of truth
