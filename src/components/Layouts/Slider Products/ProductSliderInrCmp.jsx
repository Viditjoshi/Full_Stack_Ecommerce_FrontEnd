import React from 'react';
import { Link } from 'react-router-dom';

const ProductSliderInrCmp = ({ product }) => {
    const { name, price, images, category } = product;

    return (
        <div className="bg-gradient-to-r from-custom-dark-teal to-custom-deep-green h-[300px] n flex justify-center transition duration-300 ease-in-out hover:shadow-xl">
            <Link to={`/product/${product._id}`} className="block">
                <div className="w-[200px] h-[200px] overflow-hidden rounded-lg  relative">
                    <img
                        src={images[0].url}
                        alt={name}
                        className="w-full h-[200px] lg:h-[300px] object-cover object-center transition duration-300 ease-in-out transform hover:scale-105"
                    />
                </div>
                <div className="mt-4 ">
                    <h3 className="text-sm text-gray-400 uppercase tracking-wider">{category}</h3>
                    <h2 className="text-lg font-semibold text-white mt-1 text-nowrap">{name}</h2>
                    <p className="mt-2 text-xl font-bold text-orange-500">₹{price}</p>
                </div>
            </Link>
        </div>
    );
};

export default ProductSliderInrCmp;
