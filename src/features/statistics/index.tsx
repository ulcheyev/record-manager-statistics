import { RecordTotal } from '@/features/statistics/components/RecordTotal.tsx'
import { RecordsByCategory } from '@/features/statistics/components/RecordsByCategory.tsx'

export const Dashboard = () => (
  <div>
    <RecordTotal />
    <RecordsByCategory />
  </div>
)
