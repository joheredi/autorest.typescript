# Scenario Test Audit — Group 2 (Lambert)

**Auditor:** Lambert (Operations Dev)
**Scope:** 57 scenario test files across operations, models, payload/xml, and modelsGenerator
**Method:** `git diff` analysis of each file for breaking changes from Alloy migration

---

## Summary

- **🔴 Critical Bugs:** 7 files with missing imports that would cause build/runtime failures
- **🟡 Self-Import Pattern Bug:** 22 files have `import type { X } from "./models/models.js"` inside `ts models` blocks (self-importing from the file being generated)
- **🟢 Clean:** 28 files with only whitespace/formatting/import-reordering changes

---

## 🔴 CRITICAL BUGS

### operations/headerParam/headerParamWithClientInitialization.md
**Status:** 🔴 BUGS FOUND
**Issues:**
- [BUG] The entire `clientContext` section (BillingBenefitsContext interface, BillingBenefitsClientOptionalParams, createBillingBenefits factory) is replaced with unrelated XML serialization stub functions (`serializeToXml`, `parseXmlString`, etc.). This destroys the client constructor test. Both test scenarios (optional and required `expand` header) are affected.

### operations/queryParam/queryParamWithClientInitialization.md
**Status:** 🔴 BUGS FOUND
**Issues:**
- [BUG] Same issue as headerParamWithClientInitialization — the `clientContext` section with BillingBenefitsContext and createBillingBenefits factory is replaced with XML serialization stubs. Both test scenarios (optional and required `expand` query param) are affected.

### operations/operations.md
**Status:** 🔴 BUGS FOUND
**Issues:**
- [BUG] Missing import for `buildCsvCollection` from `"../static-helpers/serialization/build-csv-collection.js"` — function is called at lines ~160, ~168 but never imported.
- [BUG] Missing import for `uint8ArrayToString` from `"@azure/core-util"` — function is called at lines ~158, ~159, ~162 but never imported.
- [BUG] Missing import for `_readResponseArrayDeserializer` from `"../models/models.js"` — function is called at line ~457 but not imported. Only `Bar` is imported as a type.
- [BUG] Missing import for `errorDeserializer` from `"../models/models.js"` — function is called at line ~700 but not imported. Only `_barDeserializer` and `_Bar` type are imported.

### operations/errorDeserialization/xmlErrorDeserialization.md
**Status:** 🔴 BUGS FOUND
**Issues:**
- [BUG] Missing import for `storageErrorXmlDeserializer` — called at line ~67 (`error.details = storageErrorXmlDeserializer(result.body)`) but only `widgetDeserializer` is imported from `"./models/models.js"`.
- [BUG] Missing import for `simpleErrorDeserializer` — called at line ~250 (`error.details = simpleErrorDeserializer(result.body)`) but only `itemDeserializer` is imported from `"./models/models.js"`.

### operations/overrideReservedkeywords.md
**Status:** 🔴 BUGS FOUND
**Issues:**
- [BUG] Missing import for `errorResponseDeserializer` — called at line ~104 (`error.details = errorResponseDeserializer(result.body)`) but not imported anywhere in the operations block.

### operations/queryParam/queryParamCollectionFormat.md
**Status:** 🔴 BUGS FOUND
**Issues:**
- [BUG] Missing import for `buildSsvCollection` from `"../static-helpers/serialization/build-ssv-collection.js"` — called at lines ~59, ~66 but never imported.
- [BUG] Missing import for `buildPipeCollection` from `"../static-helpers/serialization/build-pipe-collection.js"` — called at line ~71 but never imported.

### models/serialization/modelPropertyArrayEncoding.md
**Status:** 🔴 BUGS FOUND
**Issues:**
- [BUG] All 8 collection helper imports removed but 20 usages remain: `buildCsvCollection`, `buildPipeCollection`, `buildSsvCollection`, `buildNewlineCollection`, `parseCsvCollection`, `parsePipeCollection`, `parseSsvCollection`, `parseNewlineCollection`. Zero `import` statements for any of them in the working tree.

---

## 🔴 MISSING STATIC HELPER IMPORTS (in models blocks)

### models/deserialization/additionalProperties.md
**Status:** 🔴 BUGS FOUND
**Issues:**
- [BUG] `serializeRecord` is called 5 times in serializer functions but never imported. (It was removed from imports during the migration.)
- [BUG] `extends Record<string, string>` removed from `SimpleModel` interface — changes model's type signature. Now uses explicit `additionalProperties` field instead.

### models/propertyFlatten/singleLayer.md
**Status:** 🔴 BUGS FOUND
**Issues:**
- [BUG] `areAllPropsUndefined` called 3 times but import from `"../static-helpers/serialization/check-prop-undefined.js"` is removed.

### models/propertyFlatten/nameCollision.md
**Status:** 🔴 BUGS FOUND
**Issues:**
- [BUG] `areAllPropsUndefined` called 2 times but import removed.

### models/serialization/readonlyFlattenModel.md
**Status:** 🔴 BUGS FOUND
**Issues:**
- [BUG] `areAllPropsUndefined` called 1 time but import removed.

---

## 🟡 SELF-IMPORT PATTERN (Systemic Alloy Issue)

The following 22 files have `import type { X } from "./models/models.js"` lines inside `ts models` code blocks. Since these blocks represent the generated `models/models.js` file, these are self-imports. While `import type` is erased at compile time (so no runtime crash), this indicates the Alloy framework is not correctly resolving intra-file type references.

**Affected files (all have self-imports in `ts models` blocks):**
1. models/deserialization/additionalProperties.md
2. models/deserialization/anonymousModel.md
3. models/deserialization/extends.md (3 separate self-imports)
4. models/missingErrorResponseModel.md
5. models/models.md
6. models/nestedEnum/flatten/experimentalExtensibleEnumsTrue.md
7. models/nestedEnum/notFlatten/experimentalExtensibleEnumsFalse.md
8. models/nestedEnum/notFlatten/experimentalExtensibleEnumsUndefined.md
9. models/nullable/nullableOptional.md (4 self-imports across models and models:withOptions blocks)
10. models/nullable/nullableUnion.md
11. models/propertyFlatten/mulipleLayers.md
12. models/propertyFlatten/nameCollision.md
13. models/propertyFlatten/singleLayer.md (6 self-imports)
14. models/serialization/additionalProperties.md (5 self-imports)
15. models/serialization/anonymousModel.md
16. models/serialization/encodeIntAsString.md
17. models/serialization/enumKeyNorm.md
18. models/serialization/errorModels.md
19. models/serialization/modelPropertyArrayEncoding.md (3 self-imports)
20. models/serialization/readonlyFlattenModel.md
21. modelsGenerator/modelsGenerator.md (many self-imports)
22. operations/pagination/disablePagination.md

**Note:** All self-imports are `import type` only (not value imports), so they won't cause runtime failures but are still incorrect generated code.

---

## 🟢 CLEAN FILES (whitespace/formatting/import-reordering only)

The following files have only non-breaking changes (import reordering, `import` → `import type`, whitespace removal, comment reformatting, `./options.js` → `./api/options.js` path normalization, trailing comma additions):

1. operations/armPatchWithUnionResponse.md
2. operations/clientDefaultValue.md
3. operations/cookieParam/ignoreCookieParam.md
4. operations/errorDeserialization/errorHeaderDeserialization.md
5. operations/lroPaging.md
6. operations/override.md
7. operations/pathParam/allowReservedFalseInAnnotation.md
8. operations/pathParam/allowReservedTrueInAnnotation.md
9. operations/pathParam/allowReservedTrueWithUriTemplate.md
10. operations/pathParam/allowReservedWithUriTemplate.md
11. operations/pathParam/optionalPath.md
12. operations/pathParam/pathParamUrlTemplate.md
13. operations/pathParam/requiredPathWithDefault.md
14. operations/queryParam/explodeTrueWithAnnotation.md
15. operations/queryParam/explodeTrueWithUriTemplate.md
16. operations/queryParam/queryParamUrlTemplate.md
17. payload/xml/xmlArrayItemTypes.md
18. payload/xml/xmlArrayItemsNameWrapping.md
19. payload/xml/xmlName.md
20. models/apiVersion/apiVersionAsFixedEnum.md
21. models/apiVersion/apiVersionAsKnownVersions.md
22. models/azureCoreErrorModels.md
23. models/deserialization/propertyType.md
24. models/response/headerAndModelInResponse.md
25. models/response/headerAndModelSpread.md
26. models/response/headerInResponse.md
27. models/response/headerInXmlResponse.md
28. models/serialization/propertyType.md
29. models/template/template.md

---

## Consistent Non-Breaking Patterns Across All Files

These changes appear in nearly every file and are intentional Alloy formatting:

1. **Import path change:** `./options.js` → `./api/options.js` (consistent across all operations files)
2. **Import style:** `import { X }` → `import type { X }` for type-only symbols
3. **Import grouping:** External packages first, then project imports, separated by blank lines
4. **Trailing commas:** Added to function args and object literals
5. **Blank line removal:** Between functions (e.g., between `_fooSend` and `_fooDeserialize`)
6. **JSDoc expansion:** Single-line `/** doc */` → multi-line `/**\n * doc\n */`
7. **eslint comment merging:** `/* eslint-disable ... */\n/** doc */` → `/* eslint-disable ... */ /**\n * doc\n */`
8. **Added JSDoc `@param` tags:** Public functions now include `@param` annotations

---

## Root Cause Analysis

The bugs fall into two categories:

1. **Missing import resolution (11 files):** The Alloy framework is not emitting imports for symbols that are referenced in function bodies but weren't declared in the same code block. This affects error deserializers, static collection helpers (`buildCsvCollection`, `buildSsvCollection`, `buildPipeCollection`, `areAllPropsUndefined`, `serializeRecord`, `uint8ArrayToString`), and model deserializers (`_readResponseArrayDeserializer`, `errorDeserializer`).

2. **Self-import in models (22 files):** The Alloy reference/import system adds `import type { X } from "./models/models.js"` before functions that reference type `X`, even when `X` is defined earlier in the same file. The old emitter did not emit these self-imports.

3. **ClientContext replacement (2 files):** The `clientContext` code block content was replaced with XML serialization stubs, suggesting a mapping error in the Alloy migration where the wrong template was applied to these scenarios.
