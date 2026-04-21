import Keycloak from 'keycloak-js'
import { config, isDemo } from '@/config/runtime'

const kc = new Keycloak({
  url: config.authUrl,
  realm: config.realm,
  clientId: config.clientId,
})

if (!isDemo) {
  await kc.init({
    // check-sso hanging at localhost due to Keycloak's 3p-cookies probe interacting with the missing silent-check-sso.html file.
    // login-required avoids that entire iframe flow.
    onLoad: 'login-required',

    // Disable to avoid issues in certain browsers (e.g. Safari)
    checkLoginIframe: false,

    // Can be enabled if PKCE support is added on the Keycloak server side and
    // the keycloak-js library is updated to a version that supports it.
    pkceMethod: false,
  })
}

export default kc
