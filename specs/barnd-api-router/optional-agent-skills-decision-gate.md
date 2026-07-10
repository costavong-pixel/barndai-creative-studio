# Optional Agent Skills Decision Gate

## Purpose

This note adds `ConardLi/garden-skills` to the BarndAI Creative Studio roadmap as a **future decision gate**, not as a required dependency.

The project should not install or activate `garden-skills` during the early backend/API conversion phases.

Current priority remains:

```text
1. Repo audit
2. Spec Kit planning files
3. BarndAI API adapter
4. Mock /api/barnd routes
5. Replace one generation flow
6. Provider/model registry
7. First real provider
8. Admin settings page
9. Auto deploy
```

`garden-skills` should only be considered once the platform is testable.

---

## Decision Timing

Review this decision after one of these milestones:

```text
Milestone A: Phase 4 complete — mock generation works through /api/barnd/generate
Milestone B: Phase 7 complete — one real provider works server-side
Milestone C: Platform testing begins — UI, admin page, and provider/model registry can be tested end to end
```

Do not install skills before Milestone A.

---

## Why Not Install Now

The current work is backend architecture and migration control.

The risk of installing skills too early is not a code/runtime conflict. The risk is **agent behavior conflict**:

```text
Spec Kit roadmap says: audit, plan, adapter, API router, test
Garden skills may encourage: design polish, prompt templates, article/video output, frontend experiments
```

During API conversion, Cursor should stay strict and boring.

---

## Candidate Skills to Review Later

### 1. web-design-engineer

Use case:

```text
/admin/api-settings
provider dashboard
model registry UI
cost/fallback control panel
agency white-label landing page
```

Decision rule:

```text
Use if the first working backend is stable and the admin/UI needs polish.
Do not use during API migration.
```

### 2. gpt-image-2

Use case:

```text
prompt template library
restaurant promo generator
affiliate visual generator
UGC storyboard generator
product visual prompt packs
```

Decision rule:

```text
Use after image generation works through BarndAI router.
Do not use before provider routing is stable.
```

### 3. web-video-presentation

Use case:

```text
BarndAI product demo video
agency sales deck
platform explainer
feature launch video
```

Decision rule:

```text
Use only after MVP functionality exists and a demo/marketing asset is needed.
```

### 4. beautiful-article

Use case:

```text
launch article
product documentation
case study
agency explainer
```

Decision rule:

```text
Use only for content/documentation stage, not implementation stage.
```

### 5. kb-retriever

Use case:

```text
BarndAI Knowledge Base
local docs retrieval
future support-agent documentation search
```

Decision rule:

```text
Not needed for Creative Studio MVP unless the project starts using a large local knowledge directory.
```

---

## Install Rule If Approved Later

Install only one selected skill at a time.

For Cursor/generic agents, use:

```bash
mkdir -p .agents/skills
# Example only, do not run before approval:
git clone https://github.com/ConardLi/garden-skills.git /tmp/garden-skills
cp -r /tmp/garden-skills/skills/web-design-engineer .agents/skills/
```

Or with the skills CLI:

```bash
npx skills add ConardLi/garden-skills -s web-design-engineer
```

Do not install the full pack unless there is a clear reason.

---

## Decision Checklist

Before adding any skill, confirm:

```text
- Backend MVP is stable
- npm build passes
- /api/barnd/generate works
- no provider secrets leak to browser
- the skill supports the immediate next task
- the skill will not override the Spec Kit roadmap
- only one skill is installed
- installation is committed separately
```

---

## Current Decision

Status:

```text
Deferred
```

Reason:

```text
Keep Cursor focused on BarndAI API router and platform foundation first.
Revisit during platform testing or UI/design phase.
```
