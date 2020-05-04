import React, { Fragment, useState, useContext } from 'react';
import { ChatContext } from './ChatWindowContext';
import styled from 'styled-components';

const ChatWindowComponent = () => {
	const chatState = useContext(ChatContext);
	console.log(chatState);
	const [chatMsg, setChatMsg] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log('Event', chatMsg);
	};

	return (
		<Fragment>
			<ChatHeader>Chat Away</ChatHeader>
			<ChatBodyWrapper>
				<ChatSidebar>
					<ChatSideBarHeader>Chats</ChatSideBarHeader>
					<ChatGroup>Person/Group 1</ChatGroup>
					<ChatGroup>Person/Group 2</ChatGroup>
				</ChatSidebar>
				<ChatWindow>
					<ChatWindowHeader>Messages</ChatWindowHeader>
					<ChatMsgWrapper>
						<ChatMsgLeft>Msg 1 From Friend</ChatMsgLeft>
						<ChatMsgRight>Msg 2 From User</ChatMsgRight>
					</ChatMsgWrapper>
					<ChatNewMsgForm
						onSubmit={(event) => {
							handleSubmit(event);
						}}
					>
						<ChatInput
							type="text"
							id="chat-box"
							value={chatMsg}
							onChange={(event) => {
								setChatMsg(event.target.value);
							}}
						/>
						<ChatSubmitButton type="submit">Send</ChatSubmitButton>
					</ChatNewMsgForm>
				</ChatWindow>
			</ChatBodyWrapper>
		</Fragment>
	);
};

export default ChatWindowComponent;

//--------CSS----------//
const ChatHeader = styled.h3`
	text-align: center;
`;
const ChatBodyWrapper = styled.div`
	display: flex;
	padding: 30px;
	margin: 20px;
	border: 1px solid;
`;
const ChatSidebar = styled.div`
	flex: 1;
	border-right: 1px dashed;
`;
const ChatSideBarHeader = styled.h4`
	text-align: center;
`;
const ChatGroup = styled.div`
	margin-bottom: 20px;
`;
const ChatWindow = styled.div`
	flex: 4;
	padding-left: 20px;
`;
const ChatWindowHeader = styled.h4`
	text-align: center;
`;
const ChatMsgWrapper = styled.div`
	padding-bottom: 20px;
`;
const ChatMsgLeft = styled.div`
	text-align: left;
	margin-left: 40px;
	margin-bottom: 20px;
`;
const ChatMsgRight = styled.div`
	text-align: right;
	margin-right: 40px;
	margin-bottom: 20px;
`;

const ChatNewMsgForm = styled.form`
	display: flex;
`;

const ChatInput = styled.input`
	flex: 1;
	margin-right: 10px;
`;
const ChatSubmitButton = styled.button``;
