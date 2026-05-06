import type { ColumnDef, SortDir, SortKey } from './types'
import { ColHeader } from './ColHeader'
import { PageBtn } from './PageBtn'
import { SearchInput } from '@/shared/components/SearchInput'
import type { RecordSummaryDto } from '@/features/statistics/model/dto/record.dto.ts'

interface Props {
  records: RecordSummaryDto[]
  columns: ColumnDef[]
  selected: RecordSummaryDto | null
  onSelect: (r: RecordSummaryDto) => void
  sortKey: SortKey
  sortDir: SortDir
  onSort: (k: SortKey) => void
  search: string
  onSearch: (v: string) => void
  searchPlaceholder?: string
  page: number
  onPage: (p: number) => void
  totalPages: number
  totalFiltered: number
}

export const RecordsTable = ({
  records,
  columns,
  selected,
  onSelect,
  sortKey,
  sortDir,
  onSort,
  search,
  onSearch,
  searchPlaceholder = 'Search by record name or use filters…',
  page,
  onPage,
  totalPages,
  totalFiltered,
}: Props) => {
  const gridTemplate = columns.map((c) => c.width ?? '1fr').join(' ')

  const handleSearch = (v: string) => {
    onSearch(v)
    onPage(1)
  }

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden">
      {/* Search */}
      <div className="px-4 py-3 bg-white border-b border-gray-200">
        <SearchInput
          value={search}
          onChange={handleSearch}
          placeholder={searchPlaceholder}
          className="border-0 px-0 py-0 rounded-none bg-transparent"
        />
        {totalFiltered > 0 && (
          <span className="text-[10px] text-gray-400 tabular-nums flex-shrink-0 mt-1 block">
            {totalFiltered} record{totalFiltered !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Column headers */}
      <div
        className="grid gap-x-6 px-5 py-3 bg-gray-50 border-b border-gray-200"
        style={{ gridTemplateColumns: gridTemplate }}
      >
        {columns.map((col) =>
          col.sortKey ? (
            <ColHeader
              key={col.key}
              label={col.label}
              sortKey={col.sortKey}
              current={sortKey}
              dir={sortDir}
              onSort={onSort}
            />
          ) : (
            <span
              key={col.key}
              className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400"
            >
              {col.label}
            </span>
          ),
        )}
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-100 bg-white">
        {records.length === 0 ? (
          <div className="px-5 py-12 text-center text-sm text-gray-400">
            {search ? `No records matching "${search}"` : 'No records match the current filters'}
          </div>
        ) : (
          records.map((r) => {
            const isSelected = selected?.uri === r.uri
            return (
              <button
                key={r.uri}
                onClick={() => onSelect(r)}
                className={`w-full grid gap-x-6 px-5 py-4 text-left transition-colors duration-100 ${
                  isSelected ? 'bg-blue-50 hover:bg-blue-50' : 'hover:bg-gray-50/60'
                }`}
                style={{ gridTemplateColumns: gridTemplate }}
              >
                {columns.map((col) => (
                  <span key={col.key} className="self-center min-w-0 overflow-hidden">
                    {col.render(r, isSelected)}
                  </span>
                ))}
              </button>
            )
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-t border-gray-200">
          <span className="text-xs text-gray-400">
            Page {page} of {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <PageBtn label="←" disabled={page === 1} onClick={() => onPage(page - 1)} />
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <PageBtn key={p} label={String(p)} active={p === page} onClick={() => onPage(p)} />
            ))}
            <PageBtn label="→" disabled={page === totalPages} onClick={() => onPage(page + 1)} />
          </div>
        </div>
      )}
    </div>
  )
}
