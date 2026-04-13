export interface PhaseCountDto {
  open: number
  completed: number
  rejected: number
}

export interface GeneralRecordStatsDto {
  totalRecords: number
  completionRate: number
  rejectionRate: number
  participatingInstitutions: number
  entryClerks: number
  periodFrom?: string
  periodTo?: string
  avgRecordsPerInstitution: number
  avgRecordsPerAuthor: number
  byPhase: PhaseCountDto
  interval: StatisticsIntervalDto
}

export interface StatisticsIntervalDto {
  from: string | null
  to: string | null
  empty: boolean
}

export interface PhaseDistributionDto {
  total: number
  interval: StatisticsIntervalDto
  distribution: PhaseSliceDto[]
}

export interface PhaseSliceDto {
  phase: string
  count: number
  percentage: number
}

export interface RecordTimelineDto {
  granularity: string
  interval: StatisticsIntervalDto
  timeSeries: TimeSeriesDto
}

export interface TimeSeriesDto {
  labels: string[]
  series: Record<string, number[]>
  totals: number[]
  granularity: string
  interval: StatisticsIntervalDto
}

export interface InstitutionStatsDto {
  interval: StatisticsIntervalDto
  institutions: InstitutionRecordStatsDto[]
}

export interface InstitutionRecordStatsDto {
  uri: string
  name: string
  total: number
  completionRate: number
  rejectionRate: number
  byPhase: PhaseCountDto
}

export interface AuthorStatsDto {
  interval: StatisticsIntervalDto
  authors: AuthorRecordStatsDto[]
}

export interface AuthorRecordStatsDto {
  uri: string
  fullName: string
  username: string
  institutionName: string | null
  total: number
  completionRate: number
  rejectionRate: number
  byPhase: PhaseCountDto
}

export interface FormTemplateUsageDto {
  total: number
  interval: StatisticsIntervalDto
  templates: TemplateSliceDto[]
}

export interface TemplateSliceDto {
  templateUri: string
  templateLabel: string
  count: number
  percentage: number
}

export interface StatisticsInterval {
  from?: string
  to?: string
}

export interface RecordStats {
  labels: string[]
  series: Record<string, number[]>
  totals: number[]
  granularity: string
  interval: StatisticsIntervalDto
}

export interface StatisticsIntervalDto {
  from: string | null
  to: string | null
  empty: boolean
}

export interface PhaseCountDto {
  open: number
  completed: number
  rejected: number
}

export interface GeneralRecordStatsDto {
  totalRecords: number
  completionRate: number
  rejectionRate: number
  participatingInstitutions: number
  entryClerks: number
  periodFrom?: string
  periodTo?: string
  avgRecordsPerInstitution: number
  avgRecordsPerAuthor: number
  byPhase: PhaseCountDto
  interval: StatisticsIntervalDto
}

export interface TimeSeriesDto {
  labels: string[]
  series: Record<string, number[]>
  totals: number[]
  granularity: string
  interval: StatisticsIntervalDto
}

export interface RecordTimelineDto {
  granularity: string
  interval: StatisticsIntervalDto
  timeSeries: TimeSeriesDto
}

export interface AuthorRecordStatsDto {
  uri: string
  fullName: string
  username: string
  institutionName: string | null
  total: number
  completionRate: number
  rejectionRate: number
  byPhase: PhaseCountDto
}

export interface AuthorStatsDto {
  interval: StatisticsIntervalDto
  authors: AuthorRecordStatsDto[]
}
