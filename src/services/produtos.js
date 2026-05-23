import api from './api'

// Buscar todos os produtos
export async function getProdutos() {
    try {
        const { data } = await api.get('/produtos')
        return { success: true, data }
    } catch (err) {
        return { success: false, error: err.response?.data ?? 'Erro ao buscar produtos' }
    }
}

export async function createProduto(produto) {
    try {
        const res = await api.post('/produtos', produto)
        return { success: true, data: res.data }
    } catch (err) {
        const server = err.response?.data
        // se o backend retornar um objeto com erros de validação, adapte aqui
        const message = server?.message || server?.errors || err.response?.data || 'Erro ao criar produto'
        return { success: false, error: message }
    }
}

// Atualizar produto existente
export async function updateProduto(id, produto) {
    try {
        const { data } = await api.put(`/produtos/${id}`, produto)
        return { success: true, data }
    } catch (err) {
        return { success: false, error: err.response?.data ?? 'Erro ao atualizar produto' }
    }
}

// Excluir produto
export async function deleteProduto(id) {
    try {
        await api.delete(`/produtos/${id}`)
        return { success: true }
    } catch (err) {
        return { success: false, error: err.response?.data ?? 'Erro ao excluir produto' }
    }
}
