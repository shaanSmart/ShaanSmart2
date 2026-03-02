// ══════════════════════════════════════════════════════════════════════
// SHAANSMART — DATABASE LAYER
// All Supabase calls live here. Nothing else touches supa directly.
// ══════════════════════════════════════════════════════════════════════

import { createClient } from '@supabase/supabase-js'
import type { Question, DBChild } from './types'

const SUPA_URL = 'https://oxuvduxwrzqkteghoume.supabase.co'
const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94dXZkdXh3cnpxa3RlZ2hvdW1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyMjAyNzAsImV4cCI6MjA4Nzc5NjI3MH0.URlRpSVS9uiH0FbNoiESL69RpZfuqbb-1xmDUhUzfs8'

export const supa = createClient(SUPA_URL, SUPA_KEY)

export async function signIn(email: string, password: string) {
  const { data, error } = await supa.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signUp(email: string, password: string, fullName: string) {
  const { data, error } = await supa.auth.signUp({
    email, password,
    options: { data: { full_name: fullName } },
  })
  if (error) throw error
  return data
}

export async function signOut() {
  await supa.auth.signOut()
}

export async function getSession() {
  const { data: { session }, error } = await supa.auth.getSession()
  if (error) throw error
  return session
}

export async function getAccountName(userId: string): Promise<string | null> {
  const { data } = await supa.from('accounts').select('full_name').eq('id', userId).single()
  return data?.full_name ?? null
}

export async function getChildren(accountId: string): Promise<DBChild[]> {
  const { data, error } = await supa.from('children').select('*').eq('account_id', accountId).order('created_at')
  if (error) throw error
  return data ?? []
}

export async function addChild(accountId: string, name: string, grade: number, avatarEmoji: string): Promise<void> {
  const { error } = await supa.from('children').insert({ account_id: accountId, name, grade, avatar_emoji: avatarEmoji })
  if (error) throw error
}

export async function updateChildStars(childId: string, totalStars: number): Promise<void> {
  const { error } = await supa.from('children').update({ total_stars: totalStars, last_session_date: new Date().toISOString().split('T')[0] }).eq('id', childId)
  if (error) console.error('Stars update error:', error)
}

function parseDistractors(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw as string[]
  if (typeof raw === 'string') { try { return JSON.parse(raw) } catch { return [] } }
  return []
}

function mapAdaptiveRow(q: Record<string, unknown>): Question {
  return {
    id: q.question_id as string, code: q.question_code as string | null,
    text: q.question_text as string, answer: q.answer as string,
    dist: parseDistractors(q.distractors), image: (q.image_emoji as string | null) ?? null,
    eq: (q.equation as string | null) ?? null, passage: (q.passage as string | null) ?? null,
    qtype: (q.question_type as string) ?? 'standard', difficulty: (q.difficulty as number) ?? 2,
    mastery: (q.mastery_level as number) ?? 0, timesSeen: (q.times_seen as number) ?? 0,
    accuracy: (q.accuracy_pct as number) ?? 0,
  }
}

function mapPlainRow(q: Record<string, unknown>): Question {
  return {
    id: q.id as string, code: (q.question_code as string | null) ?? null,
    text: q.question_text as string, answer: q.answer as string,
    dist: parseDistractors(q.distractors), image: (q.image_emoji as string | null) ?? null,
    eq: (q.equation as string | null) ?? null, passage: (q.passage as string | null) ?? null,
    qtype: (q.question_type as string) ?? 'standard', difficulty: (q.difficulty as number) ?? 2,
    mastery: 0, timesSeen: 0, accuracy: 0,
  }
}

export async function loadAdaptiveQuestions(childId: string, subject: string, grade: number, limit = 15): Promise<Question[] | null> {
  try {
    const { data, error } = await supa.rpc('get_adaptive_questions', { p_child_id: childId, p_subject: subject, p_grade: grade, p_limit: limit })
    if (error || !data || data.length === 0) return null
    return (data as Record<string, unknown>[]).map(mapAdaptiveRow)
  } catch (e) { console.warn('loadAdaptiveQuestions failed:', e); return null }
}

export async function loadQuestionsByTags(subject: string, grade: number, tags: string[], limit = 20): Promise<Question[] | null> {
  try {
    let query = supa.from('questions').select('*').eq('is_approved', true).lte('grade_min', grade).gte('grade_max', grade).eq('subject', subject)
    if (tags.length > 0) query = query.overlaps('tags', tags)
    const { data, error } = await query.limit(limit)
    if (error || !data || data.length === 0) return null
    return (data as Record<string, unknown>[]).map(mapPlainRow)
  } catch (e) { console.warn('loadQuestionsByTags failed:', e); return null }
}

export async function recordAnswer(childId: string, questionId: string, isCorrect: boolean): Promise<void> {
  try {
    const { data, error } = await supa.rpc('record_question_answer', { p_child_id: childId, p_question_id: questionId, p_is_correct: isCorrect })
    if (error) { console.warn('recordAnswer error:', error.message); return }
    if (data && typeof data === 'object') {
      const d = data as Record<string, unknown>
      const levels = ['unseen', 'struggling', 'practicing', 'mastered']
      console.log(`📊 ${d.question_code}: ${d.times_seen}x seen, ${Math.round(d.accuracy_pct as number)}% accuracy, mastery: ${levels[d.mastery_level as number]}`)
    }
  } catch (e) { console.warn('recordAnswer exception:', e) }
}

export async function saveSession(childId: string, accountId: string, subject: string, grade: number, mode: string, attempted: number, correct: number, score: number): Promise<void> {
  try {
    const { error } = await supa.from('sessions').insert({ child_id: childId, account_id: accountId, subject, grade, mode, questions_attempted: attempted, correct, score })
    if (error) console.error('Session insert error:', error)
  } catch (e) { console.error('saveSession exception:', e) }
}

export async function saveGameBest(childId: string, subject: string, score: number): Promise<void> {
  try {
    await supa.from('game_bests').upsert({ child_id: childId, subject, best_score: score, achieved_at: new Date().toISOString() }, { onConflict: 'child_id,subject', ignoreDuplicates: false })
  } catch (e) { console.warn('saveGameBest failed:', e) }
}

export async function getGameBest(childId: string, subject: string): Promise<number> {
  try {
    const { data } = await supa.from('game_bests').select('best_score').eq('child_id', childId).eq('subject', subject).single()
    return (data?.best_score as number) ?? 0
  } catch { return 0 }
}
