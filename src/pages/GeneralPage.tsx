import { useState } from 'react'
import type { StatisticsInterval } from '@/features/statistics/dtoTypes.ts'
import { useGeneral } from '@/features/statistics/hooks.ts'
import { IntervalPicker } from '@/features/statistics/components/IntervalPicker.tsx'
import { StatCard } from '@/features/statistics/components/StatCard.tsx'
import { formatPeriod } from '@/shared/utils/util.general.ts'
import { useError } from '@/shared/hooks/useError.ts'
import { SkeletonCard } from '@/shared/components/SkeletonCard.tsx'
import { TimelineChart } from '@/features/statistics/components/general/TimelimeChart.tsx'

const NUMBER_OF_SKELETON_CARDS = 8

export const GeneralPage = () => {
  const [interval, setInterval] = useState<StatisticsInterval>({})
  const { data, isLoading, isError } = useGeneral(interval)
  const { showError } = useError()

  if (isError) {
    showError('Failed to load statistics. Please try again.')
    return
  }

  return (
    <div className="space-y-5">
      <IntervalPicker value={interval} onChange={setInterval} />

      {isLoading && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: NUMBER_OF_SKELETON_CARDS }).map((_, i) => (
            <SkeletonCard key={i} h={72} />
          ))}
        </div>
      )}

      {data && (
        <div className="space-y-4">
          <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]">
            <StatCard label="Total records" value={data.totalRecords} />
            <StatCard label="Participating institutions" value={data.participatingInstitutions} />
            <StatCard label="Participating entry clerks" value={data.entryClerks} />
            <StatCard label="Avg / institution" value={data.avgRecordsPerInstitution.toFixed(1)} />
            <StatCard label="Avg / author" value={data.avgRecordsPerAuthor.toFixed(1)} />
            <StatCard
              label="Valid period"
              value={formatPeriod(data.periodFrom, data.periodTo)}
              small
            />
          </div>

          <TimelineChart
            interval={interval}
            completionRate={data.completionRate}
            rejectionRate={data.rejectionRate}
            byPhase={data.byPhase}
            total={data.totalRecords}
          />
        </div>
      )}
    </div>
  )
}
