import { useQuery } from '@tanstack/react-query'
import { statisticsProvider } from '@/features/statistics/provider'
import { QUERY_KEYS } from '@/config/constants'
import type { StatisticsInterval } from '@/shared/dto/statistics.dto.ts'

export const usePersonalRecords = (
  interval: StatisticsInterval,
  formTemplate?: string,
  phase?: string,
) =>
  useQuery({
    queryKey: [QUERY_KEYS.RECORDS_PERSONAL, interval, formTemplate, phase],
    queryFn: () => statisticsProvider.getPersonalRecords(interval, formTemplate, phase),
  })

export const useInstitutionRecords = (
  interval: StatisticsInterval,
  formTemplate?: string,
  phase?: string,
) =>
  useQuery({
    queryKey: [QUERY_KEYS.RECORDS_INSTITUTION, interval, formTemplate, phase],
    queryFn: () => statisticsProvider.getInstitutionRecords(interval, formTemplate, phase),
  })

export const useAllRecords = (
  interval: StatisticsInterval,
  formTemplate?: string,
  phase?: string,
) =>
  useQuery({
    queryKey: [QUERY_KEYS.RECORDS_ALL, interval, formTemplate, phase],
    queryFn: () => statisticsProvider.getAllRecords(interval, formTemplate, phase),
  })
