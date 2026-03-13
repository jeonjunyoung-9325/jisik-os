"use client";

import { useActionState } from "react";

import type { FormState } from "@/lib/types";
import { SubmitButton } from "@/components/forms/submit-button";

const initialState: FormState = {};

export function TagForm({
  action,
}: {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
}) {
  const [state, formAction] = useActionState(action, initialState);

  return (
    <form
      action={formAction}
      className="rounded-3xl border border-[var(--color-line)] bg-white p-5 shadow-sm"
    >
      <label className="flex flex-col gap-2 text-sm font-medium text-[var(--color-muted)]">
        새 태그 만들기
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            name="name"
            placeholder="예: writing"
            className="min-w-0 flex-1 rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-3 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)]"
          />
          <SubmitButton
            label="태그 추가"
            pendingLabel="추가 중..."
            className="rounded-2xl bg-[var(--color-ink)] px-4 py-3 text-sm font-medium text-white disabled:opacity-60"
          />
        </div>
      </label>
      {state.error ? (
        <p className="mt-3 text-sm text-red-700">{state.error}</p>
      ) : (
        <p className="mt-3 text-sm text-[var(--color-muted)]">
          태그는 노트 작성 시에도 자동으로 생성됩니다.
        </p>
      )}
    </form>
  );
}
