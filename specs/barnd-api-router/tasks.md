# BarndAI API Router — Tasks

## Batch 1 (this commit)

- [x] Audit MuAPI usage
- [x] Create `specs/barnd-api-router/repo-audit.md`
- [x] Create `specs/barnd-api-router/spec.md`
- [x] Create `specs/barnd-api-router/plan.md`
- [x] Create `specs/barnd-api-router/tasks.md`
- [x] Create `specs/barnd-api-router/acceptance-tests.md`
- [x] Create `specs/barnd-api-router/risks.md`
- [x] Create `src/lib/barndApi.js`
- [x] Create `packages/studio/src/barndApi.js`
- [x] Create `src/server/barnd/jobStore.js`
- [x] Create `app/api/barnd/generate/route.js`
- [x] Create `app/api/barnd/result/[id]/route.js`
- [x] Create `app/api/barnd/upload/route.js`
- [x] Create `app/api/barnd/models/route.js`
- [x] Create `app/api/barnd/providers/route.js`
- [x] Add mock job store
- [x] Replace one text-to-image flow in `ImageStudio.jsx`
- [x] Confirm browser t2i calls `/api/barnd/generate`
- [x] Run `npm run build:studio` (full `npm run build` blocked by uninitialized submodules)
- [ ] Commit on `dev/barnd-api-router`

## Batch 2 (later)

- [ ] Add provider registry
- [ ] Add model registry
- [ ] Add `mockProvider` router
- [ ] Add OpenAI image provider adapter
- [ ] Add admin API settings page
- [ ] Add GitHub Actions deploy
- [ ] Add PM2 ecosystem config
- [ ] Add `DEPLOY.md`
- [ ] Migrate remaining studio flows (video, lipsync, i2i, upload)
