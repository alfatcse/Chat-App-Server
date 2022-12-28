const express = require("express");
const cors = require("cors");
require("dotenv").config();
const brcypt = require("bcrypt");
const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");
const app = express();
app.use(cors());
app.use(express.json());
const port = 5009;
const http = require("http");
const { Server } = require("socket.io");
const { isObject } = require("util");
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.icjdeya.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
app.get("/", (req, res) => {
  res.send("hello");
});
async function run() {
  const ChatUser = client.db("Chat").collection("Chatuser");
  try {
    app.post("/register", async (req, res) => {
      const { email, username, password } = req.body;
      const usernameCheck = await ChatUser.findOne({ username });
      if (usernameCheck) {
        return res.json({ msg: "Username already used", status: false });
      }
      const emailCheck = await ChatUser.findOne({ email });
      if (emailCheck) {
        return res.json({ msg: "Email already used", status: false });
      }
      const hashedPassword = await brcypt.hash(password, 10);
      const userInsert = await ChatUser.insertOne({
        email,
        username,
        password: hashedPassword,
        avatarImage: "",
        isAvatarImageSet: false,
      });
      delete password;
      const user = {
        email,
        username,
        password: hashedPassword,
        isAvatarImageSet: false,
        avatarImage: "",
        _id: userInsert._id,
      };
      return res.json({ status: true, user });
    });
    app.post("/login", async (req, res) => {
      console.log(req.body);
      const { username, password } = req.body;
      const user = await ChatUser.findOne({ username });
      if (!user) {
        return res.json({ msg: "Username or Password Invalid", status: false });
      }
      const isPasswordValid = await brcypt.compare(password, user.password);
      if (!isPasswordValid) {
        delete user.password;
        return res.json({ msg: "Username or Password Invalid", status: false });
      }
      console.log(user);
      return res.json({ status: true, user });
    });
    app.post("/setAvatar/:id", async (req, res) => {
      const userId = req.params.id;
      const avatarimage = req.body.image;
      // console.log(userId, avatarimage);
      const filter = { _id: ObjectId(userId) };
      const updateDoc = {
        $set: {
          isAvatarImageSet: true,
          avatarImage: avatarimage,
        },
      };
      const options = { upsert: true };
      const userData = await ChatUser.updateOne(filter, updateDoc, options);
      console.log(userData);
      if (userData.modifiedCount === 1) {
        return res.json({
          isSet: true,
          image: avatarimage,
        });
      } else {
        return res.json({
          isSet: false,
          image: "",
        });
      }
    });
    app.get("/allusers/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const users=await ChatUser.find({_id:{$ne:ObjectId(id) }}).toArray();
      const sendUser=[];
      users.map(m=>{
        
        const a={
          email:m.email,
          _id:m._id,
          username:m.username,
          avatarimage:m?.avatarImage
        }
        sendUser.push(a);
       
      })
      console.log(sendUser);
      res.send(sendUser);
    });
  } finally {
  }
}
run().catch((e) => console.log(e));
app.listen(port, () => {
  console.log(`Serveddr is runningf ${port}`);
});
