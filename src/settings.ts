import type { AppConfig } from './types'

const CFG_KEY = 'shaansmart_cfg'

export const DEFAULT_CONFIG: AppConfig = {
  voice: true, volume: 1.0, qCount: 10,
  breakOn: true, breakStyle: 'big', calmDur: 60, gameTime: 60, micOn: true,
}

const empty = (): AppConfig => ({ ...DEFAULT_CONFIG })
let cfg: AppConfig = empty()

export function loadConfig(): AppConfig {
  try { const s = localStorage.getItem(CFG_KEY); cfg = s ? { ...empty(), ...JSON.parse(s) } : empty() } catch (_) { cfg = empty() }
  return cfg
}

export function saveConfig(): void { try { localStorage.setItem(CFG_KEY, JSON.stringify(cfg)) } catch (_) {} }
export function getConfig(): AppConfig { return cfg }

export function updateConfig(patch: Partial<AppConfig>): AppConfig {
  cfg = { ...cfg, ...patch }; saveConfig(); return cfg
}

export function toggleConfig(key: keyof Pick<AppConfig, 'voice'|'breakOn'|'micOn'>): AppConfig {
  return updateConfig({ [key]: !cfg[key] })
}
