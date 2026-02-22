# Design Review: Converting operationHelpers to JSX Components

**Facilitator:** 🏗️ Ripley (Lead)  
**Reviewer:** 🔬 Ash (Alloy Architect)  
**Implementer:** ⚛️ Lambert (Operations Dev)  
**Date:** 2026-02-22

---

## 1. Problem Statement

`operationHelpers.ts` (2,669 lines) contains 8 "builder" functions that return `GeneratedFunction` data objects — plain JS objects with `{ name, parameters, returnType, statements: string[] }`. The current bridge in `Operations.tsx` decomposes these objects into `<OperationFunction>` + `<FunctionBody>` components, which regex-scan the `statements` strings for symbol names and replace them with Alloy refkeys.

**This bridge pattern has fundamental problems:**
1. **String scanning is fragile** — regex `\b(symbolName)\b` can miss names in edge cases or false-match substrings
2. **No native auto-imports** — imports only work if the regex finds and replaces every reference; any miss = broken code
3. **`buildTypeRefkeys()` walks types eagerly** — needs to predict every symbol name that might appear in the body text, which scales poorly and caused OOM at ~130 scenarios
4. **Anti-Alloy** — Alloy's entire value proposition is declarative JSX with automatic import resolution; string-scanning subverts it

## 2. Target Architecture (from http-client-js reference)

The reference implementation in `submodules/typespec/packages/http-client-js/` shows the idiomatic pattern:

```tsx
// client-operation.tsx — Each operation is a pure JSX component
export function ClientOperation(props: ClientOperationProps) {
  return (
    <FunctionDeclaration export async
      returnType={<TypeExpression type={returnType} />}
      parameters={signatureParams}
      refkey={props.refkey}
    >
      <HttpRequest httpOperation={props.httpOperation} responseRefkey={responseRefkey} />
      <HttpResponse httpOperation={props.httpOperation} responseRefkey={responseRefkey} />
    </FunctionDeclaration>
  );
}

// http-response.tsx — Error handling uses refkeys, not strings
export function HttpResponse(props) {
  return (
    <List hardline>
      <HttpResponses httpOperation={props.httpOperation} />
      {code`throw ${getCreateRestErrorRefkey()}(response);`}
    </List>
  );
}
```

**Key patterns:**
- **`code` tagged templates** for body with embedded refkeys: `` code`throw ${createRestErrorRefkey}(response);` ``
- **Nested child components** for logical sections: `<HttpRequest>`, `<HttpResponse>`, `<HttpRequestOptions>`
- **`<TypeExpression>`** for parameter types instead of string type names
- **Refkeys as first-class values** — no string→refkey translation layer
- **No `GeneratedFunction` intermediary** — components render directly to `<ts.FunctionDeclaration>`

## 3. Current State vs Target

| Aspect | Current (bridge) | Target (idiomatic) |
|--------|-----------------|-------------------|
| Function definition | `getDeserializePrivateFunction()` → `GeneratedFunction` object | `<DeserializeFunction>` JSX component |
| Function body | `statements: string[]` with hardcoded symbol names | `code` tagged templates with embedded refkeys |
| Type references | `"PathUncheckedResponse"` string → regex → refkey | `httpRuntimeLib.PathUncheckedResponse` refkey directly |
| Import resolution | `buildTypeRefkeys()` + `resolveReferences()` regex | Alloy auto-import (zero bridge code) |
| Parameter types | `{ type: "StreamableMethod" }` string | `{ type: httpRuntimeLib.StreamableMethod }` refkey |
| Composability | Monolithic function returning data bag | Nested child components (`<StatusCheck>`, `<ResponseBody>`) |

## 4. Conversion Plan — Functions by Complexity

### Tier 1: Simple (good starting point for pattern)

| Function | Lines | Description |
|----------|-------|-------------|
| `getDeserializeHeadersPrivateFunction` | ~42 | Maps response headers to object properties |
| `getDeserializeExceptionHeadersPrivateFunction` | ~47 | Same but for exception headers |

These are ideal first conversions — small, self-contained, no branching logic.

### Tier 2: Medium

| Function | Lines | Description |
|----------|-------|-------------|
| `getSendPrivateFunction` | ~63 | Builds URL, sets headers/body, sends request |
| `getPagingOnlyOperationFunction` | ~83 | Wraps deserializer in paging iterator |
| `getLroOnlyOperationFunction` | ~74 | Wraps deserializer in LRO poller |
| `getLroAndPagingOperationFunction` | ~91 | Combined LRO + paging |

### Tier 3: Complex

| Function | Lines | Description |
|----------|-------|-------------|
| `getOperationFunction` | ~141 | Public function that dispatches to paging/lro/standard |
| `getDeserializePrivateFunction` | ~222 | Response deserialization with XML/JSON/dual-format branching |

### Helper functions to keep (Category B/C — not builders)

These produce string fragments used inside function bodies. They stay as-is but their callers change:

- `getOperationSignatureParameters()` — returns parameter descriptors (keep, but types become refkeys)
- `getExpectedStatuses()` — returns `["200", "201"]` literal
- `getHeaderAndBodyParameters()` — returns request option string
- `getPathParameters()` / `getQueryParameters()` — returns URL template params
- `getExceptionThrowStatement()` — returns throw statement (absorb into `<ErrorHandling>` component)
- `deserializeResponseValue()` — returns expression string (absorb into `<ResponseDeserializer>`)
- `getResponseHeaders()` — returns header mapping

## 5. Proposed Component Structure

```
Operations.tsx
├── <Operations>                    (root — source files per group)
│   └── <OperationGroup>            (all functions for one operation)
│       ├── <SendFunction>          (replaces getSendPrivateFunction)
│       │   ├── <UrlExpansion>      (URL template + params)
│       │   └── <RequestCall>       (context.path(...).verb({...}))
│       ├── <DeserializeFunction>   (replaces getDeserializePrivateFunction)
│       │   ├── <StatusCheck>       (expected status validation)
│       │   ├── <ErrorHandling>     (createRestError throw)
│       │   └── <ResponseBody>     (JSON/XML/dual-format deserialization)
│       ├── <DeserializeHeaders>    (replaces getDeserializeHeadersPrivateFunction)
│       ├── <DeserializeExHeaders>  (replaces getDeserializeExceptionHeadersPrivateFunction)
│       └── <PublicOperation>       (replaces getOperationFunction)
│           ├── <StandardOperation> (direct send+deserialize call)
│           ├── <PagingOperation>   (buildPagedAsyncIterator wrapper)
│           ├── <LroOperation>      (getLongRunningPoller wrapper)
│           └── <LroPagingOperation>(combined)
```

## 6. Migration Strategy

**Principle: Convert one function at a time, keep both paths working.**

Each conversion follows this pattern:
1. Create new `<XxxFunction>` component alongside the old `getXxxFunction`
2. Use `code` tagged templates with refkeys in the body
3. Replace the `<OperationFunction>/<FunctionBody>` usage in `OperationGroup` with the new component
4. Validate with unit tests
5. Remove old helper function once all consumers are migrated

**The bridge infrastructure (`buildTypeRefkeys`, `resolveReferences`, `resolveType`, `OperationFunction`, `FunctionBody`) stays until ALL functions are converted, then gets deleted in a final cleanup.**

## 7. Example: `getDeserializeHeadersPrivateFunction` → `<DeserializeHeaders>`

### Before (current):
```typescript
// operationHelpers.ts
export function getDeserializeHeadersPrivateFunction(context, operation): GeneratedFunction | undefined {
  const headers = getResponseHeaders(operation);
  if (!headers.length) return undefined;
  return {
    name: `_${name}DeserializeHeaders`,
    parameters: [{ name: "result", type: "PathUncheckedResponse" }],
    returnType: "Record<string, string>",
    statements: [
      `return {`,
      ...headers.map(h => `  "${h.name}": result.headers["${h.wireValue}"],`),
      `};`
    ]
  };
}

// Operations.tsx (bridge)
<OperationFunction name={fn.name} parameters={fn.parameters} typeRefkeys={typeRefkeys}>
  <FunctionBody typeRefkeys={typeRefkeys}>{fn.statements}</FunctionBody>
</OperationFunction>
```

### After (target):
```tsx
// Operations.tsx (direct)
function DeserializeHeaders(props: { context: SdkContext; operation: ServiceOperation }) {
  const headers = getResponseHeaders(props.operation);
  if (!headers.length) return null;
  const { name } = getOperationName(props.operation);
  const runtimeLib = getRuntimeLib(props.context);

  return (
    <ts.FunctionDeclaration
      export
      name={`_${name}DeserializeHeaders`}
      parameters={[{ name: "result", type: runtimeLib.PathUncheckedResponse }]}
      returnType="Record<string, string>"
    >
      {code`return {
        ${headers.map(h => `"${h.name}": result.headers["${h.wireValue}"]`).join(",\n")}
      };`}
    </ts.FunctionDeclaration>
  );
}
```

**What disappears:** `GeneratedFunction` object, `OperationFunction` wrapper, `FunctionBody` bridge, `resolveReferences` regex, `buildTypeRefkeys` entry for `PathUncheckedResponse`.

## 8. Risks and Mitigations

| Risk | Mitigation |
|------|-----------|
| 2,669 lines is a lot to convert at once | Convert one function at a time; both paths coexist |
| `code` template behavior differences from string concatenation | Unit test each component against expected output |
| Whitespace/formatting differences in generated code | Use `pnpm format` and baseline comparison |
| Helper functions deeply entangled | Keep Category B/C helpers, only convert Category A builders |
| OOM from too many reactive components | Profile after first 2 conversions; `code` templates are lighter than `<ts.Reference>` |

## 9. Review Checklist (for Ash 🔬)

Every converted component MUST:
- [ ] Use `code` tagged templates (not string concatenation) for function bodies
- [ ] Use external package refkeys (`httpRuntimeLib.X`) for runtime symbols
- [ ] Use `refkey(type, "serializer")` for internal declarations
- [ ] Use `<TypeExpression>` or refkeys for parameter types — no string type names
- [ ] Accept explicit props — no `fn: GeneratedFunction` data bags
- [ ] Use children for body content — nested child components for logical sections
- [ ] Have a unit test validating the generated output
- [ ] Not increase memory usage (profile if >3 components added)

## 10. Action Items

| # | Owner | Action |
|---|-------|--------|
| 1 | ⚛️ Lambert | Convert `getDeserializeHeadersPrivateFunction` → `<DeserializeHeaders>` |
| 2 | ⚛️ Lambert | Convert `getDeserializeExceptionHeadersPrivateFunction` → `<DeserializeExceptionHeaders>` |
| 3 | 🔬 Ash | Review first 2 conversions for Alloy idiom compliance |
| 4 | ⚛️ Lambert | Convert `getSendPrivateFunction` → `<SendFunction>` |
| 5 | ⚛️ Lambert | Convert `getDeserializePrivateFunction` → `<DeserializeFunction>` |
| 6 | ⚛️ Lambert | Convert `getOperationFunction` → `<PublicOperation>` |
| 7 | 🧪 Parker | Validate all unit tests pass after each conversion |
| 8 | 🏗️ Ripley | Final cleanup: delete bridge infrastructure |

---

**Decision:** Proceed with Tier 1 conversions first to establish the pattern, then Tier 2/3.
