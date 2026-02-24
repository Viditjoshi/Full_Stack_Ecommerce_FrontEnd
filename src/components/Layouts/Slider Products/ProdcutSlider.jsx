import React, { useEffect } from 'react';
import Loader from '../../Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../slices/productsSlice';
import toast from 'react-hot-toast';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper/modules';
import ProductSliderInrCmp from './ProductSliderInrCmp';

const ProductSlider = () => {
    const dispatch = useDispatch();
    const { products, status, error } = useSelector((state) => state.products);

    useEffect(() => {
        if (error) {
            toast.error("Failed to load products");
        } else if (status === 'idle') {
            dispatch(fetchProducts({}));
        }
    }, [status, error, dispatch]);

    return (
        <div className="w-full py-16 md:py-24 px-6 md:px-10">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16">
                    <p className="font-sans text-[0.7rem] tracking-[0.3em] uppercase text-gold mb-4">Handpicked</p>
                    <h2 className="font-serif text-2xl md:text-4xl font-light text-charcoal">Featured Collection</h2>
                    <div className="w-16 h-px bg-gold mx-auto mt-6" />
                </div>

                <Swiper
                    slidesPerView={1}
                    spaceBetween={20}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    grabCursor={true}
                    breakpoints={{
                        420: {
                            slidesPerView: 2,
                            spaceBetween: 16,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 24,
                        },
                    }}
                    modules={[Autoplay]}
                    className="w-full"
                >
                    {status === 'loading' ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader />
                        </div>
                    ) : error ? (
                        <div className="text-red-500 text-center font-sans">Error loading products</div>
                    ) : (
                        products.map((product) => (
                            <SwiperSlide key={product._id}>
                                <ProductSliderInrCmp product={product} />
                            </SwiperSlide>
                        ))
                    )}
                </Swiper>
            </div>
        </div>
    );
};

export default ProductSlider;
