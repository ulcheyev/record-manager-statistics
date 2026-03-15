import { QueryClient } from '@tanstack/react-query'
import { QUERY_CONFIG } from './constants'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_CONFIG.STALE_TIME,
      retry: QUERY_CONFIG.RETRY,
    },
  },
})
