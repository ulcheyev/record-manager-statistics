import type { StatisticsInterval } from '@/features/statistics/dtoTypes.ts'

const INPUT_CLASS =
  'rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-colors'

interface DateInputProps {
  label: string
  value: string
  onChange: (val: string) => void
}

const DateInput = ({ label, value, onChange }: DateInputProps) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs text-gray-400">{label}</label>
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={INPUT_CLASS}
    />
  </div>
)

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
    <div className="flex flex-col gap-4 pb-5 border-b border-gray-100">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex items-center gap-1.5 pb-3">
          <span
            className={`text-xs font-medium uppercase tracking-wide transition-colors ${
              hasValue ? 'text-blue-400' : 'text-gray-400'
            }`}
          >
            Interval
          </span>
        </div>

        <DateInput label="From" value={value.from ?? ''} onChange={(val) => set('from', val)} />

        <DateInput label="To" value={value.to ?? ''} onChange={(val) => set('to', val)} />

        {hasValue && (
          <button
            onClick={clear}
            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  )
}
