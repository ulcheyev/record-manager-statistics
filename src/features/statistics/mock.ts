import type { RecordStats } from './types'
import { STATISTICS_MOCK_DELAY_MS } from './constants'

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

export const mockStatisticsProvider = {
  async getRecordStats(): Promise<RecordStats> {
    await delay(STATISTICS_MOCK_DELAY_MS)
    return {
      total: 14855,
      byCategory: [
        { category: 'Incident report', count: 4821 },
        { category: 'Audit record', count: 3240 },
        { category: 'Safety check', count: 2890 },
        { category: 'Maintenance', count: 1980 },
        { category: 'Training log', count: 1240 },
        { category: 'Other', count: 701 },
      ],
    }
  },
}
