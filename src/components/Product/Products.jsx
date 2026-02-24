import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { fetchProducts } from "../../slices/productsSlice";
import Product from "../Home/Product";
import { useParams } from "react-router-dom";
import MetaData from '../Layouts/MetaData';
import './ProductDetail.css';
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
                    <MetaData title="Collection | Hari Om Jewellery" />

                    {/* Page Header */}
                    <div className="pt-8 pb-6 px-6 md:px-10 max-w-7xl mx-auto">
                        <p className="font-sans text-[0.7rem] tracking-[0.3em] uppercase text-gold mb-2">Shop</p>
                        <h1 className="font-serif text-3xl md:text-4xl font-light text-charcoal">
                            {keyword ? `Results for "${keyword}"` : 'Our Collection'}
                        </h1>
                        <div className="w-16 h-px bg-gold mt-4" />
                    </div>

                    {/* Filter Section */}
                    <div className="px-6 md:px-10 pb-8 max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row gap-4 p-6 bg-cream rounded-sm border border-cream">
                            {/* Price Filter */}
                            <div className="w-full md:w-1/3">
                                <label className="block font-sans text-xs tracking-wider uppercase text-stone mb-2">Price Range</label>
                                <select 
                                    className="w-full bg-white text-charcoal p-2.5 border border-cream rounded-sm font-sans text-sm focus:border-gold focus:outline-none transition-colors" 
                                    onChange={pricehandler}
                                >
                                    <option value="0">All Prices</option>
                                    <option value="1000">Above 1,000</option>
                                    <option value="5000">Above 5,000</option>
                                    <option value="10000">Above 10,000</option>
                                    <option value="50000">Above 50,000</option>
                                </select>
                            </div>

                            {/* Category Filter */}
                            <div className="w-full md:w-1/3">
                                <label className="block font-sans text-xs tracking-wider uppercase text-stone mb-2">Category</label>
                                <select 
                                    className="w-full p-2.5 border border-cream rounded-sm bg-white text-charcoal font-sans text-sm focus:border-gold focus:outline-none transition-colors" 
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="">All Categories</option>
                                    {categories.map((item) => (
                                        <option key={item} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Rating Filter */}
                            <div className="w-full md:w-1/3">
                                <label className="block font-sans text-xs tracking-wider uppercase text-stone mb-2">Rating</label>
                                <select 
                                    className="w-full bg-white text-charcoal p-2.5 border border-cream rounded-sm font-sans text-sm focus:border-gold focus:outline-none transition-colors" 
                                    onChange={(e) => setRating(e.target.value)}
                                >
                                    <option value="0">All Ratings</option>
                                    <option value="1">1 Star & Above</option>
                                    <option value="2">2 Stars & Above</option>
                                    <option value="3">3 Stars & Above</option>
                                    <option value="4">4 Stars & Above</option>
                                    <option value="5">5 Stars</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="px-6 md:px-10 pb-16 max-w-7xl mx-auto">
                        {products && products.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                                {products.map((product) => (
                                    <Product product={product} key={product._id} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <p className="font-serif text-2xl text-stone">No products found</p>
                                <p className="font-sans text-sm text-stone-light mt-2">Try adjusting your filters</p>
                            </div>
                        )}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Products;
