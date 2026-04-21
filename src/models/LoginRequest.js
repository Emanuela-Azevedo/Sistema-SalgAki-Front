/**
 * @typedef {Object} LoginRequest
 * @property {string} email
 * @property {string} senha
 */

/**
 * @param {string} email
 * @param {string} senha
 * @returns {LoginRequest}
 */
export function createLoginRequest(username, senha) {
  return { username, senha }
}
