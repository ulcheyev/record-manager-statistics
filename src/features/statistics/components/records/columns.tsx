import type { ColumnDef } from './types'
import { PhaseBadge } from './PhaseBadge'
import { toRecordRowViewModel } from '@/features/statistics/model/record.viewmodel'

const nameCol: ColumnDef = {
  key: 'name',
  label: 'Name',
  sortKey: 'id',
  width: '3fr',
  render: (r, isSelected) => {
    const vm = toRecordRowViewModel(r)
    return (
      <span
        className={`text-sm truncate block ${isSelected ? 'text-blue-700 font-medium' : 'text-gray-700'}`}
      >
        {vm.displayName}
      </span>
    )
  },
}

const templateCol: ColumnDef = {
  key: 'template',
  label: 'Template',
  sortKey: 'template',
  width: '2fr',
  render: (r) => {
    const vm = toRecordRowViewModel(r)
    return (
      <span className="text-sm text-gray-500 truncate block">
        {vm.formTemplateLabel !== '-' ? (
          vm.formTemplateLabel
        ) : (
          <span className="text-gray-300">—</span>
        )}
      </span>
    )
  },
}

const dateCol: ColumnDef = {
  key: 'date',
  label: 'Created',
  sortKey: 'date',
  width: '1.5fr',
  render: (r) => {
    const vm = toRecordRowViewModel(r)
    return (
      <span className="text-xs text-gray-400 whitespace-nowrap tabular-nums">
        {vm.dateCreatedFmt}
      </span>
    )
  },
}

const phaseCol: ColumnDef = {
  key: 'phase',
  label: 'Phase',
  sortKey: 'phase',
  width: '1.5fr',
  render: (r) => <PhaseBadge phase={r.phase} />,
}

const correctnessCol: ColumnDef = {
  key: 'correctness',
  label: 'Correctness',
  width: '1.5fr',
  render: (r) => {
    const vm = toRecordRowViewModel(r)
    if (!vm.hasEvaluableAnswers) return <span className="text-xs text-gray-300">—</span>
    return (
      <span
        className={`text-xs font-semibold tabular-nums ${vm.correctnessGood ? 'text-emerald-600' : 'text-rose-500'}`}
      >
        {vm.correctnessRateFmt}
      </span>
    )
  },
}

const institutionCol: ColumnDef = {
  key: 'institution',
  label: 'Institution',
  width: '2fr',
  render: (r) => {
    const vm = toRecordRowViewModel(r)
    return (
      <span className="text-sm text-gray-500 truncate block">
        {vm.institutionName ?? <span className="text-gray-300">—</span>}
      </span>
    )
  },
}

const authorCol: ColumnDef = {
  key: 'author',
  label: 'Author',
  width: '2fr',
  render: (r) => {
    const vm = toRecordRowViewModel(r)
    if (!vm.authorDisplayName) return <span className="text-gray-300 text-sm">—</span>
    return (
      <span className="min-w-0">
        <span className="text-sm text-gray-700 truncate block">{vm.authorDisplayName}</span>
        {vm.authorHasFullName && (
          <span className="text-[11px] text-gray-400 truncate block">{vm.authorUsername}</span>
        )}
      </span>
    )
  },
}

export const PERSONAL_COLUMNS: ColumnDef[] = [nameCol, templateCol, dateCol, phaseCol]

export const INSTITUTION_COLUMNS: ColumnDef[] = [
  nameCol,
  templateCol,
  dateCol,
  phaseCol,
  correctnessCol,
  authorCol,
]

export const ALL_RECORDS_COLUMNS: ColumnDef[] = [
  nameCol,
  templateCol,
  dateCol,
  phaseCol,
  correctnessCol,
  institutionCol,
  authorCol,
]
