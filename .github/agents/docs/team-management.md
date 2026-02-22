# Team Management — Reference

> Referenced from `squad.agent.md` § Adding/Removing Team Members, Casting & Persistent Naming.

## Adding Team Members

If the user says "I need a designer" or "add someone for DevOps":

1. **Allocate a name** from the current assignment's universe (read from `.squad/casting/history.json`). If the universe is exhausted, apply overflow handling (see below).
2. **Check plugin marketplaces.** If `.squad/plugins/marketplaces.json` exists and contains registered sources, browse each marketplace for plugins matching the new member's role or domain. If matches are found, present them: _"Found '{plugin-name}' in {marketplace} — want me to install it as a skill for {CastName}?"_ If the user accepts, copy the plugin content into `.squad/skills/{plugin-name}/SKILL.md` or merge relevant instructions into the agent's charter. If no marketplaces are configured, skip silently.
3. Generate a new charter.md + history.md (seeded with project context from team.md), using the cast name. If a plugin was installed in step 2, incorporate its guidance into the charter.
4. **Update `.squad/casting/registry.json`** with the new agent entry.
5. Add to team.md roster.
6. Add routing entries to routing.md.
7. Say: _"✅ {CastName} joined the team as {Role}."_

## Removing Team Members

1. Move their folder to `.squad/agents/_alumni/{name}/`
2. Remove from team.md roster
3. Update routing.md
4. **Update `.squad/casting/registry.json`**: set the agent's `status` to `"retired"`. Do NOT delete the entry — the name remains reserved.
5. Their knowledge is preserved, just inactive.

## Plugin Marketplace

**On-demand reference:** Read `.squad/templates/plugin-marketplace.md` for marketplace state format, CLI commands, installation flow, and graceful degradation.

- Check `.squad/plugins/marketplaces.json` during Add Team Member flow (after name allocation, before charter)
- Present matching plugins for user approval
- Install: copy to `.squad/skills/{plugin-name}/SKILL.md`, log to history.md
- Skip silently if no marketplaces configured

## Casting & Persistent Naming

Agent names are drawn from a single fictional universe per assignment. Names are persistent identifiers — they do NOT change tone, voice, or behavior. No role-play. No catchphrases. No character speech patterns. Names are easter eggs: never explain or document the mapping rationale.

### Universe Allowlist

**On-demand reference:** Read `.squad/templates/casting-reference.md` for the full universe table, selection algorithm, and casting state file schemas.

- ONE UNIVERSE PER ASSIGNMENT. NEVER MIX.
- 31 universes available (capacity 6–25). Selection is deterministic: score by size_fit + shape_fit + resonance_fit + LRU.

### Name Allocation

1. Choose character names that imply pressure, function, or consequence — NOT authority or literal role descriptions.
2. Each agent gets a unique name. No reuse within the same repo unless an agent is explicitly retired and archived.
3. **Scribe is always "Scribe"**, **Ralph is always "Ralph"**, **@copilot is always "@copilot"** — all exempt from casting.
4. Store the mapping in `.squad/casting/registry.json`. Record in `.squad/casting/history.json`.

### Overflow Handling

If agent_count grows beyond available names mid-assignment, do NOT switch universes. Apply in order:

1. **Diegetic Expansion:** Use recurring/minor/peripheral characters from the same universe.
2. **Thematic Promotion:** Expand to the closest natural parent universe family that preserves tone.
3. **Structural Mirroring:** Assign names that mirror archetype roles still drawn from the universe family.

Existing agents are NEVER renamed during overflow.

### Casting State Files

The casting system maintains state in `.squad/casting/` with three files: `policy.json` (config), `registry.json` (persistent name registry), and `history.json` (universe usage history + snapshots). See `.squad/templates/casting-reference.md` for full JSON schemas.

### Migration — Already-Squadified Repos

When `.squad/team.md` exists but `.squad/casting/` does not:

1. **Do NOT rename existing agents.** Mark every existing agent as `legacy_named: true` in the registry.
2. Initialize `.squad/casting/` with default policy.json, a registry.json populated from existing agents, and empty history.json.
3. For any NEW agents added after migration, apply the full casting algorithm.
