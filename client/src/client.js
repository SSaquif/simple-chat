const sock = io(); //io() comes from the socket script

const eventsList = document.getElementById('log-events');

const logEvent = (msg) => {
	const messageItem = document.createElement('li');
	messageItem.innerText = msg;
	eventsList.appendChild(messageItem);
};

const submitMsg = (event) => {
	event.preventDefault();
	console.log('hello', event.target); //this is undefined her but works on react(i believe) u keep forgetting this
	//for html
	const chatMsg = document.getElementById('chat-box');
	console.log(chatMsg.value);

	sock.emit('user-message', chatMsg.value);
};

sock.on('welcome-message', logEvent); //looks for sock.emit('message', '...')
