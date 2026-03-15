export interface CategoryCount {
  category: string
  count: number
}

export interface RecordStats {
  total: number
  byCategory: CategoryCount[]
}
