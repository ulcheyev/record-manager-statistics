import '@/config/index.configurator'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { config, isDemo } from '@/config/runtime'
import { routes } from '@/config/routes.ts'
import { Dashboard } from '@/features/statistics'
import { queryClient } from '@/config/queryClient.ts'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const AppRouter = () => {
  return (
    <BrowserRouter basename={config.basePath}>
      <Routes>
        <Route path="/" element={<Navigate to={routes.dashboard} replace />} />
        <Route path={routes.dashboard} element={<Dashboard />} />
        <Route path="*" element={<Navigate to={routes.dashboard} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      {isDemo && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  </StrictMode>,
)
