import axios from 'axios'
import { tokenStorage } from './tokenStorage'

const api = axios.create({
    baseURL: 'http://localhost:8080', // ajuste conforme seu backend
})

api.interceptors.request.use((config) => {
    const token = tokenStorage.getToken()
    if (token) {
        // sempre adiciona o prefixo Bearer na hora de enviar
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api