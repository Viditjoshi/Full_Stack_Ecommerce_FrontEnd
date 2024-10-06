import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import toast from 'react-hot-toast';
import MetaData from '../Layouts/MetaData';
import { Typography } from '@mui/material';
import { OrderDetails } from '../../slices/MyOrderSlice';

const SingleOrderDetail = () => {
    const { error, loading, orders } = useSelector((state) => state.myOrders);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (error || !id) {
            toast.error(error);
            navigate("/orders")
        }
        if (id) {
            dispatch(OrderDetails({ id }));

        }
    }, []);

    return (
        <Fragment>
            <MetaData title={`OrderDetails`} />
            {loading ? (
                <Loader />
            ) : (
                <div className="min-h-screen  flex items-center justify-center p-6">
                    <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 animate-fadeIn">
                        <h1 className="md:text-3xl font-bold mb-10 text-wrap text-xl ">
                            Order #{orders && orders._id}
                        </h1>

                        {/* Shipping Info Section */}
                        <h1 className="text-2xl font-semibold mb-4">
                            Shipping Info
                        </h1>
                        <div className="mb-6 font-font3">
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
                        <Typography component="h2" className="text-xl font-semibold mb-4">
                            Payment
                        </Typography>
                        <div className="mb-6">
                            <p className={`font-medium text-lg ${orders?.paymentInfo?.status === "succeeded" ? "text-green-600" : "text-red-600"}`}>
                                {orders?.paymentInfo?.status === "succeeded" ? "Paid" : "Not Paid"}
                            </p>
                        </div>

                        {/* Order Items */}
                        <Typography component="h2" className="text-xl font-semibold mb-4">
                            Order Items
                        </Typography>
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
                </div>
            )}
        </Fragment>
    );
}

export default SingleOrderDetail;
