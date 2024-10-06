import React, { useEffect, useState } from "react";
import MetaData from '../Layouts/MetaData';
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getProductDetail, NewReview } from "../../slices/productDetailSlice";
import Loader from "../Loader/Loader";
import ReviewCard from "./ReviewCard"
import { cartThnk } from "../../slices/CartSlice";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import Rating from '@mui/material/Rating';

const ProductDetail = () => {
    const dispatch = useDispatch();
    const { pageId } = useParams();
    const navigate = useNavigate()
    const { product, status, error } = useSelector((state) => state.product);
    const { user } = useSelector((state) => state.auth)

    const [quantity, setQuentity] = useState(1)
    const [open, setOpen] = useState(false)
    const [ratings, setRating] = useState(0);
    const [comment, setComment] = useState("")
    const increaseQuentity = () => {
        if (product.Stock <= quantity) {
            return;
        }
        const qty = quantity + 1;
        setQuentity(qty)
    }
    const decreaseQuentity = () => {
        if (quantity <= 1) {
            return
        }
        const qty = quantity - 1;
        setQuentity(qty)
    }
    const id = pageId
    const handleAddToCart = () => {
        dispatch(cartThnk({ id, quantity }));
        toast.success("Item added To cart successfully...")
    };
    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true)
    }
    const handleSubmitReview = () => {
        if (user) {
            const myForm = new FormData();
            myForm.set("rating", ratings);
            myForm.set("comment", comment);
            myForm.set("productId", id);

            dispatch(NewReview({ myForm })).then((response) => {
                if (response.error) {
                    toast.error(response.error.message || "Failed to submit review.");
                } else {
                    toast.success("Review submitted successfully!");
                    dispatch(getProductDetail(pageId)); // Refetch the product details
                }
            });

            setOpen(false);
        } else {
            toast.error("Please Login to Enter Review")
            navigate("/login")
        }

    };

    useEffect(() => {
        dispatch(getProductDetail(pageId));
    }, [getProductDetail, pageId]);


    useEffect(() => {
        if (error) {
            toast.error("Product Not Found");
        }
    }, [error]);
    const options = {
        readOnly: true,
        value: product.ratings,
        size: "large",
    };

    return (
        <>
            <MetaData title={`${product.name} - Ecommerce`} />

            {/* Spacer to ensure content does not overlap with header */}
            <div className="">
                <div className="container mx-auto px-4 py-8 md:px-8 md:py-12 lg:px-16 lg:py-16 flex flex-col md:flex-row gap-8 md:gap-12">
                    {/* Carousel Section */}
                    <div className="flex-1">
                        {status === "loading" ? (
                            <Loader />
                        ) : error ? (
                            <div className="text-center text-red-600 font-semibold">Product Not Found</div>
                        ) : (
                            <Carousel className=" overflow-hidden">
                                {product.images && product.images.map((item, index) => (
                                    <img
                                        className="w-full h-60 object-cover md:h-80 lg:h-[30rem] rounded-lg"
                                        src={item.url}
                                        alt={`Product ${index}`}
                                        key={index}
                                    />
                                ))}
                            </Carousel>
                        )}
                    </div>

                    {/* Product Details Section */}
                    <div className="flex-1 flex flex-col gap-6">
                        <div>
                            <h1 className="text-2xl text-white md:text-3xl font-semibold">{product.name}</h1>
                            <p className="text-gray-500">Product ID: {product._id}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <Rating {...options} />
                            <span className="text-white">({product.numOfReviews} Reviews)</span>
                        </div>

                        <div className="flex flex-col gap-6">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">{`₹${product.price}`}</h2>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-center gap-2">
                                    <button className="bg-orange-500 text-white rounded-full h-12 w-12 flex items-center justify-center text-xl" onClick={decreaseQuentity}>
                                        -
                                    </button>
                                    <input
                                        className="w-16 text-center border rounded"
                                        value={quantity}
                                        type="number"
                                        min="1"
                                        readOnly
                                        max="99"
                                    />
                                    <button className="bg-orange-500 text-white rounded-full h-12 w-12 flex items-center justify-center text-xl" onClick={increaseQuentity}>
                                        +
                                    </button>
                                </div>
                                <button className="bg-orange-500 text-white rounded-lg text-lg p-3 w-full md:w-1/2 lg:w-1/3" disabled={product.Stock < 1 ? true : false} onClick={handleAddToCart}>
                                    Add To Cart
                                </button>
                            </div>

                            <div>
                                <span className="text-white">Status : </span><b className={product.Stock < 1 ? "text-red-600" : "text-green-600"}>
                                    {product.Stock < 1 ? "Out Of Stock" : "In Stock"}
                                </b>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-semibold text-white">Description</h3>
                            <p className="text-white">{product.description}</p>
                        </div>

                        <div className="flex justify-center">
                            <button className="bg-orange-500 text-white rounded-lg text-lg p-2 w-full md:w-1/2 lg:w-1/3" onClick={submitReviewToggle}>
                                Submit Review
                            </button>
                        </div>
                    </div>
                </div>

                <h1 className="text-center text-2xl font-semibold text-white border-b-4 border-gray-300 py-4 mt-8">
                    Reviews
                </h1>

                <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={submitReviewToggle} >
                    <DialogTitle>Submit Review</DialogTitle>
                    <DialogContent className="flex flex-col ">
                        <Rating className="w-full pb-5" onChange={(e) => setRating(e.target.value)} value={ratings} />
                        <textarea placeholder="Enter Your Review" className="border-2 p-2 mb-5 font-font3" cols="30" rows="5" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                        <DialogActions>
                            <Button onClick={submitReviewToggle} variant="outlined" color="error">Cancel</Button>
                            <Button variant="contained" color="success" onClick={handleSubmitReview}>Submit</Button>
                        </DialogActions>

                    </DialogContent>
                </Dialog>
                <div className="py-8 flex flex-col justify-center w-full items-center">
                    {product.reviews && product.reviews.length > 0 ? (
                        <div className="space-y-4">
                            {product.reviews.map((review) => (
                                <ReviewCard key={review._id} review={review} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-white">No Reviews Available</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductDetail;
