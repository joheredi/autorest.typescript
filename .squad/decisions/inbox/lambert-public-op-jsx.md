# Decision: Public Operation Functions → Native JSX Components (Phase 11.4)

**By:** Lambert (Operations Dev)
**Date:** 2026-02-22
**Status:** Implemented

## What

Replaced the `getOperationFunction` → `OperationFunction`/`FunctionBody` bridge pattern with five native JSX components:
- `<PublicOperation>` (dispatcher)
- `<StandardOperation>`, `<PagingOperation>`, `<LroOperation>`, `<LroPagingOperation>`

Eliminated `buildTypeRefkeys()` (120-line name→refkey map) and the `resolveReferences` string-scanning system entirely from the Operations pipeline.

## Why

The bridge pattern worked by:
1. `getOperationFunction` building raw strings for function bodies
2. `buildTypeRefkeys` pre-computing a {symbolName → Refkey} map by walking all operation types
3. `OperationFunction`/`FunctionBody` scanning those strings with regex to replace symbol names with refkeys

This was fragile (regex matching), expensive (full type walk per operation group), and prevented direct refkey usage in templates.

The new approach places refkeys directly in `code` templates — Alloy resolves them during rendering.

## Impact

- **ClassicalClient, ClassicalOperationGroups, Samples** — still use `getOperationFunction`. NOT modified.
- **Operations.tsx** — fully refkey-native for public operation rendering
- **operationHelpers.ts** — three new exports: `getApiVersionExpression`, `buildCompositeResponseType`, `buildLroPagingReturnType`

## Pattern for Future Reference

```tsx
// Direct refkey usage in code templates — no string scanning
const sendRef = sendFunctionRefkey(operation);
const deserializeRef = deserializeFunctionRefkey(operation);
code`const result = await ${sendRef}(${parameterList});
return ${deserializeRef}(result);`

// Return types with model refkeys
returnType={code`PagedAsyncIterableIterator<${modelTypeRefkey(elementType)}>`}

// Type narrowing via operation.kind discriminant
if (operation.kind !== "lro") return null;
// TypeScript now knows operation is SdkLroServiceMethod
```
