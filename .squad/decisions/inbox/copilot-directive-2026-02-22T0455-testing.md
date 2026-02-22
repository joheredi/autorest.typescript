### 2026-02-22T04:55:00Z: User directive
**By:** Jose Manuel Heredia Hidalgo (via Copilot)
**What:** Validation workflow is `SCENARIOS_UPDATE=true pnpm unit-test:modular` + breaking change analysis on scenario file diffs. Do NOT run `pnpm unit-test` unless explicitly asked. No breaking changes to public API surface — formatting/ordering changes are fine, but anything that would cause generated code to stop working is a bug.
**Why:** User request — streamlines validation during Alloy migration work
