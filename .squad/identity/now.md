# Current Focus

## Last Session: 2026-02-22

**Branch:** `spike/emitter-migration`
**Last Commit:** `848561af4` — Phase 12: Remove explicit imports + fix self-imports, XML stubs, classic client defaults

## What's Done
- Phases 1–12 complete. Emitter fully migrated to Alloy JSX for operations, models, serializers.
- Build clean (`pnpm build` succeeds). RLC unit tests: 309 passing, 0 failing.
- 4 critical bugs fixed last session: self-imports, XML stubs in samples, classic client defaults, OptionalParams imports.

## Current State (verified 2026-02-22)
- **Modular unit tests:** 190 passing, 336 failing, 2 pending
- **RLC unit tests:** 309 passing, 9 pending, 0 failing ✅
- **Build:** Clean ✅

---

## What's Next — Phase 13 Work List

336 modular unit test failures across ~80 scenario files, traced to **6 distinct root causes**.
Recommended attack order: fix root causes first (high fan-out bugs), then mop up.

---

### P0 — Blocking (high fan-out, fix these first)

#### Bug 1: Operations import resolution (111 failures)
- **What:** Operations output uses `import type { TestingContext } from "./api/testingContext.js"; type Client = TestingContext;` instead of `import { TestingContext as Client } from "./index.js";` with value imports for serializers/deserializers.
- **Root cause:** In `Operations.tsx:288-300`, single-endpoint client uses `<ts.TypeDeclaration name="Client">{clientContextRefkey(client)}</ts.TypeDeclaration>` which resolves via Alloy refkeys to a type-only import with a separate type alias. The expected output is a direct `import { X as Client } from "./index.js"` with value imports for serializer functions from `"../models/models.js"`.
- **Also:** Static helper imports (`buildCsvCollection`, `buildSsvCollection`, `buildPipeCollection`, `uint8ArrayToString`, `errorResponseDeserializer`, `errorDeserializer`, `_readResponseArrayDeserializer`) are missing from operations output. Alloy refkey resolution does not auto-import these raw-string references.
- **Files:** `src/modular/components/Operations.tsx` (import block generation), `src/modular/components/StaticHelperRefkeys.ts`
- **Owner:** Lambert
- **Complexity:** L
- **Dependencies:** None — can start immediately
- **Parallelizable:** Yes (independent of all other bugs)

#### Bug 2: ClientContext replaced with XML stubs (11 failures)
- **What:** Every `clientContext` test block returns XML serialization stub content instead of the actual `createService()` factory + context interface.
- **Root cause:** In `test/util/emitUtil.ts:663`, `renderClientContext()` renders with `includeStaticHelperStubs=true` (default). `createSourceFilesFromText()` returns all rendered files, and `sourceFiles[0]` picks up the `static-helpers/serialization/xml-helpers.ts` stub file instead of the actual `api/*Context.ts` file because it sorts alphabetically or appears first in the output tree.
- **Fix:** Filter the returned files to find the one matching `*Context.ts` or `*context.ts` pattern, not just `[0]`.
- **Files:** `test/util/emitUtil.ts` (lines ~660-665)
- **Owner:** Dallas
- **Complexity:** S
- **Dependencies:** None
- **Parallelizable:** Yes

#### Bug 3: Models self-imports (110 failures, partially overlapping with Bug 1)
- **What:** Types defined in `models/models.ts` import themselves via `import type { X } from "./models/models.js"` within the same code block.
- **Root cause:** Serializer functions in `Serializers.tsx` reference model types via `refkey()`. Since Serializers and Models render to the same output file (`models/models.ts`), Alloy's auto-import system generates a self-import statement. The `import type` is erased at compile time (no runtime crash), but it causes test assertion mismatches because expected output has no self-imports.
- **Fix:** Either (a) configure Alloy to suppress intra-file imports, or (b) post-process the rendered output to strip self-imports from `models/models.ts`.
- **Files:** `src/modular/components/Serializers.tsx`, `src/modular/components/Models.tsx`, possibly `src/modular/components/Output.tsx`
- **Owner:** Kane
- **Complexity:** M
- **Dependencies:** None
- **Parallelizable:** Yes

---

### P1 — Important (lower fan-out but correctness issues)

#### Bug 4: Recursive union type self-reference (40+ failures in modelsGenerator.md)
- **What:** Polymorphic type aliases like `PetUnion = Cat | Dog | PetUnion` self-reference, causing infinite recursion. Expected: `PetUnion = Cat | Dog | Pet` (base type, not the union alias).
- **Root cause:** In `Models.tsx:405-417`, `PolymorphicTypeAlias` emits `<TypeExpression context={context} type={type} />` for the base type. But `TypeExpression` (line 193-194) checks `type.discriminatedSubtypes` and resolves to `polymorphicTypeRefkey(type)` — the alias itself — creating self-reference.
- **Fix:** Pass `skipPolymorphicUnion: true` in the options to `<TypeExpression>` at line 412, or use `<Reference refkey={typeRefkey(type)} />` directly.
- **Files:** `src/modular/components/Models.tsx` (line ~412)
- **Owner:** Kane
- **Complexity:** S
- **Dependencies:** None
- **Parallelizable:** Yes (can do with Bug 3)

#### Bug 5: Missing static helper imports in models — `areAllPropsUndefined`, `serializeRecord` (12+ failures)
- **What:** Flatten serializers call `areAllPropsUndefined()` and additional-property serializers call `serializeRecord()`, but these are emitted as raw strings without corresponding Alloy refkey bindings, so no import is generated.
- **Root cause:** `Serializers.tsx` lines 1287, 1319 emit `serializeRecord(...)` as template strings. Lines in flatten serializers emit `areAllPropsUndefined(...)` similarly. These are not resolved through Alloy's import system.
- **Fix:** Register `areAllPropsUndefined` and `serializeRecord` as static helper refkeys in `StaticHelperRefkeys.ts` and use the refkey system for imports, OR add explicit import statements in the serializer output.
- **Files:** `src/modular/components/Serializers.tsx`, `src/modular/components/StaticHelperRefkeys.ts`
- **Owner:** Lambert
- **Complexity:** M
- **Dependencies:** None
- **Parallelizable:** Yes

#### Bug 6: Flatten deserializer broken output (6 failures in complexFlattenCases.md, mulipleFlattenCases.md)
- **What:** Flatten deserializer functions produce `{ x: ["x"] }` (array literal) instead of `{ x: item["x"] }` (property access). Also missing some deserializer functions entirely.
- **Root cause:** `FlattenPropertyDeserializerFn` in `Serializers.tsx` passes incorrect property-access logic through the `ModelTypeDeserializerFn` when `flatten` options are active. The property rename/conflict-map handling creates array literals instead of property accesses.
- **Files:** `src/modular/components/Serializers.tsx` (lines ~1224-1260)
- **Owner:** Dallas
- **Complexity:** M
- **Dependencies:** None
- **Parallelizable:** Yes

#### Bug 7: Multipart file types emitted as `any` (5 failures)
- **What:** All `FileContents` union types for multipart file fields replaced with `any`, losing type safety.
- **Root cause:** Explicit `TODO` at `Models.tsx:316` — `// TODO: migrate multipart file type to JSX component`. Currently hardcoded as `typeContent = "any"`.
- **Fix:** Implement proper multipart file type expression using `FileContents | { contents: FileContents; contentType?: string; filename?: string }` pattern.
- **Files:** `src/modular/components/Models.tsx` (lines 310-318)
- **Owner:** Kane
- **Complexity:** M
- **Dependencies:** None
- **Parallelizable:** Yes

---

### P2 — Can Defer (cosmetic or low-impact)

#### Bug 8: Classic client default parameter values removed (9 failures)
- **What:** Methods like `list(options: ListOptionalParams)` lost default `= { requestOptions: {} }`. Breaking API change for callers.
- **Root cause:** `ClassicalClient.tsx` and `ClassicalOperationGroups.tsx` generate method signatures without default values.
- **Files:** `src/modular/components/ClassicalClient.tsx`, `src/modular/components/ClassicalOperationGroups.tsx`
- **Owner:** Dallas
- **Complexity:** S
- **Dependencies:** None
- **Parallelizable:** Yes

#### Bug 9: XML stubs in samples output (21 failures, cosmetic)
- **What:** Sample code blocks have spurious XML static-helper stubs injected at the top.
- **Root cause:** Same as Bug 2 — `StaticHelperStubs` rendered in test context bleeds into samples output. The samples render function includes stubs by default.
- **Fix:** Either disable stubs for sample rendering, or filter them from sample output.
- **Files:** `test/util/emitUtil.ts`, `src/test-utils/alloy-test-render.tsx`
- **Owner:** Dallas
- **Complexity:** S
- **Dependencies:** Bug 2 fix may also fix this

#### Bug 10: JSDoc formatting regression (minor, <5 failures)
- **What:** `/** * description */` instead of `/** description */` in some type docs. Extra `*` before text.
- **Root cause:** Alloy JSDoc rendering adds extra `*` line prefix.
- **Files:** `src/modular/components/Models.tsx` (doc rendering)
- **Owner:** Kane
- **Complexity:** S
- **Dependencies:** None

---

## Execution Strategy

### Wave 1 (Parallel — highest ROI)
| Bug | Owner | Est. | Expected failures fixed |
|-----|-------|------|------------------------|
| Bug 4: Recursive unions | Kane | S (1h) | ~40 |
| Bug 2: ClientContext XML stubs | Dallas | S (1h) | ~11 |
| Bug 8: Classic client defaults | Dallas | S (1h) | ~9 |
| Bug 5: Static helper imports | Lambert | M (2-3h) | ~12 |

**Wave 1 total:** ~72 failures fixed

### Wave 2 (Parallel — medium effort)
| Bug | Owner | Est. | Expected failures fixed |
|-----|-------|------|------------------------|
| Bug 3: Models self-imports | Kane | M (2-3h) | ~60 (overlap w/ Bug 1) |
| Bug 6: Flatten deserializers | Dallas | M (2-3h) | ~6 |
| Bug 7: Multipart file types | Kane | M (2h) | ~5 |
| Bug 1: Operations imports | Lambert | L (4-6h) | ~111 |

**Wave 2 total:** ~180 failures fixed (with overlaps)

### Wave 3 (Cleanup)
| Bug | Owner | Est. | Expected failures fixed |
|-----|-------|------|------------------------|
| Bug 9: XML stubs in samples | Dallas | S (30m) | ~21 |
| Bug 10: JSDoc formatting | Kane | S (30m) | ~5 |

**Wave 3 total:** ~26 failures fixed

### After all waves
- **Parker:** Run full unit test suite, integration tests, smoke tests
- Target: 0 modular unit test failures (from current 336)

## Agent Assignments (confirmed)
- **Lambert** → Bug 1 (operations imports), Bug 5 (static helper imports)
- **Dallas** → Bug 2 (clientContext stubs), Bug 6 (flatten deserializers), Bug 8 (defaults), Bug 9 (samples stubs)
- **Kane** → Bug 3 (self-imports), Bug 4 (recursive unions), Bug 7 (multipart), Bug 10 (JSDoc)
- **Parker** → Validation after each wave
- **Model:** All agents use `claude-opus-4.6`
