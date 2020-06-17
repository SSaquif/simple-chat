import React, { createContext, useReducer } from 'react';
import io from 'socket.io-client';

export const ChatContext = createContext();

const initialState = {
	connectionStatus: 'disconnected',
	error: null,
	groups: {
		g1: {
			groupName: 'Group 1',
			groupId: 'g1',
			messages: [
				{
					sender: 'friend1',
					timestamp: '01/05/2020 11:00pm',
					msg: 'Sup.......?',
					msgId: 'm-1',
				},
				{
					sender: 'currentUser',
					timestamp: '01/05/2020 11.05pm',
					msg: 'Blah Blah!!',
					msgId: 'm-2',
				},
			],
		},

		g2: {
			groupName: 'Group 2',
			groupId: 'g2',
			messages: [
				{
					sender: 'friend2',
					timestamp: '01/05/2020 11:30pm',
					msg: 'Hello',
					msgId: 'm-1',
				},
				{
					sender: 'currentUser',
					timestamp: '01/05/2020 11.35pm',
					msg: 'World??',
					msgId: 'm-2',
				},
			],
		},
	},
};

const ChatReducer = (state, action) => {
	let newState = { ...state };
	switch (action.type) {
		case 'connected':
			newState.status = action.payload.status;
			console.log('status', newState.status);
			return newState;
		case 'disconnected':
			newState.status = action.payload.status;
			console.log('status', newState.status);
			return newState;
		case 'receive-msg':
			// { group, sender, msg, time }
			console.log(action.payload);
			const msgIndex =
				newState.groups[action.payload.groupId].messages.length + 1;
			const newMsg = {
				sender: action.payload.sender,
				timestamp: action.payload.time,
				msg: action.payload.msg,
				msgId: 'm-' + msgIndex,
			};
			newState.groups[action.payload.groupId].messages.push(newMsg);
			return newState;
		default:
			return newState;
	}
};

const sendMsg = (groupId, sender, msg, time) => {
	console.log(groupId, sender, msg, time);
	socket.emit('sender-chat-message', { groupId, sender, msg, time });
};

//We first initialize the socket, outside the functional component
//So it doesn't get re-rendered every single time the context provider changes
let socket;

export const ChatContextProvider = ({ children }) => {
	const [chatInfo, dispatch] = useReducer(ChatReducer, initialState);

	const connectionEstablished = (status) => {
		console.log('inside connection established');
		dispatch({ type: 'connected', payload: { status } });
	};

	const connectionEnded = () => {
		console.log('inside connection Ended');
		dispatch({ type: 'disconnected', payload: { status: 'disconnected' } });
		socket.emit('disconnect');
	};

	const receiveMsg = (groupId, sender, msg, time) => {
		dispatch({ type: 'receive-msg', payload: { groupId, sender, msg, time } });
	};

	if (!socket) {
		socket = io('http://localhost:8080');
		console.log('created socket' + socket.id);
	} else {
		socket.on('connection-message', ({ status }) => {
			console.log(status);
			connectionEstablished(status);
		});
		socket.on('disconnect', () => {
			connectionEnded();
		});
		socket.on('receiver-chat-message', ({ groupId, sender, msg, time }) => {
			dispatch({
				type: 'receive-msg',
				payload: { groupId, sender, msg, time },
			});
		});
	}

	return (
		<ChatContext.Provider
			value={{ chatInfo, actions: { receiveMsg, sendMsg } }}
		>
			{children}
		</ChatContext.Provider>
	);
};
