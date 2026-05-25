export function SectionDivider({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="flex-1 h-px" style={{ background: "var(--section-line)" }} />
      <span
        className="text-xs font-semibold uppercase whitespace-nowrap"
        style={{ color: "var(--section-label)", letterSpacing: "0.12em" }}
      >
        {title}
      </span>
      <div className="flex-1 h-px" style={{ background: "var(--section-line)" }} />
    </div>
  )
}