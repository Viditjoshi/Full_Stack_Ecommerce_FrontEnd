import React from 'react';
import MetaData from '../Layouts/MetaData';
import './Home.css';
import heroImg1 from '../../image/hero-jewelry-1.jpg';
import heroImg2 from '../../image/hero-jewelry-2.jpg';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { Autoplay, EffectFade } from 'swiper/modules';
import ProductsSlider from '../Layouts/Slider Products/ProdcutSlider';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <React.Fragment>
            <MetaData title="Hari Om | Fine Jewellery & Diamonds" />

            {/* Hero Section */}
            <section className="relative w-full h-[85vh] md:h-screen overflow-hidden -mt-[72px]">
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-charcoal/40 z-[1]" />
                
                <div className="heading-text z-[5]">
                    <p className="font-sans text-[0.7rem] md:text-xs tracking-[0.35em] uppercase text-gold-light mb-4 md:mb-6">
                        Fine Jewellery & Diamonds
                    </p>
                    <h1 className="font-serif text-3xl md:text-6xl lg:text-7xl font-light leading-[1.1]">
                        Elegance in
                        <br />
                        <span className="italic">every detail</span>
                    </h1>
                    <p className="font-sans hidden md:block text-sm font-light leading-relaxed text-white/80 max-w-md">
                        Welcome to Hari Om Jewellery, where luxury meets craftsmanship. 
                        Our curated collection of fine jewelry is designed to celebrate 
                        life's most cherished moments.
                    </p>
                    <Link 
                        to="/products"
                        className="inline-block mt-6 md:mt-8 font-sans text-[0.75rem] tracking-[0.2em] uppercase px-8 py-3.5 border border-white/60 text-white hover:bg-white/10 hover:border-white transition-all duration-300"
                    >
                        Explore Collection
                    </Link>
                </div>

                <Swiper
                    effect="fade"
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    speed={1500}
                    modules={[Autoplay, EffectFade]}
                    className="w-full h-full"
                >
                    <SwiperSlide className="flex items-center justify-center overflow-hidden">
                        <img
                            src={heroImg1}
                            alt="Luxury jewelry collection"
                            className="w-full h-full object-cover"
                        />
                    </SwiperSlide>
                    <SwiperSlide className="flex items-center justify-center overflow-hidden">
                        <img
                            src={heroImg2}
                            alt="Diamond and pearl collection"
                            className="w-full h-full object-cover"
                        />
                    </SwiperSlide>
                </Swiper>
            </section>

            {/* Tagline Section */}
            <section className="py-16 md:py-24 px-6 text-center bg-warm-white">
                <p className="font-sans text-[0.7rem] tracking-[0.3em] uppercase text-gold mb-6">Our Promise</p>
                <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl font-light text-charcoal max-w-3xl mx-auto leading-snug">
                    Timeless pieces crafted with passion, designed to tell your story
                </h2>
                <div className="flex justify-center gap-12 mt-12 md:mt-16">
                    <div className="text-center">
                        <p className="font-serif text-3xl md:text-4xl text-gold font-light">500+</p>
                        <p className="font-sans text-xs tracking-wider uppercase text-stone mt-2">Unique Designs</p>
                    </div>
                    <div className="w-px bg-cream" />
                    <div className="text-center">
                        <p className="font-serif text-3xl md:text-4xl text-gold font-light">18K</p>
                        <p className="font-sans text-xs tracking-wider uppercase text-stone mt-2">Pure Gold</p>
                    </div>
                    <div className="w-px bg-cream" />
                    <div className="text-center">
                        <p className="font-serif text-3xl md:text-4xl text-gold font-light">100%</p>
                        <p className="font-sans text-xs tracking-wider uppercase text-stone mt-2">Certified</p>
                    </div>
                </div>
            </section>

            {/* Category Preview */}
            <section className="py-12 md:py-20 px-6 md:px-10 bg-cream">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 md:mb-16">
                        <p className="font-sans text-[0.7rem] tracking-[0.3em] uppercase text-gold mb-4">Browse By</p>
                        <h2 className="font-serif text-2xl md:text-4xl font-light text-charcoal">Our Categories</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {[
                            { name: 'Rings', link: '/products/Rings' },
                            { name: 'Chains', link: '/products/Chain' },
                            { name: 'Bracelets', link: '/products/Bracelet' },
                            { name: 'Necklace Sets', link: '/products/Set' },
                        ].map((cat) => (
                            <Link 
                                key={cat.name} 
                                to={cat.link}
                                className="group relative bg-white rounded-sm overflow-hidden aspect-square flex items-center justify-center border border-cream hover:border-gold transition-all duration-300 hover:shadow-lg"
                            >
                                <div className="text-center p-6">
                                    <h3 className="font-serif text-xl md:text-2xl text-charcoal group-hover:text-gold transition-colors duration-300">
                                        {cat.name}
                                    </h3>
                                    <span className="block mt-3 font-sans text-[0.65rem] tracking-[0.2em] uppercase text-stone group-hover:text-gold transition-colors duration-300">
                                        Explore
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products Slider */}
            <section className="bg-warm-white">
                <ProductsSlider />
            </section>

            {/* Trust Banner */}
            <section className="py-16 md:py-20 bg-charcoal text-white">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                    <div>
                        <div className="w-12 h-px bg-gold mx-auto mb-6" />
                        <h3 className="font-serif text-lg font-light mb-2">Free Shipping</h3>
                        <p className="font-sans text-xs text-white/60 leading-relaxed">Complimentary shipping on all orders above Rs. 2000</p>
                    </div>
                    <div>
                        <div className="w-12 h-px bg-gold mx-auto mb-6" />
                        <h3 className="font-serif text-lg font-light mb-2">Certified Quality</h3>
                        <p className="font-sans text-xs text-white/60 leading-relaxed">Every piece comes with a certificate of authenticity</p>
                    </div>
                    <div>
                        <div className="w-12 h-px bg-gold mx-auto mb-6" />
                        <h3 className="font-serif text-lg font-light mb-2">Secure Payments</h3>
                        <p className="font-sans text-xs text-white/60 leading-relaxed">Your transactions are protected with industry-standard security</p>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default Home;
