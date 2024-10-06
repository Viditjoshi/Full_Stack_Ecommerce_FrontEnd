import React, { Fragment, useEffect, useState } from 'react';
import logo from '../../../image/logoweb.jpg';
import userAvatar from '../../../image/Profile.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../slices/loginUserSlice';
import '../LoginRegister.css';
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

import Loader from '../../Loader/Loader';
import toast from 'react-hot-toast';
const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, user } = useSelector((state) => state.auth);
    const [User, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });
    const { name, email, password } = User;
    const [visible, setVisable] = useState(true)
    const [Avatar, setAvatar] = useState();
    const [AvatarPreview, setAvatarPreview] = useState(userAvatar);

    const registerSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('avatar', Avatar);
        dispatch(registerUser(formData));

    };


    const registerDataChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...User, [e.target.name]: e.target.value });
        }
    };

    useEffect(() => {
        if (error === null && user !== null) {
            navigate("/")
            toast.success("Login successfully...")
        } else if (error !== null && user === null) {
            toast.error(error)
        }
    }, [user, error])
    return (
        <Fragment>
            {loading ? <Loader /> : <div className="">
                <div className="h-screen flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className=" text-center text-2xl leading-9 tracking-tight title text-white">
                            Sign Up your account
                        </h2>
                    </div>

                    <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={registerSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-white">
                                    Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        name="name"
                                        placeholder='Enter Your Name'
                                        type="text"
                                        value={name}
                                        onChange={registerDataChange}
                                        required
                                        autoComplete="name"
                                        className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={registerDataChange}
                                        placeholder='Enter Your Email'
                                        required
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                        Password
                                    </label>
                                    <div className="flex items-center mt-2 relative">
                                        <input
                                            id="password"
                                            name="password"
                                            type={visible ? "password" : "text"}
                                            placeholder="Enter Your Password"
                                            value={password}
                                            onChange={registerDataChange}
                                            required
                                            autoComplete="current-password"
                                            className="block w-full rounded-md p-2 pr-10 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        <div className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-200 ease-in-out">
                                            {visible ? (
                                                <FaEyeSlash
                                                    className="w-5 h-5"
                                                    onClick={() => setVisable(false)}
                                                    aria-label="Hide password"
                                                />
                                            ) : (
                                                <FaRegEye
                                                    className="w-5 h-5"
                                                    onClick={() => setVisable(true)}
                                                    aria-label="Show password"
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>


                            </div>

                            <div className="flex flex-row md:gap-10 gap-2 justify-center items-center m-auto">
                                <div className="flex flex-row items-center justify-between">
                                    <img src={AvatarPreview} alt="" className="md:h-14 rounded-full md:w-14 h-12 w-14 " />
                                </div>
                                <div className="mt-2">
                                    <input
                                        name="avatar"
                                        type="file"
                                        onChange={registerDataChange}
                                        accept="image/*"
                                        required
                                        className="block w-full rounded-md border-0 bg-current text-gray-900 shadow-sm focus:ring-2 focus:ring-inset avatarinput focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-yellow-400 hover:bg-yellow-300 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Do you want to Login?{' '}
                            <NavLink to="/login" className="font-semibold leading-6 text-yellow-400 hover:text-yellow-300">
                                Login Now
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>
            }
        </Fragment>
    );
};

export default Register;
