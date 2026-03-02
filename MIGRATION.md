# Migration Guide: index.html → TypeScript

## What Changed

The entire 1884-line `index.html` `<script>` block has been split into:

| File | What it was |
|------|------------|
| `src/types.ts` | TypeScript interfaces for every data shape |
| `src/categories.ts` | `MATH_CATEGORIES`, `READING_CATEGORIES`, `VOCAB_CATEGORIES`, sections |
| `src/quiz.ts` | `shuffle`, `buildColorMap`, question banks, `mathBank`, `readingBank` |
| `src/db.ts` | All `supa.*` calls — auth, questions, sessions, performance |
| `src/speech.ts` | `speak()`, `cheer()`, `setupMic()`, `toggleMic()` |
| `src/audio.ts` | `buildCalmAudio()`, `stopCalmAudio()` |
| `src/settings.ts` | `CFG`, `loadCFG()`, `saveCFG()`, `applySettings()` |
| `src/progress.ts` | `P`, `loadP()`, `saveP()`, `logSession()` |
| `src/main.ts` | Screen management, UI event handlers, wires everything together |

## What Didn't Change

- **index.html** — identical HTML structure and all CSS (670 lines)
- **All function names** exposed to HTML onclick= attributes (via `window.xxx` in main.ts)
- **Supabase schema** — no DB changes needed
- **GitHub Pages URL** — same deploy target

## Bugs This Catches Automatically

| Bug Type | Caught By |
|----------|-----------|
| Apostrophe in string literal | TypeScript + ESLint |
| Wrong function name in onclick | TypeScript (window.xxx typed) |
| Undefined variable | TypeScript strict mode |
| Wrong Supabase response shape | TypeScript interfaces |
| Logic errors in shuffle/mastery | Vitest unit tests |
| Login flow broken | Playwright E2E |
| Answer buttons not rendering | Playwright E2E |

## Running Tests Locally

```bash
npm install
npm test                    # unit tests (< 2 seconds)
npm run typecheck           # type errors
npm run build               # production build
npm run test:e2e            # full browser tests
```

## First-Time GitHub Actions Setup

1. Go to your repo Settings → Pages → Source: **GitHub Actions**
2. Push to `main` — the workflow handles everything
3. Check the Actions tab to see the pipeline run

The deploy job has `needs: [build, e2e-tests]` — it will NOT deploy if any test fails.
