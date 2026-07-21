import api from './api'

function getErrorMessage(err, fallback) {
    const data = err.response?.data

    if (typeof data === 'string') {
        return data
    }

    if (Array.isArray(data?.errors)) {
        return data.errors.join(', ')
    }

    return data?.mensagem
        || data?.message
        || data?.error
        || data?.errors
        || fallback
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
export async function entradaEstoque(produtoId, quantidade, dataValidade) {
    try {
        const params = { quantidade }
        if (dataValidade) params.dataValidade = dataValidade
        const { data } = await api.post(`/estoques/${produtoId}/entrada`, null, { params })
        return { success: true, data }
    } catch (err) {
        return { success: false, error: getErrorMessage(err, 'Erro ao adicionar entrada de estoque') }
    }
}

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
        return {
            success: false,
            error: getErrorMessage(err, 'Erro ao listar estoques baixos')
        }
    }
}

// Listar todos os estoques (lotes)
export async function getTodosEstoques() {
    try {
        const { data } = await api.get('/estoques')
        return { success: true, data }
    } catch (err) {
        return {
            success: false,
            error: getErrorMessage(err, 'Erro ao listar estoques')
        }
    }
}