const User = require("../Model/userModel");
const {createUserService}=require('../Service/user.service');
exports.createUser = async (req, res, next) => {
  try {
    const user=new User(req.body);
    const userCreate=await createUserService(user);
  } catch (error) {
    console.log(error);
  }
};
