# Dallas — History

## Project Context
**Project:** TypeSpec TypeScript Emitter — Alloy Framework Migration
**Stack:** TypeScript, TypeSpec, Alloy JSX, ts-morph (being replaced)
**User:** Jose Manuel Heredia Hidalgo
**Plan:** `packages/typespec-ts/ALLOY_MIGRATION_PLAN.md`

## Learnings

### Session: Phases 2-3 — JSON Serializers & Deserializers

**What was done:**
- Created `packages/typespec-ts/src/modular/components/Serializers.tsx` — Alloy JSX component for JSON serializer and deserializer functions
- Wired component into `alloy-emitter.tsx` (renders alongside Models and XmlSerializers)
- Exported `Serializers`, `serializerRefkey`, `deserializerRefkey` from `components/index.ts`

**Architecture decisions:**
1. **Coexistence pattern**: The old ts-morph pipeline (emitModels.ts → addSerializationFunctions) still generates serializer functions for the binder (operations depend on the binder for resolveReference). The Alloy Serializers component renders the same functions via `<ts.FunctionDeclaration>`. Since Alloy's `writeOutput` runs after TsMorphBridge's `emitFile`, the Alloy output takes precedence for model files.

2. **Refkey strategy**: Used Alloy `refkey(type, "serializer")` and `refkey(type, "deserializer")` for function declarations AND for cross-references in `code` templates (e.g., discriminated union switch cases calling subtype serializers). Type references use `refkey(type)` and `refkey(type, "polymorphicType")` which resolve to declarations in Models.tsx.

3. **Helper function reuse**: For model type serializer/deserializer bodies, called existing `getRequestModelMapping` and `getResponseMapping` from operationHelpers.ts. These functions use the OLD resolveReference system internally (producing placeholders). During the coexistence period, the binder resolves these placeholders in ts-morph files. The Alloy-rendered files have the same content structure.

4. **Static helper references**: Used computed string names for `serializeRecord` (from static helpers) in additional properties statements, since static helpers don't have Alloy declarations yet (Phase 9). When Phase 9 adds `<ts.SourceFile>` components for static helpers with refkey-annotated declarations, these can be upgraded to use `serializationHelperRefkey()`.

5. **Dict/Array serializers**: Used Alloy `code` templates with `refkey(type.valueType, "serializer")` for value serializer cross-references. This enables Alloy auto-import when value types are in different files.

6. **Multiple `<ts.SourceFile>` with same path**: Confirmed that Alloy merges content from multiple `<ts.SourceFile>` elements targeting the same file path (Models, Serializers, and XmlSerializers all render into `models/models.ts`).

**Key patterns learned:**
- `<ts.FunctionDeclaration>` accepts `parameters` as `{name, type}[]` where `type` can be a Refkey
- `returnType` prop can be a Refkey, a `code` template, or a string
- `code` template children in `<ts.FunctionDeclaration>` become the function body
- Follow XmlSerializers.tsx as the authoritative pattern for serialization components

**Pre-existing issues found:**
- `operationHelpers.ts` has undefined references to `getBinaryResponse` (line 877) and `areAllPropsUndefined` (line 1833) — these cause build failures unrelated to my changes

### Phase 1 Complete — Static Helper Refkeys Available (2026-02-20T23:36:00Z)

Ripley delivered the foundational refkey API. Eight accessor functions provide type-safe access to ~50 static helper symbols:

**Available functions:**
- `serializationHelperRefkey(name)` — 13 symbols (buildCsvCollection, buildMultiCollection, buildNewlineCollection, buildPipeCollection, buildSsvCollection, buildTsvCollection, parseCsvCollection, parsePipeCollection, parseSsvCollection, parseNewlineCollection, serializeRecord, getBinaryResponse, areAllPropsUndefined)
- `pagingHelperRefkey(name)` — 6 symbols
- `pollingHelperRefkey(name)` — 2 symbols
- `simplePollerHelperRefkey(name)` — 2 symbols
- `urlTemplateHelperRefkey(name)` — 2 symbols
- `multipartHelperRefkey(name)` — 2 symbols
- `cloudSettingHelperRefkey(name)` — 3 symbols
- `xmlHelperRefkey(name)` — 13 symbols

**How to use:**
```tsx
import { serializationHelperRefkey, getStaticHelperFileInfo } from "@alloy-js/typescript-sdk/modular";

// Type-safe refkey
const serializeRecordRef = serializationHelperRefkey("serializeRecord");

// Manual imports (until Phase 9 auto-import)
const info = getStaticHelperFileInfo("Serialization", "serializeRecord");
// info.relativePath = "static-helpers/serialization/serialize-record.ts"
// info.exportName = "serializeRecord"
```

**Key architecture:** Refkeys are dual-path compatible—old TsMorphBridge system continues working. Rendering through Alloy deferred to Phase 9.

**Next:** Phase 2 begins—you now have the stable API. Start JSON serializer refactoring with confidence in import paths.

