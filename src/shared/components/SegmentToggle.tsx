interface Option<T extends string> {
  value: T
  label: string
}

interface Props<T extends string> {
  options: Option<T>[]
  value: T
  onChange: (v: T) => void
}

export const SegmentToggle = <T extends string>({ options, value, onChange }: Props<T>) => (
  <div className="flex rounded-lg border border-gray-200 overflow-hidden text-xs">
    {options.map((opt) => (
      <button
        key={opt.value}
        onClick={() => onChange(opt.value)}
        className={`px-3 py-1.5 transition-colors ${
          value === opt.value ? 'bg-gray-800 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'
        }`}
      >
        {opt.label}
      </button>
    ))}
  </div>
)
