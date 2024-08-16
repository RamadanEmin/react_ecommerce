import { Link } from "react-router-dom";
import ProductCard from "../components/product-card";

const Home = () => {
    const addToCartHandler = () => {

    };

    return (
        <div className="home">
            <section></section>
            <h1>Latest Products
                <Link to="/search" className="findmore">
                    More
                </Link>
            </h1>

            <main>
                <ProductCard
                    productId="13124sdad"
                    name="Macbook"
                    price={3000}
                    stock={50}
                    handler={addToCartHandler}
                    photo="https://laptop.bg/system/images/268159/normal/apple_macbook_air_133_m1_november_2020_mgn93zea.jpg"
                />
            </main>
        </div>
    );
}

export default Home;