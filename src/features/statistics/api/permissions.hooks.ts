import { useQuery } from '@tanstack/react-query'
import { statisticsProvider } from '@/features/statistics/provider'
import { QUERY_KEYS } from '@/config/constants'

export const usePermissions = ({ enabled = true }: { enabled?: boolean } = {}) =>
  useQuery({
    queryKey: [QUERY_KEYS.PERMISSIONS],
    queryFn: () => statisticsProvider.getPermissions(),
    staleTime: Infinity,
    enabled,
  })
