import api from './api'
import { createLoginRequest } from '../models/LoginRequest'
import { parseLoginResponse } from '../models/LoginResponse'
import { handleRequest } from '../models/ApiResponse'

export async function login(username, senha) {
  // simulação temporária — remover quando o backend estiver rodando
  return {
    success: true,
    data: { token: 'fake-token', nome: 'Teste', username, perfil: 'ADMIN' },
  }

  // const { success, data, error } = await handleRequest(
  //   api.post('/auth/login', createLoginRequest(username, senha))
  // )
  // if (!success) return { success, error }
  // return { success, data: parseLoginResponse(data) }
}
