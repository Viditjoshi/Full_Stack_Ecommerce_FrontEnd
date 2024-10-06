import { Fragment, useEffect, useState } from 'react';
import logo from '../../../image/logoweb.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import { resetPass } from '../../../slices/UpdateProfile';
import toast from 'react-hot-toast';


const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams();
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const { loading, error, message, isUpdated } = useSelector(state => state.profile);


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);
        dispatch(resetPass({ formData, token }));
    };
    useEffect(() => {
        if (isUpdated === true && message.user) {
            navigate("/")
            toast.success("Password Changed Successfully...")
        }
    }, [message, navigate, isUpdated])

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
                            <img src={logo} alt="Your Company" className="mx-auto h-20 w-auto" />
                            <h2 className="mt-3 text-center text-2xl leading-9 tracking-tight text-gray-900">
                                Change Your Password
                            </h2>
                        </div>
                        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                            New Password
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            name="Password"
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            autoComplete="current-password"
                                            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                            Conform Password
                                        </label>

                                    </div>
                                    <div className="mt-2">
                                        <input
                                            name="conformPassword"
                                            type="password"
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setconfirmPassword(e.target.value)}
                                            autoComplete="current-password"
                                            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-yellow-400 hover:bg-yellow-300 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Chnage Password
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

export default ResetPassword
