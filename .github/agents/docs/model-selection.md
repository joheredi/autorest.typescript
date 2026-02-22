# Per-Agent Model Selection — Reference

> Referenced from `squad.agent.md` § Per-Agent Model Selection.

## Layer 3 — Task-Aware Auto-Selection

Governing principle: **cost first, unless code is being written.**

| Task Output | Model | Tier | Rule |
| --- | --- | --- | --- |
| Writing code (implementation, refactoring, test code, bug fixes) | `claude-opus-4.6` | High | Quality and accuracy matter for code. Use standard tier. |
| Writing prompts or agent designs (structured text that functions like code) | `claude-opus-4.6` | High | Prompts are executable — treat like code. |
| NOT writing code (docs, planning, triage, logs, changelogs, mechanical ops) | `claude-opus-4.6` | High | Cost first. Haiku handles non-code tasks. |
| Visual/design work requiring image analysis | `claude-opus-4.6` | Premium | Vision capability required. Overrides cost rule. |

## Role-to-Model Mapping

| Role | Default Model | Why | Override When |
| --- | --- | --- | --- |
| Core Dev / Backend / Frontend | `claude-opus-4.6` | Writes code — quality first | Heavy code gen → `gpt-5.2-codex` |
| Tester / QA | `claude-opus-4.6` | Writes test code — quality first | Simple test scaffolding → `claude-opus-4.6` |
| Lead / Architect | auto (per-task) | Mixed: code review needs quality, planning needs cost | Architecture proposals → premium; triage/planning → haiku |
| Prompt Engineer | auto (per-task) | Mixed: prompt design is like code, research is not | Prompt architecture → sonnet; research/analysis → haiku |
| Copilot SDK Expert | `claude-opus-4.6` | Technical analysis that often touches code | Pure research → `claude-opus-4.6` |
| Designer / Visual | `claude-opus-4.6` | Vision-capable model required | — (never downgrade — vision is non-negotiable) |
| DevRel / Writer | `claude-opus-4.6` | Docs and writing — not code | — |
| Scribe / Logger | `claude-opus-4.6` | Mechanical file ops — cheapest possible | — (never bump Scribe) |
| Git / Release | `claude-opus-4.6` | Mechanical ops — changelogs, tags, version bumps | — (never bump mechanical ops) |

## Task Complexity Adjustments

Apply at most ONE — no cascading:

- **Bump UP to premium:** architecture proposals, reviewer gates, security audits, multi-agent coordination (output feeds 3+ agents)
- **Bump DOWN to fast/cheap:** typo fixes, renames, boilerplate, scaffolding, changelogs, version bumps
- **Switch to code specialist (`gpt-5.2-codex`):** large multi-file refactors, complex implementation from spec, heavy code generation (500+ lines)
- **Switch to analytical diversity (`gemini-3-pro-preview`):** code reviews where a second perspective helps, security reviews, architecture reviews after a rejection

## Fallback Chains

If a spawn fails because the selected model is unavailable (plan restriction, org policy, rate limit, deprecation, or any other reason), silently retry with the next model in the chain. Do NOT tell the user about fallback attempts. Maximum 3 retries before jumping to the nuclear fallback.

```
Premium:  claude-opus-4.6 → claude-opus-4.6-fast → claude-opus-4.5 → claude-sonnet-4.5 → (omit model param)
Standard: claude-opus-4.6  → gpt-5.2-codex → claude-sonnet-4 → gpt-5.2 → (omit model param)
Fast:     claude-opus-4.6-fast → gpt-5.1-codex-mini → gpt-4.1 → gpt-5-mini → (omit model param)
```

`(omit model param)` = call the `task` tool WITHOUT the `model` parameter. The platform uses its built-in default. This is the nuclear fallback — it always works.

**Fallback rules:**

- If the user specified a provider ("use Claude"), fall back within that provider only before hitting nuclear
- Never fall back UP in tier — a fast/cheap task should not land on a premium model
- Log fallbacks to the orchestration log for debugging, but never surface to the user unless asked

## Passing the Model to Spawns

Pass the resolved model as the `model` parameter on every `task` tool call:

```
agent_type: "general-purpose"
model: "{resolved_model}"
mode: "background"
description: "{emoji} {Name}: {brief task summary}"
prompt: |
  ...
```

Only set `model` when it differs from the platform default (`claude-opus-4.6`). If the resolved model IS `claude-opus-4.6`, you MAY omit the `model` parameter — the platform uses it as default.

If you've exhausted the fallback chain and reached nuclear fallback, omit the `model` parameter entirely.

## Spawn Output Format

When spawning, include the model in your acknowledgment:

```
🔧 Fenster (claude-opus-4.6) — refactoring auth module
🎨 Redfoot (claude-opus-4.6 · vision) — designing color system
📋 Scribe (claude-opus-4.6 · fast) — logging session
⚡ Keaton (claude-opus-4.6 · bumped for architecture) — reviewing proposal
📝 McManus (claude-opus-4.6 · fast) — updating docs
```

Include tier annotation only when the model was bumped or a specialist was chosen. Default-tier spawns just show the model name.

## Valid Models (Current Platform Catalog)

- **Premium:** `claude-opus-4.6`, `claude-opus-4.6-fast`, `claude-opus-4.5`
- **Standard:** `claude-opus-4.6`, `claude-sonnet-4`, `gpt-5.2-codex`, `gpt-5.2`, `gpt-5.1-codex-max`, `gpt-5.1-codex`, `gpt-5.1`, `gpt-5`, `gemini-3-pro-preview`
- **Fast/Cheap:** `claude-opus-4.6-fast`, `gpt-5.1-codex-mini`, `gpt-5-mini`, `gpt-4.1`
