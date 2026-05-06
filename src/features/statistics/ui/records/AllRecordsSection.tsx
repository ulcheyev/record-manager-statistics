import { useState } from 'react'
import { StatisticsSection } from '@/features/statistics/components/StatisticsSection'
import { IntervalPicker } from '@/features/statistics/components/IntervalPicker'
import { RecordDetailPanel } from '@/features/statistics/components/records/RecordDetailPanel'
import {
  RecordsScopeContent,
  RecordsScopeSkeleton,
} from '@/features/statistics/components/records/RecordsScopeContent'
import { ALL_RECORDS_COLUMNS } from '@/features/statistics/components/records/columns'
import { defaultSearchPredicate } from '@/features/statistics/components/records/useRecordTable'
import type { SearchPredicate } from '@/features/statistics/components/records/types'
import { useAllRecords } from '@/features/statistics/api/records.hooks.ts'
import type {
  RecordSummaryDto,
  RecordSummaryWithAuthorDto,
} from '@/features/statistics/model/dto/record.dto.ts'
import type { StatisticsInterval } from '@/shared/dto/statistics.dto.ts'

const allRecordsSearchPredicate: SearchPredicate = (r, q) => {
  const withAuthor = r as RecordSummaryWithAuthorDto
  return (
    defaultSearchPredicate(r, q) ||
    (withAuthor.institutionName ?? '').toLowerCase().includes(q) ||
    (withAuthor.authorFullName ?? '').toLowerCase().includes(q) ||
    (withAuthor.authorUsername ?? '').toLowerCase().includes(q)
  )
}

export const AllRecordsSection = () => {
  const [interval, setInterval] = useState<StatisticsInterval>({})
  const [selected, setSelected] = useState<RecordSummaryDto | null>(null)
  const { data, isLoading } = useAllRecords(interval)

  const meta = data ?? {
    label: 'All records in the system' as const,
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
            columns={ALL_RECORDS_COLUMNS}
            selected={selected}
            onSelect={handleSelect}
            searchPlaceholder="Search by record name, template, institution or author…"
            searchPredicate={allRecordsSearchPredicate}
          />
        )}
      </StatisticsSection>

      <RecordDetailPanel record={selected} onClose={() => setSelected(null)} />
    </>
  )
}
