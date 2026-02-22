# Scenario Test Audit — Group 1 (Alloy Migration)

**Auditor:** Parker (Tester)
**Requested by:** Jose Manuel Heredia Hidalgo
**Date:** 2025-07-24
**Scope:** 15 scenario test `.md` files across anonymous, apiOperations, classicClient, clientContext, enumUnion, example, and multipart directories

---

## Summary

**Total files audited:** 15
**Files with bugs:** 13
**Clean files:** 0
**Suspicious only:** 2

Three systemic bug patterns dominate this migration:

1. **Self-imports in models blocks** — Types/interfaces defined in `models.js` import themselves from `./models/models.js` within the same code block. This would cause circular references or redundant imports at build time. Found in 11+ files.
2. **clientContext replaced with XML stubs** — Every `clientContext` code block has been replaced with XML serialization helper stubs (`serializeToXml`, `parseXmlString`, etc.) instead of the actual client factory code (`createService`, `getClient`, context interface, etc.). Found in 5 scenarios across 3 files.
3. **Multipart file types regressed to `any`** — All `FileContents` union types for multipart file fields have been replaced with `any`, losing type safety. Found in 4 files.

---

## File-by-File Reports

### 1. anonymous/anonymous.md
**Status:** 🔴 BUGS FOUND

**Issues:**
- [BUG] `barSerializer` import removed from operations blocks but still called in function bodies (lines 93, 232, 361) — e.g., `prop5: barSerializer(prop5)`. Affects 3 of the 8 scenarios (spread, withOptions, and bar-in-middle spread).
- [BUG] Self-import: `_ReadRequest` defined at line ~537, then `import type { _ReadRequest } from "./models/models.js"` at line 540 within the same `ts models` block.
- [BUG] Self-import: `_ReadResponse` defined then self-imported at line 890 within models block.
- [BUG] Self-import: `_ReadResponse, _ReadResponseFoo` self-imported at line 1043 within models block.
- [BUG] Self-import: `_FozBaz, _FozBazNonemptyAnomyous, _FozBazNonemptyAnomyousArray, _FozBazNonemptyAnomyousDict, Foz, SimpleModel` self-imported at line 1352 within models block.
- [BUG] Self-import: `Example`-pattern types self-imported in the `ReturnBody` scenario models block at line 1166.
- [OK] `expandUrlTemplate` is properly imported in all operations blocks.
- [OK] Import path changes from `../models/models.js` to `./models/models.js` in operations blocks are consistent (though different from old convention).

### 2. apiOperations/apiOperations.md
**Status:** 🔴 BUGS FOUND

**Issues:**
- [BUG] `_UploadFileRequest.file` type changed from `FileContents | { contents: FileContents; contentType?: string; filename?: string }` to `any` (line 145). Complete loss of type safety for multipart file upload.
- [BUG] `_UploadFilesRequest.files` type changed from `Array<FileContents | {...}>` to `any` (line 243). Same regression.
- [BUG] `FileContents` and `createFilePartDescriptor` imports removed from models blocks but `createFilePartDescriptor` still called in serializer bodies (lines 155, 251).
- [BUG] `errorResponseDeserializer` import removed from operations block but still referenced at lines 1089 and 1158 (`error.details = errorResponseDeserializer(result.body)`).
- [BUG] Self-import: `_UploadFilesRequest` self-imported at line 246 within models block.
- [BUG] **clientContext replaced with XML stubs** — All 3 `clientContext` blocks (lines 561, 702, 862) now contain XML serialization helpers (`serializeToXml`, `parseXmlString`, etc.) instead of the proper `createTesting()` factory, `TestingContext` interface, and `TestingClientOptionalParams`. The entire client initialization logic is gone.
- [BUG] `FileContents` removed from operations imports but still referenced in the `uploadFile` function signature (lines 179-180, 204-205, 275-276, 300-301 show old references still present in the unchanged function bodies).
- [SUSPICIOUS] Classic client methods lost default values for options parameters (e.g., `options: TestOptionalParams` instead of `options: TestOptionalParams = { requestOptions: {} }`). This changes the caller contract.
- [SUSPICIOUS] `public readonly pipeline` changed to `readonly pipeline` — removes explicit `public` modifier.

### 3. apiOperations/azureCoreOperations.md
**Status:** 🔴 BUGS FOUND

**Issues:**
- [BUG] Self-import: `FakedSharedModel, ResourceOperationStatusWidgetSuiteWidgetSuiteError, WidgetSuite` self-imported at line 222 within the `ts models` block, after all three interfaces are already defined in the same block.
- [BUG] `GetWidgetOperationStatusOptionalParams` imported as value (line 60: `import { GetWidgetOperationStatusOptionalParams }`) instead of type-only import. Inconsistent with the `import type` pattern used elsewhere.
- [OK] `KnownOperationState` enum added — this is a new feature addition, not a regression.
- [OK] Deserializer imports are properly maintained.

### 4. apiOperations/reservedWordOperations.md
**Status:** 🟡 SUSPICIOUS

**Issues:**
- [SUSPICIOUS] `ContinueOptionalParams` and `ReturnOptionalParams` imported as values (line 21: `import { ContinueOptionalParams }`, line 82: `import { ReturnOptionalParams }`) instead of type-only imports. Inconsistent with the `import type` pattern used for `GlobalOptionalParams` at line 143.
- [OK] Operations logic unchanged; `$continue`, `$return`, and `global` functions preserved correctly.
- [OK] No self-imports detected.
- [OK] Comment formatting changes are cosmetic.

### 5. classicClient/classicClient.md
**Status:** 🟡 SUSPICIOUS

**Issues:**
- [SUSPICIOUS] `options: FooOptionalParams` lost default value `= { requestOptions: {} }` — callers that relied on the default would need to pass options explicitly.
- [SUSPICIOUS] `public readonly pipeline` changed to `readonly pipeline` — removes explicit accessibility modifier.
- [OK] Import consolidation from separate `./api/operations.js` + `./api/options.js` to `./api/index.js` is a valid refactor.
- [OK] `userAgentPrefix` logic refactored from local variable to inline ternary — functionally equivalent.

### 6. classicClient/clientConstructorOverloads.md
**Status:** 🔴 BUGS FOUND

**Issues:**
- [BUG] Multiple methods lost default values for options parameters:
  - `list(options: ListOptionalParams)` — was `= { requestOptions: {} }` (3 occurrences)
  - `listSkus(options: ListSkusOptionalParams)` — was `= { requestOptions: {} }`
  - `get(..., options: GetOptionalParams)` — was `= { requestOptions: {} }` (2 occurrences)
  - `checkNameAvailability(..., options: CheckNameAvailabilityOptionalParams)` — was `= { requestOptions: {} }`
  This is a breaking API change — all callers must now pass options explicitly.
- [SUSPICIOUS] `public readonly pipeline` changed to `readonly pipeline` across all 3 classic client variants.
- [OK] Import consolidation to `./api/index.js` is valid.
- [OK] Constructor overload logic in `MixedServiceClient` preserved correctly.

### 7. classicClient/reservedWordOperations.md
**Status:** 🔴 BUGS FOUND

**Issues:**
- [BUG] `continue(options: ContinueOptionalParams)` lost default value `= { requestOptions: {} }` — breaking change for callers.
- [SUSPICIOUS] `@fixme` JSDoc comment reformatted — lost indentation alignment. Cosmetic but inconsistent.
- [OK] `$continue` import and usage preserved correctly.
- [OK] Constructor logic functionally equivalent.

### 8. clientContext/clientContext.md
**Status:** 🔴 BUGS FOUND

**Issues:**
- [BUG] **All 3 clientContext blocks completely replaced with XML serialization stubs.** The actual client context code (`createService`, `ServiceContext` interface, `ServiceClientOptionalParams`, `getClient` call, logger integration, endpoint URL construction, `clientParam` handling) is entirely gone. Replaced with `serializeToXml`, `parseXmlString`, `isXmlContentType`, etc. — functions completely unrelated to client context.
  - Block 1 (line 62): Was `createService(endpointParam, options)` with `clientParam` support
  - Block 2 (line 138): Was `createService(options)` with default endpoint
  - Block 3 (line 216): Was `createTestService(endpointParam, options)` with title config

### 9. clientContext/optionalApiVersion.md
**Status:** 🔴 BUGS FOUND

**Issues:**
- [BUG] **clientContext block replaced with XML stubs** (line 59). The `createDataMapService` factory, `DataMapServiceContext` interface, `DataMapServiceClientOptionalParams` with optional `apiVersion`, and all associated client initialization logic is gone. Replaced with XML serialization helpers.

### 10. enumUnion/enumUnion.md
**Status:** 🔴 BUGS FOUND

**Issues:**
- [BUG] Self-import: `SchemaContentTypeValues` self-imported at lines 86, 330, 412, 554, 636 within `ts models` blocks — 5 occurrences across different scenarios.
- [BUG] Self-import: `Foo, MixedTypes` self-imported at line 1135 within `ts models` block.
- [OK] `KnownSchemaContentTypeValues` and `KnownJsonContentType` enums added — these are valid feature additions.
- [OK] Previously empty models (`// (file was not generated)`) now generate proper eslint-disable headers — not a regression.

### 11. example/example.md
**Status:** 🔴 BUGS FOUND

**Issues:**
- [BUG] Self-import: `Example` self-imported at line 53 within `ts models` block — `import type { Example } from "./models/models.js"` appears after `export interface Example { id: string; }`.
- [OK] Operations imports properly restructured with value/type separation.
- [OK] `exampleDeserializer` properly imported in operations block.

### 12. multipart/file.md
**Status:** 🔴 BUGS FOUND

**Issues:**
- [BUG] `FileContents` and `createFilePartDescriptor` imports removed from all 4 models blocks, but `createFilePartDescriptor` still called in serializer bodies (lines 31, 114, 150, 184).
- [BUG] `basicFile` type regressed from `FileContents | { contents: FileContents; contentType?: string; filename?: string }` to `any` (line 25).
- [BUG] `nameRequired` type regressed from `File | { contents: FileContents; contentType?: string; filename: string }` to `any` (line 108).
- [BUG] `image` type regressed from `FileContents | { contents: FileContents; contentType?: "image/png"; filename?: string }` to `any` (line 144).
- [BUG] `files` type regressed from `Array<FileContents | {...}>` to `any` (line 178).
- [BUG] Self-import: `RequestBody` self-imported at lines 28, 111, 147, 181 within `ts models` blocks — 4 occurrences.

### 13. multipart/json.md
**Status:** 🔴 BUGS FOUND

**Issues:**
- [BUG] Self-import: `Person, RequestBody` self-imported at lines 43, 101, 164 within `ts models` blocks — 3 occurrences.
- [OK] No type regressions — `person: Person` and `people: Person[]` types preserved.
- [OK] Serializer function ordering changed but logic preserved.

### 14. multipart/renamewithWireNameAndClientName.md
**Status:** 🔴 BUGS FOUND

**Issues:**
- [BUG] `image` type regressed from `FileContents | { contents: FileContents; contentType?: string; filename?: string }` to `any` in both scenarios (lines 29, 78).
- [BUG] `FileContents` and `createFilePartDescriptor` imports removed but `createFilePartDescriptor` still called in serializer bodies (lines 37, 86).
- [BUG] Self-import: `MultiPartRequestWithWireName` self-imported at line 32 within models block.
- [BUG] Self-import: `MultiPartRequest` self-imported at line 81 within models block.

### 15. multipart/text.md
**Status:** 🔴 BUGS FOUND

**Issues:**
- [BUG] Self-import: `RequestBody` self-imported at lines 30, 112, 148 within `ts models` blocks — 3 occurrences.
- [OK] No type regressions for text multipart fields — `firstName: string`, `lastName?: string`, `names: string[]` preserved.
- [OK] Operations blocks properly import `requestBodySerializer` as value import.

---

## Systemic Issue Summary

| Issue Pattern | Severity | Files Affected | Count |
|---|---|---|---|
| Self-imports in models blocks | 🔴 Critical | 11 files | 25+ occurrences |
| clientContext replaced with XML stubs | 🔴 Critical | 3 files (apiOperations, clientContext, optionalApiVersion) | 7 blocks |
| Multipart file types regressed to `any` | 🔴 Critical | 3 files (file.md, rename.md, apiOperations.md) | 9 fields |
| `createFilePartDescriptor`/`FileContents` imports removed but still used | 🔴 Critical | 3 files | 6 occurrences |
| `barSerializer` import removed but still used | 🔴 Critical | 1 file (anonymous.md) | 3 operations blocks |
| `errorResponseDeserializer` import removed but still used | 🔴 Critical | 1 file (apiOperations.md) | 2 call sites |
| Options default values removed from classic client methods | 🟡 Breaking | 4 files | 10+ methods |
| `public` modifier removed from `readonly pipeline` | 🟡 Suspicious | 4 files | 5 occurrences |
| Inconsistent value vs type-only imports for options params | 🟡 Suspicious | 2 files | 3 occurrences |

---

## Recommended Actions

1. **Fix the self-import pattern** — The Alloy emitter is placing `import type { X } from "./models/models.js"` inside the models file itself. These should be removed when the type is already defined in the same file. This is the most widespread issue.

2. **Restore clientContext generation** — The `clientContext` blocks are emitting XML serialization stubs instead of proper client factory code. This appears to be a routing/resolution bug in the Alloy framework where the wrong template is being selected for clientContext output.

3. **Restore FileContents types** — The multipart `FileContents` union types must not regress to `any`. The `createFilePartDescriptor` and `FileContents` imports from `../static-helpers/multipartHelpers.js` need to be restored in models blocks.

4. **Restore missing serializer/deserializer imports** — `barSerializer`, `errorResponseDeserializer`, and other value imports must be re-added to operations blocks where they are called.

5. **Evaluate options default removal** — Decide if removing `= { requestOptions: {} }` from classic client methods is intentional. If so, document as a breaking change. If not, restore defaults.
