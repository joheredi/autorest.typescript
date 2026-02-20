# Dallas — History

## Project Context
**Project:** TypeSpec TypeScript Emitter — Alloy Framework Migration
**Stack:** TypeScript, TypeSpec, Alloy JSX, ts-morph (being replaced)
**User:** Jose Manuel Heredia Hidalgo
**Plan:** `packages/typespec-ts/ALLOY_MIGRATION_PLAN.md`

## Learnings

### Phase 1 Complete — Static Helper Refkeys Available (2026-02-20T23:36:00Z)

Ripley delivered the foundational refkey API. Eight accessor functions provide type-safe access to ~50 static helper symbols:

**Available functions:**
- `serializationHelperRefkey(name)` — 13 symbols (buildCsvCollection, buildMultiCollection, buildNewlineCollection, buildPipeCollection, buildSsvCollection, buildTsvCollection, parseCsvCollection, parsePipeCollection, parseSsvCollection, parseNewlineCollection, serializeRecord, getBinaryResponse, areAllPropsUndefined)
- `pagingHelperRefkey(name)` — 6 symbols
- `pollingHelperRefkey(name)` — 2 symbols
- `simplePollerHelperRefkey(name)` — 2 symbols
- `urlTemplateHelperRefkey(name)` — 2 symbols
- `multipartHelperRefkey(name)` — 2 symbols
- `cloudSettingHelperRefkey(name)` — 3 symbols
- `xmlHelperRefkey(name)` — 13 symbols

**How to use:**
```tsx
import { serializationHelperRefkey, getStaticHelperFileInfo } from "@alloy-js/typescript-sdk/modular";

// Type-safe refkey
const serializeRecordRef = serializationHelperRefkey("serializeRecord");

// Manual imports (until Phase 9 auto-import)
const info = getStaticHelperFileInfo("Serialization", "serializeRecord");
// info.relativePath = "static-helpers/serialization/serialize-record.ts"
// info.exportName = "serializeRecord"
```

**Key architecture:** Refkeys are dual-path compatible—old TsMorphBridge system continues working. Rendering through Alloy deferred to Phase 9.

**Next:** Phase 2 begins—you now have the stable API. Start JSON serializer refactoring with confidence in import paths.

