import { apiClient } from '@/shared/api/client'
import type { RecordStats } from './types'
import { mockStatisticsProvider } from '@/features/statistics/mock.ts'
import { isDemo } from '@/config/runtime.ts'
import { API } from '@/config/constants.ts'

export interface StatisticsProvider {
  getRecordStats: () => Promise<import('./types').RecordStats>
}

const realStatisticsProvider = {
  async getRecordStats(): Promise<RecordStats> {
    const { data } = await apiClient.get<RecordStats>(API.RECORDS_STATISTICS_API_PATH)
    return data
  },
}

export const statisticsProvider: StatisticsProvider = isDemo
  ? mockStatisticsProvider
  : realStatisticsProvider
