import { defineConfig } from 'vite'
import pug from 'pug'
import fs from 'node:fs'
import path from 'node:path'

const SOURCE = path.resolve('source')

// every non-partial pug file in source/ becomes a page
const pages = () => fs.readdirSync(SOURCE).filter(file => file.endsWith('.pug') && !file.startsWith('_'))

// Vite needs html entry points, so compile each page to <root>/<name>.html
const compile = file => {
	const html = pug.renderFile(path.join(SOURCE, file), { pretty: true })
	const out = path.resolve(file.replace(/\.pug$/, '.html'))
	fs.writeFileSync(out, html)
	return out
}

const pugPages = () => ({
	name: 'pug-pages',
	config: () => ({
		build: { rollupOptions: { input: pages().map(compile) } }
	}),
	configureServer(server) {
		server.watcher.add(path.join(SOURCE, '*.pug'))
		server.watcher.on('change', file => {
			if (!file.endsWith('.pug')) return
			pages().forEach(compile)
			server.ws.send({ type: 'full-reload' })
		})
	}
})

export default defineConfig({
	base: './',
	publicDir: false,
	plugins: [pugPages()],
	server: { port: 909 },
	build: {
		outDir: 'dist',
		emptyOutDir: true,
		assetsInlineLimit: 0,
		chunkSizeWarningLimit: 1024
	}
})
