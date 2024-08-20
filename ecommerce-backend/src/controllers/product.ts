import { Request } from 'express';
import { TryCatch } from '../middlewares/error.js';
import { redis, redisTTL } from '../app.js';
import { Product } from '../models/product.js';
import {
    BaseQuery,
    NewProductRequestBody, SearchRequestQuery,
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

export const getlatestProducts = TryCatch(async (req, res, next) => {
    let products;

    products = await redis.get('latest-products');

    if (products) {
        products = JSON.parse(products);
    }else {
        products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
        await redis.setex('latest-products', redisTTL, JSON.stringify(products));
    }

    return res.status(200).json({
        success: true,
        products,
    });
});

export const getAllProducts = TryCatch(
    async (req: Request<{}, {}, {}, SearchRequestQuery>, res, next) => {
        const { search, sort, category, price } = req.query;

        const page = Number(req.query.page) || 1;

        const key = `products-${search}-${sort}-${category}-${price}-${page}`;

        let products;
        let totalPage;

        const cachedData = await redis.get(key);
        if (cachedData) {
            const data = JSON.parse(cachedData);
            totalPage = data.totalPage;
            products = data.products;
        } else {
            const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
            const skip = (page - 1) * limit;

            const baseQuery: BaseQuery = {};

            if (search)
                baseQuery.name = {
                    $regex: search,
                    $options: "i",
                };

            if (price)
                baseQuery.price = {
                    $lte: Number(price),
                };

            if (category){
                baseQuery.category = category;
            }

            const productsPromise = Product.find(baseQuery)
                .sort(sort && { price: sort === "asc" ? 1 : -1 })
                .limit(limit)
                .skip(skip);

            const [productsFetched, filteredOnlyProduct] = await Promise.all([
                productsPromise,
                Product.find(baseQuery),
            ]);

            products = productsFetched;
            totalPage = Math.ceil(filteredOnlyProduct.length / limit);

            await redis.setex(key, 30, JSON.stringify({ products, totalPage }));
        }

        return res.status(200).json({
            success: true,
            products,
            totalPage,
        });
    }
);
