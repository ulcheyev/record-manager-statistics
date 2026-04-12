import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';
import { APP } from './src/config/constants'

export default defineConfig({
  plugins: [react(), tailwindcss(),],
  envPrefix: APP.ENV_PREFIX,
  base: '',
  root: '',
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
