import React, { Fragment, useEffect, useState } from 'react';
import logo from '../../../image/logoweb.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import { updateProfile, resetUpdateState } from '../../../slices/UpdateProfile';
import { loadUser } from '../../../slices/loginUserSlice'; // Import loadUser action
import toast from 'react-hot-toast';

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    const { isUpdated, loading, error } = useSelector(state => state.profile);
    const [userDetails, setUserDetails] = useState({
        name: user.name,
        email: user.email,
    });
    const { name, email } = userDetails;
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState(user.avatar.url);

    const handleInputChange = (e) => {
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
            setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('avatar', avatar);
        dispatch(updateProfile(formData));
    };

    useEffect(() => {
        if (isUpdated) {
            dispatch(loadUser()); // Reload user data
            navigate('/profile');
            dispatch(resetUpdateState());
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
                <div className="mb-32 mt-10">
                    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                            <h2 className="text-center text-2xl pb-5 leading-9 tracking-tight text-white">
                                Update Your Profile
                            </h2>
                        </div>
                        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-white">
                                        Enter New Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={name}
                                            placeholder='Enter Name'
                                            onChange={handleInputChange}
                                            required
                                            autoComplete="name"
                                            className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                        Enter New Email
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={email}
                                            placeholder='Enter Email'
                                            onChange={handleInputChange}
                                            required
                                            autoComplete="email"
                                            className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-row gap-4 justify-center items-center m-auto">
                                    <div className="flex flex-row items-center justify-between">
                                        <img src={avatarPreview} alt="Avatar Preview" className="h-14 w-14 rounded-full" />
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            name="avatar"
                                            type="file"
                                            onChange={handleInputChange}
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
                                        Update Profile
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default UpdateProfile;
