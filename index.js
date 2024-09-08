const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
const swaggerui = require("swagger-ui-express");
require("dotenv").config();
const DBconnect = require("./Utils/DBConnect");
const UserRoute = require("./Routes/user.route");
const MessageRoute = require("./Routes/message.route");
const specs=require("./Utils/Swagger");
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;
app.options(cors());
app.get("/", (req, res) => {
  res.send(`Chat App Server is running at Port: ${port} `);
});
app.use("/api-docs", swaggerui.serve, swaggerui.setup(specs));
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
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
module.exports = app;
