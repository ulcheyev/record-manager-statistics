import { PAGINATION } from '@/config/constants'
import type { FilterDef, RecordFilters } from './types'

export const PAGE_SIZE = PAGINATION.PAGE_SIZE

export const PHASE_STYLES: Record<string, { dot: string; text: string; bg: string }> = {
  OPEN: { dot: 'bg-blue-400', text: 'text-blue-700', bg: 'bg-blue-50' },
  COMPLETED: { dot: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50' },
  REJECTED: { dot: 'bg-rose-400', text: 'text-rose-700', bg: 'bg-rose-50' },
}

export const PHASE_ORDER: Record<string, number> = { OPEN: 0, COMPLETED: 1, REJECTED: 2 }

export const TEMPLATE_COLORS = [
  { bar: 'bg-blue-400', text: 'text-blue-700', bg: 'bg-blue-50' },
  { bar: 'bg-violet-400', text: 'text-violet-700', bg: 'bg-violet-50' },
  { bar: 'bg-amber-400', text: 'text-amber-700', bg: 'bg-amber-50' },
  { bar: 'bg-rose-400', text: 'text-rose-700', bg: 'bg-rose-50' },
  { bar: 'bg-teal-400', text: 'text-teal-700', bg: 'bg-teal-50' },
]

export const EMPTY_FILTERS: RecordFilters = {
  correctness: 'all',
  phase: 'ALL',
  template: '',
}

export const isFiltersEmpty = (f: RecordFilters) =>
  f.correctness === 'all' && f.phase === 'ALL' && f.template === ''

export const FILTER_DEFS: FilterDef[] = [
  {
    key: 'phase',
    label: 'Phase',
    reset: 'ALL',
    isEmpty: (f) => f.phase === 'ALL',
    display: (f) => f.phase.charAt(0) + f.phase.slice(1).toLowerCase(),
    options: () => [
      { value: 'OPEN', label: 'Open' },
      { value: 'COMPLETED', label: 'Completed' },
      { value: 'REJECTED', label: 'Rejected' },
    ],
  },
  {
    key: 'correctness',
    label: 'Evaluability',
    reset: 'all',
    isEmpty: (f) => f.correctness === 'all',
    display: (f) => (f.correctness === 'has_correctness' ? 'Has score' : 'Non-evaluable'),
    options: () => [
      { value: 'has_correctness', label: 'Has score' },
      { value: 'non_evaluable', label: 'Non-evaluable' },
    ],
  },
  {
    key: 'template',
    label: 'Template',
    reset: '',
    isEmpty: (f) => f.template === '',
    display: (f) => f.template,
    options: (tpls) => tpls.map((t) => ({ value: t, label: t })),
  },
]
