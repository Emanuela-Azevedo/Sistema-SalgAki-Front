import api from './api'

function getErrorMessage(err, fallback) {
    const data = err.response?.data

    if (typeof data === 'string') {
        return data
    }

    return data?.message || data?.error || fallback
}

// Listar todas as categorias
export async function getCategorias() {
    try {
        const res = await api.get('/categorias')
        return { success: true, data: res.data }
    } catch (err) {
        return { success: false, error: getErrorMessage(err, 'Erro ao listar categorias') }
    }
}

// Criar categoria
export async function createCategoria(categoria) {
    try {
        const res = await api.post('/categorias', categoria)
        return { success: true, data: res.data }
    } catch (err) {
        return { success: false, error: getErrorMessage(err, 'Erro ao criar categoria') }
    }
}

// Atualizar categoria
export async function updateCategoria(id, categoria) {
    try {
        const res = await api.put(`/categorias/${id}`, categoria)
        return { success: true, data: res.data }
    } catch (err) {
        return { success: false, error: getErrorMessage(err, 'Erro ao atualizar categoria') }
    }
}

// Deletar categoria
export async function deleteCategoria(id) {
    try {
        await api.delete(`/categorias/${id}`)
        return { success: true }
    } catch (err) {
        return { success: false, error: getErrorMessage(err, 'Erro ao deletar categoria') }
    }
}