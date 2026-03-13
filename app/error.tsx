"use client";

import { AppShell } from "@/components/app-shell";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <AppShell>
      <div className="rounded-3xl border border-red-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-red-700">오류가 발생했습니다.</p>
        <h1 className="mt-3 text-2xl font-semibold text-[var(--color-ink)]">
          잠시 후 다시 시도해 주세요.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
          {error.message}
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-5 rounded-full bg-[var(--color-ink)] px-4 py-2 text-sm font-medium text-white"
        >
          다시 시도
        </button>
      </div>
    </AppShell>
  );
}
