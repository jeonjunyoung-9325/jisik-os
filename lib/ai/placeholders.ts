import "server-only";

import type { NoteRecord } from "@/lib/types";

export async function scheduleNoteSummarization(_note: NoteRecord) {
  // TODO: AI 요약 파이프라인 연결 지점
  // 예: Queue, Workflow, Durable Object, 외부 LLM API 호출 등을 연결
}

export async function scheduleSemanticIndexing(_note: NoteRecord) {
  // TODO: 벡터 임베딩 생성 및 인덱싱 연결 지점
}
