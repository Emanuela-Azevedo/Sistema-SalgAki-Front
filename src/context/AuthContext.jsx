import { createContext, useContext, useState, useEffect } from 'react'
import { login as loginService, logout as logoutService } from '../services/authService'
import { tokenStorage } from '../services/tokenStorage'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(tokenStorage.getUser())
    const [token, setToken] = useState(tokenStorage.getToken())
    const [isAuthenticated, setIsAuthenticated] = useState(!!token)

    // Sincroniza estado com localStorage ao carregar a aplicação
    useEffect(() => {
        const storedToken = tokenStorage.getToken()
        const storedUser = tokenStorage.getUser()
        if (storedToken) {
            setToken(storedToken)
            setUser(storedUser)
            setIsAuthenticated(true)
        } else {
            setToken(null)
            setUser(null)
            setIsAuthenticated(false)
        }
    }, [])

    async function login(username, password) {
        const { success, data, error } = await loginService(username, password)
        if (!success) return { success, error }

        const usernameFromApi = data.username
        const tokenFromApi = data.token

        if (!usernameFromApi || !tokenFromApi) {
            return { success: false, error: 'Resposta inválida do servidor' }
        }

        // salva user
        tokenStorage.setUser(usernameFromApi)
        setUser(usernameFromApi)

        // salva token
        tokenStorage.setToken(tokenFromApi)
        setToken(tokenFromApi)

        setIsAuthenticated(true)

        return { success }
    }

    async function logout() {
        await logoutService()
        tokenStorage.clear()
        setUser(null)
        setToken(null)
        setIsAuthenticated(false)
    }

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