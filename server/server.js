const http = require("http");
const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const morgan = require("morgan");

const PORT = 8080;

//-----to server files from ../client folder instead of react------//
// const staticPath = path.join(`${__dirname}`, '..', 'client');
// console.log(staticPath);
//-----------------------------------------------------------------//

const app = express();
const server = http.createServer(app); //adding express listener to server
const io = socketIO(server); //adding socketIO listener to Server

//middle wares
app.use(morgan("dev"));

//app.use(express.static(staticPath)); //to use ../client instead of react

io.on("connection", (socket) => {
  console.log("Someone Connected on socket", socket.id);

  socket.emit("connection-message", { status: "connected" });

  socket.on("sender-chat-message", ({ groupId, sender, msg, time }) => {
    console.log("msgDetails", groupId, sender, msg, time);
    io.emit("receiver-chat-message", {
      groupId,
      sender,
      msg,
      time,
    });
  });
});

server.on("error", (error) => {
  console.log("Server Error", error);
});

server.listen(PORT, () => {
  console.log("Listening To Port::" + server.address().port);
});
