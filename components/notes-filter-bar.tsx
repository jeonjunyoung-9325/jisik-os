import Link from "next/link";

import { NOTE_TYPE_LABELS, NOTE_TYPES, SORT_LABELS, SORT_OPTIONS } from "@/lib/constants";
import type { NotesFilters } from "@/lib/types";

export function NotesFilterBar({
  filters,
  basePath,
}: {
  filters: NotesFilters;
  basePath: "/notes" | "/search";
}) {
  const currentType = filters.type ?? "all";
  const currentSort = filters.sort ?? "newest";
  const favoritesOnly = filters.favorite === "1";

  return (
    <form className="rounded-3xl border border-[var(--color-line)] bg-white p-4 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-[1.6fr_0.8fr_0.8fr_auto_auto]">
        <label className="flex flex-col gap-2 text-sm font-medium text-[var(--color-muted)]">
          검색
          <input
            type="search"
            name="query"
            defaultValue={filters.query ?? ""}
            placeholder="제목, 내용, 출처, 태그 검색"
            className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-3 text-sm text-[var(--color-ink)] outline-none ring-0 placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)]"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-[var(--color-muted)]">
          타입
          <select
            name="type"
            defaultValue={currentType}
            className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-3 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)]"
          >
            <option value="all">전체</option>
            {NOTE_TYPES.map((type) => (
              <option key={type} value={type}>
                {NOTE_TYPE_LABELS[type]}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-[var(--color-muted)]">
          정렬
          <select
            name="sort"
            defaultValue={currentSort}
            className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-3 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)]"
          >
            {SORT_OPTIONS.map((sort) => (
              <option key={sort} value={sort}>
                {SORT_LABELS[sort]}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-3 rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-3 text-sm font-medium text-[var(--color-ink)]">
          <input
            type="checkbox"
            name="favorite"
            value="1"
            defaultChecked={favoritesOnly}
            className="size-4 rounded border-[var(--color-line)]"
          />
          즐겨찾기만
        </label>

        <div className="flex gap-2">
          <button
            type="submit"
            className="rounded-2xl bg-[var(--color-ink)] px-4 py-3 text-sm font-medium text-white"
          >
            적용
          </button>
          <Link
            href={basePath}
            className="rounded-2xl border border-[var(--color-line)] px-4 py-3 text-sm font-medium text-[var(--color-muted)]"
          >
            초기화
          </Link>
        </div>
      </div>
    </form>
  );
}
