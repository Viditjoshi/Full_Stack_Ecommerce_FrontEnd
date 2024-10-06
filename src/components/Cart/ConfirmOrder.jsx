import React, { Fragment } from 'react';
import CheckoutSteps from './CheckoutSteps';
import { useSelector } from 'react-redux';
import MetaData from '../Layouts/MetaData';
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

const ConfirmOrder = () => {
    const { shippinginfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const shippingCharges = subtotal > 1000 ? 0 : 200;
    const tax = subtotal * 0.18;
    const totalPrice = subtotal + tax + shippingCharges;
    const address = `${shippinginfo.address}, ${shippinginfo.city}, ${shippinginfo.state}, ${shippinginfo.pinCode}, ${shippinginfo.country}`;

    const processToPayment = () => {
        const data = { subtotal, shippingCharges, tax, totalPrice }
        sessionStorage.setItem('orderInfo', JSON.stringify(data));
        navigate('/process/payment')
    }
    return (
        <Fragment>
            <MetaData title="Confirm Order" />
            <CheckoutSteps activeStep={1} />

            <div className="flex flex-col lg:flex-row font-font3 justify-between items-start h-full w-[90%] mt-10 mb-10 mx-auto space-y-6 lg:space-y-0 lg:space-x-6">
                {/* Shipping Info and Cart Items Section */}
                <div className="rounded-lg p-6 w-full lg:w-[50%] bg-gray-800 shadow-lg">
                    <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-center text-white">Confirm Your Order</h2>

                    {/* Shipping Info Section */}
                    <div className="pb-4 mb-4 border-b border-gray-600">
                        <Typography variant="h6" className='text-white'>Shipping Info</Typography>
                        <div className="mt-2 space-y-2 text-white">
                            <div className="flex">
                                <p className="font-semibold mr-2">Name:</p>
                                <span>{user.name}</span>
                            </div>
                            <div className="flex">
                                <p className="font-semibold mr-2">Phone:</p>
                                <span>{shippinginfo.phoneNo}</span>
                            </div>
                            <div className="flex">
                                <p className="font-semibold mr-2">Address:</p>
                                <span>{address}</span>
                            </div>
                        </div>
                    </div>

                    {/* Cart Items Section */}
                    <div className="pb-4 mb-4 border-b border-gray-600">
                        <Typography variant="h6" className='text-white'>Your Cart Items</Typography>
                        <div className="mt-4 text-white">
                            {cartItems && cartItems.map((item, index) => (
                                <div key={index} className="flex items-center mb-4">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4 rounded" />
                                    <div className="flex-1">
                                        <Link to={`/product/${item.id}`} className="text-blue-500 hover:underline">
                                            {item.name}
                                        </Link>
                                        <div className="text-sm">
                                            {item.quantity} x {item.price} = <b>₹{item.quantity * item.price}</b>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Order Summary Section */}
                <div className="w-full lg:w-[40%] bg-gray-800 text-white rounded-lg p-6 shadow-lg">
                    <Typography variant="h6">Order Summary</Typography>
                    <div className="mt-4 space-y-2">
                        <div className="flex justify-between">
                            <p>Subtotal:</p>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <p>Shipping Charges:</p>
                            <span>₹{shippingCharges.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <p>GST (18%):</p>
                            <span>₹{tax.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="flex justify-between mt-4 border-t border-gray-600 pt-4">
                        <p className="text-lg font-semibold">Total:</p>
                        <span className="text-lg font-semibold">₹{totalPrice.toFixed(2)}</span>
                    </div>
                    <button onClick={processToPayment} className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300">
                        Proceed To Payment
                    </button>
                </div>
            </div>
        </Fragment>
    );
}

export default ConfirmOrder;
