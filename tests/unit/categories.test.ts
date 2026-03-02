// ══════════════════════════════════════════════════════════════════════
// UNIT TESTS — categories.ts
// ══════════════════════════════════════════════════════════════════════

import { describe, it, expect } from 'vitest'
import {
  SUBJECTS,
  MATH_CATEGORIES,
  READING_CATEGORIES,
  VOCAB_CATEGORIES,
  getCategoriesForSubject,
  getSectionsForSubject,
  findCategory,
  resolveSubject,
} from '../../src/categories'

describe('SUBJECTS', () => {
  it('has all 5 subjects', () => {
    expect(Object.keys(SUBJECTS)).toEqual(['math', 'reading', 'life', 'science', 'vocab'])
  })

  it('each subject has name and color', () => {
    Object.values(SUBJECTS).forEach(s => {
      expect(s.name).toBeTruthy()
      expect(s.color).toMatch(/^#[0-9a-fA-F]{6}$/)
    })
  })
})

describe('MATH_CATEGORIES', () => {
  it('includes mix category', () => {
    expect(MATH_CATEGORIES.find(c => c.id === 'mix')).toBeTruthy()
  })

  it('includes russian-math', () => {
    expect(MATH_CATEGORIES.find(c => c.id === 'russian-math')).toBeTruthy()
  })

  it('each category has required fields', () => {
    MATH_CATEGORIES.forEach(c => {
      expect(c.id).toBeTruthy()
      expect(c.icon).toBeTruthy()
      expect(c.name).toBeTruthy()
      expect(Array.isArray(c.tags)).toBe(true)
    })
  })

  it('mix category has empty tags', () => {
    const mix = MATH_CATEGORIES.find(c => c.id === 'mix')!
    expect(mix.tags).toHaveLength(0)
  })
})

describe('VOCAB_CATEGORIES', () => {
  it('has 3 sight-word levels', () => {
    const sw = VOCAB_CATEGORIES.filter(c => c.id.startsWith('sight-words'))
    expect(sw).toHaveLength(3)
  })

  it('includes compound-words category', () => {
    expect(VOCAB_CATEGORIES.find(c => c.id === 'compound-words')).toBeTruthy()
  })
})

describe('getCategoriesForSubject', () => {
  it('returns math categories for math', () => {
    expect(getCategoriesForSubject('math')).toBe(MATH_CATEGORIES)
  })

  it('returns reading categories for reading', () => {
    expect(getCategoriesForSubject('reading')).toBe(READING_CATEGORIES)
  })

  it('returns vocab categories for vocab', () => {
    expect(getCategoriesForSubject('vocab')).toBe(VOCAB_CATEGORIES)
  })

  it('returns empty array for unknown subject', () => {
    expect(getCategoriesForSubject('unknown')).toEqual([])
  })

  it('returns empty for life/science (no category menu)', () => {
    expect(getCategoriesForSubject('life')).toHaveLength(0)
    expect(getCategoriesForSubject('science')).toHaveLength(0)
  })
})

describe('getSectionsForSubject', () => {
  it('returns 4 sections for math', () => {
    expect(getSectionsForSubject('math')).toHaveLength(4)
  })

  it('math sections cover all category IDs', () => {
    const sections = getSectionsForSubject('math')
    const allIds = sections.flatMap(s => s.ids)
    MATH_CATEGORIES.forEach(c => {
      expect(allIds).toContain(c.id)
    })
  })

  it('vocab has 4 sections', () => {
    expect(getSectionsForSubject('vocab')).toHaveLength(4)
  })

  it('each section has a label', () => {
    getSectionsForSubject('math').forEach(s => {
      expect(s.label).toBeTruthy()
    })
  })
})

describe('findCategory', () => {
  it('finds multiplication in math', () => {
    const cat = findCategory('math', 'multiplication')
    expect(cat?.name).toBe('Multiplication')
  })

  it('finds russian-math', () => {
    const cat = findCategory('math', 'russian-math')
    expect(cat?.tags).toContain('russian-math')
  })

  it('returns undefined for nonexistent id', () => {
    expect(findCategory('math', 'does-not-exist')).toBeUndefined()
  })

  it('finds sight-words-1 in vocab', () => {
    expect(findCategory('vocab', 'sight-words-1')).toBeTruthy()
  })
})

describe('resolveSubject', () => {
  it('maps mix-reading to reading', () => {
    expect(resolveSubject('mix-reading')).toBe('reading')
  })

  it('maps mix-vocab to vocab', () => {
    expect(resolveSubject('mix-vocab')).toBe('vocab')
  })

  it('passes through math unchanged', () => {
    expect(resolveSubject('math')).toBe('math')
  })

  it('passes through unknown unchanged', () => {
    expect(resolveSubject('xyz')).toBe('xyz')
  })
})
