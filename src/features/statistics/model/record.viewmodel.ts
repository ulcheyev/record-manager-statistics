import { THRESHOLDS } from '@/config/constants'
import type {
  RecordListDto,
  RecordSummaryDto,
  RecordSummaryWithAuthorDto,
  RecordSummaryWithInstitutionDto,
  TemplateSliceDto,
} from '@/features/statistics/model/dto/record.dto'
import { type AnswerModel, toAnswerModel } from '@/features/statistics/model/answer.model.ts'

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

const recordId = (uri: string) => uri.split('/').pop() ?? uri

export const resolveDisplayName = (
  r: Pick<RecordSummaryDto, 'name' | 'formTemplateLabel' | 'uri'>,
): string => r.name ?? r.formTemplateLabel ?? `Record ${recordId(r.uri)}`

export interface RecordRowViewModel {
  uri: string
  displayName: string
  phase: string
  formTemplateLabel: string
  dateCreatedFmt: string
  institutionName: string | null
  authorDisplayName: string | null
  authorUsername: string | null
  authorHasFullName: boolean
  answers: AnswerModel
}

export const toRecordRowViewModel = (dto: RecordSummaryDto): RecordRowViewModel => {
  const withInst = dto as Partial<RecordSummaryWithInstitutionDto>
  const withAuthor = dto as Partial<RecordSummaryWithAuthorDto>
  const authorFull = withAuthor.authorFullName ?? null
  const authorUser = withAuthor.authorUsername ?? null

  return {
    uri: dto.uri,
    displayName: resolveDisplayName(dto),
    phase: dto.phase,
    formTemplateLabel: dto.formTemplateLabel ?? '—',
    dateCreatedFmt: fmtDate(dto.dateCreated),
    institutionName: withInst.institutionName ?? null,
    authorDisplayName: authorFull ?? authorUser,
    authorUsername: authorUser,
    authorHasFullName: authorFull !== null && authorUser !== null,
    answers: toAnswerModel(dto.questions, dto.answers),
  }
}

export interface RecordDetailViewModel {
  uri: string
  displayName: string
  phase: string
  formTemplateLabel: string | null
  dateCreatedFmt: string
  answers: AnswerModel
}

export const toRecordDetailViewModel = (dto: RecordSummaryDto): RecordDetailViewModel => ({
  uri: dto.uri,
  displayName: resolveDisplayName(dto),
  phase: dto.phase,
  formTemplateLabel: dto.formTemplateLabel ?? null,
  dateCreatedFmt: fmtDate(dto.dateCreated),
  answers: toAnswerModel(dto.questions, dto.answers),
})

export interface RecordsOverviewViewModel {
  total: number
  open: number
  completed: number
  rejected: number
  completionRateFmt: string
  avgCorrectnessFmt: string | null
  avgCorrectnessGood: boolean
  evaluableCount: number
  templates: TemplateSliceDto[]
  hasTemplates: boolean
}

export const toRecordsOverviewViewModel = (dto: RecordListDto): RecordsOverviewViewModel => {
  const dist = dto.phaseDistribution
  const open = dist.distribution.find((d) => d.phase === 'OPEN')?.count ?? 0
  const completed = dist.distribution.find((d) => d.phase === 'COMPLETED')?.count ?? 0
  const rejected = dist.distribution.find((d) => d.phase === 'REJECTED')?.count ?? 0

  const evaluableRecords = dto.records.filter((r) => r.questions.evaluable > 0)
  const avgCorrectness =
    evaluableRecords.length > 0
      ? evaluableRecords.reduce((acc, r) => {
          const rate =
            r.answers.evaluable.answered > 0
              ? (r.answers.evaluable.correct / r.answers.evaluable.answered) * 100
              : 0
          return acc + rate
        }, 0) / evaluableRecords.length
      : null

  return {
    total: dist.total,
    open,
    completed,
    rejected,
    completionRateFmt: dist.total > 0 ? `${((completed / dist.total) * 100).toFixed(1)}%` : '—',
    avgCorrectnessFmt: avgCorrectness !== null ? `${avgCorrectness.toFixed(1)}%` : null,
    avgCorrectnessGood: avgCorrectness !== null && avgCorrectness >= THRESHOLDS.CORRECTNESS_GOOD,
    evaluableCount: evaluableRecords.length,
    templates: dto.formTemplateUsage.templates,
    hasTemplates: dto.formTemplateUsage.templates.length > 0,
  }
}
