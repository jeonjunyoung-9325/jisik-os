import Link from "next/link";

import { AppShell } from "@/components/app-shell";
import { EmptyState } from "@/components/empty-state";
import { NoteCard } from "@/components/note-card";
import { SectionHeading } from "@/components/section-heading";
import { StatsCard } from "@/components/stats-card";
import { TagChip } from "@/components/tag-chip";
import {
  getDashboardStats,
  getRecentNotes,
  getRecentlyUsedTags,
} from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [stats, recentNotes, recentTags] = await Promise.all([
    getDashboardStats(),
    getRecentNotes(6),
    getRecentlyUsedTags(8),
  ]);

  return (
    <AppShell currentPath="/">
      <SectionHeading
        title="대시보드"
        description="최근 쌓인 생각과 다시 봐야 할 지식을 한눈에 확인하세요."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="전체 노트" value={stats.totalNotes} hint="축적된 메모와 아이디어" />
        <StatsCard label="독서 노트" value={stats.totalBooks} hint="책과 아티클에서 건진 인사이트" />
        <StatsCard label="저장한 링크" value={stats.totalLinks} hint="나중에 다시 볼 웹 자료" />
        <StatsCard label="전체 태그" value={stats.totalTags} hint="지식의 흐름을 만드는 분류 체계" />
      </section>

      <section className="mt-10 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div>
          <SectionHeading
            title="최근 노트"
            description="마지막으로 수정한 항목부터 보여줍니다."
            actions={
              <Link
                href="/notes"
                className="rounded-full border border-[var(--color-line)] px-4 py-2 text-sm font-medium text-[var(--color-ink)]"
              >
                전체 보기
              </Link>
            }
          />

          {recentNotes.length === 0 ? (
            <EmptyState
              title="아직 저장된 노트가 없습니다."
              description="첫 메모를 남기면 이 공간이 최근 활동 중심의 개인 지식 대시보드로 바뀝니다."
              actionLabel="첫 노트 만들기"
              actionHref="/notes/new"
            />
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {recentNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <section className="rounded-3xl border border-[var(--color-line)] bg-white p-5 shadow-sm">
            <SectionHeading
              title="빠른 액션"
              description="자주 쓰는 캡처 흐름으로 바로 이동"
            />
            <div className="grid gap-3">
              <Link href="/notes/new" className="rounded-2xl bg-[var(--color-panel)] px-4 py-3 text-sm font-medium text-[var(--color-ink)]">
                새 노트 작성
              </Link>
              <Link href="/notes/new?type=reading" className="rounded-2xl bg-[var(--color-panel)] px-4 py-3 text-sm font-medium text-[var(--color-ink)]">
                새 독서 노트
              </Link>
              <Link href="/notes/new?type=link" className="rounded-2xl bg-[var(--color-panel)] px-4 py-3 text-sm font-medium text-[var(--color-ink)]">
                새 링크 저장
              </Link>
            </div>
          </section>

          <section className="rounded-3xl border border-[var(--color-line)] bg-white p-5 shadow-sm">
            <SectionHeading
              title="최근 사용 태그"
              description="자주 다루는 주제를 빠르게 다시 탐색"
            />
            {recentTags.length === 0 ? (
              <p className="text-sm leading-6 text-[var(--color-muted)]">
                태그가 아직 없습니다. 노트에 태그를 추가하면 이 영역이 채워집니다.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {recentTags.map((tag) => (
                  <TagChip
                    key={tag.id}
                    name={tag.name}
                    count={tag.noteCount}
                    href={`/notes?tag=${tag.slug}`}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </section>
    </AppShell>
  );
}
