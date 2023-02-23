const User = require("../Model/userModel");
const {createUserService,setAvatarService}=require('../Service/user.service');
exports.createUser = async (req, res, next) => {
  try {
    const user=new User(req.body);
    const userCreate=await createUserService(user);
    res.status(200).json({
      status:"Success",
      message:"Data inserted",
      data:userCreate
    })
  } catch (error) {
    res.status(400).json({
      status:"Failed",
      message:"Data not inserted",
      data:error.message
    })
    console.log(error); 
  }
};
exports.setAvatar=async (req,res,next)=>{
  try{
    const setAvatar=await setAvatarService(req.params.id);
  }catch(error){
    console.log(error);
  }
}
