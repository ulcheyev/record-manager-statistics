import { useContext } from 'react'
import { ErrorContext } from '@/shared/context/ErrorContext.tsx'

export const useError = () => {
  const ctx = useContext(ErrorContext)
  if (!ctx) throw new Error('useError must be used within ErrorProvider')
  return ctx
}
