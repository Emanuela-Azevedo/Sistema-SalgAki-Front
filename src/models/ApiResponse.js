/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {any} data
 * @property {string|null} error
 */

/**
 * Envolve uma chamada axios e retorna formato padronizado.
 * @param {Promise} promise
 * @returns {Promise<ApiResponse>}
 */
export async function handleRequest(promise) {
  try {
    const { data } = await promise
    return { success: true, data, error: null }
  } catch (err) {
    const error = err.response?.data?.message ?? err.message ?? 'Erro inesperado'
    return { success: false, data: null, error }
  }
}
