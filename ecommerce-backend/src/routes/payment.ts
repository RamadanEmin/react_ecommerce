import express from 'express';
import { allCoupons, applyDiscount, getCoupon, newCoupon } from '../controllers/payment.js';
import { adminOnly } from '../middlewares/auth.js';

const app = express.Router();

app.post('/coupon/new', adminOnly, newCoupon);
app.get('/discount', applyDiscount);
app.get('/coupon/all', adminOnly, allCoupons);
app.get('/coupon/:id', getCoupon);

export default app;