import { toAuthorViewModel } from '@/features/statistics/model/author.viewmodel'
import { toPhaseBreakdownViewModel } from '@/features/statistics/model/phase.viewmodel'
import { StatCard } from '@/features/statistics/components/StatCard'
import { PhaseBreakdown } from '@/features/statistics/components/personal/PhaseBreakdown'
import type { AuthorOverviewDto } from '@/features/statistics/model/dto/author.dto.ts'

interface Props {
  data: AuthorOverviewDto
}

export const PersonalOverviewContent = ({ data }: Props) => {
  const vm = toAuthorViewModel(data)
  const phaseVm = toPhaseBreakdownViewModel(
    vm.byPhase.open,
    vm.byPhase.completed,
    vm.byPhase.rejected,
  )
  const isEmpty = vm.answers.totalAnswers == 0

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Total records" value={vm.totalRecords} accent="info" />
        <StatCard label="Completion rate" value={vm.completionRateFmt} accent="success" />
        <StatCard label="Rejection rate" value={vm.rejectionRateFmt} accent="danger" />

        <StatCard
          label="Total answers (completed)"
          value={isEmpty ? 'No completed records yet' : vm.answers.totalAnswers}
          hint={`${vm.answers.evaluableAnswered} evaluable`}
          small={isEmpty}
        />

        <StatCard
          label="Correctness rate"
          value={vm.answers.correctnessRateFmt}
          accent={
            vm.answers.hasCorrectness
              ? vm.answers.correctnessGood
                ? 'success'
                : 'danger'
              : undefined
          }
          hint={
            vm.answers.hasCorrectness ? `${vm.answers.correct} correct` : 'No evaluable answers yet'
          }
        />

        <StatCard label="Valid period" value={vm.periodFmt} small />
      </div>

      <PhaseBreakdown vm={phaseVm} />
    </>
  )
}
