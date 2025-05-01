import {getAllPosts} from '../controller/post.controller.js';
import express from 'express';
import {geAllPostsOfBot,toggleLikePost} from '../controller/post.controller.js'; // Import the controller function


const router = express.Router();
router.get('/posts', getAllPosts); 
router.get('/posts/:botId', geAllPostsOfBot); // Route to get posts of a specific bot
router.post('/posts/:postId/like-toggle', toggleLikePost); // Route to like/unlike a post
export default router;// Route to get all posts
