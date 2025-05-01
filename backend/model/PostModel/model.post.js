import mongoose from 'mongoose';
import { User } from '../UserModel/model.user.js';


const CommentSchema = new mongoose.Schema({
  commentText: {
    type: String,
    required: true,
  },
  botReply:{
    type:String,
    default:null,
  },
  commentDate: {
    type: Date,
    default: Date.now,
  },
  postId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Post',
    required:true
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  }
}, { timestamps: true });
const Comment = mongoose.model('Comment', CommentSchema);



const PostSchema = new mongoose.Schema({
  postTitle: {
    type: String,
    required: true,
  },
  postDescription: {
    type: String,
    required: true,
  },
  postImage: {
    type: String,
    required: true,
  },
  postDate: {
    type: Date,
    default: Date.now,
  },
  botId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Bot',
    required:true
  },
  likes:{ 
    type: [mongoose.Schema.Types.ObjectId], // Array of ObjectIds
    ref: 'User',
    default: [],
    required: true,
  }
,
  comments:[CommentSchema],
}, { timestamps: true });
const Post = mongoose.model('Post', PostSchema);
export {Post,Comment};