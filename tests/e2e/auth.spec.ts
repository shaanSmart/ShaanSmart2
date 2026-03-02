// ══════════════════════════════════════════════════════════════════════
// E2E TESTS — Auth Flow
// Requires: `npm run build && npm run preview` or dev server running
// Run: npx playwright test
// ══════════════════════════════════════════════════════════════════════

import { test, expect, type Page } from '@playwright/test'

const BASE = process.env.BASE_URL ?? 'http://localhost:4173'

// ── Helpers ───────────────────────────────────────────────────────────

async function waitForAuthScreen(page: Page) {
  await page.waitForSelector('#auth.active', { timeout: 10_000 })
}

// ── Tests ─────────────────────────────────────────────────────────────

test.describe('Auth screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE)
    await waitForAuthScreen(page)
  })

  test('shows login tab by default', async ({ page }) => {
    await expect(page.locator('#tab-login')).toHaveClass(/active/)
    await expect(page.locator('#auth-btn')).toHaveText('Sign In')
  })

  test('switching to signup shows name field', async ({ page }) => {
    await page.click('#tab-signup')
    await expect(page.locator('#auth-name')).toBeVisible()
    await expect(page.locator('#auth-btn')).toHaveText('Create Account')
  })

  test('switching back to login hides name field', async ({ page }) => {
    await page.click('#tab-signup')
    await page.click('#tab-login')
    await expect(page.locator('#auth-name')).not.toBeVisible()
  })

  test('empty submit shows validation error', async ({ page }) => {
    await page.click('#auth-btn')
    await expect(page.locator('#auth-err')).toBeVisible()
    await expect(page.locator('#auth-err')).toContainText('Please tap each field')
  })

  test('invalid email shows error from Supabase', async ({ page }) => {
    await page.fill('#auth-email', 'not-an-email')
    await page.fill('#auth-pass', 'password123')
    await page.click('#auth-btn')
    await expect(page.locator('#auth-err')).toBeVisible({ timeout: 8_000 })
  })
})

test.describe('Category navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Skip login — use guest/offline mode if available
    // For now, just check auth screen exists
    await page.goto(BASE)
    await page.waitForLoadState('networkidle')
  })

  test('page title is correct', async ({ page }) => {
    await expect(page).toHaveTitle(/ShaanSmart/)
  })

  test('auth screen has both tabs', async ({ page }) => {
    await expect(page.locator('#tab-login')).toBeVisible()
    await expect(page.locator('#tab-signup')).toBeVisible()
  })
})
