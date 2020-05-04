import React, { createContext, useReducer } from 'react';

export const ChatContext = createContext();

const initialState = {
	status: 'idle',
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
		case 'receive-msg':
			break;
		case 'send-msg':
			break;
		default:
			return newState;
	}
};

export const ChatContextProvider = ({ children }) => {
	const [chatInfo, dispatch] = useReducer(ChatReducer, initialState);

	const receiveMsg = (msg, sender) => {
		dispatch({ type: 'receive-msg', payload: { msg: msg, sender: sender } });
	};

	const sendMsg = (msg, sender) => {
		dispatch({ type: 'send-msg', payload: { msg: msg, sender: sender } });
	};

	return (
		<ChatContext.Provider
			value={{ chatInfo, actions: { receiveMsg, sendMsg } }}
		>
			{children}
		</ChatContext.Provider>
	);
};
