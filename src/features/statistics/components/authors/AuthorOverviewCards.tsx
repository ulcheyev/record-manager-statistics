import type { AuthorsOverviewDto } from '@/features/statistics/dtoTypes'
import { StatCard } from '@/features/statistics/components/StatCard'

interface Props {
  overview: AuthorsOverviewDto
}

export const AuthorOverviewCards = ({ overview }: Props) => (
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
    <StatCard label="Total authors" value={overview.totalAuthors} accent="info" />
    <StatCard label="Most records" value={overview.mostRecordsAuthorInfo ?? '—'} small />
    <StatCard label="Most answers" value={overview.mostAnswersAuthorInfo ?? '—'} small />
    <StatCard
      label="Best completion"
      value={overview.bestCompletionRateInfo ?? '—'}
      accent="success"
      small
    />
    <StatCard
      label="Best correctness"
      value={overview.bestAnswerCorrectnessInfo ?? '—'}
      accent="success"
      small
    />
  </div>
)
