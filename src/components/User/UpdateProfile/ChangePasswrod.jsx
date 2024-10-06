import React, { Fragment, useEffect, useState } from 'react';
import logo from '../../../image/logoweb.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import { updatePassword } from '../../../slices/UpdateProfile';
import toast from 'react-hot-toast';

const ChangePasswrod = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [oldPassword, setoldPassword] = useState('')
    const [newPassword, setnewPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const { loading, error, isUpdated } = useSelector((state) => state.profile);


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('oldPassword', oldPassword)
        formData.set('newPassword', newPassword);
        formData.set('confirmPassword', confirmPassword);
        dispatch(updatePassword(formData));
    };
    useEffect(() => {
        if (isUpdated) {
            navigate('/profile');
            toast.success("Password updated successfully")
        }
    }, [isUpdated, navigate, dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <div className="pt-20">
                    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="mt-3 text-center text-2xl leading-9 tracking-tight text-white font-font3">
                                Update Your Password
                            </h2>
                        </div>
                        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                            Old Password
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            name="Oldpassword"
                                            type="password"
                                            required
                                            value={oldPassword}
                                            onChange={(e) => setoldPassword(e.target.value)}
                                            autoComplete="current-password"
                                            placeholder='Enter Your Old Password'
                                            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-950 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                            New Password
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            name="newPassword"
                                            type="password"
                                            required
                                            value={newPassword}
                                            onChange={(e) => setnewPassword(e.target.value)}
                                            autoComplete="current-password"
                                            placeholder='Enter New Password'
                                            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-950 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                            Conform Password
                                        </label>

                                    </div>
                                    <div className="mt-2">
                                        <input
                                            name="conformPassword"
                                            type="password"
                                            required
                                            value={confirmPassword}
                                            placeholder='Enter Confirm Password'
                                            onChange={(e) => setconfirmPassword(e.target.value)}
                                            autoComplete="current-password"
                                            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-950 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-yellow-400 hover:bg-yellow-300 px-3 py-2.5 text-sm font-semibold leading-6 text-white hover:text-redk-700 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Chnage Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default ChangePasswrod
