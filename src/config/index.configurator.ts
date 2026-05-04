import { config } from '@/config/runtime'
import { APP } from '@/config/constants.ts'

document.title = APP.DOCUMENT_TITLE
document.querySelector('meta[name="description"]')?.setAttribute('content', APP.DOCUMENT_TITLE)

if (window.location.pathname === '/' || !window.location.pathname.startsWith(config.basePath)) {
  window.location.replace(config.basePath)
}
