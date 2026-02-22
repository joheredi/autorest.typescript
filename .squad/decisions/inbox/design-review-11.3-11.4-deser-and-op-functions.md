# Design Review: Convert `getDeserializePrivateFunction` & `getOperationFunction` to JSX

**Date:** 2026-02-22
**Author:** Ripley (Squad Lead)
**Status:** Pending Approval
**Scope:** Phase 11.3 (`getDeserializePrivateFunction`) and Phase 11.4 (`getOperationFunction`)

## Problem Statement

Two functions in `operationHelpers.ts` still return `GeneratedFunction` data objects (with `statements: string[]`) that are rendered through the **bridge infrastructure**:

1. **`getDeserializePrivateFunction`** (~222 lines) — Builds the `_${name}Deserialize` function body
2. **`getOperationFunction`** (~137 lines) + 3 sub-functions (~248 lines total) — Builds the public operation function body (standard/paging/LRO/LRO+paging)

The bridge infrastructure (`OperationFunction`, `FunctionBody`, `resolveReferences`, `resolveType`, `childrenToText`, `buildTypeRefkeys`) processes these by:
1. Converting JSX children to plain text (`childrenToText`)
2. Regex-scanning for known symbol names (`resolveReferences`)
3. Replacing matches with Alloy refkeys

**Why this is a problem:**
- `childrenToText` discards all Alloy structural information
- `resolveReferences` is brittle regex string matching — can miss symbols or match wrong substrings
- `buildTypeRefkeys` must pre-compute every possible symbol name across all operations (164 lines of visitor code)
- Defeats Alloy's auto-import system — refkeys should be used at the point of reference, not retrofitted via scanning

## Consumers

| Consumer | Uses `statements`? | Uses metadata only? |
|----------|-------------------|---------------------|
| `OperationGroup` (Operations.tsx) | ✅ Both functions | — |
| `ClassicalClient.tsx` | ❌ | ✅ `getOperationFunction` metadata (name, params, returnType, isLro, propertyName) |
| `ClassicalOperationGroups.tsx` | ❌ | ✅ Same metadata |
| `Samples.tsx` | ❌ | ✅ Same metadata |

**Key insight:** Only `OperationGroup` renders the function bodies. The other 3 consumers only need the operation metadata (function name, parameters, return type, isLro flag). This means we can split `getOperationFunction` into metadata extraction + rendering.

## Symbols Requiring Refkeys

### In `getDeserializePrivateFunction`:
- `PathUncheckedResponse` — parameter type (already available via `runtimeLib`)
- `createRestError` — error creation (available via `runtimeLib`)
- `isXmlContentType` — XML content type check (static helper — currently string import)
- `uint8ArrayToString` — binary deserialization (available via `utilLib`)
- Deserializer function names (e.g., `fooDeserializer`) — available via `deserializerRefkey(type)` / `xmlDeserializerRefkey(type)`
- Return type (model names) — available via `modelTypeRefkey(type)`

### In `getOperationFunction` (and sub-functions):
- `_${name}Send` — available via `sendFunctionRefkey(operation)`
- `_${name}Deserialize` — available via `deserializeFunctionRefkey(operation)`
- `_${name}DeserializeHeaders` — available via `deserializeHeadersRefkey(operation)`
- `_${name}DeserializeExceptionHeaders` — available via `deserializeExceptionHeadersRefkey(operation)`
- `getBinaryResponse` — static helper (currently string import)
- `getLongRunningPoller` — static helper (currently string import)
- `buildPagedAsyncIterator` / `PagedAsyncIterableIterator` — static helpers (currently string import)
- `PollerLike` / `OperationState` — available via `azureCoreLroLib`
- Operation options type — available via `operationOptionsRefkey(operation)`
- Return types — available via `modelTypeRefkey(type)`

**Note on static helpers:** `expandUrlTemplate`, `getLongRunningPoller`, `buildPagedAsyncIterator`, `isXmlContentType`, `getBinaryResponse` are currently imported as raw strings. They don't have Alloy refkeys yet (that's Phase 10.5). For now, we'll continue using string imports for these.

---

## Approach A: Full JSX Decomposition (Recommended)

### Strategy
Convert each `getXxxFunction` into a JSX component with child components for logical sections. Use `code` tagged templates with refkeys for all referenceable symbols. Keep the pure utility functions as-is.

### `getDeserializePrivateFunction` → `<DeserializeFunction>`

```tsx
function DeserializeFunction({ context, operation }: DeserializeFunctionProps): Children {
  const { name } = getOperationName(operation);
  const runtimeLib = getRuntimeLib(context);
  const returnType = computeDeserializeReturnType(context, operation);

  return (
    <ts.FunctionDeclaration
      export async
      name={`_${name}Deserialize`}
      parameters={[{ name: "result", type: runtimeLib.PathUncheckedResponse }]}
      returnType={returnType}   // ← resolved via refkey, not string
      refkey={deserializeFunctionRefkey(operation)}
    >
      <StatusCheck operation={operation} runtimeLib={runtimeLib} />
      <ErrorHandling context={context} operation={operation} runtimeLib={runtimeLib} />
      <LroSubPathCheck context={context} operation={operation} runtimeLib={runtimeLib} />
      <ResponseBody context={context} operation={operation} />
    </ts.FunctionDeclaration>
  );
}
```

Child components:
- **`<StatusCheck>`** — Renders `const expectedStatuses = [...]; if (!expectedStatuses.includes(result.status)) { ... }`
- **`<ErrorHandling>`** — Renders the `getExceptionThrowStatement` logic with refkeys for `createRestError` and deserializers
- **`<LroSubPathCheck>`** — Renders the LRO sub-path validation (only for LRO operations)
- **`<ResponseBody>`** — Renders the return statement with deserializer refkeys for JSON/XML/dual-format/binary cases

### `getOperationFunction` → `<PublicOperation>` dispatch + specialized components

```tsx
function PublicOperation({ context, operation, prefixes, clientType }: PublicOperationProps): Children {
  if (isPagingOnlyOperation(operation)) {
    return <PagingOperation context={context} operation={operation} prefixes={prefixes} clientType={clientType} />;
  }
  if (isLroOnlyOperation(operation)) {
    return <LroOperation context={context} operation={operation} prefixes={prefixes} clientType={clientType} />;
  }
  if (isLroAndPagingOperation(operation)) {
    return <LroPagingOperation context={context} operation={operation} prefixes={prefixes} clientType={clientType} />;
  }
  return <StandardOperation context={context} operation={operation} prefixes={prefixes} clientType={clientType} />;
}
```

Each specialized component renders its `<ts.FunctionDeclaration>` with `code` templates using refkeys.

### Metadata extraction
For `ClassicalClient`, `ClassicalOperationGroups`, and `Samples` — create a new pure function `getOperationMetadata()` that returns only the metadata these consumers need:

```ts
interface OperationMetadata {
  name: string;
  propertyName: string;
  parameters: GeneratedFunction["parameters"];
  returnType: string;
  isLro?: boolean;
  lroFinalReturnType?: string;
  docs?: string[];
}

export function getOperationMetadata(
  context: SdkContext,
  method: [string[], ServiceOperation],
  clientType: string
): OperationMetadata { ... }
```

### Pros
- **Fully idiomatic Alloy** — refkeys at point of reference, auto-import for all npm symbols
- **Declarative composition** — each section is a readable component
- **Eliminates bridge entirely** — `OperationFunction`, `FunctionBody`, `resolveReferences`, `resolveType`, `childrenToText`, `buildTypeRefkeys` can all be deleted
- **Cleaner separation** — metadata (what) vs rendering (how) are separate concerns
- **Testable** — each component can be unit tested independently

### Cons
- **Largest change** — ~600 lines of new JSX code, ~400 lines of deleted bridge code
- **Exception handling complexity** — `getExceptionThrowStatement` has 6+ code paths with nested if/else for XML/JSON/dual-format customized exceptions. Converting to JSX requires careful decomposition.
- **Static helper imports still string-based** — `getLongRunningPoller`, `buildPagedAsyncIterator`, etc. don't have refkeys yet (Phase 10.5). We'll use raw strings for these temporarily.

### Risk Mitigation
- Convert `getDeserializePrivateFunction` first (more complex, more symbols to resolve)
- Run `SCENARIOS_UPDATE=true npm run unit-test:modular` after each component
- Validate no breaking API surface changes via baseline diffs
- Keep old functions temporarily until all tests pass

---

## Approach B: Hybrid — JSX for declarations, keep string helpers for bodies

### Strategy
Convert only the `<ts.FunctionDeclaration>` wrapper to JSX (for proper parameter and return type refkeys), but keep the function body content as strings from existing helpers. Use `resolveReferences` only for the body text, not for parameter/return types.

```tsx
function DeserializeFunction({ context, operation, typeRefkeys }: Props): Children {
  const deserFn = getDeserializePrivateFunction(context, operation);
  const runtimeLib = getRuntimeLib(context);

  // Resolve parameters with refkeys (no scanning needed — exact match)
  const params = deserFn.parameters.map(p => ({
    name: p.name,
    type: p.type === "PathUncheckedResponse" ? runtimeLib.PathUncheckedResponse : p.type
  }));

  // Resolve return type with refkeys
  let rt = deserFn.returnType;
  if (deserFn.isAsync && rt?.startsWith("Promise<") && rt.endsWith(">")) {
    rt = rt.slice("Promise<".length, -1);
  }

  return (
    <ts.FunctionDeclaration
      export async
      name={deserFn.name}
      parameters={params}
      returnType={resolveType(rt, typeRefkeys)}
      refkey={deserializeFunctionRefkey(operation)}
    >
      <FunctionBody typeRefkeys={typeRefkeys}>
        {deserFn.statements}
      </FunctionBody>
    </ts.FunctionDeclaration>
  );
}
```

### Pros
- **Minimal change** — reuses existing `getDeserializePrivateFunction` and `getOperationFunction` as-is
- **Incremental improvement** — parameter and return types use refkeys, reducing but not eliminating `resolveReferences`
- **Low risk** — no logic changes, just re-wrapping the output

### Cons
- **Still uses `resolveReferences`** — body text is still scanned with regex, which is the core anti-pattern
- **Still uses `childrenToText`** — still discards Alloy structural info
- **Still requires `buildTypeRefkeys`** — 164 lines of visitor code still needed
- **Doesn't enable component testing** — body generation is still opaque strings
- **Doesn't separate metadata from rendering** — 3 consumers still get `GeneratedFunction` with `statements`
- **Incremental debt** — we'd need to re-do this work later for full Alloy conversion

### Risk: Very Low
This approach preserves all existing behavior with minimal change.

---

## Approach C: Data-driven JSX — Extract structured data, render in components

### Strategy
Refactor the `getXxxFunction` helpers to return structured data objects instead of `statements: string[]`. Then create JSX components that consume these data objects and render with `code` templates + refkeys.

```ts
interface DeserializeFunctionData {
  expectedStatuses: string;
  exceptionDetails: ExceptionDetails;
  deserializedType?: SdkType;
  deserializePrefix: string;
  lroSubPath?: string;
  isXml: boolean;
  isDualFormat: boolean;
  contentTypes: string[];
}

function extractDeserializeData(context: SdkContext, operation: ServiceOperation): DeserializeFunctionData { ... }
```

```tsx
function DeserializeFunction({ context, operation }: Props): Children {
  const data = extractDeserializeData(context, operation);
  // ... render using data + refkeys
}
```

### Pros
- **Clean separation** — data extraction is testable as pure functions
- **Structured data** — no string parsing or regex scanning needed
- **Enables refkeys** — components render refkeys directly from data

### Cons
- **Medium-high effort** — need to design new data interfaces, refactor extractors, build renderers
- **Two layers of abstraction** — data extraction + JSX rendering adds complexity
- **Exception handling still complex** — `ExceptionDetails` struct mirrors the branching logic, just in data form
- **Partially redundant with Approach A** — if we're building JSX components anyway, the data extraction layer adds an intermediary that may not be needed. The JSX components can compute what they need directly from `SdkContext` + `ServiceOperation`.

---

## Recommendation: Approach A (Full JSX Decomposition)

**Rationale:**
1. **Aligns with team directive** — user has explicitly stated preference for declarative Alloy patterns with nested child components
2. **Eliminates the entire bridge** — `buildTypeRefkeys` (164 lines), `resolveReferences` (41 lines), `resolveType` (8 lines), `FunctionBody` (3 lines), `childrenToText` (6 lines), `OperationFunction` (30 lines) = ~252 lines deleted
3. **Consistent with prior work** — `SendFunction`, `DeserializeHeaders`, `DeserializeExceptionHeaders`, `ContentTypeParam`, `HeaderParams`, `BodyParam` all follow this pattern already
4. **Enables Phase 11.5** — bridge deletion becomes possible immediately after 11.3 + 11.4

**Conversion order:**
1. **Phase 11.3** — `getDeserializePrivateFunction` → `<DeserializeFunction>` with children
   - Most symbols to resolve (deserializers, error handling, XML/JSON branching)
   - Establishes pattern for exception handling decomposition
2. **Phase 11.4** — `getOperationFunction` → `<PublicOperation>` + 4 specialized components
   - Also: extract `getOperationMetadata()` for ClassicalClient/Samples consumers
   - References `_${name}Send` / `_${name}Deserialize` via refkeys from Phase 11.3

**Static helper symbols** (`getLongRunningPoller`, `buildPagedAsyncIterator`, `isXmlContentType`, `getBinaryResponse`, `expandUrlTemplate`):
- These don't have Alloy refkeys yet — Phase 10.5 will add them
- For now, they remain as string references in `code` templates (e.g., `` code`getLongRunningPoller(...)` ``)
- This is acceptable because they're internal relative imports, not cross-module npm symbols

## Resolved Questions

1. ✅ **Decompose into `<CustomizedExceptions>` and `<DefaultException>`** — separate components for each exception path.
2. ✅ **Branching logic moves into JSX** — no helper function wrapper; the JSX components own the control flow.
3. ✅ **Return refkeys directly** — `getOperationMetadata()` returns refkeys, callers import refkey functions.

**Status: APPROVED — Approach A with resolved questions. Proceeding to implementation.**
