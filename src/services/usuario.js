import api from './api'
import { tokenStorage } from './tokenStorage'

function getErrorMessage(err, fallback) {
    const data = err.response?.data
    if (typeof data === 'string') return data
    if (Array.isArray(data?.errors)) return data.errors.join(', ')
    return data?.message || data?.error || fallback
}

export async function getUsuario() {
    try {
        const { data } = await api.get('/usuario')
        return { success: true, data }
    } catch (err) {
        return { success: false, error: getErrorMessage(err, 'Erro ao buscar usuário') }
    }
}

export async function atualizarSenha(senhaAtual, novaSenha) {
    try {
        const res = await api.put('/usuario/senha', null, {
            params: { senhaAtual, novaSenha }
        })
        const token = res.headers['authorization']
        if (token) {
            tokenStorage.setToken(token.replace(/^Bearer\s+/i, '')) // salva só o token puro
        }
        return { success: true, data: res.data }
    } catch (err) {
        return { success: false, error: getErrorMessage(err, 'Erro ao atualizar senha') }
    }
}

export async function atualizarUsername(senhaAtual, novoUsername) {
    try {
        const res = await api.put('/usuario/username', null, {
            params: { senhaAtual, novoUsername }
        })
        const token = res.headers['authorization']
        if (token) {
            tokenStorage.setToken(token.replace(/^Bearer\s+/i, ''))
        }
        return { success: true, data: res.data }
    } catch (err) {
        return { success: false, error: getErrorMessage(err, 'Erro ao atualizar usuário') }
    }
}
