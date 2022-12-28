const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes=require('./routes/userRoutes')
const app=express();
require('dotenv').config();
app.use(cors());
app.use(express.json());
mongoose.set('strictQuery', true);
app.use('/api/auth',userRoutes);
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    
}).then(()=>{
    console.log('DB connection done')
}).catch((e)=>console.log(e))
const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is running ${process.env.PORT}`)
})
app.get('/',async(req,res)=>res.send('Chatting server is running'));