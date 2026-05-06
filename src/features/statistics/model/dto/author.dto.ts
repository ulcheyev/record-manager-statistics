import type { StatisticsWithMetadata, PhaseCountDto } from '@/shared/dto/statistics.dto'
import type {
  AnswerBreakdownDto,
  QuestionPoolDto,
} from '@/features/statistics/model/dto/question.pool.dto.ts'

export interface AuthorOverviewDto extends StatisticsWithMetadata {
  username: string
  fullName: string
  totalRecords: number
  completionRate: number
  rejectionRate: number
  questions: QuestionPoolDto
  answers: AnswerBreakdownDto
  byPhase: PhaseCountDto
  periodFrom: string | null
  periodTo: string | null
}

export interface AuthorWithInstitutionDto extends AuthorOverviewDto {
  institutionName: string | null
  institutionUri: string | null
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
