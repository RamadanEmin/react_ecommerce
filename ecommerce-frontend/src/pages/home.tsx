import { Link } from "react-router-dom";
import ProductCard from "../components/product-card";
import image1 from '../assets/images/image1.png';
import image2 from '../assets/images/image2.png';
import image3 from '../assets/images/image3.png';
import image4 from '../assets/images/image4.png';
import { ImageSlider } from '../components/imageSlider';

const IMAGES = [
    { url: image1, alt: 'Image One' },
    { url: image2, alt: 'Image Two' },
    { url: image3, alt: 'Image Three' },
    { url: image4, alt: 'Image Four' }
];

const Home = () => {
    const addToCartHandler = () => {

    };

    return (
        <div className="home">

            <div style={{
                maxWidth: '1200px',
                width: '100%',
                height: '500px',
                aspectRatio: '1 / 2',
                margin: '0 auto'
            }}>
                <ImageSlider images={IMAGES} />
            </div>

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
                    photo="https://cdn.ozone.bg/media/catalog/product/cache/1/image/400x498/a4e40ebdc3e371adff845072e1c73f37/l/a/ed5c71a52c7ecfaa4f01d07f5eb3d534/laptop-apple---macbook-air-15--153----m3-8-10--8gb-512gb--sin-30.jpg"
                />
            </main>
        </div>
    );
}

export default Home;