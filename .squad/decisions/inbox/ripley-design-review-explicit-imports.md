# Design Review: Removing Explicit Import String Concatenation

**Author:** Ripley (Lead)
**Date:** 2026-02-21
**Status:** Proposed
**Scope:** 5 component files, 13 explicit import string concatenation sites

---

## Problem Statement

Five Alloy component files bypass Alloy's auto-import system by manually building import strings like:
```ts
`import { ${name} } from "./${path}.js";`
```

This causes three categories of bugs:
1. **Self-imports** — Alloy doesn't know two symbols share a file, so it may import a symbol from itself
2. **Missing imports** — symbols used as raw strings in `code` templates aren't tracked by Alloy
3. **Wrong paths** — hardcoded relative path arithmetic (e.g., `"../".repeat(depth + 2)`) doesn't adapt when output structure changes

---

## Inventory of All 13 Explicit Import Sites

### ClassicalClient.tsx (4 sites)

| Line | Import Target | Existing Refkey? | Bug Risk |
|------|--------------|-----------------|----------|
| 298 | Child classical client class + OptionalParams | `classicalClientRefkey(childClient)`, `clientOptionalParamsRefkey(childClient)` | Self-import if parent/child share subfolder |
| 384 | API functions (`create${name}`, operation functions) | `clientContextFactoryRefkey()`, `operationRefkey()` | Missing imports if operation list computation diverges |
| 388 | Classic operation group functions + interfaces | **No refkeys exist** | Wrong path if classic/ structure changes |
| 391 | `SimplePollerLike`, `getSimplePoller` | `simplePollerHelperRefkey()` exists, **no declaration in Alloy tree** | Wrong path |

### ClassicalOperationGroups.tsx (3 sites)

| Line | Import Target | Existing Refkey? | Bug Risk |
|------|--------------|-----------------|----------|
| 491 | RLC client type from context | `clientContextRefkey()` | Wrong path — `"../".repeat(maxLayer + 2)` arithmetic |
| 495 | API operation functions | `operationRefkey()` | Wrong path — same depth arithmetic |
| 501 | `SimplePollerLike`, `getSimplePoller` | `simplePollerHelperRefkey()` exists, **no declaration in Alloy tree** | Wrong path |

### Operations.tsx (2 sites)

| Line | Import Target | Existing Refkey? | Bug Risk |
|------|--------------|-----------------|----------|
| 236 | Static helpers (URL template, polling, paging, binary, XML) | All refkeys exist in `StaticHelperRefkeys.ts`, **no declarations in Alloy tree** | Wrong path — depth-relative computation |
| 284 | RLC client as `Client` (aliased import) | `clientContextRefkey()` | Wrong path + alias complication |

### RestorePoller.tsx (3 sites)

| Line | Import Target | Existing Refkey? | Bug Risk |
|------|--------------|-----------------|----------|
| 152 | Deserialize functions from operation files | `deserializeFunctionRefkey()` | Wrong path; also uses rename (`as`) for collision avoidance |
| 162 | Classical client class | `classicalClientRefkey()` | Self-import (same subfolder) |
| 185 | `getLongRunningPoller` | `pollingHelperRefkey()` exists, **no declaration in Alloy tree** | Wrong path — manual `path.relative()` |

### Samples.tsx (1 site)

| Line | Import Target | Existing Refkey? | Bug Risk |
|------|--------------|-----------------|----------|
| 193 | Classical client from **npm package name** | `classicalClientRefkey()` | **NONE — this is correct** |

---

## Approach A: Full Refkey Auto-Import

Replace each explicit import string with refkey references in `code` tagged templates. Alloy automatically generates import statements.

**How it works:**
```tsx
// BEFORE (manual import string):
const imports = `import { ${name} } from "./api/index.js";`;
return <ts.SourceFile path={filePath}>{code`${imports}\n...${name}(...)`}</ts.SourceFile>;

// AFTER (refkey in code template):
const nameRef = operationRefkey(op);
return <ts.SourceFile path={filePath}>{code`export function foo() { return ${nameRef}(...); }`}</ts.SourceFile>;
// Alloy auto-generates: import { name } from "./api/operations.js";
```

**Reference:** The `http-client-js` emitter in `submodules/typespec/` uses this pattern exclusively — zero manual import strings across all components. Every cross-file reference uses refkeys, and Alloy resolves import paths and avoids self-imports automatically.

### Prerequisites

1. **Static helper declarations must have refkeys in the Alloy tree.** Currently `StaticHelperFiles.tsx` renders raw strings — exports aren't refkey-annotated. Alloy can't auto-import a symbol it doesn't know about.

2. **New refkeys needed for classical operation group symbols.** `ClassicalOperationGroups.tsx` generates `_get${name}Operations` functions and `${name}Operations` interfaces but doesn't export refkey accessor functions for them.

3. **Import alias (`as`) support.** `Operations.tsx` line 284 imports `${rlcClientName} as Client`. Alloy doesn't natively support import aliases in auto-import — needs a workaround (e.g., type alias declaration, or using the original name).

### Pros

- **Eliminates all three bug categories** — self-imports, missing imports, wrong paths are structurally impossible
- **Matches the reference implementation** — http-client-js proves this works at scale
- **Future-proof** — no maintenance cost for path arithmetic as output structure evolves

### Cons

- **Large prerequisite:** Static helper file refkey annotation is a significant change (affects `StaticHelperFiles.tsx`, potentially all 22 static helper files)
- **All-or-nothing per file:** Mixing auto-import and manual import in one `<ts.SourceFile>` is fragile
- **Import alias gap:** The `as Client` pattern may need an Alloy-level solution

### Effort Estimate

- Static helper refkey annotation: **Large** (new component or parse-and-annotate strategy)
- New refkeys for classical groups: **Small** (follow existing pattern)
- Per-file migration: **Medium** each × 4 files (Samples.tsx excluded)

---

## Approach B: Centralized Path Resolution (Keep Manual Imports, Fix Paths)

Keep the import string pattern but replace hardcoded path arithmetic with a centralized path resolver. Add self-import detection as a guard.

**How it works:**
```tsx
// BEFORE: manual depth arithmetic
const prefix = "../".repeat(maxLayer + 2);
imports.push(`import { ${name} } from "${prefix}api/index.js";`);

// AFTER: resolver computes correct relative path
const importPath = resolveImportPath(currentFilePath, "api/index.js");
if (importPath !== null) { // null means same-file (skip self-import)
  imports.push(`import { ${name} } from "${importPath}";`);
}
```

### Prerequisites

- Create a `resolveImportPath(from, to)` utility that computes correct relative paths
- Add same-file detection (comparing normalized paths) to skip self-imports

### Pros

- **Minimal change per file** — only the path computation changes, not the rendering approach
- **No prerequisites on static helpers** — works with raw string rendering as-is
- **Incremental** — can fix one file at a time without affecting others

### Cons

- **Doesn't fix missing imports** — symbols used as raw strings still aren't tracked
- **Temporary** — will be replaced when full Alloy migration completes
- **Still fragile** — path correctness depends on convention, not the framework
- **Doesn't match reference implementation** — diverges from the proven pattern

### Effort Estimate

- Path resolver utility: **Small**
- Per-file update: **Small** each × 5 files
- Self-import guard: **Small**

---

## Analysis: Which Imports CANNOT Use Refkeys?

### Samples.tsx line 193 — KEEP AS-IS

```ts
`import { ${getClassicalClientName(...)} } from "${packageName}";`
```

This imports the classical client from the **published npm package name** (e.g., `"@azure/arm-resources"`). This is sample code that end-users copy — it must reference the package by name, not by relative path. Alloy refkeys operate within the render tree and cannot reference external package names that aren't registered with `createPackage()`.

**Verdict:** This import is correct. It is not a source of self-import, missing-import, or wrong-path bugs. Leave it unchanged.

### RestorePoller.tsx line 152 — COMPLEX (import renaming)

```ts
`import { ${detail.deserName} as ${detail.renamedDeserName} } from "${key}";`
```

This imports deserialize functions with **collision-avoidance renaming** (when two operations produce `_fooDeserialize`, one gets renamed). Alloy's auto-import doesn't natively support `import { X as Y }` syntax. However, `deserializeFunctionRefkey()` exists and produces unique refkeys per operation, so renaming would be unnecessary if the refkey-generated names are already unique.

**Verdict:** Convertible to refkeys, but the rename logic needs to be preserved or proven unnecessary.

---

## Recommendation: Approach A, Prioritized by Impact

**Adopt Approach A (full refkey auto-import)** but execute incrementally in priority order. Approach B only fixes paths and self-imports, not missing imports — it's a partial fix that creates migration debt.

### Execution Order

#### Phase 1 — Low-Hanging Fruit (No Prerequisites)

These files have ALL required refkeys already declared in the Alloy tree:

| Priority | File | Import (line) | Refkey | Risk |
|----------|------|--------------|--------|------|
| P1 | RestorePoller.tsx | Classical client (162) | `classicalClientRefkey()` | Low — single symbol, refkey exists, declaration in tree |
| P2 | ClassicalClient.tsx | Child clients (298) | `classicalClientRefkey()` + `clientOptionalParamsRefkey()` | Medium — multiple children, loop logic |

**How:** Replace the manual import string with the refkey in the `code` template where the symbol is **used**, not where it's imported. Alloy handles the rest.

**Example for RestorePoller.tsx line 162:**
```tsx
// BEFORE:
const classicalClientImport = `import { ${classicalClientName} } from "./${normalizeName(classicalClientName, NameType.File)}.js";`;
// ... later in <ts.SourceFile>:
{classicalClientImport}
// ... in code template:
client: ${classicalClientName},

// AFTER:
// Remove classicalClientImport variable entirely
// In code template, use the refkey:
const ccRef = classicalClientRefkey(client);
// ... in code template:
client: ${ccRef},
// Alloy generates the import automatically
```

**Validation:** Check generated output for RestorePoller to confirm the import statement is correct and no self-import occurs.

#### Phase 2 — API and Classic Imports (New Refkeys Needed)

| Priority | File | Import (line) | Blocker |
|----------|------|--------------|---------|
| P3 | ClassicalClient.tsx | API imports (384) | Operation functions used as string names in method bodies |
| P4 | ClassicalClient.tsx | Classic imports (388) | ClassicalOperationGroups needs refkeys for functions/interfaces |
| P5 | ClassicalOperationGroups.tsx | RLC client (491) + API (495) | Same as P3/P4 |
| P6 | Operations.tsx | Client import (284) | Import alias `as Client` |

**Prerequisite:** Create refkey accessor functions in `ClassicalOperationGroups.tsx` for:
- `_get${name}Operations` functions
- `${name}Operations` interfaces

**Import alias workaround for Operations.tsx:** Instead of `import { X as Client }`, declare a local type alias:
```tsx
// In code template:
type Client = ${clientContextRefkey(client)};
```
This eliminates the aliased import entirely.

#### Phase 3 — Static Helper Imports (Requires Infrastructure Change)

| Priority | File | Import (line) |
|----------|------|--------------|
| P7 | Operations.tsx | Static helpers (236) |
| P8 | ClassicalClient.tsx | SimplePoller (391) |
| P9 | ClassicalOperationGroups.tsx | SimplePoller (501) |
| P10 | RestorePoller.tsx | getLongRunningPoller (185) |

**Prerequisite:** `StaticHelperFiles.tsx` must annotate declarations with refkeys. Two sub-options:

**Option 3A — Parse and Annotate:** Parse each static helper file's exports, generate `<ts.FunctionDeclaration>` / `<ts.InterfaceDeclaration>` with `refkey={staticHelperRefkey(category, name)}` for each export, render function bodies as raw strings.

**Option 3B — Declaration Stubs:** Add a companion component that renders only declaration stubs (just the export signature + refkey) for each static helper. The actual implementation continues as raw string content. Alloy sees the refkey-annotated stub and resolves imports; the raw content provides the implementation.

**Recommended:** Option 3A — it's cleaner and avoids duplicate declarations. However, it requires a TypeScript parser to extract export signatures from the static helper files.

#### Not Addressed — Samples.tsx

Leave line 193 as-is. NPM package imports in sample code are semantically different from generated-code cross-file references.

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Alloy auto-import generates wrong path for edge cases (e.g., multi-client subfolders) | Medium | High — broken build | Run smoke tests after each phase; compare generated output against baseline |
| Refkey resolution fails for symbols in deep operation group hierarchies | Low | Medium — missing imports | Phase 1/P2 tests multi-level scenarios; catch issues early |
| Static helper refkey annotation breaks existing raw string content | Low | High — runtime errors | Phase 3 should validate all 22 static helper files individually |
| Import alias removal changes generated client API surface | Very Low | Low — internal rename only | `Client` alias is internal to operation files, not public API |

---

## Summary

- **13 explicit import sites** across 5 files
- **1 site (Samples.tsx) is correct as-is** — NPM package import
- **4 sites can be fixed immediately** (Phase 1) — refkeys and declarations exist
- **4 sites need new refkeys** (Phase 2) — for classical operation groups
- **4 sites are blocked** (Phase 3) — waiting on static helper refkey annotations
- **Recommended approach:** Full refkey auto-import (Approach A), executed in 3 phases
- **Estimated total effort:** Phase 1 (small), Phase 2 (medium), Phase 3 (large)
