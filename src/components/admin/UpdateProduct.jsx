import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateProductThank, resetState } from '../../slices/UpdateProductSlice';
import { getProductDetail } from '../../slices/productDetailSlice';
import { Button } from '@mui/material';
import MetaData from '../Layouts/MetaData';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Sidebar from './Sidebar';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { newid } = useParams();

    const { product, error } = useSelector((state) => state.product);
    const { loading, error: updateError, success } = useSelector((state) => state.UpdateProduct);

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [Stock, setStock] = useState(0);
    const [OldImages, setOldImages] = useState([]);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = ['Gold Jewelry', 'Silver Jewelry'];

    useEffect(() => {
        if (product && product._id !== newid) {
            dispatch(getProductDetail(newid));
        } else {
            setName(product.name || '');
            setDescription(product.description || '');
            setPrice(product.price || 0);
            setCategory(product.category || '');
            setStock(product.Stock || 0);
            setOldImages(product.images || []);
        }
        if (error) {
            toast.error(error);
        }
        if (updateError) {
            toast.error(updateError);
            dispatch(resetState());
        }

        if (success) {
            toast.success('Product Updated Successfully');
            navigate('/admin/dashboard');
            dispatch(resetState());
        }
    }, [dispatch, error, product, newid, success, updateError, navigate]);

    const UpdateProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set('name', name);
        myForm.set('price', price);
        myForm.set('description', description);
        myForm.set('category', category);
        myForm.set('Stock', Stock);

        // Check if new images are added; if not, use old images
        if (images.length > 0) {
            images.forEach((image) => {
                myForm.append('images', image);
            });
        } else {
            OldImages.forEach((image) => {
                myForm.append('images', image.url); // Assuming old images are stored with a `url` field
            });
        }

        dispatch(UpdateProductThank({ myForm, id: newid }));
    };

    const UpdateProductImageChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

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
            <MetaData title={`Update Product`} />
            <div className='flex flex-col md:flex-row w-full h-full bg-gray-100'>
                <div className='w-full md:w-[15%] bg-gray-800'>
                    <Sidebar />
                </div>
                <div className='w-full md:w-[85%] bg-slate-100 p-6'>
                    <form
                        className='bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto'
                        encType='multipart/form-data'
                        onSubmit={UpdateProductSubmitHandler}
                    >
                        <h1 className='text-2xl font-semibold text-gray-700 mb-6'>Update Product</h1>

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
                                value={category}
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

                        <div className='flex overflow-hidden gap-2 mb-4'>
                            <input
                                type='file'
                                name='avatar'
                                accept='image/*'
                                multiple
                                onChange={UpdateProductImageChange}
                                className='flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>

                        <div className='flex flex-wrap gap-4 mb-6'>
                            {OldImages && OldImages.map((image, index) => (
                                <img
                                    src={image.url}
                                    key={index}
                                    alt='Old Product Preview'
                                    className='w-24 h-24 rounded object-cover border'
                                />
                            ))}
                        </div>

                        <div className='flex flex-wrap gap-4 mb-6'>
                            {imagesPreview.map((image, index) => (
                                <img
                                    src={image}
                                    key={index}
                                    alt='Product Preview'
                                    className='w-24 h-24 rounded object-cover border'
                                />
                            ))}
                        </div>

                        <Button
                            type='submit'
                            disabled={loading}
                            className={`w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Updating...' : 'Update'}
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateProduct;
