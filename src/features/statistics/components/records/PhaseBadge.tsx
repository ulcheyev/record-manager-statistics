import { PHASE_STYLES } from './constants'

export const PhaseBadge = ({ phase }: { phase: string }) => {
  const s = PHASE_STYLES[phase] ?? { dot: 'bg-gray-400', text: 'text-gray-600', bg: 'bg-gray-50' }
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${s.text} ${s.bg}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${s.dot}`} />
      {phase.charAt(0) + phase.slice(1).toLowerCase()}
    </span>
  )
}
