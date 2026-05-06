export interface EvaluablePoolDto {
  answered: number
  correct: number
}

export interface InformativePoolDto {
  answered: number
}

export interface QuestionPoolDto {
  evaluable: number
  informative: number
}

export interface AnswerBreakdownDto {
  evaluable: EvaluablePoolDto
  informative: InformativePoolDto
}
