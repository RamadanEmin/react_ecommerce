import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import { OrderItem } from '../../../models/types';

const img =
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804';

const orderItems: OrderItem[] = [
    {
        name: 'Puma Shoes',
        photo: img,
        id: 'asdsaasdas',
        quantity: 4,
        price: 2000,
    },
];

const TransactionManagement = () => {
    const [order, setOrder] = useState({
        name: 'Puma Shoes',
        address: 'Tsanko Dustabanov 15',
        city: 'Plovdiv',
        municipality: 'Plovdiv',
        country: 'Bulgaria',
        postCode: 4000,
        status: 'Processing',
        subtotal: 290,
        discount: 50,
        shippingCharges: 0,
        tax: 10,
        total: 290 + 10 + 0 - 50,
        orderItems,
    });

    const {
        name,
        address,
        city,
        country,
        municipality,
        postCode,
        subtotal,
        shippingCharges,
        tax,
        discount,
        total,
        status,
    } = order;

    const updateHandler = (): void => {
        setOrder((prev) => ({
            ...prev,
            status: "Shipped",
        }));
    };

    return (
        <div className="admin-container">
            <AdminSidebar />
            <main className="product-management">
                <section
                    style={{
                        padding: "2rem",
                    }}
                >
                    <h2>Order Items</h2>

                    {orderItems.map((i) => (
                        <ProductCard
                            key={i._id}
                            name={i.name}
                            photo={`${server}/${i.photo}`}
                            productId={i.productId}
                            _id={i._id}
                            quantity={i.quantity}
                            price={i.price}
                        />
                    ))}
                </section>

                <article className="shipping-info-card">
                    <button className="product-delete-btn" onClick={deleteHandler}>
                        <FaTrash />
                    </button>
                    <h1>Order Info</h1>
                    <h5>User Info</h5>
                    <p>Name: {name}</p>
                    <p>
                        Address: {`${address}, ${city}, ${municipality}, ${country} ${postCode}`}
                    </p>
                    <h5>Amount Info</h5>
                    <p>Subtotal: {subtotal}</p>
                    <p>Shipping Charges: {shippingCharges}</p>
                    <p>Tax: {tax}</p>
                    <p>Discount: {discount}</p>
                    <p>Total: {total}</p>

                    <h5>Status Info</h5>
                    <p>
                        Status:{" "}
                        <span
                            className={
                                status === "Delivered"
                                    ? "purple"
                                    : status === "Shipped"
                                        ? "green"
                                        : "red"
                            }
                        >
                            {status}
                        </span>
                    </p>
                    <button className="shipping-btn" onClick={updateHandler}>
                        Process Status
                    </button>
                </article>
            </main>
        </div>
    );
};

const ProductCard = ({
    name,
    photo,
    price,
    quantity,
    productId,
}: OrderItem) => (
    <div className="transaction-product-card">
        <img src={photo} alt={name} />
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>
            ₹{price} X {quantity} = ₹{price * quantity}
        </span>
    </div>
);

export default TransactionManagement;
