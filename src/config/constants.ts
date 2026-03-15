export const APP = {
  MODE: {
    DEMO: 'demo',
    PRODUCTION: 'production',
  },
  ENV_PREFIX: 'RM_STATISTICS_',
} as const

export const API = {
  ERRORS: {
    NO_ACCESS_TOKEN: '[apiClient] No access token available',
  },
  HEADERS: {
    AUTHORIZATION: 'Authorization',
  },
  TOKEN_STORAGE_KEY: 'token',
  RECORDS_STATISTICS_API_PATH: '/records',
} as const

export const QUERY_CONFIG = {
  STALE_TIME: 5 * 60 * 1000,
  RETRY: 1,
} as const
