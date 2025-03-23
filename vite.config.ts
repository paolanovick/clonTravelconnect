import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {}, // Evita errores con process.env en el navegador
  },
  json: {
    namedExports: true, // Permite importar JSON como módulos
    stringify: false, // Evita que los JSON se conviertan en strings automáticamente
  },
})
