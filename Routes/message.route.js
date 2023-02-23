const express=require('express');
const router=express.Router();
const messageController=require('../Controller/message.controller');
router.route('/addmsg').post(messageController.addMessage)
router.route('/getallmessages').post(messageController.getMessages)
module.exports=router