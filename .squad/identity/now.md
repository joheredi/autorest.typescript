# Current Focus

## Last Session: 2026-02-22

**Branch:** `spike/emitter-migration`
**Last Commit:** `848561af4` — Phase 12: Remove explicit imports + fix self-imports, XML stubs, classic client defaults

## What's Done
- Phases 1–12 complete. Emitter fully migrated to Alloy JSX for operations, models, serializers.
- All 526 modular unit tests pass. Build clean.
- 4 critical bugs fixed this session: self-imports, XML stubs in samples, classic client defaults, OptionalParams imports.

## What's Next (Phase 13)
11 bugs remaining, grouped by root cause. See plan.md § Phase 13 for full details.

**Recommended pickup order:**
1. Group C: Component output bugs (clientContext XML stubs, flatten deserializers, name collision)
2. Group B: Type resolution (recursive unions, multipart type loss, Record intersection)
3. Group A: Serializer import resolution (blocked partially on static helpers conversion)
4. Group D: Infrastructure (static helpers to Alloy, remove resolveReferences)

## Agent Assignments (proposed)
- **Lambert** → Operations/serializer import bugs (Group A)
- **Dallas** → ClassicalClient bugs + flatten deserializers (Group C)
- **Kane** → Models/type resolution bugs (Group B: recursive unions, Record intersection)
- **Parker** → Validation after fixes
- **Model:** All agents use `claude-opus-4.6`
