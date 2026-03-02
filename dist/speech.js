let voice = null;
let voiceEnabled = true;
let voiceVolume = 1.0;
export function loadVoice() {
    const vs = window.speechSynthesis?.getVoices() ?? [];
    if (!vs.length)
        return;
    const tests = [
        v => v.name === 'Samantha', v => v.name === 'Karen', v => v.name === 'Tessa',
        v => /Zira/i.test(v.name), v => /Jenny/i.test(v.name) && v.lang.startsWith('en'),
        v => v.lang === 'en-AU', v => v.lang === 'en-US',
    ];
    for (const test of tests) {
        const m = vs.find(test);
        if (m) {
            voice = m;
            break;
        }
    }
}
if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = loadVoice;
    loadVoice();
}
export function configureVoice(enabled, volume) {
    voiceEnabled = enabled;
    voiceVolume = volume;
}
export function speak(txt, rate = 0.82, pitch = 1.22) {
    if (!voiceEnabled || !window.speechSynthesis || !txt)
        return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(txt);
    if (voice)
        u.voice = voice;
    u.rate = rate;
    u.pitch = pitch;
    u.volume = voiceVolume;
    window.speechSynthesis.speak(u);
}
export const cheer = (t) => speak(t, 0.79, 1.32);
export const gentle = (t) => speak(t, 0.80, 1.10);
export const cancelSpeech = () => window.speechSynthesis?.cancel();
let recognition = null;
let micOn = false;
export function setupMic(cb) {
    const W = window;
    const SR = W.SpeechRecognition ?? W.webkitSpeechRecognition;
    if (!SR)
        return;
    recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.onstart = () => { micOn = true; cb.onStateChange('listening'); };
    recognition.onresult = e => { let t = ''; for (let i = e.resultIndex; i < e.results.length; i++)
        t += e.results[i][0].transcript; t = t.trim().toLowerCase(); if (t)
        cb.onInterim(t); };
    recognition.onend = () => { micOn = false; cb.onStateChange('idle'); };
    recognition.onerror = () => { micOn = false; cb.onStateChange('idle'); };
}
export function toggleMic() {
    if (!recognition) {
        alert('Speech needs Safari iOS 15+ or Chrome.');
        return;
    }
    if (micOn)
        stopMic();
    else
        try {
            recognition.start();
        }
        catch (_) { /* ignore */ }
}
export function stopMic() {
    if (recognition && micOn)
        try {
            recognition.stop();
        }
        catch (_) { /* ignore */ }
}
export const isMicOn = () => micOn;
