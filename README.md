# Simple-Chat app using socketIO

## Contents

- [Simple Chat @ssaquif]()
  - [Intro](#intro)

## Intro

> So what are Web Sockets?

WebSocket is a communication protocol that allows for persistent connections between clients and servers. In other words, it provides 2 way (full-duplex) communication channel. Both parties can send and receive data at any time until the connection is closed (usually when a user logs out). As opposed to a traditional HTTP connection which closes after the response is sent (think of the http get, post etc requests served by your express server).

> So what's socket.io?

Socket.io is a library that contains an API for using WebSockets. It has 2 parts.

1. A server side library for node.js
2. A client side library that runs in the browser

Think of it as a library that somewhat simplifies and adds convenience towards interacting with WebSockets.

## Code Break Down
