import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CrateProduct, resetState } from '../../slices/AddProdcutSlice'; // Corrected function name
import { Button } from '@mui/material';
import MetaData from '../Layouts/MetaData';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Sidebar from './Sidebar';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const NewProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, success } = useSelector((state) => state.addProdcut);

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        'Gold Jewelry',
        'Silver Jewelry',
    ];

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        if (success) {
            toast.success('Product Created Successfully');
            navigate('/admin/dashboard');
            dispatch(resetState());
        }
    }, [dispatch, error, success, navigate]);

    // form submission
    const createProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set('name', name);
        myForm.set('price', price);
        myForm.set('description', description);
        myForm.set('category', category);
        myForm.set('Stock', Stock);

        images.forEach((image) => {
            myForm.append("images", image);
        });
        dispatch(CrateProduct({ myForm }));
    };

    const createProductImageChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };
    return (
        <Fragment>
            <MetaData title={`Create Product`} />
            <div className='flex flex-col md:flex-row w-full h-full bg-gray-100'>
                <div className='w-full md:w-[15%] bg-gray-800 '>
                    <Sidebar />
                </div>
                <div className='w-full md:w-[85%] bg-slate-100 p-6'>
                    <form
                        className='bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto'
                        encType='multipart/form-data'
                        onSubmit={createProductSubmitHandler}
                    >
                        <h1 className='text-2xl font-semibold text-gray-700 mb-6'>Create Product</h1>

                        <div className='flex items-center gap-2 mb-4'>
                            <SpellcheckIcon className='text-gray-500' />
                            <input
                                type='text'
                                placeholder='Product Name'
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>

                        <div className='flex items-center gap-2 mb-4'>
                            <AttachMoneyIcon className='text-gray-500' />
                            <input
                                type='number'
                                placeholder='Price'
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className='flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>

                        <div className='flex items-start gap-2 mb-4'>
                            <DescriptionIcon className='text-gray-500' />
                            <textarea
                                placeholder='Product Description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols={30}
                                rows={3}
                                className='flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                            ></textarea>
                        </div>

                        <div className='flex items-center gap-2 mb-4'>
                            <AccountTreeIcon className='text-gray-500' />
                            <select
                                onChange={(e) => setCategory(e.target.value)}
                                className='flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                            >
                                <option value=''>Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='flex items-center gap-2 mb-4'>
                            <StorageIcon className='text-gray-500' />
                            <input
                                type='number'
                                placeholder='Stock'
                                required
                                value={Stock}
                                onChange={(e) => setStock(e.target.value)}
                                className='flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>

                        <div className='flex items-center gap-2 mb-4'>
                            <input
                                type='file'
                                name='avatar'
                                accept='image/*'
                                multiple
                                onChange={createProductImageChange}
                                className='flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>

                        <div className='flex flex-wrap gap-4 mb-6'>
                            {imagesPreview.map((image, index) => (
                                <img
                                    src={image}
                                    key={index}
                                    alt='Prodcut Preview'
                                    className='w-24 h-24 rounded object-cover border'
                                />
                            ))}
                        </div>

                        <Button
                            type='submit'
                            disabled={success ? true : false}
                            className={`w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {success ? 'Creating...' : 'Create'}
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default NewProduct;
