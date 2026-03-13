import { AppShell } from "@/components/app-shell";

export default function Loading() {
  return (
    <AppShell>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-3xl border border-[var(--color-line)] bg-white/70"
          />
        ))}
      </div>
    </AppShell>
  );
}
