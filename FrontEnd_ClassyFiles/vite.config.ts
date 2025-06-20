export default {
  server: {
    port: 3000, // Frontend en 3000
    strictPort: true, // Evita cambios
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
}