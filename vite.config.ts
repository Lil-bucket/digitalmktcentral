export default defineConfig({
  plugins: [react()],
  base: '/digitalmktcentral/',
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
