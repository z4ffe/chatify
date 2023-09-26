import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), viteCompression()],
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
