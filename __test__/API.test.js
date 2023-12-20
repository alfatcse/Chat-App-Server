const supertest = require("supertest");
const createServer = require("../Server");
const app = createServer();
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
let User_Id = "";
let User_Id1 = "";
describe("User Route:", () => {
  beforeAll(async () => {
    const mongoDBMemoryServer = await MongoMemoryServer.create();
    const uri = mongoDBMemoryServer.getUri();
    await mongoose.connect(uri);
  });
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
      console.log(User_Id, "UUUUU", User_Id1);
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("User Created");
      expect(response.body.data).toBeDefined();
      expect(response.body.data.username).toBe(user1.username);
      expect(response.body.data.email).toBe(user1.email);
      // Check if _id property exists and is a string with a length greater than 0
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
      console.log(response.body);
      expect(response.statusCode).toBe(200);
    });
  });
});
