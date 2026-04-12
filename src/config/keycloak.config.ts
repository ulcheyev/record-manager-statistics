import Keycloak from 'keycloak-js'
import { config, isDemo } from '@/config/runtime'

const kc = new Keycloak({
  url: config.authUrl,
  realm: config.realm,
  clientId: config.clientId,
})

if (!isDemo) {
  await kc.init({
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + config.basePath + '/silent-check-sso.html',
    checkLoginIframe: false, // handle token refresh manually in interceptor, so no need for the iframe
    pkceMethod: false, // PKCE is not needed for public clients that don't have a secret
  })

  if (!kc.authenticated) {
    await kc.login()
  }
}

export default kc
