const supertest = require("supertest");
const app = require("..");
describe("User", () => {
  describe("Get a Single User", () => {
    it("It should return 404 for incorrect user id", async () => {
      const id = "6580bd7d6ee8c2d82f67899";
      const { statusCode } = await supertest(app).get(
        `/api/v1/user/allusers/${id}`
      );
      expect(statusCode).toBe(404);
    });
    it("It should return a user array", async () => {
      const id = "6580cd068ce31e44ea6c4427";
      const { statusCode } = await supertest(app).get(
        `/api/v1/user/allusers/${id}`
      );
      expect(statusCode).toBe(200);
    });
  }, 5000);
});
