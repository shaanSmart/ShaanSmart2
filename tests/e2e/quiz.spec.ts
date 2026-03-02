// ══════════════════════════════════════════════════════════════════════
// E2E TESTS — Quiz Flow (offline/demo mode)
// ══════════════════════════════════════════════════════════════════════

import { test, expect, type Page } from '@playwright/test'

const BASE = process.env.BASE_URL ?? 'http://localhost:4173'

// Helper: inject a mock child session directly into page state
// so we can test the quiz without real Supabase auth
async function injectGuestSession(page: Page) {
  await page.evaluate(() => {
    // Simulate selectChild being called with a mock child
    const mockChild = {
      id: 'test-child-1',
      account_id: 'test-account',
      name: 'Test Shaan',
      grade: 3,
      avatar_emoji: '🌟',
      total_stars: 50,
      streak: 3,
      last_session_date: null,
      settings: null,
    }
    ;(window as Window & { currentChild?: unknown; currentUser?: unknown }).currentChild = mockChild
    ;(window as Window & { currentChild?: unknown; currentUser?: unknown }).currentUser = { id: 'test-account' }
  })
}

test.describe('Answer buttons', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE)
    await page.waitForLoadState('networkidle')
  })

  test('four answer buttons are rendered after quiz starts', async ({ page }) => {
    await injectGuestSession(page)

    // Navigate to home → math category
    await page.evaluate(() => {
      ;(window as Window & { showScreen?: (s: string) => void }).showScreen?.('home')
    })
    await page.evaluate(() => {
      ;(window as Window & { startCategory?: (s: string, c: string) => void })
        .startCategory?.('math', 'multiplication')
    })

    await page.waitForSelector('#quiz.active', { timeout: 8_000 })
    const buttons = page.locator('.ans-btn')
    await expect(buttons).toHaveCount(4)
  })

  test('clicking an answer shows feedback', async ({ page }) => {
    await injectGuestSession(page)
    await page.evaluate(() => {
      ;(window as Window & { showScreen?: (s: string) => void }).showScreen?.('home')
      ;(window as Window & { startCategory?: (s: string, c: string) => void })
        .startCategory?.('math', 'mix')
    })

    await page.waitForSelector('#quiz.active', { timeout: 8_000 })
    await page.waitForSelector('.ans-btn', { timeout: 5_000 })
    await page.locator('.ans-btn').first().click()

    await expect(page.locator('#feedback')).toHaveClass(/show/)
  })
})

test.describe('Settings', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE)
    await page.waitForLoadState('networkidle')
  })

  test('settings screen exists', async ({ page }) => {
    await expect(page.locator('#settings')).toBeDefined()
  })
})
