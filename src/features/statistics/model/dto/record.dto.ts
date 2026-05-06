import type {
  StatisticsWithMetadata,
  RecordPhase,
  StatisticsIntervalDto,
} from '@/shared/dto/statistics.dto'
import type {
  AnswerBreakdownDto,
  QuestionPoolDto,
} from '@/features/statistics/model/dto/question.pool.dto.ts'

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

export interface RecordSummaryDto {
  uri: string
  name: string | null
  phase: RecordPhase
  formTemplateLabel: string | null
  dateCreated: string
  questions: QuestionPoolDto
  answers: AnswerBreakdownDto
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
