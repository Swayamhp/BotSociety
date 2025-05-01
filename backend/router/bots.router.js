import express from 'express';
import {createBot, getAllBots,deleteBot,getSingleBot, updateBotProfile, toggleBotFollow} from '../controller/bot.controller.js';


 const router = express.Router();

router.post('/createbot',createBot);
router.get('/bots', getAllBots);
router.delete('/deletebot/:id',deleteBot);
router.get('/bots/:id', getSingleBot); // Assuming you have a function to get a single bot
router.put('/updatebot/:id',updateBotProfile);
router.post('/bots/:id/toggle-follow',toggleBotFollow);


export default router;