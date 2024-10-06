import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Typography } from '@mui/material';
import Sidebar from './Sidebar';
import { GetAllOrderList, DeleteOrder, OrderReset } from '../../slices/MyOrderSlice';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import toast from 'react-hot-toast';

const OrderList = () => {
    const dispatch = useDispatch();
    const { loading, singleOrderDetails, error, isdeleted } = useSelector((state) => state.myOrders);

    const deleteOrderHandler = (id) => {
        dispatch(DeleteOrder({ id }))
    }
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        if (isdeleted) {
            toast.success("Product deleted successfully");
            dispatch(OrderReset());
        }
        dispatch(GetAllOrderList());
    }, [dispatch, isdeleted, error]);

    const columns = [
        { field: 'id', headerName: 'Order ID', minWidth: 300, flex: 1 },
        {
            field: 'status',
            headerName: 'Status',
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => (params.row.status === 'Delivered' ? 'text-green-500' : 'text-red-500'),
        },
        {
            field: 'itemsQty',
            headerName: 'Items Qty',
            type: 'number',
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: 'amount',
            headerName: 'Amount',
            type: 'number',
            minWidth: 270,
            flex: 0.5,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 150,
            flex: 0.3,
            sortable: false,
            renderCell: (params) => (
                <Fragment>
                    <Link to={`/admin/orders/${params.row.id}`}>
                        <EditIcon />
                    </Link>
                    <Button onClick={() => deleteOrderHandler(params.row.id)}>
                        <DeleteIcon className='text-black' />
                    </Button>
                </Fragment>
            ),
        },
    ];

    const rows = singleOrderDetails?.map((order) => ({
        id: order._id,
        itemsQty: order.orderItems.length,
        amount: order.totalPrice,
        status: order.orderStatus,
    })) || [];

    return (
        <div className="flex flex-col md:flex-row w-full h-full">
            <div className="w-full md:w-[15%] bg-gray-800">
                <Sidebar />
            </div>
            <div className="w-full md:w-[85%] bg-slate-100 p-4 md:p-6 flex-1">
                <Typography variant="h4" component="h1" gutterBottom>
                    Order List
                </Typography>
                {loading ? (
                    <Typography>Loading...</Typography>
                ) : (
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        disableSelectionOnClick
                        className="myOrdersTable shadow-md bg-white animate-slideUp"
                        autoHeight
                    />
                )}
            </div>
        </div>
    );
};

export default OrderList;
