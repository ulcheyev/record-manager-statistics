import { config } from '@/config/runtime'

document.title = config.appTitle
document.querySelector('meta[name="description"]')?.setAttribute('content', config.appTitle)
