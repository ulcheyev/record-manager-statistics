import { useQuery } from '@tanstack/react-query'
import { statisticsProvider } from './provider'
import { type Granularity, QUERY_KEYS } from '@/config/constants.ts'
import type { StatisticsInterval } from '@/features/statistics/dtoTypes.ts'

export const useGeneral = (interval: StatisticsInterval) =>
  useQuery({
    queryKey: [QUERY_KEYS.GENERAL, interval],
    queryFn: () => statisticsProvider.getGeneral(interval),
  })

export const useAuthors = (interval: StatisticsInterval) =>
  useQuery({
    queryKey: [QUERY_KEYS.AUTHORS, interval],
    queryFn: () => statisticsProvider.getByAuthor(interval),
  })
export const useInstitutions = (interval: StatisticsInterval) =>
  useQuery({
    queryKey: [QUERY_KEYS.INSTITUTIONS, interval],
    queryFn: () => statisticsProvider.getByInstitution(interval),
  })

export const useTimeline = (interval: StatisticsInterval, granularity: Granularity) =>
  useQuery({
    queryKey: [QUERY_KEYS.TIMELINE, interval, granularity],
    queryFn: () => statisticsProvider.getTimeline(interval, granularity),
  })

export const useFormTemplates = (interval: StatisticsInterval) =>
  useQuery({
    queryKey: [QUERY_KEYS.FORM_TEMPLATES, interval],
    queryFn: () => statisticsProvider.getByFormTemplate(interval),
  })
