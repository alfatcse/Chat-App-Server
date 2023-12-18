const express = require("express");
const router = express.Router();
const userController = require("../Controller/user.controller");
router.route("/register").post(userController.createUser);
router.route("/login").post(userController.loginUser);
router.route("/setAvatar/:id").post(userController.setAvatar);
router.route("/allusers/:id").get(userController.getAllusers);
module.exports = router;
