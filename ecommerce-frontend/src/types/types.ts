export type User = {
    name: string;
    email: string;
    photo: string;
    gender: string;
    role: string;
    dob: string;
    _id: string;
};

export type Product = {
    name: string;
    price: number;
    stock: number;
    category: string;
    ratings: number;
    numOfReviews: number;
    description: string;
    photos: {
        url: string;
        public_id: string;
    }[];
    _id: string;
};

export type Review = {
    rating: number;
    comment: string;
    product: string;
    user: {
        name: string;
        photo: string;
        _id: string;
    };
    _id: string;
};

export type ShippingInfo = {
    address: string;
    city: string;
    municipality: string;
    country: string;
    postCode: string;
};

export type CartItem = {
    productId: string;
    photo: string;
    name: string;
    price: number;
    quantity: number;
    stock: number;
};

export type OrderItem = Omit<CartItem, 'stock'> & { _id: string };

export type Order = {
    orderItems: OrderItem[];
    shippingInfo: ShippingInfo;
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    status: string;
    user: {
        name: string;
        _id: string;
    };
    _id: string;
};