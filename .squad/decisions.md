# Decisions

## 2026-02-20: Team Formation
**By:** Squad (Coordinator)
**What:** Team formed for Alloy migration. Ripley (Lead), Dallas (JSON Serializers), Kane (XML Serializers), Lambert (Operations), Parker (Tester).
**Why:** Migration plan has clear domain boundaries between JSON serialization, XML serialization, and operations — warrants separate specialists.

## 2026-02-20: Migration plan adopted
**By:** Jose Manuel Heredia Hidalgo
**What:** The migration plan at `packages/typespec-ts/ALLOY_MIGRATION_PLAN.md` is the authoritative source of truth for this work.
**Why:** Pre-existing plan with 9 steps, gotchas, and validation criteria.

## 2026-02-20: Phase 1 Architecture — Refkey-first, rendering deferred
**By:** Ripley (Lead)
**What:** Static helpers are NOT yet rendered through Alloy `<ts.SourceFile>` components. They continue through `loadStaticHelpers()` → TsMorphBridge. Refkey functions establish the stable API contract.
**Why:** Rendering through Alloy would cause dual-write conflicts with TsMorphBridge. Deferred to Phase 9 when all consumers are migrated. Phase 1 creates refkeys alongside old system (dual-path coexistence).

## 2026-02-20: Phase 1 Architecture — Manual imports over auto-imports
**By:** Ripley (Lead)
**What:** `getStaticHelperFileInfo()` enables components to build manual import statements instead of relying on Alloy's auto-import resolution.
**Why:** Pragmatic bridge: components get correct import paths without needing declarations in Alloy tree. Auto-imports deferred to Phase 9.

## 2026-02-20: Phase 1 Architecture — Refkey namespace isolation
**By:** Ripley (Lead)
**What:** All static helper refkeys use prefix `refkey("StaticHelpers", category, name)`. Isolated from old framework refkeys (string-based), type refkeys, and operation refkeys.
**Why:** Clear separation prevents import confusion between Alloy refkeys (return Refkey objects) and old framework refkeys (return strings) during migration.

## 2026-02-20: JSON Serializers Coexistence Strategy
**By:** Dallas (JSON Serializer Dev)
**Status:** Implemented (Phase 2-3)
**What:** Created `Serializers.tsx` Alloy component that renders JSON serializer/deserializer functions alongside the existing ts-morph generation pipeline. Both systems produce the same functions; Alloy's output takes precedence via `writeOutput` ordering.
**Why:** Operations code still depends on the old binder (resolveReference) for serializer name resolution. Removing `addSerializationFunctions` from `emitModels.ts` would break operation file generation. The coexistence pattern lets us add Alloy refkeys NOW while keeping the binder operational.
**Impact on other agents:**
- **Kane (XML Serializers):** Same coexistence pattern. XmlSerializers.tsx already follows this.
- **Lambert (Operations):** When operations are migrated to Alloy, they should use `refkey(type, "serializer")` and `refkey(type, "deserializer")` from `@alloy-js/core` (or import `serializerRefkey`/`deserializerRefkey` from `components/Serializers.js`).
- **Parker (Tester):** No test changes needed — serializer output should be identical.
**Cleanup Path:** After Lambert completes the operations migration (Phase 5-6), the old `emitModels.ts → addSerializationFunctions → addDeclaration` chain can be deleted. The Alloy Serializers component becomes the sole source of serializer functions.

## 2026-02-20: XML Serializers Alloy Component Architecture
**By:** Kane (XML Serializer Dev)
**Status:** Implemented (Phase 4)
**What:** Created `XmlSerializers.tsx` as a standalone Alloy component that renders XML serializer/deserializer functions. It coexists with the old `buildXmlSerializerFunction.ts` — both paths produce the same refkeys so they don't conflict.
**Why:**
- Keeps XML domain separate from JSON serializers (Dallas's domain)
- Reuses pure utility functions (`hasXmlSerialization`, `getXmlRootName`, `getXmlRootNs`) from the old file without duplication
- Duplicates the metadata-building helpers (`buildPropertyMetadataArray`, `buildXmlOptionsString`, etc.) since these are tightly coupled to the rendering approach
**Impact:**
- The old `buildXmlSerializerFunction.ts` is NOT modified — Lambert's `operationHelpers.ts` still calls it for the ts-morph path
- When `emitModels.ts` is deleted (Phase 7), the old file's exported builders can also be removed
- The `uint8ArrayToString` dependency is resolved via `httpRuntimeLib` / `azureCoreUtilLib` based on `isAzurePackage()` check

## 2026-02-20: Operations Migration — Shared Function Boundary
**By:** Lambert (Operations Dev)
**Status:** Implemented (Phase 5-6)
**What:** When migrating `resolveReference()` calls from `operationHelpers.ts`, **9 calls were intentionally preserved** in functions shared between the operation pipeline and the serializer pipeline:
- `getSerializationExpressionForFlatten` — `resolveReference(SerializationHelpers.areAllPropsUndefined)`
- `serializeRequestValue` — `resolveReference(dependencies.uint8ArrayToString)` and `resolveReference(serializerRefkey)`
- `deserializeResponseValue` — `resolveReference(dependencies.stringToUint8Array)`
**Why:** These functions are called from **both** the operation generation (now Alloy JSX) **and** the serializer generation (still ts-morph + binder). Removing `resolveReference()` from them breaks serializer import tracking, causing 120+ unit test failures.
**Cleanup Path:** When the serializer pipeline migrates to Alloy (later phases), the remaining 9 `resolveReference()` calls can be removed from these shared functions. The serializer migration should include replacing these calls with Alloy Refkeys in code templates.
**Import Strategy for Operations:** Operation files use **explicit import computation** (not Alloy auto-import) because function bodies are rendered as raw strings from Category A/B helpers. The `collectFileImports` function in Operations.tsx analyzes operations to determine required imports. When the full code-template conversion happens (Phase 9), this can switch to Alloy auto-import.
