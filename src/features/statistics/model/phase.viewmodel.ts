export interface PhaseSegment {
  count: number
  pct: number
}

export interface PhaseBreakdownViewModel {
  open: PhaseSegment
  completed: PhaseSegment
  rejected: PhaseSegment
  total: number
  isEmpty: boolean
}

export const toPhaseBreakdownViewModel = (
  open: number,
  completed: number,
  rejected: number,
): PhaseBreakdownViewModel => {
  const total = open + completed + rejected
  const pct = (n: number): number => (total === 0 ? 0 : (n / total) * 100)

  return {
    open: { count: open, pct: pct(open) },
    completed: { count: completed, pct: pct(completed) },
    rejected: { count: rejected, pct: pct(rejected) },
    total,
    isEmpty: total === 0,
  }
}
