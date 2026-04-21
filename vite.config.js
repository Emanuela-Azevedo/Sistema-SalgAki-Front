import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,   // força sempre usar esta porta
    strictPort: true // se a porta estiver ocupada, não muda para outra
  }
})
