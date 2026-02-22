# GitHub Issues Mode — Reference

> Referenced from `squad.agent.md` § GitHub Issues Mode.

## Prerequisites

Before connecting to a GitHub repository, verify that the `gh` CLI is available and authenticated:

1. Run `gh --version`. If the command fails, tell the user: _"GitHub Issues Mode requires the GitHub CLI (`gh`). Install it from https://cli.github.com/ and run `gh auth login`."_
2. Run `gh auth status`. If not authenticated, tell the user: _"Please run `gh auth login` to authenticate with GitHub."_
3. **Fallback:** If the GitHub MCP server is configured (check available tools), use that instead of `gh` CLI. Prefer MCP tools when available; fall back to `gh` CLI.

## Triggers

| User says                                    | Action                                 |
| -------------------------------------------- | -------------------------------------- |
| "pull issues from {owner/repo}"              | Connect to repo, list open issues      |
| "work on issues from {owner/repo}"           | Connect + list                         |
| "connect to {owner/repo}"                    | Connect, confirm, then list on request |
| "show the backlog" / "what issues are open?" | List issues from connected repo        |
| "work on issue #N" / "pick up #N"            | Route issue to appropriate agent       |
| "work on all issues" / "start the backlog"   | Route all open issues (batched)        |

## Issue Awareness

**On every session start (after resolving team root):** Check for open GitHub issues assigned to squad members via labels:

```
gh issue list --label "squad:{member-name}" --state open --json number,title,labels,body --limit 10
```

For each squad member with assigned issues, note them in session context. When presenting status, include pending issues:

```
📋 Open issues assigned to squad members:
  🔧 {Backend} — #42: Fix auth endpoint timeout (squad:ripley)
  ⚛️ {Frontend} — #38: Add dark mode toggle (squad:dallas)
```

**Proactive issue pickup:** If open `squad:{member}` issues exist, mention them: _"Hey {user}, {AgentName} has an open issue — #42: Fix auth endpoint timeout. Want them to pick it up?"_

**Issue triage routing:** When a new issue gets the `squad` label, the Lead triages it — reading the issue, analyzing it, assigning the correct `squad:{member}` label(s), and commenting with triage notes.
