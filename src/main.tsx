import '@/config/index.configurator'
import { BrowserRouter, Navigate, Route, Routes, Outlet } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { config } from '@/config/runtime'
import { routes } from '@/config/routes'
import { queryClient } from '@/config/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'
import { Header } from '@/shared/components/Header'
import { Footer } from '@/shared/components/Footer'
import { ErrorProvider } from '@/shared/context/ErrorContext.tsx'
import { ProtectedRoute } from '@/shared/components/ProtectedRoute.tsx'
import { ROLES } from '@/config/constants.ts'
import { Unauthorized } from '@/shared/components/Unauthorized.tsx'
import { GeneralPage } from '@/pages/GeneralPage.tsx'
import { AuthorsPage } from '@/pages/AuthorsPage.tsx'

/**
 * Layout (UI only)
 */
export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 mt-16 p-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

/**
 * Router
 */
export const AppRouter = () => {
  return (
    <BrowserRouter basename={config.basePath}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to={routes.general} replace />} />

          <Route element={<ProtectedRoute roles={[ROLES.VIEW_STATISTICS]} />}>
            <Route path={routes.general} element={<GeneralPage />} />
          </Route>

          <Route element={<ProtectedRoute roles={[ROLES.VIEW_STATISTICS]} />}>
            <Route path={routes.authors} element={<AuthorsPage />} />
          </Route>

          <Route path={routes.unauthorized} element={<Unauthorized />} />
        </Route>
        <Route path="*" element={<Navigate to={routes.general} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

/**
 * Entry point
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorProvider>
        <AppRouter />
      </ErrorProvider>
    </QueryClientProvider>
  </StrictMode>,
)
