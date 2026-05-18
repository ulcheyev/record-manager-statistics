import type { ColumnDef, SortDir, SortKey } from './types'
import { ColHeader } from './ColHeader'
import { PageBtn } from './PageBtn'
import { SearchInput } from '@/shared/components/SearchInput'
import { PhaseBadge } from './PhaseBadge'
import { displayName, fmtDate } from './utils'
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
      <div className="px-3 py-2 sm:px-4 sm:py-3 bg-white border-b border-gray-200">
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

      {/* Column headers — desktop only */}
      <div
        className="hidden sm:grid gap-x-6 px-5 py-3 bg-gray-50 border-b border-gray-200"
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

      {/* Mobile sort control — replaces the column-header sort affordance */}
      <div className="sm:hidden flex items-center gap-2 px-3 py-2 bg-gray-50 border-b border-gray-200 overflow-x-auto">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 flex-shrink-0">
          Sort:
        </span>
        {columns
          .filter((c) => c.sortKey)
          .map((col) => (
            <button
              key={col.key}
              onClick={() => col.sortKey && onSort(col.sortKey)}
              className={`text-[11px] px-2 py-1 rounded whitespace-nowrap transition-colors ${
                sortKey === col.sortKey ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-500'
              }`}
            >
              {col.label}
              {sortKey === col.sortKey && (sortDir === 'asc' ? ' ↑' : ' ↓')}
            </button>
          ))}
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-100 bg-white">
        {records.length === 0 ? (
          <div className="px-3 py-10 sm:px-5 sm:py-12 text-center text-sm text-gray-400">
            {search ? `No records matching "${search}"` : 'No records match the current filters'}
          </div>
        ) : (
          records.map((r) => {
            const isSelected = selected?.uri === r.uri
            return (
              <button
                key={r.uri}
                onClick={() => onSelect(r)}
                className={`w-full text-left transition-colors duration-100 ${
                  isSelected ? 'bg-blue-50 hover:bg-blue-50' : 'hover:bg-gray-50/60'
                }`}
              >
                {/* Mobile: stacked card */}
                <div className="sm:hidden px-3 py-3 space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`text-sm font-medium block flex-1 min-w-0 break-words ${
                        isSelected ? 'text-blue-700' : 'text-gray-800'
                      }`}
                    >
                      {displayName(r)}
                    </span>
                    <PhaseBadge phase={r.phase} />
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-gray-500">
                    <span className="truncate">{r.formTemplateLabel ?? '—'}</span>
                    <span className="text-gray-300">·</span>
                    <span className="tabular-nums whitespace-nowrap">{fmtDate(r.dateCreated)}</span>
                  </div>
                </div>

                {/* Desktop: grid row */}
                <div
                  className="hidden sm:grid gap-x-6 px-5 py-4"
                  style={{ gridTemplateColumns: gridTemplate }}
                >
                  {columns.map((col) => (
                    <span key={col.key} className="self-center min-w-0 overflow-hidden">
                      {col.render(r, isSelected)}
                    </span>
                  ))}
                </div>
              </button>
            )
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-3 py-2 sm:px-5 sm:py-3 bg-gray-50 border-t border-gray-200">
          <span className="text-[11px] sm:text-xs text-gray-400">
            Page {page} of {totalPages}
          </span>
          <div className="flex items-center gap-0.5 sm:gap-1">
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
