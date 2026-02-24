import React, { useEffect, useState } from 'react';
import userimg from '../../../image/Profile.png';
import { NavLink, useLocation } from 'react-router-dom';
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { BsHandbag } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../../slices/loginUserSlice';
import toast from 'react-hot-toast';
import NavigationLink from './NavigationLink';

const Header = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);
    const [avatar, setAvatar] = useState(userimg);
    const [toggle, setToggle] = useState(false);
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [showOption, setShowOption] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const handleToggle = () => {
        setShowOption((prev) => !prev);
    };

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
            setKeyword("");
        } else {
            navigate("/products");
        }
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/');
        toast.success("Logged out successfully");
    };

    useEffect(() => {
        if (user && user.avatar && user.avatar.url) {
            setAvatar(user.avatar.url);
        } else {
            setAvatar(userimg);
        }
    }, [user]);

    useEffect(() => {
        setKeyword("");
        setToggle(false);
        setShowOption(false);
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isHome = location.pathname === '/';

    return (
        <>
            <header className={`sticky top-0 z-30 w-full transition-all duration-300 ${
                scrolled 
                    ? 'bg-warm-white/95 backdrop-blur-md shadow-sm border-b border-cream' 
                    : isHome ? 'bg-transparent absolute' : 'bg-warm-white border-b border-cream'
            }`}>
                <div className="flex items-center justify-between max-w-7xl mx-auto px-6 lg:px-10 py-4">
                    {/* Mobile hamburger */}
                    <div className="md:hidden">
                        <RxHamburgerMenu 
                            className={`text-xl cursor-pointer transition-colors ${
                                scrolled || !isHome ? 'text-charcoal' : 'text-white'
                            }`} 
                            onClick={() => setToggle((prev) => !prev)} 
                        />
                    </div>

                    {/* Logo */}
                    <div className="flex items-center">
                        <NavLink to="/">
                            <h1 className={`text-2xl lg:text-3xl font-serif font-light tracking-wide transition-colors ${
                                scrolled || !isHome ? 'text-charcoal' : 'text-white'
                            }`}>
                                Hari Om
                            </h1>
                        </NavLink>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className={`hidden lg:flex items-center gap-10 text-[0.8rem] tracking-[0.2em] uppercase font-sans font-medium transition-colors ${
                        scrolled || !isHome ? 'text-charcoal' : 'text-white'
                    }`}>
                        <NavLink to="/" className={({ isActive }) =>
                            `relative pb-1 transition-all duration-200 hover:opacity-70 ${isActive ? 'border-b border-gold' : ''}`
                        }>Home</NavLink>
                        <NavLink to="/products" className={({ isActive }) =>
                            `relative pb-1 transition-all duration-200 hover:opacity-70 ${isActive ? 'border-b border-gold' : ''}`
                        }>Collection</NavLink>
                        <NavigationLink scrolled={scrolled} isHome={isHome} />
                    </nav>

                    {/* Right side actions */}
                    <div className="flex items-center gap-5">
                        {/* Search */}
                        <form onSubmit={searchSubmitHandler} className={`hidden md:flex items-center border-b px-2 py-1 transition-colors ${
                            scrolled || !isHome ? 'border-stone-light' : 'border-white/40'
                        }`}>
                            <button type="submit" aria-label="Search">
                                <IoSearch className={`text-lg transition-colors ${
                                    scrolled || !isHome ? 'text-charcoal' : 'text-white'
                                }`} />
                            </button>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={keyword}
                                className={`w-28 bg-transparent border-none outline-none px-2 py-0.5 text-sm font-sans placeholder:text-stone-light transition-colors ${
                                    scrolled || !isHome ? 'text-charcoal' : 'text-white placeholder:text-white/50'
                                }`}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                        </form>

                        {/* Cart */}
                        <NavLink to="/Cart" className="relative">
                            <BsHandbag className={`text-xl cursor-pointer transition-colors ${
                                scrolled || !isHome ? 'text-charcoal' : 'text-white'
                            }`} />
                            {cartItems && cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 w-4 h-4 bg-gold text-white text-[10px] font-sans font-bold rounded-full flex items-center justify-center">
                                    {cartItems.length}
                                </span>
                            )}
                        </NavLink>

                        {/* User Avatar */}
                        <div className="relative z-10">
                            <img
                                src={avatar}
                                alt="User Avatar"
                                className="w-9 h-9 rounded-full cursor-pointer object-cover border-2 border-transparent hover:border-gold transition-all duration-200"
                                onClick={handleToggle}
                            />
                            <div
                                className={`absolute right-0 mt-3 w-52 bg-white shadow-xl rounded-lg overflow-hidden transition-all duration-300 ease-out border border-cream ${
                                    showOption ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
                                }`}
                            >
                                {user && user._id ? (
                                    user.role === 'admin' ? (
                                        <>
                                            <NavLink to="/admin/dashboard" onClick={() => setShowOption(false)} className="block px-5 py-3 text-sm font-sans text-charcoal hover:bg-cream hover:text-gold transition-colors">Dashboard</NavLink>
                                            <NavLink to="/profile" onClick={() => setShowOption(false)} className="block px-5 py-3 text-sm font-sans text-charcoal hover:bg-cream hover:text-gold transition-colors">Profile</NavLink>
                                            <NavLink to="/orders" onClick={() => setShowOption(false)} className="block px-5 py-3 text-sm font-sans text-charcoal hover:bg-cream hover:text-gold transition-colors">Orders</NavLink>
                                            <div className="border-t border-cream" />
                                            <div onClick={() => { handleLogout(); setShowOption(false); }} className="block px-5 py-3 text-sm font-sans text-stone cursor-pointer hover:bg-cream hover:text-red-500 transition-colors">Logout</div>
                                        </>
                                    ) : (
                                        <>
                                            <NavLink to="/profile" onClick={() => setShowOption(false)} className="block px-5 py-3 text-sm font-sans text-charcoal hover:bg-cream hover:text-gold transition-colors">Profile</NavLink>
                                            <NavLink to="/orders" onClick={() => setShowOption(false)} className="block px-5 py-3 text-sm font-sans text-charcoal hover:bg-cream hover:text-gold transition-colors">Orders</NavLink>
                                            <div className="border-t border-cream" />
                                            <div onClick={() => { handleLogout(); setShowOption(false); }} className="block px-5 py-3 text-sm font-sans text-stone cursor-pointer hover:bg-cream hover:text-red-500 transition-colors">Logout</div>
                                        </>
                                    )
                                ) : (
                                    <>
                                        <NavLink to="/login" onClick={() => setShowOption(false)} className="block px-5 py-3 text-sm font-sans text-charcoal hover:bg-cream hover:text-gold transition-colors">Login</NavLink>
                                        <NavLink to="/register" onClick={() => setShowOption(false)} className="block px-5 py-3 text-sm font-sans text-charcoal hover:bg-cream hover:text-gold transition-colors">Register</NavLink>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Drawer */}
            <div
                className={`md:hidden fixed inset-0 z-40 transform transition-transform duration-300 ease-out ${
                    toggle ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Overlay */}
                <div 
                    className={`absolute inset-0 bg-charcoal/40 backdrop-blur-sm transition-opacity duration-300 ${
                        toggle ? 'opacity-100' : 'opacity-0'
                    }`}
                    onClick={() => setToggle(false)}
                />
                
                {/* Drawer */}
                <div className="relative w-[80%] max-w-sm h-full bg-warm-white shadow-2xl">
                    <div className="flex flex-col p-8">
                        <div className="flex items-center justify-between mb-12">
                            <h1 className="text-2xl font-serif font-light text-charcoal tracking-wide">Hari Om</h1>
                            <RxCross2 className="text-2xl text-charcoal cursor-pointer hover:text-gold transition-colors" onClick={() => setToggle(false)} />
                        </div>

                        {/* Mobile search */}
                        <form onSubmit={searchSubmitHandler} className="flex items-center border-b border-stone-light pb-3 mb-10">
                            <IoSearch className="text-stone" />
                            <input
                                type="text"
                                placeholder="Search jewellery..."
                                value={keyword}
                                className="flex-grow bg-transparent border-none outline-none px-3 py-1 text-sm font-sans text-charcoal placeholder:text-stone-light"
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                        </form>

                        <nav className="flex flex-col gap-2">
                            {[
                                { to: '/', label: 'Home' },
                                { to: '/products', label: 'Collection' },
                                { to: '/cart', label: 'Cart' },
                            ].map((link) => (
                                <NavLink 
                                    key={link.to}
                                    to={link.to} 
                                    onClick={() => setToggle(false)} 
                                    className={({ isActive }) =>
                                        `py-3 px-2 text-base font-sans tracking-wider uppercase transition-all duration-200 border-l-2 ${
                                            isActive 
                                                ? 'text-gold border-gold pl-4' 
                                                : 'text-charcoal border-transparent hover:text-gold hover:pl-4'
                                        }`
                                    }
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </nav>

                        <div className="mt-auto pt-12 border-t border-cream">
                            <p className="text-xs text-stone font-sans tracking-wider uppercase">Fine Jewellery & Diamonds</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
