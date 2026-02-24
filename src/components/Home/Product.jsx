import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
    const { name, price, images, category } = product;
    return (
        <Link to={`/product/${product._id}`} className="group block">
            <div className="aspect-[3/4] w-full overflow-hidden rounded-sm bg-cream mt-4">
                <img
                    src={images[0].url}
                    alt={name}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
            </div>
            <div className="mt-4 space-y-1">
                <p className="font-sans text-[0.65rem] tracking-[0.15em] uppercase text-stone">{category}</p>
                <h2 className="font-serif text-lg text-charcoal group-hover:text-gold transition-colors duration-200">{name}</h2>
                <p className="font-sans text-sm font-medium text-charcoal">
                    {'₹'}{price.toLocaleString('en-IN')}
                </p>
            </div>
        </Link>
    );
};

export default Product;
