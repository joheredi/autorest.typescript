# Cleanup Items Summary — Quick Reference

**Agent:** Parker (Tester)  
**Date:** 2026-02-20

---

## ✅ READY TO DELETE (2 files)

```bash
rm packages/typespec-ts/src/modular/components/TsMorphBridge.tsx
rm packages/typespec-ts/src/framework/load-static-helpers.ts
```

---

## ⚠️ BLOCKER — Must Refactor First

**File:** `packages/typespec-ts/src/modular/buildProjectFiles.ts`

**Function:** `getModelSubpaths()` at line 86-108

**Current code:**
```typescript
function getModelSubpaths(emitterOptions: ModularEmitterOptions) {
  const outputProject = useContext("outputProject");  // ← Uses context
  const modelFiles = outputProject.getSourceFiles(   // ← Queries ts-morph
    path.join(sourceRoot, `models/**/*.ts`)
  );
  // ... returns model subpaths for package.json exports
}
```

**Issue:** Only active production usage of outputProject context

**Solution needed:** Refactor to not use ts-morph Project (use Alloy output or file system)

---

## 📝 CONTEXT CLEANUP — After Blocker Resolved

### 1. Remove from contextManager.ts

**File:** `packages/typespec-ts/src/contextManager.ts`

**Line 24:** Remove `outputProject: Project;` from Contexts type

```typescript
type Contexts = {
  rlcMetaTree: RlcMetaTree;
  outputProject: Project;  // ← DELETE THIS LINE
  symbolMap: Map<string, SourceFile>;
  // ... rest
};
```

### 2. Remove from index.ts (3 locations)

**File:** `packages/typespec-ts/src/index.ts`

**Line 93:** Remove creation
```typescript
const outputProject = new Project();  // ← DELETE THIS LINE
```

**Line 108:** Remove provision
```typescript
provideContext("outputProject", outputProject);  // ← DELETE THIS LINE
```

**Line 269:** Remove usage (after buildProjectFiles refactor)
```typescript
const project = useContext("outputProject");  // ← DELETE THIS LINE
// Update emitAlloyOutput call to not pass project parameter
```

---

## 🧹 TS-MORPH IMPORT CLEANUP

### Remove from index.ts

**Line 63:**
```typescript
import { Project } from "ts-morph";  // ← DELETE THIS IMPORT
```

### Remove from alloy-emitter.tsx

**Line 3:**
```typescript
import { Project } from "ts-morph";  // ← DELETE THIS IMPORT
```

**Lines 50-63:** Update emitAlloyOutput signature to not accept `project: Project` parameter

---

## ✅ NO CHANGES NEEDED

- `test/util/emitUtil.ts` — independent ts-morph usage
- `src/test-utils/alloy-test-render.tsx` — pure Alloy
- All other ts-morph imports remain (Phase 7/9 cleanup)

---

## 🔍 VALIDATION COMMANDS

```bash
# Build check
pnpm build

# Format check
pnpm format

# Unit tests (835 tests)
cd packages/typespec-ts
npm run unit-test

# Smoke test (final validation)
cd packages/typespec-test
npm run smoke-test
# Wait for: "All specs succeeded!"
```

---

## 📊 IMPACT SUMMARY

**Files to delete:** 2  
**Files to modify:** 3 (contextManager.ts, index.ts, alloy-emitter.tsx)  
**Blocker:** 1 (buildProjectFiles.ts refactor)  
**Test changes:** 0 (intentional)

**Lines removed:** ~255 lines + 4 imports  
**Risk level:** Low (after blocker resolved)  
**Test coverage:** 835 unit tests + smoke test
