const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
const UserRoute = require("./Routes/user.route");
const MessageRoute = require("./Routes/message.route");
function createServer() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  const port = 4000;
  app.get("/", (req, res) => {
    res.send(`Chat app is running at ${port} port`);
  });
  app.use("/api/v1/user", UserRoute);
  app.use("/api/v1/message", MessageRoute);
  const server = app.listen(port, () => {
    console.log(`Server is running ${port}`);
  });
  const io = socket(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", ""],
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
      console.log("send-msg", data);
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.message);
      }
    });
  });
  return app;
}
module.exports = createServer;
