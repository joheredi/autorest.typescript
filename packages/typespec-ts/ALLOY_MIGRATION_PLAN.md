# Plan: Convert Serializers and Operation Helpers to Alloy

## Context for Future Sessions

### Repository layout
- Working directory: `/home/joheredi/dev/playground/emitter-modernization/autorest.typescript`
- Package: `packages/typespec-ts/`
- Build: `npx alloy build` (NOT `tsc` — Alloy uses Babel with custom JSX transform)
- Test: `npm run unit-test:modular` (526 tests, ~4 min)
- Type check: `npx tsc --noEmit`

### Current architecture
`$onEmit` → `generateModularSources()` → `emitAlloyOutput()` which:
1. Runs a `tsMorphGenerate` callback (3 old functions + binder resolution)
2. Renders an Alloy JSX tree with `writeOutput()`
3. `TsMorphBridge` writes ts-morph files via `emitFile()` (separate from Alloy's joinPaths)

### What's already Alloy-native
8 components render through pure Alloy (zero ts-morph): Logger, Models, RestorePoller, ClientContext, ClassicalClient, ClassicalOperationGroups, Samples, IndexFiles.

### What remains in ts-morph (this plan)
3 functions in the `tsMorphGenerate` callback:
```
emitTypes(dpgContext, { sourceRoot: modularSourcesRoot });
buildApiOptions(dpgContext, subClient, modularEmitterOptions);
buildOperationFiles(dpgContext, subClient, modularEmitterOptions);
binder.resolveAllReferences(modularSourcesRoot);
```

These call into:
- `emitModels.ts` → serializer builders → `addDeclaration()` for each serializer/deserializer function
- `buildOperations.ts` → `operationHelpers.ts` → builds send/deserialize/public operation functions
- `emitModelsOptions.ts` → `operationHelpers.ts` → builds operation options interfaces

## Key Files to Convert

### Serializers (Phase 3): 2,140 lines, 47 resolveReference

| File | Lines | resolveRef | What it produces |
|------|-------|-----------|-----------------|
| `buildSerializerFunction.ts` | 653 | 15 | JSON model serializer functions |
| `buildDeserializerFunction.ts` | 598 | 13 | JSON model deserializer functions |
| `buildXmlSerializerFunction.ts` | 889 | 19 | XML serializer/deserializer functions |

### Operations (Phase 4): 2,984 lines, ~30 resolveReference

| File | Lines | resolveRef | What it produces |
|------|-------|-----------|-----------------|
| `operationHelpers.ts` | 2,710 | 29 | 5 main function builders + ~20 helper functions |
| `buildOperations.ts` | 274 | 1+2addDecl | Orchestrates per-operation-group file creation |
| `emitModelsOptions.ts` | 62 | 0 | Delegates to `buildOperationOptions` from buildOperations.ts |

### Support files (deleted when consumers are converted)

| File | Lines | Purpose |
|------|-------|---------|
| `type-expressions/*.ts` (6 files) | 350 | String-returning type expressions with resolveReference — replaced by `<TypeExpression>` component |
| `serializeUtils.ts` | 227 | Pure utilities (no resolveReference) — **keep as-is** |
| `emitModels.ts` | 1,009 | Model declarations (already in `<Models>`) + serializer declarations (Phase 3 removes these) |

## Conversion Pattern

### The core pattern (proven in RestorePoller.tsx)

**Before** (ts-morph + binder):
```ts
// In buildSerializerFunction.ts
const statements: string[] = [];
statements.push(`return ${resolveReference(refkey(type, "serializer"))}(item);`);
return { kind: StructureKind.Function, name: "serializeFoo", statements, ... };
```
Then `addDeclaration(sourceFile, fn, refkey(type, "serializer"))` registers it.
Then `binder.resolveAllReferences()` replaces `__PLACEHOLDER_o42__` with `serializeFoo`.

**After** (Alloy JSX):
```tsx
// In Serializers.tsx
const serializerRef = refkey(type, "serializer");  // Alloy refkey, NOT old refkey
<ts.FunctionDeclaration name="serializeFoo" refkey={serializerRef} export>
  {code`return ${serializerRef}(item);`}
</ts.FunctionDeclaration>
```
Alloy's binder automatically resolves the refkey to the function name and adds imports.

### What changes per resolveReference call

| Old pattern | New pattern |
|-------------|------------|
| `resolveReference(refkey(type, "serializer"))` | `refkey(type, "serializer")` inside `code` template |
| `resolveReference(refkey(type, "deserializer"))` | `refkey(type, "deserializer")` inside `code` template |
| `resolveReference(refkey(type, "polymorphicType"))` | `refkey(type, "polymorphicType")` inside `code` template |
| `resolveReference(refkey(type))` | `refkey(type)` (same as `typeRefkey(type)` from Models.tsx) |
| `resolveReference(dependencies.StreamableMethod)` | `httpRuntimeLib.StreamableMethod` or `azureCoreClientLib.StreamableMethod` |
| `resolveReference(dependencies.PathUncheckedResponse)` | `httpRuntimeLib.PathUncheckedResponse` |
| `resolveReference(dependencies.getClient)` | `httpRuntimeLib.getClient` |
| `resolveReference(dependencies.createRestError)` | `httpRuntimeLib.createRestError` |
| `resolveReference(dependencies.operationOptionsToRequestParameters)` | `httpRuntimeLib.operationOptionsToRequestParameters` |
| `resolveReference(dependencies.uint8ArrayToString)` | `httpRuntimeLib.uint8ArrayToString` or `azureCoreUtilLib.uint8ArrayToString` |
| `resolveReference(dependencies.stringToUint8Array)` | `httpRuntimeLib.stringToUint8Array` |
| `resolveReference(SerializationHelpers.getBinaryResponse)` | refkey for static helper (see Static Helpers section) |
| `resolveReference(SerializationHelpers.serializeRecord)` | refkey for static helper |
| `resolveReference(SerializationHelpers.areAllPropsUndefined)` | refkey for static helper |
| `resolveReference(PagingHelpers.PagedAsyncIterableIterator)` | refkey for static helper |
| `resolveReference(PagingHelpers.BuildPagedAsyncIterator)` | refkey for static helper |
| `resolveReference(PollingHelpers.GetLongRunningPoller)` | refkey for static helper |
| `resolveReference(UrlTemplateHelpers.parseTemplate)` | refkey for static helper |
| `resolveReference(XmlHelpers.isXmlContentType)` | refkey for static helper |
| `resolveReference(XmlHelpers.serializeToXml)` | refkey for static helper |
| `resolveReference(XmlHelpers.deserializeFromXml)` | refkey for static helper |
| `resolveReference(XmlHelpers.XmlPropertyMetadata)` | refkey for static helper |
| `resolveReference(XmlHelpers.XmlPropertyDeserializeMetadata)` | refkey for static helper |
| `resolveReference(XmlHelpers.XmlSerializedObject)` | refkey for static helper |
| `resolveReference(XmlHelpers.deserializeXmlObject)` | refkey for static helper |
| `resolveReference(AzurePollingDependencies.PollerLike)` | `azureCoreLroLib.PollerLike` |
| `resolveReference(AzurePollingDependencies.OperationState)` | `azureCoreLroLib.OperationState` |
| `resolveReference(MultipartHelpers.FileContents)` | refkey for static helper |
| `resolveReference(refkey(method[1], "operationOptions"))` | `refkey(method[1], "operationOptions")` |
| `resolveReference(refkey(operation, "api"))` | `refkey(operation, "api")` |

### `useDependencies()` replacement

Every call to `useDependencies()` → get the dep → `resolveReference(dep)` becomes:
```tsx
import { httpRuntimeLib, azureCoreClientLib, ... } from "./ExternalPackages.js";
import { isAzurePackage } from "@azure-tools/rlc-common";

const isAzure = isAzurePackage({ options: context.rlcOptions ?? {} });
// Then use: isAzure ? azureCoreClientLib.Client : httpRuntimeLib.Client
```

The `ExternalPackages.tsx` file already defines all external package refkeys.

## Gotchas and Learnings

### 1. `code` template vs raw strings
The `code` tagged template from `@alloy-js/core` handles refkey interpolation. BUT it also handles whitespace/indentation. If you embed a `code` template inside a `<ts.FunctionDeclaration>`, the indentation is managed by Alloy. Don't fight the indentation — let Alloy handle it.

### 2. Refkey identity matters
Alloy's `refkey()` from `@alloy-js/core` returns a **Refkey object** (not a string like the old system). When you write `refkey(type, "serializer")`, the same args always return the same Refkey object. This is how Alloy tracks references — if a declaration uses `refkey={refkey(type, "serializer")}` and body text uses `${refkey(type, "serializer")}`, Alloy knows they're the same symbol.

**CRITICAL**: The old framework's `refkey()` in `src/framework/refkey.ts` returns a **string**. The Alloy `refkey()` from `@alloy-js/core` returns a **Refkey object**. They are NOT interchangeable. Import from `@alloy-js/core`, not `../../framework/refkey.js`.

### 3. Static helpers need refkeys
The static helpers (paging, polling, serialization, URL template, XML, multipart, cloud settings) are currently `.ts` files copied into the output. For Alloy, they need to be JSX components with refkeys so that serializers can reference them.

**Approach**: Create a `StaticHelperDeclarations.tsx` that reads each static helper file content (at build time or as embedded strings) and renders it as `<ts.SourceFile>` with `<ts.FunctionDeclaration refkey={...}>` for each exported function/interface. This gives them Alloy-trackable refkeys.

Alternatively, use `@alloy-js/typescript`'s `createPackage()` to define them as an "internal package" with refkeys, then render the source files separately.

### 4. The `addDeclaration()` pattern in emitModels.ts
`emitModels.ts` has 15 `addDeclaration()` calls. Each registers a serializer/deserializer function. When you create `<Serializers>` components that render `<ts.FunctionDeclaration refkey={...}>`, these automatically register with Alloy's binder. The `addDeclaration()` calls in `emitModels.ts` become unnecessary.

### 5. Serializers are NOT recursive
Despite being called from a recursive type visitor (`emitTypes` → `emitType` → `addSerializationFunctions`), the serializer functions themselves build `statements: string[]` arrays **linearly** (push line by line). They are NOT recursive function calls. This simplifies conversion — each function can be converted independently.

### 6. The discriminated union pattern
Serializers handle discriminated unions specially:
- `buildModelSerializer` with `isDiscriminatedUnion(type)` → generates a switch statement on the discriminator property
- The switch cases call `resolveReference(refkey(subtype, "serializer"))` for each variant
- In Alloy, the variant serializer refkeys are resolved automatically

### 7. operationHelpers.ts has 3 categories of functions

**Category A — Function builders** (produce `FunctionDeclarationStructure`):
- `getSendPrivateFunction`, `getDeserializePrivateFunction`, `getDeserializeHeadersPrivateFunction`, `getDeserializeExceptionHeadersPrivateFunction`, `getOperationFunction`
- These are the targets for JSX conversion

**Category B — Statement helpers** (produce `string` or `string[]` for inclusion in statements):
- `getHeaderAndBodyParameters`, `getPathParameters`, `getQueryParameters`, `getExceptionThrowStatement`, `getResponseMapping`, `getRequestModelMapping`, `serializeRequestValue`, `deserializeResponseValue`, etc.
- These can stay as pure string-returning functions — they just need their `resolveReference()` calls replaced

**Category C — Pure utilities** (no ts-morph, no resolveReference):
- `getOperationName`, `getOperationOptionsName`, `isLroOnlyOperation`, `isPagingOnlyOperation`, `isLroAndPagingOperation`, `getExpectedStatuses`, `getAllProperties`, `getAllAncestors`, `getResponseHeaders`
- These need NO changes

### 8. The XML dual-format pattern
Some operations support both JSON and XML. The send function checks content type at runtime:
```ts
if (isXmlContentType(contentType)) {
  body = xmlSerializer(item);
} else {
  body = jsonSerializer(item);
}
```
Both `xmlSerializer` and `jsonSerializer` are referenced via `resolveReference()`. In Alloy, both become refkeys.

### 9. Path considerations
All `<ts.SourceFile path={...}>` in Alloy components must use **relative paths** (relative to `emitterOutputDir`). The `alloy-emitter.tsx` computes `relativeSourcesRoot` by stripping `emitterOutputDir` from `modularSourcesRoot`. Pass this relative root to components.

### 10. Azure vs unbranded
Always check `isAzurePackage({ options: context.rlcOptions ?? {} })` to select between Azure (`azureCoreClientLib`, `azureCorePipelineLib`, etc.) and unbranded (`httpRuntimeLib`) external package refkeys.

### 11. ts-morph shim won't work
We tried creating a `ts-morph-shim.ts` with compatible interfaces to avoid the ts-morph dependency. It fails because files that still import from real ts-morph (bridge files) pass values to/from files using the shim, and TypeScript treats them as nominally different types. The shim approach only works if ALL files use the shim — you can't mix real ts-morph and shim.

### 12. TsMorphBridge writes via emitFile, not writeOutput
The `TsMorphBridge` component writes ts-morph files directly via `emitFile()` from `@typespec/compiler` (bypassing Alloy's `writeOutput` which would double the paths). This was a critical bug fix — ts-morph `getFilePath()` returns absolute paths, and `writeOutput()` does `joinPaths(emitterOutputDir, path)`.

## Recommended Order of Operations

### Step 1: Static helper refkeys
Create refkeys for all static helper exports so serializers can reference them.

### Step 2: JSON serializers
Convert `buildSerializerFunction.ts` (653 lines, 15 resolveRef) → `components/Serializers.tsx`.
- Keep the statement-building logic
- Replace each `resolveReference(X)` with the corresponding refkey in a `code` template
- Wrap in `<ts.FunctionDeclaration refkey={refkey(type, "serializer")}>`

### Step 3: JSON deserializers
Convert `buildDeserializerFunction.ts` (598 lines, 13 resolveRef) → merge into `components/Serializers.tsx`.
Same pattern as step 2.

### Step 4: XML serializers
Convert `buildXmlSerializerFunction.ts` (889 lines, 19 resolveRef) → `components/XmlSerializers.tsx`.
Same pattern. More XmlHelpers refkeys needed.

### Step 5: Operation helpers
Convert `operationHelpers.ts` (2,710 lines, 29 resolveRef):
- Convert Category B functions first (statement helpers) — replace resolveReference with refkeys
- Then convert Category A functions (function builders) — wrap in JSX
- Keep Category C functions unchanged

### Step 6: Wire operations
Convert `buildOperations.ts` (274 lines) → update `components/Operations.tsx`.
Wire `<OperationOptions>` and `<Operations>` into `alloy-emitter.tsx`.

### Step 7: Delete emitModels.ts
Its model declarations are in `<Models>`. Its serialization declarations are now in `<Serializers>`. Delete the file.

### Step 8: Remove tsMorphGenerate callback
All 3 old function calls are gone. Remove the callback from `emitAlloyOutput()`. Remove `binder.resolveAllReferences()`.

### Step 9: Delete old framework
Remove `src/framework/`, `contextManager.ts`, `external-dependencies.ts`, `static-helpers-metadata.ts`, `TsMorphBridge.tsx`, `static/static-helpers/`, all remaining old `build*.ts`/`emit*.ts`. Remove `ts-morph` from `package.json`.

## Validation at each step
After each step:
1. `npx tsc --noEmit` — zero type errors
2. `npx alloy build` — build succeeds
3. `npm run unit-test:modular` — 526 passing
4. After final step: `npm run smoke-test` in `packages/typespec-test/` — wait for "All specs succeeded!"
