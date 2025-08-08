import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/gmfitness-website/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Optimisations de build
    rollupOptions: {
      output: {
        manualChunks: {
          // Sépare Framer Motion dans un chunk séparé
          'framer-motion': ['framer-motion'],
          // Sépare React dans un chunk séparé
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
    // Minification pour la production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  // Optimisations de développement
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
  },
})