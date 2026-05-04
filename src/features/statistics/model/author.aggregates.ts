import type { AuthorWithInstitutionDto } from '@/features/statistics/dtoTypes'

const sum = (authors: AuthorWithInstitutionDto[], fn: (a: AuthorWithInstitutionDto) => number) =>
  authors.reduce((acc, a) => acc + fn(a), 0)

const pct = (value: number, total: number) =>
  total === 0 ? '-' : `${((value / total) * 100).toFixed(1)}%`

const fmt = (n: number) => n.toLocaleString()

export const getInformativeTotals = (authors: AuthorWithInstitutionDto[]) => {
  const total = sum(authors, (a) => a.totalInformativeQuestions ?? 0)
  const answered = sum(authors, (a) => Math.max(0, a.totalAnswers - a.evaluableAnswers))
  const unanswered = Math.max(0, total - answered)
  return [
    { label: 'Total informative', value: fmt(total), dim: false },
    { label: 'Answered', value: fmt(answered), color: 'bg-blue-400', dim: false },
    { label: 'Unanswered', value: fmt(unanswered), color: 'bg-blue-100', dim: true },
  ]
}

export const getEvaluationTotals = (authors: AuthorWithInstitutionDto[]) => {
  const total = sum(authors, (a) => a.evaluableAnswers ?? 0)
  const correct = sum(authors, (a) => a.totalCorrectAnswers)
  const incorrect = Math.max(0, total - correct)
  const unanswered = Math.max(0, total - total)
  return [
    { label: 'Total evaluable', value: fmt(total), dim: false },
    { label: 'Correct', value: fmt(correct), color: 'bg-emerald-500', dim: false },
    { label: 'Incorrect', value: fmt(incorrect), color: 'bg-rose-400', dim: false },
    { label: 'Unanswered', value: fmt(unanswered), color: 'bg-gray-200', dim: true },
    { label: 'Correctness rate', value: pct(correct, total), dim: false },
  ]
}

export const getRecordsTotals = (authors: AuthorWithInstitutionDto[]) => {
  const total = sum(authors, (a) => a.totalRecords)
  const completed = sum(authors, (a) => a.byPhase.completed)
  const rejected = sum(authors, (a) => a.byPhase.rejected)
  const open = sum(authors, (a) => a.byPhase.open)
  return [
    { label: 'Total records', value: fmt(total), dim: false },
    { label: 'Completed', value: fmt(completed), color: 'bg-emerald-500', dim: false },
    { label: 'Rejected', value: fmt(rejected), color: 'bg-rose-400', dim: false },
    { label: 'Open', value: fmt(open), color: 'bg-blue-400', dim: true },
    { label: 'Completion', value: pct(completed, total), dim: false },
  ]
}

export const getCorrectnessTotals = (authors: AuthorWithInstitutionDto[]) => {
  const totalRecords = sum(authors, (a) => a.totalRecords)
  const evaluable = sum(authors, (a) => a.evaluableAnswers)
  const correct = sum(authors, (a) => a.totalCorrectAnswers)
  return [
    { label: 'Total records', value: fmt(totalRecords), dim: false },
    { label: 'Evaluable answers', value: fmt(evaluable), dim: false },
    { label: 'Correct', value: fmt(correct), color: 'bg-emerald-500', dim: false },
  ]
}

export const getCompletionTotals = (authors: AuthorWithInstitutionDto[]) => {
  const totalRecords = sum(authors, (a) => a.totalRecords)
  const completed = sum(authors, (a) => a.byPhase.completed)
  return [
    { label: 'Total records', value: fmt(totalRecords), dim: false },
    { label: 'Completed', value: fmt(completed), color: 'bg-emerald-500', dim: false },
  ]
}

export const getAnsweredTotals = (authors: AuthorWithInstitutionDto[]) => {
  const totalAnswers = sum(authors, (a) => a.totalAnswers)
  const evaluable = sum(authors, (a) => a.evaluableAnswers)
  const informative = Math.max(0, totalAnswers - evaluable)
  return [
    { label: 'Total answers', value: fmt(totalAnswers), dim: false },
    { label: 'Evaluable', value: fmt(evaluable), color: 'bg-violet-400', dim: false },
    { label: 'Informative', value: fmt(informative), color: 'bg-blue-400', dim: false },
  ]
}

export const getUnansweredTotals = (authors: AuthorWithInstitutionDto[]) => {
  const totalQ = sum(
    authors,
    (a) => (a.totalEvaluableQuestions ?? 0) + (a.totalInformativeQuestions ?? 0),
  )
  const answered = sum(authors, (a) => a.totalAnswers)
  const unanswered = Math.max(0, totalQ - answered)
  return [
    { label: 'Total questions', value: fmt(totalQ), dim: false },
    { label: 'Unanswered', value: fmt(unanswered), color: 'bg-rose-400', dim: false },
    { label: 'Answered', value: fmt(answered), color: 'bg-emerald-500', dim: false },
  ]
}
