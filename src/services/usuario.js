import api from './api'

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

export async function atualizarSenha(novaSenha) {
    try {
        const { data } = await api.put('/usuario/senha', null, { params: { novaSenha } })
        return { success: true, data }
    } catch (err) {
        return { success: false, error: getErrorMessage(err, 'Erro ao atualizar senha') }
    }
}

export async function atualizarUsername(novoUsername) {
    try {
        const { data } = await api.put('/usuario/username', null, { params: { novoUsername } })
        return { success: true, data }
    } catch (err) {
        return { success: false, error: getErrorMessage(err, 'Erro ao atualizar usuário') }
    }
}
