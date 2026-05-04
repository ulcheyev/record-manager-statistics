import { apiClient } from '@/shared/api/client'
import { mockStatisticsProvider } from '@/features/statistics/mock'
import { isDemo } from '@/config/runtime'
import { API } from '@/config/constants'
import type {
  AuthorOverviewDto,
  AuthorsOverviewDto,
  AuthorsStatisticsDto,
  InstitutionsStatisticsDto,
  RecordListDto,
  StatisticsInterval,
  UserStatisticsPermissionsDto,
} from '@/features/statistics/dtoTypes'

export interface StatisticsProvider {
  getAllAuthorsOverview(interval: StatisticsInterval): Promise<AuthorsOverviewDto>

  getAllAuthors(interval: StatisticsInterval, username?: string): Promise<AuthorsStatisticsDto>

  getInstitutionAuthorsOverview(interval: StatisticsInterval): Promise<AuthorsOverviewDto>

  getInstitutionAuthors(
    interval: StatisticsInterval,
    username?: string,
  ): Promise<AuthorsStatisticsDto>

  getAuthorByUsername(username: string, interval: StatisticsInterval): Promise<AuthorOverviewDto>

  getPersonalRecords(
    interval: StatisticsInterval,
    formTemplate?: string,
    phase?: string,
  ): Promise<RecordListDto>

  getInstitutionRecords(
    interval: StatisticsInterval,
    formTemplate?: string,
    phase?: string,
  ): Promise<RecordListDto>

  getAllRecords(
    interval: StatisticsInterval,
    formTemplate?: string,
    phase?: string,
  ): Promise<RecordListDto>

  getAllInstitutions(interval: StatisticsInterval): Promise<InstitutionsStatisticsDto>

  getPermissions(): Promise<UserStatisticsPermissionsDto>
}

const intervalParams = (interval: StatisticsInterval): Record<string, string> => {
  const p: Record<string, string> = {}
  if (interval.from) p.from = interval.from
  if (interval.to) p.to = interval.to
  return p
}

const recordParams = (
  interval: StatisticsInterval,
  formTemplate?: string,
  phase?: string,
): Record<string, string> => {
  const p = intervalParams(interval)
  if (formTemplate) p.formTemplate = formTemplate
  if (phase) p.phase = phase
  return p
}

const realStatisticsProvider: StatisticsProvider = {
  async getAllAuthorsOverview(interval) {
    const { data } = await apiClient.get<AuthorsOverviewDto>(API.AUTHORS_ALL_OVERVIEW, {
      params: intervalParams(interval),
    })
    return data
  },

  async getAllAuthors(interval, username) {
    const params = intervalParams(interval)
    if (username) params.username = username
    const { data } = await apiClient.get<AuthorsStatisticsDto>(API.AUTHORS_ALL, { params })
    return data
  },

  async getInstitutionAuthorsOverview(interval) {
    const { data } = await apiClient.get<AuthorsOverviewDto>(API.AUTHORS_INSTITUTION_OVERVIEW, {
      params: intervalParams(interval),
    })
    return data
  },

  async getInstitutionAuthors(interval, username) {
    const params = intervalParams(interval)
    if (username) params.username = username
    const { data } = await apiClient.get<AuthorsStatisticsDto>(API.AUTHORS_INSTITUTION, { params })
    return data
  },

  async getAuthorByUsername(username, interval) {
    const { data } = await apiClient.get<AuthorOverviewDto>(
      `${API.AUTHORS_BY_USERNAME}/${username}`,
      {
        params: intervalParams(interval),
      },
    )
    return data
  },

  async getPersonalRecords(interval, formTemplate, phase) {
    const { data } = await apiClient.get<RecordListDto>(API.RECORDS_PERSONAL, {
      params: recordParams(interval, formTemplate, phase),
    })
    return data
  },

  async getInstitutionRecords(interval, formTemplate, phase) {
    const { data } = await apiClient.get<RecordListDto>(API.RECORDS_INSTITUTION, {
      params: recordParams(interval, formTemplate, phase),
    })
    return data
  },

  async getAllRecords(interval, formTemplate, phase) {
    const { data } = await apiClient.get<RecordListDto>(API.RECORDS_ALL, {
      params: recordParams(interval, formTemplate, phase),
    })
    return data
  },

  async getAllInstitutions(interval) {
    const { data } = await apiClient.get<InstitutionsStatisticsDto>(API.INSTITUTIONS_ALL, {
      params: intervalParams(interval),
    })
    return data
  },

  async getPermissions() {
    const { data } = await apiClient.get<UserStatisticsPermissionsDto>(API.PERMISSIONS)
    return data
  },
}

export const statisticsProvider: StatisticsProvider = isDemo
  ? mockStatisticsProvider
  : realStatisticsProvider
