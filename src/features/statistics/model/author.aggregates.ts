import type { AuthorWithInstitutionDto } from '@/features/statistics/model/dto/author.dto'
import { toAnswerModel } from '@/features/statistics/model/answer.model.ts'

const sum = (authors: AuthorWithInstitutionDto[], fn: (a: AuthorWithInstitutionDto) => number) =>
  authors.reduce((acc, a) => acc + fn(a), 0)

const fmt = (n: number) => n.toLocaleString()

export const toAggregateAnswerModel = (authors: AuthorWithInstitutionDto[]) =>
  toAnswerModel(
    {
      evaluable: sum(authors, (a) => a.questions.evaluable),
      informative: sum(authors, (a) => a.questions.informative),
    },
    {
      evaluable: {
        answered: sum(authors, (a) => a.answers.evaluable.answered),
        correct: sum(authors, (a) => a.answers.evaluable.correct),
      },
      informative: {
        answered: sum(authors, (a) => a.answers.informative.answered),
      },
    },
  )

export const getInformativeTotals = (authors: AuthorWithInstitutionDto[]) => {
  const m = toAggregateAnswerModel(authors)
  return [
    { label: 'Total informative', value: fmt(m.informativeTotal), dim: false },
    { label: 'Answered', value: fmt(m.informativeAnswered), color: 'bg-blue-400', dim: false },
    { label: 'Unanswered', value: fmt(m.informativeUnanswered), color: 'bg-blue-100', dim: true },
    { label: 'Answer rate', value: m.answerRateFmt, dim: false },
  ]
}

export const getEvaluationTotals = (authors: AuthorWithInstitutionDto[]) => {
  const m = toAggregateAnswerModel(authors)
  return [
    { label: 'Total evaluable', value: fmt(m.evaluableTotal), dim: false },
    { label: 'Correct', value: fmt(m.correct), color: 'bg-emerald-500', dim: false },
    { label: 'Incorrect', value: fmt(m.incorrect), color: 'bg-rose-400', dim: false },
    { label: 'Unanswered', value: fmt(m.evaluableUnanswered), color: 'bg-gray-200', dim: true },
    { label: 'Correctness rate', value: m.correctnessRateFmt, dim: false },
  ]
}

export const getRecordsTotals = (authors: AuthorWithInstitutionDto[]) => {
  const total = sum(authors, (a) => a.totalRecords)
  const completed = sum(authors, (a) => a.byPhase.completed)
  const rejected = sum(authors, (a) => a.byPhase.rejected)
  const open = sum(authors, (a) => a.byPhase.open)
  const pct = (v: number) => (total === 0 ? '—' : `${((v / total) * 100).toFixed(1)}%`)
  return [
    { label: 'Total records', value: fmt(total), dim: false },
    { label: 'Completed', value: fmt(completed), color: 'bg-emerald-500', dim: false },
    { label: 'Rejected', value: fmt(rejected), color: 'bg-rose-400', dim: false },
    { label: 'Open', value: fmt(open), color: 'bg-blue-400', dim: true },
    { label: 'Completion', value: pct(completed), dim: false },
  ]
}

export const getCorrectnessTotals = (authors: AuthorWithInstitutionDto[]) => {
  const m = toAggregateAnswerModel(authors)
  return [
    { label: 'Total records', value: fmt(sum(authors, (a) => a.totalRecords)), dim: false },
    { label: 'Evaluable answered', value: fmt(m.evaluableAnswered), dim: false },
    { label: 'Correct', value: fmt(m.correct), color: 'bg-emerald-500', dim: false },
  ]
}

export const getCompletionTotals = (authors: AuthorWithInstitutionDto[]) => {
  const total = sum(authors, (a) => a.totalRecords)
  const completed = sum(authors, (a) => a.byPhase.completed)
  return [
    { label: 'Total records', value: fmt(total), dim: false },
    { label: 'Completed', value: fmt(completed), color: 'bg-emerald-500', dim: false },
  ]
}

export const getAnsweredTotals = (authors: AuthorWithInstitutionDto[]) => {
  const m = toAggregateAnswerModel(authors)
  return [
    { label: 'Total answers', value: fmt(m.totalAnswers), dim: false },
    { label: 'Evaluable', value: fmt(m.evaluableAnswered), color: 'bg-violet-400', dim: false },
    { label: 'Informative', value: fmt(m.informativeAnswered), color: 'bg-blue-400', dim: false },
  ]
}

export const getUnansweredTotals = (authors: AuthorWithInstitutionDto[]) => {
  const m = toAggregateAnswerModel(authors)
  return [
    { label: 'Total questions', value: fmt(m.totalQuestions), dim: false },
    { label: 'Unanswered', value: fmt(m.totalUnanswered), color: 'bg-rose-400', dim: false },
    { label: 'Answered', value: fmt(m.totalAnswers), color: 'bg-emerald-500', dim: false },
  ]
}
