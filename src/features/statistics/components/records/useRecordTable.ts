import { useMemo, useState } from 'react'
import type { RecordFilters, SearchPredicate, SortDir, SortKey } from './types'
import { EMPTY_FILTERS, PAGE_SIZE, PHASE_ORDER } from './constants'
import { displayName } from './utils'
import type { RecordSummaryDto } from '@/features/statistics/model/dto/record.dto.ts'

export const defaultSearchPredicate: SearchPredicate = (r, q) =>
  (r.name ?? '').toLowerCase().includes(q) ||
  (r.formTemplateLabel ?? '').toLowerCase().includes(q) ||
  (r.uri.split('/').pop() ?? '').toLowerCase().includes(q)

export const useRecordTable = (
  records: RecordSummaryDto[] = [],
  { searchPredicate = defaultSearchPredicate }: { searchPredicate?: SearchPredicate } = {},
) => {
  const [sortKey, setSortKey] = useState<SortKey>('date')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<RecordFilters>(EMPTY_FILTERS)
  const [page, setPage] = useState(1)

  const templateOptions = useMemo(
    () => [...new Set(records.map((r) => r.formTemplateLabel).filter(Boolean) as string[])].sort(),
    [records],
  )

  const handleSort = (key: SortKey) => {
    if (key === sortKey) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else {
      setSortKey(key)
      setSortDir('asc')
    }
    setPage(1)
  }

  const handleSearch = (v: string) => {
    setSearch(v)
    setPage(1)
  }
  const handleFilters = (f: RecordFilters) => {
    setFilters(f)
    setPage(1)
  }

  const processed = useMemo(() => {
    let rows = [...records]

    if (search.trim()) {
      const q = search.toLowerCase()
      rows = rows.filter((r) => searchPredicate(r, q))
    }

    if (filters.phase !== 'ALL') rows = rows.filter((r) => r.phase === filters.phase)

    if (filters.correctness === 'has_correctness') {
      rows = rows.filter((r) => r.answers.evaluable.answered > 0)
    } else if (filters.correctness === 'non_evaluable') {
      rows = rows.filter((r) => r.answers.evaluable.answered === 0)
    }

    if (filters.template !== '') rows = rows.filter((r) => r.formTemplateLabel === filters.template)

    rows.sort((a, b) => {
      let cmp = 0
      if (sortKey === 'id') cmp = displayName(a).localeCompare(displayName(b))
      if (sortKey === 'template')
        cmp = (a.formTemplateLabel ?? '').localeCompare(b.formTemplateLabel ?? '')
      if (sortKey === 'date')
        cmp = new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime()
      if (sortKey === 'phase') cmp = (PHASE_ORDER[a.phase] ?? 0) - (PHASE_ORDER[b.phase] ?? 0)
      return sortDir === 'asc' ? cmp : -cmp
    })

    return rows
  }, [records, search, filters, sortKey, sortDir, searchPredicate])

  const totalPages = Math.max(1, Math.ceil(processed.length / PAGE_SIZE))
  const paged = processed.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return {
    sortKey,
    sortDir,
    handleSort,
    search,
    handleSearch,
    filters,
    handleFilters,
    page,
    setPage,
    totalPages,
    paged,
    processed,
    templateOptions,
  }
}
