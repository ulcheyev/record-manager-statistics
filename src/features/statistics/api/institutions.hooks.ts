import { useQuery } from '@tanstack/react-query'
import { statisticsProvider } from '@/features/statistics/provider'
import { QUERY_KEYS } from '@/config/constants'
import type { StatisticsInterval } from '@/features/statistics/dtoTypes'

export const useAllInstitutions = (interval: StatisticsInterval) =>
  useQuery({
    queryKey: [QUERY_KEYS.INSTITUTIONS_ALL, interval],
    queryFn: () => statisticsProvider.getAllInstitutions(interval),
  })
