const sock = io(); //io() comes from the socket script index.html

const eventsList = document.getElementById('log-events');

const logEvent = (msg) => {
	const messageItem = document.createElement('li');
	messageItem.innerText = msg;
	eventsList.appendChild(messageItem);
};

const submitMsg = (event) => {
	event.preventDefault();
	const chatMsg = document.getElementById('chat-box');
	console.log(chatMsg.value);
	//user emits a custom event
	sock.emit('user-message', chatMsg.value);
};

sock.on('welcome-message', logEvent);
