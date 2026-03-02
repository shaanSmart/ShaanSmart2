// ══════════════════════════════════════════════════════════════
// SHAANSMART — CATEGORY DEFINITIONS
// All subject → category mappings live here.
// Tags must match exactly what's stored in Supabase questions.tags
// ══════════════════════════════════════════════════════════════

import type { Category } from './types.js';

export const MATH_CATEGORIES: Category[] = [
  { id: 'multiplication', icon: '✖️',  name: 'Multiplication',  desc: 'Times tables & beyond',              color: 'c1',      tags: ['multiplication'] },
  { id: 'division',       icon: '➗',  name: 'Division',         desc: 'Sharing equally',                    color: 'c2',      tags: ['division'] },
  { id: 'addition',       icon: '➕',  name: 'Addition',         desc: 'Adding numbers',                     color: 'c3',      tags: ['addition'] },
  { id: 'subtraction',    icon: '➖',  name: 'Subtraction',      desc: 'Taking away',                        color: 'c4',      tags: ['subtraction'] },
  { id: 'fractions',      icon: '½',   name: 'Fractions',        desc: 'Parts of a whole',                   color: 'c5',      tags: ['fractions'] },
  { id: 'decimals',       icon: '0.5', name: 'Decimals & %',     desc: 'Decimal numbers & percent',          color: 'c6',      tags: ['decimals', 'percentages'] },
  { id: 'word-problem',   icon: '📖',  name: 'Word Problems',    desc: 'Math in real stories',               color: 'c7',      tags: ['word-problem'] },
  { id: 'two-step',       icon: '2️⃣', name: 'Two-Step',         desc: 'Multi-step challenges',              color: 'c8',      tags: ['two-step'] },
  { id: 'geometry',       icon: '📐',  name: 'Geometry',         desc: 'Shapes & measurement',               color: 'c9',      tags: ['geometry', 'area', 'perimeter'] },
  { id: 'algebra',        icon: 'x²',  name: 'Algebra',          desc: 'Find the unknown',                   color: 'c10',     tags: ['algebra', 'missing-number'] },
  { id: 'russian-math',   icon: '🧮',  name: 'Russian Math',     desc: 'Deep thinking • Logic • Number bonds', color: 'russian', wide: true, tags: ['russian-math', 'pattern', 'number-bond', 'mental-math'] },
  { id: 'mix',            icon: '🎲',  name: 'Mixed Practice',   desc: 'Surprise me!',                       color: 'c1',      wide: true, tags: [] },
];

export const READING_CATEGORIES: Category[] = [
  { id: 'famous-people',   icon: '⭐',  name: 'Famous People',   desc: "Elon, LeBron, Taylor & more",        color: 'c1',  tags: ['famous-people'] },
  { id: 'current-events',  icon: '📰',  name: 'Current Events',  desc: "What's happening in 2024-25",        color: 'c7',  tags: ['current-events'] },
  { id: 'history',         icon: '🏛️', name: 'History',          desc: 'Ancient to modern world',            color: 'c4',  tags: ['history'] },
  { id: 'science',         icon: '🔬',  name: 'Science',          desc: 'Physics, space, earth',              color: 'c5',  tags: ['science'] },
  { id: 'biology',         icon: '🧬',  name: 'Biology',          desc: 'Life, bodies & nature',              color: 'c2',  tags: ['biology'] },
  { id: 'india',           icon: '🇮🇳', name: 'India & Culture',  desc: 'Festivals, ISRO, cricket',           color: 'c3',  tags: ['india'] },
  { id: 'math-reading',    icon: '📊',  name: 'Math Stories',     desc: 'Data, money & statistics',           color: 'c6',  tags: ['math-reading'] },
  { id: 'mix-reading',     icon: '🎲',  name: 'Mixed Reading',    desc: 'Surprise me!',                       color: 'c8',  wide: true, tags: [] },
];

export const VOCAB_CATEGORIES: Category[] = [
  { id: 'sight-words-1',     icon: '👁️',  name: 'Sight Words: Starter',  desc: 'the, a, and, is, in, it, to, he...', color: 'c1', tags: ['sight-words', 'pre-primer'] },
  { id: 'sight-words-2',     icon: '👁️',  name: 'Sight Words: Level 2',  desc: 'all, are, at, be, but, came, do...',  color: 'c2', tags: ['sight-words', 'primer'] },
  { id: 'sight-words-3',     icon: '👁️',  name: 'Sight Words: Level 3',  desc: 'Grade 1-2 Dolch words',               color: 'c3', tags: ['sight-words', 'grade1'] },
  { id: 'sentence-complete', icon: '✏️',  name: 'Sentence Completion',   desc: 'Fill in the missing word',            color: 'c4', tags: ['sentence-completion'] },
  { id: 'word-meaning',      icon: '📖',  name: 'Word Meanings',         desc: 'What does this word mean?',           color: 'c5', tags: ['word-meaning', 'vocabulary'] },
  { id: 'synonyms',          icon: '🔄',  name: 'Synonyms & Antonyms',   desc: 'Same meaning · Opposite meaning',     color: 'c6', tags: ['synonyms', 'antonyms'] },
  { id: 'emoji-vocab',       icon: '🎯',  name: 'Emoji Words',           desc: 'Match the picture to the word',       color: 'c7', tags: ['emoji-vocab'] },
  { id: 'compound-words',    icon: '🔗',  name: 'Compound Words',        desc: 'Two words that make one!',            color: 'c8', tags: ['compound-words', 'word-families'] },
  { id: 'mix-vocab',         icon: '🎲',  name: 'Mixed Words',           desc: 'Surprise me!',                        color: 'c9', wide: true, tags: [] },
];

/** Returns the category list for a given subject */
export function getCategoriesForSubject(subject: string): Category[] {
  switch (subject) {
    case 'math':    return MATH_CATEGORIES;
    case 'reading': return READING_CATEGORIES;
    case 'vocab':   return VOCAB_CATEGORIES;
    default:        return [];
  }
}

/** Finds a single category by subject + id */
export function findCategory(subject: string, categoryId: string): Category | undefined {
  return getCategoriesForSubject(subject).find(c => c.id === categoryId);
}

/** Returns true if this subject has a category menu */
export function hasCategoryMenu(subject: string): boolean {
  return ['math', 'reading', 'vocab'].includes(subject);
}

/** Section groupings for the category menu UI */
export interface CategorySection {
  label: string;
  ids: string[];
}

export function getCategorySections(subject: string): CategorySection[] {
  switch (subject) {
    case 'math':
      return [
        { label: 'Operations',     ids: ['multiplication', 'division', 'addition', 'subtraction'] },
        { label: 'Number Types',   ids: ['fractions', 'decimals'] },
        { label: 'Problem Styles', ids: ['word-problem', 'two-step', 'geometry', 'algebra'] },
        { label: 'Special',        ids: ['russian-math', 'mix'] },
      ];
    case 'reading':
      return [
        { label: 'Choose Your Topic', ids: READING_CATEGORIES.map(c => c.id) },
      ];
    case 'vocab':
      return [
        { label: 'Sight Words',           ids: ['sight-words-1', 'sight-words-2', 'sight-words-3'] },
        { label: 'Sentences & Meanings',  ids: ['sentence-complete', 'word-meaning'] },
        { label: 'Word Games',            ids: ['synonyms', 'emoji-vocab', 'compound-words'] },
        { label: 'Mixed',                 ids: ['mix-vocab'] },
      ];
    default:
      return [];
}
