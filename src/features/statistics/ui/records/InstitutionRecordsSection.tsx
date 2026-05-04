import { useState } from 'react'
import type {
  RecordSummaryDto,
  RecordSummaryWithAuthorDto,
  StatisticsInterval,
} from '@/features/statistics/dtoTypes'
import { StatisticsSection } from '@/features/statistics/components/StatisticsSection'
import { IntervalPicker } from '@/features/statistics/components/IntervalPicker'
import { RecordDetailPanel } from '@/features/statistics/components/records/RecordDetailPanel'
import {
  RecordsScopeContent,
  RecordsScopeSkeleton,
} from '@/features/statistics/components/records/RecordsScopeContent'
import { INSTITUTION_COLUMNS } from '@/features/statistics/components/records/columns'
import { defaultSearchPredicate } from '@/features/statistics/components/records/useRecordTable'
import type { SearchPredicate } from '@/features/statistics/components/records/types'
import { useInstitutionRecords } from '@/features/statistics/api/records.hooks.ts'

const institutionSearchPredicate: SearchPredicate = (r, q) => {
  const withAuthor = r as RecordSummaryWithAuthorDto
  return (
    defaultSearchPredicate(r, q) ||
    (withAuthor.authorFullName ?? '').toLowerCase().includes(q) ||
    (withAuthor.authorUsername ?? '').toLowerCase().includes(q)
  )
}

export const InstitutionRecordsSection = () => {
  const [interval, setInterval] = useState<StatisticsInterval>({})
  const [selected, setSelected] = useState<RecordSummaryDto | null>(null)
  const { data, isLoading } = useInstitutionRecords(interval)

  const meta = data ?? {
    label: 'Records in your institution' as const,
    description: null,
    interval: null,
  }

  const handleSelect = (r: RecordSummaryDto) =>
    setSelected((prev) => (prev?.uri === r.uri ? null : r))

  return (
    <>
      <StatisticsSection
        meta={meta}
        controls={<IntervalPicker value={interval} onChange={setInterval} />}
      >
        {isLoading || !data ? (
          <RecordsScopeSkeleton />
        ) : (
          <RecordsScopeContent
            data={data}
            columns={INSTITUTION_COLUMNS}
            selected={selected}
            onSelect={handleSelect}
            searchPlaceholder="Search by name, template or author…"
            searchPredicate={institutionSearchPredicate}
          />
        )}
      </StatisticsSection>

      <RecordDetailPanel record={selected} onClose={() => setSelected(null)} />
    </>
  )
}
