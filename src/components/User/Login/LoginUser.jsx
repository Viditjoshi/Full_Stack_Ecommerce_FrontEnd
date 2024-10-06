import React, { Fragment, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../slices/loginUserSlice';
import { useNavigate } from 'react-router-dom';
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import toast from 'react-hot-toast';
import Loader from '../../Loader/Loader';

const LoginUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisable] = useState(true)

    const { loading, user, error } = useSelector((state) => state.auth);
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    }
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
            {loading ? <Loader /> :
                <div className=' h-screen'>
                    <div className="flex pt-28 flex-1 flex-col justify-center px-6">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="mt-10 text-center text-2xl title leading-9 tracking-tight text-white">
                                Sign in to your account
                            </h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form onSubmit={handleLoginSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            placeholder='Enter email address'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            autoComplete="email"
                                            className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                            Password
                                        </label>
                                        <div className="text-sm">
                                            <a href="/password/forgot" className="font-semibold text-yellow-400 hover:text-yellow-300">
                                                Forgot password?
                                            </a>
                                        </div>
                                    </div>
                                    <div className="mt-2">


                                        <div className="flex items-center mt-2 relative">
                                            <input
                                                id="password"
                                                name="password"
                                                type={visible ? "password" : "text"}
                                                placeholder="Enter Your Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                autoComplete="current-password"
                                                className="block w-full rounded-md p-2 pr-10 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-200 ease-in-out">
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

                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-yellow-400 hover:bg-yellow-300 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </form>

                            <p className="mt-10 text-center text-sm text-gray-500">
                                Are You Registered?{' '}
                                <NavLink to="/register" className="font-semibold leading-6 text-yellow-400 hover:text-yellow-300">
                                    Go To Register
                                </NavLink>
                            </p>

                        </div>
                    </div>
                </div >
            }
        </Fragment >
    );
};

export default LoginUser;
