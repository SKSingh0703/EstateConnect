import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import mongoose from "mongoose";


const app=express();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to Database");
}).catch((err)=>{
    console.log(err);
});

app.listen(3000,()=>{
    console.log("Server is Listening on port 3000");
}); 