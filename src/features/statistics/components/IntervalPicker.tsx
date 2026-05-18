import type { StatisticsInterval } from '@/shared/dto/statistics.dto.ts'

const INPUT_CLASS =
  'rounded-lg border border-gray-200 bg-white px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-colors w-full sm:w-auto'

interface DateInputProps {
  label: string
  value: string
  onChange: (val: string) => void
}

const DateInput = ({ label, value, onChange }: DateInputProps) => (
  <div className="flex flex-col gap-1 flex-1 sm:flex-initial min-w-0">
    <label className="text-[10px] sm:text-[12px] text-gray-400 uppercase tracking-wider font-medium">
      {label}
    </label>
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
    <div className="flex flex-wrap items-end gap-2 sm:gap-4">
      <span
        className={`pb-2 text-[10px] sm:text-[12px] font-semibold uppercase tracking-wider sm:tracking-[0.14em] transition-colors w-full sm:w-auto ${
          hasValue ? 'text-blue-500' : 'text-gray-400'
        }`}
      >
        Interval
      </span>

      <DateInput label="From" value={value.from ?? ''} onChange={(v) => set('from', v)} />
      <DateInput label="To" value={value.to ?? ''} onChange={(v) => set('to', v)} />

      {hasValue && (
        <button
          onClick={clear}
          className="rounded-lg border border-gray-200 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors flex-shrink-0"
        >
          Clear
        </button>
      )}
    </div>
  )
}
