import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/shared/hooks/useAuth'
import { routes } from '@/config/routes'
import { usePermissions } from '@/features/statistics/api/permissions.hooks.ts'
import type { UserStatisticsPermissionsDto } from '@/features/statistics/model/dto/permissions.dto.ts'

interface Props {
  roles?: string[]
  check?: (p: UserStatisticsPermissionsDto) => boolean
}

export const ProtectedRoute = ({ roles, check }: Props) => {
  const location = useLocation()
  const { isAuthenticated, hasRole } = useAuth()

  const needsPermissions = Boolean(check)

  const { data: permissions, isLoading } = usePermissions({
    enabled: isAuthenticated && needsPermissions,
  })

  if (!isAuthenticated) {
    return <Navigate to={routes.unauthorized} state={{ from: location }} replace />
  }

  if (roles && !roles.some(hasRole)) {
    return <Navigate to={routes.unauthorized} replace />
  }

  if (check) {
    if (isLoading) return null

    if (!permissions || !check(permissions)) {
      return <Navigate to={routes.unauthorized} replace />
    }
  }

  return <Outlet />
}
