import type { StatisticsInterval } from '@/features/statistics/dtoTypes.ts'

interface Props {
  value: StatisticsInterval
  onChange: (interval: StatisticsInterval) => void
}

export const IntervalPicker = ({ value, onChange }: Props) => {
  const set = (key: keyof StatisticsInterval, val: string) =>
    onChange({ ...value, [key]: val || undefined })

  const clear = () => onChange({})

  const hasValue = value.from || value.to

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">From</label>
        <input
          type="date"
          value={value.from ?? ''}
          onChange={(e) => set('from', e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-colors"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">To</label>
        <input
          type="date"
          value={value.to ?? ''}
          onChange={(e) => set('to', e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-colors"
        />
      </div>
      {hasValue && (
        <button
          onClick={clear}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Clear
        </button>
      )}
    </div>
  )
}
