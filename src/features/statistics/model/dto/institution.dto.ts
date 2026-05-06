import type { StatisticsWithMetadata } from '@/shared/dto/statistics.dto'
import type {
  AnswerBreakdownDto,
  QuestionPoolDto,
} from '@/features/statistics/model/dto/question.pool.dto.ts'

export interface InstitutionSummaryDto {
  uri: string
  name: string
  totalRecords: number
  authorCount: number
  completionRate: number
  rejectionRate: number
  questions: QuestionPoolDto
  answers: AnswerBreakdownDto
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
