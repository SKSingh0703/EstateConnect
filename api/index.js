import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import userRouter from './routes/userroute.js';
import authRouter from './routes/auth.route.js';
const app=express();

app.use(express.json());

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to Database");
}).catch((err)=>{
    console.log(err);
});

app.listen(3000,()=>{
    console.log("Server is Listening on port 3000");
}); 

app.use("/api/user",userRouter);   
app.use("/api/auth",authRouter);

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Servae Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
});