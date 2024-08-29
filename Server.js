const express = require("express");
const cors = require("cors");
const UserRoute = require("./Routes/user.route");
const MessageRoute = require("./Routes/message.route");
function createServerAPI() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  const port = 4000;
  app.get("/", (req, res) => {
    res.send(`Chat app Server is running at ${port} port`);
  });
  app.use("/api/v1/user", UserRoute);
  app.use("/api/v1/message", MessageRoute);
  return app;
}
module.exports = createServerAPI;
