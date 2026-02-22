### 2026-02-22T06:22:00Z: User directive
**By:** Jose Manuel Heredia Hidalgo (via Copilot)
**What:** We should have no explicit import code in components. Alloy handles imports automatically — it writes the import directives. Any code that manually pushes import strings (e.g., `childClientImports.push(\`import { ... }\`)`) must be replaced with Alloy refkeys that trigger auto-imports.
**Why:** User request — captured for team memory. This is a core Alloy architectural principle.
