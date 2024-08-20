import express from 'express';
import { connectDB } from './utils/features.js';
import { config } from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import userRoute from './routes/user.js';
import productRoute from './routes/products.js';

config({
    path: './.env',
});

const port = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI || '';

connectDB(mongoURI);

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();
app.use(express.json());

app.use('/api/v1/user', userRoute);
app.use('/api/v1/product', productRoute);

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`);
});