import { relations, sql } from "drizzle-orm";
import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const notes = sqliteTable("notes", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  content: text("content").notNull().default(""),
  type: text("type", {
    enum: ["note", "reading", "link", "idea"],
  }).notNull(),
  source: text("source"),
  url: text("url"),
  author: text("author"),
  favorite: integer("favorite", { mode: "boolean" }).notNull().default(false),
  bookTitle: text("book_title"),
  bookAuthor: text("book_author"),
  highlight: text("highlight"),
  personalInsight: text("personal_insight"),
  aiSummary: text("ai_summary"),
  aiSummaryStatus: text("ai_summary_status").default("not_started"),
  semanticStatus: text("semantic_status").default("not_indexed"),
  reviewAt: text("review_at"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const tags = sqliteTable("tags", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  lastUsedAt: text("last_used_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const noteTags = sqliteTable(
  "note_tags",
  {
    noteId: text("note_id")
      .notNull()
      .references(() => notes.id, { onDelete: "cascade" }),
    tagId: text("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
    assignedAt: text("assigned_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [primaryKey({ columns: [table.noteId, table.tagId] })],
);

export const notesRelations = relations(notes, ({ many }) => ({
  noteTags: many(noteTags),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  noteTags: many(noteTags),
}));

export const noteTagsRelations = relations(noteTags, ({ one }) => ({
  note: one(notes, {
    fields: [noteTags.noteId],
    references: [notes.id],
  }),
  tag: one(tags, {
    fields: [noteTags.tagId],
    references: [tags.id],
  }),
}));
