import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

type CartItemProps = {
    cartItem: any;
};

const CartItem = ({ cartItem }: CartItemProps) => {
    const { photo, name, productId, price, quantity } = cartItem;

    return (
        <div className="cart-item">
            <img src={photo} alt={name} />
            <article>
                <Link to={`/product/${productId}`}>{name}</Link>
                <span>{price}лв.</span>
            </article>

            <div>
                <button>-</button>
                <p>{quantity}</p>
                <button>+</button>
            </div>

            <button>
                <FaTrash />
            </button>
        </div>
    );
}

export default CartItem;