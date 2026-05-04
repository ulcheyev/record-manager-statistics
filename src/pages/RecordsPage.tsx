import { SkeletonCard } from '@/shared/components/SkeletonCard'
import {
  canViewAllRecords,
  canViewInstitutionRecords,
} from '@/features/statistics/model/permissions.model'
import { AllRecordsSection } from '@/features/statistics/ui/records/AllRecordsSection.tsx'
import { InstitutionRecordsSection } from '@/features/statistics/ui/records/InstitutionRecordsSection.tsx'
import { usePermissions } from '@/features/statistics/api/permissions.hooks.ts'

const PageSkeleton = () => (
  <div className="space-y-5">
    <SkeletonCard h={200} />
    <SkeletonCard h={200} />
  </div>
)

export const RecordsPage = () => {
  const { data: permissions, isLoading } = usePermissions()

  if (isLoading || !permissions) return <PageSkeleton />

  return (
    <div className="space-y-5">
      {canViewInstitutionRecords(permissions) && <InstitutionRecordsSection />}
      {canViewAllRecords(permissions) && <AllRecordsSection />}
    </div>
  )
}
