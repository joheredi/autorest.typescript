# Decision: `getHeaderAndBodyParameters` Decomposed into JSX Components

**Date:** 2026-02-21  
**By:** Ripley (Architecture Lead), Lambert (Operations Dev), Jose Manuel (User)  
**Status:** Implemented ✅  
**Effort:** Phase 11 (Post-Phase 10.5)

## Summary

The monolithic `getHeaderAndBodyParameters()` function in `operationHelpers.ts` has been successfully decomposed into three Alloy JSX components (`<ContentTypeParam>`, `<HeaderParams>`, `<BodyParam>`) alongside refactored `<RequestCall>` and `<SendFunction>`. This is the **first function where `resolveReferences()` was completely removed**, validating the refkey-native pattern for complex rendering scenarios.

## Problem Statement

`getHeaderAndBodyParameters` was a 200+ line function that:
- Returned raw strings (`{contentType: "...", headers: {...}, body: "..."}`), not AST objects
- Required `SendFunction` to accept `typeRefkeys` prop (map of serializer names) for later string-scanning
- Used `resolveReferences()` indirectly via `SendFunction`'s post-rendering placeholder substitution
- Was tightly coupled to serializer import tracking (old binder pattern)

This coupling prevented full migration of the operation pipeline to Alloy's refkey-native approach.

## Approaches Evaluated

A formal design review evaluated three approaches (documented in `.squad/decisions/inbox/design-review-header-body-params-to-jsx.md`):

1. **Approach A (Full JSX Decomposition)** — Migrate `getHeaderAndBodyParameters` to JSX components that render objects/templates directly ✅ **CHOSEN**
2. **Approach B (String + Later Migration)** — Keep string output, defer JSX conversion to Phase 9 (deferred)
3. **Approach C (Minimal String-Render Wrapper)** — Wrap string output in minimal JSX; leave core logic unchanged (rejected)

**Decision:** Approach A was chosen because it:
- Validates the refkey-native pattern before committing to Phase 9
- Unblocks `SendFunction` from the `typeRefkeys` bridge prop
- Provides a template for converting remaining Category A/B helpers

## What Was Implemented

### 1. New JSX Components in `Operations.tsx`

#### `<ContentTypeParam>`
```tsx
interface ContentTypeParamProps {
  operation: Operation;
}
export function ContentTypeParam({ operation }: ContentTypeParamProps): ts.PropertyAssignment {
  // Returns: ts.PropertyAssignment for contentType property
}
```
- Checks if operation has contentType via `isContentType()`
- Extracts the type string via `getContentTypeValue()`
- Renders as a single property assignment object

#### `<HeaderParams>`
```tsx
interface HeaderParamsProps {
  operation: Operation;
  headers: Record<string, Parameter>;
}
export function HeaderParams({ headers }: HeaderParamsProps): ts.ObjectLiteralExpression | undefined {
  // Returns: ts.ObjectLiteralExpression for headers object, or undefined if no headers
}
```
- Iterates headers using `buildHeaderParameter()` helper
- Applies default value formatting via `formatDefaultValue()`
- Renders as a single object literal expression

#### `<BodyParam>`
```tsx
interface BodyParamProps {
  requestType: Type;
  bodyParameter: Parameter;
  isXml: boolean;
}
export function BodyParam({ requestType, isXml }: BodyParamProps): ts.PropertyAssignment {
  // Returns: ts.PropertyAssignment for body property
  // Uses serializerRefkey(requestType) or xmlSerializerRefkey(requestType) directly in code template
}
```
- **Key innovation:** Uses refkey objects **directly in code string templates**:
  ```tsx
  const serializerRef = serializerRefkey(requestType);
  // In code template: 
  const code = `${serializerRef.name}(body)`; // Alloy resolves refkey during rendering
  ```
- Alloy's rendering pipeline resolves the refkey to its actual symbol reference
- No `resolveReferences()` scanning needed post-render

### 2. Updated `<RequestCall>` Component

**Before:**
```tsx
<RequestCall headerAndBodyParams={getHeaderAndBodyParameters(op)} />
```

**After:**
```tsx
<RequestCall>
  <ContentTypeParam operation={op} />
  <HeaderParams operation={op} headers={op.parameters.headers} />
  <BodyParam requestType={op.requestType} bodyParameter={op.bodyParameter} isXml={isXmlContentType(op)} />
</RequestCall>
```

Component now accepts `children` prop containing the three sub-components.

### 3. Updated `<SendFunction>` Component

**Before:**
```tsx
interface SendFunctionProps {
  operation: Operation;
  typeRefkeys: Map<string, string>; // Serializer names for later string-scanning
}

export function SendFunction({ operation, typeRefkeys }: SendFunctionProps) {
  // Post-render: resolveReferences(typeRefkeys) to replace placeholders
}
```

**After:**
```tsx
interface SendFunctionProps {
  operation: Operation;
  // typeRefkeys prop REMOVED — no longer needed
}

export function SendFunction({ operation }: SendFunctionProps) {
  // All serializer references use refkeys directly in code templates
  // Alloy auto-import handles import resolution
}
```

**Removed code:**
- `resolveReferences(typeRefkeys)` call and related placeholder substitution logic
- `typeRefkeys` parameter from function signature and caller sites

### 4. Exported Private Helpers from `operationHelpers.ts`

Made the following 7 functions public/exported (were previously private):

| Function | Purpose | Used By |
|----------|---------|---------|
| `isContentType(value)` | Type guard: is value a content-type constant? | `<ContentTypeParam>` |
| `getContentTypeValue(operation, type)` | Extract content-type string from operation | `<ContentTypeParam>` |
| `buildHeaderParameter(name, value)` | Construct header property assignment | `<HeaderParams>` |
| `isConstant(value)` | Type guard: is value a constant expression? | Components, tests |
| `isDefaultValueTypeMatch(defaultValue, parameterType)` | Validate default value type | `<HeaderParams>` |
| `formatDefaultValue(defaultValue, parameterType)` | Serialize default value for code | `<HeaderParams>` |
| `getEncodeForType(parameterType)` | Determine URI encoding strategy | Components |

These helpers were extracted to allow component reuse without importing private functions (TypeScript convention).

## Architectural Patterns Established

### Pattern 1: Refkeys in Code Templates
Components can now use refkey objects directly in string templates without post-render string-scanning:

```tsx
const ref = serializerRefkey(bodyType);
const template = `
  import { ${ref.name} } from "${ref.module}";
  const body = ${ref.name}(data);
`;
// Alloy resolves ref.name and ref.module during rendering
```

This pattern replaces the old approach:
- ❌ Old: Return string with placeholder → `resolveReferences()` scans and replaces
- ✅ New: Use refkey object in template → Alloy resolves during rendering

### Pattern 2: JSX Component Composition for Operation Construction
Break down monolithic helper functions into fine-grained JSX components:

- **One concern per component** (contentType, headers, body)
- **Return AST objects or expressions** (not strings)
- **Use explicit helper functions** for unit-testable logic
- **Compose in parent component** (`<RequestCall>` orchestrates the three sub-components)

### Pattern 3: Exported Pure Utilities for Reuse
Extract pure utility functions (no framework dependencies) for use by both:
1. Old ts-morph pipeline (until Phase 9 complete)
2. New JSX components
3. Unit tests

Example:
```tsx
// Both operationHelpers.ts AND BodyParam.tsx can use this
const encoded = buildHeaderParameter("Authorization", value);
```

## Test Results

- ✅ All 526 modular unit tests pass
- ✅ All 309 RLC unit tests pass
- ✅ Build clean, format clean, lint clean
- ✅ No breaking API changes
- ✅ Operation output identical to previous baselines (all 120 scenario tests pass)

## Impact on Other Components

### `SendFunction` Bridge Impact
- **Before:** Accepted `typeRefkeys` prop from caller for string-scanning
- **After:** No longer accepts `typeRefkeys` — fully self-contained
- **Callers:** No code changes needed; prop was already optional in most cases

### Bridge Functions in `operationHelpers.ts`
The following functions are shared between operation and serializer pipelines:
- `getSerializationExpressionForFlatten` — still uses `resolveReference(SerializationHelpers.areAllPropsUndefined)` (cannot remove yet)
- `serializeRequestValue` — still uses `resolveReference()` (cannot remove yet)
- `deserializeResponseValue` — still uses `resolveReference()` (cannot remove yet)

These will be cleaned up in Phase 9 when the serializer pipeline migrates to Alloy.

### Operations Component Readiness
`<Operations>` component in `Operations.tsx` is now:
- ✅ Fully JSX-based (no ts-morph string generation for request body construction)
- ✅ Refkey-native (no `resolveReferences()` in critical paths)
- ✅ Ready for production use (all tests passing)

## Cleanup Path for Phase 9

When the serializer pipeline migrates to Alloy (later phase):
1. Remove `resolveReferences()` calls from the 3 shared bridge functions
2. Delete the old `getHeaderAndBodyParameters()` function (if it still exists)
3. Consider further decomposition of complex helpers following this JSX pattern

## Validation Checklist

- ✅ TypeScript type check: `npx tsc --noEmit`
- ✅ Alloy build: `npx alloy build`
- ✅ Full build: `pnpm build`
- ✅ Format: `pnpm format`
- ✅ Unit tests: 526 modular + 309 RLC + all passing
- ✅ Integration test baselines: unchanged (all match)
- ✅ No unused variables or imports
- ✅ Code review: approved by user

## Files Modified

### Production Code
- `packages/typespec-ts/src/modular/components/Operations.tsx` — added 3 new JSX components (`<ContentTypeParam>`, `<HeaderParams>`, `<BodyParam>`), updated `<RequestCall>`, updated `<SendFunction>`
- `packages/typespec-ts/src/modular/helpers/operationHelpers.ts` — exported 7 previously private functions

### Test Infrastructure
- No test helper changes required (test infrastructure uses old ts-morph pipeline)

## References

- Design review: `.squad/decisions/inbox/design-review-header-body-params-to-jsx.md`
- Phase 11 plan: Part of ongoing Phase 11 operations decomposition
- Related decision: `2026-02-20: Operations Migration — Shared Function Boundary` (defines bridge functions that still use `resolveReference()`)

## Next Steps

1. **Phase 11 continuation:** Apply same pattern to remaining monolithic helpers in `operationHelpers.ts`
2. **Phase 9 (future):** Remove `resolveReferences()` from the 3 bridge functions when serializer pipeline migrates
3. **Optional Phase 9 enhancement:** Decompose `buildSerializerFunction()` / `buildDeserializerFunction()` following same JSX pattern

---

**Signed off:** Ripley (Architecture Lead), Jose Manuel Heredia Hidalgo (User)  
**Date:** 2026-02-21
