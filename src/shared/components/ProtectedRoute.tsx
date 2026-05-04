import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/shared/hooks/useAuth'
import { routes } from '@/config/routes'
import type { UserStatisticsPermissionsDto } from '@/features/statistics/dtoTypes'
import { usePermissions } from '@/features/statistics/api/permissions.hooks.ts'

interface Props {
  roles?: string[]
  check?: (p: UserStatisticsPermissionsDto) => boolean
}

export const ProtectedRoute = ({ roles, check }: Props) => {
  const { isAuthenticated, hasRole } = useAuth()
  const { data: permissions, isLoading } = usePermissions({ enabled: isAuthenticated })
  const location = useLocation()

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
