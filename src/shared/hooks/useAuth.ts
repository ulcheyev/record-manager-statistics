import kc from '@/config/keycloak.config'
import { isDemo } from '@/config/runtime'

const mockUser = {
  user: { email: 'demo@example.com', given_name: 'Demo', family_name: 'User' },
  email: 'demo@example.com',
  fullName: 'Demo User',
  isAuthenticated: true,
  hasRole: (_role: string) => true, // demo sees everything
}

export const useAuth = () => {
  if (isDemo) return mockUser

  return {
    user: kc.tokenParsed,
    email: kc.tokenParsed?.email as string,
    fullName: `${kc.tokenParsed?.given_name} ${kc.tokenParsed?.family_name}`,
    isAuthenticated: kc.authenticated ?? false,
    hasRole: (role: string) => kc.hasRealmRole(role),
  }
}
