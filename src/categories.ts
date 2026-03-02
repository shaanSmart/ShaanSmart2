import type { Category, CategorySection, SubjectMeta } from './types'

export const SUBJECTS: Record<string, SubjectMeta> = {
  math:    { name: '🔢 Math',       color: '#2a5fa8' },
  reading: { name: '📖 Reading',    color: '#1a7a4a' },
  life:    { name: '🏠 Life',       color: '#a84a10' },
  science: { name: '🔬 Science',    color: '#5c3db8' },
  vocab:   { name: '💬 Vocabulary', color: '#a8006a' },
}

export const MATH_CATEGORIES: Category[] = [
  { id: 'multiplication', icon: '✖️',  name: 'Multiplication', desc: 'Times tables', color: 'c1', tags: ['multiplication'] },
  { id: 'division',       icon: '➗',  name: 'Division',       desc: 'Sharing equally', color: 'c2', tags: ['division'] },
  { id: 'addition',       icon: '➕',  name: 'Addition',       desc: 'Adding numbers', color: 'c3', tags: ['addition'] },
  { id: 'subtraction',    icon: '➖',  name: 'Subtraction',    desc: 'Taking away', color: 'c4', tags: ['subtraction'] },
  { id: 'fractions',      icon: '½',   name: 'Fractions',      desc: 'Parts of a whole', color: 'c5', tags: ['fractions'] },
  { id: 'decimals',       icon: '0.5', name: 'Decimals & %',   desc: 'Decimals and percent', color: 'c6', tags: ['decimals','percentages'] },
  { id: 'word-problem',   icon: '📖',  name: 'Word Problems',  desc: 'Math in stories', color: 'c7', tags: ['word-problem'] },
  { id: 'two-step',       icon: '2️⃣', name: 'Two-Step',       desc: 'Multi-step', color: 'c8', tags: ['two-step'] },
  { id: 'geometry',       icon: '📐',  name: 'Geometry',       desc: 'Shapes', color: 'c9', tags: ['geometry','area','perimeter'] },
  { id: 'algebra',        icon: 'x²',  name: 'Algebra',        desc: 'Find the unknown', color: 'c10', tags: ['algebra','missing-number'] },
  { id: 'russian-math',   icon: '🧮',  name: 'Russian Math',   desc: 'Deep thinking', color: 'russian', wide: true, tags: ['russian-math','pattern','number-bond','mental-math'] },
  { id: 'mix',            icon: '🎲',  name: 'Mixed Practice', desc: 'Surprise me!', color: 'c1', wide: true, tags: [] },
]

export const READING_CATEGORIES: Category[] = [
  { id: 'famous-people',  icon: '⭐',  name: 'Famous People',  desc: 'Elon, LeBron & more', color: 'c1', tags: ['famous-people'] },
  { id: 'current-events', icon: '📰',  name: 'Current Events', desc: "What's happening now", color: 'c7', tags: ['current-events'] },
  { id: 'history',        icon: '🏛️', name: 'History',         desc: 'Ancient to modern', color: 'c4', tags: ['history'] },
  { id: 'science',        icon: '🔬',  name: 'Science',         desc: 'Physics, space, earth', color: 'c5', tags: ['science'] },
  { id: 'biology',        icon: '🧬',  name: 'Biology',         desc: 'Life and nature', color: 'c2', tags: ['biology'] },
  { id: 'india',          icon: '🇮🇳', name: 'India & Culture', desc: 'Festivals, ISRO', color: 'c3', tags: ['india'] },
  { id: 'math-reading',   icon: '📊',  name: 'Math Stories',    desc: 'Data and money', color: 'c6', tags: ['math-reading'] },
  { id: 'mix-reading',    icon: '🎲',  name: 'Mixed Reading',   desc: 'Surprise me!', color: 'c8', wide: true, tags: [] },
]

export const VOCAB_CATEGORIES: Category[] = [
  { id: 'sight-words-1',     icon: '👁️', name: 'Sight Words: Starter', desc: 'the, a, and, is...', color: 'c1', tags: ['sight-words','pre-primer'] },
  { id: 'sight-words-2',     icon: '👁️', name: 'Sight Words: Level 2', desc: 'all, are, came...', color: 'c2', tags: ['sight-words','primer'] },
  { id: 'sight-words-3',     icon: '👁️', name: 'Sight Words: Level 3', desc: 'Grade 1-2 words', color: 'c3', tags: ['sight-words','grade1'] },
  { id: 'sentence-complete', icon: '✏️', name: 'Sentence Completion',  desc: 'Fill in the blank', color: 'c4', tags: ['sentence-completion'] },
  { id: 'word-meaning',      icon: '📖', name: 'Word Meanings',         desc: 'What does it mean?', color: 'c5', tags: ['word-meaning','vocabulary'] },
  { id: 'synonyms',          icon: '🔄', name: 'Synonyms & Antonyms',   desc: 'Same and opposite', color: 'c6', tags: ['synonyms','antonyms'] },
  { id: 'emoji-vocab',       icon: '🎯', name: 'Emoji Words',           desc: 'Match picture to word', color: 'c7', tags: ['emoji-vocab'] },
  { id: 'compound-words',    icon: '🔗', name: 'Compound Words',        desc: 'Two words make one', color: 'c8', tags: ['compound-words','word-families'] },
  { id: 'mix-vocab',         icon: '🎲', name: 'Mixed Words',           desc: 'Surprise me!', color: 'c9', wide: true, tags: [] },
]

export const MATH_SECTIONS: CategorySection[] = [
  { label: 'Operations',     ids: ['multiplication','division','addition','subtraction'] },
  { label: 'Number Types',   ids: ['fractions','decimals'] },
  { label: 'Problem Styles', ids: ['word-problem','two-step','geometry','algebra'] },
  { label: 'Special',        ids: ['russian-math','mix'] },
]

export const READING_SECTIONS: CategorySection[] = [
  { label: 'Choose Your Topic', ids: READING_CATEGORIES.map(c => c.id) },
]

export const VOCAB_SECTIONS: CategorySection[] = [
  { label: 'Sight Words',          ids: ['sight-words-1','sight-words-2','sight-words-3'] },
  { label: 'Sentences & Meanings', ids: ['sentence-complete','word-meaning'] },
  { label: 'Word Games',           ids: ['synonyms','emoji-vocab','compound-words'] },
  { label: 'Mixed',                ids: ['mix-vocab'] },
]

export function getCategoriesForSubject(subj: string): Category[] {
  if (subj === 'math')    return MATH_CATEGORIES
  if (subj === 'reading') return READING_CATEGORIES
  if (subj === 'vocab')   return VOCAB_CATEGORIES
  return []
}

export function getSectionsForSubject(subj: string): CategorySection[] {
  if (subj === 'math')    return MATH_SECTIONS
  if (subj === 'reading') return READING_SECTIONS
  if (subj === 'vocab')   return VOCAB_SECTIONS
  return [{ label: 'All', ids: getCategoriesForSubject(subj).map(c => c.id) }]
}

export function findCategory(subj: string, categoryId: string): Category | undefined {
  return getCategoriesForSubject(subj).find(c => c.id === categoryId)
}

export function resolveSubject(subj: string): string {
  if (subj === 'mix-reading') return 'reading'
  if (subj === 'mix-vocab')   return 'vocab'
  return subj
}
