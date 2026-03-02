import type { ProgressData, SubjectStats } from './types'

const PROG_KEY = 'shaansmart_v1'
let P: ProgressData = { totalStars:0, sessions:[], bySubject:{}, streak:0, lastDate:null }

export function loadProgress(): ProgressData {
  try { P = { ...P, ...JSON.parse(localStorage.getItem(PROG_KEY) ?? '{}') } } catch (_) { P = { totalStars:0, sessions:[], bySubject:{}, streak:0, lastDate:null } }
  P.totalStars = P.totalStars??0; P.sessions = P.sessions??[]; P.bySubject = P.bySubject??{}; P.streak = P.streak??0; P.lastDate = P.lastDate??null
  return P
}

export function saveProgress(): void { try { localStorage.setItem(PROG_KEY, JSON.stringify(P)) } catch (_) {} }
export function getProgress(): ProgressData { return P }

export function logSession(subj: string, grade: number, total: number, correct: number, wrongs: string[]): void {
  const today = new Date().toISOString().split('T')[0]
  if (P.lastDate !== today) {
    const yd = new Date(); yd.setDate(yd.getDate()-1)
    P.streak = P.lastDate === yd.toISOString().split('T')[0] ? P.streak+1 : 1
    P.lastDate = today
  }
  P.totalStars += correct
  if (!P.bySubject[subj]) P.bySubject[subj] = { attempts:0, correct:0, wrong:[] }
  const s: SubjectStats = P.bySubject[subj]
  s.attempts += total; s.correct += correct; s.wrong = [...(s.wrong??[]),...wrongs].slice(-30)
  P.sessions = [...P.sessions, { date:today, subj, grade, total, correct }].slice(-100)
  saveProgress()
}

export function syncStarsFromDB(totalStars: number, streak: number): void {
  P.totalStars = totalStars; P.streak = streak; saveProgress()
}
