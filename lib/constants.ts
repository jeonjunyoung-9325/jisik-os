export const NOTE_TYPES = ["note", "reading", "link", "idea"] as const;

export const NOTE_TYPE_LABELS: Record<(typeof NOTE_TYPES)[number], string> = {
  note: "일반 노트",
  reading: "독서 노트",
  link: "링크",
  idea: "아이디어",
};

export const SORT_OPTIONS = ["newest", "updated", "title"] as const;

export const SORT_LABELS: Record<(typeof SORT_OPTIONS)[number], string> = {
  newest: "최신순",
  updated: "수정순",
  title: "제목순",
};

export const APP_NAME =
  process.env.NEXT_PUBLIC_APP_NAME?.trim() || "Jisik OS";
