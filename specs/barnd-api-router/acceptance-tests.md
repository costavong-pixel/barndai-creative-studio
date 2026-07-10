# BarndAI API Router — Acceptance Tests

## Batch 1 — Mock API Routes

### Generate

```bash
curl -s -X POST http://127.0.0.1:3000/api/barnd/generate \
  -H "Content-Type: application/json" \
  -d '{"capability":"text-to-image","model_id":"barnd-mock-image","prompt":"test burger promo"}'
```

Expected:

- HTTP 200
- `ok: true`
- `job_id` present
- `status: "processing"`
- No API key required

### Result

```bash
curl -s http://127.0.0.1:3000/api/barnd/result/JOB_ID_HERE
```

Expected (after brief processing):

- HTTP 200
- `status: "completed"`
- `outputs[0].url` is a valid HTTPS image URL
- No provider secrets in response

### Upload

```bash
curl -s -X POST http://127.0.0.1:3000/api/barnd/upload \
  -F "file=@/tmp/test.png"
```

Expected:

- HTTP 200
- `ok: true`
- `url` present (mock placeholder)

### Models / Providers

```bash
curl -s http://127.0.0.1:3000/api/barnd/models
curl -s http://127.0.0.1:3000/api/barnd/providers
```

Expected:

- HTTP 200
- JSON arrays with at least one mock entry

## Batch 1 — UI Flow

1. Open Image Studio (text-to-image mode, no reference image).
2. Enter a prompt and click Generate.
3. In Network tab, confirm:
   - `POST /api/barnd/generate` is called
   - `GET /api/barnd/result/{id}` is polled
   - No request to `api.muapi.ai` for this flow
4. Mock image appears in canvas/history.

## Batch 1 — Security

- Browser bundle contains no `OPENAI_API_KEY`, `DEEPSEEK_API_KEY`, etc.
- t2i Barnd requests do not send `x-api-key` with provider secrets
- MuAPI key in localStorage is not forwarded to `/api/barnd/*`

## Batch 1 — Build

```bash
npm run build
```

Expected: build completes without errors.

## Batch 1 — Regression

- Image Studio i2i (with reference image) still uses MuAPI (unchanged)
- Other studios (Video, LipSync, etc.) unchanged
- `src/lib/muapi.js` and `packages/studio/src/muapi.js` still exist
