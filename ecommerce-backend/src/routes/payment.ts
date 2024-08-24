import express from 'express';
import { newCoupon } from '../controllers/payment.js';
import { adminOnly } from '../middlewares/auth.js';

const app = express.Router();

app.post('/coupon/new', adminOnly, newCoupon);

export default app;