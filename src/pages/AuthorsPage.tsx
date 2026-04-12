import { useState } from 'react'
import { AuthorScatterChart } from '@/features/statistics/components/authors/AuthorScatterChart'
import { InstitutionDonut } from '@/features/statistics/components/authors/InstitutionDonut'
import { IntervalPicker } from '@/features/statistics/components/IntervalPicker'
import { StatCard } from '@/features/statistics/components/StatCard'
import { SkeletonCard } from '@/shared/components/SkeletonCard'
import { useAuthors, useInstitutions } from '@/features/statistics/hooks'
import { useError } from '@/shared/hooks/useError'
import type { StatisticsInterval } from '@/features/statistics/dtoTypes'

const NUMBER_OF_SKELETON_CARDS = 6

export const AuthorsPage = () => {
  const [interval, setInterval] = useState<StatisticsInterval>({})
  const authors = useAuthors(interval)
  const institutions = useInstitutions(interval)
  const { showError } = useError()

  const isLoading = authors.isLoading || institutions.isLoading
  const isError = authors.isError || institutions.isError

  if (isError) {
    showError('Failed to load author statistics. Please try again.')
    return null
  }

  const topAuthor = authors.data?.authors[0] // Assuming authors are sorted
  const topInst = institutions.data?.institutions[0] // Assuming institutions are sorted

  return (
    <div className="space-y-5">
      <IntervalPicker value={interval} onChange={setInterval} />

      {isLoading && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Array.from({ length: NUMBER_OF_SKELETON_CARDS }).map((_, i) => (
              <SkeletonCard key={i} h={72} />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <SkeletonCard h={300} />
            <SkeletonCard h={300} />
          </div>
          <SkeletonCard h={280} />
        </div>
      )}

      {authors.data && institutions.data && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard label="Total authors" value={authors.data.authors.length} />
            <StatCard label="Total institutions" value={institutions.data.institutions.length} />
            {topAuthor && (
              <StatCard label="Most active author" value={`${topAuthor.username}`} small />
            )}
            {topInst && <StatCard label="Most active institution" value={topInst.name} small />}
          </div>

          <InstitutionDonut institutions={institutions.data.institutions} />

          <AuthorScatterChart authors={authors.data.authors} />
        </div>
      )}
    </div>
  )
}
