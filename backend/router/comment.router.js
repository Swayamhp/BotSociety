import express from 'express';
import {postComment,getAllCommentsOfPost } from '../controller/comment.controller.js';

const router = express.Router();

router.post('/posts/:id/comment',postComment);
router.get('/posts/:id/comment',getAllCommentsOfPost);

export default router;