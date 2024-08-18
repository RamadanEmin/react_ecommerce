import express from 'express';
import { connectDB } from './utils/features.js';
import { config } from 'dotenv';

config({
    path: './.env',
});

const port = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI || '';

connectDB(mongoURI);

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API Working with /api/v1');
})

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`);
});