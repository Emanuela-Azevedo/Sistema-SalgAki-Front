/**
 * @typedef {Object} LoginResponse
 * @property {string} token
 * @property {string} tipo
 * @property {number} id
 * @property {string} nome
 * @property {string} email
 * @property {string} perfil
 */

/**
 * @param {Object} data - resposta bruta da API
 * @returns {LoginResponse}
 */
export function parseLoginResponse(data) {
  return {
    token: data.token,
    tipo: data.tipo ?? 'Bearer',
    id: data.id,
    nome: data.nome,
    email: data.email,
    perfil: data.perfil,
  }
}
