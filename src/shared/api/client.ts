import axios, { type InternalAxiosRequestConfig } from 'axios'
import { config, isDemo } from '@/config/runtime'
import { API } from '@/config/constants.ts'

const demoRequestInterceptor = (req: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  return req
}

const prodRequestInterceptor = (req: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = localStorage.getItem(API.TOKEN_STORAGE_KEY)
  if (!token) throw new Error(API.ERRORS.NO_ACCESS_TOKEN)

  req.headers[API.HEADERS.AUTHORIZATION] = `Bearer ${token}`
  return req
}

const requestInterceptor = isDemo ? demoRequestInterceptor : prodRequestInterceptor

export const apiClient = axios.create({
  baseURL: config.apiUrl,
})

apiClient.interceptors.request.use(requestInterceptor)
