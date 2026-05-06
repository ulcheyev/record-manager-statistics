import { useState } from 'react'
import type { FilterDef, FilterKey, RecordFilters } from './types'
import { EMPTY_FILTERS, FILTER_DEFS, isFiltersEmpty } from './constants'

type OpenState = null | 'add' | FilterKey

interface Props {
  filters: RecordFilters
  onChange: (f: RecordFilters) => void
  templates: string[]
}

export const FilterBar = ({ filters, onChange, templates }: Props) => {
  const [open, setOpen] = useState<OpenState>(null)

  const activeDefs = FILTER_DEFS.filter((d) => !d.isEmpty(filters))
  const inactiveDefs = FILTER_DEFS.filter((d) => d.isEmpty(filters))
  const currentDef =
    open && open !== 'add' ? (FILTER_DEFS.find((d) => d.key === open) ?? null) : null

  const applyFilter = (key: FilterKey, value: string) => {
    onChange({ ...filters, [key]: value })
    setOpen(null)
  }

  const removeFilter = (key: FilterKey, reset: string) => {
    onChange({ ...filters, [key]: reset })
    if (open === key) setOpen(null)
  }

  return (
    <div className="relative flex flex-wrap items-center gap-2">
      {/* Active filter chips */}
      {activeDefs.map((def) => (
        <ActiveFilterChip
          key={def.key}
          def={def}
          filters={filters}
          isOpen={open === def.key}
          onToggle={() => setOpen((prev) => (prev === def.key ? null : def.key))}
          onRemove={() => removeFilter(def.key, def.reset)}
        />
      ))}

      {/* Add filter button */}
      {inactiveDefs.length > 0 && (
        <button
          onClick={() => setOpen((prev) => (prev === 'add' ? null : 'add'))}
          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-all ${
            open === 'add'
              ? 'border-blue-300 bg-blue-50 text-blue-600'
              : 'border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-600'
          }`}
        >
          <svg
            className="w-3 h-3"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="6" y1="1" x2="6" y2="11" />
            <line x1="1" y1="6" x2="11" y2="6" />
          </svg>
          Filter
        </button>
      )}

      {/* Clear all */}
      {!isFiltersEmpty(filters) && (
        <button
          onClick={() => {
            onChange(EMPTY_FILTERS)
            setOpen(null)
          }}
          className="text-[11px] text-gray-400 hover:text-gray-600 transition-colors"
        >
          Clear all
        </button>
      )}

      {/* Click-away overlay */}
      {open !== null && <div className="fixed inset-0 z-40" onClick={() => setOpen(null)} />}

      {/* Dropdown: pick a filter to add */}
      {open === 'add' && (
        <AddFilterMenu
          defs={inactiveDefs}
          onSelect={(key) => {
            setOpen(key)
          }}
        />
      )}

      {/* Dropdown: options for the selected filter */}
      {currentDef !== null && (
        <FilterDropdown
          def={currentDef}
          filters={filters}
          templates={templates}
          onApply={(value) => applyFilter(currentDef.key, value)}
        />
      )}
    </div>
  )
}

interface ChipProps {
  def: FilterDef
  filters: RecordFilters
  isOpen: boolean
  onToggle: () => void
  onRemove: () => void
}

const ActiveFilterChip = ({ def, filters, onToggle, onRemove }: ChipProps) => (
  <button
    onClick={onToggle}
    className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 pl-2.5 pr-1 py-1 text-[11px] font-medium text-blue-700 hover:border-blue-300 transition-colors"
  >
    <span className="text-blue-400 font-normal">{def.label}:</span>
    {def.display(filters)}
    <span
      role="button"
      onClick={(e) => {
        e.stopPropagation()
        onRemove()
      }}
      className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-blue-200 hover:bg-blue-300 text-blue-600 transition-colors ml-0.5 flex-shrink-0"
    >
      <svg
        viewBox="0 0 8 8"
        className="w-1.5 h-1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <line x1="1.5" y1="1.5" x2="6.5" y2="6.5" />
        <line x1="6.5" y1="1.5" x2="1.5" y2="6.5" />
      </svg>
    </span>
  </button>
)

interface AddMenuProps {
  defs: FilterDef[]
  onSelect: (key: FilterKey) => void
}

const AddFilterMenu = ({ defs, onSelect }: AddMenuProps) => (
  <div className="absolute left-0 top-full mt-2 z-50 min-w-[180px] rounded-xl border border-gray-200 bg-white shadow-xl py-1.5">
    <p className="px-3 pt-0.5 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400 border-b border-gray-100">
      Add filter
    </p>
    {defs.map((def) => (
      <button
        key={def.key}
        onClick={(e) => {
          e.stopPropagation()
          onSelect(def.key)
        }}
        className="w-full flex items-center justify-between gap-4 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
      >
        {def.label}
        <svg
          className="w-3 h-3 text-gray-300"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <polyline points="4 2 8 6 4 10" />
        </svg>
      </button>
    ))}
  </div>
)

interface DropdownProps {
  def: FilterDef
  filters: RecordFilters
  templates: string[]
  onApply: (value: string) => void
}

const FilterDropdown = ({ def, filters, templates, onApply }: DropdownProps) => (
  <div className="absolute left-0 top-full mt-2 z-50 min-w-[200px] rounded-xl border border-gray-200 bg-white shadow-xl py-1.5">
    <p className="px-3 pt-0.5 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400 border-b border-gray-100">
      {def.label}
    </p>
    {def.options(templates).map((opt) => {
      const isActive = (filters[def.key] as string) === opt.value
      return (
        <button
          key={opt.value}
          onClick={(e) => {
            e.stopPropagation()
            onApply(opt.value)
          }}
          className={`w-full flex items-center justify-between gap-4 px-3 py-2.5 text-sm transition-colors ${
            isActive ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          {opt.label}
          {isActive && (
            <svg
              className="w-3.5 h-3.5 text-blue-500 flex-shrink-0"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <polyline points="2 7 5.5 10.5 12 3.5" />
            </svg>
          )}
        </button>
      )
    })}
  </div>
)
