const User = require("../Model/userModel");
const {
  createUserService,
  setAvatarService,
  userLogin,
} = require("../Service/user.service");
exports.createUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const userCreate = await createUserService(user);
    res.status(200).json({
      status: "Success",
      message: "Data inserted",
      data: userCreate,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Data not inserted",
      data: error.message,
    });
  }
};
exports.setAvatar = async (req, res, next) => {
  try {
    const setAvatar = await setAvatarService(
      req.params.id,
      req.body.avatarImage
    );
    if (setAvatar) {
      res.status(200).json({
        isSet: true,
        image: setAvatar,
      });
    } else {
      res.status(400).json({
        status: "failed",
        message: "Avatar not Updated",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Avatar not Updated",
      data: error.message,
    });
  }
};
exports.loginUser = async (req, res, next) => {
  try {
    const userlogin = await userLogin(req.body);
    if (userlogin === false) {
      res.status(400).json({
        status: "Failed",
        message: "Login failed",
        data: "Invalid User or Password",
      });
    } else {
      res.status(200).json({
        status: true,
        userlogin,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Login failed",
      data: error.message,
    });
  }
};
