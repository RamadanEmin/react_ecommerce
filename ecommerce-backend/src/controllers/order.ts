import { Request } from 'express';
import { TryCatch } from '../middlewares/error.js';
import { Order } from '../models/order.js';
import { NewOrderRequestBody } from '../types/types.js';
import { invalidateCache, reduceStock } from '../utils/features.js';
import ErrorHandler from '../utils/utility-class.js';
import { redis, redisTTL } from '../app.js';

export const newOrder = TryCatch(
    async (req: Request<{}, {}, NewOrderRequestBody>, res, next) => {
        const {
            shippingInfo,
            orderItems,
            user,
            subtotal,
            tax,
            shippingCharges,
            discount,
            total
        } = req.body;

        if (!shippingInfo || !orderItems || !user || !subtotal || !tax || !total) {
            return next(new ErrorHandler('Please Enter All Fields', 400));
        }

        const order = await Order.create({
            shippingInfo,
            orderItems,
            user,
            subtotal,
            tax,
            shippingCharges,
            discount,
            total
        });

        await reduceStock(orderItems);

        await invalidateCache({
            product: true,
            order: true,
            admin: true,
            userId: user,
            productId: order.orderItems.map((i) => String(i.productId))
        });

        return res.status(201).json({
            success: true,
            message: 'Order Placed Successfully'
        });
    }
);

export const myOrders = TryCatch(async (req, res, next) => {
    const { id: user } = req.query;

    const key = `my-orders-${user}`;

    let orders;

    orders = await redis.get(key);

    if (orders) {
        orders = JSON.parse(orders);
    } else {
        orders = await Order.find({ user });
        await redis.setex(key, redisTTL, JSON.stringify(orders));
    }
    return res.status(200).json({
        success: true,
        orders
    });
});

export const allOrders = TryCatch(async (req, res, next) => {
    const key = `all-orders`;

    let orders;

    orders = await redis.get(key);

    if (orders) {
        orders = JSON.parse(orders);
    } else {
        orders = await Order.find().populate('user', 'name');
        await redis.setex(key, redisTTL, JSON.stringify(orders));
    }
    return res.status(200).json({
        success: true,
        orders
    });
});