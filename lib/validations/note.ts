import { z } from "zod";

import { NOTE_TYPES } from "@/lib/constants";
import { parseTags } from "@/lib/utils";

export const noteSchema = z.object({
  title: z.string().trim().min(1, "제목을 입력해 주세요.").max(120, "제목은 120자 이하로 입력해 주세요."),
  content: z.string().trim().max(20000, "내용이 너무 깁니다.").optional().default(""),
  type: z.enum(NOTE_TYPES),
  source: z.string().trim().max(160, "출처는 160자 이하로 입력해 주세요.").optional().default(""),
  url: z
    .string()
    .trim()
    .optional()
    .default("")
    .refine((value) => !value || /^https?:\/\//.test(value), "URL은 http:// 또는 https://로 시작해야 합니다."),
  author: z.string().trim().max(120, "작성자/저자는 120자 이하로 입력해 주세요.").optional().default(""),
  tags: z.string().optional().default(""),
  favorite: z.boolean().optional().default(false),
  bookTitle: z.string().trim().max(160, "책 제목은 160자 이하로 입력해 주세요.").optional().default(""),
  bookAuthor: z.string().trim().max(120, "책 저자는 120자 이하로 입력해 주세요.").optional().default(""),
  highlight: z.string().trim().max(4000, "하이라이트가 너무 깁니다.").optional().default(""),
  personalInsight: z.string().trim().max(4000, "개인 인사이트가 너무 깁니다.").optional().default(""),
});

export type NoteInput = z.infer<typeof noteSchema> & {
  parsedTags: string[];
};

export function validateNoteInput(values: Record<string, unknown>): NoteInput {
  const parsed = noteSchema.parse(values);

  return {
    ...parsed,
    parsedTags: parseTags(parsed.tags),
  };
}
