import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import { ForgotPass } from '../../../slices/UpdateProfile';
import toast from 'react-hot-toast';
const ForgotPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, loading, message } = useSelector(state => state.profile)
    const [email, setEmail] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('email', email)
        dispatch(ForgotPass(formData));
    };

    useEffect(() => {
        if (message) {
            toast.success(message)
        }
    }, [navigate, message]);
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <div className="pt-20">
                    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="mt-3 text-center text-2xl leading-9 tracking-tight text-white">
                                Forgot Password
                            </h2>
                        </div>
                        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form onSubmit={handleSubmit} className="space-y-6">

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            placeholder='Enter Email Address'
                                            autoComplete="email"
                                            className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-yellow-400 hover:bg-yellow-300 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Send Email
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default ForgotPassword
