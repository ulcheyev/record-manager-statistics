import { QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { queryClient } from '@/config/queryClient'
import { ErrorProvider } from '@/shared/context/ErrorContext'

interface Props {
  children: ReactNode
}

export const AppProviders = ({ children }: Props) => (
  <QueryClientProvider client={queryClient}>
    <ErrorProvider>{children}</ErrorProvider>
  </QueryClientProvider>
)
