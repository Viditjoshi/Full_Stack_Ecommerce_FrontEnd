import React from 'react';
import MetaData from '../Layouts/MetaData';
import './Home.css';
import img1 from '../../image/dimend.png';
import img2 from '../../image/gold.png';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';

// Import required modules
import { Autoplay, EffectFade } from 'swiper/modules';
import ProductsSlider from '../Layouts/Slider Products/ProdcutSlider';
import Loader from '../Loader/Loader';

const Home = () => {

    return (

        <React.Fragment>
            <MetaData title="Ecommerce" />

            <div className="flex justify-center  items-center md:w-full  overflow-visible md:h-auto min-h-[50vh] md:min-h-full relative">
                <div className="heading-text z-[2] ">
                    <h1 className='font-Playfair text-4xl md:text-6xl '>Jewellery & Diamonds</h1>
                    <p className='font-extralight hidden md:block '>Welcome to <label className='font-Playfair font-extralight'>Hari Om Imitation jewellery</label>, where luxury meets craftsmanship. Our curated collection of fine jewelry and diamonds is  designed  to  captivate the senses and celebrate life's most cherished moments.</p>
                </div>

                <Swiper
                    effect="fade"
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, EffectFade]}
                    className="mySwiper z-1 w-[96%] h-full transition-all ease-linear relative"
                >
                    <SwiperSlide className="flex items-center justify-center overflow-hidden">
                        <img
                            src={img1}
                            alt="Slide 1"
                            className="w-full h-full object-cover bg-gradient-to-r from-custom-dark-teal to-custom-deep-green"
                        />
                    </SwiperSlide>

                    <SwiperSlide className="flex items-center justify-center overflow-hidden">
                        <img
                            src={img2}
                            alt="Slide 2"
                            className="w-full h-full object-cover bg-gradient-to-r from-custom-dark-teal to-custom-deep-green"
                        />
                    </SwiperSlide>
                </Swiper>
            </div>
            <ProductsSlider />
        </React.Fragment>

    );
};

export default Home;

