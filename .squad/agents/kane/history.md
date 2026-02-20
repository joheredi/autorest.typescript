# Kane — History

## Project Context
**Project:** TypeSpec TypeScript Emitter — Alloy Framework Migration
**Stack:** TypeScript, TypeSpec, Alloy JSX, ts-morph (being replaced)
**User:** Jose Manuel Heredia Hidalgo
**Plan:** `packages/typespec-ts/ALLOY_MIGRATION_PLAN.md`

## Learnings

### Phase 1 Complete — Static Helper Refkeys Available (2026-02-20T23:36:00Z)

Ripley delivered the foundational refkey API. Eight accessor functions provide type-safe access to ~50 static helper symbols:

**Available for XML serialization (Phase 3):**
- `xmlHelperRefkey(name)` — 13 symbols for XML operations

**Other functions also available:**
- `serializationHelperRefkey(name)` — 13 symbols (JSON serialization)
- `pagingHelperRefkey(name)` — 6 symbols
- `pollingHelperRefkey(name)` — 2 symbols
- And 4 more families

**How to use:**
```tsx
import { xmlHelperRefkey } from "@alloy-js/typescript-sdk/modular";

const serializeToXmlRef = xmlHelperRefkey("serializeToXml");
const deserializeFromXmlRef = xmlHelperRefkey("deserializeFromXml");
```

**Key architecture:** Refkeys are dual-path compatible—old TsMorphBridge system continues working. Rendering through Alloy deferred to Phase 9.

**Next:** Phase 3 begins—you now have the stable XML helper API. Start XML serializer refactoring.

