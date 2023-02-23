const User = require("../Model/userModel");
const passwordDecript = require("bcrypt");
exports.createUserService=async(data)=>{
    const { email, username, password }=data;
    const hashedPassword = await passwordDecript.hash(password, 10);
    delete password;
    const userInsert={
        email,
         username,
         password: hashedPassword,
         avatarImage: "", 
         isAvatarImageSet: false,
    }
    const user=await User.create(userInsert);
    console.log(user);
    return user;
}
exports.setAvatarService=async (data)=>{
    console.log(data);
}