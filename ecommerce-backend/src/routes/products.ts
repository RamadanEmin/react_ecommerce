import express from 'express';
import { newProduct } from '../controllers/product.js';
import { adminOnly } from '../middlewares/auth.js';
import { mutliUpload } from '../middlewares/multer.js';

const app = express.Router();

app.post('/new', mutliUpload, newProduct);


export default app;