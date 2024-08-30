import { CarouselButtonType, MyntraCarousel, Slider, useRating } from '6pp';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';
import { FaArrowLeftLong, FaArrowRightLong, FaRegStar, FaStar } from 'react-icons/fa6';
import { FiEdit } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { Skeleton } from '../components/loader';
import RatingsComponent from '../components/ratings';
import {
    useAllReviewsOfProductsQuery,
    useProductDetailsQuery
} from '../redux/api/productAPI';
import { RootState } from '../redux/store';
import { Review } from '../types/types';

const ProductDetails = () => {
    const params = useParams();

    const { user } = useSelector((state: RootState) => state.userReducer);

    const { isLoading, isError, data } = useProductDetailsQuery(params.id!);
    const reviewsResponse = useAllReviewsOfProductsQuery(params.id!);
    const [carouselOpen, setCarouselOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const [reviewComment, setReviewComment] = useState('');
    const reviewDialogRef = useRef<HTMLDialogElement>(null);
    const [reviewSubmitLoading, setReviewSubmitLoading] = useState(false);

    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        if (reviewsResponse.data) {
            setReviews(reviewsResponse.data.reviews);
        }
    }, [reviewsResponse.data]);

    const decrement = () => setQuantity((prev) => prev - 1);
    const increment = () => {
        if (data?.product?.stock === quantity){
            return toast.error(`${data?.product?.stock} available only`);
        }
        setQuantity((prev) => prev + 1);
    };

    if (isError){
        return <Navigate to='/404' />;
    }

    const showDialog = () => {
        reviewDialogRef.current?.showModal();
    };

    const {
        Ratings: RatingsEditable,
        rating,
        setRating,
    } = useRating({
        IconFilled: <FaStar />,
        IconOutline: <FaRegStar />,
        value: 0,
        selectable: true,
        styles: {
            fontSize: '1.75rem',
            color: 'coral',
            justifyContent: 'flex-start'
        }
    });

    const reviewCloseHandler = () => {
        reviewDialogRef.current?.close();
        setRating(0);
        setReviewComment('');
    };

    return (
        <div className="product-details">
            {isLoading ? (
                <ProductLoader />
            ) : (
                <>
                    <main>
                        <section>
                            <Slider
                                showThumbnails
                                showNav={false}
                                onClick={() => setCarouselOpen(true)}
                                images={data?.product?.photos.map((i) => i.url) || []}
                                objectFit="contain"
                            />
                            {carouselOpen && (
                                <MyntraCarousel
                                    NextButton={NextButton}
                                    PrevButton={PrevButton}
                                    setIsOpen={setCarouselOpen}
                                    images={data?.product?.photos.map((i) => i.url) || []}
                                    objectFit="contain"
                                />
                            )}
                        </section>
                        <section>
                            <code>{data?.product?.category}</code>
                            <h1>{data?.product?.name}</h1>
                            <em
                                style={{ display: "flex", gap: "1rem", alignItems: "center" }}
                            >
                                <RatingsComponent value={data?.product?.ratings || 0} />(
                                {data?.product?.numOfReviews} reviews)
                            </em>
                            <h3>₹{data?.product?.price}</h3>
                            <article>
                                <div>
                                    <button onClick={decrement}>-</button>
                                    <span>{quantity}</span>
                                    <button onClick={increment}>+</button>
                                </div>
                                <button>
                                    Add To Cart
                                </button>
                            </article>

                            <p>{data?.product?.description}</p>
                        </section>
                    </main>
                </>
            )}

            <dialog ref={reviewDialogRef} className="review-dialog">
                <button onClick={reviewCloseHandler}>X</button>
                <h2>Write a Review</h2>
                <form>
                    <textarea
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Review..."
                    ></textarea>
                    <RatingsEditable />
                    <button disabled={reviewSubmitLoading} type="submit">
                        Submit
                    </button>
                </form>
            </dialog>

            <section>
                <article>
                    <h2>Reviews</h2>

                    {reviewsResponse.isLoading
                        ? null
                        : user && (
                            <button onClick={showDialog}>
                                <FiEdit />
                            </button>
                        )}
                </article>
                <div
                    style={{
                        display: "flex",
                        gap: "2rem",
                        overflowX: "auto",
                        padding: "2rem",
                    }}
                >
                    {reviewsResponse.isLoading ? (
                        <>
                            <Skeleton width="45rem" length={5} />
                            <Skeleton width="45rem" length={5} />
                            <Skeleton width="45rem" length={5} />
                        </>
                    ) : (
                        reviews.map((review) => (
                            <ReviewCard
                                userId={user?._id}
                                key={review._id}
                                review={review}
                            />
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

const ReviewCard = ({
    review,
    userId,
    handleDeleteReview
}: {
    userId?: string;
    review: Review;
    handleDeleteReview: (reviewId: string) => void;
}) => (
    <div className="review">
        <RatingsComponent value={review.rating} />
        <p>{review.comment}</p>
        <div>
            <img src={review.user.photo} alt="User" />
            <small>{review.user.name}</small>
        </div>
        {userId === review.user._id && (
            <button onClick={() => handleDeleteReview(review._id)}>
                <FaTrash />
            </button>
        )}
    </div>
);

const ProductLoader = () => {
    return (
        <div
            style={{
                display: "flex",
                gap: "2rem",
                border: "1px solid #f1f1f1",
                height: "80vh",
            }}
        >
            <section style={{ width: "100%", height: "100%" }}>
                <Skeleton
                    width="100%"
                    containerHeight="100%"
                    height="100%"
                    length={1}
                />
            </section>
            <section
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4rem",
                    padding: "2rem",
                }}
            >
                <Skeleton width="40%" length={3} />
                <Skeleton width="50%" length={4} />
                <Skeleton width="100%" length={2} />
                <Skeleton width="100%" length={10} />
            </section>
        </div>
    );
};

const NextButton: CarouselButtonType = ({ onClick }) => (
    <button onClick={onClick} className="carousel-btn">
        <FaArrowRightLong />
    </button>
);
const PrevButton: CarouselButtonType = ({ onClick }) => (
    <button onClick={onClick} className="carousel-btn">
        <FaArrowLeftLong />
    </button>
);

export default ProductDetails;