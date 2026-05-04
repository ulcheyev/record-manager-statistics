import { useState } from 'react'
import type { StatisticsInterval } from '@/features/statistics/dtoTypes'
import { StatisticsSection } from '@/features/statistics/components/StatisticsSection'
import { IntervalPicker } from '@/features/statistics/components/IntervalPicker'
import { useInstitutionAuthors } from '@/features/statistics/api/authors.hooks.ts'
import {
  AuthorScopeContent,
  AuthorScopeSkeleton,
} from '@/features/statistics/ui/authors/AuthorScopeContent.tsx'

export const InstitutionAuthorsSection = () => {
  const [interval, setInterval] = useState<StatisticsInterval>({})
  const { data, isLoading } = useInstitutionAuthors(interval)

  const meta = data ?? {
    label: 'Authors in your institution' as const,
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
        <AuthorScopeContent
          authors={data.authors}
          overview={data.overview}
          searchFields={['username', 'fullName']}
        />
      )}
    </StatisticsSection>
  )
}
