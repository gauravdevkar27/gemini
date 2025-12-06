import express from 'express';
import { getPlans, purchasePlan, checkPaymentStatus } from '../controllers/credits.controller.js';
import { protect } from '../middlewares/auth.js';

const creditRouter = express.Router();

creditRouter.get('/plan', getPlans)
creditRouter.post('/purchase', protect, purchasePlan)
creditRouter.get('/status/:transactionId', protect, checkPaymentStatus);
export default creditRouter;