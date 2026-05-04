import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { config } from '@/config/runtime'
import { routes } from '@/config/routes'
import { Header } from '@/shared/components/Header'
import { Footer } from '@/shared/components/Footer'
import { ProtectedRoute } from '@/shared/components/ProtectedRoute'
import { Unauthorized } from '@/shared/components/Unauthorized'
import { ROLES } from '@/config/constants'
import { canViewStatistics } from '@/features/statistics/model/permissions.model'
import { AuthorsPage } from '@/pages/AuthorsPage'
import { PersonalPage } from '@/pages/PersonalPage.tsx'
import { RecordsPage } from '@/pages/RecordsPage.tsx'

export const MainLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-1 mt-16 p-6">
      <Outlet />
    </main>
    <Footer />
  </div>
)

export const AppRouter = () => (
  <BrowserRouter basename={config.basePath}>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to={routes.personal} replace />} />

        <Route element={<ProtectedRoute roles={[ROLES.VIEW_STATISTICS]} />}>
          <Route element={<ProtectedRoute check={canViewStatistics} />}>
            <Route path={routes.personal} element={<PersonalPage />} />
          </Route>

          <Route element={<ProtectedRoute check={canViewStatistics} />}>
            <Route path={routes.authors} element={<AuthorsPage />} />
          </Route>

          <Route element={<ProtectedRoute check={canViewStatistics} />}>
            <Route path={routes.records} element={<RecordsPage />} />
          </Route>
        </Route>

        <Route path={routes.unauthorized} element={<Unauthorized />} />
      </Route>

      <Route path="*" element={<Navigate to={routes.personal} replace />} />
    </Routes>
  </BrowserRouter>
)
