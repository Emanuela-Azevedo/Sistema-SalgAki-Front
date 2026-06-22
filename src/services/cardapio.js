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

// Gerar e baixar o PDF do cardápio
export async function getCardapioPdf() {
    try {
        const response = await api.get('/cardapio/pdf', {
            responseType: 'blob' // importante para receber o PDF como arquivo binário
        })

        // cria um objeto URL para o PDF
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
        return { success: true, url }
    } catch (err) {
        return { success: false, error: getErrorMessage(err, 'Erro ao gerar PDF do cardápio') }
    }
}