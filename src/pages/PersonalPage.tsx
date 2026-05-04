import { useState } from 'react'
import type { RecordSummaryDto } from '@/features/statistics/dtoTypes'
import { PersonalOverviewSection } from '@/features/statistics/ui/personal/PersonalOverviewSection'
import { PersonalRecordsSection } from '@/features/statistics/ui/personal/PersonalRecordsSection'
import { RecordDetailPanel } from '@/features/statistics/components/records'

export const PersonalPage = () => {
  const [selected, setSelected] = useState<RecordSummaryDto | null>(null)

  const handleSelect = (r: RecordSummaryDto) =>
    setSelected((prev) => (prev?.uri === r.uri ? null : r))

  return (
    <>
      <div className="space-y-5">
        <PersonalOverviewSection />
        <PersonalRecordsSection selected={selected} onSelect={handleSelect} />
      </div>

      <RecordDetailPanel record={selected} onClose={() => setSelected(null)} />
    </>
  )
}
