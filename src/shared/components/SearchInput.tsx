interface Props {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  total?: number
  filtered?: number
  className?: string
}

export const SearchInput = ({
  value,
  onChange,
  placeholder = 'Search…',
  total,
  filtered,
  className = '',
}: Props) => {
  const showCounter = value && total !== undefined && filtered !== undefined
  return (
    <div
      className={`flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-2.5 ${className}`}
    >
      {/* Search icon */}
      <svg
        className="w-3.5 h-3.5 text-gray-400 flex-shrink-0"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="6.5" cy="6.5" r="4.5" />
        <line x1="10.5" y1="10.5" x2="14" y2="14" />
      </svg>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 text-sm text-gray-700 bg-transparent outline-none placeholder:text-gray-300"
      />

      {value && (
        <div className="flex items-center gap-2.5">
          {showCounter && (
            <span className="text-[11px] text-gray-400 tabular-nums">
              {filtered} / {total}
            </span>
          )}

          <button
            onClick={() => onChange('')}
            className="text-gray-300 hover:text-gray-500 transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="3" y1="3" x2="13" y2="13" />
              <line x1="13" y1="3" x2="3" y2="13" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
