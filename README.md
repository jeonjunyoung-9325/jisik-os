# Jisik OS

Jisik OS는 개인용 지식 관리 MVP입니다. 메모, 독서 노트, 링크, 아이디어를 한 곳에 저장하고 빠르게 검색, 분류, 재방문할 수 있도록 설계했습니다.

## 주요 기능

- 최근 노트와 통계를 보여주는 대시보드
- 노트 / 독서 노트 / 링크 / 아이디어 통합 저장
- 태그 기반 분류 및 태그 목록
- 검색, 타입 필터, 즐겨찾기 필터, 정렬
- 개별 상세 페이지와 수정/삭제 흐름
- Cloudflare D1 + Drizzle 기반 구조
- 향후 AI 요약/검색을 붙이기 쉬운 확장 포인트

## 빠른 시작

```bash
npm install
npm run db:migrate:local
npm run db:seed:local
npm run dev
```

## 배포

```bash
npm run cf:build
npm run cf:deploy
```

배포 전에는 `wrangler.jsonc`의 `database_id`를 실제 D1 데이터베이스 ID로 바꿔주세요.
