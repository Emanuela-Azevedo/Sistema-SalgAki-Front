import axios from 'axios'
import { tokenStorage } from './tokenStorage'

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
})

// Interceptor de requisição: adiciona o token
api.interceptors.request.use((config) => {
    const token = tokenStorage.getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Interceptor de resposta: trata erros 401
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expirado ou inválido
            tokenStorage.clear()
            // Redireciona para login
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export default api
