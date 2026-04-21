import { createContext, useContext, useState } from 'react'
import { login as loginService } from '../services/authService'
import { tokenStorage } from '../services/tokenStorage'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(tokenStorage.getUser)

  async function login(username, senha) {
    const { success, data, error } = await loginService(username, senha)
    if (!success) return { success, error }

    tokenStorage.setToken(data.token)
    tokenStorage.setUser(data)
    setUser(data)
    return { success }
  }

  function logout() {
    tokenStorage.clear()
    setUser(null)
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return context
}
