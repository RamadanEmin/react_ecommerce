import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { VscError } from 'react-icons/vsc';
import CartItem from '../components/cart-item';

const cartItems = [
    {
        productId: "13124sdad",
        photo: "https://cdn.ozone.bg/media/catalog/product/cache/1/image/400x498/a4e40ebdc3e371adff845072e1c73f37/l/a/ed5c71a52c7ecfaa4f01d07f5eb3d534/laptop-apple---macbook-air-15--153----m3-8-10--8gb-512gb--sin-30.jpg",
        name: "Macbook",
        price: 3000,
        quantity: 2,
        stock: 50
    }
];
const subtotal = 4000;
const tax = Math.round(subtotal * 0.20);
const shippingCharges = 200;
const discount = 300;
const total = subtotal + tax + shippingCharges;


const Cart = () => {
    const [couponCode, setCouponCode] = useState<string>('');
    const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (Math.random() > 0.5) {
                setIsValidCouponCode(true);
            } else {
                setIsValidCouponCode(false);
            }
        }, 1000);

        return () => {
            clearTimeout(timeOutId);
            setIsValidCouponCode(false);
        };
    }, [couponCode]);

    return (
        <div className="cart">
            <main>
                {cartItems.length > 0
                    ? (cartItems.map((i, idx) =>
                        <CartItem key={idx} cartItem={i} />)
                    ) : (
                        <h1>No Items Added</h1>
                    )
                }
            </main>
            <aside>
                <p>Subtotal: {subtotal}лв.</p>
                <p>Shipping Charges: {shippingCharges}лв.</p>
                <p>Tax: {tax}лв.</p>
                <p>
                    Discount: <em className="red"> - {discount}лв.</em>
                </p>
                <p>
                    <b>Total: {total}лв.</b>
                </p>

                <input
                    type="text"
                    placeholder="Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                />

                {couponCode &&
                    (isValidCouponCode ? (
                        <span className="green">
                            {discount}лв. off using the <code>{couponCode}</code>
                        </span>
                    ) : (
                        <span className="red">
                            Invalid Coupon <VscError />
                        </span>
                    ))}

                {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
            </aside>
        </div>
    );
}

export default Cart;