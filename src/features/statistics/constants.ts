export const STATISTICS_QUERY_KEYS = {
  ALL: ['statistics'] as const,
  RECORDS: () => [...STATISTICS_QUERY_KEYS.ALL, 'records'] as const,
} as const

export const STATISTICS_MOCK_DELAY_MS = 400
