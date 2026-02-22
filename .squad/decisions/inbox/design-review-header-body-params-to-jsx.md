# Design Review: Refactor `getHeaderAndBodyParameters` to JSX Components

## Problem Statement

`SendFunction` currently calls `getHeaderAndBodyParameters()` which returns a **flat string** containing content type, headers, and body properties. This string contains serializer function names (e.g., `barSerializer(body)`) as raw text. To make Alloy aware of these symbols, we run `resolveReferences()` to scan the string and replace known names with refkeys.

This `resolveReferences` pattern defeats the purpose of Alloy — symbols should be referenced via refkeys from the start, not post-hoc scanned from strings.

**Goal:** Replace `getHeaderAndBodyParameters` with JSX components so `SendFunction` no longer calls `resolveReferences`.

---

## Current Data Flow

```
getHeaderAndBodyParameters(context, operation, optionalParamName)
  ├── isContentType(param)        → find content type param
  ├── getContentTypeValue(param)  → "contentType: ..."           (string, no serializer names)
  ├── getParameterMap(param)      → '"header-name": expression'  (string, rarely has serializer names)
  ├── buildHeaderParameter(...)   → conditional spread wrapping   (string, no new symbols)
  └── buildBodyParameter(...)     → "body: serializer(expr),"    (string, HAS serializer names ⚠️)
        ├── buildModelSerializer(ctx, type, {nameOnly:true})      → "barSerializer"
        ├── buildXmlModelSerializer(ctx, type, {nameOnly:true})   → "barXmlSerializer"
        └── serializeRequestValue(ctx, type, ...)                 → inline expressions (may have serializer names for arrays/unions)
```

**Returns:** one concatenated string → fed to `resolveReferences(str, typeRefkeys)` → refkeys injected via regex

---

## Where Serializer Names Appear

| Source | Example output | Frequency |
|--------|---------------|-----------|
| `buildBodyParameter` — named serializer | `body: barSerializer(body),` | Very common |
| `buildBodyParameter` — XML serializer | `body: barXmlSerializer(body),` | Occasional |
| `buildBodyParameter` — dual-format | `body: (isXmlContentType(...) ? xmlSer(x) : jsonSer(x)),` | Rare |
| `serializeRequestValue` — array of models | `body: bars.map((p) => { return barSerializer(p)})` | Occasional |
| `serializeRequestValue` — special union | `body: fooSerializer(body)` | Rare |
| `serializeRequestValue` — uint8ArrayToString | `uint8ArrayToString(body, "base64")` | Rare |
| Header params | Typically scalar expressions, no serializer names | Almost never |
| Content type | Constants or options access | Never |

**Test baseline evidence:** 9 scenarios with body params. All serializer references come from `buildBodyParameter` (named serializer path). No header params in baselines contain serializer names.

---

## Approaches

### Approach A: Full JSX Decomposition (Reference Impl Pattern)

Follows the `http-client-js` reference implementation most closely. Each concern becomes a child component of `<RequestCall>`.

```tsx
<RequestCall verb={verb} path={pathArg} optionalParamName={optionalParamName} runtimeLib={runtimeLib}>
  <ContentTypeParam contentTypeParameter={contentTypeParam} optionalParamName={optionalParamName} />
  <HeaderParams context={context} operation={operation} optionalParamName={optionalParamName} />
  <BodyParam context={context} operation={operation} optionalParamName={optionalParamName} />
</RequestCall>
```

- `<ContentTypeParam>` — renders `contentType: value,` or nothing. Pure string, no refkeys needed.
- `<HeaderParams>` — iterates header params, renders `headers: { entries..., ...rest },` or nothing. Reuses `getParameterMap()` and `buildHeaderParameter()` as string helpers (they produce correct output for headers).
- `<BodyParam>` — renders `body: expr,` or nothing. Uses `serializerRefkey(bodyType)` / `xmlSerializerRefkey(bodyType)` directly in `code` templates instead of string names. Falls back to `serializeRequestValue()` string output for edge cases (spread models, inline serialization).
- `<RequestCall>` changes from `headerAndBodyParams` prop to `children`.

**Pros:**
- Most idiomatic Alloy: declarative, composable, each component has single responsibility
- Body serializer references use refkeys directly — no scanning
- `SendFunction` completely drops `resolveReferences` and `typeRefkeys`
- Easy to test/extend each piece independently
- Matches reference implementation structure (`HttpRequestOptions.Headers`, `HttpRequestOptions.Body`)

**Cons:**
- Header params still use string helpers internally (`getParameterMap`, `buildHeaderParameter`) — they don't produce refkeys, but in practice don't need them (headers are scalar)
- `serializeRequestValue` fallback in `<BodyParam>` still produces strings for edge cases (arrays with model elements, special unions). These rarely appear in body params at top level because TCGC wraps them in models with named serializers. If they do appear, the string wouldn't have auto-imports, but this is the same behavior as the current `resolveReferences` (which also can miss deeply nested names)

### Approach B: Data Extraction + Code Templates in SendFunction

Instead of child components, extract structured data from the operation and compose directly in `SendFunction` using `code` templates.

```tsx
function SendFunction(props) {
  const contentTypeExpr = getContentTypeExpression(operation);
  const headerEntries = getHeaderEntries(context, operation, optionalParamName);
  const bodyInfo = getBodyParameterInfo(context, operation, optionalParamName);

  const headerBlock = headerEntries.length > 0
    ? code`headers: {${headerEntries.join(",\n")}, ...${optionalParamName}.requestOptions?.headers },`
    : "";

  const bodyBlock = bodyInfo
    ? code`body: ${bodyInfo.prefix}${bodyInfo.serializerRef ?? serializerRefkey(bodyInfo.type)}(${bodyInfo.expression}),`
    : "";

  return (
    <ts.FunctionDeclaration ...>
      ...
      {code`return context.path(${pathArg}).${verb}({...${runtimeLib.operationOptionsToRequestParameters}(${optionalParamName}), ${contentTypeExpr}${headerBlock}${bodyBlock}});`}
    </ts.FunctionDeclaration>
  );
}
```

**Pros:**
- No new components — simpler file structure
- Direct control over how pieces compose
- Can handle all cases inline

**Cons:**
- `SendFunction` becomes a monolith with lots of inline logic
- Breaks the declarative pattern (user's high-priority principle)
- Harder to test individual concerns
- Body serialization logic would be duplicated or tightly coupled to `SendFunction`
- Not idiomatic Alloy — goes against the user's stated preference

### Approach C: Body-Only JSX, String Helpers for Rest

Only convert the body parameter to a JSX component. Keep content type and headers as string output from the existing helpers.

```tsx
function SendFunction(props) {
  const contentTypeStr = getContentTypeString(operation, optionalParamName);
  const headerStr = getHeaderString(context, operation, optionalParamName);
  // No resolveReferences for these — they don't contain serializer names

  return (
    <ts.FunctionDeclaration ...>
      ...
      <RequestCall ...>
        {contentTypeStr}
        {headerStr}
        <BodyParam context={context} operation={operation} optionalParamName={optionalParamName} />
      </RequestCall>
    </ts.FunctionDeclaration>
  );
}
```

**Pros:**
- Smallest change — only one new component
- Still eliminates `resolveReferences` (serializer names only in body)
- Lower risk of regressions

**Cons:**
- Inconsistent: body is JSX, headers/contentType are strings
- Misses opportunity to make the code uniformly declarative
- Still has string-based code generation for headers (anti-pattern per user direction)
- Harder to evolve later — mixing paradigms

---

## Recommendation

**Approach A (Full JSX Decomposition)** is recommended.

It follows the user's high-priority directive for declarative Alloy patterns, matches the reference implementation, and cleanly separates concerns. The fact that header/contentType components internally still call string helpers is acceptable — those helpers produce correct output without serializer names. The body component is where the refkey benefit is most critical, and Approach A handles it well.

The `serializeRequestValue` fallback path in `<BodyParam>` is an edge case — when no named serializer exists (spread models, inline serialization), the output is typically simple expressions without external symbol references. We can defer converting `serializeRequestValue` to JSX as a future task.

---

## Component Design (Approach A)

### New Components

```
<SendFunction>                    (existing, modified)
  ├── <UrlExpansion />            (existing, unchanged)
  └── <RequestCall>               (modified: children instead of headerAndBodyParams prop)
        ├── <ContentTypeParam />  (NEW)
        ├── <HeaderParams />      (NEW)
        └── <BodyParam />         (NEW)
```

### `<ContentTypeParam>`
```tsx
interface ContentTypeParamProps {
  operation: ServiceOperation;
  optionalParamName: string;
}
```
- Finds content-type parameter from `operation.operation.parameters`
- Calls existing `getContentTypeValue()` (exported from operationHelpers)
- Returns `contentType: value,` string or `null`

### `<HeaderParams>`
```tsx
interface HeaderParamsProps {
  context: SdkContext;
  operation: ServiceOperation;
  optionalParamName: string;
}
```
- Filters header params (same logic as current `getHeaderAndBodyParameters`)
- Calls existing `getParameterMap()` and `buildHeaderParameter()` (needs export)
- Returns `headers: { entries..., ...options.requestOptions?.headers },` string or `null`

### `<BodyParam>`
```tsx
interface BodyParamProps {
  context: SdkContext;
  operation: ServiceOperation;
  optionalParamName: string;
}
```
- Handles body parameter serialization
- **Key change:** Uses `serializerRefkey(bodyType)` / `xmlSerializerRefkey(bodyType)` in `code` templates instead of string serializer names
- Branches:
  1. No body → `null`
  2. Dual-format (XML+JSON) → `code` with both `xmlSerializerRefkey` and `serializerRefkey`
  3. Named serializer (non-spread) → `code` with `serializerRefkey` or `xmlSerializerRefkey`
  4. Azure Core error type → plain expression, no serializer
  5. Inline serialization fallback → `serializeRequestValue()` string output (no serializer names in practice)

### `<RequestCall>` (modified)
```tsx
interface RequestCallProps {
  operationPath: string;
  verb: string;
  hasUrlTemplate: boolean;
  pathVarName?: string;
  optionalParamName: string;
  runtimeLib: ReturnType<typeof getRuntimeLib>;
  children?: Children;  // NEW: replaces headerAndBodyParams prop
}
```
- Uses `children` in the `code` template where `headerAndBodyParams` was

### `<SendFunction>` (modified)
- Drops `typeRefkeys` prop entirely
- No longer calls `getHeaderAndBodyParameters()` or `resolveReferences()`
- Composes child components declaratively

---

## Exports Needed from `operationHelpers.ts`

These private functions need to be exported for use by the new components:

| Function | Used by | Currently |
|----------|---------|-----------|
| `isContentType` | `<ContentTypeParam>` | private |
| `getContentTypeValue` | `<ContentTypeParam>` | private |
| `buildHeaderParameter` | `<HeaderParams>` | private |
| `isConstant` | `<HeaderParams>` filter logic | private |
| `getPropertySerializationPrefix` | `<BodyParam>` | already exported |
| `isDefaultValueTypeMatch` | `<BodyParam>` | private |
| `formatDefaultValue` | `<BodyParam>` | private |
| `getEncodeForType` | `<BodyParam>` fallback | private |

Alternatively, we can extract the filtering/iteration logic that currently lives in `getHeaderAndBodyParameters` into new focused helpers:
- `getContentTypeParameter(operation)` → `SdkHttpParameter | undefined`
- `getHeaderParameters(context, operation, optionalParamName)` → `string` (the formatted headers block)
- Keep `buildBodyParameter` private, move its logic into `<BodyParam>`

---

## Impact on `typeRefkeys` / `resolveReferences`

After this change:
- `SendFunction` no longer needs `typeRefkeys` prop
- `resolveReferences` is no longer called from `SendFunction`
- `typeRefkeys` is still needed by `OperationGroup` for the bridge components (`OperationFunction`, `FunctionBody`) used by unconverted `getDeserializePrivateFunction` and `getOperationFunction`
- `buildTypeRefkeys` stays until Phase 11.5 (delete bridge infrastructure)

---

## Risks

| Risk | Mitigation |
|------|-----------|
| Header params with serializer names (rare edge: arrays of models) | Currently same behavior — `resolveReferences` also didn't deeply parse nested expressions. Can be addressed when `serializeRequestValue` is converted to JSX (future task) |
| `serializeRequestValue` fallback for body producing serializer names | Only affects spread models and inline serialization — these paths produce simple expressions without external imports in practice |
| Formatting differences in generated output | Run `SCENARIOS_UPDATE=true npm run unit-test:modular` and validate diffs are formatting-only |

---

## Validation Plan

1. Run `SCENARIOS_UPDATE=true npm run unit-test:modular` → update baselines
2. `git diff test/modularUnit/scenarios/` → verify no breaking API changes
3. `pnpm build` → no build errors
4. Focus on scenarios with body serializers: `bodyModel`, `bodyOptional`, `bodyArray`, `specialHeaders`, `propertyFlatten`
