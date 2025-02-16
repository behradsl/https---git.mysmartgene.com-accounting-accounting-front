import * as AuthHooks from '@/hooks/use-auth.hook'
import * as RegistryHooks from '@/hooks/registryHooks/use-registry-find-many'

const api = {
  ...AuthHooks,
  ...RegistryHooks,
}

export default api