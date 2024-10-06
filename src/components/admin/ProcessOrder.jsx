import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import toast from 'react-hot-toast';
import MetaData from '../Layouts/MetaData';

import { Button, Typography } from '@mui/material';
import { OrderDetails, OrderReset, UpdateOrder } from '../../slices/MyOrderSlice';

const ProcessOrder = () => {
    const { error, loading, orders, isUpdated } = useSelector((state) => state.myOrders);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [status, setStatus] = useState('');

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set('status', status);

        dispatch(UpdateOrder({ id, myForm }));
    };

    useEffect(() => {
        if (error || !id) {
            toast.error(error);
        }
        if (id) {
            dispatch(OrderDetails({ id }));
        }
        if (isUpdated) {
            toast.success("Order Updated")
            dispatch(OrderReset())
        }

    }, [dispatch, error, id, isUpdated]);

    return (
        <div className="flex flex-col md:flex-row w-full h-full">
            {/* Sidebar Section */}
            <div className="w-full md:w-1/5 bg-gray-800">
                <Sidebar />
            </div>

            <div className="flex-1">
                <div className="h-full flex flex-col lg:flex-row items-center justify-center p-6 space-y-8 lg:space-y-0 lg:space-x-8">
                    {/* Order Details Section */}
                    <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-lg p-8 animate-fadeIn">
                        <h1 className="md:text-3xl text-xl font-bold mb-10">
                            Order #{orders && orders._id}
                        </h1>

                        {/* Shipping Info Section */}
                        <h2 className="text-2xl font-semibold mb-4">
                            Shipping Info
                        </h2>
                        <div className="mb-6 text-sm">
                            <div className="flex items-center mb-3">
                                <p className="w-32 font-medium">Name:</p>
                                <span>{orders?.user?.name}</span>
                            </div>
                            <div className="flex items-center mb-3">
                                <p className="w-32 font-medium">Phone:</p>
                                <span>{orders?.shippingInfo?.phoneNo}</span>
                            </div>
                            <div className="flex items-center">
                                <p className="w-32 font-medium">Address:</p>
                                <span>
                                    {orders?.shippingInfo &&
                                        `${orders.shippingInfo.address}, ${orders.shippingInfo.city}, ${orders.shippingInfo.state}, ${orders.shippingInfo.pinCode}, ${orders.shippingInfo.country}`}
                                </span>
                            </div>
                        </div>

                        {/* Payment Status */}
                        <h2 className="text-xl font-semibold mb-4">
                            Payment
                        </h2>
                        <div className="mb-6">
                            <p className={`font-medium text-lg ${orders?.paymentInfo?.status === 'succeeded' ? 'text-green-600' : 'text-red-600'}`}>
                                {orders?.paymentInfo?.status === 'succeeded' ? 'Paid' : 'Not Paid'}
                            </p>
                            <p>Amount : {orders.totalPrice}</p>
                        </div>
                        {/* Payment Status */}
                        <h2 className="text-xl font-semibold mb-4">
                            Order Status
                        </h2>
                        <div className="mb-6">
                            <p className={`font-medium text-lg ${orders?.orderStatus?.status !== 'delivered' ? 'text-red-600' : 'text-green-600'}`}>
                                {orders.orderStatus && orders.orderStatus}
                            </p>
                        </div>
                        {/* Order Items */}
                        <h2 className="text-xl font-semibold mb-4">
                            Order Items
                        </h2>
                        <div className="space-y-4">
                            {orders?.orderItems && orders.orderItems.map((item) => (
                                <div key={item.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105">
                                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg mr-4" />
                                    <Link to={`/product/${item.id}`} className="flex-1 text-blue-500 hover:text-blue-700 font-medium">
                                        {item.name}
                                    </Link>
                                    <span className="font-medium">
                                        {item.quantity} x ₹{item.price} = <b>₹{item.price * item.quantity}</b>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Update Order Status Section */}
                    <div className="w-full lg:w-1/2 bg-white text-black rounded-lg p-6 shadow-lg">
                        <form className="space-y-4" encType="multipart/form-data" onSubmit={updateOrderSubmitHandler}>
                            <div className="mb-4">

                                <label className="block mb-2 text-black text-2xl">Change Order Status</label>
                                <select className="w-full p-2 rounded border-2 border-black" onChange={(e) => setStatus(e.target.value)}>
                                    <option value="">Select Status</option>
                                    {orders.orderStatus === "Processing" && (<option value="Shipped">Shipped</option>)}
                                    {orders.orderStatus === "Shipped" && (<option className='text-green-500' value="Delivered">Delivered</option>)}

                                </select>

                            </div>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={`w-full py-2 ${loading || status === '' ? 'bg-gray-500 cursor-not-allowed text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                                disabled={loading || status === ''}
                            >
                                Update Order
                            </Button>


                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProcessOrder;
