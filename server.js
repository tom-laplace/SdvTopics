// server.js
import http from 'http';
import { handler } from './build/handler.js';
import express from 'express';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

const io = new Server(server);

io.on('connection', (socket) => {
	let username = `User ${Math.round(Math.random() * 999999)}`;
	socket.emit('name', username);

	socket.on('message', (message) => {
		io.emit('message', {
			from: username,
			message: message,
			time: new Date().toLocaleString()
		});
	});
});

console.log('SocketIO injected');

// SvelteKit handlers
app.use(handler);

server.listen(3000, () => {
	console.log('Running on http://localhost:3000');
});
