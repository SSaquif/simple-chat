# Simple-Chat app using socketIO

## Contents

- [Simple Chat @ssaquif](#simple-chat-app-using-socketIO)
  - [Intro](#intro)
  - [Code Break Down](#code-break-down)
    - [Backend](#backend)
    - [Frontend](#frontend)
    - [Back To The Backend](#back-to-the-backend)
  - [Resources](#resources)

## Intro

> So what are Web Sockets?

WebSocket is a communication protocol that allows for persistent connections between clients and servers. In other words, it provides 2 way (full-duplex) communication channel. Both parties can send and receive data at any time until the connection is closed (usually when a user logs out). As opposed to a traditional HTTP connection which closes after the response is sent (think of the http get, post etc requests served by your express server).

> So what's socket.io?

Socket.io is a library that contains an API for using WebSocket. It has 2 parts.

1. A server side library for node.js
2. A client side library that runs in the browser

Think of it as a library that somewhat simplifies and adds convenience towards interacting with WebSockets.

## Code Break Down

### Backend

Import socketIO to your node application

```javascript
const socketIO = require('socket.io');
```

After creating your http server and adding your express listener, we must also add our socketIO listener to the server.

```javascript
const app = express();
const server = http.createServer(app);
const io = socketIO(server); //adding socketIO listener to Server
```

> Question: Will socket io mess with listener that's already registered on the server (the listener for express)?
> Answer: No

Next we see set up and 'endpoint' for what happens when a client gets connected. io.on takes an Event, in this case the connection even (also called connect event), and a callback function (your handles function) that tells the server what to do when a connection happens. In this case we are emitting a custom event called welcome-message to the client who just connected.

```javascript
io.on('connection', (sock) => {
	sock.emit('welcome-message', 'HI you are connected');
});
```

### Frontend

First we must allow the frontend to use socketio.

```javascript
const sock = io(); //io() comes from the socket script index.html
```

In react this will be a little different

```javascript
import io from 'socket.io-client';
const socket = io('http://localhost');
```

Now our front end will receive this message and run the logEvent function, which shows the welcome message on the browser

```javascript
sock.on('welcome-message', logEvent);

const logEvent = (msg) => {
	const messageItem = document.createElement('li');
	messageItem.innerText = msg;
	eventsList.appendChild(messageItem);
};
```

Next when a user submits a message socketio must send back an event to the server with the user's message, which the server can then receive and send to other users.

```javascript
const submitMsg = (event) => {
	event.preventDefault();
	const chatMsg = document.getElementById('chat-box');
	//user emits a custom event
	sock.emit('user-message', chatMsg.value);
};
```

### Back To The Backend

Now our backend will receive this event and the message with it. It will then go on to emit an event to ALL clients connected to it and send the message with it.

```javascript
io.on('connection', (sock) => {
	sock.emit('welcome-message', 'HI you are connected');
	//handle user-message event from client
	sock.on('user-message', (msg) => {
		//emit the message back to all other connected clients
		io.emit('welcome-message', msg);
	});
});
```

### Resources

This is a super simple example to get you started. I will try add more to this and hopefully add React to this tutorial as well.

1. [SocketIO](https://www.npmjs.com/package/socket.io)
2. [SocketIO-Client](https://www.npmjs.com/package/socket.io-client)
