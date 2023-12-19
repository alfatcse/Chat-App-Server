const User = require("../Model/userModel");
const passwordDecrypt = require("bcrypt");
exports.createUserService = async (data) => {
  const { email, username, password } = data;
  const hashedPassword = await passwordDecrypt.hash(password, 10);
  delete password;
  const userInsert = {
    email,
    username,
    password: hashedPassword,
    avatarImage: "",
    isAvatarImageSet: false,
  };
  const user = await User.create(userInsert);

  return user;
};
exports.setAvatarService = async (id, avatarimage) => {
  console.log(id, avatarimage);
  const avatarSet = await User.updateOne(
    { _id: id },
    { avatarImage: avatarimage, isAvatarImageSet: true },
    {
      returnOriginal: false,
    }
  );
  console.log(avatarSet);
  if (avatarSet.modifiedCount === 1) {
    return avatarimage;
  }
};
exports.userLogin = async (data) => {
  console.log(data);
  const { username, password } = data;
  const user = await User.findOne({ username });
  if (!user) {
    return false;
  } else {
    const isPasswordValid = await passwordDecrypt.compare(
      password,
      user.password
    );
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      delete user.password;
      return false;
    } else {
      return user;
    }
  }
};
exports.allUsers = async (data) => {
  const users = await User.find({ _id: { $ne: data } }).select([
    "email",
    "username",
    "avatarImage",
    "_id",
  ]);

  if (users) {
    return users;
  }
};
