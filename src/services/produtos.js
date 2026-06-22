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
export async function getProdutos() {
    try {
        const { data } = await api.get('/produtos')
        return { success: true, data }
    } catch (err) {
        return { success: false, error: getErrorMessage(err, 'Erro ao buscar produtos') }
    }
}

export async function createProduto(produto) {
    try {
        const res = await api.post('/produtos', produto)
        return { success: true, data: res.data }
    } catch (err) {
        return { success: false, error: getErrorMessage(err, 'Erro ao criar produto') }
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

// Movimentar estoque (ENTRADA ou SAIDA)
export async function movimentarEstoque(id, tipo, quantidade) {
    try {
        let url
        if (tipo === 'ENTRADA') {
            url = `/produtos/${id}/entrada?quantidade=${quantidade}`
        } else if (tipo === 'SAIDA') {
            url = `/produtos/${id}/saida?quantidade=${quantidade}`
        }

        const { data } = await api.put(url)
        return { success: true, data }
    } catch (err) {
        return { success: false, error: getErrorMessage(err, 'Erro ao movimentar estoque') }
    }
}


// Listar produtos com estoque baixo
export async function getEstoqueBaixo() {
    try {
        const { data } = await api.get('/produtos/estoque-baixo')
        return { success: true, data }
    } catch (err) {
        return { success: false, error: getErrorMessage(err, 'Erro ao buscar estoque baixo') }
    }
}

// Relatório de movimentações por período
export async function getRelatorio(id, de, ate) {
    try {
        const { data } = await api.get(`/movimentacoes/${id}/relatorio`, { params: { de, ate } })
        return { success: true, data }
    } catch (err) {
        return { success: false, error: getErrorMessage(err, 'Erro ao buscar relatório') }
    }
}
