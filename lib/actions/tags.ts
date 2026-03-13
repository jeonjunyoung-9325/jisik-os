"use server";

import { revalidatePath } from "next/cache";

import { ensureTags } from "@/lib/db/queries";
import type { FormState } from "@/lib/types";

export async function createTagAction(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const raw = formData.get("name");
  const name = typeof raw === "string" ? raw.trim() : "";

  if (!name) {
    return { error: "태그 이름을 입력해 주세요." };
  }

  await ensureTags([name]);

  revalidatePath("/");
  revalidatePath("/notes");
  revalidatePath("/tags");

  return {};
}
