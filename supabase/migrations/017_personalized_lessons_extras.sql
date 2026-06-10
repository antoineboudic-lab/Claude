-- Personalized structured fields (exercise, applyThisWeek) generated alongside
-- the lesson markdown. Nullable: rows generated before this column exist with
-- content only and regenerate on demand.
ALTER TABLE personalized_lessons ADD COLUMN IF NOT EXISTS extras JSONB;
