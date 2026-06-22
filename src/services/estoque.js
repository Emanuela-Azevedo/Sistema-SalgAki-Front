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

// Criar estoque inicial para um produto
export async function createEstoque(dto) {
    try {
        const { data } = await api.post('/estoques', dto)
        return { success: true, data }
    } catch (err) {
        return { success: false, error: getErrorMessage(err, 'Erro ao criar estoque') }
    }
}

// Consultar estoque de um produto
export async function getEstoque(produtoId) {
    try {
        const { data } = await api.get(`/estoques/${produtoId}`)
        return { success: true, data }
    } catch (err) {
        return { success: false, error: getErrorMessage(err, 'Erro ao consultar estoque') }
    }
}

// Adicionar entrada de estoque
export async function entradaEstoque(produtoId, quantidade) {
    try {
        const { data } = await api.put(`/estoques/${produtoId}/entrada`, null, {
            params: { quantidade }
        })
        return { success: true, data }
    } catch (err) {
        return { success: false, error: getErrorMessage(err, 'Erro ao adicionar entrada de estoque') }
    }
}

// Remover saída de estoque
export async function saidaEstoque(produtoId, quantidade) {
    try {
        const { data } = await api.put(`/estoques/${produtoId}/saida`, null, {
            params: { quantidade }
        })
        return { success: true, data }
    } catch (err) {
        return { success: false, error: getErrorMessage(err, 'Erro ao remover saída de estoque') }
    }
}

// Listar estoques baixos
export async function getEstoquesBaixos() {
    try {
        const { data } = await api.get('/estoques/baixo')
        return { success: true, data }
    } catch (err) {
        return { success: false, error: getErrorMessage(err, 'Erro ao listar estoques baixos') }
    }
}
