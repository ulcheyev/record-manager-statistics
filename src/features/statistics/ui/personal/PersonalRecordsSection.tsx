import { useState } from 'react'
import { StatisticsSection } from '@/features/statistics/components/StatisticsSection'
import { IntervalPicker } from '@/features/statistics/components/IntervalPicker'
import { SkeletonCard } from '@/shared/components/SkeletonCard'
import {
  FilterBar,
  PERSONAL_COLUMNS,
  RecordsTable,
  TemplateUsage,
  useRecordTable,
} from '@/features/statistics/components/records'
import { usePersonalRecords } from '@/features/statistics/api/records.hooks.ts'
import type { RecordSummaryDto } from '@/features/statistics/model/dto/record.dto.ts'
import type { StatisticsInterval } from '@/shared/dto/statistics.dto.ts'

interface Props {
  selected: RecordSummaryDto | null
  onSelect: (r: RecordSummaryDto) => void
}

const Skeleton = () => (
  <div className="space-y-3">
    <SkeletonCard h={80} />
    <SkeletonCard h={240} />
  </div>
)

export const PersonalRecordsSection = ({ selected, onSelect }: Props) => {
  const [interval, setInterval] = useState<StatisticsInterval>({})
  const { data, isLoading } = usePersonalRecords(interval)
  const table = useRecordTable(data?.records)

  const meta = data ?? { label: 'My records' as const, description: null, interval: null }

  const handleIntervalChange = (v: StatisticsInterval) => {
    setInterval(v)
    table.setPage(1)
  }

  return (
    <StatisticsSection
      meta={meta}
      controls={<IntervalPicker value={interval} onChange={handleIntervalChange} />}
    >
      {isLoading || !data ? (
        <Skeleton />
      ) : (
        <div className="space-y-5">
          {data.formTemplateUsage.templates.length > 0 && (
            <TemplateUsage
              templates={data.formTemplateUsage.templates}
              total={data.formTemplateUsage.total}
            />
          )}
          <FilterBar
            filters={table.filters}
            onChange={table.handleFilters}
            templates={table.templateOptions}
          />
          <RecordsTable
            records={table.paged}
            columns={PERSONAL_COLUMNS}
            selected={selected}
            onSelect={onSelect}
            sortKey={table.sortKey}
            sortDir={table.sortDir}
            onSort={table.handleSort}
            search={table.search}
            onSearch={table.handleSearch}
            page={table.page}
            onPage={table.setPage}
            totalPages={table.totalPages}
            totalFiltered={table.processed.length}
          />
        </div>
      )}
    </StatisticsSection>
  )
}
