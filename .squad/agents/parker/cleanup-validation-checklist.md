# Cleanup Validation Checklist

**Date:** 2026-02-20  
**Agent:** Parker (Tester)  
**Task:** Prepare validation strategy for ts-morph removal cleanup

---

## 1. Files to Delete

### ✅ Confirmed for Deletion

- **src/modular/components/TsMorphBridge.tsx** (1246 bytes, 42 lines)
  - Single import location: `src/alloy-emitter.tsx`
  - Purpose: Bridge component that writes ts-morph static helpers via emitFile
  - Status: Can be deleted once static helpers are rendered through Alloy

- **src/framework/load-static-helpers.ts** (6011 bytes, 213 lines)
  - Single import location: `src/index.ts` (line 77)
  - Called once in index.ts at line 113-130
  - Purpose: Loads static helper files into ts-morph Project
  - Status: Can be deleted once static helpers are rendered through Alloy

---

## 2. outputProject Context Removal

### Locations Found: 4 files

#### src/index.ts
- **Line 93**: `const outputProject = new Project();` — creation
- **Line 108**: `provideContext("outputProject", outputProject);` — provision
- **Line 269**: `const project = useContext("outputProject");` — usage (passed to emitAlloyOutput)

#### src/modular/emitModels.ts
- **Line 122**: `const outputProject = useContext("outputProject");` — usage
- Called from: NOWHERE in production code (emitTypes is UNUSED after R8 tsMorphGenerate removal)

#### src/modular/emitModelsOptions.ts
- **Line 122**: `const project = useContext("outputProject");` — usage
- Called from: NOWHERE in production code (buildApiOptions is UNUSED after Alloy migration)

#### src/modular/buildProjectFiles.ts
- **Line 87**: `const outputProject = useContext("outputProject");` — usage in getModelSubpaths()
- Called from: index.ts getModuleExports() → only used for package.json generation
- **Status:** This is the ONLY production usage remaining

### Removal Strategy

1. **Remove from contextManager.ts Contexts type** (line 24)
2. **Remove provision in index.ts** (line 108)
3. **Remove outputProject creation in index.ts** (line 93) AFTER verifying buildProjectFiles.ts no longer needs it
4. **buildProjectFiles.ts dependency:** getModelSubpaths() uses outputProject to find model files. This will need refactoring to use Alloy output or file system scan instead.

---

## 3. Test Files — NO UPDATES NEEDED ✅

### test/util/emitUtil.ts
- **Status:** Uses its own ts-morph Project creation (line 54)
- **No dependency on context:** Does not import `useContext` or `contextManager`
- **Validation:** No changes needed

### src/test-utils/alloy-test-render.tsx
- **Status:** Pure Alloy rendering utilities (no ts-morph imports)
- **No context usage:** Does not use `useContext("outputProject")`
- **Validation:** No changes needed

---

## 4. ts-morph Imports Audit

### Production Files with ts-morph Imports (14 files)

#### **Can be removed after cleanup:**

1. **src/index.ts** (line 63)
   - `import { Project } from "ts-morph";`
   - Used for: outputProject creation (line 93)
   - **Action:** Remove after outputProject context cleanup

2. **src/alloy-emitter.tsx** (line 3)
   - `import { Project } from "ts-morph";`
   - Used for: TsMorphBridge parameter type (line 63, 77)
   - **Action:** Remove after TsMorphBridge deletion

3. **src/modular/components/TsMorphBridge.tsx** (line 2)
   - `import { Project } from "ts-morph";`
   - **Action:** File will be deleted

4. **src/framework/load-static-helpers.ts** (lines 4-10)
   - Full ts-morph import set
   - **Action:** File will be deleted

#### **Must remain (old pipeline, not part of cleanup):**

5. **src/contextManager.ts** (line 1)
   - `import { Project, SourceFile } from "ts-morph";`
   - Used in Contexts type for outputProject and symbolMap
   - **Action:** Remove outputProject from Contexts type, keep symbolMap (used by old binder)

6. **src/framework/declaration.ts** (line 14)
   - ts-morph types for old framework
   - **Action:** Keep (old framework, Phase 9 cleanup)

7. **src/framework/hooks/binder.ts** (line 7)
   - ts-morph for old binder
   - **Action:** Keep (old framework, Phase 9 cleanup)

8. **src/modular/emitModels.ts** (line 8)
   - ts-morph for old model emission
   - **Action:** Keep (Phase 7 cleanup — file still imported by test infrastructure)

9. **src/modular/emitModelsOptions.ts** (line 23)
   - ts-morph for old options emission
   - **Action:** Keep (Phase 7 cleanup — file still imported by test infrastructure)

10. **src/modular/model-utils.ts** (line 6)
    - `import { InterfaceDeclaration, StructureKind } from "ts-morph";`
    - Used by pure utility functions
    - **Action:** Keep (Phase 7 cleanup)

11-14. **Serialization builders** (buildDeserializerFunction.ts, buildSerializerFunction.ts, buildXmlSerializerFunction.ts, helpers/clientHelpers.ts)
    - ts-morph for old serializer emission
    - **Action:** Keep (Phase 7 cleanup)

15. **src/utils/importHelper.ts** (line 3)
    - `import { SourceFile } from "ts-morph";`
    - Used by old binder import tracking
    - **Action:** Keep (Phase 9 cleanup)

### Test Files with ts-morph Imports (2 files)

16. **test/util/emitUtil.ts** (line 39)
    - `import { Project } from "ts-morph";`
    - Used for test infrastructure (line 54)
    - **Action:** Keep (test infrastructure)

---

## 5. Validation Sequence

### Pre-Cleanup Baseline

```bash
# 1. Build check
pnpm build
# Expected: SUCCESS (already validated in R8)

# 2. Format check
pnpm format
# Expected: No changes (codebase already formatted)

# 3. Unit tests (all 835 tests)
cd packages/typespec-ts
npm run unit-test
# Expected: 835 passing tests (526 modular, 266 RLC, 43 rlc-common)
```

### Post-Deletion Validation

After deleting TsMorphBridge.tsx and load-static-helpers.ts:

```bash
# 1. Type check
cd packages/typespec-ts
npx tsc --noEmit
# Expected: Zero type errors

# 2. Build check
cd /home/joheredi/dev/playground/emitter-modernization/autorest.typescript
pnpm build
# Expected: SUCCESS

# 3. Unit tests
cd packages/typespec-ts
npm run unit-test
# Expected: All 835 tests pass

# 4. Format check
pnpm format
# Expected: No changes needed
```

### Smoke Test (Final Validation)

```bash
cd packages/typespec-test
npm run smoke-test
# Expected: "All specs succeeded!" message
# Wait time: ~10 minutes
```

---

## 6. Key Dependencies & Blockers

### Current Blockers for Full Cleanup

1. **buildProjectFiles.ts dependency on outputProject**
   - getModelSubpaths() queries ts-morph Project to find model files
   - Used by getModuleExports() for package.json exports generation
   - **Solution:** Refactor to use Alloy output map or file system scan

2. **TsMorphBridge still active in alloy-emitter.tsx**
   - Static helpers still loaded via loadStaticHelpers() into ts-morph Project
   - Rendered through TsMorphBridge component
   - **Solution:** Migrate static helpers to Alloy <ts.SourceFile> components (Phase 9)

3. **contextManager.ts still has outputProject in Contexts type**
   - Also has symbolMap which is used by old binder
   - **Solution:** Remove outputProject entry, keep symbolMap until Phase 9

---

## 7. Risk Assessment

### Low Risk ✅
- Deleting TsMorphBridge.tsx and load-static-helpers.ts
- Removing outputProject from Contexts type
- Removing ts-morph imports from index.ts and alloy-emitter.tsx

### Medium Risk ⚠️
- Refactoring buildProjectFiles.ts getModelSubpaths() to not use outputProject
- Must ensure package.json exports generation still works correctly

### Test Coverage
- Unit tests: ✅ 835 tests validate emitter output
- Integration tests: ✅ 4 test suites (RLC, Modular, Azure RLC, Azure Modular)
- Smoke test: ✅ All specs validation

---

## 8. Success Criteria

- ✅ pnpm build succeeds
- ✅ pnpm format produces no changes
- ✅ All 835 unit tests pass
- ✅ TsMorphBridge.tsx deleted
- ✅ load-static-helpers.ts deleted
- ✅ outputProject context removed from contextManager.ts Contexts type
- ✅ provideContext('outputProject', outputProject) removed from index.ts
- ✅ ts-morph imports removed from index.ts and alloy-emitter.tsx
- ✅ buildProjectFiles.ts refactored to not use outputProject (if possible)
- ✅ Smoke test passes ("All specs succeeded!")

---

## 9. Notes

- **Context:** This cleanup is part of Phase 8 completion (tsMorphGenerate callback removal)
- **Prerequisites:** R8 completed (tsMorphGenerate callback already removed)
- **Next Phase:** Phase 9 will migrate static helpers to Alloy rendering, eliminating TsMorphBridge entirely
- **Test infrastructure:** Intentionally not modified — tests validate old pipeline behavior
