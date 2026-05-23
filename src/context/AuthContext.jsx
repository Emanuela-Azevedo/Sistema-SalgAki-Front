import { createContext, useContext, useState } from 'react'
import { login as loginService, logout as logoutService } from '../services/authService'
import { tokenStorage } from '../services/tokenStorage'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(tokenStorage.getUser())
    const [token, setToken] = useState(tokenStorage.getToken())

    async function login(username, password) {
        const { success, data, error } = await loginService(username, password)

        if (!success) return { success, error }

        const usernameFromApi = data.username

        if (!usernameFromApi) {
            return { success: false, error: "Username inválido" }
        }

        // salva token
        tokenStorage.setToken(data.token)
        setToken(data.token)

        // salva user
        tokenStorage.setUser(usernameFromApi)
        setUser(usernameFromApi)

        return { success }
    }

    async function logout() {
        await logoutService()

        tokenStorage.clear()
        setUser(null)
        setToken(null)
    }

    const isAuthenticated = !!token

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                isAuthenticated
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de AuthProvider')
    }
    return context
}