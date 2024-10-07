import { useEffect, useState, Suspense, lazy } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import WebFont from 'webfontloader';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import store from './store';
import { loadUser } from '../src/slices/loginUserSlice';
import Loader from './components/Loader/Loader';

// Dynamically import components
const Header = lazy(() => import('./components/Layouts/Header/Header'));
const Footer = lazy(() => import('./components/Layouts/Footer/Footer'));
const Home = lazy(() => import('./components/Home/Home'));
const ProductDetail = lazy(() => import('./components/Product/ProductDetail'));
const Products = lazy(() => import('./components/Product/Products'));
const LoginUser = lazy(() => import('./components/User/Login/LoginUser'));
const Register = lazy(() => import('./components/User/Register/Register'));
const Profile = lazy(() => import('./components/User/Profile/Profile'));
const UpdateProfile = lazy(() => import('./components/User/UpdateProfile/UpdateProfile'));
const ChangePassword = lazy(() => import('./components/User/UpdateProfile/ChangePasswrod'));
const ForgotPassword = lazy(() => import('./components/User/forgotPassword/ForgotPassword'));
const ResetPassword = lazy(() => import('./components/User/forgotPassword/ResetPassword'));
const Cart = lazy(() => import('./components/Cart/Cart'));
const Shipping = lazy(() => import('./components/Cart/Shipping'));
const ConfirmOrder = lazy(() => import('./components/Cart/ConfirmOrder'));
const OrderSuccess = lazy(() => import('./components/Cart/OrderSuccess'));
const Payment = lazy(() => import('./components/Cart/Payment'));
const MyOrders = lazy(() => import('./components/Order/MyOrders'));
const SingleOrderDetail = lazy(() => import('./components/Order/SingeOrderDetail'));
const Dashboard = lazy(() => import('./components/admin/Dashboard'));
const ProductsList = lazy(() => import('./components/admin/ProductsList'));
const NewProduct = lazy(() => import('./components/admin/NewProduct'));
const UpdateProduct = lazy(() => import('./components/admin/UpdateProduct'));
const OrderList = lazy(() => import('./components/admin/OrderList'));
const ProcessOrder = lazy(() => import('./components/admin/ProcessOrder'));
const GetAllUser = lazy(() => import('./components/admin/UserInfomation/GetAllUser'));
const UpdateUser = lazy(() => import('./components/admin/UserInfomation/UpdateUser'));
const NotFound = lazy(() => import('./components/Pages/NotFound'));  // Lazy load the NotFound component
const ProtectedRoute = lazy(() => import('./components/Routes/ProtectedRoute'));
const AdminProtectedRoute = lazy(() => import('./components/Routes/AdminProtectedRoute'));

const App = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const [loading, setLoading] = useState(true);

  async function getStripeApiKey() {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/stripeapikey`);
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.error("Error fetching Stripe API key:", error);
    }
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <div className='bg-gradient-to-r from-custom-dark-teal to-custom-deep-green'>
      {loading ? (
        <Loader />
      ) : (
        <Router>
          <Suspense fallback={<Loader />}>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:pageId" element={<ProductDetail />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:keyword" element={<Products />} />
              <Route path="/login" element={<LoginUser />} />
              <Route path="/register" element={<Register />} />
              <Route path="/password/forgot" element={<ForgotPassword />} />
              <Route path="/password/reset/:token" element={<ResetPassword />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/me/update" element={<UpdateProfile />} />
                <Route path="/password/update" element={<ChangePassword />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/order/confirm" element={<ConfirmOrder />} />
                <Route path="/success" element={<OrderSuccess />} />
                <Route path="/orders" element={<MyOrders />} />
                <Route path="/order/:id" element={<SingleOrderDetail />} />
              </Route>
              <Route element={<AdminProtectedRoute />}>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/products" element={<ProductsList />} />
                <Route path="/admin/product" element={<NewProduct />} />
                <Route path="/admin/product/:newid" element={<UpdateProduct />} />
                <Route path="/admin/orders" element={<OrderList />} />
                <Route path="/admin/orders/:id" element={<ProcessOrder />} />
                <Route path="/admin/users" element={<GetAllUser />} />
                <Route path="/admin/users/:id" element={<UpdateUser />} />
              </Route>
            </Routes>

            {/* Conditionally render Stripe Elements wrapper */}
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Routes>
                <Route element={<ProtectedRoute />}>
                  <Route path="/process/payment" element={<Payment />} />
                </Route>
              </Routes>
            </Elements>

            <Footer />
          </Suspense>
        </Router>
      )}
    </div>
  );
};

export default App;
