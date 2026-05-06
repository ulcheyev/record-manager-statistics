import { THRESHOLDS } from '@/config/constants'
import type {
  AnswerBreakdownDto,
  QuestionPoolDto,
} from '@/features/statistics/model/dto/question.pool.dto.ts'

export interface AnswerModel {
  evaluableAnswered: number
  informativeAnswered: number
  correct: number
  totalAnswers: number

  evaluableTotal: number
  informativeTotal: number
  totalQuestions: number

  incorrect: number
  evaluableUnanswered: number
  informativeUnanswered: number
  totalUnanswered: number

  correctnessRate: number
  correctnessRateFmt: string
  correctnessGood: boolean

  answerRate: number
  answerRateFmt: string

  evaluableAnsweredRate: number
  informativeAnsweredRate: number
  evaluableUnansweredRate: number
  informativeUnansweredRate: number

  hasEvaluable: boolean
  hasInformative: boolean
  hasCorrectness: boolean
  hasAnswersBreakdown: boolean
}

const percentage = (value: number, total: number): number => (total > 0 ? (value / total) * 100 : 0)

export const toAnswerModel = (
  questions: QuestionPoolDto,
  answers: AnswerBreakdownDto,
): AnswerModel => {
  const evaluableAnswered = answers.evaluable.answered
  const informativeAnswered = answers.informative.answered
  const correct = answers.evaluable.correct
  const totalAnswers = evaluableAnswered + informativeAnswered

  const evaluableTotal = questions.evaluable
  const informativeTotal = questions.informative
  const totalQuestions = evaluableTotal + informativeTotal

  const incorrect = Math.max(0, evaluableAnswered - correct)
  const evaluableUnanswered = Math.max(0, evaluableTotal - evaluableAnswered)
  const informativeUnanswered = Math.max(0, informativeTotal - informativeAnswered)
  const totalUnanswered = Math.max(0, totalQuestions - totalAnswers)

  const hasCorrectness = evaluableAnswered > 0
  const correctnessRate = hasCorrectness ? percentage(correct, evaluableAnswered) : 0

  const answerRate = percentage(totalAnswers, totalQuestions)

  return {
    evaluableAnswered,
    informativeAnswered,
    correct,
    totalAnswers,

    evaluableTotal,
    informativeTotal,
    totalQuestions,

    incorrect,
    evaluableUnanswered,
    informativeUnanswered,
    totalUnanswered,

    correctnessRate,
    correctnessRateFmt: hasCorrectness ? `${correctnessRate.toFixed(1)}%` : '—',
    correctnessGood: hasCorrectness && correctnessRate >= THRESHOLDS.CORRECTNESS_GOOD,

    answerRate,
    answerRateFmt: totalQuestions > 0 ? `${answerRate.toFixed(1)}%` : '—',

    evaluableAnsweredRate: percentage(evaluableAnswered, totalQuestions),
    informativeAnsweredRate: percentage(informativeAnswered, totalQuestions),
    evaluableUnansweredRate: percentage(evaluableUnanswered, totalQuestions),
    informativeUnansweredRate: percentage(informativeUnanswered, totalQuestions),

    hasEvaluable: evaluableTotal > 0,
    hasInformative: informativeTotal > 0,
    hasCorrectness,
    hasAnswersBreakdown: totalQuestions > 0,
  }
}
