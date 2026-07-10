# BarndAI API Router — Implementation Plan

## Phase 0: Audit repo

- Map MuAPI usage, model files, upload/poll flows
- Output: `repo-audit.md`
- **Status: complete**

## Phase 1: Add Spec Kit planning files

- Create `spec.md`, `plan.md`, `tasks.md`, `acceptance-tests.md`, `risks.md`
- **Status: complete (Batch 1)**

## Phase 2: Add BarndAI client adapter

- Create `src/lib/barndApi.js` and `packages/studio/src/barndApi.js`
- Exports: `generateImage`, `submitGeneration`, `uploadFile`, `pollForResult`, `BarndApiClient`
- Browser calls only `/api/barnd/*`
- **Status: in progress (Batch 1)**

## Phase 3: Add mock server API routes

- `app/api/barnd/generate/route.js`
- `app/api/barnd/result/[id]/route.js`
- `app/api/barnd/upload/route.js`
- `app/api/barnd/models/route.js`
- `app/api/barnd/providers/route.js`
- In-memory job store at `src/server/barnd/jobStore.js`
- **Status: in progress (Batch 1)**

## Phase 4: Replace one text-to-image flow

- `packages/studio/src/components/ImageStudio.jsx` t2i branch only
- **Status: in progress (Batch 1)**

## Phase 5: Provider and model registry

- `src/server/barnd/providerRegistry.js`, `modelRegistry.js`
- JSON config under `private/config/`
- **Status: Batch 2**

## Phase 6: First real provider adapter

- e.g. OpenAI image provider
- **Status: Batch 2 — requires provider key from user**

## Phase 7: Upload support (real)

- R2 or provider-backed upload pipeline
- **Status: Batch 2+**

## Phase 8: Polling/result normalization

- Unified error codes, provider error masking
- **Status: Batch 2+**

## Phase 9: Admin API settings page

- Password-protected provider/model toggles
- **Status: Batch 2+**

## Phase 10: GitHub Actions auto deploy

- `deploy.yml`, `ecosystem.config.js`, `DEPLOY.md`
- **Status: Batch 2+ — requires VPS credentials**

## Phase 11: Production verification

- Health checks, browser network audit
- **Status: post-deploy**
