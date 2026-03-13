import Link from "next/link";

import { AppShell } from "@/components/app-shell";

export default function NotFound() {
  return (
    <AppShell>
      <div className="rounded-3xl border border-[var(--color-line)] bg-white p-10 text-center shadow-sm">
        <p className="text-sm font-medium text-[var(--color-muted)]">
          요청한 노트를 찾지 못했습니다.
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-[var(--color-ink)]">
          존재하지 않거나 삭제된 항목입니다.
        </h1>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/notes"
            className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-sm font-medium text-white"
          >
            노트 목록
          </Link>
          <Link
            href="/"
            className="rounded-full border border-[var(--color-line)] px-4 py-2 text-sm font-medium text-[var(--color-ink)]"
          >
            대시보드
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
