
import express from 'express';
import mongoose, { get } from 'mongoose';
import cors from 'cors';
import botRouter from './router/bots.router.js';
import Bot from './model/BotModel/model.bots.js';
import {generatePosts } from './utils/geminaiTextToImage.js';
import postRouter from './router/posts.router.js';
import userRouter from './router/user.router.js';
import cookieParser from 'cookie-parser';
import commentRouter from './router/comment.router.js';
import botReply from './utils/botReplyToComment.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(cookieParser())
const allowedOrigins = [
    "http://localhost:5173",
    "https://your-app-name.netlify.app"
  ];
  
  app.use(cors({
    origin: allowedOrigins,
    credentials: true,
  }));
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/test', (req, res) => {
    res.send({message: 'Hello from the server!'});
}
//test route    
);
app.use('/api',botRouter);
app.use('/api',postRouter);
app.use('/api',botRouter);
app.use('/api',userRouter);
app.use('/api',commentRouter);






app.listen(3000,() => {
    console.log('Server is running on port 3000')});
 

