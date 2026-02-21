# Decisions

## 2026-02-20: Team Formation
**By:** Squad (Coordinator)
**What:** Team formed for Alloy migration. Ripley (Lead), Dallas (JSON Serializers), Kane (XML Serializers), Lambert (Operations), Parker (Tester).
**Why:** Migration plan has clear domain boundaries between JSON serialization, XML serialization, and operations — warrants separate specialists.

## 2026-02-20: Migration plan adopted
**By:** Jose Manuel Heredia Hidalgo
**What:** The migration plan at `packages/typespec-ts/ALLOY_MIGRATION_PLAN.md` is the authoritative source of truth for this work.
**Why:** Pre-existing plan with 9 steps, gotchas, and validation criteria.

## 2026-02-20: Phase 1 Architecture — Refkey-first, rendering deferred
**By:** Ripley (Lead)
**What:** Static helpers are NOT yet rendered through Alloy `<ts.SourceFile>` components. They continue through `loadStaticHelpers()` → TsMorphBridge. Refkey functions establish the stable API contract.
**Why:** Rendering through Alloy would cause dual-write conflicts with TsMorphBridge. Deferred to Phase 9 when all consumers are migrated. Phase 1 creates refkeys alongside old system (dual-path coexistence).

## 2026-02-20: Phase 1 Architecture — Manual imports over auto-imports
**By:** Ripley (Lead)
**What:** `getStaticHelperFileInfo()` enables components to build manual import statements instead of relying on Alloy's auto-import resolution.
**Why:** Pragmatic bridge: components get correct import paths without needing declarations in Alloy tree. Auto-imports deferred to Phase 9.

## 2026-02-20: Phase 1 Architecture — Refkey namespace isolation
**By:** Ripley (Lead)
**What:** All static helper refkeys use prefix `refkey("StaticHelpers", category, name)`. Isolated from old framework refkeys (string-based), type refkeys, and operation refkeys.
**Why:** Clear separation prevents import confusion between Alloy refkeys (return Refkey objects) and old framework refkeys (return strings) during migration.

## 2026-02-20: JSON Serializers Coexistence Strategy
**By:** Dallas (JSON Serializer Dev)
**Status:** Implemented (Phase 2-3)
**What:** Created `Serializers.tsx` Alloy component that renders JSON serializer/deserializer functions alongside the existing ts-morph generation pipeline. Both systems produce the same functions; Alloy's output takes precedence via `writeOutput` ordering.
**Why:** Operations code still depends on the old binder (resolveReference) for serializer name resolution. Removing `addSerializationFunctions` from `emitModels.ts` would break operation file generation. The coexistence pattern lets us add Alloy refkeys NOW while keeping the binder operational.
**Impact on other agents:**
- **Kane (XML Serializers):** Same coexistence pattern. XmlSerializers.tsx already follows this.
- **Lambert (Operations):** When operations are migrated to Alloy, they should use `refkey(type, "serializer")` and `refkey(type, "deserializer")` from `@alloy-js/core` (or import `serializerRefkey`/`deserializerRefkey` from `components/Serializers.js`).
- **Parker (Tester):** No test changes needed — serializer output should be identical.
**Cleanup Path:** After Lambert completes the operations migration (Phase 5-6), the old `emitModels.ts → addSerializationFunctions → addDeclaration` chain can be deleted. The Alloy Serializers component becomes the sole source of serializer functions.

## 2026-02-20: XML Serializers Alloy Component Architecture
**By:** Kane (XML Serializer Dev)
**Status:** Implemented (Phase 4)
**What:** Created `XmlSerializers.tsx` as a standalone Alloy component that renders XML serializer/deserializer functions. It coexists with the old `buildXmlSerializerFunction.ts` — both paths produce the same refkeys so they don't conflict.
**Why:**
- Keeps XML domain separate from JSON serializers (Dallas's domain)
- Reuses pure utility functions (`hasXmlSerialization`, `getXmlRootName`, `getXmlRootNs`) from the old file without duplication
- Duplicates the metadata-building helpers (`buildPropertyMetadataArray`, `buildXmlOptionsString`, etc.) since these are tightly coupled to the rendering approach
**Impact:**
- The old `buildXmlSerializerFunction.ts` is NOT modified — Lambert's `operationHelpers.ts` still calls it for the ts-morph path
- When `emitModels.ts` is deleted (Phase 7), the old file's exported builders can also be removed
- The `uint8ArrayToString` dependency is resolved via `httpRuntimeLib` / `azureCoreUtilLib` based on `isAzurePackage()` check

## 2026-02-20: Operations Migration — Shared Function Boundary
**By:** Lambert (Operations Dev)
**Status:** Implemented (Phase 5-6)
**What:** When migrating `resolveReference()` calls from `operationHelpers.ts`, **9 calls were intentionally preserved** in functions shared between the operation pipeline and the serializer pipeline:
- `getSerializationExpressionForFlatten` — `resolveReference(SerializationHelpers.areAllPropsUndefined)`
- `serializeRequestValue` — `resolveReference(dependencies.uint8ArrayToString)` and `resolveReference(serializerRefkey)`
- `deserializeResponseValue` — `resolveReference(dependencies.stringToUint8Array)`
**Why:** These functions are called from **both** the operation generation (now Alloy JSX) **and** the serializer generation (still ts-morph + binder). Removing `resolveReference()` from them breaks serializer import tracking, causing 120+ unit test failures.
**Cleanup Path:** When the serializer pipeline migrates to Alloy (later phases), the remaining 9 `resolveReference()` calls can be removed from these shared functions. The serializer migration should include replacing these calls with Alloy Refkeys in code templates.
**Import Strategy for Operations:** Operation files use **explicit import computation** (not Alloy auto-import) because function bodies are rendered as raw strings from Category A/B helpers. The `collectFileImports` function in Operations.tsx analyzes operations to determine required imports. When the full code-template conversion happens (Phase 9), this can switch to Alloy auto-import.

## 2026-02-20: Phases 7-9 Cleanup Blocked
**By:** Parker (Tester)
**Status:** Blocked
**What:** Phases 7-9 (delete emitModels.ts, remove tsMorphGenerate callback, delete old framework) cannot proceed. Every target file is still actively imported by production code and/or test infrastructure.
**Evidence:** Full audit in .squad/decisions/inbox/ shows:
- emitModels.ts: 8 exported utility functions imported by 10 production files. emitTypes() still called in tsMorphGenerate callback.
- tsMorphGenerate callback: Still runs emitTypes + binder.resolveAllReferences. 60+ resolveReference() calls across 15+ files depend on the old binder.
- framework/: resolveReference (15+ files), addDeclaration (3 files), old refkey (10 files). Not removable.
- 14/14 test helpers ACTIVE, all use old ts-morph pipeline. Zero Alloy coverage in test infrastructure.
- 267 scenario tests ACTIVE, valuable as regression guards, but no tests validate Alloy rendering output.
**Recommendation:** Assign prerequisite migration to Dallas/Kane/Lambert/Ripley before re-attempting Phases 7-9. The cleanup is the final step, not the next step.

## 2026-02-20: Test Infrastructure Status — All Helpers Active
**By:** Parker (Tester)
**Status:** Analysis complete
**What:** All 14 emitUtil test helpers are ACTIVE and use the old ts-morph pipeline. 267 scenario-level test assertions exist covering Modular SDK. Zero tests validate Alloy rendering output.
**Why:** Helpers are actively imported by test files. They are only deletable when their corresponding old builders are deleted AND new Alloy-based test coverage exists.
**Helpers breakdown:** RLC (8 helpers) for transform-based code generation, Modular (6 helpers) for ts-morph pipeline. All 14 have active test users.
**When deletable:** A helper becomes deletable when its output domain is fully migrated to Alloy AND a new test validates Alloy output. Likely deletion order: Operations → Models → Client → ClassicalClient → RootIndex → Samples → RLC helpers.
**Critical gap:** Zero tests validate Alloy rendering output against expected code. Before deleting any old helper, create parallel scenario tests that run the Alloy pipeline and compare output.

## 2026-02-20: Extract Pure Utility Functions
**By:** Ripley (Lead)
**Status:** Implemented (R1)
**What:** Created src/modular/model-utils.ts containing 6 pure utility functions extracted from emitModels.ts: normalizeModelName, getModelNamespaces, getModelsPath, getAdditionalPropertiesName, getApiVersionEnum, buildEnumTypes.
**Why:** These functions are imported by 10+ files but have zero dependency on the old framework. Extracting them decouples Alloy components from the ts-morph-heavy emitModels.ts, a prerequisite for eventually deleting emitModels.ts.
**Impact:** emitModels.ts re-exports all 6 functions for backward compatibility. model-utils.ts has ZERO imports from src/framework/ or contextManager.ts. Unblocks future deletion of emitModels.ts.

## 2026-02-20: Remove tsMorphGenerate callback from production codepath
**By:** Ripley (Lead)
**Status:** Implemented (Phase 8, R7-R8)
**What:** Removed the `tsMorphGenerate` callback from the production emitter pipeline. This callback previously called `emitTypes()` (model interfaces + serializer functions via ts-morph) and `binder.resolveAllReferences()` (old binder placeholder resolution). Both are now unnecessary:
- Model interfaces are rendered by `Models.tsx` (Alloy)
- Serializers are rendered by `Serializers.tsx` + `XmlSerializers.tsx` (Alloy)
- Zero `resolveReference()` calls remain in production code

Also removed the binder initialization (`provideBinder`) and external dependency imports from `index.ts`, since the binder was only consumed by the callback.
**Why:** The tsMorphGenerate callback was the last piece connecting the old ts-morph/binder pipeline to the production codepath. With all model interfaces, serializers, and operations now rendered through Alloy components, the callback was generating output that Alloy immediately overwrote. The binder's `resolveAllReferences()` had nothing to resolve since all `resolveReference` calls were already removed.
**Impact:**
- **Production codepath:** Cleaner and faster — no longer runs `emitTypes()` or binder resolution during generation.
- **Test infrastructure:** Unaffected — `testUtil.ts` has its own `provideBinder` setup independent of `index.ts`.
- **TsMorphBridge:** Still operational — static helpers loaded via `loadStaticHelpers()` are still written through it.
- **Next step:** Phase 9 can now render static helpers as Alloy `<ts.SourceFile>` components, which would eliminate TsMorphBridge entirely.

## 2026-02-21: Phase 10.5 — Static Helpers Converted to Pure Alloy
**By:** Ripley (Lead) / Lambert (Implementation) / Parker (Testing)
**Status:** Implemented
**What:** Replaced the ts-morph-based static helper loading system (TsMorphBridge) with pure Alloy `<ts.SourceFile>` components. Static helpers are now read as strings, import-rewritten, and rendered through the Alloy pipeline like all other generated files.
**Implementation:**
- `load-static-helpers-alloy.ts` — reads .ts files into `Map<path, content>`, applies Azure import rewrites
- `StaticHelperFiles.tsx` — renders map entries as `<ts.SourceFile path={path}>{content}</ts.SourceFile>`
- Deleted `TsMorphBridge.tsx` — no longer needed
- Preserved `load-static-helpers.ts` — test infrastructure still uses it for ts-morph-based binder tests
**Why:** Eliminates ts-morph Project dependency from production emitter. All generated files now flow through the Alloy `writeOutput()` pipeline, providing uniform rendering and path resolution.
**Impact:**
- **Production code:** No longer depends on ts-morph Project. All files rendered through Alloy.
- **Test infrastructure:** Unaffected — continues using old `loadStaticHelpers` for binder tests.
- **Architecture:** Simplified—one rendering path (Alloy) instead of two (Alloy + ts-morph).
**Validation:** Type check ✅, Build ✅, 309 RLC + 282 Modular unit tests ✅

## 2026-02-21: Alloy Test Helpers Produce Unresolved Refkeys — Blocker Identified
**By:** Parker (Tester)
**Status:** BLOCKER for full test migration
**What:** After Phase 8 removed the tsMorphGenerate callback, the test helper `emitModularModelsFromTypeSpec` was broken. Migrated it to use Alloy `renderModels()` to return rendered strings. However, Alloy-rendered output contains **unresolved refkeys in type positions** (e.g., `<Unresolved Symbol: refkey[o453]>`), causing ~236 test failures where prettier fails to parse the syntax.
**Root Cause:** When Alloy components (Models.tsx, Serializers.tsx) render in ISOLATION (as in unit tests), they don't have access to the full Alloy rendering context that resolves refkeys. The production emitter renders all components together in a single pass, allowing Alloy's auto-import and refkey resolution to work. Test helpers render individual components separately.
**Blocker for Full Test Migration:** Cannot fully migrate tests to Alloy helpers until ONE of:
1. **Alloy components resolve all type refkeys** — requires understanding Alloy's resolution mechanism
2. **Tests accept unresolved refkeys** — not realistic for validation
3. **Add post-render resolution pass** — manually resolve refkeys after rendering (defeats purpose)
4. **Render full context in tests** — render ALL components together (Models + Serializers + Operations) even when test only needs one file
**Recommendation:** Option 4 (full context rendering) is most practical. Modify test helpers to render full component tree like production does, then extract specific files from the output map.
**Files Modified:** `src/test-utils/alloy-test-render.tsx`, `test/util/emitUtil.ts`, `test/modularUnit/scenarios.spec.ts`, `test/modularUnit/modelsGenerator.spec.ts`

## 2026-02-21: StaticHelperFiles Component and File-Reading Utility
**By:** Lambert (Operations Dev)
**Status:** Complete
**What:** Created the `StaticHelperFiles` Alloy component and the `loadStaticHelpersAlloy` file-reading utility for rendering static helper files through the Alloy JSX pipeline.
**Implementation:**
- `loadStaticHelpersAlloy` reads all `.ts` files from `static/static-helpers/` recursively, rewrites Azure imports for non-Azure packages
- `StaticHelperFiles.tsx` uses `<For>` helper to render each file as `<ts.SourceFile>`
- Integrated into `alloy-emitter.tsx` and `index.ts`
**Why:** Prepares for Phase 9 where static helpers render entirely through Alloy JSX instead of TsMorphBridge.
**Benefits:** Separation of concerns (file reading vs. rendering), testability, consistency with Alloy patterns, strong typing
**Validation:** Build ✅, Format ✅, Linting ✅, Type checking ✅

## 2026-02-21: Cleanup Validation Strategy — Phase 8 Blockers
**By:** Parker (Tester)
**Status:** Analysis Complete — Awaiting Blocker Resolution
**What:** Identified files ready for deletion and critical blocker in buildProjectFiles.ts that requires refactoring before full cleanup.
**Files Ready for Deletion:**
- `src/modular/components/TsMorphBridge.tsx` (42 lines) — single import in alloy-emitter.tsx
- `src/framework/load-static-helpers.ts` (213 lines) — single import in index.ts (can be deleted after load-static-helpers-alloy replaces it)
**Critical Blocker:**
- `src/modular/buildProjectFiles.ts` getModelSubpaths() — queries ts-morph Project to find models/*/index.ts files for package.json exports. Called twice in index.ts (lines 415, 480). Only active production usage of outputProject context.
**Refactoring Options for getModelSubpaths():**
1. Use Alloy output map to enumerate models/*/index.ts files
2. Use file system scan after Alloy rendering (recommended—output already written to disk)
3. Compute model subpaths from SdkContext metadata before rendering
**outputProject Context Usage Audit:**
- `index.ts` — creation, provision, usage in getModuleExports (via getModelSubpaths)
- `emitModels.ts` — ORPHANED after R8 tsMorphGenerate removal
- `emitModelsOptions.ts` — ORPHANED after Alloy migration
- `buildProjectFiles.ts` — ONLY ACTIVE production usage (blocker)
**Next Steps:** Resolve buildProjectFiles.ts blocker, then safe to delete TsMorphBridge.tsx and load-static-helpers.ts
