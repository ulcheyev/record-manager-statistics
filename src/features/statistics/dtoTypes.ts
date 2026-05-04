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

export interface AuthorOverviewDto extends StatisticsWithMetadata {
  username: string
  fullName: string
  totalRecords: number
  completionRate: number
  rejectionRate: number
  totalAnswers: number
  evaluableAnswers: number
  totalCorrectAnswers: number
  correctnessRate: number
  totalEvaluableQuestions?: number
  totalInformativeQuestions?: number
  byPhase: PhaseCountDto
  periodFrom: string | null // ISO instant
  periodTo: string | null // ISO instant
}

export interface AuthorWithInstitutionDto extends AuthorOverviewDto {
  institutionName: string | null
  institutionUri: string | null // URI serialised as string
}

export interface AuthorsOverviewDto extends StatisticsWithMetadata {
  totalAuthors: number
  mostRecordsAuthorInfo: string | null
  mostAnswersAuthorInfo: string | null
  bestCompletionRateInfo: string | null
  mostRejectionRateInfo: string | null
  bestAnswerCorrectnessInfo: string | null
}

export interface AuthorsStatisticsDto extends StatisticsWithMetadata {
  authors: AuthorWithInstitutionDto[]
  overview: AuthorsOverviewDto
}

export interface InstitutionSummaryDto {
  uri: string
  name: string
  totalRecords: number
  authorCount: number
  completionRate: number
  rejectionRate: number
  totalAnswers: number
  evaluableAnswers: number
  totalCorrectAnswers: number
  correctnessRate: number
}

export interface InstitutionsStatisticsDto extends StatisticsWithMetadata {
  totalInstitutions: number
  mostRecordsInstitutionInfo: string | null
  mostAnswersInstitutionInfo: string | null
  bestCompletionRateInstitutionInfo: string | null
  mostRejectionRateInstitutionInfo: string | null
  bestAnswerCorrectnessInstitutionInfo: string | null
  institutions: InstitutionSummaryDto[]
}

export interface PhaseSliceDto {
  phase: RecordPhase
  count: number
  percentage: number
}

export interface PhaseDistributionDto {
  interval: StatisticsIntervalDto | null
  total: number
  distribution: PhaseSliceDto[]
}

export interface TemplateSliceDto {
  templateUri: string
  templateLabel: string
  count: number
  percentage: number
}

export interface FormTemplateUsageDto extends StatisticsWithMetadata {
  interval: StatisticsIntervalDto | null
  total: number
  templates: TemplateSliceDto[]
}

export interface CertificationDto {
  label: string
  description: string | null
}

export interface RecordSummaryDto {
  uri: string // URI serialised as string
  name: string | null
  phase: RecordPhase
  formTemplateLabel: string | null
  totalQuestions: number
  totalAnswers: number
  totalEvaluableAnswers: number
  totalCorrectAnswers: number
  correctnessRate: number
  dateCreated: string // ISO instant
  certification: CertificationDto | null
}

export interface RecordSummaryWithInstitutionDto extends RecordSummaryDto {
  institutionName: string | null
}

export interface RecordSummaryWithAuthorDto extends RecordSummaryWithInstitutionDto {
  authorFullName: string | null
  authorUsername: string | null
}

export interface RecordListDto extends StatisticsWithMetadata {
  total: number
  records: RecordSummaryDto[]
  phaseDistribution: PhaseDistributionDto
  formTemplateUsage: FormTemplateUsageDto
}

export interface UserStatisticsPermissionsDto {
  canReadAllRecords: boolean
  canReadOrgRecords: boolean
  canReadAllUsers: boolean
  canReadOrgUsers: boolean
  canReadAllOrganizations: boolean
  canReadOrganization: boolean
  canReadStatistics: boolean
}
