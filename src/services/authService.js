import api from './api'

export async function login(username, password) {

  try {

    const { data } = await api.post(
        '/auth/login',
        {
          username,
          password
        }
    )

    return {
      success: true,
      data
    }

  } catch (err) {

    const error =
        err.response?.data ??
        'Usuário ou senha inválidos'

    return {
      success: false,
      error
    }
  }
}

export async function logout() {

  try {

    await api.post('/auth/logout')

  } catch {

  }
}