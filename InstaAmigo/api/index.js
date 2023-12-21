const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors")
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const authRoute=require('./routes/auth');
const userRoute=require('./routes/user');
const postRoute=require('./routes/post');
const connectDB=async()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/InstaMigo');
        console.log('MongoDB connected');
    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
}


dotenv.config();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser())
app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);
app.use("/api/post",postRoute);



app.listen(4000,()=>{
    connectDB();
    console.log('Server running on port 4000');
});