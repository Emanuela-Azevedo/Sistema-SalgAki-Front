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

export async function enviarCardapioWhatsApp(numeroWhatsApp) {
    try {
        const { data } = await api.post('/cardapio/enviar-whatsapp', { numeroWhatsApp })
        return { success: true, data }
    } catch (err) {
        return { success: false, error: getErrorMessage(err, 'Erro ao enviar cardápio') }
    }
}