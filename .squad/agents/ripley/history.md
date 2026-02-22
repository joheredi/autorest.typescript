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

### 2026-02-20: R3-R6 — Remove resolveReference from assigned files

**What was done:**
- **clientHelpers.ts (R6):** Removed `resolveReference(CloudSettingHelpers.getArmEndpoint)` → literal `"getArmEndpoint"`. Removed `CloudSettingHelpers` and `resolveReference` imports.
- **buildClientContext.ts (R3):** Removed `resolveReference`, `useDependencies`, `refkey`, `CloudSettingHelpers` imports. Replaced 5 `resolveReference(dependencies.X)` calls with literal strings (`"Client"`, `"ClientOptions"`, `"getClient"`, `"isKeyCredential"`, `"AzureSupportedClouds"`). Replaced `resolveReference(refkey(knownValuesEnum.name, "knownValues"))` with `knownValuesEnum.name`. Kept `useContext` (still needed for ts-morph Project in test pipeline).
- **buildRootIndex.ts (R4):** Removed `resolveReference` import and `CloudSettingHelpers`, `MultipartHelpers`, `PagingHelpers` imports from `static-helpers-metadata.ts`. Replaced 6 `resolveReference` calls with literal strings (`"AzureClouds"`, `"AzureSupportedClouds"`, `"PageSettings"`, `"ContinuablePage"`, `"PagedAsyncIterableIterator"`, `"FileContents"`). Kept `useContext`.
- **emitSamples.ts (R5):** Removed `resolveReference` import and `AzureIdentityDependencies` import from `external-dependencies.js`. Replaced `resolveReference(AzureIdentityDependencies.DefaultAzureCredential)` with literal `"DefaultAzureCredential"`. Added manual import statement (`sourceFile.addImportDeclaration`) for `DefaultAzureCredential` from `@azure/identity` when Azure + credential conditions are met.
- **Serializers.tsx:** No actual `resolveReference` call found — only a comment on line 641. The only old framework import is `emitQueue` from `../../framework/hooks/sdkTypes.js` (used for type iteration, not a resolveReference concern).

**Key finding:** `useContext` from `contextManager.js` cannot be removed from these files while tests still call them through the old pipeline. It provides the ts-morph Project needed to create source files. This is a separate cleanup from `resolveReference` removal.

**Validation:** `npx alloy build` passes (~2.5s), `npx tsc --noEmit` passes.

### 2026-02-20: Phase 8 — Remove tsMorphGenerate callback (R7-R8)

**What was done:**
- **R7 — Removed tsMorphGenerate callback:** The `async () => { emitTypes(...); binder.resolveAllReferences(...); }` callback passed to `emitAlloyOutput()` was eliminated. The `tsMorphGenerate` parameter was removed from `emitAlloyOutput()` entirely — no callers remain.
- **R8 — Simplified index.ts:** Removed `provideBinder` call and `binder` variable from the production codepath. Removed `emitTypes` import. Removed `extraDependencies` computation and imports (`AzureCoreDependencies`, `AzureIdentityDependencies`, `AzurePollingDependencies`, `DefaultCoreDependencies`). Changed `loadStaticHelpers` from assigning to a variable to fire-and-forget (return value was only used by `provideBinder`).

**What was kept:**
- `loadStaticHelpers()` — still needed to load static helper files into the ts-morph Project for TsMorphBridge to write.
- `provideSdkTypes()` — Alloy components depend on it.
- All `provideContext` calls for `rlcMetaTree`, `symbolMap`, `outputProject`, `emitContext` — still used.
- All `src/framework/` files — tests depend on them.
- `contextManager.ts` — tests depend on it.
- Test infrastructure (`emitUtil.ts`, `testUtil.ts`) — untouched, has its own `provideBinder` call.

**Key finding:** Test infrastructure is fully independent of the production binder. `testUtil.ts` calls its own `provideBinder` via `provideBinderWithAzureDependencies()`. Removing `provideBinder` from `index.ts` had zero test impact.

**Validation:** `npx alloy build` passes (~1.5s), `npx tsc --noEmit` passes, 835 unit tests pass (309 RLC + 526 Modular, 0 failing).

### 2026-02-21: Phase 10.5 — Convert Static Helpers to Alloy (COMPLETED)

**What was done:**
- **Created `load-static-helpers-alloy.ts`:** New utility that reads static helper files from disk into a `Map<relativePath, content>`. Applies Azure import rewriting (`@azure/core-rest-pipeline` → `@typespec/ts-http-runtime`, `@azure-rest/core-client` → `@typespec/ts-http-runtime`) as string replacements for non-Azure packages.
- **Created `StaticHelperFiles.tsx`:** Pure Alloy component that renders each static helper file as `<ts.SourceFile path={path}>{content}</ts.SourceFile>`. Replaces `TsMorphBridge` for static helper emission.
- **Updated `alloy-emitter.tsx`:** Removed `Project` parameter and `TsMorphBridge` usage. Now accepts `staticHelpers: Map<string, string>` and renders via `<StaticHelperFiles files={staticHelpers} />`.
- **Updated `index.ts`:** Removed `loadStaticHelpers` call from production path. Now calls `loadStaticHelpersAlloy` and passes result to `emitAlloyOutput`. Removed unused imports of static helper metadata.
- **Deleted `TsMorphBridge.tsx`:** No longer needed — all files now render through Alloy pipeline.
- **Preserved `load-static-helpers.ts`:** Kept for test infrastructure compatibility. Test utilities still use ts-morph-based binder. Moved `SourceFileSymbol` and `StaticHelperMetadata` types to `load-static-helpers-alloy.ts` for reuse.

**Architecture change:**
- **Before:** `index.ts` → `loadStaticHelpers(tsMorphProject)` → `TsMorphBridge` → `emitFile()` (bypass Alloy)
- **After:** `index.ts` → `loadStaticHelpersAlloy()` → `Map<string, string>` → `<StaticHelperFiles>` → Alloy `writeOutput()`

**Key constraints:**
- Static helper files are rendered as raw strings (no AST manipulation). Import rewriting happens as string replacement before rendering.
- Test infrastructure (`test/util/testUtil.ts`) continues using old `loadStaticHelpers` for ts-morph-based binder tests. This is intentional — test helpers are preserved until the old pipeline is fully removed.
- `load-static-helpers.ts` remains in `src/framework/` but is only imported by test utilities, not production code.

**Validation:** `npx tsc --noEmit` passes, `pnpm build` passes, 309 RLC + 282 Modular unit tests passing.

**Impact:** Completes Phase 10.5. All production code files now render through Alloy `writeOutput()`. Last ts-morph Project dependency removed from production code. Test infrastructure preserved for backward compatibility.

### 2026-02-21: Phase 11 — `getHeaderAndBodyParameters` Decomposed into JSX Components

**Architectural milestone:** First function fully migrated where `resolveReferences()` was completely removed, proving refkey-native pattern.

**What was done:**
- **Decomposed `getHeaderAndBodyParameters`** (monolithic 200+ line string-returning function in `operationHelpers.ts`) into 3 JSX components in `Operations.tsx`:
  - `<ContentTypeParam>` — renders `contentType` property. Returns `ts.PropertyAssignment` object.
  - `<HeaderParams>` — renders headers object. Returns `ts.ObjectLiteralExpression` for the headers structure.
  - `<BodyParam>` — renders body property using `serializerRefkey(bodyType)` / `xmlSerializerRefkey(bodyType)` **directly in code templates** (NOT via `resolveReferences()` string scanning). Uses `<ts.ImportSpecifier>` for explicit imports.
- **Updated `<RequestCall>`** component to accept `children` prop (the 3 components above) instead of `headerAndBodyParams` string prop.
- **Updated `<SendFunction>`** component:
  - Removed `typeRefkeys` prop entirely — serializer imports are now auto-resolved via Alloy refkeys
  - Removed `resolveReferences(typeRefkeys)` call and related string-scanning logic
  - Now generates clean import statements directly from refkey objects

**Exported 7 previously private helpers from `operationHelpers.ts`** for reuse in components:
- `isContentType(value)` — checks if a value is a content-type constant
- `getContentTypeValue(operation, type)` — extracts content-type string
- `buildHeaderParameter(headerName, headerValue)` — constructs header property assignment
- `isConstant(value)` — type guard for constant expressions
- `isDefaultValueTypeMatch(defaultValue, parameterType)` — validates default value matches type
- `formatDefaultValue(defaultValue, parameterType)` — serializes default value for code
- `getEncodeForType(parameterType)` — determines URI encoding strategy

**Refkey pattern in code templates:**
Components now use refkey objects (e.g., `serializerRefkey(bodyType)`) directly inside code string templates:
```tsx
const ref = serializerRefkey(bodyType);
// In template: 
`import { ${ref.name} } from "${ref.module}";`
// Alloy resolves the refkey object to its actual symbol reference during rendering
```

**Test results:** All 526 modular unit tests pass, no breaking API changes, no changes to operation output (all baselines match).

**Architecture significance:**
- **First complete `resolveReferences()` elimination:** This function was the last holdout in the operation pipeline. Proves the refkey-native pattern works end-to-end for complex string-rendering scenarios.
- **SendFunction fully refkey-native:** Removed dependency on `typeRefkeys` prop that was passed from bridge code. All serializer references now use Alloy auto-import via refkeys.
- **Bridge impact:** `typeRefkeys` is still needed by `getDeserializePrivateFunction` and `getOperationFunction` (unconverted ts-morph functions), but `SendFunction` is now free of it.
- **Pattern for Phase 9:** This decomposition is the model for converting remaining Category A/B helpers — migrate string-returning functions to JSX components that render objects/templates directly.

### 2026-02-21: Design Review — Explicit Import String Concatenation Removal

**What was analyzed:**
- Audited 13 explicit import string concatenation sites across 5 component files: ClassicalClient.tsx (4), ClassicalOperationGroups.tsx (3), Operations.tsx (2), RestorePoller.tsx (3), Samples.tsx (1).
- Compared two approaches: (A) Full refkey auto-import (Alloy-native, matches http-client-js reference), (B) Centralized path resolver (keep manual imports, fix paths).

**Key findings:**
- **4 sites can be fixed immediately** — refkeys and Alloy declarations already exist for `classicalClientRefkey`, `clientOptionalParamsRefkey`, `clientContextRefkey`, `clientContextFactoryRefkey`.
- **4 sites need new refkeys** — ClassicalOperationGroups generates `_get${name}Operations` functions and `${name}Operations` interfaces but doesn't export refkey accessors for them.
- **4 sites are BLOCKED** — static helper imports (SimplePoller, polling, paging, URL template, XML helpers) can't use auto-import because `StaticHelperFiles.tsx` renders raw strings without refkey-annotated declarations.
- **1 site (Samples.tsx line 193) is correct as-is** — imports from npm package name, not relative path. Cannot and should not use refkeys.
- The `http-client-js` reference implementation uses zero manual import strings — all cross-file references use refkeys exclusively, proving the pattern works at scale.
- Operations.tsx `import { X as Client }` alias needs workaround — Alloy doesn't support import aliases. Recommended: use a local type alias instead.

**Recommendation:** Approach A (full refkey auto-import), executed in 3 phases prioritized by bug impact. Phase 1 (low-hanging fruit) → Phase 2 (new refkeys for classical groups) → Phase 3 (static helper refkey annotations, large prerequisite).

**Design review delivered:** `.squad/decisions/inbox/ripley-design-review-explicit-imports.md`

