import { type ReactNode, useState } from 'react'
import type { StatisticsWithMetadata } from '@/features/statistics/dtoTypes'

interface Props {
  meta: StatisticsWithMetadata
  controls?: ReactNode
  children: ReactNode
  defaultCollapsed?: boolean
}

export const StatisticsSection = ({
  meta,
  controls,
  children,
  defaultCollapsed = false,
}: Props) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)

  return (
    <section className="rounded-2xl bg-white border border-gray-300 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_24px_-12px_rgba(0,0,0,0.10)] overflow-hidden">
      <div className="relative px-6 pt-5 pb-5">
        <div className="absolute left-0 top-5 bottom-5 w-[3px] rounded-r-full bg-gradient-to-b from-blue-400 to-blue-200" />
        <div className="flex items-start justify-between gap-4 pl-3">
          <div className="min-w-0">
            <p className="text-[15px] font-semibold uppercase tracking-[0.14em] text-blue-500/90">
              {meta.label ?? 'Statistics'}
            </p>
            {meta.description && (
              <h3 className="mt-1 font-medium text-gray-800 leading-tight">{meta.description}</h3>
            )}
          </div>

          <button
            onClick={() => setCollapsed((c) => !c)}
            aria-expanded={!collapsed}
            className="flex-shrink-0 group flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 hover:border-gray-400 hover:shadow-sm transition-all"
          >
            <span>{collapsed ? 'Show' : 'Hide'}</span>
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-300 ${collapsed ? '' : 'rotate-180'}`}
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="4 6 8 10 12 6" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          collapsed ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'
        }`}
      >
        <div className="overflow-hidden">
          {controls && (
            <div className="px-6 py-4 bg-gradient-to-b from-gray-50/60 to-transparent border-b border-gray-200">
              {controls}
            </div>
          )}
          <div className="px-6 py-6 space-y-5">{children}</div>
        </div>
      </div>
    </section>
  )
}
