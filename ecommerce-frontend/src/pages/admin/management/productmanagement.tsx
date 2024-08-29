import { useFileHandler } from '6pp';
import { FormEvent, useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Navigate, useParams } from 'react-router-dom';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import { Skeleton } from '../../../components/loader';
import { useProductDetailsQuery } from '../../../redux/api/productAPI';
import { transformImage } from '../../../utils/features';

const Productmanagement = () => {
    const params = useParams();

    const { data, isLoading, isError } = useProductDetailsQuery(params.id!);

    const { price, photos, name, stock, category, description } =
        data?.product || {
            photos: [],
            category: '',
            name: '',
            stock: 0,
            price: 0,
            description: ''
        };

    const [btnLoading, setBtnLoading] = useState<boolean>(false);
    const [priceUpdate, setPriceUpdate] = useState<number>(price);
    const [stockUpdate, setStockUpdate] = useState<number>(stock);
    const [nameUpdate, setNameUpdate] = useState<string>(name);
    const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
    const [descriptionUpdate, setDescriptionUpdate] = useState<string>(description);

    const photosFiles = useFileHandler('multiple', 10, 5);

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    };

    useEffect(() => {
        if (data) {
            setNameUpdate(data.product.name);
            setPriceUpdate(data.product.price);
            setStockUpdate(data.product.stock);
            setCategoryUpdate(data.product.category);
            setDescriptionUpdate(data.product.description);
        }
    }, [data]);

    if (isError) {
        return <Navigate to={'/404'} />;
    }

    return (
        <div className="admin-container">
            <AdminSidebar />
            <main className="product-management">
                {isLoading ? (
                    <Skeleton length={20} />
                ) : (
                    <>
                        <section>
                            <strong>ID - {data?.product._id}</strong>
                            <img src={transformImage(photos[0]?.url)} alt="Product" />
                            <p>{name}</p>
                            {stock > 0 ? (
                                <span className="green">{stock} Available</span>
                            ) : (
                                <span className="red"> Not Available</span>
                            )}
                            <h3>{price} лв.</h3>
                        </section>
                        <article>
                            <button className="product-delete-btn">
                                <FaTrash />
                            </button>
                            <form onSubmit={submitHandler}>
                                <h2>Manage</h2>
                                <div>
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={nameUpdate}
                                        onChange={(e) => setNameUpdate(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label>Description</label>
                                    <textarea
                                        required
                                        placeholder="Description"
                                        value={descriptionUpdate}
                                        onChange={(e) => setDescriptionUpdate(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label>Price</label>
                                    <input
                                        type="number"
                                        placeholder="Price"
                                        value={priceUpdate}
                                        onChange={(e) => setPriceUpdate(Number(e.target.value))}
                                    />
                                </div>
                                <div>
                                    <label>Stock</label>
                                    <input
                                        type="number"
                                        placeholder="Stock"
                                        value={stockUpdate}
                                        onChange={(e) => setStockUpdate(Number(e.target.value))}
                                    />
                                </div>

                                <div>
                                    <label>Category</label>
                                    <input
                                        type="text"
                                        placeholder="eg. laptop, camera etc"
                                        value={categoryUpdate}
                                        onChange={(e) => setCategoryUpdate(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label>Photos</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={photosFiles.changeHandler}
                                    />
                                </div>

                                {photosFiles.error && <p>{photosFiles.error}</p>}

                                {photosFiles.preview && (
                                    <div
                                        style={{ display: "flex", gap: "1rem", overflowX: "auto" }}
                                    >
                                        {photosFiles.preview.map((img, i) => (
                                            <img
                                                style={{ width: 100, height: 100, objectFit: "cover" }}
                                                key={i}
                                                src={img}
                                                alt="New Image"
                                            />
                                        ))}
                                    </div>
                                )}

                                <button disabled={btnLoading} type="submit">
                                    Update
                                </button>
                            </form>
                        </article>
                    </>
                )}
            </main>
        </div>
    );
};

export default Productmanagement;
