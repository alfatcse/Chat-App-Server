const supertest = require("supertest");
const createServerAPI = require("../Server");
const app = createServerAPI();
const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
let User_Id = "";
let User_Id1 = "";
describe("API Route:", () => {
  beforeAll(async () => {
    const mongoDBMemoryServer = await MongoMemoryServer.create();
    const uri = mongoDBMemoryServer.getUri();
    await mongoose.connect(uri);
  });
  // Destroy mock server after test
  afterAll(async () => {
    await mongoose.disconnect();
  });
  describe("Get a Single User", () => {
    it("It should create a user", async () => {
      const user1 = {
        username: "user1",
        email: "user1@gmail.com",
        password: "12345",
        avatarImage: "",
        isAvatarImageSet: false,
      };
      const user2 = {
        username: "user2",
        email: "user2@gmail.com",
        password: "12345",
        avatarImage: "",
        isAvatarImageSet: false,
      };
      const response = await supertest(app)
        .post(`/api/v1/user/register`)
        .send(user1);
      const response1 = await supertest(app)
        .post(`/api/v1/user/register`)
        .send(user2);
      User_Id = response.body.data._id;
      User_Id1 = response1.body.data._id;
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("User Created");
      expect(response.body.data).toBeDefined();
      expect(response.body.data.username).toBe(user1.username);
      expect(response.body.data.email).toBe(user1.email);
      expect(response.body.data._id).toBeDefined();
      expect(typeof response.body.data._id).toBe("string");
      expect(response.body.data._id.length).toBeGreaterThan(0);
    });
    it("It should return 404 for incorrect user id", async () => {
      const response = await supertest(app).get(
        `/api/v1/user/allusers/${"6580cd068ce31e44ea6p442t"}`
      );
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe("Users not found");
    });
    it("It should return a user array", async () => {
      const id = "6580cd068ce31e44ea6c4427";
      const response = await supertest(app).get(`/api/v1/user/allusers/${id}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBeDefined();
      // Check if response data is an array
      expect(response.body.data).toBeInstanceOf(Array);
      // Check if the array contains at least one element
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });
  describe("Login Single User", () => {
    it("It should login user", async () => {
      const user = {
        username: "user1",
        password: "12345",
      };
      const response = await supertest(app)
        .post(`/api/v1/user/login`)
        .send(user);
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("Login Successful");
      expect(response.body.userlogin.username).toBe(user.username);
    });
    it("It should fail to login due to wrong pass", async () => {
      const user = {
        username: "runa",
        password: "123456",
      };
      const response = await supertest(app)
        .post(`/api/v1/user/login`)
        .send(user);
      expect(response.statusCode).toBe(400);
    });
    it("It should fail to login due to wrong user id", async () => {
      const user = {
        username: "run",
        password: "12345",
      };
      const response = await supertest(app)
        .post(`/api/v1/user/login`)
        .send(user);
      expect(response.statusCode).toBe(400);
    });
  });
  describe("Set Avater", () => {
    it("It should set an avater image", async () => {
      const id = User_Id;
      const response = await supertest(app)
        .post(`/api/v1/user/setAvatar/${id}`)
        .send({
          avatarImage: "avater_Image",
        });
      expect(response.statusCode).toBe(200);
      expect(response.body.isSet).toBe(true);
    });
  });
  describe("Message Api test:", () => {
    it("Insert message:", async () => {
      const message = {
        message: "hi",
        to: User_Id,
        from: User_Id1,
      };
      const response = await supertest(app)
        .post("/api/v1/message/addmsg")
        .send(message);
      expect(response.statusCode).toBe(200);
    });
  });
});
describe("Socket Functionality test:", () => {
  let io, serverSocket, clientSocket;
  beforeAll((done) => {
    const server = createServer(createServerAPI());
    io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      serverSocket = socket;
      // Ensure global.onlineUsers is initialized as a Map
      global.onlineUsers = new Map();
      socket.on("add-user", (userId) => {
        global.onlineUsers.set(userId, socket.id);
      });
      socket.on("send-msg", (data) => {
        const sendUserSocket = global.onlineUsers.get(data.to);
        if (sendUserSocket) {
          io.to(sendUserSocket).emit("msg-recieve", data.message);
        }
      });
    });

    server.listen(() => {
      const port = server.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      clientSocket.on("connect", done);
    });
  });

  // Close sockets and server after tests
  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  // Test adding a user
  it("should add a user", (done) => {
    clientSocket.emit("add-user", User_Id);
    // Add assertions to check if the user was added
    // For example:
    setTimeout(() => {
      expect(global.onlineUsers.has(User_Id)).toBe(true);
      done();
    }, 5);
  });
  // Test sending a message
  it("should send a message from User_Id1 to User_Id", (done) => {
    const message = {
      message: "Hello from User_Id1",
      to: User_Id,
      from: User_Id1,
    };
    clientSocket.emit("send-msg", message);
    // Listen for the 'msg-recieve' event on User_Id's socket
    serverSocket.on("send-msg", (receivedMessage) => {
      // Ensure the message is received by User_Id
      const sendUserSocket = onlineUsers.get(receivedMessage.to);
      if (sendUserSocket) {
        serverSocket
          .to(sendUserSocket)
          .emit("receive-msg", receivedMessage.message);
        done();
      }
    });
  });
});
