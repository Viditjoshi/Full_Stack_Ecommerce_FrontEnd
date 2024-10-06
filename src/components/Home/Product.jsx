import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
    const { ratings, name, price, images, category } = product;
    return (
        <Link to={`/product/${product._id}`} className="">
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg mt-7 bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                <img
                    src={images[0].url}
                    alt={name}
                    className="h-[200px] w-full lg:h-[300px] lg:w-[300px] object-cover object-center group-hover:opacity-75"
                />
            </div>
            <div className="mt-5">
                <h3 className="text-sm text-white">{category}</h3>
                <h2 className="text-xl font-semibold text-white">{name}</h2>
                <p className="mt-1 text-lg font-medium text-white">₹{price}</p>

            </div>
        </Link>
    );
};

export default Product;
