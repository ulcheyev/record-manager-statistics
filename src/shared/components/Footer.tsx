import { config } from '@/config/runtime.ts'

export const Footer = () => (
  <footer className="h-12 flex items-center justify-center bg-gray-50 border-t border-gray-200 text-sm text-gray-400">
    <span>{config.appTitle}</span>
  </footer>
)
