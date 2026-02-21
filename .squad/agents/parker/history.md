# Parker — History

## Project Context
**Project:** TypeSpec TypeScript Emitter — Alloy Framework Migration
**Stack:** TypeScript, TypeSpec, Alloy JSX, ts-morph (being replaced)
**User:** Jose Manuel Heredia Hidalgo
**Plan:** `packages/typespec-ts/ALLOY_MIGRATION_PLAN.md`

## Phases Completed

### Phase 1 (Ripley — Lead)
- ✅ Architecture decisions established (refkey-first, coexistence pattern, manual imports)
- ✅ Static helper refkeys defined (Phases 2-4 consumers ready)
- ✅ TsMorphBridge framework in place

### Phases 2-3 (Dallas — JSON Serializers)
- ✅ Serializers.tsx component (1302 lines) rendering JSON serializers/deserializers
- ✅ Type check passes
- ✅ Coexistence with old ts-morph path
- ✅ Exports: `serializerRefkey`, `deserializerRefkey`

### Phase 4 (Kane — XML Serializers)
- ✅ XmlSerializers.tsx component rendering XML serializers/deserializers
- ✅ 19 resolveReference calls replaced with refkey approach
- ✅ 526 tests pass
- ✅ Coexistence with old buildXmlSerializerFunction.ts path

### Phases 5-6 (Lambert — Operations)
- ✅ Operations.tsx component (~310 lines) for operation generation
- ✅ FunctionFromStructure bridge connecting Alloy to existing helpers
- ✅ Explicit import computation via collectFileImports()
- ✅ 20/29 resolveReference calls removed (9 intentional in shared functions)
- ✅ 120 scenarios regenerated
- ✅ 526 tests pass

## Learnings

### Coexistence Pattern (Dallas/Kane/Lambert)
The migration uses a **dual-path coexistence** approach:
- New Alloy components produce refkeys and render output
- Old ts-morph path remains operational
- Alloy output takes precedence via `writeOutput` ordering
- Removes blocker of "must migrate everything at once"
- Scheduled cleanup when all consumers migrated

### Shared Function Boundary (Lambert)
9 `resolveReference()` calls remain intentionally in shared functions:
- `getSerializationExpressionForFlatten`, `serializeRequestValue`, `deserializeResponseValue`
- Called from **both** operation generation (Alloy JSX) **and** serializer generation (ts-morph + binder)
- Removal deferred until serializer pipeline migrates to Alloy
- Document as technical debt with clear cleanup path

### Import Strategy (Lambert)
Operations use **explicit import computation** (not Alloy auto-import):
- Function bodies rendered as raw strings from Category A/B helpers
- `collectFileImports()` analyzes operations to determine required imports
- Will switch to Alloy auto-import in Phase 9 (full code-template conversion)
- Pragmatic bridge during gradual migration

## Phase 7-9 Audit (Parker — Tester)

### Phase 7: emitModels.ts — BLOCKED
**Cannot delete.** `emitModels.ts` exports 8 utility functions still imported by 10 production files:
- `normalizeModelName` → Serializers.tsx, XmlSerializers.tsx, buildSerializerFunction.ts, buildDeserializerFunction.ts, buildXmlSerializerFunction.ts
- `getModelNamespaces` → XmlSerializers.tsx, Serializers.tsx
- `getAdditionalPropertiesName` → Serializers.tsx, buildSerializerFunction.ts, buildDeserializerFunction.ts
- `buildEnumTypes`, `getApiVersionEnum` → ClientContext.tsx, buildClientContext.ts
- `visitPackageTypes` → framework/hooks/sdkTypes.ts
- `getModelsPath` → Models.tsx, Serializers.tsx, RootIndex.tsx, SubpathIndex.tsx

Additionally, `emitTypes()` is still called in the tsMorphGenerate callback. It registers serializer declarations with the old binder via `addDeclaration`, which is required for `resolveReference()` calls in 15+ files.

### Phase 8: tsMorphGenerate callback — BLOCKED
**Cannot remove.** The callback still calls:
1. `emitTypes(dpgContext, { sourceRoot: modularSourcesRoot })` — needed for binder registrations
2. `binder.resolveAllReferences(modularSourcesRoot)` — needed to resolve 60+ placeholder references

`resolveReference()` is still called from:
- operationHelpers.ts (4 calls), classicalOperationHelpers.ts (11 calls)
- buildClassicalClient.ts (8 calls), buildClientContext.ts (5 calls)
- buildRootIndex.ts (5 calls), buildOperations.ts (1 call)
- emitSamples.ts (1 call), clientHelpers.ts (1 call)
- operationUtil.ts (10 calls), type-expressions/*.ts (8 calls)
- buildSerializerFunction.ts (15 calls), buildDeserializerFunction.ts (13 calls)
- buildXmlSerializerFunction.ts (19 calls)

### Phase 9: Old framework — BLOCKED
**Cannot delete ANY target.** Every file/directory on the deletion list is still actively used:

| Target | Importers | Why |
|--------|-----------|-----|
| `src/framework/` | 30+ | resolveReference (15+ files), addDeclaration (3 files), old refkey (10 files), binder, sdkTypes |
| `contextManager.ts` | 17+ | useContext/provideContext used throughout codebase |
| `external-dependencies.ts` | 6 | buildClassicalClient, emitSamples, classicalOperationHelpers, index.ts, useDependencies |
| `static-helpers-metadata.ts` | 13+ | Serialization/paging/polling/xml/multipart helper metadata |
| `TsMorphBridge.tsx` | 1 | alloy-emitter.tsx (writes ts-morph files) |
| `type-expressions/` | 12+ | Used by components, helpers, and framework |
| `static/static-helpers/` | 10+ | Runtime helpers loaded by framework and referenced in components |
| `serialization/build*.ts` | 5+ | Called by emitModels.ts and shared helpers |
| `ts-morph` (package) | 22+ files | Used throughout codebase |

**Also checked potential orphaned build files — still used by test infrastructure:**
- `buildClassicalClient.ts`, `buildSubpathIndex.ts`, `buildRootIndex.ts`, `emitModelsOptions.ts`, `emitSamples.ts` → all imported by `test/util/emitUtil.ts`

### Validation Results
- `npx alloy build` ✅
- `npx tsc --noEmit` ✅ (zero errors)
- `npm run unit-test:modular` ✅ (526 passing, 2 pending)

## Learnings

### Deep Entanglement of Old and New Systems
The Alloy components (Serializers.tsx, XmlSerializers.tsx, Operations.tsx) call old helper functions that still use `resolveReference()` internally. The old binder produces placeholder strings that end up in Alloy-rendered output. The ts-morph path must run first (via tsMorphGenerate) to register declarations so placeholders can be resolved.

### Test Infrastructure Dependency
Even files with zero production imports (buildClassicalClient.ts, buildSubpathIndex.ts, etc.) are still used by `test/util/emitUtil.ts` for unit testing. Deleting them would break 526 unit tests.

### Remaining Migration Work Required Before Cleanup
Before Phases 7-9 can proceed, the following must happen:
1. Extract utility functions from emitModels.ts to standalone module(s)
2. Migrate ALL resolveReference calls in shared helpers to Alloy refkeys
3. Migrate buildClassicalClient.ts, buildClientContext.ts, buildRootIndex.ts to Alloy
4. Update test infrastructure to use Alloy pipeline instead of old ts-morph functions
5. Only THEN can the old framework, binder, and ts-morph be removed

### emitUtil.ts is 100% Old Pipeline (P1+P2 Audit)
All 14 exported helpers in `test/util/emitUtil.ts` run exclusively through the old ts-morph pipeline. Zero Alloy references. The helpers call `emitTypes()`, `buildOperationFiles()`, `buildClassicalClient()`, `useBinder().resolveAllReferences()`, etc. This means the entire test suite (526+ modular tests, 266 RLC tests, 267 scenario assertions) validates only the old code path. Alloy output is untested by any unit or scenario test.

### Scenario Tests Are Regression Guards, Not Alloy Tests
The 102 scenario markdown files and 267 test assertions in `scenarios.spec.ts` use the same emitUtil helpers (old pipeline). They're valuable for regression but will need Alloy-pipeline equivalents before old helpers can be deleted. The `OUTPUT_CODE_BLOCK_TYPES` map in `scenarios.spec.ts` is the natural extension point for adding Alloy output types.

### test-next Tests Are Complementary, Not Overlapping
The 144 tests in `test-next/` cover infrastructure (binder hooks, static helpers, file loading) — not emitter rendering output. They don't overlap with emitUtil-based tests and should be kept regardless of migration state.

## Next Steps
- **Phases 7-9 are blocked** on further migration of shared helpers and test infrastructure
- Recommend Ripley/Dallas/Kane/Lambert prioritize migrating resolveReference calls in:
  1. operationHelpers.ts (shared by both Alloy and ts-morph paths)
  2. classicalOperationHelpers.ts
  3. buildClassicalClient.ts
  4. type-expressions/*.ts
- After those are done, emitModels.ts utility functions can be extracted, and the cleanup phases can proceed
- **New (P1+P2):** Before deleting any old helper, create Alloy-pipeline test entries in `scenarios.spec.ts` OUTPUT_CODE_BLOCK_TYPES to validate parity
- **New (P1+P2):** `enumUnion.spec.ts` and `modelsGenerator.spec.ts` (modularUnit) are candidates for consolidation into scenario tests
