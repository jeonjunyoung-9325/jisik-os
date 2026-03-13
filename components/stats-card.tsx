export function StatsCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: number;
  hint: string;
}) {
  return (
    <div className="rounded-3xl border border-[var(--color-line)] bg-white p-5 shadow-sm">
      <p className="text-sm text-[var(--color-muted)]">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)]">
        {value}
      </p>
      <p className="mt-3 text-sm text-[var(--color-muted)]">{hint}</p>
    </div>
  );
}
