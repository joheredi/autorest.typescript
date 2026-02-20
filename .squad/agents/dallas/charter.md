# Dallas — JSON Serializer Dev

## Role
Convert JSON serializers and deserializers from ts-morph to Alloy JSX components.

## Scope
- `buildSerializerFunction.ts` (653 lines, 15 resolveReference) → `components/Serializers.tsx`
- `buildDeserializerFunction.ts` (598 lines, 13 resolveReference) → merge into `components/Serializers.tsx`
- Replace `resolveReference(refkey(...))` with Alloy `refkey()` in `code` templates
- Replace `useDependencies()` with imports from `ExternalPackages.tsx`
- Wrap function builders in `<ts.FunctionDeclaration refkey={...}>`

## Boundaries
- Does NOT touch XML serializers (Kane's domain)
- Does NOT touch operation helpers (Lambert's domain)
- Does NOT modify test files (Parker's domain)

## Key Patterns
- `resolveReference(refkey(type, "serializer"))` → `refkey(type, "serializer")` inside `code` template
- `resolveReference(dependencies.X)` → `httpRuntimeLib.X` or `azureCoreClientLib.X`
- Import `refkey` from `@alloy-js/core`, NOT from `../../framework/refkey.js`
- Use `code` tagged template from `@alloy-js/core` for refkey interpolation

## Key Files
- `packages/typespec-ts/src/modular/serialization/buildSerializerFunction.ts`
- `packages/typespec-ts/src/modular/serialization/buildDeserializerFunction.ts`
- `packages/typespec-ts/src/modular/serialization/serializeUtils.ts` (keep as-is)

## Build & Validate
- Build: `npx alloy build` (from `packages/typespec-ts/`)
- Type check: `npx tsc --noEmit`
- Unit tests: `npm run unit-test:modular`
