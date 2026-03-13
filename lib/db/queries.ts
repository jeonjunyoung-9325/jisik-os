import "server-only";

import {
  and,
  count,
  desc,
  eq,
  inArray,
  like,
  or,
  sql,
} from "drizzle-orm";

import { SORT_OPTIONS } from "@/lib/constants";
import { getDb } from "@/lib/db/client";
import { noteTags, notes, tags } from "@/lib/db/schema";
import type {
  DashboardStats,
  NoteRecord,
  NotesFilters,
  SortOption,
  Tag,
} from "@/lib/types";
import { slugify } from "@/lib/utils";

function getSort(sort?: string) {
  const safeSort = SORT_OPTIONS.includes(sort as SortOption)
    ? (sort as SortOption)
    : "newest";

  switch (safeSort) {
    case "title":
      return [notes.title, desc(notes.updatedAt)];
    case "updated":
      return [desc(notes.updatedAt), desc(notes.createdAt)];
    case "newest":
    default:
      return [desc(notes.createdAt), desc(notes.updatedAt)];
  }
}

async function getTagsForNotes(noteIds: string[]) {
  if (noteIds.length === 0) {
    return new Map<string, Tag[]>();
  }

  const rows = await getDb()
    .select({
      noteId: noteTags.noteId,
      id: tags.id,
      name: tags.name,
      slug: tags.slug,
      lastUsedAt: tags.lastUsedAt,
    })
    .from(noteTags)
    .innerJoin(tags, eq(tags.id, noteTags.tagId))
    .where(inArray(noteTags.noteId, noteIds));

  const grouped = new Map<string, Tag[]>();

  for (const row of rows) {
    const current = grouped.get(row.noteId) ?? [];
    current.push({
      id: row.id,
      name: row.name,
      slug: row.slug,
      lastUsedAt: row.lastUsedAt,
    });
    grouped.set(row.noteId, current);
  }

  return grouped;
}

function toNoteRecord(
  row: typeof notes.$inferSelect,
  tagsByNoteId: Map<string, Tag[]>,
): NoteRecord {
  return {
    ...row,
    favorite: Boolean(row.favorite),
    tags: tagsByNoteId.get(row.id) ?? [],
  };
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const db = getDb();

  const [[totalNotesRow], [totalBooksRow], [totalLinksRow], [totalTagsRow]] =
    await Promise.all([
      db.select({ value: count() }).from(notes),
      db.select({ value: count() }).from(notes).where(eq(notes.type, "reading")),
      db.select({ value: count() }).from(notes).where(eq(notes.type, "link")),
      db.select({ value: count() }).from(tags),
    ]);

  return {
    totalNotes: totalNotesRow?.value ?? 0,
    totalBooks: totalBooksRow?.value ?? 0,
    totalLinks: totalLinksRow?.value ?? 0,
    totalTags: totalTagsRow?.value ?? 0,
  };
}

export async function getRecentNotes(limit = 6) {
  const rows = await getDb()
    .select()
    .from(notes)
    .orderBy(desc(notes.updatedAt), desc(notes.createdAt))
    .limit(limit);

  const tagsByNoteId = await getTagsForNotes(rows.map((row) => row.id));
  return rows.map((row) => toNoteRecord(row, tagsByNoteId));
}

export async function getRecentlyUsedTags(limit = 8) {
  const rows = await getDb()
    .select({
      id: tags.id,
      name: tags.name,
      slug: tags.slug,
      lastUsedAt: tags.lastUsedAt,
      noteCount: count(noteTags.tagId),
    })
    .from(tags)
    .leftJoin(noteTags, eq(noteTags.tagId, tags.id))
    .groupBy(tags.id)
    .orderBy(desc(tags.lastUsedAt))
    .limit(limit);

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    lastUsedAt: row.lastUsedAt,
    noteCount: row.noteCount,
  }));
}

export async function getNotes(filters: NotesFilters = {}) {
  const db = getDb();
  const query = filters.query?.trim();
  const tagFilter = filters.tag?.trim();

  const conditions = [
    query
      ? or(
          like(notes.title, `%${query}%`),
          like(notes.content, `%${query}%`),
          like(sql`coalesce(${notes.source}, '')`, `%${query}%`),
          sql<boolean>`exists (
            select 1
            from ${noteTags} nt
            inner join ${tags} t on t.id = nt.tag_id
            where nt.note_id = ${notes.id}
              and (t.name like ${`%${query}%`} or t.slug like ${`%${slugify(query)}%`})
          )`,
        )
      : undefined,
    filters.type && filters.type !== "all"
      ? eq(notes.type, filters.type as typeof notes.$inferSelect.type)
      : undefined,
    filters.favorite === "1" ? eq(notes.favorite, true) : undefined,
    tagFilter
      ? sql<boolean>`exists (
          select 1
          from ${noteTags} nt
          inner join ${tags} t on t.id = nt.tag_id
          where nt.note_id = ${notes.id}
            and t.slug = ${slugify(tagFilter)}
        )`
      : undefined,
  ].filter(Boolean);

  const rows = await db
    .select()
    .from(notes)
    .where(and(...conditions))
    .orderBy(...getSort(filters.sort))
    .limit(100);

  const tagsByNoteId = await getTagsForNotes(rows.map((row) => row.id));
  return rows.map((row) => toNoteRecord(row, tagsByNoteId));
}

export async function getNoteById(id: string) {
  const row = await getDb().query.notes.findFirst({
    where: eq(notes.id, id),
  });

  if (!row) {
    return null;
  }

  const tagsByNoteId = await getTagsForNotes([row.id]);
  return toNoteRecord(row, tagsByNoteId);
}

export async function getAllTags() {
  const rows = await getDb()
    .select({
      id: tags.id,
      name: tags.name,
      slug: tags.slug,
      lastUsedAt: tags.lastUsedAt,
      noteCount: count(noteTags.noteId),
    })
    .from(tags)
    .leftJoin(noteTags, eq(noteTags.tagId, tags.id))
    .groupBy(tags.id)
    .orderBy(tags.name);

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    lastUsedAt: row.lastUsedAt,
    noteCount: row.noteCount,
  }));
}

export async function ensureTags(tagNames: string[]) {
  const db = getDb();
  const normalized = Array.from(
    new Set(tagNames.map((tag) => tag.trim()).filter(Boolean)),
  );

  if (normalized.length === 0) {
    return [];
  }

  for (const name of normalized) {
    await db
      .insert(tags)
      .values({
        id: crypto.randomUUID(),
        name,
        slug: slugify(name),
        lastUsedAt: new Date().toISOString(),
      })
      .onConflictDoNothing();
  }

  return db
    .select()
    .from(tags)
    .where(inArray(tags.slug, normalized.map((name) => slugify(name))));
}

export async function syncNoteTags(noteId: string, tagNames: string[]) {
  const db = getDb();
  const tagRows = await ensureTags(tagNames);

  await db.delete(noteTags).where(eq(noteTags.noteId, noteId));

  if (tagRows.length === 0) {
    return;
  }

  for (const tag of tagRows) {
    await db.insert(noteTags).values({
      noteId,
      tagId: tag.id,
    });

    await db
      .update(tags)
      .set({
        lastUsedAt: new Date().toISOString(),
      })
      .where(eq(tags.id, tag.id));
  }
}

export async function getTagSuggestions() {
  return getRecentlyUsedTags(20);
}
