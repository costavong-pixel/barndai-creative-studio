# BarndAI Creative Studio — Cursor Build Plan

## Project Goal

Convert `Anil-matcha/Open-Generative-AI` into **BarndAI Creative Studio**, using BarndAI's own server-side API router instead of the original MuAPI/direct provider setup.

The goal is **not** to rewrite the full UI.

The goal is to keep the existing studio interface and replace the generation backend with a clean BarndAI-controlled API layer.

---

## Business Purpose

This project is not just an AI image/video demo.

The bigger business purpose is to create a reusable creative engine for:

1. BarndAI Creative Studio
2. ReelAna content generation
3. Tail&Home digital affiliate content
4. Slab Pizza / Slab Burgers local promo content
5. Future agency white-label AI creative tool
6. Future AI content factory with provider cost control

The money niche is:

> A white-label AI creative studio for small businesses and agencies that want image/video generation without managing 10 different AI providers, API keys, model pricing, fallbacks, and generation workflows.

Therefore, the most important asset is not only the frontend.

The most important asset is:

```text
BarndAI API Router
Provider Registry
Model Registry
Cost Control
Fallback Logic
Admin API Settings
Auto Deploy
```

---

## Core Rule

Do not let this become random vibe-coding.

Every change must follow:

```text
Spec
↓
Plan
↓
Tasks
↓
Implementation
↓
Test
↓
Commit
```

---

## Non-Negotiable Technical Rules

1. Do not rewrite the entire UI.
2. Do not delete working original files until replacement is tested.
3. Do not expose provider API keys to the browser.
4. Do not store production provider keys in GitHub.
5. Browser must call only internal BarndAI routes.
6. All provider calls must happen server-side.
7. Use adapter pattern.
8. First make mock generation work.
9. Then connect one real provider.
10. Do not connect many providers at once.
11. Every phase must have acceptance tests.
12. GitHub Actions deploys only from `main`.
13. Cursor work should happen on a dev branch first.
14. No production deploy until mock flow works.
15. Keep `.env` on server only.
16. Add `.env.example` but never commit real secrets.
17. Admin API settings must be password protected before production.
18. Do not use localStorage for provider secrets.
19. Do not hardcode OpenAI, Kling, Seedance, DeepSeek, or any provider directly into UI components.
20. Provider/model behavior must be controlled by registry/config.

---

## Target Architecture

```text
Existing Open-Generative-AI Studio UI
↓
BarndAI Client Adapter
src/lib/barndApi.js
↓
Internal Next.js API Routes
/app/api/barnd/*
↓
BarndAI Provider Router
src/server/barnd/*
↓
Provider Adapter
OpenAI / Seedance / Kling / DeepSeek / ComfyUI / Future Providers
↓
Normalized Job Result
↓
Studio UI displays generated media
```

---

## Final API Flow

```text
User enters prompt
↓
Studio UI calls BarndAI adapter
↓
barndApi.js calls /api/barnd/generate
↓
Server validates input
↓
Server reads model registry
↓
Server selects provider
↓
Server submits job to provider
↓
Server returns job_id
↓
UI polls /api/barnd/result/{job_id}
↓
Server checks job status
↓
Server returns final image/video URL
↓
UI displays result
```

---

## Branch Strategy

Use this branch flow:

```text
main = original fork / stable baseline
dev/barnd-api-router = Cursor implementation branch
```

Cursor should not commit directly to `main` during development unless the user explicitly approves.

Recommended commands:

```bash
git checkout dev/barnd-api-router
```

After testing:

```bash
git checkout main
git merge dev/barnd-api-router
git push origin main
```

Only pushing to `main` should trigger production auto deploy later.

---

# Phase 0 — Repo Audit First

## Cursor Instruction

Before editing code, audit the repository.

Find every file related to:

```text
MuAPI
muapi
api.muapi.ai
model registry
models.js
generation submit
polling
upload
image generation
video generation
lip sync
workflow generation
API key usage
environment variables
Vite proxy
Next API routes
```

## Required Output Before Coding

Cursor must output:

```text
1. Current generation flow
2. Files that call MuAPI
3. Files that import model definitions
4. Files that handle upload
5. Files that handle polling
6. Files that should be changed
7. Files that should not be touched
8. Migration risks
9. First safe implementation step
10. Test checklist
```

## Commands Cursor Can Use

```bash
grep -R "Muapi" -n .
grep -R "muapi" -n .
grep -R "api.muapi.ai" -n .
grep -R "generateImage" -n .
grep -R "generateVideo" -n .
grep -R "pollForResult" -n .
grep -R "uploadFile" -n .
grep -R "models" -n src packages app
grep -R "VITE_" -n .
grep -R "NEXT_PUBLIC" -n .
find . -maxdepth 5 -type f | grep -E "api|route|models|muapi|studio|provider|upload|generate"
```

## Phase 0 Acceptance Criteria

Phase 0 is complete only when Cursor shows:

```text
- Complete file map
- Safe migration plan
- No code modified yet except specs/barnd-api-router/repo-audit.md
```

---

# Phase 1 — Add Spec Kit Structure

## Purpose

Spec Kit should keep Cursor from going off-road.

Add planning files before implementation.

## Files to Create

```text
specs/barnd-api-router/spec.md
specs/barnd-api-router/plan.md
specs/barnd-api-router/tasks.md
specs/barnd-api-router/acceptance-tests.md
specs/barnd-api-router/risks.md
specs/barnd-api-router/repo-audit.md
```

## spec.md Content

Cursor should create a product/technical spec with:

```text
Feature Name:
BarndAI API Router Integration

Goal:
Replace direct MuAPI/provider usage with BarndAI-controlled server-side API routes.

User Story:
As the BarndAI owner, I want Open-Generative-AI to use my own API router so I can control providers, costs, model access, fallbacks, and future SaaS plans.

Main Requirements:
- Keep existing studio UI.
- Add BarndAI client adapter.
- Add internal /api/barnd/* routes.
- Add provider registry.
- Add model registry.
- Add mock generation mode.
- Add one real provider adapter first.
- Add admin API settings page.
- Add auto deploy.
- Keep provider keys server-side.
- Add tests for submit, poll, upload, and no browser key exposure.

Out of Scope for MVP:
- Full marketplace
- Multi-user billing
- Public SaaS account system
- Full workflow builder rewrite
- All model integrations
- Mobile app
- Full database migration
```

## plan.md Content

Cursor should create a phased implementation plan:

```text
Phase 0: Audit repo
Phase 1: Add Spec Kit planning files
Phase 2: Add BarndAI client adapter
Phase 3: Add mock server API routes
Phase 4: Replace one text-to-image flow
Phase 5: Add provider/model registry
Phase 6: Add first real provider adapter
Phase 7: Add upload support
Phase 8: Add polling/result normalization
Phase 9: Add admin API settings page
Phase 10: Add GitHub Actions auto deploy
Phase 11: Production verification
```

## tasks.md Content

Cursor should write implementation tasks as checkboxes.

```markdown
- [ ] Audit MuAPI usage
- [ ] Create src/lib/barndApi.js
- [ ] Create app/api/barnd/generate/route.js
- [ ] Create app/api/barnd/result/[id]/route.js
- [ ] Create app/api/barnd/upload/route.js
- [ ] Add mock job store
- [ ] Replace one text-to-image flow
- [ ] Confirm browser calls /api/barnd/generate
- [ ] Add provider registry
- [ ] Add model registry
- [ ] Add OpenAI image provider adapter
- [ ] Add admin API settings page
- [ ] Add GitHub Actions deploy
- [ ] Add PM2 ecosystem config
- [ ] Add DEPLOY.md
```

## Phase 1 Acceptance Criteria

```text
- specs/barnd-api-router/ exists
- spec.md exists
- plan.md exists
- tasks.md exists
- acceptance-tests.md exists
- risks.md exists
- No app logic changed yet
```

---

# Phase 2 — Create BarndAI Client Adapter

## Purpose

Create one stable client adapter that the UI can call instead of MuAPI.

## File to Create

```text
src/lib/barndApi.js
```

## Required Exports

The adapter should expose similar methods to the current API client:

```javascript
generateImage()
generateVideo()
generateI2I()
generateI2V()
processV2V()
processLipSync()
uploadFile()
pollForResult()
```

## Required Behavior

The browser adapter must call only internal routes:

```text
/api/barnd/generate
/api/barnd/upload
/api/barnd/result/:id
/api/barnd/models
/api/barnd/providers
```

## Example Shape

```javascript
export class BarndApiClient {
  constructor(options = {}) {
    this.baseUrl = options.baseUrl || "";
  }

  async generateImage(payload) {
    return this.submitGeneration({ capability: "text-to-image", ...payload });
  }

  async generateVideo(payload) {
    return this.submitGeneration({ capability: "text-to-video", ...payload });
  }

  async generateI2I(payload) {
    return this.submitGeneration({ capability: "image-to-image", ...payload });
  }

  async generateI2V(payload) {
    return this.submitGeneration({ capability: "image-to-video", ...payload });
  }

  async processV2V(payload) {
    return this.submitGeneration({ capability: "video-to-video", ...payload });
  }

  async processLipSync(payload) {
    return this.submitGeneration({ capability: "lip-sync", ...payload });
  }

  async submitGeneration(payload) {
    const res = await fetch(`${this.baseUrl}/api/barnd/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(`BarndAI generation failed: ${res.status}`);
    return res.json();
  }

  async uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${this.baseUrl}/api/barnd/upload`, {
      method: "POST",
      body: formData
    });

    if (!res.ok) throw new Error(`BarndAI upload failed: ${res.status}`);
    return res.json();
  }

  async pollForResult(jobId, options = {}) {
    const intervalMs = options.intervalMs || 2000;
    const maxAttempts = options.maxAttempts || 60;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const res = await fetch(`${this.baseUrl}/api/barnd/result/${jobId}`);
      if (!res.ok) throw new Error(`BarndAI polling failed: ${res.status}`);

      const data = await res.json();
      if (data.status === "completed" || data.status === "failed") return data;

      await new Promise((resolve) => setTimeout(resolve, intervalMs));
    }

    throw new Error("BarndAI polling timed out");
  }
}

export default BarndApiClient;
```

## Phase 2 Acceptance Criteria

```text
- src/lib/barndApi.js exists
- It has submit, upload, and poll methods
- It does not contain provider API keys
- It does not call api.muapi.ai
- No UI flow changed yet
```

---

# Phase 3 — Add Mock Internal API Routes

## Purpose

Create internal API routes that work before real providers are connected.

## Files to Create

```text
app/api/barnd/generate/route.js
app/api/barnd/result/[id]/route.js
app/api/barnd/upload/route.js
app/api/barnd/models/route.js
app/api/barnd/providers/route.js
```

If this repo uses `src/app`, then create these under:

```text
src/app/api/barnd/*
```

Cursor must inspect the repo structure and choose the correct route location.

## Mock Generate Route

`/api/barnd/generate` should:

```text
- Accept POST JSON
- Validate capability
- Validate prompt when required
- Create job_id
- Return status queued/processing
- Store mock job in memory or local temporary store
```

Example response:

```json
{
  "ok": true,
  "job_id": "barnd_mock_123456",
  "status": "processing",
  "provider": "mock",
  "model": "barnd-mock-image"
}
```

## Mock Result Route

`/api/barnd/result/{id}` should return a fake completed result.

Example response:

```json
{
  "ok": true,
  "job_id": "barnd_mock_123456",
  "status": "completed",
  "outputs": [
    {
      "type": "image",
      "url": "https://placehold.co/1024x1024?text=BarndAI+Mock"
    }
  ],
  "provider": "mock",
  "model": "barnd-mock-image"
}
```

## Mock Upload Route

`/api/barnd/upload` should:

```text
- Accept multipart upload
- Validate file type
- Validate file size
- Return mock uploaded URL or local path
```

## Phase 3 Acceptance Criteria

```text
- /api/barnd/generate works
- /api/barnd/result/{id} works
- /api/barnd/upload works
- /api/barnd/models works
- /api/barnd/providers works
- Mock mode works without any API key
- No provider secret is returned to browser
```

---

# Phase 4 — Replace One Generation Flow First

## Purpose

Do not replace everything at once.

Replace only one flow first, preferably text-to-image.

## Cursor Instruction

Find the text-to-image flow that currently uses MuAPI.

Change only that flow to use:

```text
src/lib/barndApi.js
```

Do not delete the old MuAPI file yet.

## Required Test

In browser devtools Network tab, generation must call:

```text
/api/barnd/generate
```

It must not call:

```text
https://api.muapi.ai
```

## Phase 4 Acceptance Criteria

```text
- Existing UI loads
- Text-to-image prompt submit works
- Browser calls /api/barnd/generate
- Result polling works
- Mock image/video result appears
- No provider API key visible in browser
- Other flows are not broken
```

---

# Phase 5 — Provider and Model Registry

## Purpose

Add the business-control layer.

This allows BarndAI to control:

```text
enabled models
free/pro/internal models
cost level
fallback model
provider routing
model capability
input schema
```

## Files to Create

```text
private/config/providers.json
private/config/models.json
src/server/barnd/providerRegistry.js
src/server/barnd/modelRegistry.js
src/server/barnd/types.js
```

If the repo does not use `src/server`, create:

```text
src/lib/server/barnd/*
```

Cursor should choose a clean server-only location.

## providers.json Example

```json
{
  "providers": [
    {
      "id": "mock",
      "label": "Mock Provider",
      "type": "mock",
      "enabled": true,
      "base_url": "",
      "api_key_env": "",
      "default_timeout_ms": 60000
    },
    {
      "id": "openai",
      "label": "OpenAI",
      "type": "openai",
      "enabled": false,
      "base_url": "https://api.openai.com",
      "api_key_env": "OPENAI_API_KEY",
      "default_timeout_ms": 120000
    }
  ]
}
```

## models.json Example

```json
{
  "models": [
    {
      "id": "barnd-mock-image",
      "label": "Barnd Mock Image",
      "capability": "text-to-image",
      "provider": "mock",
      "provider_model": "mock-image",
      "enabled": true,
      "plan": "internal",
      "cost_level": "free",
      "fallback_model": null,
      "input_schema": {
        "required": ["prompt"],
        "optional": ["aspect_ratio", "resolution", "seed"]
      }
    },
    {
      "id": "barnd-image-openai",
      "label": "Barnd Image OpenAI",
      "capability": "text-to-image",
      "provider": "openai",
      "provider_model": "gpt-image-1",
      "enabled": false,
      "plan": "pro",
      "cost_level": "medium",
      "fallback_model": "barnd-mock-image",
      "input_schema": {
        "required": ["prompt"],
        "optional": ["aspect_ratio", "resolution"]
      }
    }
  ]
}
```

## Registry Utility Requirements

`providerRegistry.js` should support:

```text
getProviderById(id)
getEnabledProviders()
getPublicProviderList()
validateProviderHasKey(provider)
```

`modelRegistry.js` should support:

```text
getModelById(id)
getModelsByCapability(capability)
getEnabledModels()
getPublicModelList()
resolveFallbackModel(model)
```

## Security Requirement

Public API routes may return:

```text
provider id
provider label
enabled
has_key true/false
```

Public API routes must never return:

```text
api key
api key env value
secret token
raw provider credentials
```

## Phase 5 Acceptance Criteria

```text
- providers.json exists
- models.json exists
- registry utilities exist
- /api/barnd/models reads from registry
- /api/barnd/providers reads from registry
- no secret is exposed
```

---

# Phase 6 — BarndAI Provider Router

## Purpose

Create the router that chooses which provider adapter to use.

## Files to Create

```text
src/server/barnd/router.js
src/server/barnd/providers/mockProvider.js
src/server/barnd/providers/openaiImageProvider.js
```

## Router Responsibilities

```text
1. Receive normalized BarndAI generation input
2. Validate capability
3. Resolve requested model
4. Confirm model is enabled
5. Resolve provider
6. Confirm provider is enabled
7. Confirm provider key exists if needed
8. Call provider adapter
9. Normalize response
10. Return BarndAI standard job/result format
```

## Standard Generate Input

```json
{
  "capability": "text-to-image",
  "model_id": "barnd-image-openai",
  "prompt": "A burger restaurant promo image",
  "aspect_ratio": "1:1",
  "resolution": "1024x1024",
  "source_image_url": null,
  "metadata": {
    "project": "slab-burgers",
    "user": "internal"
  }
}
```

## Standard Generate Response

```json
{
  "ok": true,
  "job_id": "barnd_abc123",
  "status": "processing",
  "provider": "openai",
  "model": "barnd-image-openai",
  "provider_job_id": "provider_specific_id_if_any"
}
```

## Standard Result Response

```json
{
  "ok": true,
  "job_id": "barnd_abc123",
  "status": "completed",
  "provider": "openai",
  "model": "barnd-image-openai",
  "outputs": [
    {
      "type": "image",
      "url": "https://media.barndai.com/generated/abc123.png"
    }
  ],
  "usage": {
    "estimated_cost": null,
    "provider_cost_units": null
  }
}
```

## Phase 6 Acceptance Criteria

```text
- router.js exists
- mockProvider works
- generate route uses router
- result route uses normalized result format
- disabled model returns clear error
- disabled provider returns clear error
- missing API key returns clear error
```

---

# Phase 7 — Add First Real Provider

## Recommended First Provider

Start with **OpenAI image provider** or another provider that already has a working API key.

Do not add Seedance, Kling, DeepSeek, OpenRouter, and ComfyUI all at once.

## File to Create

```text
src/server/barnd/providers/openaiImageProvider.js
```

## Requirements

The provider adapter must:

```text
- Read API key from process.env.OPENAI_API_KEY
- Accept normalized BarndAI input
- Convert BarndAI input to provider input
- Call provider API server-side
- Normalize provider response
- Return BarndAI standard format
- Hide raw provider secret
- Handle provider error clearly
```

## .env.example

Create or update:

```text
.env.example
```

Include:

```env
NODE_ENV=development
PORT=3001

BARND_MOCK_MODE=true
BARND_ADMIN_PASSWORD=change-me
BARND_API_SECRET=change-me

OPENAI_API_KEY=
DEEPSEEK_API_KEY=
SEEDANCE_API_KEY=
KLING_API_KEY=
OPENROUTER_API_KEY=
COMFYUI_BASE_URL=
```

## Real .env

Do not commit real `.env`.

Production `.env` should exist only on the VPS.

## Phase 7 Acceptance Criteria

```text
- One real provider works
- Mock mode still works
- Missing key gives clean error
- Real provider key is not visible in browser
- UI can show generated result
```

---

# Phase 8 — Upload Support

## Purpose

Support image-to-image and image-to-video later.

## Upload Route Requirements

`/api/barnd/upload` should:

```text
- Accept image/video files
- Validate allowed MIME types
- Enforce file size limit
- Store locally for MVP or forward to object storage later
- Return normalized uploaded file object
```

## Accepted MVP File Types

```text
image/png
image/jpeg
image/webp
video/mp4
video/webm
```

## Recommended Max File Size

```text
Images: 20MB
Videos: 200MB
```

## Output Format

```json
{
  "ok": true,
  "file": {
    "id": "file_abc123",
    "type": "image",
    "url": "/uploads/barnd/file_abc123.png",
    "mime_type": "image/png",
    "size_bytes": 123456
  }
}
```

## Future Upgrade

Later this should upload to:

```text
Cloudflare R2
media.barndai.com
```

Do not force R2 into MVP unless everything else is stable.

## Phase 8 Acceptance Criteria

```text
- Image upload works
- Bad file type rejected
- Oversized file rejected
- Upload URL can be passed to generation route
```

---

# Phase 9 — Admin API Settings Page

## Purpose

Create the control panel for providers and models.

## Route

```text
/app/admin/api-settings/page.jsx
```

or if using `src/app`:

```text
/src/app/admin/api-settings/page.jsx
```

## MVP Admin Protection

Use simple password protection for MVP.

Environment variable:

```env
BARND_ADMIN_PASSWORD=
```

## Admin Page Should Show

```text
Providers:
- Provider ID
- Label
- Type
- Enabled
- Has API key
- Base URL
- Timeout
- Status

Models:
- Model ID
- Label
- Capability
- Provider
- Provider model
- Enabled
- Plan
- Cost level
- Fallback model
```

## MVP Editing

For MVP, admin page can be read-only first.

Then add editing after stable.

Recommended order:

```text
1. Read-only admin page
2. Toggle provider enabled
3. Toggle model enabled
4. Edit fallback
5. Edit cost/plan fields
```

## Warning

Do not show actual API key values in admin page.

Only show:

```text
Configured: yes/no
```

## Phase 9 Acceptance Criteria

```text
- /admin/api-settings loads
- Password protection exists
- Provider list visible
- Model list visible
- API keys not visible
- Public user cannot access settings without password
```

---

# Phase 10 — Auto Deploy with GitHub Actions

## Deployment Target

Use GitHub Actions over SSH to VPS.

Recommended production path:

```text
/opt/barnd/open-generative-ai
```

Recommended PM2 process:

```text
barnd-creative-studio
```

Recommended port:

```text
3001
```

## Files to Create

```text
.github/workflows/deploy.yml
ecosystem.config.js
DEPLOY.md
```

## GitHub Secrets Required

Add these in GitHub repo settings:

```text
VPS_HOST
VPS_USER
VPS_SSH_KEY
VPS_PORT
APP_PATH
```

Example:

```text
APP_PATH=/opt/barnd/open-generative-ai
VPS_PORT=22
```

## Server .env

Create this manually on the VPS:

```text
/opt/barnd/open-generative-ai/.env
```

Example:

```env
NODE_ENV=production
PORT=3001

BARND_MOCK_MODE=false
BARND_ADMIN_PASSWORD=replace-this
BARND_API_SECRET=replace-this

OPENAI_API_KEY=
DEEPSEEK_API_KEY=
SEEDANCE_API_KEY=
KLING_API_KEY=
OPENROUTER_API_KEY=
COMFYUI_BASE_URL=
```

## ecosystem.config.js

```javascript
module.exports = {
  apps: [
    {
      name: "barnd-creative-studio",
      script: "npm",
      args: "start",
      cwd: "/opt/barnd/open-generative-ai",
      env: {
        NODE_ENV: "production",
        PORT: 3001
      }
    }
  ]
};
```

## deploy.yml

```yaml
name: Deploy BarndAI Creative Studio

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Deploy over SSH
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          port: ${{ secrets.VPS_PORT }}
          script: |
            set -e

            cd ${{ secrets.APP_PATH }}

            echo "Pull latest code"
            git pull origin main

            echo "Install dependencies"
            npm ci

            echo "Build app"
            npm run build

            echo "Restart PM2"
            pm2 restart barnd-creative-studio || pm2 start ecosystem.config.js

            echo "Save PM2"
            pm2 save

            echo "Deployment complete"
```

## DEPLOY.md Should Include

```text
1. VPS setup
2. GitHub secrets setup
3. .env setup
4. PM2 setup
5. Nginx reverse proxy sample
6. Deployment command
7. Rollback command
8. Health check command
```

## Nginx Example

```nginx
server {
    listen 80;
    server_name creative.barndai.com;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Phase 10 Acceptance Criteria

```text
- deploy.yml exists
- ecosystem.config.js exists
- DEPLOY.md exists
- deploy only runs on main
- .env is not overwritten
- PM2 restarts app
- npm run build passes
```

---

# Phase 11 — Production Verification

## Required Checks

After deploy:

```bash
pm2 status
pm2 logs barnd-creative-studio --lines 100
curl -I http://127.0.0.1:3001
curl http://127.0.0.1:3001/api/barnd/models
curl http://127.0.0.1:3001/api/barnd/providers
```

## Browser Checks

Open production domain and confirm:

```text
- App loads
- Text-to-image page loads
- Prompt submit works
- Browser network calls /api/barnd/generate
- Browser does not call api.muapi.ai
- Browser does not show provider keys
- Admin settings page requires password
- Admin page shows providers/models
```

## Phase 11 Acceptance Criteria

```text
- Production app is live
- API mock route works
- First real provider works if key is configured
- Auto deploy works from main
- PM2 restarts after deploy
- No provider key leak
```

---

# Testing Checklist

## Local Tests

```bash
npm install
npm run build
npm run lint
npm run dev
```

If lint does not exist, Cursor should not invent a broken lint setup unless requested.

## API Tests

```bash
curl -X POST http://127.0.0.1:3001/api/barnd/generate \
  -H "Content-Type: application/json" \
  -d '{"capability":"text-to-image","model_id":"barnd-mock-image","prompt":"test burger promo"}'
```

Expected:

```json
{
  "ok": true,
  "job_id": "...",
  "status": "processing"
}
```

Then:

```bash
curl http://127.0.0.1:3001/api/barnd/result/JOB_ID_HERE
```

Expected:

```json
{
  "ok": true,
  "status": "completed",
  "outputs": []
}
```

## Security Tests

Check browser bundle and network tab:

```text
- No OPENAI_API_KEY
- No DEEPSEEK_API_KEY
- No KLING_API_KEY
- No SEEDANCE_API_KEY
- No provider secret
- No direct api.muapi.ai call
```

## Deployment Tests

```bash
git push origin main
```

Then confirm GitHub Actions success.

On VPS:

```bash
cd /opt/barnd/open-generative-ai
git log -1 --oneline
pm2 status
pm2 logs barnd-creative-studio --lines 100
```

---

# Error Handling Rules

Every API route should return consistent errors.

Example:

```json
{
  "ok": false,
  "error": {
    "code": "MODEL_DISABLED",
    "message": "The requested model is disabled."
  }
}
```

Recommended error codes:

```text
INVALID_INPUT
MISSING_PROMPT
MODEL_NOT_FOUND
MODEL_DISABLED
PROVIDER_NOT_FOUND
PROVIDER_DISABLED
PROVIDER_KEY_MISSING
PROVIDER_REQUEST_FAILED
JOB_NOT_FOUND
UPLOAD_TOO_LARGE
UNSUPPORTED_FILE_TYPE
UNAUTHORIZED
INTERNAL_ERROR
```

Do not return raw provider error dumps to browser.

Log raw details server-side only.

---

# Commit Plan

Cursor should commit after each stable phase.

Recommended commit messages:

```text
chore: audit open generative ai api flow
docs: add barnd api router spec kit plan
feat: add barnd api client adapter
feat: add mock barnd api routes
feat: route text to image through barnd api
feat: add provider and model registry
feat: add provider router and mock provider
feat: add first real image provider adapter
feat: add upload route validation
feat: add admin api settings page
ci: add github actions vps deploy
docs: add deployment guide
```

---

# Files Cursor Is Allowed to Create

```text
specs/barnd-api-router/spec.md
specs/barnd-api-router/plan.md
specs/barnd-api-router/tasks.md
specs/barnd-api-router/acceptance-tests.md
specs/barnd-api-router/risks.md
specs/barnd-api-router/repo-audit.md

src/lib/barndApi.js

app/api/barnd/generate/route.js
app/api/barnd/result/[id]/route.js
app/api/barnd/upload/route.js
app/api/barnd/models/route.js
app/api/barnd/providers/route.js

src/server/barnd/router.js
src/server/barnd/providerRegistry.js
src/server/barnd/modelRegistry.js
src/server/barnd/types.js
src/server/barnd/providers/mockProvider.js
src/server/barnd/providers/openaiImageProvider.js

private/config/providers.json
private/config/models.json

app/admin/api-settings/page.jsx

.github/workflows/deploy.yml
ecosystem.config.js
.env.example
DEPLOY.md
```

If the repo uses a different app structure, Cursor must adapt paths cleanly and explain why.

---

# Files Cursor Should Not Delete Initially

```text
src/lib/muapi.js
packages/studio/src/models.js
src/lib/models.js
existing studio components
existing package files
existing workflow files
```

Old files can be removed only after:

```text
- BarndAI flow works
- no import depends on old file
- production build passes
- user approves cleanup
```

---

# MVP Definition of Done

The MVP is done when:

```text
1. Open-Generative-AI UI runs.
2. One text-to-image flow uses /api/barnd/generate.
3. Mock generation works without provider keys.
4. One real provider can be enabled through server config.
5. Provider/model registry exists.
6. Browser never sees provider secrets.
7. Admin API settings page exists.
8. GitHub Actions auto deploy exists.
9. PM2 runs app on VPS.
10. Production build passes.
```

---

# Not MVP

Do not do these before MVP is stable:

```text
Full SaaS billing
Stripe
Team accounts
Huge model marketplace
All video providers
All lip sync providers
ComfyUI cluster
R2 upload pipeline
n8n autopost
RSS feed
ReelAna integration
Tail&Home integration
Advanced analytics
User credit system
```

These come later.

---

# Future Roadmap After MVP

## Stage 2 — Media Storage

```text
Upload generated media to Cloudflare R2
Use media.barndai.com public URLs
Save generation records
Add history page
```

## Stage 3 — Provider Expansion

```text
Seedance
Kling
OpenRouter
DeepSeek
Gemini
ComfyUI
Fal
Replicate
```

## Stage 4 — Productization

```text
Plan-based model access
Free/pro/internal model flags
Agency workspace
White-label domain
Client share links
Brand kit
Template library
```

## Stage 5 — BarndAI Content Factory

```text
Campaign builder
Restaurant local promo generator
Affiliate post generator
ReelAna character content
Tail&Home digital guide generator
Sociamonials/RSS export
```

---

# Cursor Master Prompt

Use this exact prompt in Cursor:

```text
Read BARNDAI_CREATIVE_STUDIO_CURSOR_BUILD_PLAN.md completely.

You are converting my fork of Open-Generative-AI into BarndAI Creative Studio.

Important:
Do not start coding immediately.

First complete Phase 0 only:
- audit the repo
- identify MuAPI/provider/model/upload/polling files
- explain current API flow
- list files to touch
- list files not to touch
- list migration risks
- propose the safest first coding step
- create specs/barnd-api-router/repo-audit.md

After Phase 0, wait for my approval before Phase 1.

Critical rules:
- Do not rewrite the whole UI.
- Do not delete src/lib/muapi.js yet.
- Do not expose provider API keys to browser.
- Browser must call internal /api/barnd/* routes only.
- Use adapter pattern.
- First make mock generation work.
- Add one real provider only after mock works.
- Add GitHub Actions deploy after app build passes.
- Commit after each stable phase.
```

---

# Cursor Autonomy Rule

Cursor can work by himself only inside one phase at a time.

Cursor must stop and report after these checkpoints:

```text
After Phase 0 repo audit
After Phase 3 mock API routes
After Phase 4 first UI flow replacement
After Phase 7 first real provider
After Phase 10 auto deploy setup
```

Do not allow Cursor to run all phases in one uninterrupted pass.

---

# Human Inputs Required

The user must provide these manually:

```text
GitHub repo access
VPS host
VPS username
VPS SSH private key for GitHub Actions
VPS app path
Domain/subdomain
Provider API keys
Production .env
Nginx domain config
Admin password
```

Cursor can create files and instructions, but should not invent these secrets.

---

# Final Build Priority

The priority order is:

```text
1. Stable API control
2. No secret leak
3. Mock generation works
4. One real provider works
5. Auto deploy works
6. Admin settings page works
7. More providers later
```

Do not chase fancy UI before the backend control layer is stable.

The backend control layer is the business.
