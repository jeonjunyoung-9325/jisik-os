import Link from "next/link";

import { AppShell } from "@/components/app-shell";
import { EmptyState } from "@/components/empty-state";
import { NoteCard } from "@/components/note-card";
import { NotesFilterBar } from "@/components/notes-filter-bar";
import { SectionHeading } from "@/components/section-heading";
import { getNotes } from "@/lib/db/queries";
import type { NotesFilters } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function NotesPage({
  searchParams,
}: {
  searchParams: Promise<NotesFilters>;
}) {
  const filters = await searchParams;
  const noteList = await getNotes(filters);

  return (
    <AppShell currentPath="/notes">
      <SectionHeading
        title="노트"
        description="메모, 독서 노트, 링크, 아이디어를 한곳에서 관리하세요."
        actions={
          <Link
            href="/notes/new"
            className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-sm font-medium text-white"
          >
            새 노트
          </Link>
        }
      />

      <div className="space-y-5">
        <NotesFilterBar filters={filters} basePath="/notes" />

        {noteList.length === 0 ? (
          <EmptyState
            title="조건에 맞는 노트가 없습니다."
            description="검색어나 필터를 조정하거나 새 노트를 추가해 보세요."
            actionLabel="새 노트 만들기"
            actionHref="/notes/new"
          />
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {noteList.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
