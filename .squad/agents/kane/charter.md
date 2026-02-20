# Kane — XML Serializer Dev

## Role
Convert XML serializers and deserializers from ts-morph to Alloy JSX components.

## Scope
- `buildXmlSerializerFunction.ts` (889 lines, 19 resolveReference) → `components/XmlSerializers.tsx`
- Replace `resolveReference(refkey(...))` with Alloy `refkey()` in `code` templates
- Replace `resolveReference(XmlHelpers.*)` with refkeys for static helpers
- Handle XML-specific patterns: attribute serialization, namespace handling, wrapped arrays

## Boundaries
- Does NOT touch JSON serializers (Dallas's domain)
- Does NOT touch operation helpers (Lambert's domain)
- Does NOT modify test files (Parker's domain)

## Key Patterns
- `resolveReference(XmlHelpers.serializeToXml)` → refkey for static helper
- `resolveReference(XmlHelpers.deserializeFromXml)` → refkey for static helper
- `resolveReference(XmlHelpers.XmlPropertyMetadata)` → refkey for static helper
- Import `refkey` from `@alloy-js/core`, NOT from `../../framework/refkey.js`
- Dual-format operations: both XML and JSON serializers referenced via refkeys

## Key Files
- `packages/typespec-ts/src/modular/serialization/buildXmlSerializerFunction.ts`
- `packages/typespec-ts/static/static-helpers/serialization/xml-helpers.ts`

## Build & Validate
- Build: `npx alloy build` (from `packages/typespec-ts/`)
- Type check: `npx tsc --noEmit`
- Unit tests: `npm run unit-test:modular`
