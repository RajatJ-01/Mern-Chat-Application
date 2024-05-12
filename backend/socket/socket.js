import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

//overlap server for real time functionality
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5000"],
    methods: ["GET", "POST"],
  },
});

export const getReceiverId = (receiverId) => {
  return userListMap[receiverId];
};

const userListMap = {};

io.on("connect", (socket) => {
  console.log("user connected :", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId != "undefined") {
    userListMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userListMap));

  socket.on("disconnect", () => {
    console.log("user is diconnected", socket.id);
    delete userListMap[userId];
    io.emit("getOnlineUsers", Object.keys(userListMap));
  });
});

export { app, io, server };
