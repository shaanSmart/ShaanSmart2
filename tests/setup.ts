// Global test setup — runs before every test file
import { vi } from 'vitest'

// Mock localStorage
const storage: Record<string, string> = {}
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: (key: string) => storage[key] ?? null,
    setItem: (key: string, value: string) => { storage[key] = value },
    removeItem: (key: string) => { delete storage[key] },
    clear: () => { Object.keys(storage).forEach(k => delete storage[k]) },
  },
  writable: true,
})

// Mock speechSynthesis
Object.defineProperty(window, 'speechSynthesis', {
  value: {
    speak: vi.fn(),
    cancel: vi.fn(),
    getVoices: () => [],
    onvoiceschanged: null,
  },
  writable: true,
})

// Mock SpeechRecognition
;(window as Window & { SpeechRecognition?: unknown }).SpeechRecognition = undefined
;(window as Window & { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition = undefined
