// ══════════════════════════════════════════════════════════════════════
// UNIT TESTS — settings.ts
// ══════════════════════════════════════════════════════════════════════

import { describe, it, expect, beforeEach } from 'vitest'
import { loadConfig, getConfig, updateConfig, toggleConfig, DEFAULT_CONFIG } from '../../src/settings'

beforeEach(() => {
  loadConfig() // reset to defaults
})

describe('loadConfig', () => {
  it('returns defaults when no localStorage', () => {
    const cfg = loadConfig()
    expect(cfg).toMatchObject(DEFAULT_CONFIG)
  })

  it('default voice is enabled', () => {
    expect(loadConfig().voice).toBe(true)
  })

  it('default qCount is 10', () => {
    expect(loadConfig().qCount).toBe(10)
  })
})

describe('updateConfig', () => {
  it('applies partial updates', () => {
    loadConfig()
    updateConfig({ qCount: 5 })
    expect(getConfig().qCount).toBe(5)
  })

  it('does not overwrite unrelated keys', () => {
    loadConfig()
    updateConfig({ qCount: 5 })
    expect(getConfig().voice).toBe(true)
  })

  it('can update breakStyle', () => {
    updateConfig({ breakStyle: 'small' })
    expect(getConfig().breakStyle).toBe('small')
  })
})

describe('toggleConfig', () => {
  it('flips voice from true to false', () => {
    loadConfig()
    expect(getConfig().voice).toBe(true)
    toggleConfig('voice')
    expect(getConfig().voice).toBe(false)
  })

  it('flips voice back to true', () => {
    loadConfig()
    toggleConfig('voice')
    toggleConfig('voice')
    expect(getConfig().voice).toBe(true)
  })

  it('toggles breakOn', () => {
    loadConfig()
    const original = getConfig().breakOn
    toggleConfig('breakOn')
    expect(getConfig().breakOn).toBe(!original)
  })
})
