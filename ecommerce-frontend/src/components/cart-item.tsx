import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { transformImage } from '../utils/features';
import { CartItem } from '../types/types';

type CartItemProps = {
    cartItem: CartItem;
    incrementHandler: (cartItem: CartItem) => void;
    decrementHandler: (cartItem: CartItem) => void;
    removeHandler: (id: string) => void;
};

const CartItemComponent = ({ cartItem, incrementHandler, decrementHandler, removeHandler }: CartItemProps) => {
    const { photo, name, productId, price, quantity } = cartItem;

    return (
        <div className="cart-item">
            <img src={transformImage(photo)} alt={name} />
            <article>
                <Link to={`/product/${productId}`}>{name}</Link>
                <span>{price} лв.</span>
            </article>

            <div>
                <button onClick={() => decrementHandler(cartItem)}>-</button>
                <p>{quantity}</p>
                <button onClick={() => incrementHandler(cartItem)}>+</button>
            </div>

            <button onClick={() => removeHandler(productId)}>
                <FaTrash />
            </button>
        </div>
    );
}

export default CartItemComponent;