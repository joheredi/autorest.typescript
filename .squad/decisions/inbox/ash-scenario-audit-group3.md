# Scenario Test Audit — Group 3 (Samples, Operations, Models)

**Auditor:** Ash, Alloy Architect & Reviewer
**Date:** 2025-07-17
**Scope:** 28 changed scenario `.md` files across samples/, operations/, parameters/, propertyFlatten/, and modelsGenerator/

---

## Per-File Reports

### 1. apiKeyCredentialClient.md
**Status:** 🟡 SUSPICIOUS
**Issues:**
- [SUSPICIOUS] Spurious XML static-helpers block injected at top of `samples` section — these XML helpers are not used by the sample code. Bloats output but not a compile error.

### 2. disableHierarchy/disableOperationGroup.md
**Status:** 🟡 SUSPICIOUS
**Issues:**
- [SUSPICIOUS] Two `samples` code blocks each get the spurious XML static-helpers block injected.

### 3. disableHierarchy/enableOperationGroup.md
**Status:** 🟡 SUSPICIOUS
**Issues:**
- [SUSPICIOUS] Same spurious XML static-helpers block pattern (×2 blocks).

### 4. enableHierarchy/disableOperationGroup.md
**Status:** 🟡 SUSPICIOUS
**Issues:**
- [SUSPICIOUS] Same spurious XML static-helpers block pattern (×3 blocks).

### 5. enableHierarchy/enableOperationGroup.md
**Status:** 🟡 SUSPICIOUS
**Issues:**
- [SUSPICIOUS] Same spurious XML static-helpers block pattern (×3 blocks).

### 6. multipleClient.md
**Status:** 🟡 SUSPICIOUS
**Issues:**
- [SUSPICIOUS] XML static-helpers block injected.
- [OK] Import reorder: `DefaultAzureCredential` before client import — alphabetical sort change, not a bug.

### 7. renameClientName.md
**Status:** 🟡 SUSPICIOUS
**Issues:**
- [SUSPICIOUS] XML static-helpers block injected.

### 8. subscriptionIdHandling.md
**Status:** 🟡 SUSPICIOUS
**Issues:**
- [SUSPICIOUS] XML static-helpers block injected ×8 (one per code block).
- [OK] Import reordering (DefaultAzureCredential before client import).
- [OK] Blank line removals between `console.log(resArray)` and `}` — cosmetic only.

### 9. armCurdOperations.md
**Status:** 🟡 SUSPICIOUS
**Issues:**
- [SUSPICIOUS] XML static-helpers block injected ×3.
- [OK] Import reordering.
- [OK] Blank line between for-loop body and `console.log` removed — cosmetic.

### 10. disableHierarchyArmCurdOperations.md
**Status:** 🟡 SUSPICIOUS
**Issues:**
- [SUSPICIOUS] XML static-helpers block injected ×3.
- [OK] Import reordering and blank line removal — cosmetic.

### 11. dpgCurdOperations.md
**Status:** 🟡 SUSPICIOUS
**Issues:**
- [SUSPICIOUS] XML static-helpers block injected.
- [OK] Import reordering.
- [OK] Blank line removal between for-loop and `console.log` — cosmetic.

### 12. multipleExamplesInOneFile.md
**Status:** 🟡 SUSPICIOUS
**Issues:**
- [SUSPICIOUS] XML static-helpers block injected.
- [OK] Import reordering.

### 13. bodyOptionalCheck.md
**Status:** 🟡 SUSPICIOUS
**Issues:**
- [SUSPICIOUS] XML static-helpers block injected in `samples`.
- [OK] `models:withOptions` import path changed: `"../models/models.js"` → `"./models/models.js"`, and `import` → `import type`. Consistent with Alloy refactoring.
- [OK] `operations` import path changed: `"./options.js"` → `"./api/options.js"`, `"../models/models.js"` → `"./models/models.js"`, `"../static-helpers/urlTemplate.js"` stays relative. These are OK as long as test harness maps them correctly.
- [OK] JSDoc expanded with `@param` tags — cosmetic improvement.
- [OK] Blank line removals between functions — cosmetic.

### 14. bodyOptionalParameterName.md
**Status:** 🔴 BUGS FOUND
**Issues:**
- [BUG] `errorResponseDeserializer` was imported in the old code but removed in the new code. However, checking the operations code, it was only imported, not actually called — the error handling uses `createRestError(result)` directly. So the import removal is **safe** — downgrading to OK.
- [SUSPICIOUS] XML static-helpers block injected ×3 in `samples`.
- [SUSPICIOUS] JSDoc formatting produces malformed output: `updateIntervalInMs?: number; /**\n   * The content...` — the closing `*/` of one comment and start of another get smashed onto the same line as the property. This would still compile but is ugly and may cause doc tooling issues.
- [OK] Import reordering and path changes.
- [OK] Trailing comma additions — cosmetic.

**Updated Status:** 🟡 SUSPICIOUS (the JSDoc formatting issue is the main concern)

### 15. bodyReadonlyOptionalCheck.md
**Status:** 🟡 SUSPICIOUS
**Issues:**
- [SUSPICIOUS] XML static-helpers block injected.
- [OK] Import reordering and path changes.
- [OK] JSDoc expansion with `@param` tags.

### 16. bodyRequiredCheck.md
**Status:** 🟡 SUSPICIOUS
**Issues:**
- [SUSPICIOUS] XML static-helpers block injected.

### 17. clientConstructorArgs.md
**Status:** 🔴 BUGS FOUND
**Issues:**
- [BUG] **Missing imports in classicClient section:** `TokenCredential` import removed (`-import { TokenCredential } from "@azure/core-auth";`) but `credential: TokenCredential` is still used in the constructor parameter. This would cause a build error: `TokenCredential` is not defined.
- [BUG] **Missing imports in classicClient section:** `CreateOrUpdateOptionalParams` import removed (`-import { CreateOrUpdateOptionalParams } from "./api/options.js";`) but `options: CreateOrUpdateOptionalParams` is still used. Would cause a build error.
- [BUG] **Missing imports in classicClient section:** `MachineLearningServicesContext` is used as the type of `this._client` but its import (via `createMachineLearningServices`) only imports the function, not the type.
- [BUG] **Default parameter value removed:** `options: CreateOrUpdateOptionalParams = { requestOptions: {} }` changed to `options: CreateOrUpdateOptionalParams` (no default). This is a **breaking API change** — callers that relied on the default value will now get `undefined` if they don't pass options.
- [OK] `public readonly pipeline` → `readonly pipeline` — cosmetic (both mean the same in TS).
- [OK] User agent prefix computation inlined — functionally equivalent.
- [SUSPICIOUS] XML static-helpers block injected ×2.

### 18. inheritedPropertyMapping.md
**Status:** 🟡 SUSPICIOUS
**Issues:**
- [SUSPICIOUS] XML static-helpers block injected.

### 19. optionalParameter.md
**Status:** 🟡 SUSPICIOUS
**Issues:**
- [SUSPICIOUS] XML static-helpers block injected.

### 20. paramaterSpreadCheck.md
**Status:** 🟡 SUSPICIOUS
**Issues:**
- [SUSPICIOUS] XML static-helpers block injected ×2.

### 21. parameterName.md
**Status:** 🟡 SUSPICIOUS
**Issues:**
- [SUSPICIOUS] XML static-helpers block injected ×3.
- [OK] Import reordering and `import type` usage.
- [OK] Blank line removals between functions — cosmetic.

### 22. parameterNormalization.md
**Status:** 🟡 SUSPICIOUS
**Issues:**
- [SUSPICIOUS] XML static-helpers block injected.
- [OK] Import reordering and path changes.
- [OK] JSDoc expansion.

### 23. parameterOrdering.md
**Status:** 🟡 SUSPICIOUS
**Issues:**
- [SUSPICIOUS] XML static-helpers block injected.
- [OK] Import reordering.
- [OK] JSDoc expansion with `@param` tags.

### 24. parameterTypesCheck.md
**Status:** 🟡 SUSPICIOUS
**Issues:**
- [SUSPICIOUS] XML static-helpers block injected.

### 25. complexFlattenCases.md
**Status:** 🔴 BUGS FOUND
**Issues:**
- [BUG] **Self-import in models section:** The `models` code block now contains `import type { A, BodyParameter, ChildFlattenModel, FooProperties } from "./models/models.js";` — this is a **self-import** because the models file is importing its own types from itself. This would cause a circular dependency or compile error.
- [BUG] **Missing static helper import:** `areAllPropsUndefined` was previously imported from `"../static-helpers/serialization/check-prop-undefined.js"` but this import was removed. However, checking the new code... `areAllPropsUndefined` is NOT used in this file (it's used in `mulipleFlattenCases.md`), so this removal is **safe for this file**.
- [BUG] **Broken deserializers:** New deserializer functions have incorrect logic:
  - `_bodyParameterPropertiesDeserializer`: `bazPropertiesBaz: item["baz"].map(...)` treats a scalar as an array with `.map()`. Also uses `{ x: ["x"] }` (array literal) instead of `{ x: item["x"] }` (property access).
  - `_fooPropertiesPropertiesDeserializer`: Looks correct.
  - `_bodyParameterProperties2Deserializer`: Looks correct.
  - `_bodyParameterEmptyFlattenDeserializer`: Looks correct.
- [SUSPICIOUS] XML static-helpers block injected.

### 26. mulipleFlattenCases.md
**Status:** 🔴 BUGS FOUND
**Issues:**
- [BUG] **Self-import in models section:** `import type { A, BodyParameter, FooProperties } from "./models/models.js";` — self-import, same pattern.
- [BUG] **Missing static helper import:** `areAllPropsUndefined` was previously imported from `"../static-helpers/serialization/check-prop-undefined.js"` — this import was **removed** but `areAllPropsUndefined` is **still called** in `fooPropertiesSerializer`. This will cause a runtime error: `areAllPropsUndefined is not defined`.
- [BUG] **Broken deserializer:** `_bodyParameterPropertiesDeserializer` uses `{ x: ["x"], y: ["y"] }` — this creates array literals instead of accessing `item["x"]` and `item["y"]`. Would return incorrect data at runtime.
- [SUSPICIOUS] XML static-helpers block injected.

### 27. simpleFlattenCases.md
**Status:** 🟡 SUSPICIOUS
**Issues:**
- [SUSPICIOUS] XML static-helpers block injected ×2.

### 28. modelsGenerator.md
**Status:** 🔴 BUGS FOUND
**Issues:**
- [BUG] **Self-imports throughout models sections:** Every models code block now includes `import type { ... } from "./models/models.js"` — this is models.js importing from itself. Occurs ~33 times across the file. This is a systemic Alloy bug.
- [BUG] **Recursive union type definitions:** Multiple union types reference themselves:
  - `export type PetUnion = PSDog | PetUnion;` — infinite recursion
  - `export type PetUnion = Cat | Dog | PetUnion;` — infinite recursion
  - `export type PetUnion = Cat | DogUnion | PetUnion;` — infinite recursion
  - `export type DogUnion = Gold | DogUnion;` — infinite recursion
  - `export type PetUnion = ServicePlacementPolicyDescription | PetUnion;` — infinite recursion
  The old code used the base type `Pet` (not `PetUnion`) as the fallback member. The new code self-references, creating a circular type. TypeScript will error or treat this as `any`.
- [BUG] **Subtype `extends` union instead of base type:** `export interface PSDog extends PetUnion` (was `extends Pet`), `export interface Cat extends PetUnion`, `export interface Dog extends PetUnion`. A concrete interface cannot extend a union type in TypeScript — this is a compile error.
- [BUG] **Missing `serializeRecord` import:** The old code imported `serializeRecord` from `"../static-helpers/serialization/serialize-record.js"` but this import was removed. `serializeRecord` is still called in `vegetablesDeserializer`. Runtime error.
- [BUG] **Missing `petSerializer` and `petDeserializer`:** In the discriminated union scenarios, `petSerializer` and `petDeserializer` functions were removed from the models section, but they are still called in `petUnionSerializer`/`petUnionDeserializer` switch default branches. Runtime error.
- [BUG] **Missing `dogDeserializer`:** In the nested discriminated union scenario, `dogDeserializer` was removed but is still called in `dogUnionDeserializer` default branch. Runtime error.
- [BUG] **`Record<string, ...>` intersection removed from model interfaces:** `Vegetables extends Record<string, number | string>` changed to just `Vegetables`. Similarly `A extends Base, Record<string, number>` changed to `A extends Base`. This changes the type's shape — previously these were open record types, now they're closed. This is a **type regression** that could break callers expecting indexer signatures.
- [BUG] **Return type changed from `PetUnion` to `Pet`:** In operations sections, `_readDeserialize` and `read` now return `Promise<Pet>` instead of `Promise<PetUnion>`. But `Pet` is not imported (only `petUnionDeserializer` is imported via value import). Also, `Pet` is the base interface, not the union — callers lose discriminated union narrowing.
- [BUG] **Client naming conflict resolution removed:** `Client as Client_1` renamed import was replaced by two separate `import type { Client }` and `import { TestingContext as Client }`. Both bind `Client` — this is a name collision that TypeScript will reject.
- [OK] Comment style changes (single-line `/** */` → multi-line `/**\n *\n */`) — cosmetic.
- [OK] Blank line removals — cosmetic.

---

## SYSTEMIC ISSUES (Cross-Cutting Patterns)

### 🔴 CRITICAL — S1: Self-imports in models files
**Affected:** modelsGenerator.md (×33), complexFlattenCases.md, mulipleFlattenCases.md
**Pattern:** Every `models` code block now appends `import type { ... } from "./models/models.js"` which is the file importing itself.
**Root Cause:** Alloy's import resolution emits imports relative to the output package root (`./models/models.js`) rather than recognizing that the current file IS `models/models.js`. The refkey system resolves type references to their canonical module path without checking if the target module is the current file.
**Fix:** Single fix in the Alloy import resolver — skip emitting imports when the target module is the same as the current output file.

### 🔴 CRITICAL — S2: Recursive/self-referencing union types
**Affected:** modelsGenerator.md (×5 instances)
**Pattern:** `export type PetUnion = Cat | Dog | PetUnion` instead of `export type PetUnion = Cat | Dog | Pet`
**Root Cause:** When resolving discriminated union type aliases, Alloy is resolving the base type's refkey to the union type alias itself instead of the base interface `Pet`. The union fallback member should be the base type, not the union alias.
**Fix:** Fix in the discriminated union type alias generation — resolve base type correctly.

### 🔴 CRITICAL — S3: Subtypes `extends` union type alias instead of base interface
**Affected:** modelsGenerator.md (×7 instances)
**Pattern:** `export interface PSDog extends PetUnion` instead of `export interface PSDog extends Pet`
**Root Cause:** Same root cause as S2 — the base type resolution resolves to the union alias instead of the base interface.
**Fix:** Same fix as S2.

### 🔴 CRITICAL — S4: Missing function definitions for discriminated union base serializers/deserializers
**Affected:** modelsGenerator.md (petSerializer, petDeserializer, dogDeserializer removed)
**Pattern:** Functions referenced in switch/default branches of union (de)serializers are no longer emitted.
**Root Cause:** Alloy may be deduplicating or not emitting base type serializers when they're considered "covered" by the union, but the runtime switch default branches still call them.
**Fix:** Ensure base type (de)serializers are always emitted when referenced in union (de)serializer switch defaults.

### 🔴 CRITICAL — S5: Missing static helper imports
**Affected:** mulipleFlattenCases.md (`areAllPropsUndefined`), modelsGenerator.md (`serializeRecord`)
**Pattern:** Static helper imports are removed but the helpers are still called in the code body.
**Root Cause:** Alloy's import resolution doesn't track references to static helpers or treats them as external dependencies that get dropped during import reorganization.
**Fix:** Ensure static helper imports are preserved when the helper function is referenced in the emitted code.

### 🟡 SUSPICIOUS — S6: Spurious XML static-helpers block in all sample code blocks
**Affected:** ALL 28 files — every `samples` code block gets a 15-line XML helpers stub injected
**Pattern:** `/** This file path is /static-helpers/serialization/xml-helpers.ts */` block with stub type/function declarations.
**Root Cause:** The Alloy framework emits all registered static helpers into every code block, even when the scenario doesn't use XML at all. The old framework was selective.
**Fix:** Only emit static helper stubs when the scenario actually references XML operations. This is a "fix once" change in how static helpers are resolved for scenario test output.

### 🟡 SUSPICIOUS — S7: Import path changes (`./options.js` → `./api/options.js`, `../models/` → `./models/`)
**Affected:** All operations code blocks in bodyOptionalCheck, bodyOptionalParameterName, bodyReadonlyOptionalCheck, parameterNormalization, parameterName, parameterOrdering, modelsGenerator
**Pattern:** Systematic import path changes in operations code.
**Assessment:** These may be correct if the Alloy output directory structure differs. However, the old paths (`./options.js`, `../models/models.js`) match the typical generated SDK layout. If the test harness does virtual file resolution, this may be fine. If it does actual file resolution, these new paths could break. **Needs verification against the test harness.**

### 🔴 CRITICAL — S8: Missing imports in classicClient generation
**Affected:** clientConstructorArgs.md
**Pattern:** `TokenCredential` and `CreateOrUpdateOptionalParams` imports removed but types still used.
**Root Cause:** Alloy's import consolidation dropped type-only imports that are needed for the classic client class definition.
**Fix:** Ensure type imports referenced in class definitions are preserved.

### 🔴 CRITICAL — S9: Broken flatten deserializers using array literals instead of property access
**Affected:** complexFlattenCases.md, mulipleFlattenCases.md
**Pattern:** `{ x: ["x"] }` instead of `{ x: item["x"] }` in generated deserializers.
**Root Cause:** The deserializer generator is emitting property names as array literals instead of as property accessor keys on the `item` parameter.
**Fix:** Fix in the flatten deserializer code generation — use `item["propName"]` instead of `["propName"]`.

### 🟡 SUSPICIOUS — S10: `Record<string, T>` intersection removed from model interfaces
**Affected:** modelsGenerator.md (Vegetables, A)
**Pattern:** `extends Record<string, number | string>` removed from interface declarations.
**Assessment:** This changes the type contract. The old code used `extends Record<string, T>` for additional properties / open record types. The new code drops this, making the interface closed. This may be intentional if `additionalProperties` is now modeled as an explicit field, but it changes the TypeScript type surface.

### 🟡 SUSPICIOUS — S11: Return type narrowing from `PetUnion` to `Pet`
**Affected:** modelsGenerator.md (2 discriminated union operation scenarios)
**Pattern:** Operations that returned `Promise<PetUnion>` now return `Promise<Pet>`.
**Assessment:** This is a type narrowing that loses the discriminated union information. Callers can no longer use type narrowing on `kind` to get specific subtypes. May be intentional API design change but is a **breaking change** for consumers.

### 🟡 SUSPICIOUS — S12: Client model naming collision
**Affected:** modelsGenerator.md (Client model test case)
**Pattern:** `import type { Client } from "./models/models.js"` and `import { TestingContext as Client } from "./index.js"` — both bind `Client`.
**Assessment:** The old code resolved this with `Client as Client_1`. The new code has a name collision. TypeScript will reject duplicate identifiers in the same scope.

---

## Summary

| Severity | Count | Description |
|----------|-------|-------------|
| 🔴 CRITICAL | 9 | S1-S5, S8-S9, S12 — build/runtime failures |
| 🟡 SUSPICIOUS | 4 | S6-S7, S10-S11 — potential issues needing verification |
| 🟢 CLEAN | 0 | No files are completely clean |

**Bottom Line:** The Alloy migration introduces **9 distinct systemic bugs** that manifest across the 28 scenario files. The most impactful are:

1. **Self-imports (S1)** — affects ~35 code blocks, fix once in import resolver
2. **Recursive union types (S2) + extends union (S3)** — affects all discriminated union scenarios, fix once in union type resolution
3. **Missing base serializers (S4)** — affects discriminated union switch defaults
4. **Missing static helper imports (S5)** — affects flatten and additional-property scenarios
5. **Broken deserializer codegen (S9)** — affects flatten scenarios with `["x"]` instead of `item["x"]`

All critical bugs are "fix once in the emitter" problems — none require individual scenario fixes.
