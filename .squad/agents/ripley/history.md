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
