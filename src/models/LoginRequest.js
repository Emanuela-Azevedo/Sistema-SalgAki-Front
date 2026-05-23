/**
 * @typedef {Object} LoginRequest
 * @property {string} username
 * @property {string} password
 */

/**
 * @param {string} username
 * @param {string} password
 * @returns {LoginRequest}
 */
export function createLoginRequest(username, password) {

  return {
    username,
    password
  }
}