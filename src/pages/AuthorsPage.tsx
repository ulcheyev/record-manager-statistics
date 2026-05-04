import { SkeletonCard } from '@/shared/components/SkeletonCard'
import {
  canViewAllAuthors,
  canViewInstitutionAuthors,
  canViewInstitutions,
} from '@/features/statistics/model/permissions.model'
import { usePermissions } from '@/features/statistics/api/permissions.hooks.ts'
import { InstitutionAuthorsSection } from '@/features/statistics/ui/authors/InstitutionAuthorsSection.tsx'
import { AllAuthorsSection } from '@/features/statistics/ui/authors/AllAuthorsSection.tsx'
import { InstitutionsSection } from '@/features/statistics/ui/authors/InstitutionsSection.tsx'

const PageSkeleton = () => (
  <div className="space-y-5">
    <SkeletonCard h={200} />
    <SkeletonCard h={200} />
  </div>
)

export const AuthorsPage = () => {
  const { data: permissions, isLoading } = usePermissions()

  if (isLoading || !permissions) return <PageSkeleton />

  return (
    <div className="space-y-5">
      {canViewInstitutionAuthors(permissions) && <InstitutionAuthorsSection />}
      {canViewAllAuthors(permissions) && <AllAuthorsSection />}
      {canViewInstitutions(permissions) && <InstitutionsSection />}
    </div>
  )
}
