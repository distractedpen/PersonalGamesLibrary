import {defineConfig, loadEnv, } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    envDir: "..",
    plugins: [react()],
    server: {
        port: 8003
    }
});