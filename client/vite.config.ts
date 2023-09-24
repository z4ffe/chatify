import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3003,
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@import "src/assets/styles/_variables.scss";',
			},
		},
	},
})
