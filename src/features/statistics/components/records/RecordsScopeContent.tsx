import type { RecordListDto, RecordSummaryDto } from '@/features/statistics/dtoTypes'
import type { ColumnDef, SearchPredicate } from './types'
import { defaultSearchPredicate, useRecordTable } from './useRecordTable'
import { FilterBar } from './FilterBar'
import { RecordsTable } from './RecordsTable'
import { RecordsOverview } from './RecordsOverview'
import { SkeletonCard } from '@/shared/components/SkeletonCard'

interface Props {
  data: RecordListDto
  columns: ColumnDef[]
  selected: RecordSummaryDto | null
  onSelect: (r: RecordSummaryDto) => void
  searchPlaceholder?: string
  searchPredicate?: SearchPredicate
}

export const RecordsScopeContent = ({
  data,
  columns,
  selected,
  onSelect,
  searchPlaceholder,
  searchPredicate = defaultSearchPredicate,
}: Props) => {
  const table = useRecordTable(data.records, { searchPredicate })

  return (
    <div className="space-y-5">
      <RecordsOverview data={data} />

      <FilterBar
        filters={table.filters}
        onChange={table.handleFilters}
        templates={table.templateOptions}
      />
      <RecordsTable
        records={table.paged}
        columns={columns}
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
        searchPlaceholder={searchPlaceholder}
      />
    </div>
  )
}

export const RecordsScopeSkeleton = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <SkeletonCard key={i} h={88} />
      ))}
    </div>
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <SkeletonCard h={100} />
      <SkeletonCard h={100} />
    </div>
    <SkeletonCard h={320} />
  </div>
)
