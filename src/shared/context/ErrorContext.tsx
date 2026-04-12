import { createContext, useState, useCallback, type ReactNode, useEffect } from 'react'

type ErrorListener = (error: string) => void
let errorListener: ErrorListener | null = null

export const errorEmitter = {
  emit: (error: Error | string) => {
    errorListener?.(error instanceof Error ? error.message : error)
  },
  subscribe: (listener: ErrorListener) => {
    errorListener = listener
    return () => {
      errorListener = null
    }
  },
}

interface ErrorContextType {
  showError: (error: Error | string) => void
  clearError: () => void
}

export const ErrorContext = createContext<ErrorContextType | null>(null)

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<string | null>(null)

  const showError = useCallback((err: Error | string) => {
    setError(err instanceof Error ? err.message : err)
  }, [])

  const clearError = useCallback(() => setError(null), [])

  useEffect(() => {
    return errorEmitter.subscribe(setError)
  }, [])

  return (
    <ErrorContext.Provider value={{ showError, clearError }}>
      {children}
      {error && (
        <div className="fixed inset-0 z-200 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-red-500 text-2xl">⚠</span>
              <span className="text-gray-900 font-semibold text-lg">Something went wrong</span>
            </div>
            <p className="text-sm text-gray-500">{error}</p>
            <button
              onClick={clearError}
              className="self-end px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded cursor-pointer border-none"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </ErrorContext.Provider>
  )
}
