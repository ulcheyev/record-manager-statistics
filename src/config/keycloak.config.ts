import Keycloak from 'keycloak-js'
import { config, isDemo } from '@/config/runtime'

const kc = new Keycloak({
  url: config.authUrl,
  realm: config.realm,
  clientId: config.clientId,
})

if (!isDemo) {
  await kc.init({
    onLoad: 'login-required',
    checkLoginIframe: false,
    pkceMethod: false,
  })
}

export default kc
