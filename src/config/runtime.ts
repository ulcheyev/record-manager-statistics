import { APP } from './constants'

type AppMode = typeof APP.MODE.DEMO | typeof APP.MODE.PRODUCTION

interface RuntimeEnv {
  BASE_PATH: string
  RM_BASE_PATH: string
  API_URL: string
  AUTH_URL: string
  REALM: string
  CLIENT_ID: string
  APP_TITLE: string
  APP_MODE: string
}

declare global {
  interface Window {
    __RUNTIME_CONFIG__?: Partial<RuntimeEnv>
  }
}

function get(key: keyof RuntimeEnv, buildTimeFallback: string): string {
  const runtimeValue = window.__RUNTIME_CONFIG__?.[key]
  if (runtimeValue && runtimeValue.trim() !== '') return runtimeValue

  const buildTimeValue = import.meta.env[`${APP.ENV_PREFIX}${key}`]
  if (buildTimeValue && buildTimeValue.trim() !== '') return buildTimeValue

  if (buildTimeFallback.trim() !== '') return buildTimeFallback

  throw new Error(`[config] Missing required config value: ${key}`)
}

export const config = {
  apiUrl: get('API_URL', 'http://localhost:1235/services/statistics-server'),
  authUrl: get('AUTH_URL', 'http://localhost:1235/services/auth/realms/record-manager'),
  realm: get('REALM', 'record-manager'),
  clientId: get('CLIENT_ID', 'record-manager-statistics'),
  basePath: get('BASE_PATH', '/statistics'),
  rmBasePath: get('RM_BASE_PATH', '/record-manager'),
  appTitle: get('APP_TITLE', 'Record Manager Statistics'),
  appMode: get('APP_MODE', APP.MODE.PRODUCTION) as AppMode,
} as const

export type Config = typeof config

// Derived
export const isDemo = config.appMode === APP.MODE.DEMO
export const recordManagerUrl = `${window.location.origin}${config.rmBasePath}`
