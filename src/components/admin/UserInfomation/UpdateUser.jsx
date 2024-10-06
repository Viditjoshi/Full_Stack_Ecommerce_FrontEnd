import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import MetaData from '../../Layouts/MetaData';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import Sidebar from './../Sidebar';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { GetSingleUserDetail, UpdateUserRole, resetUserState } from '../../../slices/UserInfo';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import Loader from '../../Loader/Loader';

const UpdateUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { loading, singleUserDetail, error, isUpdated, UpdateLoading } = useSelector((state) => state.UserListAdmin);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(resetUserState());
        }

        if (isUpdated) {
            toast.success('User updated successfully');
            navigate('/admin/users');
            dispatch(resetUserState());
        }

        if (id) {
            dispatch(GetSingleUserDetail({ id }));
        }
    }, [dispatch, error, isUpdated, id, navigate]);

    useEffect(() => {
        if (singleUserDetail) {
            setName(singleUserDetail.name);
            setEmail(singleUserDetail.email);
            setRole(singleUserDetail.role);
        }
    }, [singleUserDetail]);

    const UpdateUserSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set('name', name);
        myForm.set('email', email);
        myForm.set('role', role);

        dispatch(UpdateUserRole({ id, myForm }));
    };

    return (
        <Fragment>
            <MetaData title={`Update User`} />
            <div className='flex flex-col md:flex-row w-full h-full bg-gray-100'>
                <div className='w-full md:w-[15%] bg-gray-800'>
                    <Sidebar />
                </div>
                {loading ? (
                    <Loader />
                ) : (
                    <div className='w-full md:w-[85%] bg-slate-100 p-6'>
                        <form
                            className='bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto'
                            encType='multipart/form-data'
                            onSubmit={UpdateUserSubmitHandler}
                        >
                            <h1 className='text-2xl font-semibold text-gray-700 mb-6'>Update User</h1>

                            <div className='flex items-center gap-2 mb-4'>
                                <PersonIcon className='text-gray-500' />
                                <input
                                    type='text'
                                    placeholder='Name'
                                    value={name}
                                    readOnly
                                    className='flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                                />
                            </div>

                            <div className='flex items-center gap-2 mb-4'>
                                <MarkEmailReadIcon className='text-gray-500' />
                                <input
                                    type='email'
                                    placeholder='Email Address'
                                    value={email}
                                    readOnly
                                    className='flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                                />
                            </div>

                            <div className='flex items-center gap-2 mb-4'>
                                <AdminPanelSettingsIcon className='text-gray-500' />
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className='flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                                >
                                    <option value=''>Choose Role</option>
                                    <option value='admin'>Admin</option>
                                    <option value='user'>User</option>
                                </select>
                            </div>

                            <Button
                                type='submit'
                                disabled={UpdateLoading || role === ''}
                                className={`w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 ease-in-out ${UpdateLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {UpdateLoading ? 'Updating...' : 'Update'}
                            </Button>
                        </form>
                    </div>
                )}
            </div>
        </Fragment>
    );
}

export default UpdateUser;
