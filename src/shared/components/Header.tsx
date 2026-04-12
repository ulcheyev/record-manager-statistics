import { useAuth } from '@/shared/hooks/useAuth'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { routes } from '@/config/routes'
import { recordManagerUrl } from '@/config/runtime'

const tabs = [
  { label: 'General', to: routes.general },
  { label: 'Authors', to: routes.authors },
  { label: 'Forms', to: routes.forms },
]

export const Header = () => {
  const { fullName, email } = useAuth()
  const [open, setOpen] = useState(false)

  const initials =
    fullName
      .split(' ')
      .map((n) => n[0])
      .join('. ') + '.'

  return (
    <header className="fixed top-0 left-0 right-0 h-15 z-100 flex items-center justify-between px-8 bg-white border-b border-gray-200">
      {/* Left */}
      <div className="flex items-center gap-8 h-full">
        <button
          onClick={() => (window.location.href = recordManagerUrl)}
          className="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
        >
          ← Record Manager
        </button>

        <span className="font-bold text-base text-gray-900 whitespace-nowrap">Statistics</span>

        <nav className="flex items-center h-full gap-1">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                `flex items-center h-full px-3 text-sm no-underline border-b-2 transition-colors ${
                  isActive
                    ? 'text-blue-600 border-blue-600 font-semibold'
                    : 'text-gray-500 border-transparent hover:text-gray-800'
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Right */}
      <div className="relative">
        <button
          onClick={() => setOpen((o) => !o)}
          className="bg-transparent border-none cursor-pointer text-sm text-gray-600 flex items-center gap-1"
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
