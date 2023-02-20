const express=require('express');
const router=express.Router();
const userController=require('../Controller/user.controller');
router.route('/register').post(userController.createUser)
module.exports=router