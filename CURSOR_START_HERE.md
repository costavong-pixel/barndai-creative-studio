# Cursor Start Here — Low-Interruption Build Protocol

## Purpose

This file is the working instruction for Cursor.

The user wants Cursor to **program more and ask fewer questions**.

Cursor should work autonomously through the safe early phases and only stop when there is a real blocker, destructive decision, or secret/production input required.

---

## Required Reading Before Work

Read these files first:

```text
BARNDAI_CREATIVE_STUDIO_CURSOR_BUILD_PLAN.md
specs/barnd-api-router/optional-agent-skills-decision-gate.md
```

If `specs/barnd-api-router/optional-agent-skills-decision-gate.md` does not exist locally yet, continue without installing any agent skills.

Do **not** install `garden-skills` during the API-router MVP.

---

## Main Goal

Convert this fork of `Anil-matcha/Open-Generative-AI` into **BarndAI Creative Studio** by replacing direct MuAPI/provider calls with BarndAI-controlled internal API routes.

The priority is:

```text
1. Stable API control
2. No secret leak
3. Mock generation works
4. One UI generation flow uses /api/barnd/generate
5. One real provider later
6. Auto deploy later
```

Do **not** redesign the UI during the backend/API-router MVP.

---

## Low-Interruption Autonomy Rules

Cursor may proceed without asking the user for approval through these stages:

```text
Stage A: Repo audit
Stage B: Spec Kit planning files
Stage C: BarndAI client adapter
Stage D: Mock /api/barnd routes
Stage E: Replace one text-to-image flow with mock BarndAI API
Stage F: Local build/test fixes for the above
```

Cursor must stop only for:

```text
1. Any destructive deletion of original source files
2. Any production secret/API key required
3. Any GitHub/VPS credential required
4. Any database/schema decision not covered by the roadmap
5. Any major UI rewrite temptation
6. Any change that would expose provider keys to browser code
7. Any build failure that requires changing core architecture
8. Any dependency conflict that requires replacing the app framework
9. Any license/compliance concern
10. Any uncertainty about which provider to connect as the first real provider
```

Cursor should **not** stop for tiny implementation choices like file naming, import path fixes, TypeScript/JS compatibility fixes, mock job storage, or route location adaptation if the repo structure makes the correct path obvious.

---

## Working Branch

Work only on:

```text
dev/barnd-api-router
```

Do not commit directly to `main` unless the user explicitly says so.

---

## What Cursor Should Do First

Start with this sequence:

```text
1. Audit the repo.
2. Create specs/barnd-api-router/repo-audit.md.
3. Create missing planning files if not present.
4. Create src/lib/barndApi.js.
5. Create mock /api/barnd/* routes in the correct route location.
6. Replace only one text-to-image flow to use BarndAI mock API.
7. Run build/test commands available in package.json.
8. Commit the completed safe batch.
```

Do not connect OpenAI, Seedance, Kling, DeepSeek, OpenRouter, or ComfyUI during this first batch.

---

## Exact First Prompt To Follow

```text
Read CURSOR_START_HERE.md and BARNDAI_CREATIVE_STUDIO_CURSOR_BUILD_PLAN.md completely.

Work in low-interruption mode.

Proceed through the safe early stages without asking me every step:

1. Repo audit
2. Create specs/barnd-api-router/repo-audit.md
3. Create missing Spec Kit planning files
4. Create BarndAI client adapter
5. Create mock /api/barnd routes
6. Replace one text-to-image flow only
7. Run available build/test commands
8. Commit the safe batch

Rules:
- Do not rewrite the UI.
- Do not delete original MuAPI files yet.
- Do not expose any provider API keys to browser code.
- Browser must call /api/barnd/* routes only.
- Mock generation must work without any provider key.
- Do not install garden-skills now.
- Stop only for real blockers listed in CURSOR_START_HERE.md.

At the end, report:
- files changed
- current API flow
- test results
- remaining risks
- next recommended step
```

---

## Batch 1 Definition of Done

Batch 1 is complete when:

```text
1. repo-audit.md exists
2. spec.md exists
3. plan.md exists
4. tasks.md exists
5. acceptance-tests.md exists
6. risks.md exists
7. src/lib/barndApi.js exists
8. mock /api/barnd/generate works
9. mock /api/barnd/result/[id] works
10. mock /api/barnd/upload works or returns clear MVP placeholder
11. one text-to-image UI flow calls /api/barnd/generate
12. no direct api.muapi.ai call happens for that flow
13. no provider secret is exposed
14. build/test command result is reported
15. one commit is made on dev/barnd-api-router
```

---

## Batch 2 Preview — Do Not Start Unless Batch 1 Is Stable

Batch 2 can include:

```text
provider/model registry
mockProvider router
OpenAI image provider adapter
read-only admin API settings page
```

Do not start Batch 2 until Batch 1 is stable or the user approves continuing.

---

## Garden Skills Decision

Do not install `ConardLi/garden-skills` during Batch 1.

Revisit only after platform testing begins.

Potential later candidates:

```text
web-design-engineer — for admin dashboard / landing page polish
gpt-image-2 — for prompt template library / creative generator workflow
```

Garden skills are optional acceleration tools, not part of the core API architecture.

---

## Business Priority Reminder

The business is not just another AI image generator.

The asset is:

```text
BarndAI API Router
Provider Registry
Model Registry
Admin API Settings
Cost/Fallback Control
Reusable Creative Engine
```

The first working milestone should prove that BarndAI controls the generation pipeline through internal routes.
