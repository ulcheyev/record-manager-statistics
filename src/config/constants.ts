export const QUERY_CONFIG = {
  STALE_TIME: 5 * 60 * 1000,
  RETRY: 1,
  LIVE_STATS_QUERY_OPTIONS: {
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: 'always' as const,
    refetchOnWindowFocus: 'always' as const,
    refetchOnReconnect: 'always' as const,
  },
} as const

export const APP = {
  MODE: {
    DEMO: 'demo',
    PRODUCTION: 'production',
  },
  DOCUMENT_TITLE: 'Record Manager Statistics',
  ENV_PREFIX: 'RM_STATISTICS_',
} as const

export const API = {
  ERRORS: {
    NO_ACCESS_TOKEN: '[apiClient] No access token available',
  },
  HEADERS: {
    AUTHORIZATION: 'Authorization',
  },

  // Authors
  AUTHORS_ALL_OVERVIEW: '/authors/all/overview',
  AUTHORS_ALL: '/authors/all',
  AUTHORS_INSTITUTION_OVERVIEW: '/authors/institution/overview',
  AUTHORS_INSTITUTION: '/authors/institution',
  AUTHORS_BY_USERNAME: '/authors',

  // Records
  RECORDS_PERSONAL: '/records',
  RECORDS_INSTITUTION: '/records/institution',
  RECORDS_ALL: '/records/all',

  // Institutions
  INSTITUTIONS_ALL: '/institutions',

  // Timeline
  RECORDS_TIMELINE: '/records/timeline',

  // Permissions
  PERMISSIONS: '/permissions',
} as const

export const QUERY_KEYS = {
  // Authors
  AUTHORS_ALL_OVERVIEW: 'authorsAllOverview',
  AUTHORS_ALL: 'authorsAll',
  AUTHORS_INSTITUTION_OVERVIEW: 'authorsInstitutionOverview',
  AUTHORS_INSTITUTION: 'authorsInstitution',
  AUTHOR_BY_USERNAME: 'authorByUsername',

  // Records
  RECORDS_PERSONAL: 'recordsPersonal',
  RECORDS_INSTITUTION: 'recordsInstitution',
  RECORDS_ALL: 'recordsAll',

  // Institutions
  INSTITUTIONS_ALL: 'institutionsAll',

  // Timeline
  TIMELINE: 'timeline',

  // Permissions
  PERMISSIONS: 'permissions',
} as const

export const ROLES = {
  VIEW_STATISTICS: 'read-statistics-role',
} as const

// Domain thresholds
export const THRESHOLDS = {
  CORRECTNESS_GOOD: 60,
  COMPLETION_GOOD: 60,
} as const

export const LAYOUT = {
  HEADER_HEIGHT: 60, // px – RecordDetailPanel top offset, Header height
  TOKEN_REFRESH_SECONDS: 30, // Keycloak token refresh buffer
} as const

export const PAGINATION = {
  PAGE_SIZE: 15,
} as const

export const STYLES = {
  COLORS: {
    open: '#60a5fa',
    completed: '#10b981',
    rejected: '#f87171',
    unanswered: '#e5e7eb',
    infoUnanswered: '#bfdbfe',
  },
  INSTITUTION_PALETTE: ['#60a5fa', '#34d399', '#a78bfa', '#fb923c', '#f472b6', '#94a3b8'],
  CHART: {
    axisLabelColor: '#9ca3af',
    labelColor: '#6b7280',
    splitLineColor: '#f3f4f6',
    emphasisLabelColor: '#374151',
    scrollFillColor: 'rgba(96,165,250,0.2)',
    scrollBorderColor: '#e5e7eb',
    scrollHandleColor: '#60a5fa',
    tooltipBgColor: 'rgba(255,255,255,0.85)',

    // Extracted magic numbers
    VISIBLE_COLS: 8, // max columns before bar chart scrolls
    BAR_MAX_WIDTH: 28, // px – max bar width in bar charts
    SCATTER_SYMBOL_SIZE: 9, // px – scatter plot dot size

    // Institution bar chart
    INSTITUTION_ROW_HEIGHT: 44, // px per row
    INSTITUTION_CHART_MIN_HEIGHT: 220, // px floor
  },
} as const
