import React, { Fragment, useState, useContext } from 'react';
import { ChatContext } from './ChatWindowContext';
import styled from 'styled-components';

const ChatWindowComponent = () => {
	const {
		chatInfo,
		actions: { receiveMsg, sendMsg },
	} = useContext(ChatContext);
	//console.log(chatInfo);

	const chatGroups = Object.values(chatInfo.groups);

	const [chatMsg, setChatMsg] = useState('');

	const [selectedGroup, setSelectedGroup] = useState(chatGroups[0].groupId);
	//console.log(selectedGroup);

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
					{chatGroups.map((group) => {
						return (
							<ChatGroup
								key={group.groupId}
								onClick={() => {
									setSelectedGroup(group.groupId);
								}}
							>
								{group.groupName}
							</ChatGroup>
						);
					})}
				</ChatSidebar>
				<ChatWindow>
					<ChatWindowHeader>Messages</ChatWindowHeader>
					<ChatMsgWrapper>
						{chatInfo.groups[selectedGroup].messages.map((message) => {
							if (message.sender === 'currentUser') {
								return (
									<ChatMsgRight key={message.msgId}>{message.msg}</ChatMsgRight>
								);
							} else {
								return (
									<ChatMsgLeft key={message.msgId}>{message.msg}</ChatMsgLeft>
								);
							}
						})}
					</ChatMsgWrapper>
					<ChatNewMsgForm
						onSubmit={(event) => {
							handleSubmit(event);
						}}
					>
						<ChatInput
							rows="2"
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
	padding: 10px 30px 30px 30px;
	margin: 20px;
	border: 1px solid #32a852;
`;
const ChatSidebar = styled.div`
	flex: 1;
	border-right: 1px dashed #32a852;
	padding-right: 20px;
	/*For children*/
	display: flex;
	flex-direction: column;
`;
const ChatSideBarHeader = styled.h4`
	text-align: center;
	border-bottom: 1px solid #32a852;
	padding-bottom: 20px;
`;
const ChatGroup = styled.button`
	flex: 1;
	margin-bottom: 20px;
	background-color: #32a852;
	color: white;
	border: none;
`;
const ChatWindow = styled.div`
	flex: 4;
	padding-left: 20px;
`;
const ChatWindowHeader = styled.h4`
	text-align: center;
	border-bottom: 1px solid #32a852;
	padding-bottom: 20px;
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

const ChatInput = styled.textarea`
	flex: 9;
	color: #32a852;
	margin-right: 10px;
	border: 2px solid #32a852;
`;
const ChatSubmitButton = styled.button`
	flex: 1;
	background-color: #32a852;
	color: white;
	border: none;
	margin: 5px 10px 5px 20px;
`;
