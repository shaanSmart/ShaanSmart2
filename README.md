# ShaanSmart 2.0 — TypeScript + Vite

Adaptive learning PWA for Shaan. Rebuilt with proper TypeScript, testing, and CI/CD.

## Stack
- **Vite** — dev server + build tool
- **TypeScript** — type safety (strict mode)
- **Vitest** — unit tests
- **Playwright** — E2E tests on iPhone + Chrome
- **GitHub Actions** — CI/CD: tests → build → deploy

## Quick Start

```bash
npm install
npm run dev          # dev server at localhost:5173
npm test             # unit tests
npm run typecheck    # TypeScript check only
npm run build        # production build → dist/
npm run test:e2e     # E2E tests (needs build first)
```

## Source Layout

```
src/
├── main.ts          ← entry point, screen/UI wiring
├── types.ts         ← all TypeScript interfaces
├── categories.ts    ← category definitions (Math, Reading, Vocab)
├── quiz.ts          ← question logic, local banks, color map
├── db.ts            ← all Supabase calls
├── speech.ts        ← TTS + speech recognition
├── audio.ts         ← calm break Web Audio
├── settings.ts      ← config persistence
└── progress.ts      ← stars/streak localStorage

tests/
├── unit/
│   ├── quiz.test.ts
│   ├── categories.test.ts
│   ├── progress.test.ts
│   └── settings.test.ts
├── e2e/
│   ├── auth.spec.ts
│   └── quiz.spec.ts
└── setup.ts         ← mock localStorage, speechSynthesis
```

## CI/CD Pipeline

```
git push main
    ↓
Unit Tests (Vitest)       ← logic bugs caught instantly
    ↓
TypeScript Check          ← type errors block everything
    ↓
Build (Vite)              ← only if tests pass
    ↓
E2E Tests (Playwright)    ← auth + quiz flows on iPhone + Chrome
    ↓
Deploy → GitHub Pages     ← ONLY if all tests pass
```

**Broken code cannot reach the live site.**

## Deploy

Pushes to `main` auto-deploy via GitHub Actions.  
Live site: https://shaansmart.github.io/shaansmart2/

## Database

Supabase project: https://oxuvduxwrzqkteghoume.supabase.co

SQL files in `/sql/`:
- `fix_subject_constraint.sql` — run first
- `vocab_questions.sql` — 108 vocab questions
- `russian_math.sql` — 43 Russian Math questions
