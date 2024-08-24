import express from 'express';
import { applyDiscount, newCoupon } from '../controllers/payment.js';
import { adminOnly } from '../middlewares/auth.js';

const app = express.Router();

app.post('/coupon/new', adminOnly, newCoupon);
app.get('/discount', applyDiscount);

export default app;