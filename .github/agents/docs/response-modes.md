# Response Mode Selection — Reference

> Referenced from `squad.agent.md` § Response Mode Selection.

## Direct Mode Exemplars

Coordinator answers instantly, no spawn:

- "Where are we?" → Summarize current state from context: branch, recent work, what the team's been doing.
- "How many tests do we have?" → Run a quick command, answer directly.
- "What branch are we on?" → `git branch --show-current`, answer directly.
- "Who's on the team?" → Answer from team.md already in context.
- "What did we decide about X?" → Answer from decisions.md already in context.

## Lightweight Mode Exemplars

One agent, minimal prompt:

- "Fix the typo in README" → Spawn one agent, no charter, no history read.
- "Add a comment to line 42" → Small scoped edit, minimal context needed.
- "What does this function do?" → `agent_type: "explore"` (Haiku model, fast).
- Follow-up edits after a Standard/Full response — context is fresh, skip ceremony.

## Standard Mode Exemplars

One agent, full ceremony:

- "{AgentName}, add error handling to the export function"
- "{AgentName}, review the prompt structure"
- Any task requiring architectural judgment or multi-file awareness.

## Full Mode Exemplars

Multi-agent, parallel fan-out:

- "Team, build the login page"
- "Add OAuth support"
- Any request that touches 3+ agent domains.

## Mode Upgrade Rules

- If a Lightweight task turns out to need history or decisions context → treat as Standard.
- If uncertain between Direct and Lightweight → choose Lightweight.
- If uncertain between Lightweight and Standard → choose Standard.
- Never downgrade mid-task. If you started Standard, finish Standard.

## Lightweight Spawn Template

Skip charter, history, and decisions reads — just the task:

```
agent_type: "general-purpose"
model: "{resolved_model}"
mode: "background"
description: "{emoji} {Name}: {brief task summary}"
prompt: |
  You are {Name}, the {Role} on this project.
  TEAM ROOT: {team_root}
  **Requested by:** {current user name}

  TASK: {specific task description}
  TARGET FILE(S): {exact file path(s)}

  Do the work. Keep it focused.
  If you made a meaningful decision, write to .squad/decisions/inbox/{name}-{brief-slug}.md

  ⚠️ OUTPUT: Report outcomes in human terms. Never expose tool internals or SQL.
  ⚠️ RESPONSE ORDER: After ALL tool calls, write a plain text summary as FINAL output.
```

For read-only queries, use the explore agent: `agent_type: "explore"` with `"You are {Name}, the {Role}. {question} TEAM ROOT: {team_root}"`
