"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  getNoteById,
  getTagSuggestions,
  syncNoteTags,
} from "@/lib/db/queries";
import { getDb } from "@/lib/db/client";
import { notes } from "@/lib/db/schema";
import { scheduleNoteSummarization, scheduleSemanticIndexing } from "@/lib/ai/placeholders";
import type { FormState } from "@/lib/types";
import { validateNoteInput } from "@/lib/validations/note";
import { eq } from "drizzle-orm";

function getValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function getInput(formData: FormData) {
  return {
    title: getValue(formData, "title"),
    content: getValue(formData, "content"),
    type: getValue(formData, "type"),
    source: getValue(formData, "source"),
    url: getValue(formData, "url"),
    author: getValue(formData, "author"),
    tags: getValue(formData, "tags"),
    favorite: formData.get("favorite") === "on",
    bookTitle: getValue(formData, "bookTitle"),
    bookAuthor: getValue(formData, "bookAuthor"),
    highlight: getValue(formData, "highlight"),
    personalInsight: getValue(formData, "personalInsight"),
  };
}

function toErrorState(error: unknown): FormState {
  if (error instanceof Error) {
    return { error: error.message };
  }

  return { error: "저장 중 알 수 없는 문제가 발생했습니다." };
}

export async function createNoteAction(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const parsed = validateNoteInput(getInput(formData));
    const noteId = crypto.randomUUID();
    const now = new Date().toISOString();

    await getDb().insert(notes).values({
      id: noteId,
      title: parsed.title,
      content: parsed.content,
      type: parsed.type,
      source: parsed.source || null,
      url: parsed.url || null,
      author: parsed.author || null,
      favorite: parsed.favorite,
      bookTitle: parsed.bookTitle || null,
      bookAuthor: parsed.bookAuthor || null,
      highlight: parsed.highlight || null,
      personalInsight: parsed.personalInsight || null,
      updatedAt: now,
      createdAt: now,
    });

    await syncNoteTags(noteId, parsed.parsedTags);

    const note = await getNoteById(noteId);
    if (note) {
      await Promise.all([
        scheduleNoteSummarization(note),
        scheduleSemanticIndexing(note),
      ]);
    }

    revalidatePath("/");
    revalidatePath("/notes");
    revalidatePath("/tags");

    redirect(`/notes/${noteId}`);
  } catch (error) {
    return toErrorState(error);
  }
}

export async function updateNoteAction(
  noteId: string,
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const parsed = validateNoteInput(getInput(formData));

    await getDb()
      .update(notes)
      .set({
        title: parsed.title,
        content: parsed.content,
        type: parsed.type,
        source: parsed.source || null,
        url: parsed.url || null,
        author: parsed.author || null,
        favorite: parsed.favorite,
        bookTitle: parsed.bookTitle || null,
        bookAuthor: parsed.bookAuthor || null,
        highlight: parsed.highlight || null,
        personalInsight: parsed.personalInsight || null,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(notes.id, noteId));

    await syncNoteTags(noteId, parsed.parsedTags);

    const note = await getNoteById(noteId);
    if (note) {
      await Promise.all([
        scheduleNoteSummarization(note),
        scheduleSemanticIndexing(note),
      ]);
    }

    revalidatePath("/");
    revalidatePath("/notes");
    revalidatePath(`/notes/${noteId}`);
    revalidatePath(`/notes/${noteId}/edit`);
    revalidatePath("/tags");

    redirect(`/notes/${noteId}`);
  } catch (error) {
    return toErrorState(error);
  }
}

export async function deleteNoteAction(noteId: string) {
  await getDb().delete(notes).where(eq(notes.id, noteId));

  revalidatePath("/");
  revalidatePath("/notes");
  revalidatePath("/tags");

  redirect("/notes");
}

export async function getTagSuggestionsAction() {
  return getTagSuggestions();
}
