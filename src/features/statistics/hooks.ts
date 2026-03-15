import { useQuery } from '@tanstack/react-query'
import { statisticsProvider } from './provider'
import { STATISTICS_QUERY_KEYS } from '@/features/statistics/constants.ts'

export const useRecordStats = () =>
  useQuery({
    queryKey: STATISTICS_QUERY_KEYS.RECORDS(),
    queryFn: () => statisticsProvider.getRecordStats(),
  })
