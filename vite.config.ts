import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['@iconify/react', 'lucide-react', '@supabase/supabase.js'],
    }
  },
  plugins: [react()],
})
