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

