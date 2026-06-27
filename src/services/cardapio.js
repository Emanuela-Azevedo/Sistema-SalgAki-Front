import api from './api'

function getErrorMessage(err, fallback) {
    const data = err.response?.data

    if (typeof data === 'string') {
        return data
    }

    if (Array.isArray(data?.errors)) {
        return data.errors.join(', ')
    }

    return (
        data?.message ||
        data?.error ||
        data?.errors ||
        err.message ||
        fallback
    )
}

export async function obterTextoCardapio() {
    try {
        const { data } = await api.get('/cardapio/texto');
        return {
            success: true,
            texto: data
        };
    } catch (err) {
        return {
            success: false,
            error: getErrorMessage(err, 'Erro ao gerar o cardápio')
        };
    }
}