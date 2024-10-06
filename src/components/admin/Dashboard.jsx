import { useEffect } from 'react';
import Sidebar from './Sidebar';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Doughnut, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProduct } from '../../slices/productsSlice';
import { GetAllOrderList } from '../../slices/MyOrderSlice';
import { GetUsersDetails } from '../../slices/UserInfo';
// Register the necessary components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement // Register ArcElement for Doughnut chart
);

const Dashboard = () => {

    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);
    const { singleOrderDetails } = useSelector((state) => state.myOrders);
    const { users } = useSelector((state) => state.UserListAdmin);
    let outOfStock = 0;

    products && products.forEach((item) => {
        if (item.Stock === 0) {
            outOfStock += 1;
        }
    })

    useEffect(() => {
        dispatch(getAdminProduct());
        dispatch(GetAllOrderList());
        dispatch(GetUsersDetails());
    }, [dispatch]);

    let totalAmount = 0;
    singleOrderDetails &&
        singleOrderDetails.forEach((item) => {
            totalAmount += item.totalPrice;
        });

    const lineState = {
        labels: ['Initial Amount', 'Amount Earned'],
        datasets: [
            {
                label: 'TOTAL AMOUNT',
                data: [0, totalAmount],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    const doughnutState = {
        labels: ["Out of Stock", "In Stock"],
        datasets: [
            {
                data: [outOfStock, products.length - outOfStock],
                backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(75, 192, 192, 0.5)'],
                borderColor: ['rgb(255, 99, 132)', 'rgb(75, 192, 192)'],
                borderWidth: 1,
            }
        ]
    };

    return (
        <div className="flex flex-col md:flex-row w-full h-full">
            {/* Sidebar Section */}
            <div className="w-full md:w-[15%] bg-gray-800">
                <Sidebar />
            </div>

            {/* Main Content Section */}
            <div className="w-full md:w-[85%] bg-slate-100 p-4 md:p-6 flex-1">
                <Typography variant="h4" className="mb-4 md:mb-6 text-gray-800 font-bold text-center md:text-left">
                    Dashboard
                </Typography>
                <div className="mb-4">
                    <div className="bg-blue-200 shadow-md rounded-lg p-4 flex flex-col justify-between items-center text-center mb-4 hover:shadow-xl transition-shadow duration-300">
                        <p className="text-lg font-semibold text-gray-600">Total Amount</p>
                        <p className="text-2xl font-bold text-gray-800 mt-2">{totalAmount}</p>
                    </div>
                    <div className='grid grid-cols-1 pt-3 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                        <Link
                            to="/admin/products"
                            className="bg-red-300 shadow-md rounded-lg p-4 flex flex-col justify-between items-center text-center hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
                        >
                            <p className="text-lg font-semibold text-gray-600">Products</p>
                            <p className="text-2xl font-bold text-gray-800 mt-2">{products && products.length}</p>
                        </Link>
                        <Link
                            to="/admin/orders"
                            className="bg-yellow-200 shadow-md rounded-lg p-4 flex flex-col justify-between items-center text-center hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
                        >
                            <p className="text-lg font-semibold text-gray-600">Orders</p>
                            <p className="text-2xl font-bold text-gray-800 mt-2">{singleOrderDetails && singleOrderDetails.length}</p>
                        </Link>
                        <Link
                            to="/admin/users"
                            className="bg-black shadow-md rounded-lg p-4 flex flex-col justify-between items-center text-center hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
                        >
                            <p className="text-lg font-semibold text-gray-300">Users</p>
                            <p className="text-2xl font-bold text-gray-100 mt-2">{users && users.length}</p>
                        </Link>
                    </div>
                </div>
                <div className='w-full h-[50%] flex flex-col lg:flex-row '>
                    <div className='w-full h-[100%] md:w-[80%] lg:w-[60%] xl:w-[50%] mx-auto flex mt-10'>
                        <Line data={lineState} options={{ maintainAspectRatio: false }} />
                    </div>
                    <div className='w-full h-[100%] md:w-[50%] lg:w-[40%] xl:w-[30%] mx-auto flex mt-10'>
                        <Doughnut data={doughnutState} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>
            </div>
            {/* Dashboard Summary Boxes Ends*/}
        </div>
    );
};

export default Dashboard;
