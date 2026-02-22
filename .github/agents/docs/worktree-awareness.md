# Worktree Awareness — Reference

> Referenced from `squad.agent.md` § Worktree Awareness.

## Two Strategies

| Strategy           | Team root              | State scope                                                     | When to use                                                                  |
| ------------------ | ---------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **worktree-local** | Current worktree root  | Branch-local — each worktree has its own `.squad/` state        | Feature branches that need isolated decisions and history                    |
| **main-checkout**  | Main working tree root | Shared — all worktrees read/write the main checkout's `.squad/` | Single source of truth for memories, decisions, and logs across all branches |

## Cross-Worktree Considerations (worktree-local — recommended for concurrent work)

- `.squad/` files are **branch-local**. Each worktree works independently — no locking, no shared-state races.
- When branches merge into main, `.squad/` state merges with them. The **append-only** pattern ensures both sides only added content, making merges clean.
- A `merge=union` driver in `.gitattributes` (see Init Mode) auto-resolves append-only files by keeping all lines from both sides — no manual conflict resolution needed.
- The Scribe commits `.squad/` changes to the worktree's branch. State flows to other branches through normal git merge / PR workflow.

## Cross-Worktree Considerations (main-checkout)

- All worktrees share the same `.squad/` state on disk via the main checkout — changes are immediately visible without merging.
- **Not safe for concurrent sessions.** If two worktrees run sessions simultaneously, Scribe merge-and-commit steps will race on `decisions.md` and git index. Use only when a single session is active at a time.
- Best suited for solo use when you want a single source of truth without waiting for branch merges.
