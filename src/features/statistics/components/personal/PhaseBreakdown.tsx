import type { PhaseBreakdownViewModel } from '@/features/statistics/model/phase.viewmodel'

interface Props {
  vm: PhaseBreakdownViewModel
}

export const PhaseBreakdown = ({ vm }: Props) => (
  <div className="rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 p-5">
    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400 mb-3">
      Phase distribution
    </p>

    {vm.isEmpty ? (
      <p className="text-sm text-gray-400">No records yet</p>
    ) : (
      <>
        <div className="flex h-2.5 rounded-full overflow-hidden bg-gray-100">
          <div className="bg-blue-400" style={{ width: `${vm.open.pct}%` }} />
          <div className="bg-emerald-500" style={{ width: `${vm.completed.pct}%` }} />
          <div className="bg-rose-400" style={{ width: `${vm.rejected.pct}%` }} />
        </div>

        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5">
          <PhaseLegend color="bg-blue-400" label="Open" segment={vm.open} />
          <PhaseLegend color="bg-emerald-500" label="Completed" segment={vm.completed} />
          <PhaseLegend color="bg-rose-400" label="Rejected" segment={vm.rejected} />
        </div>
      </>
    )}
  </div>
)

const PhaseLegend = ({
  color,
  label,
  segment,
}: {
  color: string
  label: string
  segment: PhaseBreakdownViewModel['open']
}) => (
  <div className="flex items-center gap-1.5">
    <span className={`h-2 w-2 rounded-full ${color}`} />
    <span className="text-xs text-gray-500">{label}</span>
    <span className="text-xs font-semibold text-gray-800 tabular-nums">
      {segment.count} <span className="text-gray-400 font-normal">({segment.pct.toFixed(1)}%)</span>
    </span>
  </div>
)
