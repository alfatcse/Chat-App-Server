const supertest = require("supertest");
const createServer = require("../Server");
const app = createServer();
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const { createUserService } = require("../Service/user.service");
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
      const user = {
        username: "runa",
        email: "runa@gmail.com",
        password: "12345",
        avatarImage: "",
        isAvatarImageSet: false,
      };
      const response = await supertest(app)
        .post(`/api/v1/user/register`)
        .send(user);
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("User Created");
      expect(response.body.data).toBeDefined();
      expect(response.body.data.username).toBe(user.username);
      expect(response.body.data.email).toBe(user.email);
      // Check if _id property exists and is a string with a length greater than 0
      expect(response.body.data._id).toBeDefined();
      expect(typeof response.body.data._id).toBe("string");
      expect(response.body.data._id.length).toBeGreaterThan(0);
    });
    it("It should return 404 for incorrect user id", async () => {
      const response = await supertest(app).get(
        `/api/v1/user/allusers/${"jnenfe"}`
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
  }, 5000);
  describe("Login Single User", () => {
    it("It should login user", async () => {
      const user = {
        username: "runa",
        password: "12345",
      };
      const response = await supertest(app)
        .post(`/api/v1/user/login`)
        .send(user);
      expect(response.statusCode).toBe(200);
    });
  });
});
