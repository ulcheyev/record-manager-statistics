import type { RecordSummaryDto } from '@/features/statistics/dtoTypes'
import type { ColumnDef, SortDir, SortKey } from './types'
import { ColHeader } from './ColHeader'
import { PageBtn } from './PageBtn'

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
  searchPlaceholder = 'Search by name or template…',
  page,
  onPage,
  totalPages,
  totalFiltered,
}: Props) => {
  const gridTemplate = columns.map((c) => c.width ?? '1fr').join(' ')

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden">
      {/* Search */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200">
        <svg
          className="w-3.5 h-3.5 text-gray-400 flex-shrink-0"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="6.5" cy="6.5" r="4.5" />
          <line x1="10.5" y1="10.5" x2="14" y2="14" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            onSearch(e.target.value)
            onPage(1)
          }}
          placeholder={searchPlaceholder}
          className="flex-1 text-sm text-gray-700 bg-transparent outline-none placeholder:text-gray-300"
        />
        {search && (
          <button
            onClick={() => {
              onSearch('')
              onPage(1)
            }}
            className="text-gray-300 hover:text-gray-500 transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="3" y1="3" x2="13" y2="13" />
              <line x1="13" y1="3" x2="3" y2="13" />
            </svg>
          </button>
        )}
        {totalFiltered > 0 && (
          <span className="text-[10px] text-gray-400 tabular-nums flex-shrink-0">
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
