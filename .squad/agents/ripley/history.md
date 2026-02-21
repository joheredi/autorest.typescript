# Ripley — History

## Project Context
**Project:** TypeSpec TypeScript Emitter — Alloy Framework Migration
**Stack:** TypeScript, TypeSpec, Alloy JSX, ts-morph (being replaced)
**User:** Jose Manuel Heredia Hidalgo
**Plan:** `packages/typespec-ts/ALLOY_MIGRATION_PLAN.md`

## Learnings

### 2026-02-20: Phase 1 Readiness Analysis

**Architecture:**
- 11 Alloy-native components exist and build cleanly (`npx alloy build` ~1.3s).
- `ExternalPackages.tsx` is complete — all 8 external package libs defined with `createPackage()`.
- `StaticHelpers.tsx` is currently a placeholder comment file (deferred).
- `TsMorphBridge` writes ts-morph files via `emitFile()` directly (bypasses Alloy writeOutput).
- `alloy-emitter.tsx` lives at `src/alloy-emitter.tsx` (NOT `src/modular/alloy-emitter.tsx`).

**Key patterns:**
- Alloy refkeys use `refkey()` from `@alloy-js/core` (returns Refkey object).
- Old framework refkeys use `refkey()` from `src/framework/refkey.ts` (returns string). NEVER mix these.
- Components export named refkey functions: `typeRefkey(type)`, `operationOptionsRefkey(op)`, etc.
- External packages use `createPackage()` and are referenced as `httpRuntimeLib.Client`.
- Static helpers are loaded by `loadStaticHelpers()` into ts-morph Project, emitted via TsMorphBridge.

**Static helpers inventory:**
- 22 files in `static/static-helpers/` with ~50 exports needing refkeys.
- `serialization/serializers.ts` (7 exports) is NOT in `static-helpers-metadata.ts`.
- `serialization/get-binary-response-browser.mts` is NOT in metadata.
- `urlTemplate.ts` has `UrlTemplateOptions` interface not in metadata.

**Consumers of static helpers (for Phase 1 output):**
- `buildSerializerFunction.ts` → SerializationHelpers, MultipartHelpers
- `buildDeserializerFunction.ts` → SerializationHelpers
- `buildXmlSerializerFunction.ts` → XmlHelpers (all 12)
- `operationHelpers.ts` → PagingHelpers, PollingHelpers, SerializationHelpers, XmlHelpers, UrlTemplateHelpers
- `classicalOperationHelpers.ts` → SimplePollerHelpers
- `clientHelpers.ts` → CloudSettingHelpers
- `RestorePoller.tsx` → PollingHelpers.GetLongRunningPoller (has a TODO)

**Decisions:**
- Phase 1 should create Alloy refkeys alongside old system (dual-path coexistence).
- Fix RestorePoller.tsx TODO as early Phase 1 win.
- Do NOT delete `static-helpers-metadata.ts` or `external-dependencies.ts` until all consumers are migrated.

### 2026-02-20: Phase 1 Implementation — Static Helper Refkeys

**Architecture decisions:**
- Static helper refkeys use `refkey("StaticHelpers", category, name)` pattern — isolated namespace from type/operation refkeys.
- Deferred rendering static helpers as Alloy `<ts.SourceFile>` to Phase 9 — dual-write conflict with TsMorphBridge makes it premature.
- `getStaticHelperFileInfo()` provides a manual import bridge — components can build correct import paths without auto-import.

**Key patterns discovered:**
- Alloy `createPackage()` only works for npm packages (absolute module specifiers). Relative imports from internal files require `<ts.SourceFile>` declarations.
- TsMorphBridge writes via `emitFile()` during render; Alloy writes after full tree render. If both target the same path, Alloy overwrites TsMorphBridge. This is why static helpers can't be dual-rendered.
- RestorePoller had a missing import for `getLongRunningPoller` — the generated output worked by coincidence (or didn't). Fixed by adding explicit import using `getStaticHelperFileInfo()`.

**Implementation details:**
- 8 refkey accessor functions, ~50 symbols total across all categories
- Type-safe name parameters using string literal union types
- All exports flow through `StaticHelpers.tsx` → `index.ts` for clean barrel exports
- RestorePoller computes relative import path dynamically based on subfolder depth

### 2026-02-20: Last-Mile Dependency Audit (Phases 7-9 Planning)

**Key findings from full audit:**
- Production `tsMorphGenerate` callback does only 2 things: `emitTypes()` (model interfaces + serializers via addDeclaration) and `binder.resolveAllReferences()`.
- `buildOperationFiles`, `buildClassicalClient`, `buildClientContext`, `buildRootIndex`, `buildSubpathIndexFile`, `buildApiOptions`, `emitSamples` — all have Alloy components and are NO LONGER called from production `index.ts`. They only survive because `test/util/emitUtil.ts` uses them.
- 17 source files + 1 test utility still import old framework (`resolveReference`, `addDeclaration`, `refkey`, `useDependencies`).
- ~85 `resolveReference()` calls remain, ~20 `addDeclaration()` calls, ~8 `useDependencies()` calls.
- `static-helpers-metadata.ts` has 12 consumer files — most widely imported old-framework artifact.
- `contextManager.ts` has 20 consumer files but cannot be removed until ts-morph pipeline is fully eliminated.

**Critical ordering constraint:** `operationHelpers.ts` shared functions (4 `resolveReference` calls) can ONLY be removed after serializer builders (`buildSerializerFunction.ts`, `buildDeserializerFunction.ts`, `buildXmlSerializerFunction.ts`) stop using the old framework. Otherwise 120+ unit test failures.

**Architectural decision:** Extract pure utility functions from `emitModels.ts` (`normalizeModelName`, `getModelNamespaces`, etc.) to a standalone `model-utils.ts` module as the FIRST step. This decouples Alloy components from the ts-morph-heavy `emitModels.ts`.

**Plan delivered:** `.squad/decisions/inbox/ripley-last-mile-plan.md` — 4-phase work breakdown across Dallas, Kane, Lambert, Parker, and Ripley with exact files, line numbers, dependencies, and risk assessment.

### 2026-02-20: R1 — Extract pure utility functions from emitModels.ts

**What was done:**
- Created `src/modular/model-utils.ts` with 6 pure utility functions extracted from `emitModels.ts`: `normalizeModelName`, `getModelNamespaces`, `getModelsPath`, `getAdditionalPropertiesName`, `getApiVersionEnum`, `buildEnumTypes`.
- Also extracted 2 private helpers (`getExtensibleEnumDescription`, `emitEnumMember`) that `buildEnumTypes` depends on.
- Updated `emitModels.ts` to re-export all 6 functions from `model-utils.ts` (backward compatibility for any transitive importers) and import them locally for its own use.
- Updated 10 consumer files to import directly from `model-utils.ts` instead of `emitModels.ts`:
  - `serialization/buildSerializerFunction.ts`, `serialization/buildDeserializerFunction.ts`, `serialization/buildXmlSerializerFunction.ts`
  - `buildClientContext.ts`
  - `components/Models.tsx`, `components/Serializers.tsx`, `components/XmlSerializers.tsx`, `components/SubpathIndex.tsx`, `components/RootIndex.tsx`, `components/ClientContext.tsx`

**Key constraint verified:** `model-utils.ts` has ZERO imports from `src/framework/` or `contextManager.ts`. All imports are from npm packages (`ts-morph`, `@azure-tools/rlc-common`, `@azure-tools/typespec-client-generator-core`, `@typespec/compiler`), sibling utility modules, or Node.js built-ins (`path`).

**Validation:** `npx tsc --noEmit` passes, `npx alloy build` passes, `pnpm build` passes.
