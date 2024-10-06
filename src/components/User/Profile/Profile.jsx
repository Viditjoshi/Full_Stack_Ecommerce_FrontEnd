import React, { Fragment, useEffect } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import MetaData from '../../Layouts/MetaData';
import Loader from '../../Loader/Loader';
import { useSelector } from 'react-redux';

const Profile = () => {
    const { user, loading } = useSelector(state => state.auth);
    return (
        <Fragment>
            {
                loading ? (
                    <Loader />
                ) : (
                    <Fragment>
                        <MetaData title={user.name} />
                        <div className="  flex flex-col md:flex-row justify-center gap-5 pt-5rem] items-center md:items-center h-[100vh] p-4 md:p-6">
                            <div className="w-full md:w-1/2 flex flex-col justify-center items-center gap-10 mb-10 md:mb-0">
                                <h1 className="text-4xl text-center text-white font-font1">My Profile</h1>
                                <img src={user.avatar.url} className="w-40 h-40 md:w-[20vw] md:h-[20vw] object-cover rounded-full" alt={user.name} />
                                <Link to="/me/update" className="bg-white text-black py-2 px-10 rounded">Edit Profile</Link>
                            </div>
                            <div className="w-full md:w-1/2 flex flex-col justify-center gap-10 items-start md:items-start">
                                <div className='items-center justify-center gap-6 flex'>
                                    <h4 className="text-xl md:text-2xl text-white font-font1">Name : </h4>
                                    <p className='text-xl md:text-2xl text-white ' >{user.name}</p>
                                </div>
                                <div className='flex gap-3 items-center text-white'>
                                    <h4 className="text-xl md:text-2xl text-white font-font1">Email : </h4>
                                    <pc className="text-xl md:text-2xl">{user.email}</pc>
                                </div>
                                <div className='flex items-center justify-center gap-10 text-white'>
                                    <h4 className="text-2xl text-white font-font1">Joined On :</h4>
                                    <p className='text-xl'>{String(user.createdAt).substr(0, 10)}</p>
                                </div>
                                <div className="flex flex-col md:flex-row gap-5 m-auto">
                                    <Link to="/orders" className="bg-white text-black py-2 px-10 rounded text-center">My Orders</Link>
                                    <Link to="/password/update" className="bg-white text-black py-2 px-10 rounded">Change Password</Link>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )
            }
        </Fragment>
    );
}

export default Profile;
