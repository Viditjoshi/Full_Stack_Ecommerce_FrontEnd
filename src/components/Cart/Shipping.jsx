import { Fragment, useState, Suspense, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveShippinginfo } from '../../slices/CartSlice';
import MetaData from '../Layouts/MetaData';
import { MdOutlineLocationCity, MdOutlinePinDrop, MdPublic } from "react-icons/md";
import { FaPhoneAlt, FaHome } from "react-icons/fa";
import { AiFillBank } from "react-icons/ai";
import CheckoutSteps from './CheckoutSteps';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Country = lazy(() => import("country-state-city").then(module => ({ default: module.Country })));
const State = lazy(() => import("country-state-city").then(module => ({ default: module.State })));
const City = lazy(() => import("country-state-city").then(module => ({ default: module.City })));

const Shipping = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { shippinginfo } = useSelector((state) => state.cart);

    const [formData, setFormData] = useState({
        address: shippinginfo.address || '',
        city: shippinginfo.city || '',
        pinCode: shippinginfo.pinCode || '',
        phoneNo: shippinginfo.phoneNo || '',
        state: shippinginfo.state || '',
        country: shippinginfo.country || ''
    });

    const { address, city, pinCode, phoneNo, state, country } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const shippingSubmit = (e) => {
        e.preventDefault();
        if (phoneNo.length !== 10) {
            toast.error("Phone Number Should Be 10 Digits");
            return;
        }
        dispatch(saveShippinginfo({ address, city, pinCode, phoneNo, state, country }));
        navigate("/order/confirm");
    };

    const countryList = Country.getAllCountries();
    const stateList = country ? State.getStatesOfCountry(country) : [];
    const cityList = state ? City.getCitiesOfState(country, state) : [];

    return (
        <Fragment>
            <MetaData title={'Shipping Details'} />
            <CheckoutSteps activeStep={0} />

            <div className='flex justify-center items-center min-h-screen w-full font-font3'>
                <div className='w-full max-w-2xl p-8 bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg'>
                    <h1 className='text-3xl font-bold mb-8 text-center text-white'>Shipping Details</h1>
                    <form className='space-y-6' encType='multipart/form-data' onSubmit={shippingSubmit}>

                        <div className='flex items-center border-b border-gray-300 py-2 transition-all duration-300 focus-within:border-white'>
                            <FaHome className='mr-3 text-white size-6' />
                            <input
                                type="text"
                                name="address"
                                placeholder='Address'
                                required
                                value={address}
                                onChange={handleChange}
                                className='appearance-none bg-transparent border-none w-full text-white placeholder-gray-300 py-1 px-2 leading-tight focus:outline-none focus:ring-0'
                            />
                        </div>

                        <div className='flex items-center border-b border-gray-300 py-2 transition-all duration-300 focus-within:border-white'>
                            <MdOutlinePinDrop className='mr-3 text-white size-6' />
                            <input
                                type="number"
                                name="pinCode"
                                placeholder='Pin Code'
                                required
                                value={pinCode}
                                onChange={handleChange}
                                className='appearance-none bg-transparent border-none w-full text-white placeholder-gray-300 py-1 px-2 leading-tight focus:outline-none focus:ring-0'
                            />
                        </div>

                        <div className='flex items-center border-b border-gray-300 py-2 transition-all duration-300 focus-within:border-white'>
                            <FaPhoneAlt className='mr-3 text-white size-6' />
                            <input
                                type="text"
                                name="phoneNo"
                                placeholder='Phone Number'
                                required
                                value={phoneNo}
                                onChange={handleChange}
                                className='appearance-none bg-transparent border-none w-full text-white placeholder-gray-300 py-1 px-2 leading-tight focus:outline-none focus:ring-0'
                            />
                        </div>

                        <div className='flex items-center border-b border-gray-300 py-2 transition-all duration-300 focus-within:border-white'>
                            <MdPublic className='mr-3 text-white size-6' />
                            <select
                                name="country"
                                required
                                value={country}
                                onChange={handleChange}
                                className='appearance-none bg-transparent border-none w-full text-white placeholder-gray-300 py-1 px-2 leading-tight focus:outline-none focus:ring-0'
                            >
                                <option value="">Country</option>
                                {countryList.map((item) => (
                                    <option value={item.isoCode} key={item.isoCode} className='text-black bg-white'>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {country && (
                            <div className='flex items-center border-b border-gray-300 py-2 transition-all duration-300 focus-within:border-white'>
                                <AiFillBank className='mr-3 text-white size-6' />
                                <select
                                    name="state"
                                    required
                                    value={state}
                                    onChange={handleChange}
                                    className='appearance-none bg-transparent border-none w-full text-white placeholder-gray-300 py-1 px-2 leading-tight focus:outline-none focus:ring-0'
                                >
                                    <option value="">State</option>
                                    {stateList.map((item) => (
                                        <option value={item.isoCode} key={item.isoCode} className='text-black bg-white'>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {state && (
                            <div className='flex items-center border-b border-gray-300 py-2 transition-all duration-300 focus-within:border-white'>
                                <MdOutlineLocationCity className='mr-3 text-white size-6' />
                                <select
                                    name="city"
                                    required
                                    value={city}
                                    onChange={handleChange}
                                    className='appearance-none bg-transparent border-none w-full text-white placeholder-gray-300 py-1 px-2 leading-tight focus:outline-none focus:ring-0'
                                >
                                    <option value="">City</option>
                                    {cityList.map((item) => (
                                        <option value={item.name} key={item.name} className='text-black bg-white'>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <button
                            type="submit"
                            className='w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:shadow-outline'
                            disabled={!country || !state || !city}
                        >
                            Continue
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

const AppWrapper = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Shipping />
        </Suspense>
    );
};

export default AppWrapper;
