import { apiClient } from '@/shared/api/client'
import { mockStatisticsProvider } from '@/features/statistics/mock'
import { isDemo } from '@/config/runtime'
import { API } from '@/config/constants'
import type {
  AuthorStatsDto,
  FormTemplateUsageDto,
  GeneralRecordStatsDto,
  InstitutionStatsDto,
  RecordTimelineDto,
  StatisticsInterval,
} from '@/features/statistics/dtoTypes.ts'

export interface StatisticsProvider {
  getGeneral: (interval: StatisticsInterval) => Promise<GeneralRecordStatsDto>
  getTimeline: (interval: StatisticsInterval, granularity: string) => Promise<RecordTimelineDto>
  getByInstitution: (interval: StatisticsInterval) => Promise<InstitutionStatsDto>
  getByAuthor: (interval: StatisticsInterval) => Promise<AuthorStatsDto>
  getByFormTemplate: (interval: StatisticsInterval) => Promise<FormTemplateUsageDto>
}

const toParams = (interval: StatisticsInterval) => {
  const params: Record<string, string> = {}
  if (interval.from) params.from = interval.from
  if (interval.to) params.to = interval.to
  return params
}

const realStatisticsProvider: StatisticsProvider = {
  async getGeneral(interval) {
    const { data } = await apiClient.get<GeneralRecordStatsDto>(API.RECORDS_GENERAL_PATH, {
      params: toParams(interval),
    })
    return data
  },

  async getTimeline(interval, granularity) {
    const { data } = await apiClient.get<RecordTimelineDto>(API.RECORDS_TIMELINE_PATH, {
      params: { ...toParams(interval), granularity },
    })
    return data
  },

  async getByAuthor(interval) {
    const { data } = await apiClient.get<AuthorStatsDto>(API.RECORDS_BY_AUTHOR_PATH, {
      params: toParams(interval),
    })
    return data
  },

  async getByInstitution(interval) {
    const { data } = await apiClient.get<InstitutionStatsDto>(API.RECORDS_BY_INSTITUTION_PATH, {
      params: toParams(interval),
    })
    return data
  },

  async getByFormTemplate(interval) {
    const { data } = await apiClient.get<FormTemplateUsageDto>(API.RECORD_BY_FORM_TEMPLATE_PATH, {
      params: toParams(interval),
    })
    return data
  },
}

export const statisticsProvider: StatisticsProvider = isDemo
  ? mockStatisticsProvider
  : realStatisticsProvider
