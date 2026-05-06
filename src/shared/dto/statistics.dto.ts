export interface StatisticsIntervalDto {
  from: string | null
  to: string | null
}

export interface StatisticsInterval {
  from?: string
  to?: string
}

export type StatisticsLabel = string

export interface StatisticsWithMetadata {
  label: StatisticsLabel | null
  description: string | null
  interval: StatisticsIntervalDto | null
}

export type RecordPhase = 'OPEN' | 'COMPLETED' | 'REJECTED'

export interface PhaseCountDto {
  open: number
  completed: number
  rejected: number
}
