import Link from "next/link";

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="rounded-3xl border border-dashed border-[var(--color-line)] bg-white/80 p-10 text-center shadow-sm">
      <h2 className="text-lg font-semibold text-[var(--color-ink)]">{title}</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[var(--color-muted)]">
        {description}
      </p>
      {actionLabel && actionHref ? (
        <div className="mt-5">
          <Link
            href={actionHref}
            className="inline-flex rounded-full bg-[var(--color-ink)] px-4 py-2 text-sm font-medium text-white"
          >
            {actionLabel}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
