const CFG_KEY = 'shaansmart_cfg';
export const DEFAULT_CONFIG = {
    voice: true, volume: 1.0, qCount: 10,
    breakOn: true, breakStyle: 'big', calmDur: 60, gameTime: 60, micOn: true,
};
let cfg = { ...DEFAULT_CONFIG };
export function loadConfig() {
    try {
        const s = localStorage.getItem(CFG_KEY);
        if (s)
            cfg = { ...DEFAULT_CONFIG, ...JSON.parse(s) };
    }
    catch (_) { }
    return cfg;
}
export function saveConfig() { try {
    localStorage.setItem(CFG_KEY, JSON.stringify(cfg));
}
catch (_) { } }
export function getConfig() { return cfg; }
export function updateConfig(patch) {
    cfg = { ...cfg, ...patch };
    saveConfig();
    return cfg;
}
export function toggleConfig(key) {
    return updateConfig({ [key]: !cfg[key] });
}
