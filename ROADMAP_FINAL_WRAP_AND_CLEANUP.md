# BarndAI Creative Studio — Final Roadmap Wrap and Cleanup

## Current Repo

```text
Repository: costavong-pixel/barndai-creative-studio
Working branch: dev/barnd-api-router
Upstream source: Anil-matcha/Open-Generative-AI
Purpose: Convert Open-Generative-AI into BarndAI Creative Studio using BarndAI's own server-side API router.
```

## Current Status

This repo is now the correct working repo. It is the fork of the upstream Open-Generative-AI project and contains the real source code Cursor should audit and modify.

The earlier empty repo `costavong-pixel/ai-studio-ui` is no longer the working target. Obsolete roadmap/import files were removed from that repo to prevent Cursor from following the wrong source.

## Source-of-Truth Files

Cursor should read these files in this order:

```text
1. CURSOR_START_HERE.md
2. BARNDAI_CREATIVE_STUDIO_CURSOR_BUILD_PLAN.md
3. specs/barnd-api-router/optional-agent-skills-decision-gate.md
4. ROADMAP_FINAL_WRAP_AND_CLEANUP.md
```

`CURSOR_START_HERE.md` is the operational start file.

`BARNDAI_CREATIVE_STUDIO_CURSOR_BUILD_PLAN.md` is the full build plan.

`optional-agent-skills-decision-gate.md` keeps Garden Skills deferred until platform testing.

This file is the final human-readable wrap and cleanup note.

## Business Direction

The project should not become just another image generator clone.

The real business asset is:

```text
BarndAI API Router
Provider Registry
Model Registry
Admin API Settings
Cost Control
Fallback Control
Auto Deploy
```

The best niche is:

```text
A white-label creative AI studio for small businesses and agencies that want image/video generation without managing many provider accounts, API keys, pricing rules, model routing, and fallback logic.
```

Later, the same engine can power:

```text
ReelAna
Tail&Home digital affiliate content
Slab Pizza / Slab Burgers local promo campaigns
BarndAI agency content factory
White-label AI creative tools
```

## Low-Interruption Cursor Protocol

Cursor should work more and ask less.

Cursor can proceed without asking the user for every small step through this safe early batch:

```text
Batch 1:
1. Repo audit
2. Create specs/barnd-api-router/repo-audit.md
3. Create missing Spec Kit planning files
4. Create BarndAI client adapter
5. Create mock /api/barnd routes
6. Replace one text-to-image flow only
7. Run available build/test commands
8. Commit the safe batch
```

Cursor should stop only for true blockers:

```text
Needs API key
Needs VPS/GitHub secret
Wants to delete original MuAPI files
Wants to rewrite major UI
Build failure requires architecture decision
Unsure which real provider to connect
Needs domain/Nginx/production deployment decision
```

Cursor should not stop for minor implementation choices that are already covered by the roadmap.

## Immediate Next Cursor Prompt

Paste this into Cursor:

```text
Read CURSOR_START_HERE.md, BARNDAI_CREATIVE_STUDIO_CURSOR_BUILD_PLAN.md, specs/barnd-api-router/optional-agent-skills-decision-gate.md, and ROADMAP_FINAL_WRAP_AND_CLEANUP.md completely.

Work in low-interruption mode.

Proceed through Batch 1:
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
- Do not expose provider API keys to browser code.
- Browser must call /api/barnd/* routes only.
- Mock generation must work without any provider key.
- Do not install garden-skills now.
- Stop only for true blockers listed in ROADMAP_FINAL_WRAP_AND_CLEANUP.md.

At the end, report:
- files changed
- current API flow
- test results
- remaining risks
- next recommended step
```

## MVP Definition

MVP is complete when:

```text
1. Existing Open-Generative-AI UI runs.
2. One text-to-image flow calls /api/barnd/generate.
3. Mock generation works with no provider key.
4. One real provider can be enabled from server-side config later.
5. Provider/model registry exists.
6. Browser never sees provider secrets.
7. Admin API settings page exists.
8. GitHub Actions auto deploy exists.
9. PM2 can run the app on VPS.
10. Production build passes.
```

## Do Not Do Yet

Do not do these before mock generation works:

```text
Garden Skills install
Seedance/Kling/OpenRouter/ComfyUI integration
Stripe/billing
Public SaaS account system
Full UI redesign
Cloudflare R2 media storage
n8n autopost
RSS feed
ReelAna integration
Tail&Home integration
```

## Garden Skills Decision

`garden-skills` is deferred.

Decision point:

```text
Revisit after mock generation works and the platform is testable.
```

Possible later installs:

```text
web-design-engineer — for admin dashboard / landing page polish
gpt-image-2 — for prompt template library and visual generation workflows
```

Do not install the full skills pack. If approved later, install one selected skill only.

## Deployment Direction

Auto deploy should be added later after the mock API and first UI flow are proven.

Preferred deployment model:

```text
GitHub main branch
↓
GitHub Actions
↓
SSH to VPS
↓
git pull
↓
npm ci
↓
npm run build
↓
pm2 restart barnd-creative-studio
```

VPS defaults:

```text
App path: /opt/barnd/open-generative-ai
Port: 3001
PM2 process: barnd-creative-studio
```

Secrets required later:

```text
VPS_HOST
VPS_USER
VPS_SSH_KEY
VPS_PORT
APP_PATH
```

Provider keys stay only in the server `.env`, never in GitHub.

## Cleanup Completed

Completed cleanup actions:

```text
- Confirmed real fork: costavong-pixel/barndai-creative-studio
- Created dev/barnd-api-router branch
- Added main Cursor build plan
- Added optional Garden Skills decision gate
- Added low-interruption Cursor start file
- Removed obsolete roadmap/import files from costavong-pixel/ai-studio-ui to avoid confusion
```

## Final Rule

The backend control layer is the business.

Cursor should first prove the pipe:

```text
Existing UI
↓
BarndAI adapter
↓
/api/barnd/generate
↓
mock provider
↓
/api/barnd/result/{job_id}
↓
UI displays result
```

After that works, add real providers and deployment.
