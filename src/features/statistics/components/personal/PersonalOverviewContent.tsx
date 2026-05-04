import type { AuthorOverviewDto } from '@/features/statistics/dtoTypes'
import { toAuthorViewModel } from '@/features/statistics/model/author.viewmodel'
import { StatCard } from '@/features/statistics/components/StatCard'
import { PhaseBreakdown } from '@/features/statistics/components/personal/PhaseBreakdown.tsx'

interface Props {
  data: AuthorOverviewDto
}

export const PersonalOverviewContent = ({ data }: Props) => {
  const vm = toAuthorViewModel(data)

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Total records" value={vm.totalRecords} accent="info" />
        <StatCard label="Completion rate" value={vm.completionRateFmt} accent="success" />
        <StatCard label="Rejection rate" value={vm.rejectionRateFmt} accent="danger" />
        <StatCard
          label="Total answers"
          value={vm.totalAnswers}
          hint={`${vm.evaluableAnswers} evaluable`}
        />
        <StatCard
          label="Correctness rate"
          value={vm.correctnessRateFmt}
          accent="success"
          hint={`${vm.totalCorrectAnswers} correct`}
        />
        <StatCard label="Valid period" value={vm.periodFmt} small />
      </div>

      <PhaseBreakdown
        open={vm.byPhase.open}
        completed={vm.byPhase.completed}
        rejected={vm.byPhase.rejected}
      />
    </>
  )
}
