import { useState } from 'react'
import { useAuth } from '@/shared/hooks/useAuth'
import { useError } from '@/shared/hooks/useError'
import { StatisticsSection } from '@/features/statistics/components/StatisticsSection'
import { IntervalPicker } from '@/features/statistics/components/IntervalPicker'
import { SkeletonCard } from '@/shared/components/SkeletonCard'
import { PersonalOverviewContent } from '@/features/statistics/components/personal/PersonalOverviewContent'
import { useAuthorByUsername } from '@/features/statistics/api/authors.hooks.ts'
import type { StatisticsInterval } from '@/shared/dto/statistics.dto.ts'

const Skeleton = () => (
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
    {Array.from({ length: 6 }).map((_, i) => (
      <SkeletonCard key={i} h={88} />
    ))}
  </div>
)

export const PersonalOverviewSection = () => {
  const [interval, setInterval] = useState<StatisticsInterval>({})
  const { username } = useAuth()
  const { data, isLoading, isError } = useAuthorByUsername(username, interval)
  const { showError } = useError()

  if (isError) {
    showError('Failed to load statistics. Please try again.')
    return null
  }

  const meta = data ?? { label: 'Personal statistics' as const, description: null, interval: null }

  return (
    <StatisticsSection
      meta={meta}
      controls={<IntervalPicker value={interval} onChange={setInterval} />}
    >
      {isLoading || !data ? <Skeleton /> : <PersonalOverviewContent data={data} />}
    </StatisticsSection>
  )
}
