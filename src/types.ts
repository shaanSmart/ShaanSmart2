export interface SubjectMeta { name: string; color: string }
export interface Category { id: string; icon: string; name: string; desc: string; color: string; wide?: boolean; tags: string[] }
export interface CategorySection { label: string; ids: string[] }
export interface ColorSlot { id: 'blue'|'green'|'purple'|'red'; spoken: string[]; value: string; idx: number }
export interface Question { id: string|null; code: string|null; text: string; answer: string; dist: string[]; image: string|null; eq: string|null; passage: string|null; qtype: string; difficulty: number; mastery: number; timesSeen: number; accuracy: number; badge?: string; bc?: string }
export interface AppConfig { voice: boolean; volume: number; qCount: number; breakOn: boolean; breakStyle: 'big'|'small'; calmDur: number; gameTime: number; micOn: boolean }
export interface SubjectStats { attempts: number; correct: number; wrong: string[] }
export interface SessionRecord { date: string; subj: string; grade: number; total: number; correct: number }
export interface ProgressData { totalStars: number; sessions: SessionRecord[]; bySubject: Record<string, SubjectStats>; streak: number; lastDate: string|null }
export interface DBChild { id: string; account_id: string; name: string; grade: number; avatar_emoji: string; total_stars: number; streak: number; last_session_date: string|null; settings: Partial<AppConfig>|null }
export type MasteryLevel = 0|1|2|3
export type ScreenName = 'auth'|'profiles'|'home'|'category'|'quiz'|'progress'|'settings'|'game-setup'|'game'|'game-end'|'calm'
