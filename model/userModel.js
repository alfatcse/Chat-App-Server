const mongoose = require("mongoose");
const validator=require("validator");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true,"Please Provide a name"],
    min: [3,"Name must be at least 3 Characters"],
    max: [20,"Name is must be lower than twenty Characters"],
    unique: [true,"Name must be Unique"],
    lowercase:true,
    trim:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
    lowercase:true,
    validate:[validator.isEmail,"Please provide a valid email"]
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Chatuser", userSchema, 'Chatuser');