interface CalmAudio { ctx: AudioContext; gain: GainNode }
let calmAudio: CalmAudio | null = null

export function buildCalmAudio(): void {
  try {
    const AC = window.AudioContext ?? (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AC) return
    const ctx = new AC(), gain = ctx.createGain()
    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 2)
    gain.connect(ctx.destination)
    const mkO = (freq: number, detune = 0) => { const o = ctx.createOscillator(), g = ctx.createGain(); o.type='sine'; o.frequency.value=freq; o.detune.value=detune; g.gain.value=0.5; o.connect(g); g.connect(gain); o.start() }
    mkO(110); mkO(165,3); mkO(220,-3); mkO(330,5)
    const lfo = ctx.createOscillator(), lg = ctx.createGain()
    lfo.frequency.value=0.12; lg.gain.value=0.04; lfo.connect(lg); lg.connect(gain.gain); lfo.start()
    calmAudio = { ctx, gain }
  } catch (_) { calmAudio = null }
}

export function stopCalmAudio(): void {
  if (!calmAudio) return
  try {
    calmAudio.gain.gain.linearRampToValueAtTime(0, calmAudio.ctx.currentTime + 1.5)
    setTimeout(() => { try { calmAudio?.ctx.close() } catch (_) {} calmAudio = null }, 1600)
  } catch (_) { calmAudio = null }
}
