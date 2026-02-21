# Context Usage Map — Complete Audit

**Agent:** Parker (Tester)  
**Date:** 2026-02-20

## outputProject Context — 4 Usage Locations

### ✅ Can Remove Immediately (2 files - ORPHANED)

**src/modular/emitModels.ts:122**
```typescript
const outputProject = useContext("outputProject");
```
- Function: `emitTypes()`
- Called by: NONE (tsMorphGenerate callback removed in R8)
- Status: ORPHANED — safe to remove

**src/modular/emitModelsOptions.ts:122**
```typescript
const project = useContext("outputProject");
```
- Function: `buildApiOptions()`
- Called by: NONE (old options builder unused after Alloy migration)
- Status: ORPHANED — safe to remove

### ⚠️ Blocker — Must Refactor First

**src/modular/buildProjectFiles.ts:87**
```typescript
const outputProject = useContext("outputProject");
```
- Function: `getModelSubpaths()`
- Called by: `getModuleExports()` (2 calls in index.ts lines 415, 480)
- Purpose: Queries ts-morph to find models/*/index.ts for package.json exports
- Status: ACTIVE BLOCKER — must refactor before deletion

**src/index.ts (3 locations)**
- Line 93: `const outputProject = new Project();` — creation
- Line 98: `provideContext("outputProject", outputProject);` — provision
- Line 272: `const sdkTypesCtx = useContext("sdkTypes");` — NOTE: This uses "sdkTypes" not "outputProject"

**Correction:** Line 269 has the actual outputProject usage:
- Line 269: `const project = useContext("outputProject");`
- Passed to: `emitAlloyOutput()` as parameter
- Status: Remove after buildProjectFiles refactor

---

## All Context Usage — By Context Key

### rlcMetaTree (2 locations)
- **Provision:** index.ts:96 `provideContext("rlcMetaTree", new Map())`
- **Usage:** transform/transformSchemas.ts:27 `const metatree = useContext("rlcMetaTree")`
- **Status:** Keep (old pipeline)

### symbolMap (2 locations)
- **Provision:** index.ts:97 `provideContext("symbolMap", new Map())`
- **Usage:** utils/importHelper.ts:14 `const symbolMap = useContext("symbolMap")`
- **Status:** Keep (used by old binder)

### emitContext (2 locations)
- **Provision:** index.ts:99-102 `provideContext("emitContext", { compilerContext, tcgcContext })`
- **Usage:** framework/hooks/sdkTypes.ts:40 `const { tcgcContext } = useContext("emitContext")`
- **Status:** Keep (used by sdkTypes hook)

### sdkTypes (4 locations)
- **Provision:** framework/hooks/sdkTypes.ts:152 `provideContext("sdkTypes", sdkTypesContext)`
- **Usage 1:** index.ts:272 `const sdkTypesCtx = useContext("sdkTypes")`
- **Usage 2:** modular/emitModels.ts:455 `useContext("sdkTypes").flattenProperties`
- **Usage 3:** modular/serialization/buildSerializerFunction.ts:49 `useContext("sdkTypes").flattenProperties`
- **Usage 4:** modular/serialization/buildDeserializerFunction.ts:48 `useContext("sdkTypes").flattenProperties`
- **Status:** Keep (active in multiple locations)

### binder (2 locations)
- **Provision:** framework/hooks/binder.ts:340 `provideContext("binder", binder)`
- **Usage:** framework/hooks/binder.ts:349 `return useContext("binder")`
- **Status:** Keep (old framework, Phase 9 cleanup)

### dependencies (2 locations)
- **Provision:** framework/hooks/binder.ts:66 `provideContext("dependencies", deps)`
- **Usage 1:** framework/hooks/binder.ts:68 `this.dependencies = useContext("dependencies")`
- **Usage 2:** modular/type-expressions/get-model-expression.ts:126 `const externalDependencies = useContext("dependencies")`
- **Status:** Keep (old framework, Phase 9 cleanup)

### outputProject (4 locations) ← TARGET FOR REMOVAL
- **Provision:** index.ts:98 `provideContext("outputProject", outputProject)`
- **Usage 1:** index.ts:269 `const project = useContext("outputProject")`
- **Usage 2:** modular/buildProjectFiles.ts:87 `const outputProject = useContext("outputProject")` ⚠️ BLOCKER
- **Usage 3:** modular/emitModels.ts:122 `const outputProject = useContext("outputProject")` ✅ ORPHANED
- **Usage 4:** modular/emitModelsOptions.ts:122 `const project = useContext("outputProject")` ✅ ORPHANED
- **Status:** Remove after buildProjectFiles refactor

---

## Alloy Context Usage (Not contextManager)

**Note:** SdkContextProvider uses Alloy's context system (not contextManager):

**src/modular/components/context/SdkContextProvider.tsx**
- Line 3: `import { useContext, createContext } from "@alloy-js/core"`
- Line 25: `const ctx = useContext(SdkContextAlloy)` — Alloy context
- Line 38: `const ctx = useContext(SdkContextAlloy)` — Alloy context
- Line 56: `const ctx = useContext(EmitterOptionsContext)` — Alloy context

**Status:** No changes needed — different context system

---

## Summary

**Total contextManager contexts:** 7 (rlcMetaTree, symbolMap, outputProject, emitContext, sdkTypes, binder, dependencies)

**Cleanup target:** 1 context (outputProject)

**Locations to modify:**
1. Remove provision: index.ts:98
2. Remove usage: index.ts:269
3. Refactor blocker: buildProjectFiles.ts:87
4. Remove orphaned: emitModels.ts:122
5. Remove orphaned: emitModelsOptions.ts:122
6. Remove from Contexts type: contextManager.ts:24

**Blockers:** 1 (buildProjectFiles.ts getModelSubpaths function)

**Risk:** Low after blocker resolved
