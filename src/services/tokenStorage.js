export const tokenStorage = {
  setToken: (token) => localStorage.setItem('token', token),
  getToken: () => localStorage.getItem('token'),

  setUser: (user) => localStorage.setItem('user', user),
  getUser: () => localStorage.getItem('user'),

  clear: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}
