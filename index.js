const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
require("dotenv").config();
const brcypt = require("bcrypt");
const DBconnect=require("./Utils/DBConnect");
const UserRoute=require('./Routes/user.route');
const MessageRoute=require('./Routes/message.route');
const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");
const app = express();
app.use(cors());
app.use(express.json());
const port = 4000;
const http = require("http");
const { Server } = require("socket.io");
const { isObject } = require("util");
const httpServer = http.createServer(app);
app.options(cors());
app.get("/", (req, res) => {
  res.send(`Chat app is running at ${port} port`);
});
app.use('/api/v1/user',UserRoute);
app.use('/api/v1/message',MessageRoute);
const server = app.listen(port, () => {
  console.log(`Server is running ${port}`);
});
const io = socket(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST",""],
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  socket.on("send-msg", (data) => {
    console.log('send-msg',data);
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});


