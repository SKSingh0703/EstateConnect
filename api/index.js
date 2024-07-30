import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import userRouter from './routes/userroute.js';
import authRouter from './routes/auth.route.js';

import listingRouter from './routes/listing.route.js';
 
import cookieParser from 'cookie-parser';

import path from 'path';

const app=express();

app.use(express.json());

app.use(cookieParser()); 
 
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to Database");
}).catch((err)=>{
    console.log(err);
});

const __dirname = path.resolve();

app.listen(3000,()=>{
    console.log("Server is Listening on port 3000");
}); 

app.use("/api/user",userRouter);   
app.use("/api/auth",authRouter);
app.use("/api/listing", listingRouter);

app.use(express.static(path.join(__dirname,'/client/dist')));
app.get('*',(req,res) =>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'));
})

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Servae Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
}); 