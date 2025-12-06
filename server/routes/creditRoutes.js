import express from 'express';
import { getPlans, purchasePlan } from '../controllers/credits.controller.js';
import { razorpayWebhook } from '../controllers/webhook.controller.js'
import { protect } from '../middlewares/auth.js';

const creditRouter = express.Router();

creditRouter.get('/plan', getPlans)
creditRouter.post('/purchase', protect, purchasePlan)
creditRouter.post('/razorpayWebhook', protect, razorpayWebhook)
export default creditRouter;