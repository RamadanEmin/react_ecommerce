import express from 'express';
import { getDashboardStats } from '../controllers/stats.js';
import { adminOnly } from '../middlewares/auth.js';

const app = express.Router();

app.get('/stats', adminOnly, getDashboardStats);

export default app;