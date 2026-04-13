import { useState } from 'react'
import { IntervalPicker } from '@/features/statistics/components/IntervalPicker'
import { SkeletonCard } from '@/shared/components/SkeletonCard'
import { useFormTemplates } from '@/features/statistics/hooks'
import { useError } from '@/shared/hooks/useError'
import type { StatisticsInterval } from '@/features/statistics/dtoTypes'
import { FormTemplateChart } from '@/features/statistics/components/forms/FormTemplateChart.tsx'

export const FormsPage = () => {
  const [interval, setInterval] = useState<StatisticsInterval>({})
  const { data, isLoading, isError } = useFormTemplates(interval)
  const { showError } = useError()

  if (isError) {
    showError('Failed to load form template statistics. Please try again.')
    return null
  }

  return (
    <div className="space-y-5">
      <IntervalPicker value={interval} onChange={setInterval} />
      {isLoading && <SkeletonCard h={300} />}
      {data && <FormTemplateChart dto={data} />}
    </div>
  )
}
