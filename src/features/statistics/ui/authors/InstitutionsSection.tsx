import { useState } from 'react'
import type { StatisticsInterval } from '@/features/statistics/dtoTypes'
import { StatisticsSection } from '@/features/statistics/components/StatisticsSection'
import { IntervalPicker } from '@/features/statistics/components/IntervalPicker'
import { SkeletonCard } from '@/shared/components/SkeletonCard'
import { InstitutionBreakdown } from '@/features/statistics/components/authors/InstitutionBreakdown'
import { useAllInstitutions } from '@/features/statistics/api/institutions.hooks.ts'

const Skeleton = () => (
  <>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <SkeletonCard key={i} h={88} />
      ))}
    </div>
    <SkeletonCard h={280} />
  </>
)

export const InstitutionsSection = () => {
  const [interval, setInterval] = useState<StatisticsInterval>({})
  const { data, isLoading } = useAllInstitutions(interval)

  const meta = data ?? {
    label: 'Institutions across the system' as const,
    description: null,
    interval: null,
  }

  return (
    <StatisticsSection
      meta={meta}
      controls={<IntervalPicker value={interval} onChange={setInterval} />}
    >
      {isLoading || !data ? <Skeleton /> : <InstitutionBreakdown data={data} />}
    </StatisticsSection>
  )
}
