const User = require("../Model/userModel");
const {
  createUserService,
  setAvatarService,
  userLogin,
  allUsers,
} = require("../Service/user.service");
exports.createUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const userCreate = await createUserService(user);
    res.status(200).json({
      status: "Success",
      message: "User Created",
      data: userCreate,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Data not inserted",
      data: error.message,
    });
    next(error);
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
        message: "Avatar Image Updated",
      });
    } else {
      res.status(400).json({
        status: "Failed",
        message: "Avatar not Updated",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Avatar not Updated",
      data: error.message,
    });
    next(error);
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
        message: "Login Successful",
        userlogin,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Login failed",
      data: error.message,
    });
    next(error);
  }
};
exports.getAllusers = async (req, res, next) => {
  try {
    const allusers = await allUsers(req.params.id);
    if (allusers) {
      res.status(200).json({
        status: "Success",
        message: "User Data Fetched",
        data: allusers,
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      message: "Users not found",
      data: error.message,
    });
    next(error);
  }
};
//console.log("process.env.SECRET_KEY");
