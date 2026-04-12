import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/shared/hooks/useAuth'
import { routes } from '@/config/routes'

interface ProtectedRouteProps {
  roles?: string[]
}

export const ProtectedRoute = ({ roles }: ProtectedRouteProps) => {
  const { isAuthenticated, hasRole } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={routes.unauthorized} state={{ from: location }} replace />
  }

  if (roles && !roles.some(hasRole)) {
    return <Navigate to={routes.unauthorized} replace />
  }

  return <Outlet />
}
