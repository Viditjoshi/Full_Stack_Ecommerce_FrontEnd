import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartThnk, removeFromCart } from '../../slices/CartSlice';
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { loading, user, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    // Calculate the gross total
    const grossTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return;
        }
        dispatch(cartThnk({ id, quantity: newQty }));
    };

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (newQty < 1) {
            return;
        }
        dispatch(cartThnk({ id, quantity: newQty }));
    };

    const Chanckouthandler = () => {
        if (error === null && user !== null) {
            navigate("/shipping")
        } else if (error !== null && user === null) {
            navigate("/login")
        }
    }
    return (
        <Fragment>
            {cartItems.length === 0 ? (
                <div className='h-screen flex justify-center pb-28 items-center'>
                    <MdOutlineRemoveShoppingCart className='text-white size-40' />
                    <div>
                        <p className='text-white text-3xl'>No Products In Your Cart</p>
                        <Link to="/products">
                            <h1 className="text-white text-xl hover:underline text-center pt-7">Add Products</h1>
                        </Link>
                    </div>
                </div>
            ) : (
                <section className="bg-transparent py-8 antialiased md:h-full w-full md:py-16">
                    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                        <h2 className="text-xl font-semibold dark:text-white sm:text-2xl">Shopping Cart</h2>

                        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                                <div className="space-y-6">
                                    {cartItems && cartItems.map((item) => (
                                        <div className="rounded-lg border border-gray-200 p-4 shadow-sm md:p-6" key={item.id}>
                                            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                                <img className="hidden h-20 w-20 dark:block" src={item.image} alt={item.name} />

                                                <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                                                <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                    <div className="flex items-center text-white">
                                                        <button
                                                            type="button"
                                                            className="p-3 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                                                            onClick={() => decreaseQuantity(item.id, item.quantity)}
                                                        >
                                                            -
                                                        </button>
                                                        <input
                                                            type="text"
                                                            value={item.quantity}
                                                            readOnly
                                                            className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 dark:text-white"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="p-3 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                                                            onClick={() => increaseQuantity(item.id, item.quantity, item.Stock)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <div className="text-end md:order-4 md:w-32">
                                                        <p className="text-base font-bold text-gray-900 dark:text-white">₹{item.price * item.quantity}</p>
                                                    </div>
                                                </div>

                                                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                                    <Link to={`/product/${item.id}`} className="text-base font-medium text-gray-900 hover:underline dark:text-white">{item.name}</Link>
                                                    <div className="flex items-center gap-4">
                                                        <button
                                                            type="button"
                                                            className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                                                            onClick={() => dispatch(removeFromCart(item.id))}
                                                        >
                                                            <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L17.94 6M18 18L6.06 6" />
                                                            </svg>
                                                            Remove
                                                        </button>
                                                    </div>

                                                </div>

                                            </div>


                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='pt-10'>
                                <div className="flex justify-end border-t-2 lg:border-none">
                                    <p className="text-2xl font-bold text-white pt-4 pb-3">Gross Total: ₹{grossTotal.toFixed(2)}</p>

                                </div>

                                <p onClick={Chanckouthandler} className="flex bg-blue-600 hover:bg-blue-700  w-full items-center justify-center rounded-lg bg-bl px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700">
                                    Proceed to Checkout
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </Fragment>
    );
};

export default Cart;
