const User = require("../model/userModel");
const brcypt = require("bcrypt");

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://alfatjahan:TkeLn78oZoIYU5Gk@cluster0.icjdeya.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



module.exports.register = async (req, res, next) => {
   
  try {
    const User = client.db("ChatUser").collection("Users");
    const { username, email, password } = req.body;
    console.log(req.body);
    const usernameCheck = await User.insertOne({ username });
    // if (usernameCheck) {
    //   return res.json({ msg: "Username already used", status: false });
    // }
    // const emailCheck = await User.findOne({ email });
    // if (emailCheck) {
    //   return res.json({ msg: "Email already used", status: false });
    // }
    // const hashedPassword = await brcypt.hash(password, 10);
    // const user = await User.insertOne({
    //   email,
    //   username,
    //   password: hashedPassword,
    // });
    // delete user.password;
    // return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};
