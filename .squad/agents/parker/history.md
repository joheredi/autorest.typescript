# Parker — History

## Project Context
**Project:** TypeSpec TypeScript Emitter — Alloy Framework Migration
**Stack:** TypeScript, TypeSpec, Alloy JSX, ts-morph (being replaced)
**User:** Jose Manuel Heredia Hidalgo
**Plan:** `packages/typespec-ts/ALLOY_MIGRATION_PLAN.md`

## Phases Completed

### Phase 1 (Ripley — Lead)
- ✅ Architecture decisions established (refkey-first, coexistence pattern, manual imports)
- ✅ Static helper refkeys defined (Phases 2-4 consumers ready)
- ✅ TsMorphBridge framework in place

### Phases 2-3 (Dallas — JSON Serializers)
- ✅ Serializers.tsx component (1302 lines) rendering JSON serializers/deserializers
- ✅ Type check passes
- ✅ Coexistence with old ts-morph path
- ✅ Exports: `serializerRefkey`, `deserializerRefkey`

### Phase 4 (Kane — XML Serializers)
- ✅ XmlSerializers.tsx component rendering XML serializers/deserializers
- ✅ 19 resolveReference calls replaced with refkey approach
- ✅ 526 tests pass
- ✅ Coexistence with old buildXmlSerializerFunction.ts path

### Phases 5-6 (Lambert — Operations)
- ✅ Operations.tsx component (~310 lines) for operation generation
- ✅ FunctionFromStructure bridge connecting Alloy to existing helpers
- ✅ Explicit import computation via collectFileImports()
- ✅ 20/29 resolveReference calls removed (9 intentional in shared functions)
- ✅ 120 scenarios regenerated
- ✅ 526 tests pass

## Learnings

### Coexistence Pattern (Dallas/Kane/Lambert)
The migration uses a **dual-path coexistence** approach:
- New Alloy components produce refkeys and render output
- Old ts-morph path remains operational
- Alloy output takes precedence via `writeOutput` ordering
- Removes blocker of "must migrate everything at once"
- Scheduled cleanup when all consumers migrated

### Shared Function Boundary (Lambert)
9 `resolveReference()` calls remain intentionally in shared functions:
- `getSerializationExpressionForFlatten`, `serializeRequestValue`, `deserializeResponseValue`
- Called from **both** operation generation (Alloy JSX) **and** serializer generation (ts-morph + binder)
- Removal deferred until serializer pipeline migrates to Alloy
- Document as technical debt with clear cleanup path

### Import Strategy (Lambert)
Operations use **explicit import computation** (not Alloy auto-import):
- Function bodies rendered as raw strings from Category A/B helpers
- `collectFileImports()` analyzes operations to determine required imports
- Will switch to Alloy auto-import in Phase 9 (full code-template conversion)
- Pragmatic bridge during gradual migration

## Next Steps
- **Phase 7:** Legacy File Cleanup (Parker or Ripley) — remove old emitModels.ts paths
- **Phase 8:** New Dependencies — add Alloy JSON/XML helpers as npm packages
- **Phase 9:** Code Template Conversion — migrate remaining ts-morph code-templates to Alloy JSX
