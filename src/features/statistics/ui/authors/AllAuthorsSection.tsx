import { useState } from 'react'
import { StatisticsSection } from '@/features/statistics/components/StatisticsSection'
import { IntervalPicker } from '@/features/statistics/components/IntervalPicker'
import { AuthorScopeContent, AuthorScopeSkeleton } from './AuthorScopeContent'
import { useAllAuthors } from '@/features/statistics/api/authors.hooks.ts'
import type { StatisticsInterval } from '@/shared/dto/statistics.dto.ts'

export const AllAuthorsSection = () => {
  const [interval, setInterval] = useState<StatisticsInterval>({})
  const { data, isLoading } = useAllAuthors(interval)

  const meta = data ?? {
    label: 'Authors across the system' as const,
    description: null,
    interval: null,
  }

  return (
    <StatisticsSection
      meta={meta}
      controls={<IntervalPicker value={interval} onChange={setInterval} />}
    >
      {isLoading || !data ? (
        <AuthorScopeSkeleton />
      ) : (
        <AuthorScopeContent authors={data.authors} overview={data.overview} />
      )}
    </StatisticsSection>
  )
}
