import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/shared/hooks/useAuth'
import { routes } from '@/config/routes'
import { useEffect } from 'react'

export const Unauthorized = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = (location.state as { from?: Location })?.from?.pathname ?? routes.general

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, from, navigate])

  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 text-center pt-20">
      <h2 className="text-xl font-semibold text-gray-800">Access Denied</h2>
      <p className="text-sm text-gray-500">You do not have permission to view this page.</p>
    </div>
  )
}
