export const QUERY_CONFIG = {
  STALE_TIME: 5 * 60 * 1000,
  RETRY: 1,
} as const

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
  RECORDS_GENERAL_PATH: '/records/general',
  RECORDS_TIMELINE_PATH: '/records/timeline',
  RECORDS_BY_AUTHOR_PATH: '/records/by-author',
  RECORDS_BY_INSTITUTION_PATH: '/records/by-institution',
  RECORD_BY_FORM_TEMPLATE_PATH: '/records/by-form-template',
} as const

export const QUERY_KEYS = {
  GENERAL: 'general',
  AUTHORS: 'authors',
  TIMELINE: 'timeline',
  INSTITUTIONS: 'institutions',
  FORM_TEMPLATES: 'formTemplates',
} as const

export const ROLES = {
  VIEW_STATISTICS: 'read-statistics-role',
} as const

export const GRANULARITY_OPTIONS = ['DAY', 'MONTH', 'YEAR'] as const
export type Granularity = (typeof GRANULARITY_OPTIONS)[number]

export const STYLES = {
  COLORS: {
    open: '#60a5fa',
    completed: '#10b981',
    rejected: '#f87171',
  },
}
