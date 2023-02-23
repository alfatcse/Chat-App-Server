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
app.options('*', cors());

app.get("/", (req, res) => {
  res.send(`Chat app is running at ${port} port`);
});
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
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
app.use('/api/v1/user',UserRoute);
app.use('/api/v1/message',MessageRoute);
// async function run() {
//   const ChatUser = client.db("Chat").collection("Chatuser");
//   const Meaasge = client.db("Chat").collection("Message");
//   try {
//     app.post("/register", async (req, res) => {
//       const { email, username, password } = req.body;
//       const usernameCheck = await ChatUser.findOne({ username });
//       if (usernameCheck) {
//         return res.json({ msg: "Username already used", status: false });
//       }
//       const emailCheck = await ChatUser.findOne({ email });
//       if (emailCheck) {
//         return res.json({ msg: "Email already used", status: false });
//       }
//       const hashedPassword = await brcypt.hash(password, 10);
//       const userInsert = await ChatUser.insertOne({
//         email,
//         username,
//         password: hashedPassword,
//         avatarImage: "",
//         isAvatarImageSet: false,
//       });
//       delete password;
//       //console.log(userInsert.insertedId.toString())
//       const userid=userInsert.insertedId.toString();
//       const user = {
//         email,
//         username,
//         password: hashedPassword,
//         isAvatarImageSet: false,
//         avatarImage: "",
//         _id: userid,
//       };
//     //  console.log(user);
//       return res.json({ status: true, user });
//     });
//     app.post("/login", async (req, res) => {
//      // console.log(req.body);
//       const { username, password } = req.body;
//       const user = await ChatUser.findOne({ username });
//       if (!user) {
//         return res.json({ msg: "Username  Invalid", status: false });
//       }
//       const isPasswordValid = await brcypt.compare(password, user.password);
//       if (!isPasswordValid) {
//         delete user.password;
//         return res.json({ msg: "Password Invalid", status: false });
//       }
//      // console.log(user);
//       return res.json({ status: true, user });
//     });
//     app.post("/setAvatar/:id", async (req, res) => {
//       const userId = req.params.id;
//       const avatarimage = req.body.image;
//       // console.log(userId, avatarimage);
//       const filter = { _id: ObjectId(userId) };
//       const updateDoc = {
//         $set: {
//           isAvatarImageSet: true,
//           avatarImage: avatarimage,
//         },
//       };
//       const options = { upsert: true };
//       const userData = await ChatUser.updateOne(filter, updateDoc, options);
//      // console.log(userData);
//       if (userData.modifiedCount === 1) {
//         return res.json({
//           isSet: true,
//           image: avatarimage,
//         });
//       } else {
//         return res.json({
//           isSet: false, 
//           image: "",
//         });
//       }
//     });
//     app.post("/addmsg", async (req, res) => {
//      // console.log("add", req.body);
//      // console.log(new Date());
//       const MsgData = {
//         message: { text: req.body.message },
//         users: [req.body.from, req.body.to],
//         sender: req.body.from,
//         createdAt: new Date(),
//       };
//       const data = await Meaasge.insertOne(MsgData);
//       if (data.acknowledged === true) {
//         res.send({ msg: "Message Added Successfully" });
//       } else {
//         res.send({ msg: "Failed to add message" });
//       }
//     });
//     app.post("/getallmessages", async (req, res) => {
//       const { from, to } = req.body;
//       const messages = await Meaasge.find({
//         users: {
//           $all: [from, to],
//         },
//       })
//         .sort({ createdAt: 1 })
//         .toArray();
//     //  console.log(messages);
//       const prjectMessage = [];
//       messages.map((msg) => {
//         const m = {
//           fromSelf: msg.sender === from,
//           message: msg.message.text,
//         };
//         prjectMessage.push(m);
//       });
//    //   console.log(prjectMessage);
//       res.send(prjectMessage);
//     });
//     app.get("/allusers/:id", async (req, res) => {
//       const id = req.params.id;
//     //  console.log(id);
//       const users = await ChatUser.find({
//         _id: { $ne: ObjectId(id) },
//       }).toArray();
//       const sendUser = [];
//       users.map((m) => {
//         const a = {
//           email: m.email,
//           _id: m._id,
//           username: m.username,
//           avatarimage: m?.avatarImage,
//         };
//         sendUser.push(a);
//       });
//       res.send(sendUser);
//     });
//   } finally {
//   }
// }
// run().catch((e) => console.log(e));
