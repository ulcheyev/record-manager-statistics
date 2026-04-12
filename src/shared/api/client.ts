import axios, { type InternalAxiosRequestConfig } from 'axios'
import { config, isDemo } from '@/config/runtime'
import { API } from '@/config/constants'
import kc from '@/config/keycloak.config'
import { errorEmitter } from '@/shared/context/ErrorContext'

const demoRequestInterceptor = (req: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  return req
}

const prodRequestInterceptor = async (
  req: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
  try {
    await kc.updateToken(30)
    req.headers[API.HEADERS.AUTHORIZATION] = `Bearer ${kc.token}`
  } catch {
    errorEmitter.emit('Session expired.')
    await kc.login({ redirectUri: window.location.href })
  }
  return req
}

const requestInterceptor = isDemo ? demoRequestInterceptor : prodRequestInterceptor

export const apiClient = axios.create({
  baseURL: config.apiUrl,
})

apiClient.interceptors.request.use(requestInterceptor)

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.message ?? err.message ?? 'An unexpected error occurred'
    errorEmitter.emit(message)
    return Promise.reject(err)
  },
)
