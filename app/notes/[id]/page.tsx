import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { AppShell } from "@/components/app-shell";
import { DeleteNoteButton } from "@/components/delete-note-button";
import { SectionHeading } from "@/components/section-heading";
import { TagChip } from "@/components/tag-chip";
import { deleteNoteAction } from "@/lib/actions/notes";
import { NOTE_TYPE_LABELS } from "@/lib/constants";
import { getNoteById } from "@/lib/db/queries";
import { formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function NoteDetailPage({
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
        title={note.title}
        description={`${NOTE_TYPE_LABELS[note.type]} · 수정 ${formatDateTime(note.updatedAt)}`}
        actions={
          <>
            <Link
              href={`/notes/${note.id}/edit`}
              className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-sm font-medium text-white"
            >
              수정
            </Link>
            <DeleteNoteButton action={deleteNoteAction.bind(null, note.id)} />
          </>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[2fr_0.9fr]">
        <article className="rounded-3xl border border-[var(--color-line)] bg-white p-6 shadow-sm">
          {note.tags.length > 0 ? (
            <div className="mb-5 flex flex-wrap gap-2">
              {note.tags.map((tag) => (
                <TagChip key={tag.id} name={tag.name} href={`/notes?tag=${tag.slug}`} />
              ))}
            </div>
          ) : null}

          <div className="prose prose-neutral max-w-none">
            {note.content ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{note.content}</ReactMarkdown>
            ) : (
              <p>아직 본문 내용이 없습니다.</p>
            )}
          </div>

          {note.highlight ? (
            <section className="mt-8 rounded-3xl bg-[var(--color-panel)] p-5">
              <h2 className="text-base font-semibold text-[var(--color-ink)]">
                하이라이트
              </h2>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-[var(--color-muted)]">
                {note.highlight}
              </p>
            </section>
          ) : null}

          {note.personalInsight ? (
            <section className="mt-6 rounded-3xl bg-[var(--color-panel)] p-5">
              <h2 className="text-base font-semibold text-[var(--color-ink)]">
                개인 인사이트
              </h2>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-[var(--color-muted)]">
                {note.personalInsight}
              </p>
            </section>
          ) : null}
        </article>

        <aside className="space-y-5">
          <section className="rounded-3xl border border-[var(--color-line)] bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-[var(--color-ink)]">메타 정보</h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-[var(--color-muted)]">타입</dt>
                <dd className="mt-1 font-medium text-[var(--color-ink)]">
                  {NOTE_TYPE_LABELS[note.type]}
                </dd>
              </div>
              <div>
                <dt className="text-[var(--color-muted)]">작성일</dt>
                <dd className="mt-1 font-medium text-[var(--color-ink)]">
                  {formatDateTime(note.createdAt)}
                </dd>
              </div>
              {note.source ? (
                <div>
                  <dt className="text-[var(--color-muted)]">출처</dt>
                  <dd className="mt-1 font-medium text-[var(--color-ink)]">
                    {note.source}
                  </dd>
                </div>
              ) : null}
              {note.author ? (
                <div>
                  <dt className="text-[var(--color-muted)]">작성자 / 저자</dt>
                  <dd className="mt-1 font-medium text-[var(--color-ink)]">
                    {note.author}
                  </dd>
                </div>
              ) : null}
              {note.bookTitle ? (
                <div>
                  <dt className="text-[var(--color-muted)]">책 / 아티클</dt>
                  <dd className="mt-1 font-medium text-[var(--color-ink)]">
                    {note.bookTitle}
                    {note.bookAuthor ? ` · ${note.bookAuthor}` : ""}
                  </dd>
                </div>
              ) : null}
              {note.url ? (
                <div>
                  <dt className="text-[var(--color-muted)]">원문 링크</dt>
                  <dd className="mt-1">
                    <a
                      href={note.url}
                      target="_blank"
                      rel="noreferrer"
                      className="break-all font-medium text-[var(--color-accent)]"
                    >
                      {note.url}
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>
          </section>

          <section className="rounded-3xl border border-[var(--color-line)] bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-[var(--color-ink)]">
              AI 준비 상태
            </h2>
            <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
              요약과 시맨틱 검색을 위한 컬럼이 이미 준비되어 있습니다. 현재 MVP에서는
              실제 AI 작업을 연결하지 않았고, 향후 Queue 또는 Worker로 쉽게 확장할 수
              있도록 코드에 TODO 지점을 남겨두었습니다.
            </p>
          </section>
        </aside>
      </div>
    </AppShell>
  );
}
