import React, { createContext, useReducer } from 'react';

export const ChatContext = createContext();

const initialState = {
	status: 'idle',
	error: null,
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
