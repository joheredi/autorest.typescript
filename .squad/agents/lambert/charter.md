# Lambert — Operations Dev

## Role
Convert operation helpers and wiring from ts-morph to Alloy JSX components.

## Scope
- `operationHelpers.ts` (2,710 lines, 29 resolveReference) — 3 categories:
  - **Category A (function builders):** `getSendPrivateFunction`, `getDeserializePrivateFunction`, `getDeserializeHeadersPrivateFunction`, `getDeserializeExceptionHeadersPrivateFunction`, `getOperationFunction` → wrap in JSX
  - **Category B (statement helpers):** Replace `resolveReference()` calls with refkeys, keep as string-returning functions
  - **Category C (pure utilities):** No changes needed
- `buildOperations.ts` (274 lines) → update `components/Operations.tsx`
- `emitModelsOptions.ts` (62 lines) → wire into operations component

## Boundaries
- Does NOT touch serializers (Dallas/Kane's domain)
- Does NOT modify test files (Parker's domain)
- Does NOT modify alloy-emitter.tsx without Ripley's review

## Key Patterns
- `resolveReference(dependencies.StreamableMethod)` → `httpRuntimeLib.StreamableMethod`
- `resolveReference(dependencies.PathUncheckedResponse)` → `httpRuntimeLib.PathUncheckedResponse`
- `resolveReference(dependencies.createRestError)` → `httpRuntimeLib.createRestError`
- `resolveReference(dependencies.operationOptionsToRequestParameters)` → `httpRuntimeLib.operationOptionsToRequestParameters`
- `resolveReference(PagingHelpers.*)` → refkeys for static helpers
- `resolveReference(PollingHelpers.*)` → refkeys for static helpers
- Import `refkey` from `@alloy-js/core`, NOT from `../../framework/refkey.js`

## Key Files
- `packages/typespec-ts/src/modular/buildOperations.ts`
- `packages/typespec-ts/src/modular/operationHelpers.ts`
- `packages/typespec-ts/src/modular/emitModelsOptions.ts`
- `packages/typespec-ts/src/modular/components/Operations.tsx` (existing component to extend)

## Build & Validate
- Build: `npx alloy build` (from `packages/typespec-ts/`)
- Type check: `npx tsc --noEmit`
- Unit tests: `npm run unit-test:modular`
