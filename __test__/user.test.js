const supertest = require("supertest");
const createServer = require("../Server");
const app = createServer();
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const { createUserService } = require("../Service/user.service");
describe("User", () => {
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
        avatarImage: "qwer",
        isAvatarImageSet: true,
      };
      const { statusCode } = await supertest(app)
        .post(`/api/v1/user/register`)
        .send(user);
      expect(statusCode).toBe(200);
    });
    it("It should return 404 for incorrect user id", async () => {
      const { statusCode } = await supertest(app).get(
        `/api/v1/user/allusers/${"jnenfe"}`
      );
      console.log(statusCode);
      expect(statusCode).toBe(404);
    });
    it("It should return a user array", async () => {
      const id = "6580cd068ce31e44ea6c4427";
      const { statusCode, body } = await supertest(app).get(
        `/api/v1/user/allusers/${id}`
      );
      console.log("body", body);
      expect(statusCode).toBe(200);
    });
  }, 5000);
});
