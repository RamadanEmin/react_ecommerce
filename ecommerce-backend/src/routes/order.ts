import express from 'express';
import { allOrders, getSingleOrder, myOrders, newOrder } from '../controllers/order.js';
import { adminOnly } from '../middlewares/auth.js';

const app = express.Router();

app.post('/new', newOrder);
app.get('/my', myOrders);
app.get('/all', adminOnly, allOrders);
app.route('/:id').get(getSingleOrder);

export default app;