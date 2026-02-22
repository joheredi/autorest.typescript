# Decision: DeserializeFunction JSX Decomposition Pattern

**Date:** 2026-02-21
**By:** Lambert (Operations Dev)
**Status:** Implemented

## Context

The `getDeserializePrivateFunction` in `operationHelpers.ts` returned a `GeneratedFunction` data object with `statements: string[]` containing hardcoded symbol names. This required the bridge infrastructure (`FunctionBody` + `resolveReferences`) to scan strings with regex and replace symbol names with Alloy refkeys — an anti-pattern that blocks full Alloy migration.

## Decision

Converted `getDeserializePrivateFunction` to a `<DeserializeFunction>` JSX component with child components for each logical concern:

1. **`<DeserializeFunction>`** — Main component wrapping `<ts.FunctionDeclaration>`
   - Parameters: `{ context, operation }`
   - Return type: Uses `getTypeExpression()` for string-based return type (not refkeys)
   - Refkey: `deserializeFunctionRefkey(operation)` for cross-component references

2. **`<StatusCheck>`** — Renders status code validation
   - Uses `getExpectedStatuses(operation)` for expected status array
   - Children: `<ExceptionHandling>` wrapper

3. **`<ExceptionHandling>` + `<CustomizedExceptions>` + `<DefaultException>`** — Exception handling hierarchy
   - Uses `deserializerRefkey(type)` and `xmlDeserializerRefkey(type)` directly in `code` templates
   - Handles per-status-code exceptions with runtime content-type detection for dual-format responses
   - Finds exception response objects to extract types for refkey generation

4. **`<LroSubPathCheck>`** — LRO sub-path validation (conditional rendering)

5. **`<ResponseBody>`** — Return statement with deserializer refkeys
   - Handles JSON/XML/dual-format/binary/void cases
   - Uses refkeys for named deserializers, falls back to inline deserialization for basic types

## Key Architectural Patterns

### Return Type Handling
**Pattern:** Use `getTypeExpression(context, type)` for function return types, not refkeys.
**Why:** `<ts.FunctionDeclaration>`'s `returnType` prop expects a string. Refkeys are for symbol references within function bodies, not type annotations.

### Exception Handling with Refkeys
**Pattern:** Find the original exception response object to get the type, then use `deserializerRefkey(type)` in `code` templates.
**Why:** Can't generate refkeys from just deserializer name strings. Need the actual type object for refkey creation.

### Dual-Format Response Handling
**Pattern:** Separate components for XML-only, JSON-only, and dual-format cases. Runtime content-type check (`isXmlContentType()`) for dual-format.
**Why:** Keeps control flow explicit in JSX. Dual-format requires runtime detection since content-type varies per request.

### Static Helpers Remain as Strings
**Pattern:** Static helper functions like `isXmlContentType`, `getBinaryResponse` are rendered as literal strings in `code` templates.
**Why:** These don't have refkeys yet (they're static helpers, not serializer functions). Will be addressed when static helper refkeys are added.

## Impact on Future Work

### For Other Agents
- **Dallas/Kane (Serializers):** The pattern of using `deserializerRefkey(type)` and `xmlDeserializerRefkey(type)` in `code` templates is now established. Can be reused for other serialization contexts.
- **Ripley (Lead):** This completes the "refkey-native" pattern proof-of-concept. All operation function rendering now uses refkeys without post-render string scanning.

### For operationHelpers.ts Cleanup
- `getDeserializePrivateFunction` is now unused but kept for safety
- Can be deleted once all integration tests pass and no rollback is needed
- Other helper functions (`getExceptionDetails`, `buildLroReturnType`) are now exported and shared between JSX components and legacy code

## Validation

- ✅ Type check clean (`npx tsc --noEmit`)
- ✅ 526 modular unit tests passing (with baselines updated)
- ✅ Build + format clean
- ✅ No breaking API surface changes (only formatting/ordering diffs in generated code)

## Lessons Learned

1. **`<For>` component needs explicit type casting:** TypeScript doesn't automatically infer array element types when iterating with `<For>`. Need `as { ... }` cast inside the iterator function.

2. **Exception response lookup is verbose but necessary:** Can't generate refkeys without the original type object. Must search through `operation.operation.exceptions` to match status codes.

3. **Control flow in JSX is more readable than helper functions:** The nested component hierarchy makes branching logic (LRO check, dual-format check, exception handling) more explicit than computing everything upfront in a 200-line helper function.

4. **String interpolation in `code` templates works well:** Can mix refkeys and literal strings naturally. Alloy resolves refkeys during rendering while preserving string literals.
