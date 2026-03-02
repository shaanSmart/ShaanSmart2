// ══════════════════════════════════════════════════════════════
// SHAANSMART — TYPE DEFINITIONS
// ══════════════════════════════════════════════════════════════

export type Subject = 'math' | 'reading' | 'vocab' | 'life' | 'science';
export type MasteryLevel = 0 | 1 | 2 | 3;
export type QuizMode = 'standard' | 'game';
export type BreakStyle = 'big' | 'small';
export type ScreenName = 'auth' | 'profiles' | 'home' | 'category' | 'quiz' | 'progress' | 'settings' | 'game-setup' | 'game' | 'game-end' | 'calm' | 'celebration';

export interface Question {
  id: string | null;
  code: string | null;
  text: string;
  answer: string;
  dist: string[];
  image: string | null;
  eq: string | null;
  passage: string | null;
  qtype: string;
  difficulty: number;
  mastery: MasteryLevel;
  timesSeen: number;
  accuracy: number;
}

export interface Category {
  id: string;
  icon: string;
  name: string;
  desc: string;
  color: string;
  wide?: boolean;
  tags: string[];
}

export interface Child {
  id: string;
  account_id: string;
  name: string;
  grade: number;
  avatar_emoji: string;
  total_stars: number;
  streak: number;
  last_session_date: string | null;
  settings: Partial<AppConfig> | null;
}

export interface AppConfig {
  voice: boolean;
  volume: number;
  qCount: number;
  breakOn: boolean;
  breakStyle: BreakStyle;
  calmDur: number;
  gameTime: number;
  micOn: boolean;
}

export interface SubjectProgress {
  attempts: number;
  correct: number;
  wrong: string[];
}

export interface SessionRecord {
  date: string;
  subj: Subject;
  grade: number;
  total: number;
  correct: number;
}

export interface LocalProgress {
  totalStars: number;
  sessions: SessionRecord[];
  bySubject: Partial<Record<Subject, SubjectProgress>>;
  streak: number;
  lastDate: string | null;
  gameBests: Record<string, number>;
}

export interface SubjectMeta {
  name: string;
  color: string;
}

export interface AdaptiveQuestionRow {
  question_id: string;
  question_code: string;
  question_text: string;
  answer: string;
  distractors: string[] | string;
  image_emoji: string | null;
  equation: string | null;
  passage: string | null;
  question_type: string;
  difficulty: number;
  mastery_level: MasteryLevel;
  times_seen: number;
  accuracy_pct: number;
}

export interface QuestionRow {
  id: string;
  question_code: string | null;
  question_text: string;
  answer: string;
  distractors: string[] | string;
  image_emoji: string | null;
  equation: string | null;
  passage: string | null;
  question_type: string;
  difficulty: number;
}

export interface TrackAnswerResult {
  question_code: string;
  times_seen: number;
  accuracy_pct: number;
  mastery_level: MasteryLevel;
}

export interface ColorSlot {
  id: 'blue' | 'green' | 'purple' | 'red';
  spoken: string[];
  value: string;
  idx: number;
}

export type MasteryLevel = 0 | 1 | 2 | 3
export type DBChild = Child
