-- Fix: Add 'vocab' to the allowed subjects in the questions table
-- Run this BEFORE running vocab_questions.sql

ALTER TABLE public.questions 
  DROP CONSTRAINT IF EXISTS questions_subject_check;

ALTER TABLE public.questions 
  ADD CONSTRAINT questions_subject_check 
  CHECK (subject IN ('math', 'reading', 'science', 'life', 'vocab'));
