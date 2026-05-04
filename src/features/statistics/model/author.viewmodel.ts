import { formatPeriod } from '@/shared/utils/util.general'
import type { AuthorOverviewDto, AuthorWithInstitutionDto } from '@/features/statistics/dtoTypes.ts'

export interface AuthorViewModel {
  username: string
  displayName: string
  totalRecords: number
  completionRateFmt: string
  rejectionRateFmt: string
  totalAnswers: number
  evaluableAnswers: number
  totalCorrectAnswers: number
  correctnessRateFmt: string
  /** true when correctnessRate >= 70 */
  correctnessGood: boolean
  /** true when completionRate >= 70 */
  completionGood: boolean
  periodFmt: string
  byPhase: {
    open: number
    completed: number
    rejected: number
  }
  institutionName: string | null
  institutionUri: string | null
}

export const toAuthorViewModel = (
  dto: AuthorOverviewDto & Partial<AuthorWithInstitutionDto>,
): AuthorViewModel => ({
  username: dto.username,
  displayName: dto.fullName || dto.username,
  totalRecords: dto.totalRecords,
  completionRateFmt: `${dto.completionRate.toFixed(1)}%`,
  rejectionRateFmt: `${dto.rejectionRate.toFixed(1)}%`,
  totalAnswers: dto.totalAnswers,
  evaluableAnswers: dto.evaluableAnswers,
  totalCorrectAnswers: dto.totalCorrectAnswers,
  correctnessRateFmt: `${dto.correctnessRate.toFixed(1)}%`,
  correctnessGood: dto.correctnessRate >= 70,
  completionGood: dto.completionRate >= 70,
  periodFmt: formatPeriod(dto.periodFrom ?? undefined, dto.periodTo ?? undefined),
  byPhase: dto.byPhase,
  institutionName: dto.institutionName ?? null,
  institutionUri: dto.institutionUri ?? null,
})
