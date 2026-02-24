import React from 'react';
import { Link } from 'react-router-dom';

const ProductSliderInrCmp = ({ product }) => {
    const { name, price, images, category } = product;

    return (
        <div className="bg-white rounded-sm overflow-hidden border border-cream hover:border-gold-muted transition-all duration-300 hover:shadow-lg group">
            <Link to={`/product/${product._id}`} className="block">
                <div className="w-full aspect-square overflow-hidden bg-cream">
                    <img
                        src={images[0].url}
                        alt={name}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
                <div className="p-4">
                    <p className="font-sans text-[0.6rem] tracking-[0.15em] uppercase text-stone">{category}</p>
                    <h2 className="font-serif text-base text-charcoal mt-1 truncate group-hover:text-gold transition-colors duration-200">{name}</h2>
                    <p className="mt-2 font-sans text-sm font-semibold text-gold">
                        {'₹'}{price.toLocaleString('en-IN')}
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default ProductSliderInrCmp;
