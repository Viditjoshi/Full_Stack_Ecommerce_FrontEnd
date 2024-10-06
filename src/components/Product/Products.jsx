import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { fetchProducts } from "../../slices/productsSlice";
import Product from "../Home/Product";
import { useParams } from "react-router-dom";
// import Pagination from "react-js-pagination";
import MetaData from '../Layouts/MetaData';
import './ProductDetail.css';
import Typography from '@mui/material/Typography';
import toast from 'react-hot-toast';

const categories = [
    "Gold Jewelry",
    "Silver Jewelry",
];

const Products = () => {
    const dispatch = useDispatch();
    const [price, setPrice] = useState([0, 50000]);
    const [category, setCategory] = useState("");
    const [currentpage, setCurrentPage] = useState(1);
    const [rating, setRating] = useState(0);

    const { loading, products, error } = useSelector((state) => state.products);
    const { keyword } = useParams();

    const pricehandler = (e) => {
        setPrice([0, e.target.value])
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        dispatch(fetchProducts({ keyword, currentpage, price, category, rating }));
    }, [dispatch, keyword, currentpage, price, category, rating, error]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${Product.name} --Ecommerce`} />


                    {/* Filter Section on Top */}
                    <div className=" rounded-lg p-6 mb-8 container mx-auto">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                            {/* Price Filter */}
                            <div className="w-full md:w-1/3">
                                <Typography className="text-white font-bold mb-2">Filter by Price</Typography>
                                <select className="w-full bg-transparent text-white p-2 border rounded-md font-font3" onChange={pricehandler}>
                                    <option value="0">Select Price Range</option>
                                    <option value="1000">above 1000</option>
                                    <option value="50000">above 5000</option>
                                    <option value="10000">above 10,000</option>
                                    <option value="50000">above 50000</option>
                                </select>
                            </div>

                            {/* Category Filter */}
                            <div className="w-full md:w-1/1">
                                <Typography className="text-white font-bold mb-2">Filter by Category</Typography>
                                <select className="w-full p-2 border rounded-md bg-transparent text-white font-font3" onChange={(e) => setCategory(e.target.value)}>
                                    <option value="">Select Category</option>
                                    {categories.map((item) => (
                                        <option className="" key={item} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Rating Filter */}
                            <div className="w-full md:w-1/3">
                                <Typography className="text-white font-bold mb-2">Filter by Rating</Typography>
                                <select className="w-full bg-transparent text-white p-2 border font-font3 rounded-md" onChange={(e) => setRating(e.target.value)}>
                                    <option value="0">Select Minimum Rating</option>
                                    <option value="1">1 Star & Above</option>
                                    <option value="2">2 Stars & Above</option>
                                    <option value="3">3 Stars & Above</option>
                                    <option value="4">4 Stars & Above</option>
                                    <option value="5">5 Stars</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Products Section Below Filters */}
                    <div className=" px-5 md:px-44">
                        <div className="flex flex-wrap justify-center lg:justify-start">
                            {products && products.map((product) => (
                                <div className="w-2/4 sm:w-1/3 md:w-1/3 lg:w-1/4 pr-5 text-white" key={product._id}>
                                    <Product product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Products;
