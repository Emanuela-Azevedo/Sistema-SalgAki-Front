/**
 * @typedef {Object} LoginResponse
 * @property {string} token
 * @property {string} username
 */

/**
 * @param {Object} data
 * @returns {LoginResponse}
 */
export function parseLoginResponse(data) {

  return {
    token: data.token,
    username: data.username
  }
}