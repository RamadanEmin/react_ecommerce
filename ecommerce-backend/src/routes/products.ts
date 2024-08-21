import express from 'express';
import {
    getAdminProducts,
    getAllCategories,
    getAllProducts,
    getlatestProducts,
    getSingleProduct,
    newProduct,
    updateProduct
} from '../controllers/product.js';
import { adminOnly } from '../middlewares/auth.js';
import { mutliUpload } from '../middlewares/multer.js';

const app = express.Router();

app.post('/new', adminOnly, mutliUpload, newProduct);
app.get('/all', getAllProducts);
app.get('/latest', getlatestProducts);
app.get('/categories', getAllCategories);
app.get('/admin-products', adminOnly, getAdminProducts);
app
    .route('/:id')
    .get(getSingleProduct)
    .put(adminOnly, mutliUpload, updateProduct);

export default app;