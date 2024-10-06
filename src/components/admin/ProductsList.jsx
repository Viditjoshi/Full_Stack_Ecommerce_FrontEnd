import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAdminProduct } from '../../slices/productsSlice';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import toast from 'react-hot-toast';
import { Typography, Button } from '@mui/material';
import MetaData from '../Layouts/MetaData';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from './Sidebar';
import { DeleteProduct, deleteProductReset } from '../../slices/DeleteProductSlice';

const ProductsList = () => {
    const dispatch = useDispatch();
    const { error, products } = useSelector((state) => state.products);
    const { success, error: DeleteProductError, loading } = useSelector((state) => state.deleteProduct)
    const ProdcutDeleteHandler = (id) => {
        dispatch(DeleteProduct({ id }));
    }
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        if (DeleteProductError) {
            toast.error(DeleteProductError)
        }
        if (success) {
            toast.success("Product deleted successfully");
            dispatch(deleteProductReset());
        }
        dispatch(getAdminProduct());
    }, [dispatch, error, success, deleteProductReset, DeleteProductError]);

    const columns = [
        { field: 'id', headerName: 'Product ID', minWidth: 200, flex: 0.5 },
        {
            field: 'name',
            headerName: 'Product Name',
            minWidth: 350,
            flex: 1,
        },
        {
            field: 'stock',
            type: 'number',
            headerName: 'Stock',
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: 'price',
            type: 'number',
            headerName: 'Price',
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
                    <Link to={`/admin/product/${params.row.id}`}>
                        <EditIcon />
                    </Link>
                    <Button onClick={() => ProdcutDeleteHandler(params.row.id)}>
                        <DeleteIcon className='text-black' />
                    </Button>
                </Fragment>
            ),
        },
    ];

    const rows = [];

    products &&
        products.forEach((item) => {
            rows.push({
                id: item._id,
                stock: item.Stock,
                price: item.price,
                name: item.name,
            });
        });

    return (
        <Fragment>
            <MetaData title={`ALL PRODUCTS - Admin`} />
            <div className='flex flex-col md:flex-row w-full h-full'>
                <div className='w-full md:w-[15%] bg-gray-800'>
                    <Sidebar />
                </div>
                <div className='w-full md:w-[85%] bg-slate-100 p-4 md:p-6 flex-1'>
                    <Typography variant='h4' component='h1' gutterBottom>
                        ALL PRODUCTS
                    </Typography>
                    {loading ? (
                        <Typography>Loading...</Typography>
                    ) : (
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            disableSelectionOnClick
                            className='myOrdersTable shadow-md bg-white animate-slideUp'
                            autoHeight
                        />
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default ProductsList;
