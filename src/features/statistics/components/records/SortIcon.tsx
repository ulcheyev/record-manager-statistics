import type { SortDir } from './types'

export const SortIcon = ({ active, dir }: { active: boolean; dir: SortDir }) => (
  <svg
    className={`w-3 h-3 flex-shrink-0 transition-colors ${active ? 'text-blue-500' : 'text-gray-300'}`}
    viewBox="0 0 10 12"
    fill="currentColor"
  >
    <path d="M5 0L9 4H1L5 0Z" className={active && dir === 'asc' ? 'opacity-100' : 'opacity-40'} />
    <path
      d="M5 12L1 8H9L5 12Z"
      className={active && dir === 'desc' ? 'opacity-100' : 'opacity-40'}
    />
  </svg>
)
