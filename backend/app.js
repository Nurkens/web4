import express from 'express';

import taskRouter from './routes/taskRoutes.js';
import userRouter from './routes/userRoutes.js';
import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use('/users',userRouter);
app.use('/tasks',taskRouter);


const PORT = process.env.PORT || 5000;

 const startApp = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("mongo is connected");
        app.listen(PORT,()=>{
            console.log(`server started on port ${PORT}`);
        })
    
    }catch(e){
        console.log(e);
    }
    
}

startApp();

