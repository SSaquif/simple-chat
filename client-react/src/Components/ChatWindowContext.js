import React, { createContext, useReducer, useEffect } from "react";
import io from "socket.io-client";

export const ChatContext = createContext();

const initialState = {
  connectionStatus: "disconnected",
  error: null,
  groups: {
    g1: {
      groupName: "Group 1",
      groupId: "g1",
      messages: [
        {
          sender: "friend1",
          timestamp: "01/05/2020 11:00pm",
          msg: "Sup.......?",
          msgId: "m-1",
        },
        {
          sender: "currentUser",
          timestamp: "01/05/2020 11.05pm",
          msg: "Blah Blah!!",
          msgId: "m-2",
        },
      ],
    },

    g2: {
      groupName: "Group 2",
      groupId: "g2",
      messages: [
        {
          sender: "friend2",
          timestamp: "01/05/2020 11:30pm",
          msg: "Hello",
          msgId: "m-1",
        },
        {
          sender: "currentUser",
          timestamp: "01/05/2020 11.35pm",
          msg: "World??",
          msgId: "m-2",
        },
      ],
    },
  },
};

const ChatReducer = (state, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "connected":
      newState.connectionStatus = action.payload.status;
      break;

    case "disconnected":
      newState.connectionStatus = action.payload.status;
      break;

    case "receive-msg":
      const msgIndex =
        newState.groups[action.payload.groupId].messages.length + 1;
      const newMsg = {
        sender: action.payload.sender,
        timestamp: action.payload.time,
        msg: action.payload.msg,
        msgId: "m-" + msgIndex,
      };
      newState.groups[action.payload.groupId].messages.push(newMsg);
      break;

    default:
      break;
  }
  return newState;
};

export const ChatContextProvider = ({ children }) => {
  const socket = io("localhost:8080");

  const sendMsg = (groupId, sender, msg, time) => {
    console.log(groupId, sender, msg, time);
    socket.emit("sender-chat-message", { groupId, sender, msg, time });
  };

  const [chatInfo, dispatch] = useReducer(ChatReducer, initialState);

  useEffect(() => {
    try {
      socket.on("connection-message", ({ status }) => {
        dispatch({ type: "connected", payload: { status } });
      });

      socket.on("disconnect", () => {
        dispatch({ type: "disconnected", payload: { status: "disconnected" } });
        throw new Error("Server Got Disconnected");
      });

      socket.on("receiver-chat-message", ({ groupId, sender, msg, time }) => {
        dispatch({
          type: "receive-msg",
          payload: { groupId, sender, msg, time },
        });
      });
    } catch (err) {
      console.log(err.message);
    }

    return () => {
      socket.off("connection-message");
      socket.off("disconnect");
      socket.off("receiver-chat-message");
      socket.close(); //Only this should be enough I beleive
    };
  }, []);

  return (
    <ChatContext.Provider value={{ chatInfo, actions: { sendMsg } }}>
      {children}
    </ChatContext.Provider>
  );
};
