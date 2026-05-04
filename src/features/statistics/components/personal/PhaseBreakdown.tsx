interface PhaseBreakdownProps {
  open: number
  completed: number
  rejected: number
}

export const PhaseBreakdown = ({ open, completed, rejected }: PhaseBreakdownProps) => {
  const total = open + completed + rejected
  const pct = (n: number) => (total === 0 ? 0 : (n / total) * 100)

  return (
    <div className="rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 p-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400 mb-3">
        Phase distribution
      </p>

      {total === 0 ? (
        <p className="text-sm text-gray-400">No records yet</p>
      ) : (
        <>
          <div className="flex h-2.5 rounded-full overflow-hidden bg-gray-100">
            <div className="bg-blue-400" style={{ width: `${pct(open)}%` }} />
            <div className="bg-emerald-500" style={{ width: `${pct(completed)}%` }} />
            <div className="bg-rose-400" style={{ width: `${pct(rejected)}%` }} />
          </div>

          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5">
            <PhaseLegend color="bg-blue-400" label="Open" count={open} pct={pct(open)} />
            <PhaseLegend
              color="bg-emerald-500"
              label="Completed"
              count={completed}
              pct={pct(completed)}
            />
            <PhaseLegend
              color="bg-rose-400"
              label="Rejected"
              count={rejected}
              pct={pct(rejected)}
            />
          </div>
        </>
      )}
    </div>
  )
}

const PhaseLegend = ({
  color,
  label,
  count,
  pct,
}: {
  color: string
  label: string
  count: number
  pct: number
}) => (
  <div className="flex items-center gap-1.5">
    <span className={`h-2 w-2 rounded-full ${color}`} />
    <span className="text-xs text-gray-500">{label}</span>
    <span className="text-xs font-semibold text-gray-800 tabular-nums">
      {count} <span className="text-gray-400 font-normal">({pct.toFixed(1)}%)</span>
    </span>
  </div>
)
