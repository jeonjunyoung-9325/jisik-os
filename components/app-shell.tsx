import Link from "next/link";

import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "대시보드" },
  { href: "/notes", label: "노트" },
  { href: "/tags", label: "태그" },
  { href: "/search", label: "검색" },
];

export function AppShell({
  children,
  currentPath,
}: {
  children: React.ReactNode;
  currentPath?: string;
}) {
  return (
    <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-ink)]">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-5 rounded-3xl border border-[var(--color-line)] bg-white/90 px-5 py-5 shadow-sm backdrop-blur sm:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <Link href="/" className="inline-flex items-center gap-3">
                <span className="rounded-2xl bg-[var(--color-panel)] px-3 py-2 text-sm font-semibold tracking-[0.14em] text-[var(--color-muted)] uppercase">
                  JI
                </span>
                <div>
                  <p className="text-lg font-semibold">{APP_NAME}</p>
                  <p className="text-sm text-[var(--color-muted)]">
                    개인 지식 운영체제를 위한 조용한 작업 공간
                  </p>
                </div>
              </Link>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/notes/new" className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90">
                새 노트
              </Link>
              <Link href="/notes/new?type=reading" className="rounded-full border border-[var(--color-line)] px-4 py-2 text-sm font-medium text-[var(--color-ink)] transition hover:bg-[var(--color-panel)]">
                새 독서 노트
              </Link>
              <Link href="/notes/new?type=link" className="rounded-full border border-[var(--color-line)] px-4 py-2 text-sm font-medium text-[var(--color-ink)] transition hover:bg-[var(--color-panel)]">
                링크 저장
              </Link>
            </div>
          </div>

          <nav className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  currentPath === item.href
                    ? "bg-[var(--color-accent)] text-white"
                    : "text-[var(--color-muted)] hover:bg-[var(--color-panel)] hover:text-[var(--color-ink)]",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
