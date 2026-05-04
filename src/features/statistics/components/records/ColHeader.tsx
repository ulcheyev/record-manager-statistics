import { SortIcon } from './SortIcon'
import type { SortDir, SortKey } from './types'

interface Props {
  label: string
  sortKey: SortKey
  current: SortKey
  dir: SortDir
  onSort: (k: SortKey) => void
  className?: string
}

export const ColHeader = ({ label, sortKey, current, dir, onSort, className = '' }: Props) => (
  <button
    onClick={() => onSort(sortKey)}
    className={`w-full flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400 hover:text-gray-600 transition-colors ${className}`}
  >
    {label}
    <SortIcon active={current === sortKey} dir={dir} />
  </button>
)
