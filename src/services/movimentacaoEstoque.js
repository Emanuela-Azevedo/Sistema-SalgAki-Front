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

// Relatório de movimentações por período
export async function getRelatorioMovimentacoes(produtoId, de, ate) {
    try {
        const { data } = await api.get(`/movimentacoes/${produtoId}/relatorio`, {
            params: { de, ate }
        })
        return { success: true, data }
    } catch (err) {
        return { success: false, error: getErrorMessage(err, 'Erro ao gerar relatório de movimentações') }
    }
}

// Listar movimentações detalhadas por período
export async function getDetalhesMovimentacoes(produtoId, de, ate) {
    try {
        const { data } = await api.get(`/movimentacoes/${produtoId}/detalhes`, {
            params: { de, ate }
        })
        return { success: true, data }
    } catch (err) {
        // Se o backend retornar 204 (no content), tratamos como lista vazia
        if (err.response?.status === 204) {
            return { success: true, data: [] }
        }
        return { success: false, error: getErrorMessage(err, 'Erro ao listar movimentações') }
    }
}