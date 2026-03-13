"use client";

export function DeleteNoteButton({
  action,
}: {
  action: () => Promise<void>;
}) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm("이 노트를 삭제할까요? 이 작업은 되돌릴 수 없습니다.")) {
          event.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50"
      >
        삭제
      </button>
    </form>
  );
}
