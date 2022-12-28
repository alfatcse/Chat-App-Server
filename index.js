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
      const user = await ChatUser.insertOne({
        email,
        username,
        password: hashedPassword,
      });
      delete user.password;
      return res.json({ status: true, user });
    });
  } finally {
  }
}
run().catch((e) => console.log(e));
app.listen(port, () => {
  console.log(`Serveddr is runningf ${port}`);
});
