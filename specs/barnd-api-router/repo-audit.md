# BarndAI API Router — Repo Audit

Audit date: 2026-07-10  
Branch: `dev/barnd-api-router`  
Baseline: fork of `Anil-matcha/Open-Generative-AI`

## 1. Current Generation Flow

```text
User prompt in Studio UI (React)
  ↓
packages/studio/src/components/*Studio.jsx
  ↓
packages/studio/src/muapi.js (named exports: generateImage, generateVideo, uploadFile, pollForResult, …)
  ↓
Browser fetch to /api (Next.js) or https://api.muapi.ai (Electron file://)
  ↓
middleware.js rewrites /api/v1/* → https://api.muapi.ai (except dedicated routes)
  OR app/api/*/route.js proxy handlers
  ↓
MuAPI upstream with x-api-key header from browser localStorage
  ↓
POST /api/v1/{model-endpoint} → request_id
  ↓
Poll GET /api/v1/predictions/{id}/result until completed
  ↓
Normalize outputs[0] → url → display in UI
```

Legacy Vite/Electron path (`src/components/ImageStudio.js`) uses `src/lib/muapi.js` (`MuapiClient` class) with the same submit/poll pattern.

## 2. Files That Call MuAPI

| File | Role |
|------|------|
| `packages/studio/src/muapi.js` | Primary API client (React studios) |
| `src/lib/muapi.js` | Legacy Vite/Electron API client |
| `packages/studio/src/components/ImageStudio.jsx` | t2i + i2i generation |
| `packages/studio/src/components/VideoStudio.jsx` | t2v + i2v |
| `packages/studio/src/components/CinemaStudio.jsx` | t2i |
| `packages/studio/src/components/LipSyncStudio.jsx` | lip sync + upload |
| `packages/studio/src/components/ClippingStudio.jsx` | clipping + upload |
| `packages/studio/src/components/MarketingStudio.jsx` | marketing ads + upload |
| `packages/studio/src/components/RecastStudio.jsx` | body swap + upload |
| `packages/studio/src/components/VibeMotionStudio.jsx` | motion graphics |
| `packages/studio/src/components/AudioStudio.jsx` | audio generation |
| `packages/studio/src/components/DrawModal.jsx` | i2i + upload |
| `packages/studio/src/components/DesignAgentStudio.jsx` | balance check |
| `packages/studio/src/components/AppsStudio.jsx` | app interest registration |
| `packages/studio/src/components/AgentStudio.jsx` | agent workflows |
| `packages/studio/src/components/WorkflowStudio.jsx` | workflow execution |
| `packages/studio/src/components/AiInfluencerStudio.jsx` | influencer generation |
| `src/components/ImageStudio.js` | Legacy image studio |
| `src/components/VideoStudio.js` | Legacy video studio |
| `src/components/CinemaStudio.js` | Legacy cinema |
| `src/components/LipSyncStudio.js` | Legacy lip sync |
| `components/StandaloneShell.js` | API key gate + balance polling |
| `middleware.js` | Rewrites `/api/v1/*` to MuAPI |
| `app/api/api/v1/[[...path]]/route.js` | Double-`/api` proxy for agents |
| `app/api/workflow/[[...path]]/route.js` | Workflow proxy |
| `app/api/app/[[...path]]/route.js` | App proxy |
| `app/api/agents/[[...path]]/route.js` | Agents proxy |
| `app/api/v1/creative-agent/[[...path]]/route.js` | Creative agent proxy |
| `app/api/v1/get_upload_url/route.js` | Upload URL |
| `vite.config.mjs` | Dev proxy to api.muapi.ai |

## 3. Model Definition Files

| File | Role |
|------|------|
| `packages/studio/src/models.js` | Single source of truth (200+ models) — used by React studios |
| `src/lib/models.js` | Legacy duplicate for Vite path |

## 4. Upload Handling

| File | Role |
|------|------|
| `packages/studio/src/muapi.js` → `uploadFile()` | Multipart to `/api/v1/upload_file` |
| `app/api/v1/get_upload_url/route.js` | Presigned upload URL |
| `app/api/v1/upload-binary/route.js` | Binary upload proxy |
| `app/api/upload-binary/route.js` | Binary upload |
| `src/lib/uploadHistory.js` | localStorage upload history |
| `src/lib/uploadProxyTarget.js` | Upload proxy target config |

## 5. Polling

Polling is embedded in `packages/studio/src/muapi.js` (`pollForResult`, `submitAndPoll`) and `src/lib/muapi.js` (`MuapiClient.pollForResult`). Interval ~2s, max 60–900 attempts depending on media type.

## 6. API Key Usage

- Stored in `localStorage` key `muapi_key`
- Passed as `x-api-key` header on every MuAPI request from browser
- `components/StandaloneShell.js` blocks UI until key is entered
- `components/ApiKeyModal.js` captures key
- No `NEXT_PUBLIC_*` provider secrets found in repo

## 7. Files to Change (Batch 1)

| File | Change |
|------|--------|
| `specs/barnd-api-router/*.md` | Planning docs (this audit + spec kit) |
| `src/lib/barndApi.js` | New BarndAI browser adapter |
| `packages/studio/src/barndApi.js` | Studio-local copy of adapter |
| `src/server/barnd/jobStore.js` | In-memory mock job store |
| `app/api/barnd/generate/route.js` | Mock generate endpoint |
| `app/api/barnd/result/[id]/route.js` | Mock result polling |
| `app/api/barnd/upload/route.js` | Mock upload placeholder |
| `app/api/barnd/models/route.js` | Mock model list |
| `app/api/barnd/providers/route.js` | Mock provider list |
| `packages/studio/src/components/ImageStudio.jsx` | t2i only → barndApi |

## 8. Files NOT to Touch (Batch 1)

- All existing `muapi.js` files (keep intact)
- `packages/studio/src/models.js` / `src/lib/models.js`
- Other studio components (Video, LipSync, Cinema, etc.)
- `middleware.js` (MuAPI proxy still needed for non-migrated flows)
- UI layout/styling files
- Submodule packages
- Workflow/agent proxy routes

## 9. Migration Risks

| Risk | Mitigation |
|------|------------|
| Dual API paths during migration | Migrate one capability at a time; keep muapi.js |
| StandaloneShell requires MuAPI key | Mock t2i does not send key to Barnd routes; UI gate unchanged in Batch 1 |
| Studio package cannot import `src/lib/*` | Duplicate adapter in `packages/studio/src/barndApi.js` |
| CSP blocks mock image CDN | `img-src https:` already allowed; placehold.co works |
| In-memory job store resets on server restart | Acceptable for mock MVP; document for Batch 2 |
| Electron path still uses MuAPI directly | Out of Batch 1 scope (Next.js web path first) |
| i2i/upload in ImageStudio still call MuAPI | Intentional — only t2i migrated in Batch 1 |

## 10. First Safe Implementation Step

1. Add mock `/api/barnd/*` routes with in-memory job store (no provider keys).
2. Add `barndApi.js` client that calls only `/api/barnd/*`.
3. Switch `ImageStudio.jsx` text-to-image branch only (`!imageMode`) to `barndApi.generateImage`.
4. Verify via `curl` and `npm run build`.

## 11. Test Checklist

- [ ] `POST /api/barnd/generate` returns `job_id` without API key
- [ ] `GET /api/barnd/result/{id}` returns completed mock image
- [ ] `POST /api/barnd/upload` returns placeholder URL
- [ ] `GET /api/barnd/models` and `/providers` return JSON
- [ ] Image Studio t2i calls `/api/barnd/generate` (not api.muapi.ai)
- [ ] Image Studio i2i still works via MuAPI (unchanged)
- [ ] No provider secrets in browser bundle or network headers for t2i
- [ ] `npm run build` passes
