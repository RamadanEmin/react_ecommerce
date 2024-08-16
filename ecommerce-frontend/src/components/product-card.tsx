import { Link } from 'react-router-dom';
import { FaExpandAlt, FaPlus } from 'react-icons/fa';

type ProductsProps = {
    productId: string;
    photo: string;
    name: string;
    price: number;
    stock: number;
    handler: () => void;
};

const server = 'dsadksadkla';

const ProductCard = ({ productId, price, name, photo, stock, handler }: ProductsProps) => {
    return (
        <div className="product-card">
            <img src={photo} alt={name} />
            <p>{name}</p>
            <span>{price}лв.</span>

            <div>
                <button
                    onClick={() =>
                        handler()
                    }
                >
                    <FaPlus />
                </button>

                <Link to={`/product/${productId}`}>
                    <FaExpandAlt />
                </Link>
            </div>
        </div>
    );
}

export default ProductCard;