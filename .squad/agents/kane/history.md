# Kane — History

## Project Context
**Project:** TypeSpec TypeScript Emitter — Alloy Framework Migration
**Stack:** TypeScript, TypeSpec, Alloy JSX, ts-morph (being replaced)
**User:** Jose Manuel Heredia Hidalgo
**Plan:** `packages/typespec-ts/ALLOY_MIGRATION_PLAN.md`

## Learnings

### Phase 4 Complete — XML Serializers Converted to Alloy JSX (2026-02-20)

Converted `buildXmlSerializerFunction.ts` (889 lines, 19 resolveReference calls) to `components/XmlSerializers.tsx` as a pure Alloy JSX component.

**What was created:**
- `packages/typespec-ts/src/modular/components/XmlSerializers.tsx` — renders all 4 XML function types:
  - `XmlModelSerializerFn` — returns XML string via `serializeToXml()`
  - `XmlObjectModelSerializerFn` — returns serialized object for nested use
  - `XmlModelDeserializerFn` — takes XML string via `deserializeFromXml()`
  - `XmlObjectModelDeserializerFn` — takes parsed object via `deserializeXmlObject()`

**resolveReference → refkey conversions done:**
1. `resolveReference(refkey(type, "xmlSerializer"))` → `refkey(type, "xmlSerializer")` via `xmlSerializerRefkey(type)`
2. `resolveReference(refkey(type, "xmlObjectSerializer"))` → `refkey(type, "xmlObjectSerializer")` via `xmlObjectSerializerRefkey(type)`
3. `resolveReference(refkey(type, "xmlDeserializer"))` → `refkey(type, "xmlDeserializer")` via `xmlDeserializerRefkey(type)`
4. `resolveReference(refkey(type, "xmlObjectDeserializer"))` → `refkey(type, "xmlObjectDeserializer")` via `xmlObjectDeserializerRefkey(type)`
5. `resolveReference(refkey(type))` → `refkey(type)` (type interface ref)
6. `resolveReference(XmlHelpers.serializeToXml)` → `xmlHelperRefkey("serializeToXml")`
7. `resolveReference(XmlHelpers.deserializeFromXml)` → `xmlHelperRefkey("deserializeFromXml")`
8. `resolveReference(XmlHelpers.XmlPropertyMetadata)` → `xmlHelperRefkey("XmlPropertyMetadata")`
9. `resolveReference(XmlHelpers.XmlPropertyDeserializeMetadata)` → `xmlHelperRefkey("XmlPropertyDeserializeMetadata")`
10. `resolveReference(XmlHelpers.XmlSerializedObject)` → `xmlHelperRefkey("XmlSerializedObject")`
11. `resolveReference(XmlHelpers.deserializeXmlObject)` → `xmlHelperRefkey("deserializeXmlObject")`
12. `useDependencies().uint8ArrayToString` → `httpRuntimeLib.uint8ArrayToString` / `azureCoreUtilLib.uint8ArrayToString`

**Key pattern learned — ParameterDescriptor API:**
Alloy's `<ts.FunctionDeclaration>` `parameters` prop expects `ParameterDescriptor[]` or `string[]`, NOT an object literal.
```tsx
// WRONG: parameters={{ item: typeRef }}
// RIGHT:
parameters={[{ name: "item", type: typeRef }]}
```

**Wiring:** Component is rendered in `alloy-emitter.tsx` right after `<Models>`, inside the `<SdkContextProvider>`. Exports added to `components/index.ts`.

**Validation:** `npx alloy build` ✅, `npx tsc --noEmit` ✅, 526 modular unit tests pass ✅

**Note:** The original `buildXmlSerializerFunction.ts` is NOT deleted — it's still consumed by `emitModels.ts` (ts-morph path) and `operationHelpers.ts`. Both paths coexist. Deletion happens at Phase 7-9 when the ts-morph bridge is removed entirely.

### Phase 1 Complete — Static Helper Refkeys Available (2026-02-20T23:36:00Z)

Ripley delivered the foundational refkey API. Eight accessor functions provide type-safe access to ~50 static helper symbols:

**Available for XML serialization (Phase 3):**
- `xmlHelperRefkey(name)` — 13 symbols for XML operations

**Other functions also available:**
- `serializationHelperRefkey(name)` — 13 symbols (JSON serialization)
- `pagingHelperRefkey(name)` — 6 symbols
- `pollingHelperRefkey(name)` — 2 symbols
- And 4 more families

**How to use:**
```tsx
import { xmlHelperRefkey } from "@alloy-js/typescript-sdk/modular";

const serializeToXmlRef = xmlHelperRefkey("serializeToXml");
const deserializeFromXmlRef = xmlHelperRefkey("deserializeFromXml");
```

**Key architecture:** Refkeys are dual-path compatible—old TsMorphBridge system continues working. Rendering through Alloy deferred to Phase 9.

**Next:** Phase 3 begins—you now have the stable XML helper API. Start XML serializer refactoring.

