import api from './api'

// Listar todas as categorias
export async function getCategorias() {
    try {
        const res = await api.get('/categorias')
        return { success: true, data: res.data }
    } catch (err) {
        return { success: false, error: err.response?.data?.message || 'Erro ao listar categorias' }
    }
}

// Criar categoria
export async function createCategoria(categoria) {
    try {
        const res = await api.post('/categorias', categoria)
        return { success: true, data: res.data }
    } catch (err) {
        return { success: false, error: err.response?.data?.message || 'Erro ao criar categoria' }
    }
}

// Atualizar categoria
export async function updateCategoria(id, categoria) {
    try {
        const res = await api.put(`/categorias/${id}`, categoria)
        return { success: true, data: res.data }
    } catch (err) {
        return { success: false, error: err.response?.data?.message || 'Erro ao atualizar categoria' }
    }
}

// Deletar categoria
export async function deleteCategoria(id) {
    try {
        await api.delete(`/categorias/${id}`)
        return { success: true }
    } catch (err) {
        return { success: false, error: err.response?.data?.message || 'Erro ao deletar categoria' }
    }
}
