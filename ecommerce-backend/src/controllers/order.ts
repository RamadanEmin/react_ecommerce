import { TryCatch } from '../middlewares/error.js';
import { Order } from '../models/order.js';
import { invalidateCache } from '../utils/features.js';
import ErrorHandler from '../utils/utility-class.js';

export const newOrder = TryCatch(
    async () => {
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

        if (!shippingInfo || !orderItems || !user || !subtotal || !tax || !total){
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