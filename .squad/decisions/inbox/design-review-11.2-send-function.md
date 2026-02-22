# Design Review: 11.2 — `getSendPrivateFunction` → `<SendFunction>`

**Date:** 2026-02-22

---

## 1. What we're converting

`getSendPrivateFunction` (lines 104–168 of operationHelpers.ts) builds the `_${name}Send` function that:
1. Computes URL template parameters (path + query)
2. Optionally expands a URL template via `expandUrlTemplate()`
3. Calls `context.path(...).${verb}({...operationOptionsToRequestParameters(options), ...headers, ...body})`

## 2. Symbols that need refkeys (currently hardcoded strings)

| Symbol | Where it appears | Refkey source |
|--------|-----------------|---------------|
| `StreamableMethod` | Return type | `runtimeLib.StreamableMethod` |
| `operationOptionsToRequestParameters` | Body: `...operationOptionsToRequestParameters(options)` | `runtimeLib.operationOptionsToRequestParameters` |
| `expandUrlTemplate` | Body (conditional): `expandUrlTemplate("...", {...})` | Static helper — need refkey from `StaticHelpers.tsx` |

`context.path(...)` is a method call on the `context` parameter — not a symbol that needs import.

## 3. Helper functions called (all private, Category B/C)

| Helper | Returns | Action |
|--------|---------|--------|
| `getOperationSignatureParameters(ctx, method, clientType)` | `GeneratedFunction["parameters"]` — array of `{name, type, initializer}` | **Export from operationHelpers.ts**, use for parameter descriptors |
| `getOptionalParamsName(parameters)` | String — name of the options param (usually `"options"`) | **Export**, use in body template |
| `getPathParameters(operation)` | `string[]` — property assignments for path params | **Export**, inline into `code` template |
| `getQueryParameters(ctx, operation)` | `string[]` — property assignments for query params | **Export**, inline into `code` template |
| `getHeaderAndBodyParameters(ctx, operation, optName)` | String — header/body properties for request options | **Export**, inline into `code` template |
| `generateLocallyUniqueName(name, existing)` | String — unique var name | Already exported from `namingHelpers.ts` |
| `getClientOptions(client, key)` | Value — from TCGC | Already imported |

## 4. Component design

```tsx
interface SendFunctionProps {
  context: SdkContext;
  operation: ServiceOperation;
  prefixes: string[];
  clientType: string;
  client?: SdkClientType<SdkHttpOperation>;
}

function SendFunction(props: SendFunctionProps): Children {
  // 1. Compute parameters via getOperationSignatureParameters
  // 2. Map parameter types to refkeys (options type → operationOptionsRefkey)
  // 3. Compute URL template params
  // 4. Build body via code template with refkeys for:
  //    - expandUrlTemplate (static helper refkey)
  //    - operationOptionsToRequestParameters (runtimeLib refkey)
  // 5. Return type: runtimeLib.StreamableMethod (refkey, not string)
  
  return (
    <ts.FunctionDeclaration
      export
      name={`_${name}Send`}
      parameters={params}
      returnType={runtimeLib.StreamableMethod}
      refkey={sendFunctionRefkey(operation)}
    >
      {hasUrlTemplate && (
        code`const ${pathVarName} = ${expandUrlTemplateRefkey}("${uriTemplate}", {
          ${urlTemplateParams.join(",\n")}
        }, {
          allowReserved: ${optionalParamName}?.requestOptions?.skipUrlEncoding
        });`
      )}
      {code`return context.path(${pathStr}).${verb}({
        ...${runtimeLib.operationOptionsToRequestParameters}(${optionalParamName}),
        ${headerAndBodyParams}
      });`}
    </ts.FunctionDeclaration>
  );
}
```

## 5. Key decisions

### 5a. Parameter type resolution

`getOperationSignatureParameters` returns `{name, type: string, initializer}`. The `type` for the options param is a string like `"ReadOptionalParams"`. We need to resolve this to `operationOptionsRefkey(operation)` instead.

**Decision:** Build parameter descriptors directly in the component, using refkeys for the options type and the context type. Keep `getOperationSignatureParameters` for the required params (their types are primitive strings that don't need refkeys).

### 5b. expandUrlTemplate refkey

`expandUrlTemplate` is a static helper. Currently imported via raw string in `buildStaticHelperImportBlock`. Need a refkey from `StaticHelpers.tsx`.

**Decision:** Check if `StaticHelpers.tsx` already has a refkey for `expandUrlTemplate`. If not, add one. Use it in the `code` template.

### 5c. operationOptionsToRequestParameters in body

Currently a hardcoded string in the body. The bridge's `resolveReferences` would scan for it. In the JSX component, we use `runtimeLib.operationOptionsToRequestParameters` directly in the `code` template.

**Decision:** Use `runtimeLib.operationOptionsToRequestParameters` as a `code` template substitution.

## 6. Risks

| Risk | Mitigation |
|------|-----------|
| `getOperationSignatureParameters` returns `GeneratedFunction["parameters"]` — needs conversion to `ts.ParameterDescriptor[]` | Map in component; options param gets refkey type, others get string types |
| `expandUrlTemplate` refkey may not exist yet | Check/add to StaticHelpers.tsx |
| `getHeaderAndBodyParameters` returns a big string fragment — hard to embed refkeys inside | Keep as string for now; serializer names inside it are a future conversion |
| Some query param names have special encoding (`%2D`) | Preserved by keeping `getQueryParameters` helper as-is |
