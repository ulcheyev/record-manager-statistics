import { useQuery } from '@tanstack/react-query'
import { statisticsProvider } from '@/features/statistics/provider'
import { QUERY_KEYS } from '@/config/constants'
import type { StatisticsInterval } from '@/features/statistics/dtoTypes'

export const useAllAuthorsOverview = (interval: StatisticsInterval) =>
  useQuery({
    queryKey: [QUERY_KEYS.AUTHORS_ALL_OVERVIEW, interval],
    queryFn: () => statisticsProvider.getAllAuthorsOverview(interval),
  })

export const useAllAuthors = (interval: StatisticsInterval, username?: string) =>
  useQuery({
    queryKey: [QUERY_KEYS.AUTHORS_ALL, interval, username],
    queryFn: () => statisticsProvider.getAllAuthors(interval, username),
  })

export const useInstitutionAuthorsOverview = (interval: StatisticsInterval) =>
  useQuery({
    queryKey: [QUERY_KEYS.AUTHORS_INSTITUTION_OVERVIEW, interval],
    queryFn: () => statisticsProvider.getInstitutionAuthorsOverview(interval),
  })

export const useInstitutionAuthors = (interval: StatisticsInterval, username?: string) =>
  useQuery({
    queryKey: [QUERY_KEYS.AUTHORS_INSTITUTION, interval, username],
    queryFn: () => statisticsProvider.getInstitutionAuthors(interval, username),
  })

export const useAuthorByUsername = (username: string, interval: StatisticsInterval) =>
  useQuery({
    queryKey: [QUERY_KEYS.AUTHOR_BY_USERNAME, username, interval],
    queryFn: () => statisticsProvider.getAuthorByUsername(username, interval),
    enabled: !!username,
  })
