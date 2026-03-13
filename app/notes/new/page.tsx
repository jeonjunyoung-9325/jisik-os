import { AppShell } from "@/components/app-shell";
import { NoteForm } from "@/components/forms/note-form";
import { SectionHeading } from "@/components/section-heading";
import { createNoteAction } from "@/lib/actions/notes";
import { NOTE_TYPES } from "@/lib/constants";
import type { NoteType } from "@/lib/types";

export default async function NewNotePage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const params = await searchParams;
  const requestedType = NOTE_TYPES.includes(params.type as NoteType)
    ? (params.type as NoteType)
    : "note";

  return (
    <AppShell currentPath="/notes">
      <SectionHeading
        title="새 노트"
        description="빠르게 캡처하고, 나중에 다시 찾기 쉽게 구조화하세요."
      />
      <NoteForm
        action={createNoteAction}
        submitLabel="노트 저장"
        initialValues={{ type: requestedType }}
      />
    </AppShell>
  );
}
