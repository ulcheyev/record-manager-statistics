import type {
  InstitutionSummaryDto,
  InstitutionsStatisticsDto,
} from '@/features/statistics/dtoTypes'

export interface InstitutionRowViewModel {
  uri: string
  name: string
  totalRecords: number
  authorCount: number
  completionRateFmt: string
  rejectionRateFmt: string
  totalAnswers: number
  evaluableAnswers: number
  totalCorrectAnswers: number
  correctnessRateFmt: string
  correctnessGood: boolean
  completionGood: boolean
}

export const toInstitutionRowViewModel = (dto: InstitutionSummaryDto): InstitutionRowViewModel => ({
  uri: dto.uri,
  name: dto.name,
  totalRecords: dto.totalRecords,
  authorCount: dto.authorCount,
  completionRateFmt: `${dto.completionRate.toFixed(1)}%`,
  rejectionRateFmt: `${dto.rejectionRate.toFixed(1)}%`,
  totalAnswers: dto.totalAnswers,
  evaluableAnswers: dto.evaluableAnswers,
  totalCorrectAnswers: dto.totalCorrectAnswers,
  correctnessRateFmt: `${dto.correctnessRate.toFixed(1)}%`,
  correctnessGood: dto.correctnessRate >= 70,
  completionGood: dto.completionRate >= 70,
})

export interface InstitutionsOverviewViewModel {
  totalInstitutions: number
  mostRecordsInfo: string
  mostAnswersInfo: string
  bestCompletionInfo: string
  bestCorrectnessInfo: string
}

export const toInstitutionsOverviewViewModel = (
  dto: InstitutionsStatisticsDto,
): InstitutionsOverviewViewModel => ({
  totalInstitutions: dto.totalInstitutions,
  mostRecordsInfo: dto.mostRecordsInstitutionInfo ?? '—',
  mostAnswersInfo: dto.mostAnswersInstitutionInfo ?? '—',
  bestCompletionInfo: dto.bestCompletionRateInstitutionInfo ?? '—',
  bestCorrectnessInfo: dto.bestAnswerCorrectnessInstitutionInfo ?? '—',
})
