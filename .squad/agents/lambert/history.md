# Lambert — History

## Project Context
**Project:** TypeSpec TypeScript Emitter — Alloy Framework Migration
**Stack:** TypeScript, TypeSpec, Alloy JSX, ts-morph (being replaced)
**User:** Jose Manuel Heredia Hidalgo
**Plan:** `packages/typespec-ts/ALLOY_MIGRATION_PLAN.md`

## Learnings

### Phase 1 Complete — Static Helper Refkeys Available (2026-02-20T23:36:00Z)

Ripley delivered the foundational refkey API. Eight accessor functions provide type-safe access to ~50 static helper symbols:

**Available for operations (Phase 4):**
- `pagingHelperRefkey(name)` — 6 symbols (buildPagedAsyncIterator, PageSettings, ContinuablePage, etc.)
- `pollingHelperRefkey(name)` — 2 symbols (getLongRunningPoller, GetLongRunningPollerOptions)
- `urlTemplateHelperRefkey(name)` — 2 symbols (expandUrlTemplate, UrlTemplateOptions)
- Plus access to serialization and XML helpers as needed

**Other functions also available:**
- `serializationHelperRefkey(name)` — 13 symbols
- `xmlHelperRefkey(name)` — 13 symbols
- And 3 more families

**How to use:**
```tsx
import { pagingHelperRefkey, pollingHelperRefkey, urlTemplateHelperRefkey } from "@alloy-js/typescript-sdk/modular";

const buildPagingRef = pagingHelperRefkey("buildPagedAsyncIterator");
const getLroPollerRef = pollingHelperRefkey("getLongRunningPoller");
const expandUrlRef = urlTemplateHelperRefkey("expandUrlTemplate");
```

**Key architecture:** Refkeys are dual-path compatible—old TsMorphBridge system continues working. Rendering through Alloy deferred to Phase 9.

**Next:** Phase 4 begins—you now have the stable operations helper API. Start operations refactoring with confidence.

### Phase 5-6 Complete — Operations Migration to Alloy JSX (2026-02-21)

Successfully migrated operation generation from ts-morph to Alloy JSX pipeline.

**What changed:**

1. **`operationHelpers.ts` (Phase 5)** — Removed 20 of 29 `resolveReference()` calls:
   - All operation-specific references (StreamableMethod, PathUncheckedResponse, createRestError, operationOptionsToRequestParameters, PollerLike, OperationState, getLongRunningPoller, PagedAsyncIterableIterator, buildPagedAsyncIterator, expandUrlTemplate, isXmlContentType, getBinaryResponse) replaced with hardcoded symbol name strings
   - 9 `resolveReference()` calls KEPT in shared functions (used by both operations AND serializers): `getSerializationExpressionForFlatten`, `serializeRequestValue`, `deserializeResponseValue` — because the serializer pipeline still uses the old binder for import tracking
   - Old `getOperationOptionsName(method, true)` used instead of `resolveReference(refkey(method, "operationOptions"))` for the options type

2. **`Operations.tsx` (Phase 6)** — New full JSX component replacing `buildOperationFiles`:
   - Renders `<ts.SourceFile>` per operation group with `<ts.FunctionDeclaration>` for each function
   - Explicit import block computed per-file: analyzes operations for required runtime/LRO/static-helper/serializer imports
   - `operationRefkey(operation)` on public operation functions for inter-component referencing
   - Handles Azure vs unbranded import paths

3. **`alloy-emitter.tsx`** — Added `<OperationOptions>` and `<Operations>` to the Alloy JSX tree

4. **`index.ts`** — Removed `buildOperationFiles` and `buildApiOptions` from the `tsMorphGenerate` callback

**Key learnings:**
- Functions in `operationHelpers.ts` are shared between operation and serializer pipelines — can't blindly remove `resolveReference` from shared functions
- The binder's `resolveAllReferences` must still run for serializer import tracking
- Operation function bodies are rendered as raw strings; import tracking handled via explicit import computation rather than Alloy auto-import (pragmatic bridge until full code-template conversion in Phase 9)
- 120 scenario test baselines were regenerated to match new import format

**Test results:** 526 modular + 309 RLC + 144 next — all passing. Build + format + lint clean.
