import type { Question, ColorSlot } from './types'

export const COLORS: Omit<ColorSlot, 'value' | 'idx'>[] = [
  { id: 'blue',   spoken: ['blue'] },
  { id: 'green',  spoken: ['green'] },
  { id: 'purple', spoken: ['purple'] },
  { id: 'red',    spoken: ['red'] },
]

export const CHEERS = [
  'Shaan, you are absolutely amazing! I knew you could do it!',
  'Yes! Shaan got it right! You are SO smart!',
  'Wow Shaan! That is exactly right! You should be so proud!',
  'Shaan, you are a superstar! Keep going!',
  'Oh my goodness Shaan! Perfect answer! You are incredible!',
  "That's right Shaan! You are brilliant! I am so proud of you!",
  'Shaan, you did it again! You are totally on fire today!',
  'Amazing Shaan! You are seriously so clever! Great job!',
  'Yes yes yes! Shaan is unstoppable! What an absolute superstar!',
]

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function randomCheer(): string {
  return CHEERS[Math.floor(Math.random() * CHEERS.length)]
}

export function buildColorMap(question: Question): ColorSlot[] {
  const vals = shuffle([question.answer, ...question.dist]).slice(0, 4)
  while (vals.length < 4) vals.push('?')
  const cols = shuffle([...COLORS])
  return vals.map((value, idx) => ({ ...cols[idx], value, idx }))
}

export function masteryLabel(level: number): string {
  return ['', 'Needs practice', 'Getting there!', 'Mastered!'][level] ?? ''
}

export function masteryClass(level: number): string {
  return ['', 'struggling', 'practicing', 'mastered'][level] ?? ''
}

export function fontSizeForLength(len: number): string {
  if (len <= 2)  return 'clamp(4rem,18vw,9rem)'
  if (len <= 4)  return 'clamp(2.8rem,12vw,6rem)'
  if (len <= 6)  return 'clamp(2rem,8vw,4rem)'
  if (len <= 10) return 'clamp(1.5rem,6vw,3rem)'
  return 'clamp(1.1rem,4vw,2rem)'
}

function gD(ans: number, a: number, b: number): string[] {
  const s = new Set([ans + 1, ans - 1, a + b, ans + b, ans - a, ans + 3])
  return [...s].filter(x => x > 0 && x !== ans).sort(() => Math.random() - 0.5).slice(0, 3).map(String)
}

const MP: Record<number, [number, number][]> = {
  2: [[2,2],[2,3],[2,4],[2,5],[3,3],[3,4],[4,2],[5,2]],
  3: [[2,6],[2,7],[2,8],[2,9],[3,5],[3,6],[4,4],[4,5],[5,5]],
  4: [[3,7],[3,8],[4,6],[4,7],[5,6],[5,7],[6,6],[7,3]],
  5: [[4,8],[5,8],[5,9],[6,7],[6,8],[7,7],[7,8],[8,8],[9,6],[12,7]],
}
const DP: Record<number, [number, number][]> = {
  2: [[4,2],[6,2],[6,3],[8,2],[8,4],[9,3]],
  3: [[12,3],[12,4],[15,3],[16,4],[18,6],[20,4]],
  4: [[24,6],[24,8],[28,4],[32,8],[36,9],[42,7]],
  5: [[48,6],[56,7],[63,9],[72,8],[81,9],[84,7]],
}

function mkQ(text: string, answer: string, dist: string[], eq?: string): Question {
  return { id: null, code: null, text, answer, dist, eq: eq ?? null, image: null, passage: null, qtype: 'standard', difficulty: 2, mastery: 0, timesSeen: 0, accuracy: 0 }
}

export function mathBank(grade: number): Question[] {
  const g = Math.min(Math.max(grade, 2), 5)
  const mp = MP[g] ?? MP[3]
  const dp = DP[g] ?? DP[3]
  const qs: Question[] = []
  shuffle(mp).slice(0, 4).forEach(([a, b]) => { const ans = a*b; qs.push(mkQ(`${a} × ${b} = ?`, String(ans), gD(ans,a,b), `${a} × ${b} = ${ans}`)) })
  shuffle(dp).slice(0, 3).forEach(([a, b]) => { const p = a*b; qs.push(mkQ(`${p} ÷ ${b} = ?`, String(a), gD(a,p,b), `${p} ÷ ${b} = ${a}`)) })
  shuffle(mp).slice(0, 3).forEach(([a, b]) => { const ans = a*b; const first = Math.random()<.5; const cor = first?String(a):String(b); qs.push(mkQ(first?`___ × ${b} = ${ans}`:`${a} × ___ = ${ans}`, cor, gD(Number(cor),a,b), `${a} × ${b} = ${ans}`)) })
  return shuffle(qs).slice(0, 10)
}

export function readingBank(grade: number): Question[] {
  const base: Question[] = [
    mkQ('What word matches this picture? 🐱', 'CAT', ['DOG','RAT','BAT']),
    mkQ('Which word describes the sun? ☀️', 'HOT', ['WET','COLD','DARK']),
    mkQ('Which word rhymes with HOUSE?', 'MOUSE', ['TREE','BOOK','CAKE']),
    mkQ('The dog ran fast. What did the dog do?', 'RAN', ['ATE','SLEPT','SWAM']),
  ]
  const adv: Question[] = [
    mkQ('"The butterfly was beautiful." Beautiful means:', 'Pretty to look at', ['Very loud','Smells bad','Really fast']),
    mkQ('A large body of water is called:', 'OCEAN', ['RIVER','POND','PUDDLE']),
  ]
  return shuffle(grade <= 2 ? base : [...base, ...adv]).slice(0, 10)
}

export function lifeBank(): Question[] {
  return shuffle([
    mkQ('When should you brush your teeth?', 'Morning and night', ['Once a week','Only at night','Never']),
    mkQ('The traffic light is RED. You should:', 'STOP', ['GO fast','Turn around','Close eyes']),
    mkQ('Someone helps you. You say:', 'Thank you', ['Go away','Whatever','I do not care']),
    mkQ('Before eating you should always:', 'Wash your hands', ['Watch TV','Run around','Read a book']),
    mkQ('There is an emergency. You call:', '911', ['411','211','811']),
  ]).slice(0, 10)
}

export function scienceBank(): Question[] {
  return shuffle([
    mkQ('A caterpillar grows into a:', 'Butterfly', ['Bee','Worm','Beetle']),
    mkQ('What shape is the Earth?', 'Round like a ball', ['Flat like paper','Square','Triangle']),
    mkQ('Rain comes from:', 'Clouds', ['The sun','The ground','Mountains']),
    mkQ('The Earth goes around the:', 'Sun', ['Moon','Mars','Jupiter']),
  ]).slice(0, 10)
}

export function getFallbackBank(subj: string, grade: number): Question[] {
  switch (subj) {
    case 'math':    return mathBank(grade)
    case 'reading': return readingBank(grade)
    case 'life':    return lifeBank()
    default:        return scienceBank()
  }
}
