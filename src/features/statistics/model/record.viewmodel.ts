import type {
  RecordSummaryDto,
  RecordSummaryWithInstitutionDto,
  RecordSummaryWithAuthorDto,
  RecordListDto,
  TemplateSliceDto,
} from '@/features/statistics/dtoTypes'

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
  totalQuestions: number
  totalAnswers: number
  totalEvaluableAnswers: number
  totalCorrectAnswers: number
  correctnessRateFmt: string
  hasEvaluableAnswers: boolean
  correctnessGood: boolean
  hasCertification: boolean
  certificationLabel: string | null
  certificationDesc: string | null
  institutionName: string | null
  authorDisplayName: string | null
  authorUsername: string | null
  authorHasFullName: boolean
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
    totalQuestions: dto.totalQuestions,
    totalAnswers: dto.totalAnswers,
    totalEvaluableAnswers: dto.totalEvaluableAnswers,
    totalCorrectAnswers: dto.totalCorrectAnswers,
    correctnessRateFmt: `${dto.correctnessRate.toFixed(1)}%`,
    hasEvaluableAnswers: dto.totalEvaluableAnswers > 0,
    correctnessGood: dto.correctnessRate >= 70,
    hasCertification: dto.certification !== null,
    certificationLabel: dto.certification?.label ?? null,
    certificationDesc: dto.certification?.description ?? null,
    institutionName: withInst.institutionName ?? null,
    authorDisplayName: authorFull ?? authorUser,
    authorUsername: authorUser,
    authorHasFullName: authorFull !== null && authorUser !== null,
  }
}

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

  const evaluable = dto.records.filter((r) => r.totalEvaluableAnswers > 0)
  const avgCorrectness =
    evaluable.length > 0
      ? evaluable.reduce((sum, r) => sum + r.correctnessRate, 0) / evaluable.length
      : null

  return {
    total: dist.total,
    open,
    completed,
    rejected,
    completionRateFmt: dist.total > 0 ? `${((completed / dist.total) * 100).toFixed(1)}%` : '—',
    avgCorrectnessFmt: avgCorrectness !== null ? `${avgCorrectness.toFixed(1)}%` : null,
    avgCorrectnessGood: avgCorrectness !== null && avgCorrectness >= 70,
    evaluableCount: evaluable.length,
    templates: dto.formTemplateUsage.templates,
    hasTemplates: dto.formTemplateUsage.templates.length > 0,
  }
}
