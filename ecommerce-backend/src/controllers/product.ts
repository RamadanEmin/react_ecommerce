import { Request } from 'express';
import { TryCatch } from '../middlewares/error.js';
import { Product } from '../models/product.js';
import {
    NewProductRequestBody,
} from '../types/types.js';
import { uploadToCloudinary, } from '../utils/features.js';
import ErrorHandler from '../utils/utility-class.js';


export const newProduct = TryCatch(
    async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
        const { name, price, stock, category, description } = req.body;
        const photos = req.files as Express.Multer.File[] | undefined;

        if (!photos) {
            return next(new ErrorHandler('Please add Photo', 400));
        }

        if (photos.length < 1) {
            return next(new ErrorHandler('Please add atleast one Photo', 400));
        }

        if (photos.length > 5) {
            return next(new ErrorHandler('You can only upload 5 Photos', 400));
        }

        if (!name || !price || !stock || !category || !description) {
            return next(new ErrorHandler('Please enter All Fields', 400));
        }

        const photosURL = await uploadToCloudinary(photos);

        await Product.create({
            name,
            price,
            description,
            stock,
            category: category.toLowerCase(),
            photos: photosURL
        });

        return res.status(201).json({
            success: true,
            message: 'Product Created Successfully'
        });
    }
);
