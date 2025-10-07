import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Three.js chunk'ı
          'three': ['three', '@react-three/fiber', '@react-three/drei'],
          // React chunk'ı
          'react-vendor': ['react', 'react-dom'],
          // Router chunk'ı  
          'router': ['react-router-dom']
        }
      }
    },
    // Asset inline limit (küçük dosyalar için)
    assetsInlineLimit: 4096,
    // Minimize
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  // Development optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', 'three', '@react-three/fiber', '@react-three/drei']
  }
})
