import { config } from '@/config/runtime'

document.title = config.appTitle
document.querySelector('meta[name="description"]')?.setAttribute('content', config.appTitle)

if (window.location.pathname === '/' || !window.location.pathname.startsWith(config.basePath)) {
  window.location.replace(config.basePath)
}
