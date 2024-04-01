import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { Server } from 'socket.io';
import type { ViteDevServer } from 'vite';
import type { message } from './src/types/message.type';
import { initSubscription } from './pubsub';

const webSocketServer = {
	name: 'sveltekit-socket-io',
	configureServer(server: ViteDevServer) {
		if (!server.httpServer) return;

		const io = new Server(server.httpServer);

		io.on('connection', (socket) => {
			socket.on('message', (message: message) => {
				io.emit('message', {
					...message
				});
			});
		});

		initSubscription(io);

		console.log('SocketIO injected');
	}
};

export default defineConfig({
	plugins: [sveltekit(), webSocketServer],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
