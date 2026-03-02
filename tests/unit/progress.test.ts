// ══════════════════════════════════════════════════════════════════════
// UNIT TESTS — progress.ts
// ══════════════════════════════════════════════════════════════════════

import { describe, it, expect, beforeEach } from 'vitest'
import { loadProgress, getProgress, logSession, syncStarsFromDB } from '../../src/progress'

// Reset progress state before each test
beforeEach(() => {
  loadProgress() // starts fresh from empty localStorage (jsdom)
})

describe('loadProgress', () => {
  it('initialises with zero stars', () => {
    const p = loadProgress()
    expect(p.totalStars).toBe(0)
  })

  it('initialises empty sessions array', () => {
    expect(loadProgress().sessions).toEqual([])
  })

  it('initialises zero streak', () => {
    expect(loadProgress().streak).toBe(0)
  })
})

describe('logSession', () => {
  it('adds stars for correct answers', () => {
    loadProgress()
    logSession('math', 3, 10, 7, [])
    expect(getProgress().totalStars).toBe(7)
  })

  it('accumulates stars across sessions', () => {
    loadProgress()
    logSession('math', 3, 10, 5, [])
    logSession('reading', 3, 10, 4, [])
    expect(getProgress().totalStars).toBe(9)
  })

  it('records session in sessions array', () => {
    loadProgress()
    logSession('math', 3, 10, 7, [])
    expect(getProgress().sessions).toHaveLength(1)
    expect(getProgress().sessions[0].subj).toBe('math')
  })

  it('tracks by-subject stats', () => {
    loadProgress()
    logSession('math', 3, 10, 8, ['wrong1', 'wrong2'])
    const stats = getProgress().bySubject['math']
    expect(stats.attempts).toBe(10)
    expect(stats.correct).toBe(8)
    expect(stats.wrong).toContain('wrong1')
  })

  it('keeps wrong list at most 30 items', () => {
    loadProgress()
    const manyWrongs = Array.from({ length: 40 }, (_, i) => `wrong-${i}`)
    logSession('math', 3, 40, 0, manyWrongs)
    expect(getProgress().bySubject['math'].wrong.length).toBeLessThanOrEqual(30)
  })

  it('caps sessions at 100', () => {
    loadProgress()
    for (let i = 0; i < 110; i++) {
      logSession('math', 3, 10, 5, [])
    }
    expect(getProgress().sessions.length).toBeLessThanOrEqual(100)
  })
})

describe('syncStarsFromDB', () => {
  it('overwrites total stars from DB value', () => {
    loadProgress()
    logSession('math', 3, 10, 3, []) // local = 3
    syncStarsFromDB(100, 5)
    expect(getProgress().totalStars).toBe(100)
    expect(getProgress().streak).toBe(5)
  })
})
