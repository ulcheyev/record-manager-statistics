import type { RecordListDto } from '@/features/statistics/dtoTypes'
import { toRecordsOverviewViewModel } from '@/features/statistics/model/record.viewmodel'
import { StatCard } from '@/features/statistics/components/StatCard'
import { TemplateUsage } from '@/features/statistics/components/records/TemplateUsage'
import { PhaseBreakdown } from '@/features/statistics/components/personal/PhaseBreakdown.tsx'

interface Props {
  data: RecordListDto
}

export const RecordsOverview = ({ data }: Props) => {
  const vm = toRecordsOverviewViewModel(data)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard label="Total records" value={vm.total} accent="info" />
        <StatCard
          label="Completed"
          value={vm.completed}
          accent="success"
          hint={vm.completionRateFmt}
        />
        <StatCard label="Open" value={vm.open} />
        <StatCard label="Rejected" value={vm.rejected} accent="danger" />
        <StatCard
          label="Avg correctness"
          value={vm.avgCorrectnessFmt ?? '-'}
          accent={vm.avgCorrectnessGood ? 'success' : undefined}
          hint={`${vm.evaluableCount} evaluable`}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PhaseBreakdown open={vm.open} completed={vm.completed} rejected={vm.rejected} />
        {vm.hasTemplates && (
          <TemplateUsage templates={vm.templates} total={data.formTemplateUsage.total} />
        )}
      </div>
    </div>
  )
}
