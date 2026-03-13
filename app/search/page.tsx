import Link from "next/link";

import { AppShell } from "@/components/app-shell";
import { EmptyState } from "@/components/empty-state";
import { NoteCard } from "@/components/note-card";
import { NotesFilterBar } from "@/components/notes-filter-bar";
import { SectionHeading } from "@/components/section-heading";
import { getNotes } from "@/lib/db/queries";
import type { NotesFilters } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<NotesFilters>;
}) {
  const filters = await searchParams;
  const query = filters.query?.trim() ?? "";
  const results = query ? await getNotes(filters) : [];

  return (
    <AppShell currentPath="/search">
      <SectionHeading
        title="검색"
        description="제목, 본문, 출처, 태그를 기준으로 저장된 지식을 빠르게 다시 찾으세요."
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
        <NotesFilterBar filters={filters} basePath="/search" />

        {!query ? (
          <EmptyState
            title="검색어를 입력해 보세요."
            description="예: 독서, AI, 회고, 뉴스레터, 특정 태그 이름"
          />
        ) : results.length === 0 ? (
          <EmptyState
            title="검색 결과가 없습니다."
            description={`"${query}"와 일치하는 결과를 찾지 못했습니다. 다른 키워드나 필터를 시도해 보세요.`}
          />
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {results.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
