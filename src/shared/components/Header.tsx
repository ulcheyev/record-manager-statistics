import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '@/shared/hooks/useAuth'
import { routes } from '@/config/routes'
import { recordManagerUrl } from '@/config/runtime'
import {
  canViewAuthors,
  canViewRecords,
  canViewStatistics,
} from '@/features/statistics/model/permissions.model'
import { usePermissions } from '@/features/statistics/api/permissions.hooks.ts'
import type { UserStatisticsPermissionsDto } from '@/features/statistics/model/dto/permissions.dto.ts'

interface Tab {
  shortLabel: string
  longLabel: string
  to: string
  visible: (p: UserStatisticsPermissionsDto) => boolean
}

const TABS: Tab[] = [
  {
    shortLabel: 'Personal',
    longLabel: 'My Personal Statistics',
    to: routes.personal,
    visible: canViewStatistics,
  },
  {
    shortLabel: 'Authors',
    longLabel: 'Authors',
    to: routes.authors,
    visible: canViewAuthors,
  },
  {
    shortLabel: 'Records',
    longLabel: 'Records',
    to: routes.records,
    visible: canViewRecords,
  },
]

export const Header = () => {
  const { fullName, email, isAuthenticated } = useAuth()
  const { data: permissions, isLoading } = usePermissions({ enabled: isAuthenticated })
  const [open, setOpen] = useState(false)

  const initials =
    fullName
      .split(' ')
      .map((n) => n[0])
      .join('. ') + '.'
  const visibleTabs = permissions ? TABS.filter((t) => t.visible(permissions)) : []

  return (
    <header className="fixed top-0 left-0 right-0 h-15 z-100 flex items-center justify-between px-3 sm:px-8 bg-white border-b border-gray-200">
      <div className="flex items-center gap-2 sm:gap-8 h-full min-w-0">
        <button
          onClick={() => (window.location.href = recordManagerUrl)}
          className="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 flex-shrink-0"
        >
          <span className="sm:hidden">←</span>
          <span className="hidden sm:inline">← Record Manager</span>
        </button>

        <nav className="flex items-center h-full gap-0 sm:gap-1 min-w-0">
          {isLoading
            ? [50, 40, 50].map((w, i) => (
                <div
                  key={i}
                  className="h-3 rounded bg-gray-100/70 animate-pulse mx-2 sm:mx-3"
                  style={{ width: w }}
                />
              ))
            : visibleTabs.map((tab) => (
                <NavLink
                  key={tab.to}
                  to={tab.to}
                  className={({ isActive }) =>
                    `flex items-center h-full px-2 sm:px-3 text-xs sm:text-sm no-underline border-b-2 transition-colors whitespace-nowrap ${
                      isActive
                        ? 'text-blue-600 border-blue-600 font-semibold'
                        : 'text-gray-500 border-transparent hover:text-gray-800'
                    }`
                  }
                >
                  <span className="sm:hidden">{tab.shortLabel}</span>
                  <span className="hidden sm:inline">{tab.longLabel}</span>
                </NavLink>
              ))}
        </nav>
      </div>

      <div className="relative flex-shrink-0 pl-3 sm:pl-4 ml-2 sm:ml-3 border-l border-gray-200 h-6 self-center flex items-center">
        <button
          onClick={() => setOpen((o) => !o)}
          className="bg-transparent border-none cursor-pointer text-xs sm:text-sm text-gray-600 flex items-center gap-1 h-full"
        >
          {initials} ▾
        </button>
        {open && (
          <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded shadow-md min-w-44 py-2">
            <div className="px-4 py-2 text-sm text-gray-800 font-semibold">{fullName}</div>
            <div className="px-4 py-1 text-xs text-gray-400">{email}</div>
          </div>
        )}
      </div>
    </header>
  )
}
