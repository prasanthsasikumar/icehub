export const useAuth = () => {
  const user = useState('auth.user', () => null)

  const login = async (email: string, password: string) => {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email, password }
    })
    user.value = response.user
    return response
  }

  const register = async (userData: any) => {
    const response = await $fetch('/api/auth/register', {
      method: 'POST',
      body: userData
    })
    user.value = response.user
    return response
  }

  const logout = async () => {
    await $fetch('/api/auth/logout', {
      method: 'POST'
    })
    user.value = null
    await navigateTo('/login')
  }

  const checkAuth = async () => {
    try {
      const response = await $fetch('/api/auth/me')
      user.value = response.user
      return response.user
    } catch {
      user.value = null
      return null
    }
  }

  const isLoggedIn = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  return {
    user: readonly(user),
    login,
    register,
    logout,
    checkAuth,
    isLoggedIn,
    isAdmin
  }
}
