import { GRANULARITY_OPTIONS, type Granularity } from '@/config/constants'

interface Props {
  value: Granularity
  onChange: (g: Granularity) => void
}

export const GranularityPicker = ({ value, onChange }: Props) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Granularity</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as Granularity)}
      className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-colors"
    >
      {GRANULARITY_OPTIONS.map((g) => (
        <option key={g} value={g}>
          {g.charAt(0) + g.slice(1).toLowerCase()}
        </option>
      ))}
    </select>
  </div>
)
