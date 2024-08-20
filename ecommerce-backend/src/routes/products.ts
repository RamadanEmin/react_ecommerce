import express from 'express';
import { getAllProducts, getlatestProducts, newProduct } from '../controllers/product.js';
import { adminOnly } from '../middlewares/auth.js';
import { mutliUpload } from '../middlewares/multer.js';

const app = express.Router();

app.post('/new', adminOnly, mutliUpload, newProduct);
app.get('/all', getAllProducts);
app.get("/latest", getlatestProducts);

export default app;