# Decisions

## 2026-02-20: Team Formation
**By:** Squad (Coordinator)
**What:** Team formed for Alloy migration. Ripley (Lead), Dallas (JSON Serializers), Kane (XML Serializers), Lambert (Operations), Parker (Tester).
**Why:** Migration plan has clear domain boundaries between JSON serialization, XML serialization, and operations — warrants separate specialists.

## 2026-02-20: Migration plan adopted
**By:** Jose Manuel Heredia Hidalgo
**What:** The migration plan at `packages/typespec-ts/ALLOY_MIGRATION_PLAN.md` is the authoritative source of truth for this work.
**Why:** Pre-existing plan with 9 steps, gotchas, and validation criteria.

## 2026-02-20: Phase 1 Architecture — Refkey-first, rendering deferred
**By:** Ripley (Lead)
**What:** Static helpers are NOT yet rendered through Alloy `<ts.SourceFile>` components. They continue through `loadStaticHelpers()` → TsMorphBridge. Refkey functions establish the stable API contract.
**Why:** Rendering through Alloy would cause dual-write conflicts with TsMorphBridge. Deferred to Phase 9 when all consumers are migrated. Phase 1 creates refkeys alongside old system (dual-path coexistence).

## 2026-02-20: Phase 1 Architecture — Manual imports over auto-imports
**By:** Ripley (Lead)
**What:** `getStaticHelperFileInfo()` enables components to build manual import statements instead of relying on Alloy's auto-import resolution.
**Why:** Pragmatic bridge: components get correct import paths without needing declarations in Alloy tree. Auto-imports deferred to Phase 9.

## 2026-02-20: Phase 1 Architecture — Refkey namespace isolation
**By:** Ripley (Lead)
**What:** All static helper refkeys use prefix `refkey("StaticHelpers", category, name)`. Isolated from old framework refkeys (string-based), type refkeys, and operation refkeys.
**Why:** Clear separation prevents import confusion between Alloy refkeys (return Refkey objects) and old framework refkeys (return strings) during migration.
