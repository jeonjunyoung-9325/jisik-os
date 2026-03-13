INSERT INTO tags (id, name, slug, created_at, last_used_at) VALUES
  ('tag-1', '독서', '독서', '2026-03-14T08:00:00.000Z', '2026-03-14T08:00:00.000Z'),
  ('tag-2', '생산성', '생산성', '2026-03-14T08:00:00.000Z', '2026-03-14T08:00:00.000Z'),
  ('tag-3', 'AI', 'ai', '2026-03-14T08:00:00.000Z', '2026-03-14T08:00:00.000Z'),
  ('tag-4', '링크', '링크', '2026-03-14T08:00:00.000Z', '2026-03-14T08:00:00.000Z')
ON CONFLICT DO NOTHING;

INSERT INTO notes (
  id,
  title,
  content,
  type,
  source,
  url,
  author,
  favorite,
  book_title,
  book_author,
  highlight,
  personal_insight,
  ai_summary_status,
  semantic_status,
  created_at,
  updated_at
) VALUES
  (
    'note-1',
    '아침 리뷰 루틴 초안',
    '하루를 시작할 때 10분만 써도 머릿속이 정리된다.\n\n- 어제 배운 것 1개\n- 오늘 가장 중요한 일 1개\n- 놓치면 안 되는 사람 1명',
    'note',
    '개인 회고',
    NULL,
    'Juna',
    1,
    NULL,
    NULL,
    NULL,
    '단순한 루틴일수록 반복 가능성이 높다.',
    'not_started',
    'not_indexed',
    '2026-03-14T08:10:00.000Z',
    '2026-03-14T08:10:00.000Z'
  ),
  (
    'note-2',
    '《Atomic Habits》에서 남긴 메모',
    '정체성 기반 습관 설계가 가장 오래간다.',
    'reading',
    '도서 메모',
    NULL,
    'James Clear',
    1,
    'Atomic Habits',
    'James Clear',
    'You do not rise to the level of your goals. You fall to the level of your systems.',
    '목표보다 시스템을 먼저 설계해야 한다는 점이 인상 깊었다.',
    'not_started',
    'not_indexed',
    '2026-03-14T08:20:00.000Z',
    '2026-03-14T08:20:00.000Z'
  ),
  (
    'note-3',
    '나중에 읽을 AI UX 아티클',
    '개인 지식 도구는 검색보다 리서페이싱 경험이 중요하다는 글.',
    'link',
    '블로그',
    'https://example.com/ai-ux',
    'Example Author',
    0,
    NULL,
    NULL,
    NULL,
    '나중에 AI 기반 재노출 기능을 붙일 때 참고할 만하다.',
    'not_started',
    'not_indexed',
    '2026-03-14T08:30:00.000Z',
    '2026-03-14T08:30:00.000Z'
  )
ON CONFLICT DO NOTHING;

INSERT INTO note_tags (note_id, tag_id, assigned_at) VALUES
  ('note-1', 'tag-2', '2026-03-14T08:10:00.000Z'),
  ('note-2', 'tag-1', '2026-03-14T08:20:00.000Z'),
  ('note-2', 'tag-2', '2026-03-14T08:20:00.000Z'),
  ('note-3', 'tag-3', '2026-03-14T08:30:00.000Z'),
  ('note-3', 'tag-4', '2026-03-14T08:30:00.000Z')
ON CONFLICT DO NOTHING;
