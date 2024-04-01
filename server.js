// server.js
import http from 'http';
import { handler } from './build/handler.js';
import express from 'express';
import { Server } from 'socket.io';
import { initSubscription, publishMessage } from './pubsub.js';

const app = express();
const server = http.createServer(app);

const io = new Server(server);

io.on('connection', (socket) => {
	socket.on('message', (message) => {
		publishMessage(message.content, message.username);
	});
});

initSubscription(io);

console.log('SocketIO injected');

// SvelteKit handlers
app.use(handler);

server.listen(3000, () => {
	console.log('Running on http://localhost:3000');
});
