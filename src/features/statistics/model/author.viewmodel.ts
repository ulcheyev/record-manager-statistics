import { THRESHOLDS } from '@/config/constants'
import { formatPeriod } from '@/shared/utils/util.general'
import type {
  AuthorOverviewDto,
  AuthorWithInstitutionDto,
} from '@/features/statistics/model/dto/author.dto'
import { type AnswerModel, toAnswerModel } from '@/features/statistics/model/answer.model.ts'

export interface AuthorViewModel {
  username: string
  displayName: string
  totalRecords: number
  completionRateFmt: string
  rejectionRateFmt: string
  completionGood: boolean
  periodFmt: string
  byPhase: { open: number; completed: number; rejected: number }
  institutionName: string | null
  institutionUri: string | null
  answers: AnswerModel
}

export const toAuthorViewModel = (
  dto: AuthorOverviewDto & Partial<AuthorWithInstitutionDto>,
): AuthorViewModel => ({
  username: dto.username,
  displayName: dto.fullName ? `${dto.fullName} (@${dto.username})` : dto.username,
  totalRecords: dto.totalRecords,
  completionRateFmt: `${dto.completionRate.toFixed(1)}%`,
  rejectionRateFmt: `${dto.rejectionRate.toFixed(1)}%`,
  completionGood: dto.completionRate >= THRESHOLDS.COMPLETION_GOOD,
  periodFmt: formatPeriod(dto.periodFrom ?? undefined, dto.periodTo ?? undefined),
  byPhase: dto.byPhase,
  institutionName: dto.institutionName ?? null,
  institutionUri: dto.institutionUri ?? null,
  answers: toAnswerModel(dto.questions, dto.answers),
})
