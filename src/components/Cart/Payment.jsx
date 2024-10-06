import React, { Fragment, useRef } from 'react';
import CheckoutSteps from './CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../Layouts/MetaData';
import toast from 'react-hot-toast';
import { Typography } from '@mui/material';
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { CiCreditCard1 } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../slices/OrderSlice';

const Payment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    const PayBtn = useRef(null);
    const dispatch = useDispatch();
    const { shippinginfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    const elements = useElements();
    const stripe = useStripe();
    const navigate = useNavigate();

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    };
    const order = {
        shippingInfo: shippinginfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        PayBtn.current.disabled = true;

        try {
            const config = {
                headers: { "content-type": "application/json" }
            };
            const { data } = await axios.post("/api/v1/payment/process", paymentData, config);
            const client_secret = data.client_secret;
            if (!stripe || !elements) return;
            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippinginfo.address,
                            city: shippinginfo.city,
                            state: shippinginfo.state,
                            country: shippinginfo.country,
                        }
                    }
                }
            });
            if (result.error) {
                PayBtn.current.disabled = false;
                toast.error(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }
                    dispatch(createOrder({ order }))
                    navigate("/success");
                } else {
                    toast.error("There's some issue while processing payment");
                }
            }
        } catch (e) {
            PayBtn.current.disabled = false;
            toast.error(e.response.data.message);
        }
    };

    return (
        <Fragment>
            <MetaData title="Payment" />
            <CheckoutSteps activeStep={2} />
            <div className="flex items-center justify-center min-h-full pt-12 pb-20 bg-opacity-50">
                <div className="relative w-full max-w-md p-8 bg-white shadow-lg rounded-lg backdrop-blur-md border border-gray-200">
                    <form onSubmit={submitHandler} className="space-y-6">
                        <Typography className="text-2xl font-bold text-gray-800 mb-6">Payment Information</Typography>

                        <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50 p-3 transition duration-300 ease-in-out hover:border-blue-400 focus-within:border-blue-400">
                            <CiCreditCard1 className="text-gray-600 text-2xl mr-3" />
                            <CardNumberElement className="w-full outline-none text-gray-700 placeholder-gray-500" placeholder="Card Number" />
                        </div>

                        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 justify-around">
                            <div className="flex w-full items-center border border-gray-300 rounded-lg bg-gray-50 p-3 transition duration-300 ease-in-out hover:border-blue-400 focus-within:border-blue-400">
                                <CiCreditCard1 className="text-gray-600 text-2xl mr-3" />
                                <CardExpiryElement className="w-full outline-none text-gray-700 placeholder-gray-500" placeholder="MM/YY" />
                            </div>

                            <div className="flex w-full justify-center items-center border border-gray-300 rounded-lg bg-gray-50 p-3 transition duration-300 ease-in-out hover:border-blue-400 focus-within:border-blue-400">
                                <CiCreditCard1 className="text-gray-600 text-2xl mr-3" />
                                <CardCvcElement className="w-full outline-none text-gray-700 placeholder-gray-500" placeholder="CVC" />
                            </div>
                        </div>

                        <input
                            type="submit"
                            value={`Pay - $${orderInfo && orderInfo.totalPrice}`}
                            ref={PayBtn}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer font-semibold"
                        />
                    </form>
                </div>

            </div>
        </Fragment>
    );
}

export default Payment;
