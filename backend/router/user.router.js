import express from 'express';
import {signUp,sendOtp, login, checkEmailExistsOrNot} from '../controller/user.controller.js';
const router = express.Router();
router.post('/signup',signUp);
router.post('/send-mail-otp',sendOtp);
router.post('/login',login);
router.get('/email-check/:email',checkEmailExistsOrNot);
export default router;