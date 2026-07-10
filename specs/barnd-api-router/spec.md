# BarndAI API Router — Specification

## Feature Name

BarndAI API Router Integration

## Goal

Replace direct MuAPI/provider usage with BarndAI-controlled server-side API routes while keeping the existing studio UI intact.

## User Story

As the BarndAI owner, I want Open-Generative-AI to use my own API router so I can control providers, costs, model access, fallbacks, and future SaaS plans.

## Main Requirements

- Keep existing studio UI (no redesign in MVP).
- Add BarndAI client adapter (`src/lib/barndApi.js`).
- Add internal `/api/barnd/*` routes.
- Add provider registry (Batch 2+).
- Add model registry (Batch 2+).
- Add mock generation mode (Batch 1).
- Add one real provider adapter first (Batch 2+).
- Add admin API settings page (Batch 2+).
- Add auto deploy (Batch 2+).
- Keep provider keys server-side only.
- Add tests for submit, poll, upload, and no browser key exposure.

## API Contract (Batch 1 Mock)

### POST `/api/barnd/generate`

Request:

```json
{
  "capability": "text-to-image",
  "model_id": "barnd-mock-image",
  "prompt": "a burger promo photo",
  "aspect_ratio": "1:1"
}
```

Response:

```json
{
  "ok": true,
  "job_id": "barnd_mock_abc123",
  "status": "processing",
  "provider": "mock",
  "model": "barnd-mock-image"
}
```

### GET `/api/barnd/result/{job_id}`

Response (completed):

```json
{
  "ok": true,
  "job_id": "barnd_mock_abc123",
  "status": "completed",
  "outputs": [{ "type": "image", "url": "https://placehold.co/1024x1024?text=BarndAI+Mock" }],
  "provider": "mock",
  "model": "barnd-mock-image"
}
```

### POST `/api/barnd/upload`

Multipart file upload. Returns mock hosted URL (MVP placeholder).

## Out of Scope for MVP (Batch 1)

- Full marketplace
- Multi-user billing
- Public SaaS account system
- Full workflow builder rewrite
- All model integrations
- Mobile app
- Full database migration
- Real provider connections
- Admin settings page
- GitHub Actions deploy
