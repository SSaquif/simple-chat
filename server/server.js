const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const morgan = require('morgan');

const PORT = 8080;

//to server files from ../client folder instead of react
// const staticPath = path.join(`${__dirname}`, '..', 'client');
// console.log(staticPath);
//----------------------------------------------------//

const app = express();
const server = http.createServer(app); //adding express listener to server
const io = socketIO(server); //adding socketIO listener to Server

//middle wares
app.use(morgan('dev'));

//app.use(express.static(staticPath)); //to use ../client instead of react

io.on('connection', (sock) => {
	console.log('Someone Connected, io works');
	sock.emit('welcome-message', 'HI you are connected');
	sock.on('user-message', (msg) => {
		console.log('hello', msg);
		io.emit('welcome-message', msg);
	});
});

server.on('error', (err) => {
	console.log('Server Error', error);
});

server.listen(PORT, () => {
	console.log('Listening To Port::' + server.address().port);
});
