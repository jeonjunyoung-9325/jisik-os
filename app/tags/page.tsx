import { AppShell } from "@/components/app-shell";
import { TagForm } from "@/components/forms/tag-form";
import { EmptyState } from "@/components/empty-state";
import { SectionHeading } from "@/components/section-heading";
import { TagChip } from "@/components/tag-chip";
import { createTagAction } from "@/lib/actions/tags";
import { getAllTags } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export default async function TagsPage() {
  const tagList = await getAllTags();

  return (
    <AppShell currentPath="/tags">
      <SectionHeading
        title="태그"
        description="태그는 지식의 주제를 다시 찾게 해 주는 가장 빠른 인덱스입니다."
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_1.4fr]">
        <TagForm action={createTagAction} />

        <section className="rounded-3xl border border-[var(--color-line)] bg-white p-5 shadow-sm">
          <SectionHeading
            title="태그 목록"
            description={`${tagList.length}개의 태그가 저장되어 있습니다.`}
          />

          {tagList.length === 0 ? (
            <EmptyState
              title="아직 태그가 없습니다."
              description="노트 작성 시 태그를 추가하거나 왼쪽 폼에서 직접 태그를 만들 수 있습니다."
            />
          ) : (
            <div className="flex flex-wrap gap-3">
              {tagList.map((tag) => (
                <TagChip
                  key={tag.id}
                  name={tag.name}
                  count={tag.noteCount}
                  href={`/notes?tag=${tag.slug}`}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}
