import type {
  InstitutionsStatisticsDto,
  InstitutionSummaryDto,
} from '@/features/statistics/model/dto/institution.dto.ts'
import { THRESHOLDS } from '@/config/constants.ts'
import { type AnswerModel, toAnswerModel } from '@/features/statistics/model/answer.model.ts'

export interface InstitutionRowViewModel {
  uri: string
  name: string
  totalRecords: number
  authorCount: number
  completionRateFmt: string
  rejectionRateFmt: string
  completionGood: boolean
  answers: AnswerModel
}

export interface InstitutionsOverviewViewModel {
  totalInstitutions: number
  mostRecordsInfo: string
  mostAnswersInfo: string
  bestCompletionInfo: string
  bestCorrectnessInfo: string
}

export const toInstitutionRowViewModel = (dto: InstitutionSummaryDto): InstitutionRowViewModel => ({
  uri: dto.uri,
  name: dto.name,
  totalRecords: dto.totalRecords,
  authorCount: dto.authorCount,
  completionRateFmt: `${dto.completionRate.toFixed(1)}%`,
  rejectionRateFmt: `${dto.rejectionRate.toFixed(1)}%`,
  completionGood: dto.completionRate >= THRESHOLDS.COMPLETION_GOOD,
  answers: toAnswerModel(dto.questions, dto.answers),
})

export const toInstitutionsOverviewViewModel = (
  dto: InstitutionsStatisticsDto,
): InstitutionsOverviewViewModel => ({
  totalInstitutions: dto.totalInstitutions,
  mostRecordsInfo: dto.mostRecordsInstitutionInfo ?? '—',
  mostAnswersInfo: dto.mostAnswersInstitutionInfo ?? '—',
  bestCompletionInfo: dto.bestCompletionRateInstitutionInfo ?? '—',
  bestCorrectnessInfo: dto.bestAnswerCorrectnessInstitutionInfo ?? '—',
})
