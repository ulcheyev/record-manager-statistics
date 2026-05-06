import { toRecordsOverviewViewModel } from '@/features/statistics/model/record.viewmodel'
import { toPhaseBreakdownViewModel } from '@/features/statistics/model/phase.viewmodel'
import { StatCard } from '@/features/statistics/components/StatCard'
import { TemplateUsage } from '@/features/statistics/components/records/TemplateUsage'
import { PhaseBreakdown } from '@/features/statistics/components/personal/PhaseBreakdown'
import type { RecordListDto } from '@/features/statistics/model/dto/record.dto.ts'

interface Props {
  data: RecordListDto
}

export const RecordsOverview = ({ data }: Props) => {
  const vm = toRecordsOverviewViewModel(data)
  const phaseVm = toPhaseBreakdownViewModel(vm.open, vm.completed, vm.rejected)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard label="Total records" value={vm.total} accent="info" />
        <StatCard
          label="Avg correctness"
          value={vm.avgCorrectnessFmt ?? '-'}
          accent={vm.avgCorrectnessGood ? 'success' : undefined}
          hint={`${vm.evaluableCount} evaluable`}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PhaseBreakdown vm={phaseVm} />
        {vm.hasTemplates && (
          <TemplateUsage templates={vm.templates} total={data.formTemplateUsage.total} />
        )}
      </div>
    </div>
  )
}
