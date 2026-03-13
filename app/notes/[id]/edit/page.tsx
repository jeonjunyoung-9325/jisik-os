import { notFound } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { NoteForm } from "@/components/forms/note-form";
import { SectionHeading } from "@/components/section-heading";
import { updateNoteAction } from "@/lib/actions/notes";
import { getNoteById } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export default async function EditNotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const note = await getNoteById(id);

  if (!note) {
    notFound();
  }

  return (
    <AppShell currentPath="/notes">
      <SectionHeading
        title="노트 수정"
        description="내용을 다듬고 태그를 정리해서 나중에 더 쉽게 찾을 수 있게 만드세요."
      />
      <NoteForm
        action={updateNoteAction.bind(null, note.id)}
        submitLabel="변경사항 저장"
        initialValues={{
          title: note.title,
          content: note.content,
          type: note.type,
          source: note.source ?? "",
          url: note.url ?? "",
          author: note.author ?? "",
          tags: note.tags.map((tag) => tag.name).join(", "),
          favorite: note.favorite,
          bookTitle: note.bookTitle ?? "",
          bookAuthor: note.bookAuthor ?? "",
          highlight: note.highlight ?? "",
          personalInsight: note.personalInsight ?? "",
        }}
      />
    </AppShell>
  );
}
