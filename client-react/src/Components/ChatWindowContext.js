import React, { createContext, useReducer } from 'react';
import io from 'socket.io-client';

export const ChatContext = createContext();

//We first initialize the socket, outside the functional component
//So it doesn't get re-rendered every single time the context changes
let socket;

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
		case 'send-msg':
		default:
			return newState;
	}
};

export const ChatContextProvider = ({ children }) => {
	const [chatInfo, dispatch] = useReducer(ChatReducer, initialState);

	const connectionEstablished = (status) => {
		dispatch({ type: 'connected', payload: { status } });
	};

	const connectionEnded = () => {
		dispatch({ type: 'disconnected', payload: { status: 'disconnected' } });
	};

	const receiveMsg = (msg, sender) => {
		dispatch({ type: 'receive-msg', payload: { msg: msg, sender: sender } });
	};

	const sendMsg = (msg, sender) => {
		dispatch({ type: 'send-msg', payload: { msg: msg, sender: sender } });
	};

	if (!socket) {
		socket = io('http://localhost:8080');
	}

	socket.on('connection-message', ({ status }) => {
		console.log(status);
		connectionEstablished(status);
	});
	socket.on('disconnect', () => {
		connectionEnded();
	});

	return (
		<ChatContext.Provider
			value={{ chatInfo, actions: { receiveMsg, sendMsg } }}
		>
			{children}
		</ChatContext.Provider>
	);
};
