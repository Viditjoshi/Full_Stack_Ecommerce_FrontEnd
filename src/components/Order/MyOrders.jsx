import { Fragment, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Typography } from '@mui/material';
import MetaData from '../Layouts/MetaData';
import { myOrder } from '../../slices/MyOrderSlice';
import LaunchIcon from '@mui/icons-material/Launch';

const MyOrders = () => {
    const dispatch = useDispatch();
    const { loading, error, Userorders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.auth);

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.row.status === "Delivered" ? "text-green-500" : "text-red-500";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/order/${params.row.id}`} className="text-blue-500 hover:text-blue-700">
                        <LaunchIcon />
                    </Link>
                );
            },
        },
    ];

    const rows = [];

    Userorders &&
        Userorders.forEach((item) => {
            rows.push({
                itemsQty: item.orderItems[0].quantity,
                id: item._id,
                status: item.orderStatus,
                amount: `₹${item.totalPrice}`,
            });
        });

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        dispatch(myOrder());
    }, [dispatch, error]);

    return (
        <Fragment>
            <MetaData title={`${user?.name} - Orders`} />
            <div className="relative">
                <div className="absolute inset-0  backdrop-blur-sm animate-fadeIn"></div>
                {loading ? (
                    <Loader />
                ) : (
                    <div className="relative m-5 p-5 rounded-lg">
                        <Typography variant="h4" className="mb-5 text-2xl flex flex-row justify-between font-semibold text-white ">
                            {user?.name}s Orders

                        </Typography>

                        <div className="h-[400px] w-full pt-8">
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={10}
                                disableSelectionOnClick
                                className="myOrdersTable shadow-md  bg-white  animate-slideUp "
                                autoHeight
                            />
                        </div>
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default MyOrders;
