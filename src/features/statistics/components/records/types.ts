import type { ReactNode } from 'react'
import type { RecordSummaryDto } from '@/features/statistics/model/dto/record.dto.ts'

export type SortKey = 'id' | 'template' | 'date' | 'phase'
export type SortDir = 'asc' | 'desc'

export type CorrectnessFilter = 'all' | 'has_correctness' | 'non_evaluable'
export type PhaseFilter = 'ALL' | 'OPEN' | 'COMPLETED' | 'REJECTED'

export interface RecordFilters {
  correctness: CorrectnessFilter
  phase: PhaseFilter
  template: string
}

export type FilterKey = keyof RecordFilters

export interface FilterDef {
  key: FilterKey
  label: string
  reset: string
  isEmpty: (f: RecordFilters) => boolean
  display: (f: RecordFilters) => string
  options: (templates: string[]) => { value: string; label: string }[]
}

export type SearchPredicate = (row: RecordSummaryDto, query: string) => boolean

export interface ColumnDef {
  key: string
  label: string
  sortKey?: SortKey
  width?: string // CSS grid track (e.g. '2fr', '1fr', '120px')
  render: (row: RecordSummaryDto, isSelected: boolean) => ReactNode
}
