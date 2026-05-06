import type { RecordSummaryDto } from '@/features/statistics/model/dto/record.dto.ts'

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

export const recordId = (uri: string) => uri.split('/').pop() ?? uri

export const displayName = (r: RecordSummaryDto) =>
  r.name ?? r.formTemplateLabel ?? `Record ${recordId(r.uri)}`
