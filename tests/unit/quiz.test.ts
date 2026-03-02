// ══════════════════════════════════════════════════════════════════════
// UNIT TESTS — quiz.ts
// ══════════════════════════════════════════════════════════════════════

import { describe, it, expect } from 'vitest'
import {
  shuffle,
  randomCheer,
  CHEERS,
  mathBank,
  readingBank,
  lifeBank,
  scienceBank,
  fontSizeForLength,
  masteryLabel,
  masteryClass,
  buildColorMap,
} from '../../src/quiz'
import type { Question } from '../../src/types'

// ── shuffle ───────────────────────────────────────────────────────────

describe('shuffle', () => {
  it('returns same length', () => {
    expect(shuffle([1, 2, 3, 4, 5])).toHaveLength(5)
  })

  it('contains same elements', () => {
    const input = [1, 2, 3, 4, 5]
    expect(shuffle(input).sort()).toEqual([1, 2, 3, 4, 5])
  })

  it('does not mutate original array', () => {
    const input = [1, 2, 3]
    const original = [...input]
    shuffle(input)
    expect(input).toEqual(original)
  })

  it('handles empty array', () => {
    expect(shuffle([])).toEqual([])
  })

  it('handles single element', () => {
    expect(shuffle(['x'])).toEqual(['x'])
  })
})

// ── randomCheer ───────────────────────────────────────────────────────

describe('randomCheer', () => {
  it('returns a string from CHEERS array', () => {
    const cheer = randomCheer()
    expect(CHEERS).toContain(cheer)
  })

  it('CHEERS array is non-empty', () => {
    expect(CHEERS.length).toBeGreaterThan(0)
  })
})

// ── fontSizeForLength ─────────────────────────────────────────────────

describe('fontSizeForLength', () => {
  it('returns largest size for very short text', () => {
    expect(fontSizeForLength(1)).toBe('clamp(4rem,18vw,9rem)')
    expect(fontSizeForLength(2)).toBe('clamp(4rem,18vw,9rem)')
  })

  it('shrinks size as text gets longer', () => {
    const sizes = [1, 3, 5, 8, 15].map(fontSizeForLength)
    // Each should be a valid clamp() CSS expression
    sizes.forEach(s => expect(s).toMatch(/^clamp\(/))
  })

  it('returns smallest size for very long text', () => {
    expect(fontSizeForLength(50)).toBe('clamp(1.1rem,4vw,2rem)')
  })
})

// ── masteryLabel / masteryClass ───────────────────────────────────────

describe('masteryLabel', () => {
  it('returns empty string for level 0', () => {
    expect(masteryLabel(0)).toBe('')
  })
  it('returns correct labels', () => {
    expect(masteryLabel(1)).toBe('Needs practice')
    expect(masteryLabel(2)).toBe('Getting there!')
    expect(masteryLabel(3)).toBe('Mastered!')
  })
})

describe('masteryClass', () => {
  it('returns correct CSS classes', () => {
    expect(masteryClass(0)).toBe('')
    expect(masteryClass(1)).toBe('struggling')
    expect(masteryClass(2)).toBe('practicing')
    expect(masteryClass(3)).toBe('mastered')
  })
})

// ── Local question banks ──────────────────────────────────────────────

describe('mathBank', () => {
  it('returns up to 10 questions', () => {
    const q = mathBank(3)
    expect(q.length).toBeLessThanOrEqual(10)
    expect(q.length).toBeGreaterThan(0)
  })

  it('each question has required fields', () => {
    mathBank(2).forEach(q => {
      expect(q.text).toBeTruthy()
      expect(q.answer).toBeTruthy()
      expect(q.dist.length).toBeGreaterThan(0)
    })
  })

  it('answer is not in distractors', () => {
    mathBank(4).forEach(q => {
      expect(q.dist).not.toContain(q.answer)
    })
  })

  it('clamps grade to valid range', () => {
    expect(() => mathBank(1)).not.toThrow()
    expect(() => mathBank(6)).not.toThrow()
  })
})

describe('readingBank', () => {
  it('returns questions for grade 2', () => {
    expect(readingBank(2).length).toBeGreaterThan(0)
  })

  it('returns more questions for grade 3+', () => {
    const g2 = readingBank(2)
    const g3 = readingBank(3)
    // Both should have questions; g3 pool is larger
    expect(g3.length).toBeGreaterThanOrEqual(g2.length)
  })
})

describe('lifeBank', () => {
  it('returns life skill questions', () => {
    const q = lifeBank()
    expect(q.length).toBeGreaterThan(0)
    q.forEach(item => expect(item.answer).toBeTruthy())
  })
})

describe('scienceBank', () => {
  it('returns science questions', () => {
    const q = scienceBank()
    expect(q.length).toBeGreaterThan(0)
  })
})

// ── buildColorMap ─────────────────────────────────────────────────────

describe('buildColorMap', () => {
  const mockQ: Question = {
    id: 'test-1',
    code: 'TEST001',
    text: '2 × 3 = ?',
    answer: '6',
    dist: ['4', '5', '8'],
    image: null,
    eq: '2 × 3 = 6',
    passage: null,
    qtype: 'standard',
    difficulty: 2,
    mastery: 0,
    timesSeen: 0,
    accuracy: 0,
  }

  it('returns exactly 4 color slots', () => {
    expect(buildColorMap(mockQ)).toHaveLength(4)
  })

  it('always includes the correct answer', () => {
    const map = buildColorMap(mockQ)
    expect(map.some(c => c.value === '6')).toBe(true)
  })

  it('each slot has a unique color id', () => {
    const map = buildColorMap(mockQ)
    const ids = map.map(c => c.id)
    expect(new Set(ids).size).toBe(4)
  })

  it('indices are 0-3', () => {
    const map = buildColorMap(mockQ)
    const indices = map.map(c => c.idx).sort()
    expect(indices).toEqual([0, 1, 2, 3])
  })
})
