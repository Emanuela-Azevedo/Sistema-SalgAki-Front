import api from './api'

function getErrorMessage(err, fallback) {
    const data = err.response?.data

    if (typeof data === 'string') {
        return data
    }

    if (Array.isArray(data?.errors)) {
        return data.errors.join(', ')
    }

    return data?.message || data?.error || data?.errors || fallback
}

// Buscar todos os produtos
export async function getProdutos(params = {}) {
    try {
        const { data } = await api.get('/produtos', { params })
        return { success: true, data }
    } catch (err) {
        return { success: false, error: getErrorMessage(err, 'Erro ao buscar produtos') }
    }
}

// Criar produto
export async function createProduto(produto) {
    try {
        const { data } = await api.post('/produtos', produto)
        return { success: true, data }
    } catch (err) {
        return { success: false, error: getErrorMessage(err, 'Erro ao criar produto') }
    }
}

// Buscar produto por ID
export async function getProdutoById(id) {
    try {
        const { data } = await api.get(`/produtos/${id}`)
        return { success: true, data }
    } catch (err) {
        return { success: false, error: getErrorMessage(err, 'Erro ao buscar produto') }
    }
}

// Atualizar produto existente
export async function updateProduto(id, produto) {
    try {
        const { data } = await api.put(`/produtos/${id}`, produto)
        return { success: true, data }
    } catch (err) {
        return { success: false, error: getErrorMessage(err, 'Erro ao atualizar produto') }
    }
}

// Excluir produto
export async function deleteProduto(id) {
    try {
        await api.delete(`/produtos/${id}`)
        return { success: true }
    } catch (err) {
        return { success: false, error: getErrorMessage(err, 'Erro ao excluir produto') }
    }
}