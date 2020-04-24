/*-----------------------------------------------------Notes-------------------------------------------------------------*/
// Socket.io is a library that contains an API for Web sockets and also Node.js.
// Think of it as a library that somewhat simplifies and adds convenience towards interacting with Web sockets.
// Ok, so what are Web sockets?
// Web sockets is an API that allows for persistent connections between clients and servers.
// Both parties can send and receive data at any time until the connection is closed
// (versus a traditional HTTP connection which closes after the response is sent).

// Question 1: will socket io mess with listener that's already registered on the server (the listener for express)?
// Ans: No
/*------------------------------------------------------End--------------------------------------------------------------*/

const http = require('http'); //maybe switch to https/http Checked:: yeah https doesnt work
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const morgan = require('morgan');

const PORT = 8080;
const staticPath = path.join(`${__dirname}`, '..', 'client');
console.log(staticPath);

const app = express();
const server = http.createServer(app); //adding express listener to server
const io = socketIO(server); //adding socketIO listener to Server

//middle wares
app.use(morgan('dev'));
app.use(express.static(staticPath));

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
