"use client";

import { useActionState, useState } from "react";

import { NOTE_TYPE_LABELS, NOTE_TYPES } from "@/lib/constants";
import type { FormState, NoteFormValues } from "@/lib/types";
import { SubmitButton } from "@/components/forms/submit-button";

const initialState: FormState = {};

export function NoteForm({
  action,
  initialValues,
  submitLabel,
}: {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  initialValues?: NoteFormValues;
  submitLabel: string;
}) {
  const [state, formAction] = useActionState(action, initialState);
  const [selectedType, setSelectedType] = useState(initialValues?.type ?? "note");
  const isReading = selectedType === "reading";

  return (
    <form action={formAction} className="space-y-6 rounded-3xl border border-[var(--color-line)] bg-white p-5 shadow-sm sm:p-6">
      {state.error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {state.error}
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-[var(--color-muted)] md:col-span-2">
          제목
          <input
            name="title"
            required
            defaultValue={initialValues?.title ?? ""}
            className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-3 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)]"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-[var(--color-muted)]">
          타입
          <select
            name="type"
            defaultValue={selectedType}
            onChange={(event) => setSelectedType(event.target.value as typeof selectedType)}
            className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-3 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)]"
          >
            {NOTE_TYPES.map((type) => (
              <option key={type} value={type}>
                {NOTE_TYPE_LABELS[type]}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-[var(--color-muted)]">
          작성자 / 저자
          <input
            name="author"
            defaultValue={initialValues?.author ?? ""}
            className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-3 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)]"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-[var(--color-muted)]">
          출처
          <input
            name="source"
            defaultValue={initialValues?.source ?? ""}
            placeholder="책, 뉴스레터, 대화, 강의 등"
            className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-3 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)]"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-[var(--color-muted)]">
          URL
          <input
            name="url"
            type="url"
            defaultValue={initialValues?.url ?? ""}
            placeholder="https://example.com"
            className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-3 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)]"
          />
        </label>

        <label className="flex items-center gap-3 rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-3 text-sm font-medium text-[var(--color-ink)]">
          <input
            name="favorite"
            type="checkbox"
            defaultChecked={initialValues?.favorite ?? false}
            className="size-4 rounded"
          />
          즐겨찾기에 추가
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-[var(--color-muted)] md:col-span-2">
          태그
          <input
            name="tags"
            defaultValue={initialValues?.tags ?? ""}
            placeholder="예: productivity, ai, 독서"
            className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-3 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)]"
          />
          <span className="text-xs text-[var(--color-muted)]">
            쉼표로 구분해서 여러 태그를 입력할 수 있습니다.
          </span>
        </label>

        {(isReading || initialValues?.bookTitle || initialValues?.highlight || initialValues?.personalInsight) ? (
          <>
            <label className="flex flex-col gap-2 text-sm font-medium text-[var(--color-muted)]">
              책 / 아티클 제목
              <input
                name="bookTitle"
                defaultValue={initialValues?.bookTitle ?? ""}
                className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-3 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)]"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-[var(--color-muted)]">
              책 저자
              <input
                name="bookAuthor"
                defaultValue={initialValues?.bookAuthor ?? ""}
                className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-3 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)]"
              />
            </label>
          </>
        ) : null}
      </div>

      <label className="flex flex-col gap-2 text-sm font-medium text-[var(--color-muted)]">
        내용
        <textarea
          name="content"
          defaultValue={initialValues?.content ?? ""}
          rows={10}
          placeholder="핵심 내용, 메모, 떠오른 생각을 자유롭게 적어 주세요."
          className="min-h-48 rounded-3xl border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-4 text-sm leading-7 text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)]"
        />
      </label>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-[var(--color-muted)]">
          하이라이트
          <textarea
            name="highlight"
            defaultValue={initialValues?.highlight ?? ""}
            rows={6}
            placeholder="독서 노트일 경우 인상 깊은 문장을 기록하세요."
            className="rounded-3xl border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-4 text-sm leading-7 text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)]"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-[var(--color-muted)]">
          개인 인사이트
          <textarea
            name="personalInsight"
            defaultValue={initialValues?.personalInsight ?? ""}
            rows={6}
            placeholder="왜 중요했는지, 내 삶이나 일과 어떤 연결이 있는지 남겨 주세요."
            className="rounded-3xl border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-4 text-sm leading-7 text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)]"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-3">
        <SubmitButton
          label={submitLabel}
          pendingLabel="저장 중..."
          className="rounded-full bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>
    </form>
  );
}
