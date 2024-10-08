import React, { useEffect } from 'react';
import Loader from '../../Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../slices/productsSlice';
import toast from 'react-hot-toast';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

// import required modules
import { EffectCoverflow, Autoplay, EffectFade } from 'swiper/modules';
import ProductSliderInrCmp from './ProductSliderInrCmp';

const ProductSlider = () => {
    const dispatch = useDispatch();
    const { products, status, error } = useSelector((state) => state.products);

    const options = {
        effect: window.innerWidth < 600 ? "fade" : "coverflow",
        autoplay: window.innerWidth < 600 ? {
            delay: 3000,
            disableOnInteraction: false,
        } : false,
        navigation: true,
    };

    useEffect(() => {
        if (error) {
            toast.error("Failed to load products");
        } else if (status === 'idle') {
            dispatch(fetchProducts({}));
        }
    }, [status, error, dispatch]);

    return (
        <div className="w-full h-full py-8">
            <h2
                id="container"
                className="text-center text-white font-light text-[6vw] sm:text-[5vw] md:text-[3vw] lg:text-[2.5vmax] border-b-2 border-gray-300 mb-8 w-[80vw] md:w-[50vw] lg:w-[30vmax] p-4 mx-auto"
            >
                Featured Products
            </h2>
            <Swiper
                slidesPerView={3}
                spaceBetween={20}
                centeredSlides={true}
                autoplay={options.autoplay}
                grabCursor={true}
                initialSlide={2}
                breakpoints={{

                    320: {
                        slidesPerView: 1,
                    },
                    420: {
                        lidesPerView: 1,
                    },
                    650: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    980: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                    1280: {
                        slidesPerView: 5,
                        spaceBetween: 50,
                    },
                }}
                modules={[EffectCoverflow, Autoplay, EffectFade]}
                className="w-[90%] md:w-[80%]  md:h-[70vh] lg:h-[50vh]  mx-auto"
            >
                {status === 'loading' ? (
                    <div className="flex justify-center items-center h-full">
                        <Loader />
                    </div>
                ) : error ? (
                    <div className="text-red-500 text-center">Error loading products: {error}</div>
                ) : (
                    products.map((product) => (
                        <SwiperSlide key={product._id} className="bg-none  ">
                            <div className=''>

                                <ProductSliderInrCmp product={product} />
                            </div>
                        </SwiperSlide>
                    ))
                )}
            </Swiper>
        </div>
    );
};

export default ProductSlider;
