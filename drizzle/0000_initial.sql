CREATE TABLE IF NOT EXISTS notes (
  id TEXT PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  type TEXT NOT NULL CHECK (type IN ('note', 'reading', 'link', 'idea')),
  source TEXT,
  url TEXT,
  author TEXT,
  favorite INTEGER NOT NULL DEFAULT 0,
  book_title TEXT,
  book_author TEXT,
  highlight TEXT,
  personal_insight TEXT,
  ai_summary TEXT,
  ai_summary_status TEXT DEFAULT 'not_started',
  semantic_status TEXT DEFAULT 'not_indexed',
  review_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tags (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_used_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS note_tags (
  note_id TEXT NOT NULL,
  tag_id TEXT NOT NULL,
  assigned_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (note_id, tag_id),
  FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS notes_type_idx ON notes(type);
CREATE INDEX IF NOT EXISTS notes_updated_at_idx ON notes(updated_at);
CREATE INDEX IF NOT EXISTS notes_created_at_idx ON notes(created_at);
CREATE INDEX IF NOT EXISTS notes_favorite_idx ON notes(favorite);
CREATE INDEX IF NOT EXISTS tags_slug_idx ON tags(slug);
CREATE INDEX IF NOT EXISTS note_tags_note_id_idx ON note_tags(note_id);
CREATE INDEX IF NOT EXISTS note_tags_tag_id_idx ON note_tags(tag_id);
