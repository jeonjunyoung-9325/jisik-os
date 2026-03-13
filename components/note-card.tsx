import Link from "next/link";

import { NOTE_TYPE_LABELS } from "@/lib/constants";
import type { NoteRecord } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { TagChip } from "@/components/tag-chip";

export function NoteCard({ note }: { note: NoteRecord }) {
  return (
    <article className="rounded-3xl border border-[var(--color-line)] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--color-muted)]">
        <span className="rounded-full bg-[var(--color-panel)] px-2.5 py-1 font-medium text-[var(--color-ink)]">
          {NOTE_TYPE_LABELS[note.type]}
        </span>
        {note.favorite ? (
          <span className="rounded-full bg-amber-100 px-2.5 py-1 font-medium text-amber-900">
            즐겨찾기
          </span>
        ) : null}
        <span>{formatDate(note.updatedAt)}</span>
      </div>

      <div className="mt-4">
        <Link href={`/notes/${note.id}`} className="group">
          <h3 className="text-lg font-semibold text-[var(--color-ink)] transition group-hover:text-[var(--color-accent)]">
            {note.title}
          </h3>
        </Link>

        {note.source ? (
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            출처: {note.source}
          </p>
        ) : null}

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--color-muted)]">
          {note.content || note.personalInsight || note.highlight || "아직 내용이 없습니다."}
        </p>
      </div>

      {note.tags.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {note.tags.map((tag) => (
            <TagChip key={tag.id} name={tag.name} href={`/notes?tag=${tag.slug}`} />
          ))}
        </div>
      ) : null}
    </article>
  );
}
