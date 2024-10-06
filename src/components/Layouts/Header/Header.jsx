import React, { useEffect, useState } from 'react';
import logo from '../../../image/logoweb.jpg';
import userimg from '../../../image/Profile.png';
import { NavLink, useLocation } from 'react-router-dom';
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineArrowRightAlt } from "react-icons/md";
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
    const [avatar, setAvatar] = useState(userimg);
    const [toggle, setToggle] = useState(false);
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [showOption, setShowOption] = useState(false);

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

    // Reset states on route change
    useEffect(() => {
        setKeyword("");
        setToggle(false);
        setShowOption(false);
    }, [location]);

    return (
        <>
            <header className="flex items-center justify-between w-full gap-4 z-30 lg:pl-20 lg:pr-20 p-6">
                <div className="md:hidden text-2xl">
                    <RxHamburgerMenu className='text-white' onClick={() => setToggle((prev) => !prev)} />
                </div>
                <div className="md:flex items-center space-x-4 hidden ">
                    <NavLink to="/"><h1 className="hidden md:block text-4xl font-extralight text-white font-abc">Hari Om</h1></NavLink>
                </div>
                <nav className="hidden lg:flex flex-grow justify-center space-x-10 text-[1.1em]  font-extralight text-white">
                    <NavLink to="/" className={({ isActive }) =>
                        ` ${isActive ? "text-yellow-500 hover:underline" : "text-white"} `
                    }>HOME</NavLink>
                    <NavLink to="/products" className={({ isActive }) =>
                        ` ${isActive ? "text-yellow-500 hover:underline" : "text-white"} `
                    }>PRODUCTS</NavLink>
                    <NavigationLink />
                    {/* <NavLink to="/contact" className={({ isActive }) =>
                        ` ${isActive ? "text-yellow-500" : "text-white"} `
                    }>FEEDBACK</NavLink>
                    <NavLink to="/about" className={({ isActive }) =>
                        ` ${isActive ? "text-yellow-500" : "text-white"} `
                    }>PAYMENT</NavLink> */}

                </nav>
                <div className="flex items-center space-x-4 min-w-5 max-w-screen">
                    <form onSubmit={searchSubmitHandler} className="flex items-center min-w-5 border-b px-2 py-1  border-gray-300">
                        <button type="submit" aria-label="Search">
                            <IoSearch className="text-xl text-white" />
                        </button>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={keyword}
                            className="flex-grow bg-transparent border-none min-w-5 outline-none px-2 py-1 text-white"
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </form>
                    <NavLink to="/Cart">
                        <BsHandbag className="text-2xl text-white cursor-pointer" />
                    </NavLink>
                    <div className="relative z-10 max-w-10 min-w-10">
                        <img
                            src={avatar}
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full cursor-pointer"
                            onClick={handleToggle}
                        />
                        <div
                            className={`absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden transition-all duration-300 ease-in-out transform ${showOption ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                                }`}
                        >
                            {user && user._id ? (
                                user.role === 'admin' ? (
                                    <>
                                        <NavLink to="/admin/dashboard" onClick={() => setShowOption(false)} className="block px-4 py-2   text-black hover:text-green-500">Dashboard</NavLink>
                                        <NavLink to="/profile" onClick={() => setShowOption(false)} className="block px-4 py-2  text-black hover:text-green-500">Profile</NavLink>
                                        <NavLink to="/orders" onClick={() => setShowOption(false)} className="block px-4 py-2  text-black hover:text-green-500">Orders</NavLink>
                                        <div onClick={() => { handleLogout(); setShowOption(false); }} className="block px-4 py-2  text-black cursor-pointer hover:text-red-500">Logout</div>
                                    </>
                                ) : (
                                    <>
                                        <NavLink to="/profile" onClick={() => setShowOption(false)} className="block px-4 py-2 hover:bg-slate-100 text-slate-500 hover:text-green-500">Profile</NavLink>
                                        <NavLink to="/orders" onClick={() => setShowOption(false)} className="block px-4 py-2 hover:bg-slate-100 text-slate-500 hover:text-green-500">Orders</NavLink>
                                        <div onClick={() => { handleLogout(); setShowOption(false); }} className="block px-4 py-2 hover:bg-slate-100 text-slate-500 hover:text-red-500 cursor-pointer">Logout</div>
                                    </>
                                )
                            ) : (
                                <>
                                    <NavLink to="/login" onClick={() => setShowOption(false)} className="block px-4 py-2 hover:text-slate-500  text-black">Login</NavLink>
                                    <NavLink to="/register" onClick={() => setShowOption(false)} className="block px-4 py-2 hover:text-slate-500 text-black">Register</NavLink>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <div
                className={`md:hidden font-font3 fixed inset-0 bg-gradient-to-r from-custom-dark-teal to-custom-deep-green shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${toggle ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex flex-col p-4 space-y-4">
                    <div className='flex items-center justify-between'>
                        <div className="md:flex items-center space-x-4  ">
                            <h1 className=" md:block text-4xl font-extralight text-white font-abc">Hari Om</h1>
                        </div>
                        <div className="flex justify-end">
                            <RxCross2 className="text-3xl text-white" onClick={() => setToggle(false)} />
                        </div>
                    </div>
                    <NavLink to="/" onClick={() => setToggle(false)} className={({ isActive }) =>
                        ` ${isActive ? "flex items-center space-x-2 p-3 text-lg text-slate-200 underline rounded-md" : "flex items-center space-x-2 p-3 text-lg text-white rounded-md"} `
                    }>
                        Home
                    </NavLink>
                    <NavLink to="/products" onClick={() => setToggle(false)} className={({ isActive }) =>
                        ` ${isActive ? "flex items-center space-x-2 p-3 text-lg text-slate-200 underline rounded-md" : "flex items-center space-x-2 p-3 text-lg text-white rounded-md"} `
                    }>
                        Products
                    </NavLink>
                    <NavLink to="/about" onClick={() => setToggle(false)} className={({ isActive }) =>
                        ` ${isActive ? "flex items-center space-x-2 p-3 text-lg text-slate-200 underline rounded-md" : "flex items-center space-x-2 p-3 text-lg text-white rounded-md"} `
                    }>
                        About Us
                    </NavLink>
                    <NavLink to="/contact" onClick={() => setToggle(false)} className={({ isActive }) =>
                        ` ${isActive ? "flex items-center space-x-2 p-3 text-lg text-slate-200 underline rounded-md" : "flex items-center space-x-2 p-3 text-lg text-white rounded-md"} `
                    }>
                        Contact Us
                    </NavLink>
                </div>
            </div>
        </>
    );
};

export default Header;
