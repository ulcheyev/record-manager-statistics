import kc from '@/config/keycloak.config'
import { isDemo } from '@/config/runtime'

const DEMO = {
  email: 'demo@example.com',
  fullName: 'Demo User',
  username: 'demo',
  isAuthenticated: true as const,
  hasRole: (_role: string) => true,
}

export const useAuth = () => {
  if (isDemo) return DEMO

  return {
    email: kc.tokenParsed?.email as string,
    fullName: `${kc.tokenParsed?.given_name} ${kc.tokenParsed?.family_name}`,
    username: kc.tokenParsed?.preferred_username ?? '',
    isAuthenticated: kc.authenticated ?? false,
    hasRole: (role: string) => kc.hasRealmRole(role),
  }
}
