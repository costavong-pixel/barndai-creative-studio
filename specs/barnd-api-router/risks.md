# BarndAI API Router — Risks

## High

| Risk | Impact | Mitigation |
|------|--------|------------|
| Provider API keys exposed to browser | Security breach, cost abuse | All provider calls server-side only; barndApi never sends keys |
| Premature deletion of muapi.js | Breaks unmigrated flows | Keep both clients until full migration |

## Medium

| Risk | Impact | Mitigation |
|------|--------|------------|
| In-memory job store lost on restart | Poll returns 404 mid-generation | Document; add persistent store in Batch 2 |
| StandaloneShell requires MuAPI key | Blocks UI without any key | User can enter placeholder; Batch 2 may add mock-only bypass |
| Dual code paths (muapi + barnd) | Confusion, drift | Migrate incrementally; document in repo-audit |
| CSP connect-src restrictions | Barnd routes blocked | `/api/barnd/*` is same-origin (`'self'`) |
| Studio package duplicate barndApi | Two files to maintain | Keep in sync; consolidate later |

## Low

| Risk | Impact | Mitigation |
|------|--------|------------|
| Mock placeholder images blocked | Empty canvas | placehold.co allowed via `img-src https:` |
| Electron desktop still uses MuAPI | Inconsistent desktop vs web | Out of Batch 1 scope |
| Submodule proxy routes unchanged | Agents/workflows still hit MuAPI | Expected until Batch 2+ |

## Blockers (stop and ask user)

1. Production VPS / GitHub secrets for deploy
2. Real provider API key selection (OpenAI vs others)
3. Database choice for persistent jobs
4. Destructive deletion of original files
5. Major UI rewrite
