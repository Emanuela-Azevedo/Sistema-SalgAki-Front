// import api from './api'
// import { createLoginRequest } from '../models/LoginRequest'
// import { parseLoginResponse } from '../models/LoginResponse'
// import { handleRequest } from '../models/ApiResponse'

export async function login(email, senha) {
  // simulação temporária — remover quando o backend estiver rodando
  return {
    success: true,
    data: { token: 'fake-token', nome: 'Teste', email, perfil: 'ADMIN' },
  }
}
