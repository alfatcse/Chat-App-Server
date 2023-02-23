const mongoose=require("mongoose");
const MessageSchema=mongoose.Schema({
    message:{
        text:{
            type:String,
            required:true
        }
    },
    users:Array,
    sender:{
        
    }
})