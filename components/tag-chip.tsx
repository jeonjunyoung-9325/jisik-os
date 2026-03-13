import Link from "next/link";

import { cn } from "@/lib/utils";

export function TagChip({
  name,
  href,
  count,
  active = false,
}: {
  name: string;
  href?: string;
  count?: number;
  active?: boolean;
}) {
  const content = (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition",
        active
          ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
          : "border-[var(--color-line)] bg-white text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-ink)]",
      )}
    >
      <span>#{name}</span>
      {typeof count === "number" ? (
        <span className="rounded-full bg-black/5 px-2 py-0.5 text-xs">
          {count}
        </span>
      ) : null}
    </span>
  );

  if (!href) {
    return content;
  }

  return <Link href={href}>{content}</Link>;
}
